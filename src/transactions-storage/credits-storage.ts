import {ITransactionStorage} from "./index";
import {ITransaction} from "../transactions";
import {Credit} from "../transactions/credit"

export class CreditsStorage implements ITransactionStorage{

    private _credits: Credit[] = [];

    constructor(){

    }

    add(credit: Credit): void {
        this._credits.push(credit)
    }

    get(): Credit[] {
        return this._credits;
    }

    getInfo(): ITransaction[] {
        const result: ITransaction[] = [];

        for (let credit of this._credits) {
            result.push(credit.info)
        }
        return result;
    }

}