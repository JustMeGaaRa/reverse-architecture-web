import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    IconButton,
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Text,
    ScaleFade,
    useDisclosure,
} from "@chakra-ui/react";
import {
    ContentViewMode,
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle,
    Toolbar,
    ToolbarSection,
    useContentViewMode
} from "@reversearchitecture/ui";
import {
    AddPageAlt,
    BinMinus,
    Cancel,
    Copy,
    List,
    NavArrowLeft,
    Upload,
    ViewGrid
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
    NavigationSource,
    WorkspaceCreationModal,
} from "../containers";
import {
    useAccount,
    WorkspaceApi,
    WorkspaceList,
    WorkspaceInfo,
    WorkspaceGroupInfo
} from "../features";

export const WorkspaceListPage: FC<PropsWithChildren> = () => {
    const [ queryParams, setQueryParams ] = useSearchParams([
        ["shared", "false"],
        ["archived", "false"],
        ["groupId", ""]
    ]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ workspaceApi ] = useState(new WorkspaceApi());
    const [ groups, setGroups ] = useState([]);
    const [ workspaces, setWorkspaces ] = useState([]);
    const [ selectedGroups, setSelectedGroups ] = useState<WorkspaceGroupInfo[]>();
    const [ selectedWorkspaces, setSelectedWorkspaces ] = useState<any[]>([]);
    const { view, setView } = useContentViewMode(ContentViewMode.Card);
    const { account } = useAccount();
    const navigate = useNavigate();

    const queryState = {
        shared: queryParams.get("shared") === "true",
        archived: queryParams.get("archived") === "true",
        groupId: queryParams.get("groupId")
    }
    const tabIndex = queryState.groupId ? 3 : queryState.archived ? 2 : queryState.shared ? 1 : 0;
    const queryGroup = groups.find(x => x.groupId === queryState.groupId);

    useEffect(() => {
        workspaceApi.getGroups()
            .then(groups => {
                setGroups(groups);
            })
            .catch(error => {
                console.error(error);
            });
        workspaceApi.getWorkspacesByAuthor(account.name)
            .then(workspaces => {
                setWorkspaces(workspaces);
            })
            .catch(error => {
                console.error(error);
            });
    }, [workspaceApi, account]);
    
    const handleOnCreate = useCallback((workspace: WorkspaceInfo) => {
        // TODO: use real groupId
        workspaceApi.saveWorkspace(undefined, workspace);
        setWorkspaces(workspaces.concat(workspace));
    }, [workspaceApi, workspaces, setWorkspaces]);

    const handleOnRemove = useCallback(() => {
        selectedWorkspaces.map(workspace =>  workspaceApi.deleteWorkspace(undefined, workspace.workspaceId));
        setWorkspaces(workspaces.filter(x => !selectedWorkspaces.some(y => y.workspaceId === x.workspaceId)));
    }, [workspaceApi, selectedWorkspaces, workspaces, setWorkspaces]);

    const handleOnClose = useCallback(() => {
        setSelectedWorkspaces([]);
    }, [setSelectedWorkspaces]);

    const handleOnWorkspaceClick = useCallback((workspace: WorkspaceInfo) => {
        navigate(`/workspaces/${workspace.groupId}`)
    }, [navigate]);

    const handleOnGroupClick = useCallback((group: WorkspaceGroupInfo) => {
        setQueryParams({ groupId: group.groupId });
    }, [setQueryParams]);

    return (
        <ContextSheet>
            <NavigationSource>
                <ButtonGroup size={"md"} variant={"outline"}>
                    <Button
                        aria-label={"create new project"}
                        key={"create-new-project"}
                        colorScheme={"yellow"}
                        leftIcon={<AddPageAlt />}
                        onClick={onOpen}
                    >
                        Create Workspace
                    </Button>
                    <IconButton
                        aria-label={"import workspace"}
                        key={"import-workspace"}
                        colorScheme={"gray"}
                        icon={<Upload />}
                        isDisabled={true}
                        title={"Import Workspace"}
                    />
                </ButtonGroup>
            </NavigationSource>

            <WorkspaceCreationModal
                isOpen={isOpen}
                onClose={onClose}
                onCreate={handleOnCreate}
            />

            <ContextSheetHeader>
                {queryState.groupId && (
                    <IconButton
                        aria-label={"back to workspaces"}
                        colorScheme={"gray"}
                        icon={<NavArrowLeft />}
                        title={"back to workspaces"}
                        variant={"ghost"}
                        onClick={() => setQueryParams({})}
                    />
                )}
                <ContextSheetTitle title={queryGroup?.name ?? "Workspaces"} />
            </ContextSheetHeader>

            <Divider />
            
            <ContextSheetBody>
                <Tabs height={"100%"} index={tabIndex}>
                    <TabList backgroundColor={"whiteAlpha.50"} height={12} paddingX={6}>
                        <Tab
                            visibility={queryState.groupId ? "hidden" : "visible"}
                            onClick={() => setQueryParams({})}
                        >
                            Workspaces
                        </Tab>
                        <Tab
                            visibility={queryState.groupId ? "hidden" : "visible"}
                            onClick={() => setQueryParams({ shared: "true" })}
                        >
                            Shared
                        </Tab>
                        <Tab
                            visibility={queryState.groupId ? "hidden" : "visible"}
                            onClick={() => setQueryParams({ archived: "true" })}
                        >
                            Archived
                        </Tab>
                        <Tab visibility={"hidden"}>
                            Group
                        </Tab>
                        <ButtonGroup
                            alignSelf={"center"}
                            colorScheme={"gray"}
                            position={"absolute"}
                            right={4}
                            size={"sm"}
                            variant={"ghost"}
                        >
                            <IconButton
                                aria-label={"card view"}
                                isActive={view === ContentViewMode.Card}
                                icon={<ViewGrid />}
                                onClick={() => setView(ContentViewMode.Card)}
                            />
                            <IconButton
                                aria-label={"table view"}
                                isActive={view === ContentViewMode.Table}
                                icon={<List />}
                                onClick={() => setView(ContentViewMode.Table)}
                            />
                        </ButtonGroup>
                    </TabList>
                    <TabPanels height={"calc(100% - 42px)"} padding={6} overflowY={"scroll"}>
                        <TabPanel>
                            <WorkspaceList
                                groups={groups}
                                workspaces={workspaces}
                                view={view}
                                emptyTitle={"No workspaces"}
                                emptyDescription={"To get started, click the \"Create Workspace\" button to create a new project."}
                                onClick={handleOnWorkspaceClick}
                                onGroupClick={handleOnGroupClick}
                                onSelected={setSelectedWorkspaces}
                                onRemove={handleOnRemove}
                            />
                        </TabPanel>
                        <TabPanel>
                            <WorkspaceList
                                groups={[]}
                                workspaces={[]}
                                view={view}
                                emptyTitle={"No shared workspaces"}
                                emptyDescription={"To get started, click the \"Create Workspace\" button to create a new project."}
                                onSelected={setSelectedWorkspaces}
                                onRemove={handleOnRemove}
                                onClick={handleOnWorkspaceClick}
                            />
                        </TabPanel>
                        <TabPanel>
                            <WorkspaceList
                                groups={[]}
                                workspaces={[]}
                                view={view}
                                emptyTitle={"No archived workspaces"}
                                emptyDescription={"To get started, click the \"Create Workspace\" button to create a new project."}
                                onSelected={setSelectedWorkspaces}
                                onRemove={handleOnRemove}
                                onClick={handleOnWorkspaceClick}
                            />
                        </TabPanel>
                        <TabPanel>
                            <WorkspaceList
                                groups={[]}
                                workspaces={queryGroup?.workspaces || []}
                                view={view}
                                emptyTitle={"No workspaces"}
                                emptyDescription={"To get started, click the \"Create Workspace\" button to create a new project."}
                                onSelected={setSelectedWorkspaces}
                                onRemove={handleOnRemove}
                                onClick={handleOnWorkspaceClick}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <ScaleFade in={selectedWorkspaces.length > 0}>
                    <Box position={"absolute"} bottom={4} left={"50%"} transform={"translateX(-50%)"}>
                        <Toolbar>
                            <ToolbarSection>
                                <Text paddingX={2}>
                                    {`${selectedWorkspaces.length} item(s) selected`}
                                </Text>
                            </ToolbarSection>
                            <ToolbarSection>
                                <IconButton
                                    aria-label={"copy"}
                                    icon={<Copy />}
                                    isDisabled
                                    title={"copy"}
                                />
                                <IconButton
                                    aria-label={"remove"}
                                    icon={<BinMinus />}
                                    title={"remove"}
                                    onClick={handleOnRemove}
                                />
                            </ToolbarSection>
                            <ToolbarSection>
                                <IconButton
                                    aria-label={"close"}
                                    icon={<Cancel />}
                                    title={"close"}
                                    onClick={handleOnClose}
                                />
                            </ToolbarSection>
                        </Toolbar>
                    </Box>
                </ScaleFade>
            </ContextSheetBody>
        </ContextSheet>
    )
}