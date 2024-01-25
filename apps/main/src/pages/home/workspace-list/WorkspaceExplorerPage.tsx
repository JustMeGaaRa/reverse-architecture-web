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
    Flex,
    ScaleFade,
} from "@chakra-ui/react";
import {
    ButtonSegmentedToggle,
    ContentViewMode,
    ContextSheet,
    ContextSheetBody,
    ContextSheetCloseButton,
    ContextSheetHeader,
    ContextSheetTitle,
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
import {
    WorkspaceCollection,
    WorkspaceApi,
    useWorkspaceCollection
} from "../../../features";
import { LocaleKeys } from "../../../features";
import { HomePageLayoutContent, WorkspaceStack, WorkspaceStackBody, WorkspaceStackHeader } from "../";

export enum WorkspaceListTabs {
    All = "all",
    Shared = "shared",
    Archived = "archived"
}

export const WorkspaceExplorerPage: FC<PropsWithChildren> = () => {
    const { getLocalizedString } = useLocale();
    const { setHeaderContent } = usePageHeader();
    const [ queryParams, setQueryParam ] = useSearchParams([[ "tab", WorkspaceListTabs.All ]]);
    const { view, setView } = useContentViewMode(ContentViewMode.Card);

    const workspaceApi = useMemo(() => new WorkspaceApi(), []);
    const { workspaces, archived, set, create } = useWorkspaceCollection();
    const navigate = useNavigate();
    
    const tabIndex = queryParams.get("group") ? 3
        : queryParams.get("tab") === WorkspaceListTabs.Archived ? 2
            : queryParams.get("tab") === WorkspaceListTabs.Shared ? 1 : 0;

    useEffect(() => {
        workspaceApi.getWorkspaces()
            .then(workspaces => {
                set(workspaces);
            })
            .catch(error => {
                console.error(error);
            });
    }, [set, workspaceApi]);
    
    const handleOnWorkspaceCreate = useCallback(() => {
        create();
    }, [create]);

    const handleOnWorkspaceClick = useCallback((selectedId: string) => {
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

    useEffect(() => {
        setHeaderContent({
            right: (
                <ButtonGroup mr={4} variant={"filled"}>
                    <IconButton
                        aria-label={"import workspace"}
                        colorScheme={"gray"}
                        icon={<Icon as={Upload} boxSize={5} />}
                        isDisabled
                        title={"Import Workspace"}
                    />
                    <Button
                        aria-label={"new project"}
                        colorScheme={"lime"}
                        leftIcon={<Icon as={PagePlus} boxSize={5} />}
                        iconSpacing={"0px"}
                        onClick={handleOnWorkspaceCreate}
                    >
                        <Text marginX={2}>New Workspace</Text>
                    </Button>
                </ButtonGroup>
            )
        })
    }, [setHeaderContent, handleOnWorkspaceCreate]);

    const selectedGroupName = queryParams.get("group");

    const handleNavigateWorkspacesTab = useCallback(() => {
        setQueryParam({ tab: WorkspaceListTabs.All });
    }, [setQueryParam]);

    const handleNavigateSharedTab = useCallback(() => {
        setQueryParam({ tab: WorkspaceListTabs.Shared })
    }, [setQueryParam]);

    const handleNavigateArchivedTab = useCallback(() => {
        setQueryParam({ tab: WorkspaceListTabs.Archived })
    }, [setQueryParam]);

    const handleCloseWorkspaceStack = useCallback(() => {
        setQueryParam({});
    }, [setQueryParam]);

    return (
        <HomePageLayoutContent>
            <ContextSheet>
                {!selectedGroupName && (
                    <>
                        <ContextSheetHeader>
                            <ContextSheetTitle title={"Workspaces"} />
                        </ContextSheetHeader>

                        <Divider />
                        
                        <ContextSheetBody>
                            <Tabs height={"100%"} index={tabIndex}>
                                <TabList backgroundColor={"surface.tinted-black-40"} height={12} paddingX={2}>
                                    <Tab onClick={handleNavigateWorkspacesTab}>
                                        My Workspaces
                                    </Tab>
                                    <Tab onClick={handleNavigateSharedTab}>
                                        Shared
                                    </Tab>
                                    <Tab onClick={handleNavigateArchivedTab}>
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
                                        <WorkspaceCollection
                                            workspaces={workspaces}
                                            view={view}
                                            groupped={true}
                                            emptyTitle={getLocalizedString(LocaleKeys.NO_WORKSPACES_TITLE)}
                                            emptyDescription={getLocalizedString(LocaleKeys.NO_WORKSPACES_SUGGESTION)}
                                            emptyAction={(
                                                <Button
                                                    aria-label={"new project"}
                                                    colorScheme={"lime"}
                                                    iconSpacing={"0px"}
                                                    leftIcon={<Icon as={PagePlus} boxSize={5} />}
                                                    onClick={handleOnWorkspaceCreate}
                                                >
                                                    <Text marginX={2}>New Workspace</Text>
                                                </Button>
                                            )}
                                            onClick={handleOnWorkspaceClick}
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <WorkspaceCollection
                                            workspaces={[]}
                                            view={view}
                                            groupped={true}
                                            emptyTitle={getLocalizedString(LocaleKeys.NO_SHARED_TITLE)}
                                            emptyDescription={getLocalizedString(LocaleKeys.NO_SHARED_WORKSPACES_SUGGESTION)}
                                            onClick={handleOnWorkspaceClick}
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <WorkspaceCollection
                                            workspaces={archived}
                                            view={view}
                                            groupped={true}
                                            emptyTitle={getLocalizedString(LocaleKeys.NO_ARCHIVED_TITLE)}
                                            emptyDescription={getLocalizedString(LocaleKeys.NO_ARCHIVED_WORKSPACES_SUGGESTION)}
                                            onClick={handleOnWorkspaceClick}
                                        />
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </ContextSheetBody>
                    </>
                )}

                {selectedGroupName && (
                    <WorkspaceStack>
                        <WorkspaceStackHeader
                            title={selectedGroupName}
                            icon={AppleShortcuts}
                            isOpen={!!selectedGroupName}
                            onClose={handleCloseWorkspaceStack}
                        />
                        <WorkspaceStackBody isOpen={!!selectedGroupName}>
                            <WorkspaceCollection
                                workspaces={workspaces?.filter(workspace => workspace.group === selectedGroupName) || []}
                                view={"card"}
                                emptyTitle={getLocalizedString(LocaleKeys.NO_STACK_WORKSPACES_TITLE)}
                                emptyDescription={getLocalizedString(LocaleKeys.NO_STACK_WORKSPACES_SUGGESTION)}
                                onClick={handleOnWorkspaceClick}
                            />
                        </WorkspaceStackBody>
                    </WorkspaceStack>
                )}
            </ContextSheet>
        </HomePageLayoutContent>
    )
}