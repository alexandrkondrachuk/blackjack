import BaseModel from './base';

export default class BetModel extends BaseModel {
    constructor(initDate) {
        super();
        this.amount = 0;
        this.betInfo = null;
        this.currency = 'Euro';
        this.roundBetId = 0;
        this.roundId = 0;
        this.totalAmount = 0;
        this.copyFrom(initDate);
    }
}
