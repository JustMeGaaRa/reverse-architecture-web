import {
    Avatar,
    Flex,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuList,
    MenuItem,
    Text,
    Button
} from "@chakra-ui/react";
import { LogOut, NavArrowUp, ProfileCircle } from "iconoir-react";
import { FC, PropsWithChildren } from "react";
import { useAccount } from "../../features";

export const AccountMenu: FC<PropsWithChildren<{
    expanded: boolean;
}>> = ({
    expanded
}) => {
    const { account } = useAccount();

    return (                  
        <Menu placement={"top-end"}>
            <MenuButton
                as={Button}
                borderRadius={20}
                colorScheme={"gray"}
                rightIcon={<NavArrowUp />}
                padding={2}
                size={"xl"}
                title={account.fullname}
                variant={"ghost"}
                width={"100%"}
                _hover={{ background: "whiteAlpha.100" }}
            >
                <Flex
                    alignItems={"center"}
                    gap={4}
                    padding={1}
                >
                    <Avatar
                        colorScheme={"purple"}
                        name={account.fullname}
                        size={"md"}
                        src={account.avatarUrl}
                        title={account.fullname}
                    />
                    <Flex
                        direction={"column"}
                        alignItems={"start"}
                        flexGrow={1}
                        textAlign={"left"}
                        display={expanded ? "flex" : "none"}
                    >
                        <Text fontSize={16} noOfLines={1}>{account.fullname}</Text>
                        <Text fontSize={14} noOfLines={1} color={"whiteAlpha.400"}>{account.email}</Text>
                    </Flex>
                </Flex>
            </MenuButton>
            <MenuList>
                <MenuGroup>
                    <MenuItem icon={<ProfileCircle />}>Profile</MenuItem>
                    <MenuItem icon={<ProfileCircle />}>Theme</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                    <MenuItem icon={<LogOut />}>Sign Out</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}