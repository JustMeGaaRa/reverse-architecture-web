import {
    Button,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList
} from "@chakra-ui/react";
import { NavArrowDown } from "iconoir-react";
import { FC } from "react";

export const WorkspaceMenu: FC<{
    title: string;
}> = ({
    title
}) => {
    return (
        <Menu>
            <MenuButton
                as={Button}
                colorScheme={"gray"}
                variant={"ghost"}
                rightIcon={<NavArrowDown />}
            >
                {title}
            </MenuButton>
            <MenuList>
                <MenuGroup>
                    <MenuItem>Export</MenuItem>
                    <MenuItem>Mark as favorite</MenuItem>
                    <MenuItem>Preferences</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                    <MenuItem>Move to</MenuItem>
                    <MenuItem>Rename</MenuItem>
                    <MenuItem>Archive</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}