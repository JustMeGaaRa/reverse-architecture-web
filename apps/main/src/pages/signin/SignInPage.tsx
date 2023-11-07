import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Flex,
    HStack,
    Link,
    Text,
} from "@chakra-ui/react";
import { ReverseArchitectureSvg } from "@reversearchitecture/ui";
import { GitHub } from "iconoir-react";
import { FC } from "react";
import { AuthenticationLayout } from "../signin";

export const SignInPage: FC = () => {

    return (
        <AuthenticationLayout>
            <Flex
                alignItems={"center"}
                justifyContent={"right"}
                height={"100%"}
                width={"100%"}
                padding={"64px"}
            >
                <Card
                    backgroundColor={"whiteAlpha.50"}
                    backdropFilter={"blur(8px)"}
                    borderColor={"whiteAlpha.200"}
                    borderRadius={32}
                    borderWidth={1}
                    height={"100%"}
                    width={"640px"}
                    padding={16}
                >
                    <CardHeader>
                        <Flex
                            justifyContent={"space-between"}
                        >
                            <HStack>
                                <ReverseArchitectureSvg />
                                <Text color={"yellow.900"} fontSize={32}>
                                    RVRS.IO
                                </Text>
                            </HStack>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Flex direction={"column"}>
                            <Text color={"basic.white"} fontSize={32}>
                                Welcome to Reversio
                            </Text>
                            <Text color={"whiteAlpha.700"} fontSize={16}>
                                Sign up or Log In to optimise your app architecture in real time, join our community to get started today!
                            </Text>
                            <Divider border={"transparent"} my={4} />
                            <Button
                                as={Link}
                                colorScheme={"gray"}
                                leftIcon={<GitHub />}
                                size={"lg"}
                                textDecoration={"none"}
                                href={``}
                            >
                                Sign In with GitHub
                            </Button>
                        </Flex>
                    </CardBody>
                    <CardFooter>
                        <Text color={"whiteAlpha.700"}>© Copyright 2023 Reversio Corporation </Text>
                    </CardFooter>
                </Card>
            </Flex>
        </AuthenticationLayout>
    )
}