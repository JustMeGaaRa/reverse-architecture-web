import {
    Box,
    ButtonGroup,
    Divider,
    IconButton,
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Text,
    Button,
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
    MessageContent,
    useContentViewMode,
    useLocale,
    usePageHeader
} from "@reversearchitecture/ui";
import {
    PagePlus,
    List,
    Upload,
    ViewGrid,
    AppleShortcuts
} from "iconoir-react";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFilePicker } from "use-file-picker";
import {
    WorkspaceExplorer,
    WorkspaceApi,
    useWorkspaceCollection,
    useAccount,
    useSnackbar
} from "../../../features";
import { LocaleKeys } from "../../../features";
import { HomePageLayoutContent, WorkspaceStack, WorkspaceStackBody, WorkspaceStackHeader } from "../";

export enum WorkspaceListTabs {
    All = "all",
    Shared = "shared",
    Archived = "archived"
}

export const WorkspaceExplorerPage: FC<PropsWithChildren> = () => {
    const navigate = useNavigate();
    const { getLocalizedString } = useLocale();
    const { setHeaderContent } = usePageHeader();
    const [ queryParams, setQueryParam ] = useSearchParams([[ "tab", WorkspaceListTabs.All ]]);
    const { snackbar } = useSnackbar();
    const { account } = useAccount();

    const workspaceApi = useMemo(() => new WorkspaceApi(), []);
    const { workspaces, archived, set, create } = useWorkspaceCollection();

    useEffect(() => {
        workspaceApi.getWorkspaces()
            .then(workspaces => {
                set(workspaces);
            })
            .catch(error => {
                snackbar({
                    title: "Error importing workspace",
                    description: error?.message,
                    status: "error",
                    duration: 9000
                })
            });
    }, [set, snackbar, workspaceApi]);
    
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

    const createWorkspaceFromFile = useCallback((code: string) => {
        // TODO: create a workspace based on selected file contents
    }, []);

    const {
        isOpen: isOverlayOpen,
        onOpen: onOverlayOpen,
        onClose: onOverlayClose
    } = useDisclosure();
    const { openFilePicker } = useFilePicker({
        accept: ".dsl",
        multiple: false,
        readAs: "Text",
        readFilesContent: true,
        onFilesRejected: ({ errors }) => {
            snackbar({
                title: "Error importing workspace",
                description: errors[0] as string,
                status: "error",
                duration: 9000
            })
            onOverlayClose();
        },
        onFilesSuccessfullySelected: ({ filesContent }) => {
            createWorkspaceFromFile(filesContent[0].content);
            onOverlayClose();
        },
    });

    const handleOnClickWorkspaceImport = useCallback(() => {
        // NOTE: don't include in the dependency array as
        // this function is not wrapped in a 'useCallback' and causes infinite re-renders
        openFilePicker();
    }, []);

    const handleOnDragEnterWorkspaceFile = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        onOverlayOpen();
    }, [onOverlayOpen]);

    const handleOnDragOverWorkspaceFile = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }, []);

    const handleOnDragLeaveWorkspaceFile = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        onOverlayClose();
    }, [onOverlayClose]);

    const handleOnDropWorkspaceFile = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.files[0].text()
            .then(code => {
                createWorkspaceFromFile(code);
                onOverlayClose();
            })
            .catch(error => {
                snackbar({
                    title: "Error importing workspace",
                    description: error.message,
                    status: "error",
                    duration: 9000
                })
            });
    }, [createWorkspaceFromFile, onOverlayClose, snackbar]);

    useEffect(() => {
        setHeaderContent({
            right: (
                <ButtonGroup mr={4} variant={"filled"}>
                    <IconButton
                        aria-label={"import workspace"}
                        colorScheme={"gray"}
                        icon={<Icon as={Upload} boxSize={5} />}
                        title={"Import Workspace"}
                        onClick={handleOnClickWorkspaceImport}
                    />
                    <Button
                        aria-label={"new project"}
                        colorScheme={"lime"}
                        leftIcon={<Icon as={PagePlus} boxSize={5} />}
                        iconSpacing={"0px"}
                        onClick={handleOnClickWorkspaceCreate}
                    >
                        <Text marginX={2}>New Workspace</Text>
                    </Button>
                </ButtonGroup>
            )
        })
    }, [setHeaderContent, handleOnClickWorkspaceCreate, handleOnClickWorkspaceImport]);
    
    const tabIndex = useMemo(() => queryParams.get("group") ? 3
        : queryParams.get("tab") === WorkspaceListTabs.Archived ? 2
            : queryParams.get("tab") === WorkspaceListTabs.Shared ? 1 : 0, [queryParams]);
    
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
        <HomePageLayoutContent>
            <ContextSheet
                isOpen={!selectedGroupName}
                outline={isOverlayOpen ? "lime.600" : undefined}
                onDragEnter={handleOnDragEnterWorkspaceFile}
            >
                <ContextSheetOverlay
                    isOpen={isOverlayOpen}
                    onDragOver={handleOnDragOverWorkspaceFile}
                    onDragLeave={handleOnDragLeaveWorkspaceFile}
                    onDrop={handleOnDropWorkspaceFile}
                >
                    <MessageContent
                        icon={Upload}
                        title={"Drop the file"}
                        description={"Drag and drop a file to create a new workspace"}
                    />
                </ContextSheetOverlay>
                
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
                                <WorkspaceExplorer
                                    workspaces={workspaces}
                                    options={{ view, group: true }}
                                    empty={{
                                        title: getLocalizedString(LocaleKeys.NO_WORKSPACES_TITLE),
                                        description: getLocalizedString(LocaleKeys.NO_WORKSPACES_SUGGESTION),
                                        action: (
                                            <Button
                                                aria-label={"new project"}
                                                colorScheme={"lime"}
                                                iconSpacing={"0px"}
                                                leftIcon={<Icon as={PagePlus} boxSize={5} />}
                                                onClick={handleOnClickWorkspaceCreate}
                                            >
                                                <Text marginX={2}>New Workspace</Text>
                                            </Button>
                                        )
                                    }}
                                    error={{
                                        description: getLocalizedString(LocaleKeys.ERROR_LOADING_WORKSPACES)
                                    }}
                                    onClick={handleOnClickWorkspaceOpen}
                                />
                            </TabPanel>
                            <TabPanel>
                                <WorkspaceExplorer
                                    workspaces={[]}
                                    options={{ view, group: true }}
                                    empty={{
                                        title: getLocalizedString(LocaleKeys.NO_SHARED_TITLE),
                                        description: getLocalizedString(LocaleKeys.NO_SHARED_WORKSPACES_SUGGESTION)
                                    }}
                                    error={{
                                        description: getLocalizedString(LocaleKeys.ERROR_LOADING_WORKSPACES)
                                    }}
                                    onClick={handleOnClickWorkspaceOpen}
                                />
                            </TabPanel>
                            <TabPanel>
                                <WorkspaceExplorer
                                    workspaces={archived}
                                    options={{ view, group: true }}
                                    empty={{
                                        title: getLocalizedString(LocaleKeys.NO_ARCHIVED_TITLE),
                                        description: getLocalizedString(LocaleKeys.NO_ARCHIVED_WORKSPACES_SUGGESTION)
                                    }}
                                    error={{
                                        description: getLocalizedString(LocaleKeys.ERROR_LOADING_WORKSPACES)
                                    }}
                                    onClick={handleOnClickWorkspaceOpen}
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ContextSheetBody>
            </ContextSheet>
            
            <WorkspaceStack isOpen={!!selectedGroupName} onClose={handleOnClickWorkspaceStackClose}>
                <WorkspaceStackHeader title={selectedGroupName} icon={AppleShortcuts} />
                <WorkspaceStackBody>
                    <WorkspaceExplorer
                        workspaces={workspaces?.filter(workspace => workspace.group === selectedGroupName) || []}
                        options={{ view: "card", group: false }}
                        empty={{
                            title: getLocalizedString(LocaleKeys.NO_STACK_WORKSPACES_TITLE),
                            description: getLocalizedString(LocaleKeys.NO_STACK_WORKSPACES_SUGGESTION)
                        }}
                        onClick={handleOnClickWorkspaceOpen}
                    />
                </WorkspaceStackBody>
            </WorkspaceStack>
            
        </HomePageLayoutContent>
    )
}