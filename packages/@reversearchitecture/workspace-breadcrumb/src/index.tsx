import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button
} from "@chakra-ui/react";
import { IViewDefinition } from "@structurizr/dsl";
import { useWorkspaceNavigation } from "@reversearchitecture/workspace-viewer";
import {
    Circle,
    Hexagon,
    Rhombus,
    Square,
    Triangle,
} from "iconoir-react";
import { FC, useCallback } from "react";

export const WorkspaceBreadcrumb: FC<{
    path: Array<IViewDefinition>;
    onClick?: (view: IViewDefinition) => void;
}> = ({
    path,
    onClick
}) => {
    const { navigate } = useWorkspaceNavigation();
    
    const colorSchemes = [
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
            scheme: "red",
            icon: (<Hexagon fontSize={6} color={"#FF453A"} />)
        },
        {
            scheme: "green",
            icon: (<Circle fontSize={6} color={"#32D74B"} />)
        }
    ];

    const handleOnBreadcrumLinkClick = useCallback((view: IViewDefinition) => {
        navigate(view);
        onClick?.(view);
    }, [navigate, onClick]);

    return (
        <Breadcrumb separator={""}>
            {path.map((view, index) => {
                const color = colorSchemes[index % colorSchemes.length];
                const title = `${view.type} - ${view.title}`;
                return (
                    <BreadcrumbItem
                        key={title}
                        isCurrentPage={index === path.length - 1}
                    >
                        <BreadcrumbLink
                            as={Button}
                            colorScheme={color.scheme}
                            leftIcon={color.icon}
                            onClick={() => handleOnBreadcrumLinkClick(view)}
                        >
                            {title}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )}
            )}
        </Breadcrumb>
    )
}