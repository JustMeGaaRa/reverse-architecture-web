import { FC } from "react";
import {
    FaGithub,
    FaTwitter,
    FaMediumM,
    FaLinkedinIn
} from "react-icons/fa";
import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import { Logo, SocialButton } from ".";

export const Footer: FC = () => {
    return (
        <Box
            bg={useColorModeValue("blackAlpha.900", "whiteAlpha.900")}
            color={useColorModeValue("whiteAlpha.900", "blackAlpha.900")}
        >
            <Container
                as={Stack}
                maxW={"6xl"}
                py={4}
                direction={{ base: "column", md: "row" }}
                spacing={4}
                justify={{ base: "center", md: "space-between" }}
                align={{ base: "center", md: "center" }}
            >
            <Logo />
            <Text>© 2022 Reverse Architecture. All rights reserved</Text>
            <Stack direction={"row"} spacing={6}>
                <SocialButton
                    label={"Twitter"}
                    href={"https://twitter.com/justmegaara"}
                >
                    <FaTwitter />
                </SocialButton>
                <SocialButton label={"Medium"} href={"https://blog.justmegaara.me"}>
                    <FaMediumM />
                </SocialButton>
                <SocialButton label={"GitHub"} href={"https://code.justmegaara.me"}>
                    <FaGithub />
                </SocialButton>
                <SocialButton label={"CV"} href={"https://cv.justmegaara.me"}>
                    <FaLinkedinIn />
                </SocialButton>
            </Stack>
            </Container>
        </Box>
    );
}
