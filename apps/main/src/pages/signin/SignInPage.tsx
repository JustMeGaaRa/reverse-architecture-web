import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Input,
    Select,
    Text,
    VStack,
} from "@chakra-ui/react";
import { ReverseArchitectureSvg } from "@reversearchitecture/ui";
import { Github } from "iconoir-react";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { defaultUsers, useAccount } from "../../features";
import { AuthenticationLayout } from "../signin";

export const SignInPage: FC = () => {
    const { setAccount } = useAccount();
    const navigate = useNavigate();

    const handleOnSignInClick = useCallback(() => {
        // TODO: implement authentication via GitHub and get account details
        // TODO: get values from the inputs
        setAccount({
            username: "JustMeGaaRa",
            fullname: "JustMeGaaRa",
            email: "justmegaara@restruct.io"
        });
        navigate("/");
    }, [navigate, setAccount]);

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
                        <ReverseArchitectureSvg />
                    </CardHeader>
                    <CardBody>
                        <VStack spacing={8}>
                            <Flex direction={"column"} width={"100%"}>
                                <Text color={"white"} fontSize={32}>
                                    Welcome to Restruct
                                </Text>
                                <Text color={"whiteAlpha.700"} fontSize={16}>
                                    Sign up or Log In to optimise your app architecture in real time, join our community to get started today!
                                </Text>
                            </Flex>
                            <Flex direction={"column"} width={"100%"} gap={4}>
                                <Select variant={"filled"} defaultValue={defaultUsers[0].fullname}>
                                    {defaultUsers.map(user => (
                                        <option key={user.username} value={user.username}>{user.fullname}</option>
                                    ))}
                                </Select>
                                <Input variant={"filled"} defaultValue={"reverse-architecture-community"} />
                            </Flex>
                            <Button
                                colorScheme={"gray"}
                                leftIcon={<Github />}
                                size={"lg"}
                                textDecoration={"none"}
                                width={"100%"}
                                onClick={handleOnSignInClick}
                            >
                                Sign In with GitHub
                            </Button>
                        </VStack>
                    </CardBody>
                    <CardFooter>
                        <Text color={"whiteAlpha.700"}>© Copyright 2023 Reversio Corporation </Text>
                    </CardFooter>
                </Card>
            </Flex>
        </AuthenticationLayout>
    )
}