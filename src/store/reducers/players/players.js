import { Record, Map } from 'immutable';
import * as _ from 'lodash';
import { players as playersActions } from '../../actions';
import PlayerModel from '../../../models/player-model';
import Types from '../../../classes/Types';

function updatePlayers(players, list) {
    return Object.keys(players).reduce((acc, key) => acc.set(key, new PlayerModel(_.get(players, `${key}[0]`))), list);
}

function updateActivePlayer(player, list) {
    const hand = _.get(player, 'hand');
    const actions = _.get(player, 'actions');
    const activePlayer = list.get(hand);
    _.set(activePlayer, 'actions', actions);
    return activePlayer;
}

const list = Types.hands.reduce((acc, hand) => acc.set(hand.id, new PlayerModel()), new Map());
const initialState = new Record({ list, activePlayer: null })();

const players = (state = initialState, action) => {
    switch (action.type) {
    case playersActions.PLAYERS__UPDATE:
        return state.merge({ list: updatePlayers(action.payload, state.list) });
    case playersActions.PLAYERS__UPDATE__ACTIONS:
        return state.merge({ activePlayer: updateActivePlayer(action.payload, state.list) });
    case playersActions.PLAYERS__UPDATE__HANDS:
        return state.merge({ list: state.list });
    default:
        return state;
    }
};

export default players;
