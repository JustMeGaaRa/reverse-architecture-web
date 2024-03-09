export interface ISupportImmutable<T> {
    toObject(): T;
}

export interface ISupportSnapshot<T> {
    toSnapshot(): T;
}