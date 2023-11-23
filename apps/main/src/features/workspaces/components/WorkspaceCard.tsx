import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { FC, useCallback } from "react";
import { ThumbnailContainer, ThumbnailImage, WorkspaceCardFooter } from "../components";
import { useSelectionItem, useOnPressHold, useSelectionContainer } from "../hooks";
import { WorkspaceInfo } from "../types";

export const WorkspaceCard: FC<{
    workspace: WorkspaceInfo;
    onPreviewClick?: () => void;
}> = ({
    workspace,
    onPreviewClick
}) => {
    const {
        isSelectionModeOn,
        turnOnSelectionMode,
        turnOffSelectionMode,
        toggleSelected
    } = useSelectionContainer();
    const { index, isSelected } = useSelectionItem();

    const { onStartHold, onCancelHold } = useOnPressHold(() => {
        turnOnSelectionMode();
        toggleSelected(index);
    });

    const handleOnMouseDown = useCallback(() => {
        onStartHold();
    }, [onStartHold]);

    const handleOnMouseUp = useCallback(() => {
        onCancelHold();
    }, [onCancelHold]);

    const handleOnPreviewClick = useCallback(() => {
        if (isSelectionModeOn) {
            toggleSelected(index);
        }
        else {
            onPreviewClick?.();
        }
    }, [index, isSelectionModeOn, onPreviewClick, toggleSelected]);

    return (
        <Card data-group>
            <CardBody>
                <ThumbnailContainer
                    isSelected={isSelected}
                    onMouseDown={handleOnMouseDown}
                    onMouseUp={handleOnMouseUp}
                    onClick={handleOnPreviewClick}
                >
                    <ThumbnailImage url={workspace.coverUrl} />
                </ThumbnailContainer>
            </CardBody>
            <CardFooter>
                <WorkspaceCardFooter
                    name={workspace.name}
                    lastModifiedDate={workspace.lastModifiedDate}
                />
            </CardFooter>
        </Card>
    )
}