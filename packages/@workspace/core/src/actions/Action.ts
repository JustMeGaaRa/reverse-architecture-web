export type Action<T extends string, P = any> = {
    type: T;
    payload: P;
}