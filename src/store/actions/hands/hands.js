export const HANDS__UPDATE = 'HANDS__UPDATE';

export function update(hands = []) {
    return {
        type: HANDS__UPDATE,
        payload: hands,
    };
}
