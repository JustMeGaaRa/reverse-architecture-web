import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Icon,
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
                            as={Button}
                            aria-selected={link.isActive}
                            isCurrentPage={link.isActive}
                            leftIcon={<Icon as={AppleShortcuts} boxSize={4} />}
                            marginX={1}
                            size={"xs"}
                            title={link.title}
                            variant={"toolitem"}
                            onClick={() => handleOnViewItemClick(link.data)}
                        >
                            {link.title}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
        </WorkspacePanel>
    )
}