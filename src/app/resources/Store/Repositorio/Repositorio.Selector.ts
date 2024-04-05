import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TransactionModel } from "../Model/Transaction.Model";

const gettransactionstate = createFeatureSelector<TransactionModel>('transaction');

export const gettransactionlist = createSelector(gettransactionstate, (state) => {
    return state.data;
})

export const gettransaction = createSelector(gettransactionstate, (state) => {
    return state.Transactionobj;
})