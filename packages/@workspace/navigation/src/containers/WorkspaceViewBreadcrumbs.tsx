import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Icon,
    Text
} from "@chakra-ui/react";
import {
    ViewKeys,
    ViewType
} from "@structurizr/dsl";
import {
    PanelPosition,
    useWorkspace,
    useWorkspaceNavigation,
    WorkspacePanel
} from "@workspace/core";
import { AppleShortcuts } from "iconoir-react";
import { FC, useCallback, useEffect, useState } from "react";
import {
    ComponentPathProvider,
    ContainerPathProvider,
    SystemContextPathProvider,
    SystemLandscapePathProvider
} from "../types";

export const WorkspaceViewBreadcrumbs: FC<{
    position?: PanelPosition;
    isVisible?: boolean;
}> = ({
    position,
    isVisible = true
}) => {
    const { workspace } = useWorkspace();
    const { currentView, openView } = useWorkspaceNavigation();
    const [ links, setLinks ] = useState([]);

    useEffect(() => {
        const pathBuilders = {
            [ViewType.SystemLandscape]: new SystemLandscapePathProvider(),
            [ViewType.SystemContext]: new SystemContextPathProvider(),
            [ViewType.Container]: new ContainerPathProvider(),
            [ViewType.Component]: new ComponentPathProvider()
        };
        const viewPath = pathBuilders[currentView.type]?.getPath(workspace, currentView) ?? [];
        const links = viewPath.map((view, index) => ({
            title: view.title,
            isActive: index === viewPath.length - 1,
            data: view
        }));
        
        setLinks(links);
    }, [currentView, workspace])

    const handleOnViewItemClick = useCallback((viewKeys: ViewKeys) => {
        openView(workspace, viewKeys);
    }, [openView, workspace]);

    return isVisible && (
        <WorkspacePanel position={position ?? "top-left"}>
            <Breadcrumb separator={"/"}>
                {links.map(link => (
                    <BreadcrumbItem
                        key={link.title}
                        aria-selected={link.isActive}
                        isCurrentPage={link.isActive}
                    >
                        <BreadcrumbLink
                            aria-selected={link.isActive}
                            isCurrentPage={link.isActive}
                            marginX={1}
                            alignItems={"center"}
                            justifyContent={"center"}
                            title={link.title}
                            onClick={() => handleOnViewItemClick(link.data)}
                        >
                            <Icon as={AppleShortcuts} boxSize={4} />
                            <Text noOfLines={1}>{link.title}</Text>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
        </WorkspacePanel>
    )
}