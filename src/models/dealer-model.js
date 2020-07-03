import BaseModel from './base';

export default class DealerModel extends BaseModel {
    constructor(initDate) {
        super();
        this.cards = [];
        this.points = 0;
        this.state = '-';
        this.copyFrom(initDate);
    }
}
