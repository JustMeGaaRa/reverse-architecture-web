import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import { FC } from "react";
import { ProjectCard } from "./ProjectCard";

export const ProjectList: FC<{
    projects: any[]
}> = ({
    projects
}) => {
    return (
        <Box height={"100%"} overflowY={"scroll"}>
            <Wrap padding={6} spacing={6}>
                {projects.map((item) => (
                    <WrapItem key={item.name}>
                        <ProjectCard
                            name={item.name}
                            updated={item.updated}
                            preview={item.url}
                        />
                    </WrapItem>
                ))}
            </Wrap>
        </Box>
    )
}