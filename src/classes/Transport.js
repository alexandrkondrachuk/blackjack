import * as _ from 'lodash';
import store from '../store/store';
import {
    user as userActions,
    history as historyActions,
    statistic as statisticActions,
    round as roundActions,
    hands as handsActions,
    bets as betsActions,
    game as gameActions,
    dealer as dealerActions,
    players as playersActions,
} from '../store/actions';
import Types from './Types';

export default class Transport {
    static reconnectTimeoutSec = 5;

    constructor(config) {
        this.baseWSURL = config.baseWSURL || '';
        this.requests = config.requests || null;
        this.gameId = config.gameId || '';
        this.socket = null;
        this.recconectNumber = 3;
    }

    init() {
        // eslint-disable-next-line no-undef
        this.socket = new WebSocket(this.baseWSURL);

        this.socket.addEventListener('open', (e) => Transport.onOpen(e));
        this.socket.addEventListener('close', (e) => Transport.onClose(e));
        this.socket.addEventListener('message', (e) => this.onMessage(e));
        this.socket.addEventListener('error', (e) => this.onError(e));
    }

    // WS listeners

    static onOpen() {
        store.dispatch(gameActions.setConnectWSStatus(true));
    }

    static onClose() {
        store.dispatch(gameActions.setConnectWSStatus(false));
        store.dispatch(gameActions.setReadyState(false));
    }

    doClose() {
        this.socket.close();
    }

    onMessage(environment) {
        const data = JSON.parse(_.get(environment, 'data'));
        const type = _.get(data, 'type');

        this.boot(type, data, Types.wsMessagesMap);
    }

    onError(e) {
        _.debounce(() => this.reconnect(e), 1000 * Transport.reconnectTimeoutSec)(e);
    }

    reconnect(E) {
        this.recconectNumber -= 1;
        if (this.recconectNumber) {
            this.doClose();
            this.init();
        }
        store.dispatch(gameActions.setConnectWSStatus(false));
        store.dispatch(gameActions.setReadyState(false));
        console.error(E);
    }

    boot(type, data, map) {
        const messageHandler = map.get(type);
        const methodType = _.get(messageHandler, 'methodType');
        const methodName = _.get(messageHandler, 'methodName');

        if (messageHandler && methodType && methodName) {
            const obj = methodType === Types.wsMethodsTypes.static ? Transport : this;
            obj[methodName](data);
        } else {
            console.log('Not defined method: ', data);
            Transport.parseMessageByName(data);
        }
    }

    // helper methods

    doSendMessage(message = null) {
        this.socket.send(JSON.stringify(message));
    }

    doInitGame() {
        const sessionPath = 'game.sessionId';
        const sessionId = _.get(store.getState(), sessionPath);
        const { gameId } = this;
        const init = _.get(this.requests, 'init.body');
        _.set(init, 'instanceId', gameId);
        _.set(init, 'sessionToken', sessionId);

        this.doSendMessage(init);
    }

    parseMessage(data) {
        const parsedData = _.get(data, 'data.Message');
        const type = _.get(parsedData, 'type');
        this.boot(type, parsedData, Types.wsParsedMessagesMap);
    }

    // methods to parse different types of messages and save to the store

    static onUnsubbed() {
        store.dispatch(gameActions.setConnectWSStatus(false));
        store.dispatch(gameActions.setReadyState(false));
    }

    static onShutdown() {
        store.dispatch(gameActions.setConnectWSStatus(false));
        store.dispatch(gameActions.setReadyState(false));
    }

    static onUserMessage(data) {
        const userInfo = _.get(data, 'message.user');
        store.dispatch(userActions.setUserInfo(userInfo));
    }

    static onHistoryMessage(data) {
        const history = _.get(data, 'message.data');
        store.dispatch(historyActions.getAll(history));
    }

    static onStatisticMessage(data) {
        const statistic = _.get(data, 'message');
        store.dispatch(statisticActions.update(statistic));
    }

    static onCurrentStatusMessage(data) {
        const currentStatus = _.get(data, 'message');
        store.dispatch(roundActions.setStatus(currentStatus));
    }

    static onHandsMessage(data) {
        const hands = _.get(data, 'hands');
        store.dispatch(handsActions.update(hands));
        store.dispatch(playersActions.updateHands(hands));
    }

    static onBJHandFree(data) {
        // @todo it have to be implemented
        console.info('onBJHandFree: ', data);
    }

    static onUserConfigMessage(data) {
        const userConfig = _.get(data, 'message');
        store.dispatch(userActions.getConfig(userConfig));
    }

    static onBalanceMessage(data) {
        const state = store.getState();
        const balance = _.get(data, 'message');
        const isHTTPConnect = _.get(state, 'game.isHTTPConnect');
        const isWSConnect = _.get(state, 'game.isWSConnect');
        const gameData = _.get(state, 'game.gameData');
        const gameSessionData = _.get(state, 'game.gameSessionData');
        const isGameReady = !!(isHTTPConnect
            && isWSConnect
            && gameData
            && !!Object.keys(gameData).length
            && gameSessionData
            && !!Object.keys(gameSessionData).length);

        store.dispatch(userActions.updateBalance(balance));
        store.dispatch(gameActions.setReadyState(isGameReady));
    }

    static onStatusMessage(data) {
        const status = _.get(data, 'message');
        const statusCode = _.get(status, 'status');
        // @todo move codes to the Types
        if (statusCode === 2 || statusCode === 3) {
            const dealer = _.get(status, 'result.dealer');
            const players = _.get(status, 'result.players');
            if (Object.keys(dealer).length) store.dispatch(dealerActions.setInfo(dealer));
            // eslint-disable-next-line max-len
            if (Object.keys(players).length) store.dispatch(playersActions.update(players));
        }
        store.dispatch(roundActions.setStatus(status));
    }

    static onBetsRegisteredMessage(data) {
        const bets = _.get(data, 'message.bets[0]');
        store.dispatch(betsActions.update(bets));
    }

    static onClearBetsMessage() {
        store.dispatch(betsActions.clear());
    }

    static onBetsCancelledMessage(data) {
        // deprecated
        console.log('onBetsCancelledMessage: ', data);
    }

    static onCancelAllMessage(data) {
        // deprecated
        console.log('onCancelAllMessage: ', data);
    }

    static onBJWaitMessage(data) {
        store.dispatch(playersActions.updateActions(data));
    }

    static onWinMessage(data) {
        const win = _.get(data, 'message');
        store.dispatch(roundActions.setWin(win));
    }

    static onRoundStatsMessage(data) {
        const stats = _.get(data, 'message');
        store.dispatch(roundActions.setStats(stats));
    }

    static onPlayerBetMessage(data) {
        const bets = _.get(data, 'message.bets[0]');
        store.dispatch(betsActions.update(bets));
    }

    static onPlayerBetCancelledMessage(data) {
        // deprecated
        console.log('onPlayerBetCancelledMessage: ', data);
    }

    static parseMessageByName(data) {
        // @todo it have to be implemented
        console.log('parseMessageByName: ', data);
        // {name: "Winners", vodType: 20, items: Array(10), target: "background"}
    }
}
