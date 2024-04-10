import { ViewType } from "@structurizr/dsl";
import { createContext, Dispatch, SetStateAction } from "react";
import { PresentationOptions, WorkspaceUser } from "../types";

export type WorkspaceRoomState = {
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