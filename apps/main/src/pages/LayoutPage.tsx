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
    ContextLevelProvider
} from "@reversearchitecture/ui";
import { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router";
import { AccountMenu } from "./home";

export const LayoutPage: FC<PropsWithChildren> = () => {
    const { sidebarOptions } = usePageSidebar();
    const { headerOptions } = usePageHeader();

    return (
        <ContextLevelProvider>
            <Page>
                <PageSidebar>
                    <Box padding={3}>
                        {sidebarOptions.sections.logo}
                    </Box>

                    <Box height={"100%"} position={"relative"}>
                        <PageSidebarSection section={"top"}>
                            {sidebarOptions.sections.top}
                        </PageSidebarSection>
                        <PageSidebarSection section={"middle"}>
                            {sidebarOptions.sections.middle}
                        </PageSidebarSection>
                        <PageSidebarSection section={"bottom"}>
                            {sidebarOptions.sections.bottom}
                        </PageSidebarSection>
                    </Box>

                    <Box display={sidebarOptions.showButton ? "block" : "none"}>
                        <Box padding={2}>
                            <AccountMenu expanded={sidebarOptions.isOpen} />
                        </Box>
                        <Divider backgroundColor={"whiteAlpha.200"} />
                        <PageSidebarToggleButton />
                    </Box>
                </PageSidebar>
                <PageBody>
                    <PageHeader>
                        <PageHeaderSection section={"left"}>
                            {headerOptions.sections.left}
                        </PageHeaderSection>
                        <PageHeaderSection section={"middle"}>
                            {headerOptions.sections.middle}
                        </PageHeaderSection>
                        <PageHeaderSection section={"right"}>
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