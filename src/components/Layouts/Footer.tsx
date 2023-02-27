import { FC } from "react";
import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import { Logo, SocialButton } from "..";
import {
    GitHub,
    LinkedIn,
    Medium,
    Twitter
} from "iconoir-react";

export const Footer: FC = () => {
    return (
        <Box bg={useColorModeValue("whiteAlpha.900", "gray.900")}>
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
                    <Twitter />
                </SocialButton>
                <SocialButton label={"Medium"} href={"https://blog.justmegaara.me"}>
                    <Medium />
                </SocialButton>
                <SocialButton label={"GitHub"} href={"https://code.justmegaara.me"}>
                    <GitHub />
                </SocialButton>
                <SocialButton label={"CV"} href={"https://cv.justmegaara.me"}>
                    <LinkedIn />
                </SocialButton>
            </Stack>
            </Container>
        </Box>
    );
}
