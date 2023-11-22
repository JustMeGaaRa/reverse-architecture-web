import {
    Card,
    CardBody,
    CardFooter,
    Flex,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from "@chakra-ui/react";
import { BinMinus, MoreHoriz } from "iconoir-react";
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
            backgroundColor={"surface.tinted-white-5"}
            borderRadius={16}
            boxShadow={"none"}
            _hover={{
                backgroundColor: isSelected ? "whiteAlpha.200" : "whiteAlpha.100",
                cursor: "pointer",
            }}
            _active={{
                backgroundColor: "surface.tinted-white-2"
            }}
        >
            <CardBody padding={0}>
                {children}
            </CardBody>
            <CardFooter padding={0}>
                <Flex padding={2} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                    <Flex direction={"column"}>
                        <Text
                            color={"basic.white"}
                            noOfLines={1}
                            textStyle={"b3"}
                        >
                            {name}
                        </Text>
                        <Text
                            color={"gray.700"}
                            textStyle={"b5"}
                        >
                            {lastModifiedDate}
                        </Text>
                    </Flex>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label={"more options"}
                            colorScheme={"gray"}
                            icon={<Icon as={MoreHoriz} boxSize={5} />}
                            size={"sm"}
                            variant={"ghost"}
                            title={"more options"}
                        />
                        <MenuList>
                            <MenuItem icon={<Icon as={BinMinus} boxSize={4} />}>
                                Remove
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </CardFooter>
        </Card>
    )
}