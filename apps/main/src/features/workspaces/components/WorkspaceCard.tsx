import {
    Card,
    CardBody,
    CardFooter,
    Flex,
    IconButton,
    Text,
} from "@chakra-ui/react";
import { MoreHoriz } from "iconoir-react";
import { FC, PropsWithChildren } from "react";
import { useSelectionItem } from "../hooks";

export const WorkspaceCard: FC<PropsWithChildren<{
    name: string;
    lastModifiedDate: string;
}>> = ({
    children,
    name,
    lastModifiedDate
}) => {
    const { isSelected } = useSelectionItem();

    return (
        <Card
            data-group
            backgroundColor={isSelected ? "whiteAlpha.100" : "transparent"}
            borderRadius={16}
            boxShadow={"none"}
            cursor={"pointer"}
            padding={1}
            _hover={{ backgroundColor: isSelected ? "whiteAlpha.200" : "whiteAlpha.100" }}
        >
            <CardBody padding={0}>
                <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    {children}
                </Flex>
            </CardBody>
            <CardFooter
                paddingLeft={3}
                paddingRight={2}
                paddingY={1}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
            >
                <Flex direction={"column"}>
                    <Text
                        color={"whiteAlpha.800"}
                        fontSize={16}
                        lineHeight={"20px"}
                        noOfLines={1}
                        _groupHover={{ color: isSelected ? "basic.white" : "whiteAlpha.800" }}
                    >
                        {name}
                    </Text>
                    <Text
                        color={isSelected ? "whiteAlpha.700" : "gray.700"}
                        fontSize={14}
                        lineHeight={"18px"}
                    >
                        {lastModifiedDate}
                    </Text>
                </Flex>
                <IconButton
                    aria-label={"more options"}
                    colorScheme={"gray"}
                    icon={<MoreHoriz />}
                    size={"md"}
                    variant={"ghost"}
                    visibility={"hidden"}
                    _groupHover={{ visibility: "visible" }}
                />
            </CardFooter>
        </Card>
    )
}