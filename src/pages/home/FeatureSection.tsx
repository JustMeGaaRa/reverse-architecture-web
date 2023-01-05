import { FC, ReactElement } from "react";
import {
    Container,
    SimpleGrid,
    Icon,
    Text,
    Stack,
    Flex,
    Heading
} from "@chakra-ui/react";
import { FcCheckmark, FcSynchronize, FcWorkflow } from "react-icons/fc";

interface IFeatureProps {
    title: string;
    text: string;
    icon: ReactElement;
}

const Feature: FC<IFeatureProps> = ({ title, text, icon }) => {
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
            <Text color={"gray.600"}>
                {text}
            </Text>
        </Stack>
    );
};

export function FeatureSection() {
    const defaultFeatureText = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...";

    return (
        <Container maxW={"5xl"}>
            <Heading as={"h2"} id={"Features"}>
                Features
            </Heading>
            <SimpleGrid
                py={{ base: 20, md: 28 }}
                columns={{ base: 1, md: 3 }}
                spacing={10}
            >
                <Feature
                    icon={<Icon as={FcSynchronize} w={10} h={10} />}
                    title={"Real-time Collaboration"}
                    text={defaultFeatureText}
                />
                <Feature
                    icon={<Icon as={FcCheckmark} w={10} h={10} />}
                    title={"Peer Review"}
                    text={defaultFeatureText}
                />
                <Feature
                    icon={<Icon as={FcWorkflow} w={10} h={10} />}
                    title={"Diagram Standard"}
                    text={defaultFeatureText}
                />
            </SimpleGrid>
        </Container>
    );
}
