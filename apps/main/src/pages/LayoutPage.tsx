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
    PageHeaderSectionOutlet,
    PageSidebarSectionOutlet,
    ContextLevelProvider,
    PageHomeButton,
    ReverseArchitectureSvg,
    usePageSidebar,
} from "@reversearchitecture/ui";
import { FC, PropsWithChildren } from "react";
import { Outlet as RouterOutlet, useNavigate } from "react-router";
import { AccountMenu } from "./home";

export const LayoutPage: FC<PropsWithChildren> = () => {
    const navigate = useNavigate();
    const { sidebarOptions } = usePageSidebar();

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
                        <PageSidebarSectionOutlet section={"start"} />
                        <PageSidebarSectionOutlet section={"center"} />
                        <PageSidebarSectionOutlet section={"end"} />
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
                        <PageHeaderSectionOutlet section={"start"} />
                        <PageHeaderSectionOutlet section={"center"} />
                        <PageHeaderSectionOutlet section={"end"} />
                    </PageHeader>
                    
                    <PageContent>
                        <RouterOutlet />
                    </PageContent>
                </PageBody>
            </Page>
        </ContextLevelProvider>
    )
}