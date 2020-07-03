export const USER__GET__DATA = 'USER__GET__DATA';
export const USER__UPDATE__BALANCE = 'USER__UPDATE__BALANCE';
export const USER__SET__INFO = 'USER__SET__INFO';
export const USER__GET__CONFIG = 'USER__GET__CONFIG';

export function getUserData(payload = null) {
    return {
        type: USER__GET__DATA,
        payload,
    };
}

export function updateBalance(payload = 0) {
    return {
        type: USER__UPDATE__BALANCE,
        payload,
    };
}

export function setUserInfo(model = {
    balance: 0, isPlayingForFun: true, nick: 'GUEST', sessionId: '',
}) {
    return {
        type: USER__SET__INFO,
        payload: model,
    };
}

export function getConfig(model = null) {
    return {
        type: USER__GET__CONFIG,
        payload: model,
    };
}
