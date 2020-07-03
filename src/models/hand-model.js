import BaseModel from './base';

export default class HandModel extends BaseModel {
    constructor(initDate) {
        super();
        this.sessionId = '';
        this.nick = '';
        this.copyFrom(initDate);
    }
}
