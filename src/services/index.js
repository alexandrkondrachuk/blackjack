import * as _ from 'lodash';
import Api from '../classes/Api';
import Transport from '../classes/Transport';
import Types from '../classes/Types';
import config from '../config';

const api = new Api({
    baseURL: config.get('baseURL'),
    gameId: config.get('gameId'),
    headers: config.get('headers'),
    urls: config.get('apiURLs'),
    requests: _.get(Types, 'requests'),
});

const transport = new Transport({
    baseWSURL: config.get('baseWSURL'),
    gameId: config.get('gameId'),
    requests: _.get(Types, 'transportRequests'),
});

export {
    api,
    transport,
};
