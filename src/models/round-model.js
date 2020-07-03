import BaseModel from './base';

export default class RoundModel extends BaseModel {
    constructor(initDate) {
        super();
        this.copyFrom(initDate);
    }
}
