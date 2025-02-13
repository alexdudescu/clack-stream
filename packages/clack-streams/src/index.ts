import { confirm, log, ConfirmOptions, select, SelectOptions, text, TextOptions, intro, outro } from "@clack/prompts";
import { from, map, Observable, of, switchMap, tap } from "rxjs";

export const intro$ = (message: string) => of(intro(message));
export const outro$ = (message:string = '') => of(intro(message));

export const text$ = (opts: TextOptions) => from(text(opts));
export const confirm$ = (opts: ConfirmOptions) => from(confirm(opts));
export const select$ = <T>(opts: SelectOptions<T>) => from(select(opts));

export const _intro = <TInput>(cb: (value: TInput) => string) => {
    return (source$: Observable<TInput>): Observable<TInput> => {
        return source$.pipe(
            tap((value) => intro(cb(value))),
        )
    };
};

export const _outro = <TInput>(cb: (value: TInput) => string) => {
    return (source$: Observable<TInput>): Observable<TInput> => {
        return source$.pipe(
            tap(value => outro(cb(value))),
        )
    };
};

export const _text = <TInput>(cb: (value: TInput) => TextOptions) => {
    return (source$: Observable<TInput>) => {
        return source$.pipe(
            switchMap(value => text$(cb(value)))
        )
    };
};

export const _select = <TInput, T>(cb: (args: TInput) => SelectOptions<T>) => {
    return (source$: Observable<TInput>) => {
        return source$.pipe(
            switchMap((args) => select$(cb(args)).pipe(
                map(opts => ({ args, opts }),
                ))
            ))
    };
}

export interface IConfirmResult<TValue, TResult> {
    promptResult: TResult,
    value: TValue
}

export const _confirm = <TInput>(getOpts: (value: TInput) => ConfirmOptions) => {
    return (source$: Observable<TInput>): Observable<IConfirmResult<TInput, Awaited<ReturnType<typeof confirm>>>> => {
        return source$.pipe(
            switchMap((value => confirm$(getOpts(value)).pipe(
                map(promptResult => ({
                    promptResult,
                    value
                }))
            )))
        )
    };
};

export const _log = <TInput>(cb: (value: TInput) => string, logType: keyof typeof log = "message") => {
    return (source$: Observable<TInput>): Observable<TInput> => {
        return source$.pipe(
            tap(value => log[logType](cb(value))),
        );
    };
};


