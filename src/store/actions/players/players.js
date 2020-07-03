export const PLAYERS__UPDATE = 'PLAYERS_UPDATE';
export const PLAYERS__UPDATE__ACTIONS = 'PLAYERS__UPDATE__ACTIONS';
export const PLAYERS__UPDATE__HANDS = 'PLAYERS__UPDATE__HANDS';

export function update(payload = null) {
    return {
        type: PLAYERS__UPDATE,
        payload,
    };
}

export function updateActions(model = null) {
    return {
        type: PLAYERS__UPDATE__ACTIONS,
        payload: model,
    };
}

export function updateHands(hands = null) {
    return {
        type: PLAYERS__UPDATE__HANDS,
        payload: hands,
    };
}
