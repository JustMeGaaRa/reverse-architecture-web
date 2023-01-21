import { FC } from "react";
import { FaDownload } from "react-icons/fa";
import {
    Editable,
    EditableInput,
    EditablePreview,
    HStack,
    StackDivider,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemProps,
    useColorModeValue,
} from "@chakra-ui/react";
import { Logo } from "./Logo";

export type NavigationPanelProps = {
    title: string;
    exporters: {
        onExportDrawio: () => void;
        onExportJson: () => void;
        onExportImage: () => void;
    };
    onTitleChange: (title: string) => void;
}

export const NavigationPanel: FC<NavigationPanelProps> = ({
    title,
    exporters,
    onTitleChange
}) => {
    const dividerBorderColor = useColorModeValue("gray.200", "gray.700");
    const editableBgColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
    const menuBgColor = useColorModeValue("whiteAlpha.900", "gray.900");
    const menuItemProps: MenuItemProps = {
        background: menuBgColor,
        _hover: {
            background: useColorModeValue("blackAlpha.200", "whiteAlpha.200")
        }
    };
    const {  onExportDrawio, onExportJson, onExportImage } = exporters;

    return (
        <HStack
            borderRadius={"lg"}
            gap={2}
            divider={<StackDivider borderColor={dividerBorderColor} />}
        >
            <Logo />
            
            <Editable
                value={title}
                isPreviewFocusable={true}
            >
                <EditablePreview
                    py={2}
                    px={4}
                    _hover={{
                        background: editableBgColor
                    }}
                />
                <EditableInput
                    py={2}
                    px={4}
                    onChange={(event) => onTitleChange(event.target.value)}
                />
            </Editable>
            
            <Menu closeOnBlur closeOnSelect>
                <MenuButton
                    as={IconButton}
                    icon={<FaDownload />}
                    variant={"ghost"}
                />
                <MenuList background={menuBgColor}>
                    <MenuItem {...menuItemProps} onClick={onExportDrawio}>
                        Drawio (*.drawio)
                    </MenuItem>
                    <MenuItem {...menuItemProps} onClick={onExportJson}>
                        JSON File (*.json)
                    </MenuItem>
                    <MenuItem {...menuItemProps} onClick={onExportImage}>
                        Image (*.png)
                    </MenuItem>
                </MenuList>
            </Menu>
        </HStack>
    );
}