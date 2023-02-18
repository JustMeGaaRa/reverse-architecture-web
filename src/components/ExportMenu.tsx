import { DownloadIcon } from "@chakra-ui/icons";
import {
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";

type ExportMenuProps = {
    items: Array<{
        title: string;
        export: () => void;
    }>;
}

export const ExportMenu: FC<ExportMenuProps> = ({ items }) => {
    const menuBgColor = useColorModeValue("whiteAlpha.900", "gray.900");
    const menuItemBgColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
    
    return (
        <Menu
            closeOnBlur={true}
            placement={"bottom-start"}
            closeOnSelect={true}
        >
            <MenuButton
                as={IconButton}
                icon={<DownloadIcon />}
                variant={"ghost"}
            />
            <MenuList background={menuBgColor}>
                {items.map(item => (
                    <MenuItem
                        key={item.title}
                        background={menuBgColor}
                        _hover={{ background: menuItemBgColor }}
                        onClick={() => item.export()}
                    >
                        {item.title}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}