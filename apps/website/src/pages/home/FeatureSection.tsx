import { FC, PropsWithChildren, ReactElement } from "react";
import {
    Container,
    SimpleGrid,
    Icon,
    Text,
    Stack,
    Flex,
    Heading
} from "@chakra-ui/react";
import { Lorem } from "../../components/Lorem";
import { Check, CloudSync, Network } from "iconoir-react";

interface IFeatureProps {
    title: string;
    text?: string;
    icon: ReactElement;
}

const Feature: FC<PropsWithChildren<IFeatureProps>> = ({
    title,
    text,
    icon,
    children
}) => {
    return (
        <Stack>
            <Flex
                width={16}
                height={16}
                align={"center"}
                justify={"center"}
                color={"white"}
                rounded={"full"}
                bg={"gray.100"}
                mb={1}
            >
                {icon}
            </Flex>
            <Text fontWeight={600}>
                {title}
            </Text>
            {text ? (
                <Text color={"gray.600"}>
                    {text}
                </Text>
            ) : children}
        </Stack>
    );
};

export function FeatureSection() {
    return (
        <Container maxW={"5xl"}>
            <Heading as={"h2"} id={"features"} textAlign={"center"}>
                Feature Overview
            </Heading>
            <SimpleGrid
                py={{ base: 20, md: 28 }}
                columns={{ base: 1, md: 3 }}
                spacing={10}
            >
                <Feature
                    icon={<Icon as={CloudSync} color={"black"} w={10} h={10} />}
                    title={"Real-time Collaboration"}
                >
                    <Lorem noOfLines={3} />
                </Feature>
                <Feature
                    icon={<Icon as={Check} color={"black"} w={10} h={10} />}
                    title={"Peer Review"}
                >
                    <Lorem noOfLines={3} />
                </Feature>
                <Feature
                    icon={<Icon as={Network} color={"black"} w={10} h={10} />}
                    title={"Diagram Standard"}
                >
                    <Lorem noOfLines={3} />
                </Feature>
            </SimpleGrid>
        </Container>
    );
}
