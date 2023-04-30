import { Flex, HStack, Heading } from "@chakra-ui/react";
import {
    EmptyContent,
    Logo,
    NavigationBackButton,
    Page,
    PageBody,
    PageHeader,
} from "@reversearchitecture/ui";
import { CloudError } from "iconoir-react";
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
                    height={"100%"}
                    width={"100%"}
                >
                    <EmptyContent
                        icon={CloudError}
                        title={name}
                        description={message}
                    />
                </Flex>
            </PageBody>
        </Page>
    )
}