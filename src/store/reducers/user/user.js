import { Record } from 'immutable';
import * as _ from 'lodash';
import { user as userActions } from '../../actions';
import UserModel from '../../../models/user-model';

const initialState = new Record({ model: new UserModel() })();

const game = (state = initialState, action) => {
    switch (action.type) {
    case userActions.USER__GET__DATA:
        return state.merge({ model: new UserModel(action.payload) });
    case userActions.USER__UPDATE__BALANCE:
        return state.merge({ model: _.merge(state.model, action.payload) });
    case userActions.USER__SET__INFO:
        return state.merge({ model: _.merge(state.model, action.payload) });
    case userActions.USER__GET__CONFIG:
        return state.merge({ model: _.merge(state.model, action.payload) });
    default:
        return state;
    }
};

export default game;
