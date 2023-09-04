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
    Navigation,
    NavigationContent,
    NavigationHomeButton,
    NavigationSidebar,
    Page,
    PageBody,
    PageHeader,
    Route,
    RouteList
} from "@reversearchitecture/ui";
import {
    ChatLines,
    Code,
    HelpCircle,
    Settings,
    Svg3DSelectSolid
} from "iconoir-react";
import { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router";
import {
    NavigationTarget,
    WorkspaceMenu,
} from "../../containers";

export const Workspace: FC<PropsWithChildren> = () => {
    return (
        <Page>
            <PageHeader>
                <HStack gap={2}>
                    <NavigationHomeButton />
                    <Divider
                        borderWidth={1}
                        color={"gray.200"}
                        height={"32px"}
                        orientation={"vertical"}
                    />
                    <WorkspaceMenu title={"Big Bank plc."} />
                </HStack>
                <HStack gap={2}>
                    <NavigationTarget />
                </HStack>
            </PageHeader>
            <PageBody>
                <Navigation>
                    <NavigationSidebar isExpanded={false}>
                        <Flex
                            direction={"column"}
                            justifyContent={"space-between"}
                            px={2}
                            py={4}
                            height={"100%"}
                        >
                            <Box />
                            <RouteList>
                                <Route icon={Svg3DSelectSolid} title={"diagram"} to={"diagram"} />
                                <Route icon={Code} title={"code editor"} to={"editor"} />
                                <Route icon={ChatLines} title={"comments"} to={"comments"} />
                                <Route icon={Settings} title={"settings"} to={"settings"} />
                            </RouteList>
                            <RouteList>
                                <Route icon={HelpCircle} title={"help"} to={"help"} />
                            </RouteList>
                        </Flex>
                    </NavigationSidebar>
                    <NavigationContent>
                        <WorkspaceThemeProvider>
                            <Outlet />
                        </WorkspaceThemeProvider>
                    </NavigationContent>
                </Navigation>
            </PageBody>
        </Page>
    )
}