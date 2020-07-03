import BaseModel from './base';

export default class PlayerModel extends BaseModel {
    constructor(initDate) {
        super();
        this.id = '';
        this.cards = [];
        this.points = 0;
        this.sessionId = '';
        this.nick = '';
        this.state = '-';
        this.actions = null;
        this.copyFrom(initDate);
    }
}
