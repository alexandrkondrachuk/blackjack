import * as axios from 'axios';
import * as _ from 'lodash';
import store from '../store';
import { game as gameActions, user as userActions, history as historyActions } from '../store/actions';

export default class Api {
    static reconnectTimeoutSec = 5;

    constructor(config) {
        const {
            baseURL, gameId, headers, urls, requests,
        } = config;
        this.baseURL = baseURL || '';
        this.gameId = gameId || '';
        this.headers = headers || null;
        this.urls = urls || null;
        this.requests = requests || null;
        this.instance = axios.create({
            baseURL,
        });
        this.errors = {};
        this.recconectNumber = 3;
    }

    // load game methods

    async doConfigRequest(url) {
        if (!url) return null;
        try {
            const data = await this.instance.get(url);
            return Api.parseResponse(data);
        } catch (e) {
            throw new Error(e);
        }
    }

    async getSessionId() {
        try {
            const { gameToken } = store.getState().app;
            const { getSessionId } = this.urls;
            let sessionId = await this.instance.get(getSessionId,
                { params: { sessionId: gameToken } });
            sessionId = Api.parseResponse(sessionId);
            this.addHeaders(sessionId);
            return sessionId;
        } catch (e) {
            throw new Error(e);
        }
    }

    // User events and game additional info

    async doGameRequest(request) {
        if (!request || !request.body) return null;
        try {
            const { gameRequest } = this.urls;
            const { path, body } = request;
            const data = await this.instance.post(gameRequest, body);
            const parsed = Api.parseResponse(data);
            const pathParser = path ? _.get(parsed, path) : parsed;

            return (parsed instanceof Error)
                ? parsed
                : pathParser;
        } catch (e) {
            throw new Error(e);
        }
    }

    async connect(userDataPath = 'UserData') {
        try {
            const sessionToken = await this.getSessionId();
            Api.saveDataToStore(sessionToken, gameActions.getSessionId);

            const data = await this.doConfigRequest(this.urls.getGameData);
            if (data instanceof Error) throw data;
            Api.saveDataToStore(data, gameActions.getData);

            const join = await this.doConfigRequest(this.urls.joinGame);
            Api.saveDataToStore(join, gameActions.getSessionData);
            if (join instanceof Error) throw join;
            const userData = _.get(join, userDataPath);
            Api.saveDataToStore(userData, userActions.getUserData);

            const config = await this.doGameRequest(this.requests.config);
            if (config instanceof Error) throw config;
            Api.saveDataToStore(config, gameActions.getConfig);

            const limits = await this.doGameRequest(this.requests.limits);
            if (limits instanceof Error) throw limits;
            Api.saveDataToStore(limits, gameActions.getLimits);

            const history = await this.doGameRequest(this.requests.history);
            if (history instanceof Error) throw history;
            Api.saveDataToStore(history, historyActions.getAll);

            Api.saveDataToStore(true, gameActions.setConnectHTTPStatus);
            return true;
        } catch (e) {
            console.error(e);
            Api.saveDataToStore(false, gameActions.setConnectHTTPStatus);
            return _.debounce((E) => this.reconnect(E), 1000 * Api.reconnectTimeoutSec)(e);
        }
    }

    async reconnect(e, level = 'connect') {
        try {
            this.errors = { ...e, [level]: e };
            this.recconectNumber -= 1;
            if (this.recconectNumber !== 0) {
                await this.connect();
            }
        } catch (E) {
            throw new Error(E);
        }
    }

    // Player actions

    async doPlayerAction(actionName = null, hand = null, bodyPath = 'body.hand') {
        if (!actionName) return null;
        try {
            const request = (hand >= 0)
                ? _.set(this.requests[actionName], bodyPath, hand)
                : this.requests[actionName];
            return await this.doGameRequest(request);
        } catch (e) {
            throw new Error(e);
        }
    }

    async leave() {
        const leave = await this.instance.post(this.urls.leave, {});
        return !Api.parseResponse(leave);
    }

    async bet(amount = 0.1, hand = 0, betInfoDataPath = 'game.gameConfig.odds[0].outcomes', amountPath = 'body.amount', betInfoPath = 'body.betInfo') {
        try {
            const { bet } = this.requests;
            const betInfo = _.get(store.getState(), betInfoDataPath);
            const betHand = _.get(betInfo, `[${hand}]`);

            _.set(bet, amountPath, amount);
            _.set(bet, betInfoPath, betHand);
            return await this.doGameRequest(bet);
        } catch (e) {
            throw new Error(e);
        }
    }

    async sit(hand = 0) {
        // eslint-disable-next-line no-return-await
        return await this.doPlayerAction('sit', hand);
    }

    async cancelLastBet() {
        // eslint-disable-next-line no-return-await
        return await this.doPlayerAction('cancelLastBet', null, '');
    }

    async cancelAll() {
        // eslint-disable-next-line no-return-await
        return await this.doPlayerAction('cancelAll', null, '');
    }

    async hit(hand = 0) {
        // eslint-disable-next-line no-return-await
        return await this.doPlayerAction('hit', hand);
    }

    async stand(hand = 0) {
        // eslint-disable-next-line no-return-await
        return await this.doPlayerAction('stand', hand);
    }

    async split(hand = 0) {
        // eslint-disable-next-line no-return-await
        return await this.doPlayerAction('split', hand);
    }

    async double(hand = 0) {
        // eslint-disable-next-line no-return-await
        return await this.doPlayerAction('double', hand);
    }

    async insurance(hand = 0) {
        // eslint-disable-next-line no-return-await
        return await this.doPlayerAction('insurance', hand);
    }

    async sendChat(message = '', messagePath = 'body.message') {
        try {
            const { sendChat } = this.requests;
            _.set(sendChat, messagePath, message);
            return await this.doGameRequest(sendChat);
        } catch (e) {
            throw new Error(e);
        }
    }

    static watcher() {
        // @todo implement player activity watcher
    }

    // helper methods

    static parseResponse(response, statusPath = 'IsSuccess', dataPath = 'ResponseData', errorPath = 'Message') {
        if (response.data && response.status) {
            const { data } = response;
            const isStructuredData = _.has(data, statusPath) && _.has(data, dataPath);
            const structuredData = (isStructuredData && _.get(data, statusPath))
                ? _.get(data, dataPath)
                : new Error(_.get(data, errorPath));
            return isStructuredData ? structuredData : data;
        }
        return false;
    }

    static saveDataToStore(data = null, action = null) {
        if (!data || !action) return null;
        store.dispatch(action(data));
        return true;
    }

    addHeaders(sessionId, attr = 'X-CASINOTV-TOKEN') {
        const headers = { ...this.headers, [attr]: sessionId };
        this.headers = headers;
        this.instance = axios.create({
            baseURL: this.baseURL,
            headers,
        });
    }
}
