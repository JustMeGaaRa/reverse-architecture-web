import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { FC, MouseEventHandler } from "react";
import { ThumbnailContainer, ThumbnailImage, WorkspaceCardFooter } from "../components";
import { WorkspaceInfo } from "../types";

export const WorkspaceCard: FC<{
    workspace: WorkspaceInfo;
    isSelected?: boolean;
    onMouseDown?: MouseEventHandler<HTMLDivElement>;
    onMouseUp?: MouseEventHandler<HTMLDivElement>;
    onPreviewClick?: MouseEventHandler<HTMLDivElement>;
    onRemove?: MouseEventHandler<HTMLButtonElement>;
}> = ({
    workspace,
    isSelected,
    onMouseDown,
    onMouseUp,
    onPreviewClick,
    onRemove
}) => {
    return (
        <Card data-group>
            <CardBody>
                <ThumbnailContainer
                    isSelected={isSelected}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onClick={onPreviewClick}
                >
                    <ThumbnailImage url={workspace.coverUrl} />
                </ThumbnailContainer>
            </CardBody>
            <CardFooter>
                <WorkspaceCardFooter
                    name={workspace.name}
                    lastModifiedDate={workspace.lastModifiedDate}
                    onRemove={onRemove}
                />
            </CardFooter>
        </Card>
    )
}