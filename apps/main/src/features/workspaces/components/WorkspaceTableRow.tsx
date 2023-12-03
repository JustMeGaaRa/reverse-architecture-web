import {
    Flex,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Td,
    Tr
} from "@chakra-ui/react";
import {
    AppleShortcuts,
    BinMinusIn,
    Copy,
    InputField,
    MoreHoriz,
    Page
} from "iconoir-react";
import { FC, MouseEventHandler, TouchEventHandler } from "react";
import { TableColumnInfo } from "../types";

export const WorkspaceTableRow: FC<{
    data: any;
    columns: TableColumnInfo[];
    isSelected?: boolean;
    isGrouped?: boolean;
    onTouchStart?: TouchEventHandler<HTMLDivElement>;
    onTouchEnd?: TouchEventHandler<HTMLDivElement>;
    onOpen?: MouseEventHandler<HTMLDivElement>;
    onSelect?: () => void;
    onRename?: () => void;
    onClone?: () => void;
    onDelete?: MouseEventHandler<HTMLButtonElement>;
}> = ({
    data,
    columns,
    isSelected,
    isGrouped,
    onTouchStart,
    onTouchEnd,
    onOpen,
    onSelect,
    onRename,
    onClone,
    onDelete
}) => {
    return (
        <Tr data-group cursor={"pointer"}>
            <Td
                height={16}
                width={16}
                padding={1}
                borderTopLeftRadius={16}
                borderBottomLeftRadius={16}
                _groupHover={{
                    background: "surface.tinted-white-5"
                }}
                _groupActive={{
                    background: "surface.tinted-white-2"
                }}
            >
                <Flex
                    aria-selected={isSelected}
                    backgroundColor={"surface.tinted-white-5"}
                    borderRadius={12}
                    boxSize={14}
                    padding={4}
                    alignItems={"center"}
                    justifyContent={"center"}
                    _selected={{
                        borderColor: "lime.600",
                        borderWidth: 2,
                        padding: 1,
                        boxShadow: "0px 0px 0px 3px #161819 inset"
                    }}
                >
                    <Icon
                        as={isGrouped ? AppleShortcuts : Page}
                        color={"gray.900"}
                        boxSize={6}
                        strokeWidth={1}
                    />
                </Flex>
            </Td>
            {columns.map(({ name }) => (
                <Td
                    key={name}
                    height={16}
                    paddingX={4}
                    _groupHover={{
                        background: "surface.tinted-white-5"
                    }}
                    _groupActive={{
                        background: "surface.tinted-white-2"
                    }}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    onDoubleClick={onOpen}
                    onClick={onSelect}
                >
                    {data[name]}
                </Td>
            ))}
            <Td
                height={16}
                width={16}
                padding={4}
                borderTopRightRadius={16}
                borderBottomRightRadius={16}
                _groupHover={{
                    background: "surface.tinted-white-5"
                }}
                _groupActive={{
                    background: "surface.tinted-white-2"
                }}
            >
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
            </Td>
        </Tr>
    )
}