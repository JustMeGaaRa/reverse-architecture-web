export type CommentThreadMetadata = {
    commentThreadId?: string;
    view: { type: CommentThreadViewType; id: string },
    position?: { x: number; y: number },
    elementId?: string;
}

export type CommentThreadViewType =
    "System Landscape" |
    "System Context" |
    "Container" |
    "Component" |
    "Deployment" |
    "Model"
