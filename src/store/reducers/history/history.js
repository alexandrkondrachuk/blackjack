import { Record } from 'immutable';
import { history as historyActions } from '../../actions';
import HistoryModel from '../../../models/history-model';

const initialState = new Record(new HistoryModel())();

const history = (state = initialState, action) => {
    switch (action.type) {
    case historyActions.HISTORY__GET__ALL:
        return state.merge({ hands: action.payload });
    default:
        return state;
    }
};

export default history;
