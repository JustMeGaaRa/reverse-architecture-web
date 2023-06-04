import { Grid, useBreakpointValue } from "@chakra-ui/react";
import { FC } from "react";
import { ProjectCard } from "./ProjectCard";

export const ProjectCardView: FC<{
    projects: any[];
}> = ({
    projects
}) => {
    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 });

    return (
        <Grid gridTemplateColumns={`repeat(${gridColumns}, 1fr)`} gap={6}>
            {projects.map((project) => (
                <ProjectCard
                    key={project.name}
                    name={project.name}
                    updated={project.updated}
                    preview={project.url}
                />
            ))}
        </Grid>
    )
}