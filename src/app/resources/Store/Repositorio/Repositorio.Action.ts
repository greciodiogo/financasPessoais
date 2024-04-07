import { createAction, props } from "@ngrx/store";
import { Transactions } from "../Model/Transaction.Model";

export const LOAD_TRANSACTION='[transaction page]load transaction'
export const LOAD_TRANSACTION_SUCCESS='[transaction page]load transaction success'
export const LOAD_TRANSACTION_FAIL='[transaction page]load transaction fail'
export const ADD_TRANASACTION='[transaction page]add transaction'
export const ADD_TRANASACTION_SUCCESS='[transaction page]add transaction success'
export const ADD_MULTIPLE_TRANASACTION='[transaction page]add multiple transaction'
export const ADD_MULTIPLE_TRANASACTION_SUCCESS='[transaction page]add multiple transaction success'
export const UPDATE_TRANSACTION='[transaction page]update transaction'
export const UPDATE_TRANSACTION_SUCCESS='[transaction page]update transaction success'

export const DELETE_TRANSACTION='[transaction page]delete transaction'
export const DELETE_TRANSACTION_SUCCESS='[transaction page]delete transaction success'

export const GET_TRANSACTION='[transaction page]get transaction'
export const GET_TRANSACTION_SUCCESS='[transaction page]get transaction success'

export const loadtransaction=createAction(LOAD_TRANSACTION)
export const loadtransactionsuccess=createAction(LOAD_TRANSACTION_SUCCESS,props<{transaction: {data:Transactions[], page: number, perPage: number, total: number, lastPage: number}}>())

export const addtransaction=createAction(ADD_TRANASACTION,props<{transaction:Transactions}>())
export const addtransactionsuccess=createAction(ADD_TRANASACTION_SUCCESS,props<{transaction:Transactions}>())

export const addmultipletransaction=createAction(ADD_MULTIPLE_TRANASACTION,props<{transaction:Transactions}>())
export const addmultipletransactionsuccess=createAction(ADD_MULTIPLE_TRANASACTION_SUCCESS,props<{transaction:Transactions}>())

export const updatetransaction=createAction(UPDATE_TRANSACTION,props<{transaction:Transactions}>())
export const updatetransactionsuccess=createAction(UPDATE_TRANSACTION_SUCCESS,props<{transaction:Transactions}>())

export const deleteetransaction=createAction(DELETE_TRANSACTION,props<{code:number}>())
export const deletetransactionsuccess=createAction(DELETE_TRANSACTION_SUCCESS,props<{code:number}>())

export const gettransaction=createAction(GET_TRANSACTION,props<{id:number}>())
export const gettransactionsuccess=createAction(GET_TRANSACTION_SUCCESS,props<{obj:Transactions}>())
