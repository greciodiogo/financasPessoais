
import { createReducer, on } from "@ngrx/store";
import { TransactionsState } from "./Repositorio.State";
import { addmultipletransactionsuccess, addtransactionsuccess, deletetransactionsuccess, gettransactionsuccess, loadtransactionsuccess, updatetransactionsuccess } from "./Repositorio.Action";

const _transactionReducer = createReducer(TransactionsState,
    on(loadtransactionsuccess, (state, action) => {
        return {
            ...state,
            data: [...action.transaction.data],
            page: action.transaction.page, 
            perPage: action.transaction.perPage, 
            total: action.transaction.total, 
            lastPage: action.transaction.lastPage,
        }
    }),
    on(gettransactionsuccess, (state, action) => {
        return {
            ...state,
        }
    }),
    on(addtransactionsuccess, (state, action) => {;
        return {
            ...state,
            data: [...state.data],
        }
    }),
    on(addmultipletransactionsuccess, (state, action) => {
        const _maxid = Math.max(...state.data.map(o => o.id));
        const _newdata = { ...action.transaction };
        _newdata.id = _maxid + 1;
        return {
            ...state,
            data: [...state.data, _newdata],
        }
    }),
    on(updatetransactionsuccess, (state, action) => {
        const _newdata = state.data.map(o => {
            return o.id === action.transaction.id ? action.transaction : o
        })
        return {
            ...state,
            data: _newdata,
        }
    }),
    on(deletetransactionsuccess, (state, action) => {
        const _newdata = state.data.filter(o=>o.id!==action.code);
        return {
            ...state,
            data: _newdata,
        }
    })
)

export function transactionReducer(state: any, action: any) {
    return _transactionReducer(state, action);
}