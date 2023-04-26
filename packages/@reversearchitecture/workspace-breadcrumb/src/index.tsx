import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button
} from "@chakra-ui/react";
import { IView, IViewDefinition } from "@structurizr/dsl";
import { useWorkspaceStore } from "@reversearchitecture/workspace-viewer";
import {
    Hexagon,
    Rhombus,
    Square,
    Triangle,
} from "iconoir-react";
import { FC, useCallback } from "react";

export const WorkspaceBreadcrumb: FC<{
    path: Array<IViewDefinition>;
    onClick?: (view: IView) => void;
}> = ({
    path,
    onClick
}) => {
    const {
        workspace,
        setSelectedView
    } = useWorkspaceStore();
    
    const colors = [
        {
            scheme: "yellow",
            color: "#E3FB51",
            icon: (<Triangle fontSize={6} color={"#E3FB51"} />)
        },
        {
            scheme: "blue",
            color: "#0A84FF",
            icon: (<Square fontSize={6} color={"#0A84FF"} />)
        },
        {
            scheme: "purple",
            color: "#BF5AF2",
            icon: (<Rhombus fontSize={6} color={"#BF5AF2"} />)
        },
        {
            scheme: "red",
            color: "#FF453A",
            icon: (<Hexagon fontSize={6} color={"#FF453A"} />)
        }
    ];

    const onBreadcrumItemClick = useCallback((view) => {
        const selectedView: IView = 
            workspace.views.systemContexts.find(x => x.type === view.type && x.identifier === view.identifier)
            ?? workspace.views.containers.find(x => x.type === view.type && x.identifier === view.identifier)
            ?? workspace.views.components.find(x => x.type === view.type && x.identifier === view.identifier)
            ?? view;

        setSelectedView(selectedView);

        onClick?.(view);
    }, [workspace, setSelectedView, onClick]);

    return (
        <Breadcrumb separator={""}>
            {path.map((view, index) => (
                <BreadcrumbItem
                    key={`${view.type}-${view.identifier}`}
                    isCurrentPage={index === path.length - 1}
                >
                    <BreadcrumbLink
                        as={Button}
                        backgroundColor={"gray.100"}
                        borderColor={"gray.200"}
                        borderWidth={1}
                        borderRadius={8}
                        colorScheme={colors[index].scheme}
                        height={"24px"}
                        leftIcon={colors[index].icon}
                        fontSize={"14px"}
                        color={"gray.700"}
                        _hover={{
                            textDecoration: "none"
                        }}
                        _activeLink={{
                            colorScheme: colors[index].scheme,
                            backgroundColor: `${colors[index].scheme}.100`,
                            borderColor: `${colors[index].scheme}.primary`,
                            color: "basic.White"
                        }}
                        onClick={onBreadcrumItemClick}
                    >
                        {`${view.type} - ${view.title}`}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    )
}