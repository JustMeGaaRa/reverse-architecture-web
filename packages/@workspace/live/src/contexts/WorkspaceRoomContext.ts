import { createContext, Dispatch, SetStateAction } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { ViewType } from "@structurizr/dsl";
import { PresentationOptions } from "../types";
import { WorkspaceUser } from "@workspace/core";

export type WorkspaceRoomState = {
    workspaceDocument?: Y.Doc;
    connectionProvider?: WebrtcProvider;
    currentUser: WorkspaceUser,
    collaboratingUsers: Array<WorkspaceUser>,
    presentation?: PresentationOptions;
    setCurrentUser?: Dispatch<SetStateAction<WorkspaceUser>>;
    setPresentationOptions?: Dispatch<SetStateAction<PresentationOptions>>;
}

export const WorkspaceRoomContext = createContext<WorkspaceRoomState>({
    currentUser: {
        info: {
            username: "jonathan.joestar",
            fullname: "Jonathan Joestar",
            color: "green",
        },
        view: {
            type: ViewType.SystemLandscape,
            identifier: ""
        },
        mouse: { x: 0, y: 0 },
        cursor: { x: 0, y: 0 }
    },
    collaboratingUsers: [],
    presentation: {
        presentationEnabled: false,
        presenterInfo: undefined,
    },
});