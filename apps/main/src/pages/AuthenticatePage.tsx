import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Flex,
    HStack,
    Text,
} from "@chakra-ui/react";
import { Page, ReverseArchitectureLogo } from "@reversearchitecture/ui";
import { GitHub } from "iconoir-react";
import { FC } from "react";

export const AuthenticatePage: FC = () => {
    return (
        <Page>
            <Flex
                alignItems={"center"}
                justifyContent={"center"}
                height={"100%"}
                width={"100%"}
            >
                <Card
                    backgroundColor={"whiteAlpha.50"}
                    borderColor={"whiteAlpha.200"}
                    borderRadius={24}
                    borderWidth={1}
                    width={"640px"}
                    margin={8}
                >
                    <CardHeader>
                        <Flex
                            justifyContent={"space-between"}
                        >
                            <HStack>
                                <ReverseArchitectureLogo />
                                <Text color={"yellow.900"} fontSize={32}>
                                    RVRS.IO
                                </Text>
                            </HStack>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Flex direction={"column"} margin={"80px"}>
                            <Text color={"basic.white"} fontSize={32}>
                                Welcome to Reversio
                            </Text>
                            <Text color={"whiteAlpha.700"} fontSize={16}>
                                Sign up or Log In to optimise your app architecture in real time, join our community to get started today!
                            </Text>
                            <Divider border={"transparent"} my={4} />
                            <Button colorScheme={"gray"} leftIcon={<GitHub />}>
                                Sign In with GitHub
                            </Button>
                        </Flex>
                    </CardBody>
                    <CardFooter>
                        <Text color={"whiteAlpha.700"}>© Copyright 2023 Reversio Corporation </Text>
                    </CardFooter>
                </Card>
            </Flex>
        </Page>
    )
}