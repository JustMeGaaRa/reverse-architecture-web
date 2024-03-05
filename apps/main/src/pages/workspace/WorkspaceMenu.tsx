import {
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList
} from "@chakra-ui/react";
import {
    DrawioExportClient,
    IWorkspace,
    StructurizrExportClient,
    WorkspaceJsonExportClient
} from "@structurizr/react";
import { Download, InputField, MoreHoriz } from "iconoir-react";
import { FC, useCallback } from "react";

export const WorkspaceMenu: FC<{
    workspace: IWorkspace;
}> = ({
    workspace
}) => {
    const handleOnRenameClick = useCallback(() => {
        throw new Error("Not implemented");
    }, []);
    
    const handleOnExportStructurizrClick = useCallback(() => {
        const exportClient = new StructurizrExportClient();
        console.log(exportClient.export(workspace));
    }, [workspace]);

    const handleOnExportJsonClick = useCallback(() => {
        const exportClient = new WorkspaceJsonExportClient();
        console.log(exportClient.export(workspace));
    }, [workspace]);

    const handleOnExportDrawioClick = useCallback(() => {
        const exportClient = new DrawioExportClient();
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
                {workspace.name}
            </MenuButton>
            <MenuList>
                <MenuItem
                    icon={<Icon as={InputField} boxSize={5} />}
                    onClick={handleOnRenameClick}
                >
                    Rename
                </MenuItem>
                <MenuDivider />
                <MenuItem
                    icon={<Icon as={Download} boxSize={5} />}
                    onClick={handleOnExportStructurizrClick}
                >
                    Export as Structurizr
                </MenuItem>
                <MenuItem
                    icon={<Icon as={Download} boxSize={5} />}
                    onClick={handleOnExportJsonClick}
                >
                    Export as JSON
                </MenuItem>
                <MenuItem
                    icon={<Icon as={Download} boxSize={5} />}
                    onClick={handleOnExportDrawioClick}
                >
                    Export as drawio
                </MenuItem>
            </MenuList>
        </Menu>
    )
}