import { Flex, HStack, Heading } from "@chakra-ui/react";
import {
    Logo,
    NavigationBackButton,
    Page,
    PageBody,
    PageHeader,
} from "@reversearchitecture/ui";
import { FC } from "react";
import { useNavigate, useRouteError } from "react-router";

export const ErrorPage: FC<{
}> = ({
}) => {
    const navigate = useNavigate();
    const { error } = useRouteError() as { error: Error };
    const { name, message } = error ?? { name: "Error", message: "Oops, something went wrong..." };

    return (
        <Page>
            <PageHeader>
                <HStack gap={2}>
                    <NavigationBackButton
                        onClick={() => navigate(-1)}
                    />
                    <Logo />
                </HStack>
            </PageHeader>
            <PageBody>
                <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    direction={"column"}
                    height={"100%"}
                >
                    <Heading as={"h4"}>{name}</Heading>
                    <Heading as={"h5"}>{message}</Heading>
                </Flex>
            </PageBody>
        </Page>
    )
}