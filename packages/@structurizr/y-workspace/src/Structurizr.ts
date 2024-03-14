import * as Y from "yjs";

export class Structurizr {
    constructor(private readonly document: Y.Doc) {
        this.structurizr = document.getText("structurizr");
    }

    public readonly structurizr: Y.Text;
}
