import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { FC, MouseEventHandler, TouchEventHandler } from "react";
import { ThumbnailContainer, ThumbnailImage, WorkspaceCardFooter } from "../components";
import { WorkspaceInfo } from "../types";

export const WorkspaceCard: FC<{
    workspace: WorkspaceInfo;
    isSelected?: boolean;
    onTouchStart?: TouchEventHandler<HTMLDivElement>;
    onTouchEnd?: TouchEventHandler<HTMLDivElement>;
    onOpen?: MouseEventHandler<HTMLDivElement>;
    onSelect?: () => void;
    onRename?: () => void;
    onClone?: () => void;
    onDelete?: MouseEventHandler<HTMLButtonElement>;
}> = ({
    workspace,
    isSelected,
    onTouchStart,
    onTouchEnd,
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
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
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