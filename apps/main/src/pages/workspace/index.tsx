import {
    Box,
    Divider,
    Flex,
    HStack
} from "@chakra-ui/react";
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
import { ReverseArchitectureTheme } from "@reversearchitecture/workspace-viewer";
import { fetchTheme, IWorkspaceTheme } from "@structurizr/dsl";
import {
    AddKeyframes,
    ChatLines,
    Code,
    HelpCircle,
    Timer
} from "iconoir-react";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Outlet } from "react-router";
import {
    useNavigationContext,
    WorkspaceMenu,
    WorkspaceThemeProvider
} from "../../containers";

export const Workspace: FC<PropsWithChildren> = () => {
    const { availableActions } = useNavigationContext();
    const [ theme ] = useState<IWorkspaceTheme>(ReverseArchitectureTheme);

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
                    {availableActions.map(action => (action))}
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
                                <Route icon={AddKeyframes} title={"add frames"} to={"add"} />
                                <Route icon={Code} title={"code editor"} to={"editor"} />
                                <Route icon={Timer} title={"timer"} to={"timer"} />
                                <Route icon={ChatLines} title={"comments"} to={"comments"} />
                            </RouteList>
                            <RouteList>
                                <Route icon={HelpCircle} title={"help"} to={"help"} />
                            </RouteList>
                        </Flex>
                    </NavigationSidebar>
                    <NavigationContent>
                        <WorkspaceThemeProvider value={{ theme }}>
                            <Outlet />
                        </WorkspaceThemeProvider>
                    </NavigationContent>
                </Navigation>
            </PageBody>
        </Page>
    )
}