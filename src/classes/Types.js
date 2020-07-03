import { Map } from 'immutable';

export default class Types {
    static requests = {
        config: {
            path: 'data.configuration',
            body: { type: 'config' },
        },
        limits: {
            path: 'limits',
            body: { type: 'get_limits' },
        },
        history: {
            path: 'data',
            body: { type: 'history' },
        },
        date: {
            path: 'serverDate',
            body: { type: 'get_date' },
        },
        sit: {
            path: '',
            body: { type: 'bj_sit', hand: '{{hand}}' },
        },
        bet: {
            path: '',
            body: { type: 'bet', amount: 0.1, betInfo: '{{handOdd}}' },
        },
        cancelLastBet: {
            path: '',
            body: { type: 'cancel_last' },
        },
        cancelAll: {
            path: '',
            body: { type: 'cancel_all' },
        },
        hit: {
            path: '',
            body: { type: 'bj_hit', hand: '{{hand}}' },
        },
        stand: {
            path: '',
            body: { type: 'bj_stand', hand: '{{hand}}' },
        },
        split: {
            path: '',
            body: { type: 'bj_split', hand: '{{hand}}' },
        },
        double: {
            path: '',
            body: { type: 'bj_double_bet', hand: '{{hand}}' },
        },
        insurance: {
            path: '',
            body: { type: 'bj_insurance', hand: '{{hand}}' },
        },
        sendChat: {
            path: '',
            body: { type: 'send_chat', message: '{{message}}' },
        },
    };

    static transportRequests = {
        init: {
            path: '',
            body: {
                type: 'init',
                instanceId: '{{gameId}}',
                sessionToken: '{{gameToken}}',
                wrapMessages: false,
            },
        },
    };

    static hands = [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
    ];

    static wsMethodsTypes = {
        local: 'local',
        static: 'static',
    };

    static wsMessages = [
        {
            id: 0, type: 'ready', methodType: 'local', methodName: 'doInitGame',
        },
        {
            id: 1, type: 'message', methodType: 'local', methodName: 'parseMessage',
        },
        {
            id: 2, type: 'unsubbed', methodType: 'static', methodName: 'onUnsubbed',
        },
        {
            id: 3, type: 'shutdown', methodType: 'static', methodName: 'onShutdown',
        },
    ];

    // eslint-disable-next-line max-len
    static wsMessagesMap = Types.wsMessages.reduce((acc, item) => acc.set(item.type, { ...item }), new Map());

    static wsParsedMessages = [
        {
            id: 0, type: 'user', methodType: 'static', methodName: 'onUserMessage',
        },
        {
            id: 1, type: 'history', methodType: 'static', methodName: 'onHistoryMessage',
        },
        {
            id: 2, type: 'statistics', methodType: 'static', methodName: 'onStatisticMessage',
        },
        {
            id: 3, type: 'hands', methodType: 'static', methodName: 'onHandsMessage',
        },
        {
            id: 4, type: 'bj_hand_free', methodType: 'static', methodName: 'onBJHandFree',
        },
        {
            id: 5, type: 'user_config', methodType: 'static', methodName: 'onUserConfigMessage',
        },
        {
            id: 6, type: 'balance', methodType: 'static', methodName: 'onBalanceMessage',
        },
        {
            id: 7, type: 'status', methodType: 'static', methodName: 'onStatusMessage',
        },
        {
            id: 8, type: 'current_status', methodType: 'static', methodName: 'onCurrentStatusMessage',
        },
        {
            id: 9, type: 'bets_registered', methodType: 'static', methodName: 'onBetsRegisteredMessage',
        },
        {
            id: 10, type: 'round_stats', methodType: 'static', methodName: 'onRoundStatsMessage',
        },
        {
            id: 11, type: 'bj_wait', methodType: 'static', methodName: 'onBJWaitMessage',
        },
        {
            id: 12, type: 'clear_bets', methodType: 'static', methodName: 'onClearBetsMessage',
        },
        {
            id: 13, type: 'bets_cancelled', methodType: 'static', methodName: 'onBetsCancelledMessage',
        },
        {
            id: 14, type: 'cancel_all', methodType: 'static', methodName: 'onCancelAllMessage',
        },
        {
            id: 15, type: 'win', methodType: 'static', methodName: 'onWinMessage',
        },
        {
            id: 16, type: 'player_bet', methodType: 'static', methodName: 'onPlayerBetMessage',
        },
        {
            id: 17, type: 'player_bet_cancelled', methodType: 'static', methodName: 'onPlayerBetCancelledMessage',
        },
    ];

    // eslint-disable-next-line max-len
    static wsParsedMessagesMap = Types.wsParsedMessages.reduce((acc, item) => acc.set(item.type, { ...item }), new Map());
}
