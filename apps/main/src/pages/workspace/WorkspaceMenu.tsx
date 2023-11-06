import {
    Button,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList
} from "@chakra-ui/react";
import { StructurizrExportClient } from "@structurizr/export";
import { useWorkspaceStore } from "@workspace/core";
import { NavArrowDown } from "iconoir-react";
import { FC, useCallback } from "react";

export const WorkspaceMenu: FC<{
    title: string;
}> = ({
    title
}) => {
    const { workspace } = useWorkspaceStore();

    const handleOnExportClick = useCallback(() => {
        const exportClient = new StructurizrExportClient();
        console.log(exportClient.export(workspace));
    }, [workspace]);

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
                    <MenuItem onClick={handleOnExportClick}>Export</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                    <MenuItem>Rename</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}