import {
    Box,
    Divider,
    Icon,
    IconButton,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useDisclosure
} from "@chakra-ui/react";
import {
    ButtonSegmentedToggle,
    Shell,
    ShellBody,
    ShellHeader,
    ShellOverlay,
    ShellTitle,
    useLocale
} from "@restruct/ui";
import { parseWorkspace } from "@structurizr/parser";
import { useYjsCollaborative } from "@yjs/react";
import {
    List,
    Upload,
    ViewGrid
} from "iconoir-react";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useMemo
} from "react";
import { useSearchParams } from "react-router-dom";
import * as Structurizr from "../../../features";
import {
    ContentViewMode,
    LocaleKeys,
    StateMessage,
    useAccount,
    useContentViewMode,
    useLoaderState,
    useSnackbar,
    WorkspaceExplorer,
    WorkspaceSelectionProvider
} from "../../../features";

export enum WorkspaceListTabs {
    All = "all",
    Shared = "shared",
    Archived = "archived"
}

export const WorkspaceExplorerTabs: FC<PropsWithChildren> = () => {
    const [ queryParams, setQueryParam ] = useSearchParams([[ "tab", WorkspaceListTabs.All ]]);
    const { getLocalizedString } = useLocale();
    const { snackbar } = useSnackbar();
    
    const { document } = useYjsCollaborative();
    const { account } = useAccount();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ isImporting, onStartImporting, onStopImporting ] = useLoaderState();

    const selectedGroupName = useMemo(() => queryParams.get("group"), [queryParams]);

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
                onStartImporting();
                parseWorkspace(
                    content,
                    errors => {
                        // TODO: show error message because workspace file is not valid
                        snackbar({
                            title: "An error occurred when importing the workspace",
                            description: errors[0].message,
                            status: "error",
                            duration: 9000
                        })
                        onClose();
                    },
                    workspace => {
                        Structurizr.create(document, account.fullname, workspace);
                        // create(account.fullname, parseStructurizr(content));
                    }
                );
        
                onStopImporting();
                onClose();
            })
            .catch(error => {
                snackbar({
                    title: "An error occurred when importing the workspace",
                    description: error.message,
                    status: "error",
                    duration: 9000
                })
                onClose();
            });
    }, [account.fullname, document, onClose, onStartImporting, onStopImporting, snackbar]);
    
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

    return (
        <Shell
            isOpen={!selectedGroupName}
            outline={isOpen ? "lime.600" : undefined}
            onDragEnter={handleOnDragEnterWorkspaceFile}
        >
            <ShellHeader>
                <ShellTitle title={"Workspaces"} />
            </ShellHeader>

            <Divider />
            
            <ShellBody>
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
                    <TabPanels height={"calc(100% - 48px)"} padding={6} overflowY={"scroll"}>
                        <TabPanel>
                            <WorkspaceSelectionProvider>
                                <WorkspaceExplorer
                                    isActive={tabIndex === 0}
                                    filters={{ status: "private" }}
                                    options={{ view, group: true }}
                                />
                            </WorkspaceSelectionProvider>
                        </TabPanel>
                        <TabPanel>
                            <WorkspaceSelectionProvider>
                                <WorkspaceExplorer
                                    isActive={tabIndex === 1}
                                    filters={{ status: "shared" }}
                                    options={{ view, group: true }}
                                />
                            </WorkspaceSelectionProvider>
                        </TabPanel>
                        <TabPanel>
                            <WorkspaceSelectionProvider>
                                <WorkspaceExplorer
                                    isActive={tabIndex === 2}
                                    filters={{ status: "archived" }}
                                    options={{ view, group: true }}
                                />
                            </WorkspaceSelectionProvider>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </ShellBody>
            
            <ShellOverlay
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
            </ShellOverlay>
        </Shell>
    )
}