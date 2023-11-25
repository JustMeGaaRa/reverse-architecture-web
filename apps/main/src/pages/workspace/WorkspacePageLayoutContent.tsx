import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Editable,
    EditableInput,
    EditablePreview,
    HStack,
    Icon,
    IconButton,
    Text
} from "@chakra-ui/react";
import {
    ButtonSegmentedToggle,
    PageHomeButton,
    Route,
    RouteList,
    usePageHeader,
    usePageSidebar
} from "@reversearchitecture/ui";
import { useWorkspaceStore } from "@workspace/core";
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
    const { workspace } = useWorkspaceStore();
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
                    icon={<Icon as={HomeSimple} boxSize={5} />}
                    onClick={() => navigate("/")}
                />
            ),
            top: (<></>),
            middle: (
                <RouteList key={"workspace-route-list"}>
                    <Route
                        icon={<Icon as={Code} boxSize={5} />}
                        isActive={queryParams.get("panel") === WorkspaceContentPanel.Editor}
                        title={"Code Editor"}
                        onClick={handleOnOpenEditor}
                    />
                    <Route
                        icon={<Icon as={ChatLines} boxSize={5} />}
                        isActive={queryParams.get("panel") === WorkspaceContentPanel.Comments}
                        title={"Comments"}
                        onClick={handleOnOpenComments}
                    />
                    <Route
                        icon={<Icon as={Settings} boxSize={5} />}
                        isActive={queryParams.get("panel") === WorkspaceContentPanel.Settings}
                        title={"Settings"}
                        onClick={handleOnOpenSettings}
                    />
                </RouteList>
            ),
            bottom: (
                <RouteList>
                    <Route
                        icon={<Icon as={HelpCircle} boxSize={5} />}
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
                    <Editable defaultValue={workspace.name} ml={4}>
                        <EditablePreview />
                        <EditableInput />
                    </Editable>
                    <WorkspaceMenu title={workspace.name} />
                </HStack>
            ),
            middle: (
                <ButtonSegmentedToggle>
                    <Button
                        colorScheme={"lime"}
                        isActive={queryParams.get("mode") !== WorkspaceContentMode.Modeling}
                        iconSpacing={0}
                        leftIcon={<Icon as={AppleShortcuts} boxSize={4} />}
                        title={"diagramming"}
                        onClick={handleOnDiagrammingMode}
                    >
                        <Text marginX={1}>Diagramming</Text>
                    </Button>
                    <Button
                        colorScheme={"purple"}
                        isActive={queryParams.get("mode") === WorkspaceContentMode.Modeling}
                        iconSpacing={0}
                        leftIcon={<Icon as={ViewStructureUp} boxSize={4} />}
                        title={"modeling"}
                        onClick={handleOnModelingMode}
                    >
                        <Text marginX={1}>Modeling</Text>
                    </Button>
                </ButtonSegmentedToggle>
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
                        icon={<Icon as={AddUser} boxSize={5} />}
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