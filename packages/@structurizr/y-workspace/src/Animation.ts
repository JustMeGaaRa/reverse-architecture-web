import * as Y from "yjs";

export class Animation {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public fromSnapshot(animation: any) {

    }

    public toSnapshot(): any {
        return Object.freeze({
            
        })
    }
}