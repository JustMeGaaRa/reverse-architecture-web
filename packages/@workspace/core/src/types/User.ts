import { Position, ViewKeys, ViewType } from "@structurizr/dsl";

export type CurrentView = {
    type: ViewType;
    identifier: string;
    nodes: Array<any>;
    edges: Array<any>;
    path: Array<ViewKeys>;
};

export type UserInfo = {
    username: string;
    fullname: string;
    color: string;
}

export type UserAwareness = {
    view: { type: ViewType, identifier: string };
    mouse?: Position;
    cursor?: Position;
}

export type WorkspaceUser = Partial<UserAwareness> & {
    info: UserInfo;
    following?: UserInfo;
};