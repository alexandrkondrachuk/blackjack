import BaseModel from './base';

export default class HistoryModel extends BaseModel {
    constructor(initDate) {
        super();
        this.hands = null;
        this.copyFrom(initDate);
    }
}
