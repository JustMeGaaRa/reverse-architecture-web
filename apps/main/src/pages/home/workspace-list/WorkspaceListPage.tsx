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
} from "@chakra-ui/react";
import {
    ButtonSegmentedToggle,
    ContentViewMode,
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle,
    useContentViewMode,
    usePageHeader
} from "@reversearchitecture/ui";
import { Workspace } from "@structurizr/dsl";
import { StructurizrExportClient } from "@structurizr/export";
import {
    PagePlus,
    List,
    Upload,
    ViewGrid
} from "iconoir-react";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { v4 } from "uuid";
import {
    WorkspaceApi,
    WorkspaceCollection,
    WorkspaceInfo,
    WorkspaceGroupInfo,
    useAccount,
    isWorkspace,
    isWorkspaceGroup,
    WorkspaceCacheWrapper
} from "../../../features";
import { HomePageLayoutContent } from "../../home";
import { WorkspaceStack } from "./WorkspaceStack";

export enum WorkspaceListTabs {
    All = "all",
    Shared = "shared",
    Archived = "archived"
}

export const WorkspaceListPage: FC<PropsWithChildren> = () => {
    const { setHeaderContent } = usePageHeader();
    const [ queryParams, setQueryParam ] = useSearchParams([[ "tab", WorkspaceListTabs.All ]]);
    const { view, setView } = useContentViewMode(ContentViewMode.Card);
    const { account } = useAccount();
    const { workspaceApi } = useMemo(() => ({ workspaceApi: new WorkspaceCacheWrapper(new WorkspaceApi()) }), []);
    const [ workspaces, setWorkspaces ] = useState([]);
    const navigate = useNavigate();
    
    const tabIndex = queryParams.get("group")
        ? 3
        : queryParams.get("tab") === WorkspaceListTabs.Archived
            ? 2
            : queryParams.get("tab") === WorkspaceListTabs.Shared
                ? 1
                : 0;

    useEffect(() => {
        workspaceApi.getWorkspaces()
            .then(workspaces => setWorkspaces(workspaces))
            .catch(error => console.error(error));
    }, [workspaceApi, account]);
    
    const handleOnWorkspaceCreate = useCallback(() => {
        // TODO: encapsulate the creation of a new empty workspace
        const structurizrExportClient = new StructurizrExportClient();
        const workspaceId = v4();
        const workspace: WorkspaceInfo = {
            workspaceId,
            name: "New Workspace",
            createdBy: account.username,
            createdDate: new Date().toLocaleString(),
            lastModifiedBy: account.username,
            lastModifiedDate: new Date().toLocaleString(),
            tags: [],
            content: {
                text: structurizrExportClient.export(Workspace.Empty.toObject()),
            }
        };
        workspaceApi.saveWorkspace(workspaceId, workspace)
            .then(workspaces => setWorkspaces(workspaces))
            .catch(error => console.error(error));
    }, [account.username, workspaceApi]);

    const handleOnWorkspaceRemove = useCallback((selected: any[]) => {
        workspaceApi.deleteWorkspace(selected.map(x => x.workspaceId))
            .then(workspaces => setWorkspaces(workspaces))
            .catch(error => console.error(error));
    }, [workspaceApi, setWorkspaces]);

    const handleOnWorkspaceClick = useCallback((element: WorkspaceInfo | WorkspaceGroupInfo) => {
        if (isWorkspace(element)) {
            navigate(`/workspaces/${element.workspaceId}`);
        }
        if (isWorkspaceGroup(element)) {
            setQueryParam(params => {
                params.set("group", element.name);
                return new URLSearchParams(params);
            });
        }
    }, [navigate, setQueryParam]);

    const handleOnWorkspaceStack = useCallback((elements: Array<WorkspaceInfo | WorkspaceGroupInfo>) => {
        elements
            .filter(element => isWorkspace(element))
            .map<WorkspaceInfo>(element => ({
                ...element as WorkspaceInfo,
                group: "Group"
            }))
            .forEach(element => {
                // workspaceApi.saveWorkspace(element.workspaceId, element)
                //     .then(workspaces => setWorkspaces(workspaces))
                //     .catch(error => console.error(error));
            });
    }, [workspaceApi]);

    useEffect(() => {
        setHeaderContent({
            right: (
                <ButtonGroup key={"workspace-list-actions"} mr={4} variant={"filled"}>
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

    return (
        <HomePageLayoutContent>
            <ContextSheet>
                {!queryParams.get("group") && (
                    <ContextSheetHeader>
                        <ContextSheetTitle title={"Workspaces"} />
                    </ContextSheetHeader>
                )}

                {!queryParams.get("group") && (
                    <Divider />
                )}
                
                {!queryParams.get("group") && (
                    <ContextSheetBody>
                        <Tabs height={"100%"} index={tabIndex}>
                            <TabList backgroundColor={"surface.tinted-black-40"} height={12} paddingX={2}>
                                <Tab onClick={() => setQueryParam({ tab: WorkspaceListTabs.All })}>
                                    My Workspaces
                                </Tab>
                                <Tab onClick={() => setQueryParam({ tab: WorkspaceListTabs.Shared })}>
                                    Shared
                                </Tab>
                                <Tab onClick={() => setQueryParam({ tab: WorkspaceListTabs.Archived })}>
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
                                        emptyTitle={"No workspaces"}
                                        emptyDescription={"To get started, click the \"New Workspace\" button."}
                                        emptyAction={(
                                            <Button
                                                aria-label={"new project"}
                                                colorScheme={"lime"}
                                                leftIcon={<Icon as={PagePlus} boxSize={5} />}
                                                iconSpacing={"0px"}
                                                onClick={handleOnWorkspaceCreate}
                                            >
                                                <Text marginX={2}>New Workspace</Text>
                                            </Button>
                                        )}
                                        onClick={handleOnWorkspaceClick}
                                        onStack={handleOnWorkspaceStack}
                                        onDelete={handleOnWorkspaceRemove}
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <WorkspaceCollection
                                        workspaces={[]}
                                        view={view}
                                        groupped={true}
                                        emptyTitle={"No shared workspaces"}
                                        emptyDescription={"To get started, share some workspaces from the \"My Workspaces\" tab."}
                                        onClick={handleOnWorkspaceClick}
                                        onStack={handleOnWorkspaceStack}
                                        onDelete={handleOnWorkspaceRemove}
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <WorkspaceCollection
                                        workspaces={[]}
                                        view={view}
                                        groupped={true}
                                        emptyTitle={"No archived workspaces"}
                                        emptyDescription={"To get started, archive some workspaces from the \"Me Workspaces\" tab."}
                                        onClick={handleOnWorkspaceClick}
                                        onStack={handleOnWorkspaceStack}
                                        onDelete={handleOnWorkspaceRemove}
                                    />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ContextSheetBody>
                )}

                {queryParams.get("group") && (
                    <WorkspaceStack
                        name={queryParams.get("group")}
                        isOpen={!!queryParams.get("group")}
                        onClose={() => setQueryParam({})}
                    >
                        <WorkspaceCollection
                            workspaces={workspaces?.filter(x => x.group === queryParams.get("group")) || []}
                            view={"card"}
                            emptyTitle={"No workspaces in group"}
                            emptyDescription={"To get started, click the \"New Workspace\" button to create a new workspace."}
                            onClick={handleOnWorkspaceClick}
                            onDelete={handleOnWorkspaceRemove}
                        />
                    </WorkspaceStack>
                )}
            </ContextSheet>
        </HomePageLayoutContent>
    )
}