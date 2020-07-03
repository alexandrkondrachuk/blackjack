export const BETS__UPDATE = 'BETS__UPDATE';
export const BETS__CLEAR = 'BETS__CLEAR';

export function update(model = null) {
    return {
        type: BETS__UPDATE,
        payload: model,
    };
}

export function clear() {
    return {
        type: BETS__CLEAR,
        payload: null,
    };
}
