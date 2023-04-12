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
import { FC, PropsWithChildren } from "react";
import { useAccount } from "./hooks";
import { NavArrowUp, ProfileCircle } from "iconoir-react";

export const AccountMenu: FC<PropsWithChildren<{
    expanded: boolean;
}>> = ({
    expanded
}) => {
    const account = useAccount();

    return (                  
        <Menu>
            <MenuButton
                borderRadius={16}
                height={"64px"}
                width={"100%"}
                _hover={{
                    background: "gray.100"
                }}
            >
                <Flex
                    alignItems={"center"}
                    gap={4}
                    px={3}
                >
                    <Avatar
                        background={"purple.200"}
                        borderColor={"purple.primary"}
                        color={"purple.primary"}
                        name={account.fullname}
                        src={account.avatar}
                        title={account.fullname}
                    />
                    {expanded && (
                        <>
                            <Flex
                                direction={"column"}
                                alignItems={"start"}
                                flexGrow={1}
                            >
                                <Text fontSize={16}>{account.fullname}</Text>
                                <Text fontSize={14} color={"gray.400"}>{account.email}</Text>
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
                    <MenuItem icon={<ProfileCircle />}>Sign Out</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}