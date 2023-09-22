import { CommentInfo } from "../types";

export type CommentThread = {
    commentThreadId: string;
    comments: Array<CommentInfo>;
    metadata: {
        view: { type: string; id: string },
        position?: { x: number; y: number },
        elementId?: string;
    }
}