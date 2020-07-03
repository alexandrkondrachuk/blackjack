const host = 'dev.securesocket.net';
const gameId = 'OS_Blackjack';

const defaultConfig = {
    title: 'Title (default)',
    baseURL: `http://${host}:8080/`,
    baseWSURL: `ws://${host}:8090`,
    gameId,
    headers: {
        'Content-Type': 'application/json',
        'X-CASINOTV-PROTOCOL-VERSION': '1.1',
        'X-CASINOTV-TOKEN': '',
    },
    apiURLs: {
        getSessionId: '/get_session_id',
        getGameData: `/get/${gameId}`,
        joinGame: `/join/${gameId}/`,
        leave: `/leave/${gameId}`,
        gameRequest: `/post/${gameId}`,
    },
};
export default defaultConfig;
