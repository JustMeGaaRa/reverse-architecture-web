import { ViewType } from "@structurizr/react";

export type CommentThreadMetadata = {
    commentThreadId?: string;
    view: { type: ViewType; identifier: string },
    position?: { x: number; y: number },
    elementId?: string;
}