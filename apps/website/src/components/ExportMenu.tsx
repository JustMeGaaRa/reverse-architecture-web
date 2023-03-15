import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useColorModeValue,
} from "@chakra-ui/react";
import { Download } from "iconoir-react";
import { FC } from "react";
import { ToolbarIconButton } from "./ToolbarIconButton";

type ExportMenuProps = {
    items: Array<{
        title: string;
        export: () => void;
    }>;
}

export const ExportMenu: FC<ExportMenuProps> = ({ items }) => {
    const menuBgColor = useColorModeValue("whiteAlpha.900", "rgba(31, 33, 35, 1)");
    const menuItemBgColor = useColorModeValue("blackAlpha.200", "#3F4614");
    
    return (
        <Menu
            closeOnBlur={true}
            placement={"bottom-start"}
            closeOnSelect={true}
        >
            <MenuButton
                as={ToolbarIconButton}
                icon={<Download />}
                variant={"ghost"}
            />
            <MenuList background={menuBgColor}>
                {items.map(item => (
                    <MenuItem
                        key={item.title}
                        background={menuBgColor}
                        _hover={{
                            background: menuItemBgColor
                        }}
                        onClick={() => item.export()}
                    >
                        {item.title}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}