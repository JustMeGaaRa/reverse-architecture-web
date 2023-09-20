import { Grid, useBreakpointValue } from "@chakra-ui/react";
import { FC } from "react";
import { ProjectCard } from "../components";
import { ProjectInfo } from "../types";

export const ProjectCardView: FC<{
    projects: ProjectInfo[];
    onRemove?: (data: ProjectInfo[]) => void;
    onClick?: (project: ProjectInfo) => void;
}> = ({
    projects,
    onRemove,
    onClick
}) => {
    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 });

    return (
        <Grid gridTemplateColumns={`repeat(${gridColumns}, 1fr)`} gap={6}>
            {projects.map((project) => (
                <ProjectCard
                    key={project.name}
                    name={project.name}
                    updated={project.lastModifiedDate}
                    preview={project.coverUrl}
                    onPreviewClick={() => onClick?.(project)}
                />
            ))}
        </Grid>
    )
}