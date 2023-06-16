import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button
} from "@chakra-ui/react";
import { Panel } from "@reactflow/core";
import { IViewDefinition } from "@structurizr/dsl";
import {
    Circle,
    Hexagon,
    Rhombus,
    Square,
    Triangle,
} from "iconoir-react";
import { FC, useCallback } from "react";
import {
    useWorkspaceNavigation,
    useWorkspaceStore
} from "../hooks";

export const WorkspaceBreadcrumbs: FC<{
    onClick?: (view: IViewDefinition) => void;
}> = ({
    onClick
}) => {
    const { navigate } = useWorkspaceNavigation();
    const { workspace, viewPath } = useWorkspaceStore();
    
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
    const items = [
        {
            title: `Workspace - ${workspace.name}`,
            colorScheme: colorSchemes.at(0).scheme,
            icon: colorSchemes.at(0).icon,
            isCurrentPage: viewPath.path.length === 0,
            view: undefined
        },
        ...viewPath.path.map((view, index) => ({
            title: `${view.type} - ${view.title}`,
            colorScheme: colorSchemes[(index + 1) % colorSchemes.length].scheme,
            icon: colorSchemes[(index + 1) % colorSchemes.length].icon,
            isCurrentPage: index === viewPath.path.length - 1,
            view: view
        }))
    ]

    const onNavigate = useCallback((view: IViewDefinition) => {
        navigate(view);
        onClick?.(view);
    }, [navigate, onClick]);

    return (
        <Panel position={"top-left"}>
            <Breadcrumb separator={""}>
                {items.map(item => (
                    <BreadcrumbItem
                        key={item.title}
                        isCurrentPage={item.isCurrentPage}
                    >
                        <BreadcrumbLink
                            as={Button}
                            colorScheme={item.colorScheme}
                            leftIcon={item.icon}
                            onClick={() => onNavigate(item.view)}
                        >
                            {item.title}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
        </Panel>
    )
}