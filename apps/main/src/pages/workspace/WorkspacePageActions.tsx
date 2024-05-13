import {
    Button,
    ButtonGroup,
    Divider,
    HStack,
    Icon,
    Text
} from "@chakra-ui/react";
import {
    ButtonSegmentedToggle,
    PageHeaderSectionPortal,
    PageSidebarSectionPortal,
    usePageSidebar
} from "@restruct/ui";
import { createDefaultModelView, ViewType } from "@structurizr/dsl";
import { useWorkspace } from "@structurizr/react";
import { useFollowUserMode, useWorkspaceRoom } from "@structurizr/live";
import {
    ChatLines,
    Code,
    HelpCircle,
    Settings
} from "iconoir-react";
import {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import {
    Route,
    RouteList
} from "../../features";
import { useWorkspaceNavigation } from "@restruct/workspace-renderer";
import { WorksapceTitleBreadcrumb } from "./WorkspaceTitleBreadcrumb";
import { WorkspaceMenu } from "./WorkspaceMenu";
import { WorkspaceSynchronizationIcon } from "./WorkspaceSynchronizationIcon";
import { WorkspaceCollaboratingUserGroup } from "./WorkspaceCollaboratingUserGroup";
import { WorkspaceSharePopover } from "./WorkspaceSharePopover";

enum WorkspaceContentMode {
    Diagramming = "diagramming",
    Modeling = "modeling",
    Deployment = "deployment"
}

enum WorkspaceContentPanel {
    None = "none",
    Editor = "editor",
    Comments = "comments",
    Versions = "versions"
}

export const WorkspacePageActions: FC = () => {
    // SECTION: sidebar content
    const { setShowSidebarButton, setSidebarOpen } = usePageSidebar();
    
    const [ panel, setPanel ] = useState(WorkspaceContentPanel.None);
    const isCodeEditorPanel = panel === WorkspaceContentPanel.Editor;
    const isCommentsPanel = panel === WorkspaceContentPanel.Comments;
    const isVersionHistoryPanel = panel === WorkspaceContentPanel.Versions;

    const handleOnClickEditorPanel = useCallback(() => {
        setPanel(WorkspaceContentPanel.Editor);
    }, []);

    const handleOnClickCommentsPanel = useCallback(() => {
        setPanel(WorkspaceContentPanel.Comments);
    }, []);

    const handleOnClickVersionsPanel = useCallback(() => {
        setPanel(WorkspaceContentPanel.Versions);
    }, []);

    const handleOnClickHelp = useCallback(() => {
        throw new Error("Not implemented");
    }, []);
    
    useEffect(() => {
        setShowSidebarButton(false);
        setSidebarOpen(false);
    }, [setShowSidebarButton, setSidebarOpen]);

    // SECTION: header content
    const { workspace } = useWorkspace();
    const { setCurrentView } = useWorkspaceNavigation();

    const [ mode, setMode ] = useState(WorkspaceContentMode.Diagramming);
    const isDiagrammingMode = mode === WorkspaceContentMode.Diagramming;
    const isModelingMode = mode === WorkspaceContentMode.Modeling;
    const isDeploymentMode = mode === WorkspaceContentMode.Deployment;

    const handleOnClickDiagrammingMode = useCallback(() => {
        setMode(WorkspaceContentMode.Diagramming);
        setCurrentView(workspace.views.systemLandscape);
    }, [setCurrentView, workspace]);

    const handleOnClickModelingMode = useCallback(() => {
        setMode(WorkspaceContentMode.Modeling);
        setCurrentView(createDefaultModelView());
    }, [setCurrentView]);

    const handleOnClickDeploymentMode = useCallback(() => {
        setMode(WorkspaceContentMode.Deployment);
        setCurrentView(workspace.views.deployments?.at(0));
    }, [setCurrentView, workspace]);

    // TODO: refactor this component so that the shared page shows sync icon, but no save button
    // TODO: consider moving autosave effect to some other component
    // useWorkspaceAutoSaveEffect(workspaceId);

    return (
        <>
            <PageSidebarSectionPortal section={"center"}>
                <RouteList>
                    <Route
                        icon={<Icon as={Code} boxSize={5} />}
                        isActive={isCodeEditorPanel}
                        title={"Code Editor"}
                        onClick={handleOnClickEditorPanel}
                    />
                    <Route
                        icon={<Icon as={ChatLines} boxSize={5} />}
                        isActive={isCommentsPanel}
                        title={"Comments"}
                        onClick={handleOnClickCommentsPanel}
                    />
                    <Route
                        icon={<Icon as={Settings} boxSize={5} />}
                        isActive={isVersionHistoryPanel}
                        title={"Version History"}
                        onClick={handleOnClickVersionsPanel}
                    />
                </RouteList>
            </PageSidebarSectionPortal>

            <PageSidebarSectionPortal section={"end"}>
                <RouteList>
                    <Route
                        icon={<Icon as={HelpCircle} boxSize={5} />}
                        isDisabled
                        title={"Help & Feedback"}
                        to={"help"}
                        onClick={handleOnClickHelp}
                    />
                </RouteList>
            </PageSidebarSectionPortal>

            <PageHeaderSectionPortal section={"start"}>
                <HStack key={"workspace-page-title"} gap={2}>
                    <Divider
                        borderWidth={1}
                        color={"whiteAlpha.200"}
                        height={"32px"}
                        orientation={"vertical"}
                    />
                    <WorksapceTitleBreadcrumb />
                    <ButtonGroup spacing={1}>
                        <WorkspaceMenu />
                        <WorkspaceSynchronizationIcon />
                    </ButtonGroup>
                </HStack>
            </PageHeaderSectionPortal>

            <PageHeaderSectionPortal section={"center"}>
                <ButtonSegmentedToggle>
                    <Button
                        colorScheme={"lime"}
                        isActive={isDiagrammingMode}
                        paddingInline={6}
                        title={"diagramming"}
                        onClick={handleOnClickDiagrammingMode}
                    >
                        <Text marginX={1}>Diagramming</Text>
                    </Button>
                    <Button
                        colorScheme={"lime"}
                        isActive={isModelingMode}
                        paddingInline={6}
                        title={"modeling"}
                        onClick={handleOnClickModelingMode}
                    >
                        <Text marginX={1}>Modeling</Text>
                    </Button>
                    <Button
                        colorScheme={"lime"}
                        isActive={isDeploymentMode}
                        paddingInline={6}
                        title={"deployment"}
                        onClick={handleOnClickDeploymentMode}
                    >
                        <Text marginX={1}>Deployment</Text>
                    </Button>
                </ButtonSegmentedToggle>
            </PageHeaderSectionPortal>

            <PageHeaderSectionPortal section={"end"}>
                <HStack gap={2} mr={4}>
                    <WorkspaceCollaboratingUserGroup />
                    <Divider
                        borderWidth={1}
                        color={"whiteAlpha.200"}
                        height={"32px"}
                        orientation={"vertical"}
                    />
                    <WorkspaceSharePopover />
                </HStack>
            </PageHeaderSectionPortal>
        </>
    )
}