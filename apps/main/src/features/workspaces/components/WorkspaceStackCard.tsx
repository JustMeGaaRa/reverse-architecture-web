import { Card, CardBody, CardFooter, SimpleGrid } from "@chakra-ui/react";
import { FC, useCallback } from "react";
import { ThumbnailContainer, ThumbnailSelector, WorkspaceCardFooter } from "../components";
import { WorkspaceGroupInfo } from "../types";

type WorkspaceGroupHandler = (workspace: WorkspaceGroupInfo) => void;
type WorkspaceGroupRenameHandler = (workspace: WorkspaceGroupInfo, value: string) => void;

export const WorkspaceStackCard: FC<{
    group: WorkspaceGroupInfo;
    isSelected?: boolean;
    onTouchStart?: WorkspaceGroupHandler;
    onTouchEnd?: WorkspaceGroupHandler;
    onOpen?: WorkspaceGroupHandler;
    onRename?: WorkspaceGroupRenameHandler;
    onSelect?: WorkspaceGroupHandler;
    onClone?: WorkspaceGroupHandler;
    onArchive?: WorkspaceGroupHandler;
    onRestore?: WorkspaceGroupHandler;
    onDelete?: WorkspaceGroupHandler;
}> = ({
    group,
    isSelected,
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
    const [first, second, third, ...rest] = group.workspaces;
    
    const handleOnTouchStart = useCallback(() => {
        onTouchStart?.(group);
    }, [onTouchStart, group]);

    const handleOnTouchEnd = useCallback(() => {
        onTouchEnd?.(group);
    }, [onTouchEnd, group]);

    const handleOnOpen = useCallback(() => {
        onOpen?.(group);
    }, [onOpen, group]);

    const handleOnSelect = useCallback(() => {
        onSelect?.(group);
    }, [onSelect, group]);

    const handleOnRename = useCallback((value: string) => {
        onRename?.(group, value);
    }, [onRename, group]);

    const handleOnClone = useCallback(() => {
        onClone?.(group);
    }, [onClone, group]);

    const handleOnArchive = useCallback(() => {
        onArchive?.(group);
    }, [onArchive, group]);

    const handleOnRestore = useCallback(() => {
        onRestore?.(group);
    }, [onRestore, group]);

    const handleOnDelete = useCallback(() => {
        onDelete?.(group);
    }, [onDelete, group]);

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
                    <SimpleGrid autoRows={"1fr"} columns={2} p={1} spacing={1} h={"100%"} w={"100%"}>
                        <ThumbnailSelector data={first} />
                        <ThumbnailSelector data={second} />
                        <ThumbnailSelector data={third} />
                        <ThumbnailSelector data={(first && second && third) ? rest : undefined} />
                    </SimpleGrid>
                </ThumbnailContainer>
            </CardBody>
            <CardFooter>
                <WorkspaceCardFooter
                    name={group.name}
                    lastModifiedDate={group.lastModifiedDate}
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