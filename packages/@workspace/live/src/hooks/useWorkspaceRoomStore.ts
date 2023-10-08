import { useContext } from "react";
import { WorkspaceRoomContext } from "../contexts";

export const useWorkspaceRoomStore = () => {
    return useContext(WorkspaceRoomContext);
}