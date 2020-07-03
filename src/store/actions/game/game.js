export const GAME__GET__SESSION__ID = 'GAME__GET__SESSION__ID';
export const GAME__GET__DATA = 'GAME__GET__DATA';
export const GAME__GET__SESSION__DATA = 'GAME__GET__SESSION__DATA';
export const GAME__GET__CONFIG = 'GAME__GET__CONFIG';
export const GAME__GET__LIMITS = 'GAME__GET__LIMITS';
export const GAME__SET__CONNECT__HTTP__STATUS = 'GAME__SET__CONNECT__HTTP__STATUS';
export const GAME__SET__CONNECT__WS__STATUS = 'GAME__SET__CONNECT__WS__STATUS';
export const GAME__SET__READY__STATE = 'GAME__SET__READY__STATE';

export function getSessionId(payload = '') {
    return {
        type: GAME__GET__SESSION__ID,
        payload,
    };
}

export function getData(payload = null) {
    return {
        type: GAME__GET__DATA,
        payload,
    };
}

export function getSessionData(payload = null) {
    return {
        type: GAME__GET__SESSION__DATA,
        payload,
    };
}

export function getConfig(payload = null) {
    return {
        type: GAME__GET__CONFIG,
        payload,
    };
}

export function getLimits(payload = null) {
    return {
        type: GAME__GET__LIMITS,
        payload,
    };
}

export function setConnectHTTPStatus(payload = false) {
    return {
        type: GAME__SET__CONNECT__HTTP__STATUS,
        payload,
    };
}

export function setConnectWSStatus(payload = false) {
    return {
        type: GAME__SET__CONNECT__WS__STATUS,
        payload,
    };
}

export function setReadyState(payload = false) {
    return {
        type: GAME__SET__READY__STATE,
        payload,
    };
}
