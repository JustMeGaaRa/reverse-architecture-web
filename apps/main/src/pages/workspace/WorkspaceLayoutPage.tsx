import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Flex,
    HStack,
    IconButton
} from "@chakra-ui/react";
import { WorkspaceThemeProvider } from "@workspace/core";
import {
    NavigationTarget,
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
    NavArrowLeft,
    Settings,
    ViewStructureUp,
} from "iconoir-react";
import { FC, PropsWithChildren } from "react";
import {
    Outlet,
    useNavigate,
    useSearchParams
} from "react-router-dom";
import { WorkspaceMenu } from "./";

export const WorkspaceLayoutPage: FC<PropsWithChildren> = () => {
    const navigate = useNavigate();
    const [ queryParams, setQueryParams ] = useSearchParams([
        ["editor", "false"],
        ["comments", "false"],
        ["settings", "false"]
    ]);
    const queryState = {
        editor: queryParams.get("editor") === "true",
        comments: queryParams.get("comments") === "true",
        settings: queryParams.get("settings") === "true"
    }
    
    return (
        <Page>
            <PageSidebar>
                <PageHomeButton
                    icon={<NavArrowLeft />}
                    onClick={() => navigate(-1)}
                />
                <Flex
                    direction={"column"}
                    justifyContent={"space-between"}
                    padding={4}
                    height={"100%"}
                >
                    <Box />
                    <ButtonGroup
                        colorScheme={"yellow"}
                        orientation={"vertical"}
                        size={"lg"}
                        spacing={1}
                        variant={"menuitem"}
                    >
                        <IconButton
                            aria-label={"editor"}
                            icon={<Code />}
                            isActive={queryState.editor}
                            title={"code editor"}
                            onClick={() => setQueryParams({ editor: "true" })}
                        />
                        <IconButton
                            aria-label={"comments"}
                            icon={<ChatLines />}
                            isActive={queryState.comments}
                            title={"comments"}
                            onClick={() => setQueryParams({ comments: "true" })}
                        />
                        <IconButton
                            aria-label={"settings"}
                            icon={<Settings />}
                            isActive={queryState.settings}
                            isDisabled
                            title={"settings"}
                            onClick={() => setQueryParams({ settings: "true" })}
                        />
                    </ButtonGroup>
                    <RouteList>
                        <Route
                            icon={<HelpCircle />}
                            isDisabled
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
                    <ButtonGroup
                        borderRadius={"16px"}
                        borderColor={"whiteAlpha.200"}
                        borderWidth={1}
                        colorScheme={"gray"}
                        spacing={0}
                        padding={1}
                        variant={"ghost"}
                    >
                        <Button
                            isActive={queryParams.get("mode") !== "modeling"}
                            leftIcon={<AppleShortcuts />}
                            title={"diagramming"}
                            _active={{
                                backgroundColor: "whiteAlpha.200",
                                color: "yellow.900"
                            }}
                            onClick={() => setQueryParams({ mode: "diagramming" })}
                        >
                            Diagramming
                        </Button>
                        <Button
                            isActive={queryParams.get("mode") === "modeling"}
                            leftIcon={<ViewStructureUp />}
                            title={"modeling"}
                            _active={{
                                backgroundColor: "whiteAlpha.200",
                                color: "purple.900"
                            }}
                            onClick={() => setQueryParams({ mode: "modeling" })}
                        >
                            Modeling
                        </Button>
                    </ButtonGroup>
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