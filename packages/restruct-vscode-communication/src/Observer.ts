export interface IDisposable {
    dispose: () => void;
}

export interface IObservable<TEvent> {
    onNext: (event: TEvent) => void;
    onError: (error: Error) => void;
}

export interface IObserver<TEvent> {
    subscribe: (handler: IObservable<TEvent>) => IDisposable;
}
