import {
    Avatar,
    Box,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    Text
} from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { useAccount } from "./hooks";
import { NavArrowUp } from "iconoir-react";

export const AccountMenu: FC<PropsWithChildren<{
    expanded: boolean;
}>> = ({
    expanded
}) => {
    const account = useAccount();

    return (                  
        <Menu>
            <MenuButton width={"100%"}>
                <Flex
                    alignItems={"center"}
                    gap={4}
                >
                    <Avatar
                        background={"#B614F61A"}
                        backdropBlur={"8px"}
                        borderColor={"#B614F6"}
                        borderWidth={"1px"}
                        color={"#B614F6"}
                        name={account.fullname}
                        src={account.avatar}
                        rounded={"md"}
                    />
                    {expanded && (
                        <>
                            <Flex
                                direction={"column"}
                                alignItems={"left"}
                                flexGrow={1}
                            >
                                <Text fontSize={16}>{account.fullname}</Text>
                                <Text fontSize={14} color={"#A4A5A5"}>{account.email}</Text>
                            </Flex>
                            <IconButton
                                aria-label={"expand/collapse"}
                                icon={<NavArrowUp />}
                                variant={"ghost"}
                            />
                        </>
                    )}
                </Flex>
            </MenuButton>
            <MenuList>
                
            </MenuList>
        </Menu>
    )
}