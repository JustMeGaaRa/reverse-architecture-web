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
    ShellProvider,
    PageHomeButton,
    ReverseArchitectureSvg,
    usePageSidebar,
    useShellLevel,
} from "@restruct/ui";
import { FC, PropsWithChildren } from "react";
import { Outlet as RouterOutlet, useNavigate } from "react-router";
import { AccountMenu } from "./home";

export const LayoutPage: FC<PropsWithChildren> = () => {
    const navigate = useNavigate();
    const { sidebarOptions } = usePageSidebar();
    const { level, getLevelColor } = useShellLevel();

    return (
        <Page backgroundColor={getLevelColor(level)}>
            <PageHeader>
                <Flex padding={3}>
                    <PageHomeButton
                        icon={ReverseArchitectureSvg}
                        title={"RE:STRUCT"}
                        onClick={() => navigate("/")}
                    />
                </Flex>

                <PageHeaderSectionOutlet section={"start"} />
                <PageHeaderSectionOutlet section={"center"} />
                <PageHeaderSectionOutlet section={"end"} />
            </PageHeader>
            <PageBody>
                <PageSidebar>
                    <Flex height={"100%"} direction={"column"} padding={3}>
                        <PageSidebarSectionOutlet section={"start"} />
                        <PageSidebarSectionOutlet section={"center"} />
                        <PageSidebarSectionOutlet section={"end"} />
                    </Flex>

                    <Flex display={sidebarOptions.showButton ? "block" : "none"}>
                        <AccountMenu expanded={sidebarOptions.isOpen} />
                        <Divider backgroundColor={"whiteAlpha.200"} />
                        <PageSidebarToggleButton />
                    </Flex>
                </PageSidebar>
                <PageContent>
                    <ShellProvider level={level + 1}>
                        <RouterOutlet />
                    </ShellProvider>
                </PageContent>
            </PageBody>
        </Page>
    )
}