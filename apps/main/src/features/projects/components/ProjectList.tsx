import { Box } from "@chakra-ui/react";
// TODO: consider making this component/feature less dependent on the workspace-viewer package
import { EmptyContent } from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import { FC } from "react";
import {
    ProjectCardView,
    ProjectProvider,
    ProjectTableView
} from "../components";
import { ProjectInfo } from "../types";

export const ProjectList: FC<{
    projects: ProjectInfo[];
    view: "card" | "table";
    emptyTitle?: string;
    emptyDescription?: string;
    onSelected?: (selected: any[]) => void;
    onRemove?: (data: any[]) => void;
    onClick?: (project: ProjectInfo) => void;
}> = ({
    projects,
    view,
    emptyTitle,
    emptyDescription,
    onSelected,
    onRemove,
    onClick
}) => {
    return (
        <Box>
            {projects.length === 0 && (
                <EmptyContent
                    icon={Folder}
                    title={emptyTitle}
                    description={emptyDescription}
                />
            )}
            {projects.length > 0 && view === "card" && (
                <ProjectProvider>
                    <ProjectCardView
                        projects={projects}
                        onRemove={onRemove}
                        onClick={onClick}
                    />
                </ProjectProvider>
            )}
            {projects.length > 0 && view === "table" && (
                <ProjectProvider>
                    <ProjectTableView
                        projects={projects}
                        onSelected={onSelected}
                        onRemove={onRemove}
                        onClick={onClick}
                    />
                </ProjectProvider>
            )}
        </Box>
    )
}