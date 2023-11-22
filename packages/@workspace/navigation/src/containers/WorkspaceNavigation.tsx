import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    HStack,
    Select,
    StackDivider
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
    useWorkspaceStore,
    useWorkspaceTheme
} from "@workspace/core";
import { useViewNavigation } from "@workspace/diagramming";
import { ChangeEvent, FC, useCallback } from "react";

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
        title: view.title,
        colorScheme: getViewAccentColor(view.type),
        isActive: index === path.length - 1,
        data: view
    }));

    const handleOnViewItemClick = useCallback((viewKeys) => {
        zoomIntoView(viewKeys);
    }, [zoomIntoView]);

    const handleOnViewTypeChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const selectedViewType = event.target.value as ViewType;
        zoomIntoView({ type: selectedViewType, identifier: undefined });
    }, [zoomIntoView]);

    return (
        <Breadcrumb
            backgroundColor={"surface.tinted-black-10"}
            backdropFilter={"blur(16px)"}
            borderRadius={12}
            color={"gray.900"}
            separator={"/"}
        >
            <BreadcrumbItem>
                <Select
                    backgroundColor={"whiteAlpha.100"}
                    borderWidth={1}
                    backdropFilter={"blur(8px)"}
                    borderRadius={8}
                    color={"gray.900"}
                    size={"xs"}
                    _hover={{
                        backgroundColor: "whiteAlpha.200",
                        borderColor: "whiteAlpha.400",
                        color: "basic.white"
                    }}
                    onChange={handleOnViewTypeChange}
                >
                    <option value={ViewType.SystemLandscape}>{ViewType.SystemLandscape}</option>
                    <option value={ViewType.SystemContext}>{ViewType.SystemContext}</option>
                    <option value={ViewType.Deployment}>{ViewType.Deployment}</option>
                </Select>
            </BreadcrumbItem>
            {links.map(link => (
                <BreadcrumbItem key={link.title} isCurrentPage={link.isActive}>
                    <BreadcrumbLink
                        title={link.title}
                        onClick={() => handleOnViewItemClick(link.data)}
                    >
                        {link.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    )
}