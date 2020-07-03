import BaseModel from './base';

export default class UserModel extends BaseModel {
    constructor(initData) {
        super();
        this.config = null;
        this.balance = 0;
        this.totalLoss = 0;
        this.isPlayingForFun = true;
        this.nick = 'GUEST';
        this.sessionId = '';
        this.copyFrom(initData);
    }
}
