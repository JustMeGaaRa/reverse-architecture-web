import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button
} from "@chakra-ui/react";
import { Panel } from "@reactflow/core";
import { ViewKeys } from "@structurizr/dsl";
import {
    Circle,
    Hexagon,
    Rhombus,
    Square,
    Triangle,
} from "iconoir-react";
import { FC } from "react";

export const WorkspaceBreadcrumbs: FC<{
    path: ViewKeys[];
    onItemClick?: (view: ViewKeys) => void;
}> = ({
    path,
    onItemClick
}) => {
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
    const items = path.map((view, index) => ({
        title: `${view.type} - ${view.title}`,
        colorScheme: colorSchemes[(index + 1) % colorSchemes.length].scheme,
        icon: colorSchemes[(index + 1) % colorSchemes.length].icon,
        isCurrentPage: index === path.length - 1,
        view: view
    }));

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
                            onClick={() => onItemClick(item.view)}
                        >
                            {item.title}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
        </Panel>
    )
}