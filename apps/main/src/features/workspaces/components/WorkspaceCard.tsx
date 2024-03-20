import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { IWorkspaceInfo } from "@structurizr/y-workspace";
import { FC, useCallback } from "react";
import { ThumbnailContainer, ThumbnailImage, WorkspaceCardFooter } from "../components";

type WorkspaceHandler = (workspace: IWorkspaceInfo) => void;
type WorkspaceRenameHandler = (workspace: IWorkspaceInfo, value: string) => void;

export const WorkspaceCard: FC<{
    workspace: IWorkspaceInfo;
    isSelected?: boolean;
    isArchived?: boolean;
    onTouchStart?: WorkspaceHandler;
    onTouchEnd?: WorkspaceHandler;
    onOpen?: WorkspaceHandler;
    onSelect?: WorkspaceHandler;
    onRename?: WorkspaceRenameHandler;
    onClone?: WorkspaceHandler;
    onArchive?: WorkspaceHandler;
    onRestore?: WorkspaceHandler;
    onDelete?: WorkspaceHandler;
}> = ({
    workspace,
    isSelected,
    isArchived,
    onTouchStart,
    onTouchEnd,
    onOpen,
    onSelect,
    onRename,
    onClone,
    onArchive,
    onRestore,
    onDelete
}) => {
    const handleOnTouchStart = useCallback(() => {
        onTouchStart?.(workspace);
    }, [onTouchStart, workspace]);

    const handleOnTouchEnd = useCallback(() => {
        onTouchEnd?.(workspace);
    }, [onTouchEnd, workspace]);

    const handleOnOpen = useCallback(() => {
        onOpen?.(workspace);
    }, [onOpen, workspace]);

    const handleOnSelect = useCallback(() => {
        onSelect?.(workspace);
    }, [onSelect, workspace]);

    const handleOnRename = useCallback((value: string) => {
        onRename?.(workspace, value);
    }, [onRename, workspace]);

    const handleOnClone = useCallback(() => {
        onClone?.(workspace);
    }, [onClone, workspace]);

    const handleOnArchive = useCallback(() => {
        onArchive?.(workspace);
    }, [onArchive, workspace]);

    const handleOnRestore = useCallback(() => {
        onRestore?.(workspace);
    }, [onRestore, workspace]);

    const handleOnDelete = useCallback(() => {
        onDelete?.(workspace);
    }, [onDelete, workspace]);

    return (
        <Card data-group>
            <CardBody>
                <ThumbnailContainer
                    isSelected={isSelected}
                    onTouchStart={handleOnTouchStart}
                    onTouchEnd={handleOnTouchEnd}
                    onDoubleClick={handleOnOpen}
                    onClick={handleOnSelect}
                >
                    <ThumbnailImage url={workspace.coverUrl} />
                </ThumbnailContainer>
            </CardBody>
            <CardFooter>
                <WorkspaceCardFooter
                    name={workspace.name}
                    lastModifiedDate={workspace.lastModifiedDate}
                    isArchived={isArchived}
                    onRename={handleOnRename}
                    onClone={handleOnClone}
                    onArchive={handleOnArchive}
                    onRestore={handleOnRestore}
                    onDelete={handleOnDelete}
                />
            </CardFooter>
        </Card>
    )
}