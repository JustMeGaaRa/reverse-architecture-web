
export interface IObservable {
    subscribe(observer: () => void): void;
    unsubscribe(observer: () => void): void;
}
