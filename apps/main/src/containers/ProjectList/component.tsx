import { Box, Flex } from "@chakra-ui/react";
import { EmptyContent } from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import { FC } from "react";
import { ContentViewMode } from "../../hooks";
import { ProjectInfo } from "../../model";
import {
    ProjectCardView,
    ProjectProvider,
    ProjectTableView
} from "../../containers";

export const ProjectList: FC<{
    projects: ProjectInfo[];
    view: ContentViewMode;
    emptyTitle?: string;
    emptyDescription?: string;
    onSelected?: (selected: any[]) => void;
    onRemove?: (data: any[]) => void;
}> = ({
    projects,
    view,
    emptyTitle,
    emptyDescription,
    onSelected,
    onRemove
}) => {
    return (
        <Box height={"100%"}>
            {projects.length === 0 && (
                <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    height={"100%"}
                    width={"100%"}
                >
                    <EmptyContent
                        icon={Folder}
                        title={emptyTitle}
                        description={emptyDescription}
                    />
                </Flex>
            )}
            {projects.length > 0 && view === ContentViewMode.Card && (
                <ProjectProvider>
                    <ProjectCardView
                        projects={projects}
                        onRemove={onRemove}
                    />
                </ProjectProvider>
            )}
            {projects.length > 0 && view === ContentViewMode.Table && (
                <ProjectProvider>
                    <ProjectTableView
                        projects={projects}
                        onSelected={onSelected}
                        onRemove={onRemove}
                    />
                </ProjectProvider>
            )}
        </Box>
    )
}