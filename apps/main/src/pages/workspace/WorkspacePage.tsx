import {
    Button,
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
import { Workspace } from "@structurizr/dsl";
import { useStructurizrParser } from "@structurizr/react";
import { useWorkspaceTheme, WorkspaceProvider } from "@workspace/core";
import { WorkspaceRoom } from "@workspace/live";
import {
    AppleShortcuts,
    ChatLines,
    CloudSync,
    Code,
    HelpCircle,
    HomeSimple,
    Settings,
    ViewStructureUp
} from "iconoir-react";
import {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
    CommentProvider,
    WorkspaceApi,
    WorkspaceCacheWrapper,
    useSnackbar,
} from "../../features";
import { WorkspaceContentEditor, WorkspaceMenu } from "./";

export enum WorkspaceContentMode {
    Diagramming = "diagramming",
    Modeling = "modeling"
}

export enum WorkspaceContentPanel {
    Editor = "editor",
    Comments = "comments",
    Settings = "settings"
}

export const WorkspacePage: FC = () => {
    const { setSidebarContent, setShowSidebarButton, setSidebarOpen } = usePageSidebar();
    const { setHeaderContent } = usePageHeader();
    const { theme } = useWorkspaceTheme();
    const [ workspace, setWorkspace ] = useState(Workspace.Empty);

    // reset sidebar and header content
    useEffect(() => {
        setSidebarContent({
            logo: (<></>),
            top: (<></>),
            middle: (<></>),
            bottom: (<></>)
        });
        setHeaderContent({
            left: (<></>),
            middle: (<></>),
            right: (<></>)
        });
    }, [setHeaderContent, setSidebarContent]);

    const [ queryParams, setQueryParam ] = useSearchParams([[ "mode", WorkspaceContentMode.Diagramming ]]);
    const navigate = useNavigate();

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

    // sidebar content
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

    // header content
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
                    <IconButton
                        aria-label={"save"}
                        colorScheme={"gray"}
                        variant={"ghost"}
                        icon={<Icon as={CloudSync} boxSize={5} />}
                        size={"md"}
                    />
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
            )
        })
    }, [
        setHeaderContent,
        handleOnDiagrammingMode,
        handleOnModelingMode,
        queryParams,
        workspace.name
    ]);

    // workspace content
    // TODO: add selected repository to account provider or define repository provider
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const { workspaceApi } = useMemo(() => ({ workspaceApi: new WorkspaceCacheWrapper(new WorkspaceApi()) }), []);
    const { parseStructurizr } = useStructurizrParser();
    const { snackbar } = useSnackbar();

    useEffect(() => {
        workspaceApi.getWorkspaceById(workspaceId)
            .then(info => {
                const parsedWorkspace = parseStructurizr(info.content?.text);
                const autolayoutWorkspace = parsedWorkspace.applyMetadata(info.content?.metadata);
                // TODO: do not apply theme to the workspace object, but rather use it internally from the provider
                // const themedWorkspace = applyTheme(parsedWorkspace.toObject(), info.content?.theme ?? theme);
                setWorkspace(autolayoutWorkspace);
                // TODO: set code text as well
                // setStructurizrDslText(info.content?.text);
            })
            .catch(error => {
                snackbar({
                    title: error.message,
                    description: error.message,
                    status: "error",
                    duration: 9000,
                })
            })

        return () => {
            setWorkspace(Workspace.Empty);
        }
    }, [workspaceApi, workspaceId, theme, snackbar, parseStructurizr]);

    return (
        <WorkspaceProvider workspace={workspace}>
            <CommentProvider>
                <WorkspaceRoom roomId={workspaceId}>
                    <WorkspaceContentEditor />
                </WorkspaceRoom>
            </CommentProvider>
        </WorkspaceProvider>
    )
}