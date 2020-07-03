import BaseModel from './base';

export default class StatisticModel extends BaseModel {
    constructor(initDate) {
        super();
        this.copyFrom(initDate);
    }
}
