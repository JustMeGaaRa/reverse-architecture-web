export type CommentInfo = {
    commentId: string;
    author: string;
    text: string;
    createdAt: string;
    metadata: {
        type: string;
        id: string;
    }
};