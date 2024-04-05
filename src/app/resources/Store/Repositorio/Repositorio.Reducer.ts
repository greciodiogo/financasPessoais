
import { createReducer, on } from "@ngrx/store";
import { TransactionsState } from "./Repositorio.State";
import { addtransactionsuccess, deletetransactionsuccess, gettransactionsuccess, loadtransactionsuccess, updatetransactionsuccess } from "./Repositorio.Action";

const _transactionReducer = createReducer(TransactionsState,
    on(loadtransactionsuccess, (state, action) => {
        return {
            ...state,
            data: [...action.data],
            page: action.page, 
            perPage: action.perPage, 
            total: action.total, 
            lastPage: action.lastPage,
        }
    }),
    on(gettransactionsuccess, (state, action) => {
        return {
            ...state,
        }
    }),
    on(addtransactionsuccess, (state, action) => {
        const _maxid = Math.max(...state.data.map(o => o.id));
        const _newdata = { ...action.inputdata };
        _newdata.id = _maxid + 1;
        return {
            ...state,
            data: [...state.data, _newdata],
        }
    }),
    on(updatetransactionsuccess, (state, action) => {
        const _newdata = state.data.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
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