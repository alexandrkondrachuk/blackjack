import { Record } from 'immutable';
import { statistic as statisticActions } from '../../actions';
import StatisticModel from '../../../models/statistic-model';

const initialState = new Record({
    model: null,
})();

const statistic = (state = initialState, action) => {
    switch (action.type) {
    case statisticActions.STATISTIC_UPDATE:
        return state.merge({ model: new StatisticModel() });
    default:
        return state;
    }
};

export default statistic;
