import * as Y from "yjs";

export class CommentCollection {
    constructor(
        private readonly document: Y.Doc
    ) {
        this.comments = document.getArray("comments");
    }

    public readonly comments: Y.Array<Comment>;
}