import { FC, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    CurrentUser,
    WorkspaceNavigationProvider,
    WorkspaceProvider,
    WorkspaceRoom,
} from "workspace";
import {
    useAccount,
} from "../../features";
import {
    WorkspaceCollaborativeEditor, WorkspacePageActionsWrapper,
} from "../workspace";

const SharedRoomCodeparam = "code";

export const WorkspaceSharedPage: FC = () => {
    const [ queryParams ] = useSearchParams([[ SharedRoomCodeparam, "" ]]);
    const { account } = useAccount();
    
    const [ roomId, setRoomId ] = useState();
    const [ roomPassword, setRoomPassword ] = useState();
    const code = useMemo(() => queryParams.get(SharedRoomCodeparam), [queryParams]);

    // TODO: refactor this component so that the this page shows sync icon, not save button
    // NOTE: workspace provider on this page should save changes on tha page only,
    // as this is the page for collaborating users who do not own the workspace file
    return (
        <WorkspaceProvider>
            <WorkspaceNavigationProvider>
                <WorkspaceRoom options={{ roomId: roomId, password: roomPassword }}>
                    <WorkspacePageActionsWrapper workspaceId={undefined}>
                        <WorkspaceSessionLoader code={code} />

                        <CurrentUser info={account} />
                        <WorkspaceCollaborativeEditor />
                    </WorkspacePageActionsWrapper>
                </WorkspaceRoom>
            </WorkspaceNavigationProvider>
        </WorkspaceProvider>
    )
}

export const WorkspaceSessionLoader: FC<{
    code: string;
}> = ({
    code
}) => {
    useEffect(() => {
        
    }, []);

    return null;
}