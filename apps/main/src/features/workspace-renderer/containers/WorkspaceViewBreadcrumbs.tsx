import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Icon,
    Text
} from "@chakra-ui/react";
import { ViewDefinition, ViewType } from "@structurizr/dsl";
import { useWorkspace, WorkspacePanel } from "@structurizr/react";
import { AppleShortcuts } from "iconoir-react";
import { FC, useEffect, useState } from "react";
import {
    ComponentPathProvider,
    ContainerPathProvider,
    SystemContextPathProvider,
    SystemLandscapePathProvider,
    useWorkspaceNavigation
} from "../../../features";
import { ISupportPath } from "../types/ISuppportPath";

export const WorkspaceViewBreadcrumbs: FC<{ isVisible?: boolean; }> = ({ isVisible = true }) => {
    const { workspace } = useWorkspace();
    const { currentView, setCurrentView } = useWorkspaceNavigation();
    const [ links, setLinks ] = useState<Array<{ title: string, isActive: boolean, view: ViewDefinition }>>([]);

    useEffect(() => {
        if (currentView) {
            const pathBuilders: Record<ViewType, ISupportPath> = {
                [ViewType.SystemLandscape]: new SystemLandscapePathProvider(),
                [ViewType.SystemContext]: new SystemContextPathProvider(),
                [ViewType.Container]: new ContainerPathProvider(),
                [ViewType.Component]: new ComponentPathProvider(),
                [ViewType.Deployment]: undefined,
                [ViewType.Model]: undefined,
                [ViewType.None]: undefined,
            };
            const viewPath = pathBuilders[currentView.type]?.getPath(workspace, currentView) ?? [];
            const links = viewPath.map((view, index) => ({
                title: view.title,
                isActive: index === viewPath.length - 1,
                view: view
            }));
            
            setLinks(links);
        }
    }, [currentView, workspace]);

    return isVisible && (
        <WorkspacePanel position={"top-left"}>
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
                            onClick={() => setCurrentView(link.view)}
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