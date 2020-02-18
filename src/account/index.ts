import {ITransaction} from "../transactions";

import {Credit} from "../transactions/credit";
import {CreditsStorage} from "../transactions-storage/credits-storage"

import {Debit} from "../transactions/debit";
import {DebitsStorage} from "../transactions-storage/debits-storage";

export interface CreationReport {
    success: boolean;
    message: string
}

export class Account {

    private _balance: number;
    private _creditsStorage: CreditsStorage;
    private _debitsStorage: DebitsStorage;

    constructor(balance: number, creditsStorage: CreditsStorage, debitsStorage: DebitsStorage) {

        this._balance = 0;
        this._creditsStorage = creditsStorage;
        this._debitsStorage = debitsStorage;

    }

    get balance(): number{
        return this._balance;
    }

    setDebit(debit: Debit): CreationReport {

        this._debitsStorage.add(debit);
        this._balance = this._balance + debit.amount;
        return { success: true, message: "success" };

    }

    setCredit(credit: Credit): CreationReport{

        if(credit.amount > this._balance){
            return { success: false, message: "Your balance is too low for this credit" };
        }


        this._creditsStorage.add(credit);
        this._balance = this._balance - credit.amount;
        return { success: true, message: "success" };

    }

    getDebits(): ITransaction[]{
        return this._debitsStorage.getInfo();
    }

    getCredits(): ITransaction[]{
        return this._creditsStorage.getInfo();
    }

}