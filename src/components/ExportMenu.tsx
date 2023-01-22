import { FC } from "react";
import { FaDownload } from "react-icons/fa";
import {
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemProps,
    useColorModeValue,
} from "@chakra-ui/react";

type ExportMenuProps = {
    items: Array<{
        name: string;
        export: () => void;
    }>;
}

const ExportMenu: FC<ExportMenuProps> = ({
    items
}) => {
    const menuBgColor = useColorModeValue("whiteAlpha.900", "gray.900");
    const menuItemProps: MenuItemProps = {
        background: menuBgColor,
        _hover: {
            background: useColorModeValue("blackAlpha.200", "whiteAlpha.200")
        }
    };
    
    return (
        <Menu closeOnBlur closeOnSelect>
            <MenuButton
                as={IconButton}
                icon={<FaDownload />}
                variant={"ghost"}
            />
            <MenuList background={menuBgColor}>
                {items.map(item => (
                    <MenuItem
                        key={item.name}
                        {...menuItemProps}
                        onClick={() => item.export()}
                    >
                        {item.name}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}

export { ExportMenu }