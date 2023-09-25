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

export const WorkspaceCard: FC<PropsWithChildren<{
    name: string;
    lastModifiedDate: string;
}>> = ({
    children,
    name,
    lastModifiedDate
}) => {
    return (
        <Card
            data-group
            backgroundColor={"transparent"}
            borderRadius={16}
            boxShadow={"none"}
            padding={1}
            _hover={{
                backgroundColor: "whiteAlpha.100",
                cursor: "pointer",
            }}
        >
            <CardBody px={0} py={1}>
                {children}
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
                        color={"whiteAlpha.700"}
                        fontSize={16}
                        lineHeight={"20px"}
                        noOfLines={1}
                        _groupHover={{ color: "basic.white" }}
                    >
                        {name}
                    </Text>
                    <Text
                        color={"whiteAlpha.500"}
                        fontSize={14}
                        lineHeight={"18px"}
                        _groupHover={{ color: "whiteAlpha.700" }}
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
                />
            </CardFooter>
        </Card>
    )
}