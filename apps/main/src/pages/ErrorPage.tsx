import { Flex, HStack } from "@chakra-ui/react";
import {
    EmptyContent,
    ReverseArchitectureLogo,
    Page,
    PageBody,
    PageHeader,
    PageSidebar,
    PageHomeButton,
} from "@reversearchitecture/ui";
import { ArrowLeft, CloudError } from "iconoir-react";
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
            <PageSidebar>
                <PageHomeButton
                    icon={<ArrowLeft />}
                    onClick={() => navigate(-1)}
                />
            </PageSidebar>
            <PageBody>
                <PageHeader>
                </PageHeader>

                <EmptyContent
                    icon={CloudError}
                    title={name}
                    description={message}
                />
            </PageBody>
        </Page>
    )
}