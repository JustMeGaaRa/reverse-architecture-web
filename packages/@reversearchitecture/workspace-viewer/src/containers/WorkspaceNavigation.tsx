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
    ViewType
} from "@structurizr/dsl";
import {
    Circle,
    Hexagon,
    Rhombus,
    Square,
    Triangle,
} from "iconoir-react";
import { FC, useCallback } from "react";
import { useViewNavigation, useWorkspaceStore, useWorkspaceTheme } from "../hooks";

export const WorkspaceNavigation: FC = () => {
    const { workspace, selectedView } = useWorkspaceStore();
    const { getViewAccentColor } = useWorkspaceTheme();
    const { zoomIntoView } = useViewNavigation();

    const pathBuilders: Map<ViewType, ISupportPath> = new Map<ViewType, ISupportPath>([
        [ ViewType.SystemLandscape, new SystemLandscapePathProvider() ],
        [ ViewType.SystemContext, new SystemContextPathProvider() ],
        [ ViewType.Container, new ContainerPathProvider() ],
        [ ViewType.Component, new ComponentPathProvider() ],
        [ ViewType.Deployment, new DeploymentPathProvider() ],
    ]);
    const path = pathBuilders.get(selectedView.type)?.getPath(workspace, selectedView) ?? [];
    const links = path.map((view, index) => ({
        title: `${view.type} - ${view.title}`,
        colorScheme: getViewAccentColor(view.type),
        isActive: index === path.length - 1,
        data: view
    }));

    const handleOnViewItemClick = useCallback(zoomIntoView, [zoomIntoView]);

    return (
        <Box position={"absolute"} top={4} left={4}>
            <Breadcrumb separator={""}>
                {links.map(link => (
                    <BreadcrumbItem key={link.title} isCurrentPage={link.isActive}>
                        <BreadcrumbLink
                            as={Button}
                            backdropFilter={"auto"}
                            backdropBlur={"16px"}
                            colorScheme={link.isActive ? link.colorScheme : "whiteAlpha"}
                            title={link.title}
                            onClick={() => handleOnViewItemClick(link.data)}
                        >
                            {link.title}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
        </Box>
    )
}