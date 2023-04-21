import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button
} from "@chakra-ui/react";
import { Level } from "@justmegaara/workspace-viewer";
import {
    Rhombus,
    Square,
    Triangle,
} from "iconoir-react";
import { FC } from "react";

export const WorkspaceBreadcrumb: FC<{
    items: Array<Level>;
    onClick?: (level: Level) => void;
}> = ({
    items,
    onClick
}) => {
    // TODO: add more color levels
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
        }
    ];

    return (
        <Breadcrumb separator={""}>
            {items.map((level, index) => (
                <BreadcrumbItem
                    key={level.view.identifier}
                    isCurrentPage={index === items.length - 1}
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
                        onClick={() => onClick?.(level)}
                    >
                        {`${level.view.type} - ${level.view.title}`}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    )
}