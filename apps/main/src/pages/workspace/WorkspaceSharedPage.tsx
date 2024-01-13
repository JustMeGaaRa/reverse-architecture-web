import { FC, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
    CurrentUser,
    WorkspaceNavigationProvider,
    WorkspaceRoom,
} from "workspace";
import {
    CommentsRemoteObserver,
    useAccount,
} from "../../features";
import {
    WorkspaceCollaborativeEditor,
} from "../workspace";

const SharedRoomNameParam = "room";
const SharedRoomCodeparam = "code";

export const WorkspaceSharedPage: FC = () => {
    const [ queryParams ] = useSearchParams([
        [ SharedRoomNameParam, "" ],
        [ SharedRoomCodeparam, "" ]
    ]);
    const { account } = useAccount();

    const roomId = useMemo(() => queryParams.get(SharedRoomNameParam), [queryParams]);
    const password = useMemo(() => queryParams.get(SharedRoomCodeparam), [queryParams]);

    // NOTE: workspace provider on this page should save changes on tha page only,
    // as this is the page for collaborating users who do not own the workspace file
    return (
        <WorkspaceRoom options={{ roomId: roomId, password: password }}>
            <WorkspaceNavigationProvider>
                <CommentsRemoteObserver>
                    <CurrentUser info={account} />
                    <WorkspaceCollaborativeEditor />
                </CommentsRemoteObserver>
            </WorkspaceNavigationProvider>
        </WorkspaceRoom>
    )
}