import {
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList
} from "@chakra-ui/react";
import { StructurizrExportClient } from "@structurizr/export";
import { useWorkspace } from "@workspace/core";
import { MoreHoriz } from "iconoir-react";
import { FC, useCallback } from "react";

export const WorkspaceMenu: FC<{
    title: string;
}> = ({
    title
}) => {
    const { workspace } = useWorkspace();

    const handleOnExportClick = useCallback(() => {
        const exportClient = new StructurizrExportClient();
        console.log(exportClient.export(workspace));
    }, [workspace]);

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                colorScheme={"gray"}
                variant={"ghost"}
                icon={<Icon as={MoreHoriz} boxSize={5} />}
            >
                {title}
            </MenuButton>
            <MenuList>
                <MenuGroup>
                    <MenuItem onClick={handleOnExportClick}>
                        Export
                    </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                    <MenuItem>Rename</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}