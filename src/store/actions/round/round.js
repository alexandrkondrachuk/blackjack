export const ROUND__SET__STATUS = 'ROUND__SET__STATUS';
export const ROUND__SET__STATS = 'ROUND__SET__STATS';
export const ROUND__SET__WIN = 'ROUND__SET__WIN';

export function setStatus(model = null) {
    return {
        type: ROUND__SET__STATUS,
        payload: model,
    };
}

export function setStats(payload = null) {
    return {
        type: ROUND__SET__STATS,
        payload,
    };
}

export function setWin(payload = null) {
    return {
        type: ROUND__SET__WIN,
        payload,
    };
}
