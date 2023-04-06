import { Flex, HStack, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { Page } from "../../components/Page";
import { PageHeader } from "../../components/PageHeader";
import { PageBody } from "../../components/PageBody";
import { useRouteError } from "react-router";
import { NavigationBackButton } from "../../components/NavigationBackButton";
import { Logo } from "../../components/Logo";

export const ErrorPage: FC<{
}> = ({
}) => {
    const { error } = useRouteError() as { error: Error };
    console.log(error)

    return (
        <Page>
            <PageHeader>
                <HStack>
                    <NavigationBackButton />
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
                    <Heading as={"h1"}>{error.name}</Heading>
                    <Heading as={"h2"}>{error.message}</Heading>
                </Flex>
            </PageBody>
        </Page>
    )
}