import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, Text } from "@chakra-ui/react";
import { Categories } from "@restruct/icons";
import { findElement, findElementPath, IElement, ViewType } from "@structurizr/dsl";
import { useWorkspace, useWorkspaceNavigation } from "@structurizr/svg";
import { FC, useEffect, useState } from "react";

export const BreadcrumbsNavigation: FC = () => {
    const { workspace } = useWorkspace();
    const { currentView, zoomIntoElement } = useWorkspaceNavigation();
    const [ links, setLinks ] = useState<Array<{ title: string, isCurrentPage: boolean, element: IElement }>>([]);

    useEffect(() => {
        if (currentView) {
            const elementIdentifier = currentView?.type === ViewType.SystemLandscape
                ? undefined
                : currentView?.type === ViewType.SystemContext
                    ? currentView.softwareSystemIdentifier
                    : currentView?.type === ViewType.Container
                        ? currentView.softwareSystemIdentifier
                        : currentView?.type === ViewType.Component
                            ? currentView.containerIdentifier
                            : undefined;
            const element = findElement(workspace.model, elementIdentifier);
            const elementPath = findElementPath(workspace.model, element?.identifier);
            const breadcrumbsLinks = [
                {
                    title: "System Landscape",
                    isCurrentPage: elementPath.length === 0,
                    element: undefined
                },
                ...elementPath.map((element, index) => ({
                    title: element.name,
                    isCurrentPage: index === elementPath.length - 1,
                    element
                }))
            ];
            
            setLinks(breadcrumbsLinks);
        }
    }, [currentView, workspace]);
    
    return (
        <Breadcrumb separator={"/"}>
            {links.map(link => (
                <BreadcrumbItem
                    key={link.title}
                    aria-selected={link.isCurrentPage}
                    isCurrentPage={link.isCurrentPage}
                >
                    <BreadcrumbLink
                        aria-selected={link.isCurrentPage}
                        isCurrentPage={link.isCurrentPage}
                        marginX={1}
                        alignItems={"center"}
                        justifyContent={"center"}
                        title={link.title}
                        onClick={() => zoomIntoElement(workspace, link.element)}
                    >
                        <Icon as={Categories} boxSize={4} />
                        <Text noOfLines={1}>{link.title}</Text>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};
