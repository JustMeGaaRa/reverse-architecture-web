import { Link as RouterLink } from "react-router-dom";
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button
} from "@chakra-ui/react";

import { HeroIllustration } from "./HeroIllustration";
import { v4 } from "uuid";

export function HeroSection() {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          as={"h1"}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Software architecture{" "}
          <Text as={"span"} color={"orange.400"}>
            made easy
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Architecture documentation is missing? Never up to date? Hard to
          understand hand drawings? Never struggle with the architecture
          documentation again. Collaborate in real-time and save progress
          automatically.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            rounded={"full"}
            px={6}
            colorScheme={"blue"}
            bg={"blue.400"}
            as={RouterLink}
            to={`/sandbox/${v4()}`}
            _hover={{ bg: "blue.500" }}
          >
            Try it out
          </Button>
          <Button
            as={RouterLink}
            to={"/docs"}
            rounded={"full"}
            px={6}
          >
            Learn more
          </Button>
        </Stack>
        <Flex w={"full"}>
          <HeroIllustration
            height={{ sm: "24rem", lg: "28rem" }}
            mt={{ base: 12, sm: 16 }}
          />
        </Flex>
      </Stack>
    </Container>
  );
}
