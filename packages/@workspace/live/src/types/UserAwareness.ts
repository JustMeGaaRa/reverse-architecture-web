import { Position, ViewType } from "@structurizr/dsl";

export type UserAwareness = {
    view: { type: ViewType, identifier: string };
    mouse?: Position;
    cursor?: Position;
}