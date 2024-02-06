import {
    Box,
    Divider,
    Flex,
} from "@chakra-ui/react";
import {
    PageContent,
    PageSidebarToggleButton,
    PageSidebar,
    Page,
    PageBody,
    PageHeader,
    usePageSidebar,
    PageHeaderSection,
    PageSidebarSection,
    usePageHeader,
    ContextLevelProvider,
    PageHomeButton,
    ReverseArchitectureSvg
} from "@reversearchitecture/ui";
import { FC, PropsWithChildren } from "react";
import { Outlet, useNavigate } from "react-router";
import { AccountMenu } from "./home";

export const LayoutPage: FC<PropsWithChildren> = () => {
    const { sidebarOptions } = usePageSidebar();
    const { headerOptions } = usePageHeader();
    const navigate = useNavigate();

    return (
        <ContextLevelProvider>
            <Page>
                <PageSidebar>
                    <Flex padding={3}>
                        <PageHomeButton
                            icon={ReverseArchitectureSvg}
                            title={"RE:STRUCT"}
                            onClick={() => navigate("/")}
                        />
                    </Flex>

                    <Flex height={"100%"} direction={"column"} padding={3}>
                        <PageSidebarSection section={"start"}>
                            {sidebarOptions.sections.top}
                        </PageSidebarSection>
                        <PageSidebarSection section={"center"}>
                            {sidebarOptions.sections.middle}
                        </PageSidebarSection>
                        <PageSidebarSection section={"end"}>
                            {sidebarOptions.sections.bottom}
                        </PageSidebarSection>
                    </Flex>

                    <Flex display={sidebarOptions.showButton ? "block" : "none"}>
                        <Box padding={2}>
                            <AccountMenu expanded={sidebarOptions.isOpen} />
                        </Box>
                        <Divider backgroundColor={"whiteAlpha.200"} />
                        <PageSidebarToggleButton />
                    </Flex>
                </PageSidebar>
                <PageBody>
                    <PageHeader>
                        <PageHeaderSection section={"start"}>
                            {headerOptions.sections.left}
                        </PageHeaderSection>
                        <PageHeaderSection section={"center"}>
                            {headerOptions.sections.middle}
                        </PageHeaderSection>
                        <PageHeaderSection section={"end"}>
                            {headerOptions.sections.right}
                        </PageHeaderSection>
                    </PageHeader>
                    
                    <PageContent>
                        <Outlet />
                    </PageContent>
                </PageBody>
            </Page>
        </ContextLevelProvider>
    )
}