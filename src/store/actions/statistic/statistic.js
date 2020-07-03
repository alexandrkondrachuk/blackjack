export const STATISTIC_UPDATE = 'STATISTIC_UPDATE';

export function update(model = null) {
    return {
        type: STATISTIC_UPDATE,
        payload: model,
    };
}
