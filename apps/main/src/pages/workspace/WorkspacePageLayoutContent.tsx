import {
    Button,
    ButtonGroup,
    Divider,
    HStack,
    IconButton,
} from "@chakra-ui/react";
import {
    PageHomeButton,
    Route,
    RouteList,
    usePageHeader,
    usePageSidebar
} from "@reversearchitecture/ui";
import {
    Workspace,
} from "@structurizr/dsl";
import {
    AddUser,
    AppleShortcuts,
    ChatLines,
    Code,
    HelpCircle,
    HomeSimple,
    Settings,
    ViewStructureUp
} from "iconoir-react";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    UserAvatarGroup,
    WorkspaceMenu,
} from "../workspace";

export enum WorkspaceContentMode {
    Diagramming = "diagramming",
    Modeling = "modeling"
}

export enum WorkspaceContentPanel {
    Editor = "editor",
    Comments = "comments",
    Settings = "settings"
}

export const WorkspacePageLayoutContent: FC<PropsWithChildren> = ({ children }) => {
    const { setSidebarContent, setShowSidebarButton, setSidebarOpen } = usePageSidebar();
    const { setHeaderContent } = usePageHeader();
    const [ queryParams, setQueryParam ] = useSearchParams([[ "mode", WorkspaceContentMode.Diagramming ]]);
    const navigate = useNavigate();
    const [ workspace ] = useState(Workspace.Empty.toObject());
    // TODO: get users from workspace room
    const [ users ] = useState<Array<any>>([]);

    const handleOnOpenEditor = useCallback(() => {
        setQueryParam(params => {
            params.set("panel", WorkspaceContentPanel.Editor);
            return new URLSearchParams(params);
        });
    }, [setQueryParam]);

    const handleOnOpenComments = useCallback(() => {
        setQueryParam(params => {
            params.set("panel", WorkspaceContentPanel.Comments);
            return new URLSearchParams(params);
        });
    }, [setQueryParam]);

    const handleOnOpenSettings = useCallback(() => {
        setQueryParam(params => {
            params.set("panel", WorkspaceContentPanel.Settings);
            return new URLSearchParams(params);
        });
    }, [setQueryParam]);

    useEffect(() => {
        setShowSidebarButton(false);
        setSidebarOpen(false);
        setSidebarContent({
            logo: (
                <PageHomeButton
                    icon={<HomeSimple />}
                    onClick={() => navigate("/")}
                />
            ),
            top: (<></>),
            middle: (
                <RouteList key={"workspace-route-list"}>
                    <Route
                        icon={<Code />}
                        isActive={queryParams.get("panel") === WorkspaceContentPanel.Editor}
                        title={"Code Editor"}
                        onClick={handleOnOpenEditor}
                    />
                    <Route
                        icon={<ChatLines />}
                        isActive={queryParams.get("panel") === WorkspaceContentPanel.Comments}
                        title={"Comments"}
                        onClick={handleOnOpenComments}
                    />
                    <Route
                        icon={<Settings />}
                        isActive={queryParams.get("panel") === WorkspaceContentPanel.Settings}
                        title={"Settings"}
                        onClick={handleOnOpenSettings}
                    />
                </RouteList>
            ),
            bottom: (
                <RouteList>
                    <Route
                        icon={<HelpCircle />}
                        isDisabled
                        title={"Help & Feedback"}
                        to={"help"}
                    />
                </RouteList>
            )
        })
    }, [
        setSidebarContent,
        setShowSidebarButton,
        setSidebarOpen,
        handleOnOpenComments,
        handleOnOpenEditor,
        handleOnOpenSettings,
        navigate,
        queryParams,
    ]);

    const handleOnDiagrammingMode = useCallback(() => {
        setQueryParam(params => {
            params.set("mode", WorkspaceContentMode.Diagramming)
            return params;
        });
    }, [setQueryParam]);

    const handleOnModelingMode = useCallback(() => {
        setQueryParam(params => {
            params.set("mode", WorkspaceContentMode.Modeling)
            return params;
        });
    }, [setQueryParam]);

    useEffect(() => {
        setHeaderContent({
            left: (
                <HStack key={"workspace-page-title"} gap={2}>
                    <Divider
                        borderWidth={1}
                        color={"whiteAlpha.200"}
                        height={"32px"}
                        orientation={"vertical"}
                    />
                    <WorkspaceMenu title={workspace.name} />
                </HStack>
            ),
            middle: (
                <ButtonGroup
                    key={"workspace-page-mode"}
                    borderRadius={"16px"}
                    borderColor={"whiteAlpha.200"}
                    borderWidth={1}
                    colorScheme={"gray"}
                    spacing={0}
                    padding={1}
                    variant={"ghost"}
                >
                    <Button
                        isActive={queryParams.get("mode") !== WorkspaceContentMode.Modeling}
                        leftIcon={<AppleShortcuts />}
                        title={"diagramming"}
                        _active={{
                            backgroundColor: "whiteAlpha.200",
                            color: "yellow.900"
                        }}
                        onClick={handleOnDiagrammingMode}
                    >
                        Diagramming
                    </Button>
                    <Button
                        isActive={queryParams.get("mode") === WorkspaceContentMode.Modeling}
                        leftIcon={<ViewStructureUp />}
                        title={"modeling"}
                        _active={{
                            backgroundColor: "whiteAlpha.200",
                            color: "purple.900"
                        }}
                        onClick={handleOnModelingMode}
                    >
                        Modeling
                    </Button>
                </ButtonGroup>
            ),
            right: (
                <HStack key={"workspace-page-options"} gap={2} mr={4}>
                    <UserAvatarGroup users={users} />
                    <Divider
                        borderWidth={1}
                        color={"whiteAlpha.200"}
                        height={"32px"}
                        marginX={2}
                        orientation={"vertical"}
                    />
                    <IconButton
                        aria-label={"share"}
                        colorScheme={"gray"}
                        icon={<AddUser />}
                        isDisabled
                        size={"md"}
                    />
                </HStack>
            )
        })
    }, [
        setHeaderContent,
        handleOnDiagrammingMode,
        handleOnModelingMode,
        queryParams,
        workspace.name,
        users,
    ]);

    return (
        <>
            {children}
        </>
    )
}