import {
    Box,
    Divider,
    IconButton,
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Icon,
    useDisclosure,
} from "@chakra-ui/react";
import {
    ButtonSegmentedToggle,
    ContentViewMode,
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetOverlay,
    ContextSheetTitle,
    StateMessage,
    useContentViewMode,
    useLoaderState,
    useLocale,
} from "@reversearchitecture/ui";
import {
    List,
    Upload,
    ViewGrid,
    AppleShortcuts
} from "iconoir-react";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useMemo,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { validateStructurizr } from "structurizr";
import {
    LocaleKeys,
    WorkspaceExplorer,
    useWorkspaceCollection,
    useAccount,
    useSnackbar,
    WorkspaceCollectionProvider
} from "../../../features";
import {
    HomePageResetActionsWrapper,
    WorkspaceExplorerPageActionWrapper,
    WorkspaceStack,
    WorkspaceStackBody,
    WorkspaceStackHeader
} from "../";

export enum WorkspaceListTabs {
    All = "all",
    Shared = "shared",
    Archived = "archived"
}

export const WorkspaceExplorerPage: FC<PropsWithChildren> = () => {
    console.log("workspace explorer page")
    const navigate = useNavigate();
    const [ queryParams, setQueryParam ] = useSearchParams([[ "tab", WorkspaceListTabs.All ]]);
    const { getLocalizedString } = useLocale();
    const { snackbar } = useSnackbar();
    const { account } = useAccount();

    const { isLoading, onStartLoading, onStopLoading } = useLoaderState();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { workspaces, create } = useWorkspaceCollection();

    const handleOnDragEnterWorkspaceFile = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        onOpen();
    }, [onOpen]);

    const handleOnDragOverWorkspaceFile = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }, []);

    const handleOnDragExitWorkspaceFile = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        onClose();
    }, [onClose]);

    const handleOnDropWorkspaceFile = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.files[0].text()
            .then(content => {
                onStartLoading();
                
                if (validateStructurizr(content)) {
                    create(account.username, { code: content });
                }
                else {
                    // TODO: workspace file is not valid, so show error message
                }
        
                onStopLoading();
                onClose();
            })
            .catch(error => {
                snackbar({
                    title: "Error importing workspace",
                    description: error.message,
                    status: "error",
                    duration: 9000
                })
                onClose();
            });
    }, [account.username, create, onClose, onStartLoading, onStopLoading, snackbar]);
    
    const handleOnClickWorkspaceCreate = useCallback(() => {
        create(account.username);
    }, [account.username, create]);

    const handleOnClickWorkspaceOpen = useCallback((selectedId: string) => {
        if (workspaces.find(workspace => workspace.workspaceId === selectedId)) {
            navigate(`/workspaces/${selectedId}`);
        }
        if (workspaces.find(workspace => workspace.group === selectedId)) {
            setQueryParam(params => {
                params.set("group", selectedId);
                return new URLSearchParams(params);
            });
        }
    }, [workspaces, navigate, setQueryParam]);
    
    const tabIndex = useMemo(() => (queryParams.get("group") ? 3
        : queryParams.get("tab") === WorkspaceListTabs.Archived ? 2
            : queryParams.get("tab") === WorkspaceListTabs.Shared ? 1 : 0
    ),[queryParams]);
    
    const { view, setView } = useContentViewMode(ContentViewMode.Card);

    const handleOnClickWorkspacesTab = useCallback(() => {
        setQueryParam({ tab: WorkspaceListTabs.All });
    }, [setQueryParam]);

    const handleOnClickWorkspacesSharedTab = useCallback(() => {
        setQueryParam({ tab: WorkspaceListTabs.Shared })
    }, [setQueryParam]);

    const handleOnClickWorkspacesArchiveTab = useCallback(() => {
        setQueryParam({ tab: WorkspaceListTabs.Archived })
    }, [setQueryParam]);

    const selectedGroupName = useMemo(() => queryParams.get("group"), [queryParams]);

    const handleOnClickWorkspaceStackClose = useCallback(() => {
        setQueryParam({});
    }, [setQueryParam]);

    return (
        <HomePageResetActionsWrapper>
            <WorkspaceExplorerPageActionWrapper>
                <ContextSheet
                    isOpen={!selectedGroupName}
                    outline={isOpen ? "lime.600" : undefined}
                    onDragEnter={handleOnDragEnterWorkspaceFile}
                >
                    <ContextSheetHeader>
                        <ContextSheetTitle title={"Workspaces"} />
                    </ContextSheetHeader>

                    <Divider />
                    
                    <ContextSheetBody>
                        <Tabs height={"100%"} index={tabIndex}>
                            <TabList backgroundColor={"surface.tinted-black-40"} height={12} paddingX={2}>
                                <Tab onClick={handleOnClickWorkspacesTab}>
                                    My Workspaces
                                </Tab>
                                <Tab onClick={handleOnClickWorkspacesSharedTab}>
                                    Shared
                                </Tab>
                                <Tab onClick={handleOnClickWorkspacesArchiveTab}>
                                    Archived
                                </Tab>
                                <Box position={"absolute"} right={4}>
                                    <ButtonSegmentedToggle size={"sm"}>
                                        <IconButton
                                            aria-label={"card view"}
                                            isActive={view === ContentViewMode.Card}
                                            icon={<Icon as={ViewGrid} boxSize={4} />}
                                            onClick={() => setView(ContentViewMode.Card)}
                                        />
                                        <IconButton
                                            aria-label={"table view"}
                                            isActive={view === ContentViewMode.Table}
                                            icon={<Icon as={List} boxSize={4} />}
                                            onClick={() => setView(ContentViewMode.Table)}
                                        />
                                    </ButtonSegmentedToggle>
                                </Box>
                            </TabList>
                            <TabPanels height={"calc(100% - 42px)"} padding={6} overflowY={"scroll"}>
                                <TabPanel>
                                    <WorkspaceCollectionProvider>
                                        <WorkspaceExplorer
                                            filters={{ status: "private" }}
                                            options={{ view, group: true }}
                                            onClick={handleOnClickWorkspaceOpen}
                                        />
                                    </WorkspaceCollectionProvider>
                                </TabPanel>
                                <TabPanel>
                                    <WorkspaceCollectionProvider>
                                        <WorkspaceExplorer
                                            filters={{ status: "shared" }}
                                            options={{ view, group: true }}
                                            onClick={handleOnClickWorkspaceOpen}
                                        />
                                    </WorkspaceCollectionProvider>
                                </TabPanel>
                                <TabPanel>
                                    <WorkspaceCollectionProvider>
                                        <WorkspaceExplorer
                                            filters={{ status: "archived" }}
                                            options={{ view, group: true }}
                                            onClick={handleOnClickWorkspaceOpen}
                                        />
                                    </WorkspaceCollectionProvider>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ContextSheetBody>
                    
                    <ContextSheetOverlay
                        isOpen={isOpen}
                        onDragOver={handleOnDragOverWorkspaceFile}
                        onDragExit={handleOnDragExitWorkspaceFile}
                        onDrop={handleOnDropWorkspaceFile}
                    >
                        <StateMessage
                            icon={Upload}
                            title={getLocalizedString(LocaleKeys.IMPORT_FILE_TITLE)}
                            description={getLocalizedString(LocaleKeys.IMPORT_FILE_DESCRIPTION)}
                        />
                    </ContextSheetOverlay>
                </ContextSheet>
                
                <WorkspaceStack isOpen={!!selectedGroupName} onClose={handleOnClickWorkspaceStackClose}>
                    <WorkspaceStackHeader title={selectedGroupName} icon={AppleShortcuts} />
                    <WorkspaceStackBody>
                        <WorkspaceCollectionProvider>
                            <WorkspaceExplorer
                                filters={{ group: selectedGroupName }}
                                options={{ view: "card", group: false }}
                                onClick={handleOnClickWorkspaceOpen}
                            />
                        </WorkspaceCollectionProvider>
                    </WorkspaceStackBody>
                </WorkspaceStack>
            </WorkspaceExplorerPageActionWrapper>
        </HomePageResetActionsWrapper>
    )
}