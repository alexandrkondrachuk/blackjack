import { Record } from 'immutable';
import { dealer as dealerActions } from '../../actions';
import DealerModel from '../../../models/dealer-model';

const initialState = new Record({ model: new DealerModel() })();

const dealer = (state = initialState, action) => {
    switch (action.type) {
    case dealerActions.DEALER_SET_INFO:
        return state.merge({ model: new DealerModel(action.payload) });
    default:
        return state;
    }
};

export default dealer;
