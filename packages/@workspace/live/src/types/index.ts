import { Position, ViewType } from "@structurizr/dsl";
import { UserInfo } from "@workspace/diagramming";

export type UserAwareness = {
    view: { type: ViewType, identifier: string };
    mouse?: Position;
    cursor?: Position;
}

export type WorkspaceUser = Partial<UserAwareness> & {
    info: UserInfo;
    following?: UserInfo;
};

export type PresentationOptions = {
    presentationEnabled: boolean;
    presenterInfo?: UserInfo;
}

export type UserInfoRequired =
    Required<Pick<UserInfo, "username" | "fullname">>
    & Partial<Pick<UserInfo, "color">>;

export const UserAwarenessCursorParam = "cursor";
export const UserAwarenessMouseParam = "mouse";
export const UserAwarenessViewportParam = "viewport";
export const UserAwarenessViewParam = "view";

export const PresentationMapName = "presentation";
export const PresentationEnabledParam = "presentationEnabled";
export const PresenterInfoParam = "presenterInfo";