import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addtransaction, addtransactionsuccess, deletetransactionsuccess, deleteetransaction, gettransaction, gettransactionsuccess, loadtransaction, loadtransactionsuccess, updatetransaction, updatetransactionsuccess, addmultipletransactionsuccess, addmultipletransaction } from "./Repositorio.Action";
import { of } from "rxjs";
import { catchError, exhaustMap, map, switchMap } from "rxjs/operators";
import { DashboardService } from "@app/shared/services/dashboard.service";
import { showalert } from "../Common/App.Action";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class TransactionEffects {
     conta_id = 1
    constructor(private actin$: Actions, private service: DashboardService) {
    }

    _loadtransaction = createEffect(() =>
        this.actin$.pipe(
            ofType(loadtransaction),
            exhaustMap((action) => {
                

                return this.service.findAllTransactions().pipe(
                    map((response) => {
                        return loadtransactionsuccess({ 
                            transaction: {
                                data: response.data,
                                page: response.page, 
                                perPage: response.perPage, 
                                total: response.total,
                                lastPage: response.lastPage
                            }, 
                        })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )   

    // _gettransaction = createEffect(() =>
    //     this.actin$.pipe(
    //         ofType(gettransaction),
    //         exhaustMap((action) => {
    //             return this.service.findAllTransactionsTipos().pipe(
    //                 map((data) => {
    //                     return gettransactionsuccess({ obj: data })
    //                 }),
    //                 catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
    //             )
    //         })
    //     )
    // )

    _addtransaction = createEffect(() =>
        this.actin$.pipe(
            ofType(addtransaction),
            switchMap((action) => {
                return this.service.storeOrUpdate(action.transaction).pipe(
                    switchMap((data) => {
                        console.log(action)
                        return of(addtransactionsuccess({ transaction: action.transaction }),
                            showalert({ message: 'Created successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create transaction', resulttype: 'fail' })))
                )
            })
        )
    )

    _addmultipletransaction = createEffect(() =>
        this.actin$.pipe(
            ofType(addmultipletransaction),
            switchMap((action) => {
                return this.service.createMultiplasTransacoes(action.transaction).pipe(
                    switchMap((data) => {
                        console.log(action)
                        return of(addmultipletransactionsuccess({ transaction: action.transaction }),
                            showalert({ message: 'Created successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create transaction', resulttype: 'fail' })))
                )
            })
        )
    )

    // _updatetransaction = createEffect(() =>
    //     this.actin$.pipe(
    //         ofType(updatetransaction),
    //         switchMap((action) => {
    //             return this.service.storeOrUpdate(action.inputdata).pipe(
    //                 switchMap((data) => {
    //                     return of(updatetransactionsuccess({ inputdata: action.inputdata }),
    //                         showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
    //                 }),
    //                 catchError((_error) => of(showalert({ message: 'Failed to update transaction', resulttype: 'fail' })))
    //             )
    //         })
    //     )
    // )

    // _deletetransaction = createEffect(() =>
    // this.actin$.pipe(
    //     ofType(deleteetransaction),
    //     switchMap((action) => {
    //         return this.service.delete(action.code).pipe(
    //             switchMap((data) => {
    //                 return of(deletetransactionsuccess({ code: action.code }),
    //                     showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
    //             }),
    //             catchError((_error) => of(showalert({ message: 'Failed to delete transaction', resulttype: 'fail' })))
    //         )
    //     })
    // )
    // )

}