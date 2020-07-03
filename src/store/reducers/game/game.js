import { Record } from 'immutable';
import { game as gameActions } from '../../actions';
import GameModel from '../../../models/game-model';

const initialState = new Record(new GameModel())();

const game = (state = initialState, action) => {
    switch (action.type) {
    case gameActions.GAME__GET__SESSION__ID:
        return state.merge({ sessionId: action.payload });
    case gameActions.GAME__GET__DATA:
        return state.merge({ gameData: action.payload });
    case gameActions.GAME__GET__SESSION__DATA:
        return state.merge({ gameSessionData: action.payload });
    case gameActions.GAME__GET__CONFIG:
        return state.merge({ gameConfig: action.payload });
    case gameActions.GAME__GET__LIMITS:
        return state.merge({ limits: action.payload });
    case gameActions.GAME__SET__CONNECT__HTTP__STATUS:
        return state.merge({ isHTTPConnect: !!action.payload });
    case gameActions.GAME__SET__CONNECT__WS__STATUS:
        return state.merge({ isWSConnect: !!action.payload });
    case gameActions.GAME__SET__READY__STATE:
        return state.merge({ isReady: !!action.payload });
    default:
        return state;
    }
};

export default game;
