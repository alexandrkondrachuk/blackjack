export const HISTORY__GET__ALL = 'HISTORY__GET__ALL';

export function getAll(payload = null) {
    return {
        type: HISTORY__GET__ALL,
        payload,
    };
}
