import {
    Box,
    HStack,
    StackDivider,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useColorModeValue,
    IconButton
} from "@chakra-ui/react";
import { useWorkspace } from "@justmegaara/structurizr-dsl";
import { Panel } from "@reactflow/core";
import { Download, Settings } from "iconoir-react";
import { FC } from "react";
import {
    ControlPanel,
    HomeButton,
    SharePopover,
    TitleEditable
} from "../../components";
import { useExports, useShare } from "./hooks";

export type WorkspacePanelProps = unknown;

export const WorkspacePanel: FC<WorkspacePanelProps> = () => {
    const dividerBorderColor = useColorModeValue("gray.200", "gray.700");
    const menuBgColor = useColorModeValue("whiteAlpha.900", "rgba(31, 33, 35, 1)");
    const menuItemBgColor = useColorModeValue("blackAlpha.200", "#3F4614");
    
    const { workspace, setName } = useWorkspace();
    const { exports } = useExports();
    const { link, clipboardCopy } = useShare();

    return (
        <Panel position={"top-left"}>
            <ControlPanel>
                <HStack divider={<StackDivider borderColor={dividerBorderColor} />}>

                    <Box px={2}>
                        <HomeButton />
                    </Box>
                    
                    <TitleEditable
                        title={workspace?.name ?? "Workspace"}
                        onTitleChange={setName}
                    />
                    
                    <HStack gap={2} px={2}>
                        <Menu
                            closeOnBlur={true}
                            closeOnSelect={true}
                            placement={"bottom-start"}
                        >
                            <MenuButton
                                as={IconButton}
                                title={"settings"}
                                icon={<Settings />}
                            />
                            <MenuList background={menuBgColor}>
                                {[].map(item => (
                                    <MenuItem
                                        key={item.title}
                                        background={menuBgColor}
                                        _hover={{
                                            background: menuItemBgColor
                                        }}
                                        onClick={item.onClick}
                                    >
                                        {item.title}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                        <SharePopover link={link} onCopy={clipboardCopy} />
                    </HStack>
                    
                    <Box px={2}>
                        <Menu
                            closeOnBlur={true}
                            closeOnSelect={true}
                            placement={"bottom-start"}
                        >
                            <MenuButton
                                as={IconButton}
                                title={"export"}
                                icon={<Download />}
                            />
                            <MenuList background={menuBgColor}>
                                {exports.map(item => (
                                    <MenuItem
                                        key={item.title}
                                        background={menuBgColor}
                                        _hover={{
                                            background: menuItemBgColor
                                        }}
                                        onClick={item.onClick}
                                    >
                                        {item.title}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    </Box>

                </HStack>
            </ControlPanel>
        </Panel>
    );
}