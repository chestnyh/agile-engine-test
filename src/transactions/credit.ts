import {ITransaction} from "./index";

export interface CreditConfig{
    amount: number
}

export class Credit implements ITransaction{

    private _amount: number;
    private _createdAt: Date;

    constructor(config: CreditConfig) {
        this._createdAt = new Date();
        this._amount = config.amount;
    }

    get amount(): number{
        return this._amount
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get info() : ITransaction{
        return {
            amount: this.amount,
            createdAt: this.createdAt
        }
    }

}