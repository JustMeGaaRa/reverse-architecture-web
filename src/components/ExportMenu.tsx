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
    filename: string;
    items: Array<{
        title: string;
        export: (filename: string) => void;
    }>;
}

export const ExportMenu: FC<ExportMenuProps> = ({
    filename,
    items
}) => {
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
                        onClick={() => item.export(filename)}
                    >
                        {item.title}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}