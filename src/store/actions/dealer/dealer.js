export const DEALER_SET_INFO = 'DEALER_SET_INFO';

export function setInfo(payload = null) {
    return {
        type: DEALER_SET_INFO,
        payload,
    };
}
