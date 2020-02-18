import {ITransactionStorage} from "./index";
import {Debit} from "../transactions/debit";
import {ITransaction} from "../transactions";

export class DebitsStorage implements ITransactionStorage{

    private _deposits: Debit[] = [];

    constructor(){

    }

    add(debit: Debit): void {
        this._deposits.push(debit)
    }

    get(): Debit[] {
        return this._deposits;
    }

    getInfo(): ITransaction[] {
        const result: ITransaction[] = [];

        for (let deposit of this._deposits) {
            result.push(deposit.info)
        }
        return result;
    }

}