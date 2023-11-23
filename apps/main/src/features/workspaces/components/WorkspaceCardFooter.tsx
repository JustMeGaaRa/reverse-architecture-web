import {
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
import { FC } from "react";

export const WorkspaceCardFooter: FC<{
    name: string;
    lastModifiedDate: string;
    onRemove?: () => void;
}> = ({
    name,
    lastModifiedDate,
    onRemove
}) => {
    return (
        <Flex
            padding={2}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
        >
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
                    <MenuItem
                        icon={<Icon as={BinMinus} boxSize={4} />}
                        onClick={onRemove}
                    >
                        Remove
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    )
}