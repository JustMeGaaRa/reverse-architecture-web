import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Select,
} from "@chakra-ui/react";
import { ViewKeys, ViewType, Workspace } from "@structurizr/dsl";
import {
    PanelPosition,
    WorkspacePanel
} from "@workspace/core";
import { useWorkspaceNavigation } from "@workspace/diagramming";
import { ChangeEvent, FC, useCallback } from "react";

export const WorkspaceViewPath: FC<{
    position?: PanelPosition;
    workspace: Workspace;
    path?: ViewKeys[];
}> = ({
    position,
    workspace,
    path
}) => {
    // TODO: consider if using path as a prop should be an option
    const { currentViewPath, openView } = useWorkspaceNavigation();

    const links = (path ?? currentViewPath).map((view, index) => ({
        title: view.title,
        isActive: index === currentViewPath.length - 1,
        data: view
    }));

    const handleOnViewItemClick = useCallback((viewKeys: ViewKeys) => {
        openView(workspace, viewKeys);
    }, [openView, workspace]);

    const handleOnViewTypeChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const selectedViewType = event.target.value as ViewType;
        openView(workspace, { type: selectedViewType, identifier: undefined });
    }, [openView, workspace]);

    return (
        <WorkspacePanel position={position ?? "top-left"}>
            <Breadcrumb separator={"/"}>
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
                            color: "white"
                        }}
                        onChange={handleOnViewTypeChange}
                    >
                        <option value={ViewType.SystemLandscape}>{ViewType.SystemLandscape}</option>
                        <option value={ViewType.SystemContext}>{ViewType.SystemContext}</option>
                        <option value={ViewType.Deployment}>{ViewType.Deployment}</option>
                    </Select>
                </BreadcrumbItem>
                {links.map(link => (
                    <BreadcrumbItem
                        key={link.title}
                        aria-selected={link.isActive}
                        isCurrentPage={link.isActive}
                    >
                        <BreadcrumbLink
                            aria-selected={link.isActive}
                            isCurrentPage={link.isActive}
                            title={link.title}
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