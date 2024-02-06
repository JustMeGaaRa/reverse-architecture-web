import { Flex, Text } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const SearchMenuItem: FC<PropsWithChildren<{
    icon?: any;
    isSelected?: boolean;
    onClick?: () => void;
}>> = ({
    children,
    icon,
    isSelected,
    onClick
}) => {
    return (
        <Flex
            aria-selected={isSelected}
            alignItems={"center"}
            borderRadius={12}
            color={"gray.900"}
            cursor={"pointer"}
            paddingX={"10px"}
            paddingY={"8px"}
            textStyle={"b2"}
            width={"100%"}
            _hover={{
                backgroundColor: "surface.tinted-white-10",
                backdropFilter: "blur(32px)",
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                color: "white",
            }}
            _active={{
                backgroundColor: "surface.tinted-white-5",
                backdropFilter: "blur(32px)",
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                color: "gray.500",
            }}
            _selected={{
                backgroundColor: "surface.tinted-white-10",
                backdropFilter: "blur(32px)",
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                color: "white",
            }}
            onClick={onClick}
        >
            {icon}
            <Text marginX={2}>
                {children}
            </Text>
        </Flex>
    )
}