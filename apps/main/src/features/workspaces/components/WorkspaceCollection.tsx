import { Box, ScaleFade } from "@chakra-ui/react";
import { EmptyContent } from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import { FC, useState } from "react";
import {
    WorkspaceCollectionProvider,
    WorkspaceCardView,
    WorkspaceOptionsToolbar,
    WorkspaceTableView
} from ".";
import {
    WorkspaceGroupInfo,
    WorkspaceInfo
} from "../types";

export const WorkspaceCollection: FC<{
    workspaces: WorkspaceInfo[];
    view: "card" | "table";
    groupped?: boolean,
    emptyTitle?: string;
    emptyDescription?: string;
    emptyAction?: React.ReactElement;
    onClick?: (workspace: WorkspaceInfo | WorkspaceGroupInfo) => void;
    onStack?: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void;
    onRemove?: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void;
}> = ({
    workspaces,
    view,
    groupped,
    emptyTitle,
    emptyDescription,
    emptyAction,
    onClick,
    onStack,
    onRemove,
}) => {
    const [ selected, setSelected ] = useState<any[]>([]);
    
    return (
        <WorkspaceCollectionProvider>
            {workspaces.length === 0 && (
                <EmptyContent
                    icon={Folder}
                    title={emptyTitle}
                    description={emptyDescription}
                    action={emptyAction}
                />
            )}
            {workspaces.length > 0 && view === "card" && (
                <WorkspaceCardView
                    workspaces={workspaces}
                    groupped={groupped}
                    onClick={onClick}
                    onSelected={setSelected}
                    onRemove={onRemove}
                />
            )}
            {workspaces.length > 0 && view === "table" && (
                <WorkspaceTableView
                    workspaces={workspaces}
                    groupped={groupped}
                    onClick={onClick}
                    onSelected={setSelected}
                    onRemove={onRemove}
                />
            )}
            <Box
                position={"absolute"}
                bottom={4}
                left={"50%"}
                transform={"translateX(-50%)"}
                visibility={selected?.length > 0 ? "visible" : "hidden"}
                transitionProperty={"visibility"}
                transitionDelay={selected?.length > 0 ? "unset" : "0.5s"}
            >
                <ScaleFade in={selected?.length > 0}>
                    <WorkspaceOptionsToolbar
                        onStack={onStack}
                        onRemove={onRemove}
                    />
                </ScaleFade>
            </Box>
        </WorkspaceCollectionProvider>
    )
}