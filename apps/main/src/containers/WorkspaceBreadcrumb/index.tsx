import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button
} from "@chakra-ui/react";
import { GenericView } from "@justmegaara/structurizr-dsl";
import {
    Rhombus,
    Square,
    Triangle,
} from "iconoir-react";
import { FC } from "react";

export const WorkspaceBreadcrumb: FC<{
    path: Array<GenericView>;
    onClick?: (view: GenericView) => void;
}> = ({
    path,
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
            {path.map((view, index) => (
                <BreadcrumbItem
                    key={view.identifier}
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
                        onClick={() => onClick?.(view)}
                    >
                        {`${view.type} - ${view.title}`}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    )
}