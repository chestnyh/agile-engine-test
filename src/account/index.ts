import {ITransaction} from "../transactions";

import {Credit} from "../transactions/credit";
import {CreditsStorage} from "../transactions-storage/credits-storage"

import {Debit} from "../transactions/debit";
import {DebitsStorage} from "../transactions-storage/debits-storage";

export interface Report {
    success: boolean;
    message: string
}

export function isReport(data: any): data is Report {
    return data
        && typeof data.success === "boolean"
        && typeof data.message === "string"
}

export class Account {

    private _balance: number;
    private _transactionInProcess: boolean = false;
    private _creditsStorage: CreditsStorage;
    private _debitsStorage: DebitsStorage;

    constructor(balance: number, creditsStorage: CreditsStorage, debitsStorage: DebitsStorage) {

        this._balance = 0;
        this._creditsStorage = creditsStorage;
        this._debitsStorage = debitsStorage;

    }

    getBalance(): number | Report{

        if(this._transactionInProcess)
            return { success: false, message: "There is transaction in progress try later" };

        return this._balance;

    }

    setDebit(debit: Debit): Report {

        if(this._transactionInProcess)
            return { success: false, message: "There is transaction in progress try later" };

        this._transactionInProcess = true;

        this._debitsStorage.add(debit);
        this._balance = this._balance + debit.amount;

        this._transactionInProcess = false;
        return { success: true, message: "success" };

    }

    setCredit(credit: Credit): Report{

        if(this._transactionInProcess)
            return { success: false, message: "There is transaction in progress try later" };

        this._transactionInProcess = true;

        if(credit.amount > this._balance){
            this._transactionInProcess = false;
            return { success: false, message: "Your balance is too low for this credit" };
        }


        this._creditsStorage.add(credit);
        this._balance = this._balance - credit.amount;

        this._transactionInProcess = false;

        return { success: true, message: "success" };

    }

    getDebits(): ITransaction[] | Report {

        if(this._transactionInProcess)
            return { success: false, message: "There is transaction in progress try later" };

        return this._debitsStorage.getInfo();
    }

    getCredits(): ITransaction[] | Report{

        if(this._transactionInProcess)
            return { success: false, message: "There is transaction in progress try later" };

        return this._creditsStorage.getInfo();
    }

}