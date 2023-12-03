import { Card, CardBody, CardFooter, SimpleGrid } from "@chakra-ui/react";
import { FC, MouseEventHandler, TouchEventHandler } from "react";
import { ThumbnailContainer, ThumbnailSelector, WorkspaceCardFooter } from "../components";
import { WorkspaceGroupInfo } from "../types";

export const WorkspaceStackCard: FC<{
    group: WorkspaceGroupInfo;
    isSelected?: boolean;
    onTouchStart?: TouchEventHandler<HTMLDivElement>;
    onTouchEnd?: TouchEventHandler<HTMLDivElement>;
    onOpen?: MouseEventHandler<HTMLDivElement>;
    onRename?: () => void;
    onSelect?: () => void;
    onClone?: () => void;
    onDelete?: MouseEventHandler<HTMLButtonElement>;
}> = ({
    group,
    isSelected,
    onTouchStart,
    onTouchEnd,
    onOpen,
    onSelect,
    onRename,
    onClone,
    onDelete
}) => {
    const [first, second, third, ...rest] = group.workspaces;

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
                    onRename={onRename}
                    onClone={onClone}
                    onDelete={onDelete}
                />
            </CardFooter>
        </Card>
    )
}