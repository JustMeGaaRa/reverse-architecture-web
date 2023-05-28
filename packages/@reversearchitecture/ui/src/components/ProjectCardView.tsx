import { Wrap, WrapItem } from "@chakra-ui/react";
import { FC } from "react";
import { ProjectCard } from "./ProjectCard";

export const ProjectCardView: FC<{
    projects: any[];
}> = ({
    projects
}) => {
    return (
        <Wrap spacing={6}>
            {projects.map((project) => (
                <WrapItem key={project.name}>
                    <ProjectCard
                        name={project.name}
                        updated={project.updated}
                        preview={project.url}
                    />
                </WrapItem>
            ))}
        </Wrap>
    )
}