import { CommentInfo } from "../types";

export type CommentThread = {
    commentThreadId: string;
    author: string;
    text: string;
    createdDate: string;
    replies: Array<CommentInfo>;
    metadata: {
        view: { type: string; id: string },
        position?: { x: number; y: number },
        elementId?: string;
    }
}