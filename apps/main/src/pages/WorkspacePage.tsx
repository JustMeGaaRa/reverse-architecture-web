import {
    Box,
    ButtonGroup,
    Divider,
    Flex,
    HStack,
    IconButton
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
    AppleShortcuts,
    ChatLines,
    Code,
    HelpCircle,
    HomeSimple,
    Settings,
} from "iconoir-react";
import { FC, PropsWithChildren } from "react";
import { Outlet, useNavigate } from "react-router";
import {
    NavigationTarget,
    WorkspaceMenu,
} from "../containers";
import { useSearchParams } from "react-router-dom";

export const WorkspacePage: FC<PropsWithChildren> = () => {
    const navigate = useNavigate();
    const [ queryParams, setQueryParams ] = useSearchParams([
        ["list", "false"],
        ["comments", "false"],
        ["editor", "false"],
        ["settings", "false"]
    ]);
    
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
                    <ButtonGroup
                        colorScheme={"gray"}
                        orientation={"vertical"}
                        size={"lg"}
                        spacing={1}
                        variant={"ghost"}
                    >
                        <IconButton
                            aria-label={"workspaces"}
                            icon={<AppleShortcuts />}
                            isActive={queryParams.get("list") === "true"}
                            title={"workspaces"}
                            _active={{
                                backgroundColor: "whiteAlpha.200",
                                color: "yellow.900"
                            }}
                            onClick={() => setQueryParams({ list: "true" })}
                        />
                        <IconButton
                            aria-label={"editor"}
                            icon={<Code />}
                            isActive={queryParams.get("editor") === "true"}
                            title={"code editor"}
                            _active={{
                                backgroundColor: "whiteAlpha.200",
                                color: "yellow.900"
                            }}
                            onClick={() => setQueryParams({ editor: "true" })}
                        />
                        <IconButton
                            aria-label={"comments"}
                            icon={<ChatLines />}
                            isActive={queryParams.get("comments") === "true"}
                            title={"comments"}
                            _active={{
                                backgroundColor: "whiteAlpha.200",
                                color: "yellow.900"
                            }}
                            onClick={() => setQueryParams({ comments: "true" })}
                        />
                        <IconButton
                            aria-label={"settings"}
                            icon={<Settings />}
                            isActive={queryParams.get("settings") === "true"}
                            isDisabled
                            title={"settings"}
                            _active={{
                                backgroundColor: "whiteAlpha.200",
                                color: "yellow.900"
                            }}
                            onClick={() => setQueryParams({ settings: "true" })}
                        />
                    </ButtonGroup>
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
                            color={"whiteAlpha.200"}
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