import {
    Box,
    Divider,
    Flex,
    HStack
} from "@chakra-ui/react";
import {
    WorkspaceThemeProvider
} from "@reversearchitecture/workspace-viewer";
import {
    PageContent,
    PageSidebar,
    Page,
    PageBody,
    PageHeader,
    Route,
    RouteList,
    PageHomeButton
} from "@reversearchitecture/ui";
import {
    ChatLines,
    Code,
    HelpCircle,
    HomeSimple,
    Settings,
    Svg3DSelectSolid
} from "iconoir-react";
import { FC, PropsWithChildren } from "react";
import { Outlet, useNavigate } from "react-router";
import {
    NavigationTarget,
    WorkspaceMenu,
} from "../../containers";

export const Workspace: FC<PropsWithChildren> = () => {
    const navigate = useNavigate();
    
    return (
        <Page>
            <PageSidebar>
                <PageHomeButton
                    icon={<HomeSimple />}
                    onClick={() => navigate("/")}
                />
                <Flex
                    direction={"column"}
                    justifyContent={"space-between"}
                    padding={4}
                    height={"100%"}
                >
                    <Box />
                    <RouteList>
                        <Route
                            icon={Svg3DSelectSolid}
                            title={"diagram"}
                            to={"diagram"}
                        />
                        <Route
                            icon={Code}
                            isDisabled
                            title={"code editor"}
                            to={"editor"}
                        />
                        <Route
                            icon={ChatLines}
                            title={"comments"}
                            to={"comments"}
                        />
                        <Route
                            icon={Settings}
                            isDisabled
                            title={"settings"}
                            to={"settings"}
                        />
                    </RouteList>
                    <RouteList>
                        <Route
                            icon={HelpCircle}
                            title={"help"}
                            to={"help"}
                        />
                    </RouteList>
                </Flex>
            </PageSidebar>
            <PageBody>
                <PageHeader>
                    <HStack gap={2}>
                        <Divider
                            borderWidth={1}
                            color={"gray.200"}
                            height={"32px"}
                            orientation={"vertical"}
                        />
                        <WorkspaceMenu title={"Big Bank plc."} />
                    </HStack>
                    <HStack gap={2} mr={4}>
                        <NavigationTarget />
                    </HStack>
                </PageHeader>
                <PageContent>
                    <WorkspaceThemeProvider>
                        <Outlet />
                    </WorkspaceThemeProvider>
                </PageContent>
            </PageBody>
        </Page>
    )
}