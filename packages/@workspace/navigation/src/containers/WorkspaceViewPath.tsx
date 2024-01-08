import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Icon,
} from "@chakra-ui/react";
import { ViewKeys, Workspace } from "@structurizr/dsl";
import {
    PanelPosition,
    useWorkspaceNavigation,
    WorkspacePanel
} from "@workspace/core";
import { AppleShortcuts } from "iconoir-react";
import { FC, useCallback } from "react";

export const WorkspaceViewPath: FC<{
    position?: PanelPosition;
    workspace: Workspace;
    path?: ViewKeys[];
    isVisible?: boolean;
}> = ({
    position,
    workspace,
    path,
    isVisible = true
}) => {
    const { currentViewPath, openView } = useWorkspaceNavigation();
    
    const links = (path ?? currentViewPath).map((view, index) => ({
        title: view.title,
        isActive: index === currentViewPath.length - 1,
        data: view
    }));

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