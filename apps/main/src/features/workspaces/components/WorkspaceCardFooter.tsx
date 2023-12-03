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
import { BinMinusIn, Copy, InputField, MoreHoriz } from "iconoir-react";
import { FC, MouseEventHandler } from "react";

export const WorkspaceCardFooter: FC<{
    name: string;
    lastModifiedDate: string;
    onRename?: () => void;
    onSelect?: () => void;
    onClone?: () => void;
    onDelete?: MouseEventHandler<HTMLButtonElement>;
}> = ({
    name,
    lastModifiedDate,
    onRename,
    onSelect,
    onClone,
    onDelete
}) => {
    return (
        <Flex
            padding={2}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
        >
            <Flex direction={"column"}>
                <Text color={"basic.white"} noOfLines={1} textStyle={"b3"}>
                    {name}
                </Text>
                <Text color={"gray.700"} textStyle={"b5"}>
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
                    <MenuItem icon={<Icon as={InputField} boxSize={4} />} onClick={onRename}>
                        Rename
                    </MenuItem>
                    <MenuItem icon={<Icon as={Copy} boxSize={4} />} onClick={onClone}>
                        Clone
                    </MenuItem>
                    <MenuItem icon={<Icon as={BinMinusIn} boxSize={4} />} onClick={onDelete}>
                        Delete
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    )
}