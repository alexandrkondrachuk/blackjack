import { Record, Map } from 'immutable';
import * as _ from 'lodash';
import { hands as handsActions } from '../../actions';
import HandModel from '../../../models/hand-model';

function convertHandsToMap(hands = null) {
    if (!hands) return null;
    const keys = Object.keys(hands);
    return keys.reduce((acc, hand) => acc.set(hand, new HandModel(_.get(hands, hand))), new Map());
}

const initialState = new Record({
    list: null,
})();

const hands = (state = initialState, action) => {
    switch (action.type) {
    case handsActions.HANDS__UPDATE:
        return state.merge({ list: convertHandsToMap(action.payload) });
    default:
        return state;
    }
};

export default hands;
