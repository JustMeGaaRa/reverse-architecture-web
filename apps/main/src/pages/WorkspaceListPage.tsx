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
    Combine,
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
    WorkspaceGroupInfo,
    isWorkspace
} from "../features";

export const WorkspaceListPage: FC<PropsWithChildren> = () => {
    const [ queryParams, setQueryParams ] = useSearchParams([
        ["shared", "false"],
        ["archived", "false"],
        ["group", ""]
    ]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ workspaceApi ] = useState(new WorkspaceApi());
    const [ workspaces, setWorkspaces ] = useState([]);
    const [ selected, setSelected ] = useState<any[]>([]);
    const { view, setView } = useContentViewMode(ContentViewMode.Card);
    const { account } = useAccount();
    const navigate = useNavigate();

    const queryState = {
        shared: queryParams.get("shared") === "true",
        archived: queryParams.get("archived") === "true",
        group: queryParams.get("group")
    }
    const tabIndex = queryState.group ? 3 : queryState.archived ? 2 : queryState.shared ? 1 : 0;

    useEffect(() => {
        workspaceApi.getWorkspaces()
            .then(workspaces => setWorkspaces(workspaces))
            .catch(error => console.error(error));
    }, [workspaceApi, account]);
    
    const handleOnCreate = useCallback((workspace: WorkspaceInfo) => {
        workspaceApi.saveWorkspace(workspace.workspaceId, workspace)
            .then(workspaces => setWorkspaces(workspaces))
            .catch(error => console.error(error));
    }, [workspaceApi, setWorkspaces]);

    const handleOnGroup = useCallback(() => {

    }, []);

    const handleOnRemove = useCallback(() => {
        workspaceApi.deleteWorkspace(selected.map(x => x.workspaceId))
            .then(workspaces => setWorkspaces(workspaces))
            .catch(error => console.error(error));
    }, [workspaceApi, selected, setWorkspaces]);

    const handleOnClose = useCallback(() => {
        setSelected([]);
    }, [setSelected]);

    const handleOnWorkspaceClick = useCallback((element: WorkspaceInfo | WorkspaceGroupInfo) => {
        if (isWorkspace(element)) {
            navigate(`/workspaces/${element.workspaceId}`);
        }
        else {
            setQueryParams({ group: element.name });
        }
    }, [navigate, setQueryParams]);

    return (
        <ContextSheet>
            <NavigationSource>
                <ButtonGroup size={"md"} variant={"outline"}>
                    <IconButton
                        aria-label={"import workspace"}
                        key={"import-workspace"}
                        colorScheme={"gray"}
                        icon={<Upload />}
                        isDisabled={true}
                        title={"Import Workspace"}
                    />
                    <Button
                        aria-label={"create new project"}
                        key={"create-new-project"}
                        colorScheme={"yellow"}
                        leftIcon={<AddPageAlt />}
                        onClick={onOpen}
                    >
                        Create Workspace
                    </Button>
                </ButtonGroup>
            </NavigationSource>

            <WorkspaceCreationModal
                isOpen={isOpen}
                onClose={onClose}
                onCreate={handleOnCreate}
            />

            <ContextSheetHeader>
                {!!queryState.group && (
                    <IconButton
                        aria-label={"back to workspaces"}
                        colorScheme={"gray"}
                        icon={<NavArrowLeft />}
                        title={"back to workspaces"}
                        variant={"ghost"}
                        onClick={() => setQueryParams({ })}
                    />
                )}
                <ContextSheetTitle title={!!queryState.group ? queryState.group : "Workspaces"} />
            </ContextSheetHeader>

            <Divider />
            
            <ContextSheetBody>
                <Tabs height={"100%"} index={tabIndex}>
                    <TabList backgroundColor={"whiteAlpha.50"} height={12} paddingX={6}>
                        <Tab
                            visibility={!!queryState.group ? "hidden" : "visible"}
                            onClick={() => setQueryParams({})}
                        >
                            Workspaces
                        </Tab>
                        <Tab
                            visibility={!!queryState.group ? "hidden" : "visible"}
                            onClick={() => setQueryParams({ shared: "true" })}
                        >
                            Shared
                        </Tab>
                        <Tab
                            visibility={!!queryState.group ? "hidden" : "visible"}
                            onClick={() => setQueryParams({ archived: "true" })}
                        >
                            Archived
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
                                _active={{
                                    backgroundColor: "whiteAlpha.200",
                                    color: "yellow.900"
                                }}
                                onClick={() => setView(ContentViewMode.Card)}
                            />
                            <IconButton
                                aria-label={"table view"}
                                isActive={view === ContentViewMode.Table}
                                icon={<List />}
                                _active={{
                                    backgroundColor: "whiteAlpha.200",
                                    color: "yellow.900"
                                }}
                                onClick={() => setView(ContentViewMode.Table)}
                            />
                        </ButtonGroup>
                    </TabList>
                    <TabPanels height={"calc(100% - 42px)"} padding={6} overflowY={"scroll"}>
                        <TabPanel>
                            <WorkspaceList
                                workspaces={workspaces}
                                view={view}
                                isGrouped={true}
                                emptyTitle={"No workspaces"}
                                emptyDescription={"To get started, click the \"Create Workspace\" button to create a new project."}
                                onClick={handleOnWorkspaceClick}
                                onSelected={setSelected}
                                onRemove={handleOnRemove}
                            />
                        </TabPanel>
                        <TabPanel>
                            <WorkspaceList
                                workspaces={[]}
                                view={view}
                                isGrouped={true}
                                emptyTitle={"No shared workspaces"}
                                emptyDescription={"To get started, click the \"Create Workspace\" button to create a new project."}
                                onClick={handleOnWorkspaceClick}
                                onSelected={setSelected}
                                onRemove={handleOnRemove}
                            />
                        </TabPanel>
                        <TabPanel>
                            <WorkspaceList
                                workspaces={[]}
                                view={view}
                                isGrouped={true}
                                emptyTitle={"No archived workspaces"}
                                emptyDescription={"To get started, click the \"Create Workspace\" button to create a new project."}
                                onClick={handleOnWorkspaceClick}
                                onSelected={setSelected}
                                onRemove={handleOnRemove}
                            />
                        </TabPanel>
                        <TabPanel>
                            <WorkspaceList
                                workspaces={workspaces?.filter(x => x.group === queryState.group) || []}
                                view={view}
                                isGrouped={false}
                                emptyTitle={"No workspaces"}
                                emptyDescription={"To get started, click the \"Create Workspace\" button to create a new project."}
                                onClick={handleOnWorkspaceClick}
                                onSelected={setSelected}
                                onRemove={handleOnRemove}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <ScaleFade in={selected.length > 0}>
                    <Box position={"absolute"} bottom={4} left={"50%"} transform={"translateX(-50%)"}>
                        <Toolbar>
                            <ToolbarSection>
                                <Text paddingX={2}>
                                    {`${selected.length} item(s) selected`}
                                </Text>
                            </ToolbarSection>
                            <ToolbarSection>
                                <IconButton
                                    aria-label={"group elements"}
                                    icon={<Combine />}
                                    title={"group elements"}
                                    onClick={handleOnGroup}
                                />
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