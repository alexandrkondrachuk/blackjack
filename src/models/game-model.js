import Base from './base';

export default class GameModel extends Base {
    constructor(initDate) {
        super();
        this.sessionId = '';
        this.gameData = null;
        this.gameSessionData = null;
        this.gameConfig = null;
        this.limits = null;
        this.isHTTPConnect = false;
        this.isWSConnect = false;
        this.isReady = false;
        this.copyFrom(initDate);
    }
}
