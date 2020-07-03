import BaseModel from './base';

export default class StatModel extends BaseModel {
    constructor(initDate) {
        super();
        this.copyFrom(initDate);
    }
}
