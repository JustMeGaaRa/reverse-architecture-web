import {
    Avatar,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuList,
    MenuItem,
    Text
} from "@chakra-ui/react";
import { LogOut, NavArrowUp, ProfileCircle } from "iconoir-react";
import { FC, PropsWithChildren } from "react";
import { useAccount } from "../../containers";

export const AccountMenu: FC<PropsWithChildren<{
    expanded: boolean;
}>> = ({
    expanded
}) => {
    const { account } = useAccount();

    return (                  
        <Menu placement={"top-end"}>
            <MenuButton
                borderRadius={24}
                height={"64px"}
                width={"100%"}
                _hover={{
                    background: "gray.100"
                }}
                title={account.fullname}
            >
                <Flex
                    alignItems={"center"}
                    gap={4}
                    px={2}
                >
                    <Avatar
                        background={"purple.200"}
                        borderColor={"purple.900"}
                        color={"purple.900"}
                        name={account.fullname}
                        size={"lg"}
                        src={account.avatar}
                        title={account.fullname}
                    />
                    {expanded && (
                        <>
                            <Flex
                                direction={"column"}
                                alignItems={"start"}
                                flexGrow={1}
                                textAlign={"left"}
                            >
                                <Text fontSize={16} noOfLines={1}>{account.fullname}</Text>
                                <Text fontSize={14} noOfLines={1} color={"gray.400"}>{account.email}</Text>
                            </Flex>
                            <IconButton
                                aria-label={"expand/collapse"}
                                colorScheme={"gray"}
                                icon={<NavArrowUp />}
                                variant={"ghost"}
                            />
                        </>
                    )}
                </Flex>
            </MenuButton>
            <MenuList>
                <MenuGroup>
                    <MenuItem icon={<ProfileCircle />}>Personal Profile</MenuItem>
                    <MenuItem icon={<ProfileCircle />}>Theme</MenuItem>
                    <MenuItem icon={<ProfileCircle />}>Upgrade</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                    <MenuItem icon={<ProfileCircle />}>Switch Account</MenuItem>
                    <MenuItem icon={<LogOut />}>Sign Out</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}