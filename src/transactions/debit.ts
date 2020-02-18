import {ITransaction} from "./index";

export interface DebitConfig{
    amount: number
}

export class Debit implements ITransaction{

    private _amount: number;
    private _createdAt: Date;

    constructor(config: DebitConfig) {
        this._createdAt = new Date();
        this._amount = config.amount;
    }

    get amount(): number{
        return this._amount
    }

    get createdAt() : Date{
        return this._createdAt;
    }

    get info() : ITransaction{
        return {
            amount: this.amount,
            createdAt: this.createdAt
        }
    }

}