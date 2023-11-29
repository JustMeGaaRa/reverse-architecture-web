import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { FC, MouseEventHandler } from "react";
import { ThumbnailContainer, ThumbnailImage, WorkspaceCardFooter } from "../components";
import { WorkspaceInfo } from "../types";

export const WorkspaceCard: FC<{
    workspace: WorkspaceInfo;
    isSelected?: boolean;
    onMouseDown?: MouseEventHandler<HTMLDivElement>;
    onMouseUp?: MouseEventHandler<HTMLDivElement>;
    onOpen?: MouseEventHandler<HTMLDivElement>;
    onSelect?: () => void;
    onRename?: () => void;
    onClone?: () => void;
    onDelete?: MouseEventHandler<HTMLButtonElement>;
}> = ({
    workspace,
    isSelected,
    onMouseDown,
    onMouseUp,
    onOpen,
    onSelect,
    onRename,
    onClone,
    onDelete
}) => {
    return (
        <Card data-group>
            <CardBody>
                <ThumbnailContainer
                    isSelected={isSelected}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onDoubleClick={onOpen}
                    onClick={onSelect}
                >
                    <ThumbnailImage url={workspace.coverUrl} />
                </ThumbnailContainer>
            </CardBody>
            <CardFooter>
                <WorkspaceCardFooter
                    name={workspace.name}
                    lastModifiedDate={workspace.lastModifiedDate}
                    onRename={onRename}
                    onClone={onClone}
                    onDelete={onDelete}
                />
            </CardFooter>
        </Card>
    )
}