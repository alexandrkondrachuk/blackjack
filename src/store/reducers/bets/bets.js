import { Record, Map } from 'immutable';
import * as _ from 'lodash';
import { bets as betsActions } from '../../actions';
import BetModel from '../../../models/bet-model';
import Types from '../../../classes/Types';

function addBetToMap(bet = null, list) {
    if (!bet) return list;
    const hand = _.get(bet, 'betInfo.id') - 1;
    return hand >= 0 ? list.set(hand, new BetModel(bet)) : list;
}

const list = Types.hands.reduce((acc, hand) => acc.set(hand.id, new BetModel()), new Map());
const initialState = new Record({ list })();

const bets = (state = initialState, action) => {
    switch (action.type) {
    case betsActions.BETS__UPDATE:
        return state.merge({ list: addBetToMap(action.payload, state.list) });
    case betsActions.BETS__CLEAR:
        return state.merge({ list });
    default:
        return state;
    }
};

export default bets;
