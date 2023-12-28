import { createContext, Dispatch, SetStateAction } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { ViewType } from "@structurizr/dsl";
import { SharingOptions } from "../types";
import { WorkspaceUser } from "@workspace/core";

export type WorkspaceRoomState = {
    workspaceDocument?: Y.Doc;
    connectionProvider?: WebrtcProvider;
    currentUser: WorkspaceUser,
    collaboratingUsers: Array<WorkspaceUser>,
    sharingOptions?: SharingOptions;
    setCurrentUser?: Dispatch<SetStateAction<WorkspaceUser>>;
    setSharingOptions?: Dispatch<SetStateAction<SharingOptions>>;
}

export const WorkspaceRoomContext = createContext<WorkspaceRoomState>({
    currentUser: {
        info: {
            username: "jonathan.joestar",
            fullname: "Jonathan Joestar",
            color: "green",
        },
        location: {
            type: ViewType.SystemLandscape,
            identifier: "",
            mouse: { x: 0, y: 0 },
            cursor: { x: 0, y: 0 }
        },
        isPresenter: false,
    },
    collaboratingUsers: [],
    sharingOptions: {
        followPresenter: false,
    },
});