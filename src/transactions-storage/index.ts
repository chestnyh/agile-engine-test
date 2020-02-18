import {ITransaction} from "../transactions";

export interface ITransactionStorage{
    add(transaction: ITransaction): void;
    get(): ITransaction[];
}