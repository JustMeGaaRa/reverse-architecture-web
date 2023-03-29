import {
    Flex,
    Stack,
    Button,
    Box,
    HStack,
    IconButton,
    Link,
    useDisclosure,
    useColorModeValue,
    useColorMode
} from "@chakra-ui/react";
import {
    HamburgerIcon,
    CloseIcon,
    MoonIcon,
    SunIcon
} from "@chakra-ui/icons";
import { FC, PropsWithChildren } from "react";
import { Logo } from "./Logo";

const NavLink: FC<PropsWithChildren<{ to: string }>> = ({
    to,
    children,
}) => (
    <Link
        as={Link}
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
            textDecoration: "none",
            background: "whiteAlpha.200"
        }}
        href={to}
    >
        {children}
    </Link>
);

export function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box
            bg={useColorModeValue("whiteAlpha.900", "gray.900")}
            px={4}
        >
            <Flex
                height={16}
                align={"center"}
                justify={"space-between"}
            >
                <IconButton
                    size={"md"}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={"Open Menu"}
                    display={{ md: "none" }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={"center"}>
                    <Logo />
                    <HStack
                        as={"nav"}
                        spacing={4}
                        display={{ base: "none", md: "flex" }}
                    >
                        <NavLink to={"/docs"}>Docs</NavLink>
                        <NavLink to={"/about"}>About</NavLink>
                    </HStack>
                </HStack>
                <Flex align={"center"} gap={4}>
                    <IconButton
                        aria-label={"toggle theme"}
                        icon={colorMode === "light" ? <MoonIcon/> : <SunIcon />}
                        rounded={"full"}
                        onClick={toggleColorMode}
                    />
                    {/* <Menu>
                        <MenuButton
                            as={Button}
                            rounded={"full"}
                            variant={"link"}
                            cursor={"pointer"}
                            minW={0}
                        >
                            <Avatar
                                size={"sm"}
                                src={"https://yt3.ggpht.com/yti/AJo0G0m4CPtDGubd7A6wLlpJKWneIIUBVa0GQIUO82wTrQ=s88-c-k-c0x00ffffff-no-rj-mo"}
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Profile</MenuItem>
                            <MenuDivider />
                            <MenuItem>Sign Out</MenuItem>
                        </MenuList>
                    </Menu> */}
                    <Button>
                        Sign In
                    </Button>
                </Flex>
            </Flex>

            {isOpen && (
                <Box pb={4} display={{ md: "none" }}>
                    <Stack as={"nav"} spacing={4}>
                        <NavLink to={"/docs"}>Docs</NavLink>
                        <NavLink to={"/about"}>About</NavLink>
                    </Stack>
                </Box>
            )}
        </Box>
    );
}
