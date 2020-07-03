import { Record } from 'immutable';
import { round as roundActions } from '../../actions';
import RoundModel from '../../../models/round-model';

const initialState = new Record({ model: null, stats: null, win: null })();

const round = (state = initialState, action) => {
    switch (action.type) {
    case roundActions.ROUND__SET__STATUS:
        return state.merge({ model: new RoundModel(action.payload) });
    case roundActions.ROUND__SET__STATS:
        return state.merge({ stats: action.payload });
    case roundActions.ROUND__SET__WIN:
        return state.merge({ win: action.payload });
    default:
        return state;
    }
};

export default round;
