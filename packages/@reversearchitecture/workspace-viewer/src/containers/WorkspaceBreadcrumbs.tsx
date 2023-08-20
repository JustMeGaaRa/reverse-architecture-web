import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button
} from "@chakra-ui/react";
import {
    ComponentPathProvider,
    ContainerPathProvider,
    DeploymentPathProvider,
    ISupportPath,
    SystemContextPathProvider,
    SystemLandscapePathProvider,
    ViewKeys,
    ViewType
} from "@structurizr/dsl";
import {
    Circle,
    Hexagon,
    Rhombus,
    Square,
    Triangle,
} from "iconoir-react";
import { FC, useCallback, useEffect, useState } from "react";
import { useWorkspace, useWorkspaceStore } from "../hooks";

export const WorkspaceBreadcrumbs: FC = () => {
    const [ links, setLinks ] = useState<Array<{
        title: string;
        color: string;
        icon: any;
        isActive: boolean;
        data: any;
    }>>([]);
    const { workspace, selectedView } = useWorkspaceStore();
    const { zoomIntoView } = useWorkspace();

    useEffect(() => {
        const colorSchemes = [
            {
                scheme: "red",
                icon: (<Hexagon fontSize={6} color={"#FF453A"} />)
            },
            {
                scheme: "yellow",
                icon: (<Triangle fontSize={6} color={"#E3FB51"} />)
            },
            {
                scheme: "blue",
                icon: (<Square fontSize={6} color={"#0A84FF"} />)
            },
            {
                scheme: "purple",
                icon: (<Rhombus fontSize={6} color={"#BF5AF2"} />)
            },
            {
                scheme: "green",
                icon: (<Circle fontSize={6} color={"#32D74B"} />)
            }
        ];

        const pathBuilders: Map<ViewType, ISupportPath> = new Map<ViewType, ISupportPath>([
            [ ViewType.SystemLandscape, new SystemLandscapePathProvider() ],
            [ ViewType.SystemContext, new SystemContextPathProvider() ],
            [ ViewType.Container, new ContainerPathProvider() ],
            [ ViewType.Component, new ComponentPathProvider() ],
            [ ViewType.Deployment, new DeploymentPathProvider() ],
        ]);
        const path = pathBuilders.get(selectedView.type)?.getPath(workspace, selectedView) ?? [];

        setLinks(path.map((view, index) => ({
            title: `${view.type} - ${view.title}`,
            color: colorSchemes[(index + 1) % colorSchemes.length].scheme,
            icon: colorSchemes[(index + 1) % colorSchemes.length].icon,
            isActive: index === path.length - 1,
            data: view
        })));
    }, [workspace, selectedView]);

    const handleOnViewItemClick = useCallback(zoomIntoView, [zoomIntoView]);

    return (
        <Box position={"absolute"} top={4} left={4}>
            <Breadcrumb separator={""}>
                {links.map(link => (
                    <BreadcrumbItem key={link.title} isCurrentPage={link.isActive}>
                        <BreadcrumbLink
                            as={Button}
                            backdropFilter={"auto"}
                            backdropBlur={"8px"}
                            colorScheme={link.isActive ? link.color : "whiteAlpha"}
                            leftIcon={link.icon}
                            onClick={() => handleOnViewItemClick(link.data)}
                            title={link.title}
                        >
                            {link.title}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
        </Box>
    )
}