import { User } from "../types";

export type CommentInfo = {
    commentId: string;
    commentThreadId: string;
    author: string;
    text: string;
    createdDate: string;

    commenter?: User;
};