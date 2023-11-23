import { Card, CardBody, CardFooter, SimpleGrid } from "@chakra-ui/react";
import { FC } from "react";
import { ThumbnailContainer, ThumbnailSelector, WorkspaceCardFooter } from "../components";
import { useSelectionItem } from "../hooks";
import { WorkspaceGroupInfo } from "../types";

export const WorkspaceStackCard: FC<{
    group: WorkspaceGroupInfo;
    onPreviewClick?: () => void;
}> = ({
    group,
    onPreviewClick
}) => {
    const [first, second, third, ...rest] = group.workspaces;
    const { index, isSelected } = useSelectionItem();

    return (
        <Card data-group>
            <CardBody>
                <ThumbnailContainer
                    isSelected={isSelected}
                    onClick={onPreviewClick}
                >
                    <SimpleGrid autoRows={"1fr"} columns={2} padding={1} spacing={1} height={"100%"} width={"100%"}>
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
                />
            </CardFooter>
        </Card>
    )
}