import { Wrap, WrapItem } from "@chakra-ui/react";
import { FC } from "react";
import { WorkspacePreviewCard } from "./WorkspacePreviewCard";

export const WorkspaceCardView: FC<{
    workspaces: any[];
    onClick?: (workspace: any) => void;
}> = ({
    workspaces,
    onClick
}) => {
    return (
        <Wrap spacing={6}>
            {workspaces.map((workspace) => (
                <WrapItem key={workspace.name}>
                    <WorkspacePreviewCard
                        key={workspace.workspaceId}
                        title={workspace.name}
                        author={workspace.author}
                        preview={workspace.preview}
                        onPreviewClick={() => onClick?.(workspace)}
                    />
                </WrapItem>
            ))}
        </Wrap>
    )
}