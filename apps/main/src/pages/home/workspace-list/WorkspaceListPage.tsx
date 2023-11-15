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
    ScaleFade,
    Button,
} from "@chakra-ui/react";
import {
    ContentViewMode,
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle,
    Toolbar,
    ToolbarSection,
    useContentViewMode,
    usePageHeader
} from "@reversearchitecture/ui";
import { Workspace } from "@structurizr/dsl";
import { StructurizrExportClient } from "@structurizr/export";
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
    useMemo,
    useState
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { v4 } from "uuid";
import {
    WorkspaceApi,
    WorkspaceList,
    WorkspaceInfo,
    WorkspaceGroupInfo,
    useAccount,
    isWorkspace
} from "../../../features";
import { HomePageLayoutContent } from "../../home";

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
    const { workspaceApi } = useMemo(() => ({ workspaceApi: new WorkspaceApi() }), []);
    const [ workspaces, setWorkspaces ] = useState([]);
    const [ selected, setSelected ] = useState<any[]>([]);
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

    const handleOnGroup = useCallback(() => {

    }, []);
    
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

    const handleOnWorkspaceRemove = useCallback(() => {
        workspaceApi.deleteWorkspace(selected.map(x => x.workspaceId))
            .then(workspaces => setWorkspaces(workspaces))
            .catch(error => console.error(error));
    }, [workspaceApi, selected, setWorkspaces]);

    const handleOnWorkspaceCancelSelected = useCallback(() => {
        setSelected([]);
    }, [setSelected]);

    const handleOnWorkspaceClick = useCallback((element: WorkspaceInfo | WorkspaceGroupInfo) => {
        if (isWorkspace(element)) {
            navigate(`/workspaces/${element.workspaceId}`);
        }
        else {
            setQueryParam(params => {
                params.set("group", element.name);
                return new URLSearchParams(params);
            });
        }
    }, [navigate, setQueryParam]);

    useEffect(() => {
        setHeaderContent({
            right: (
                <ButtonGroup key={"workspace-list-actions"} mr={4}>
                    <IconButton
                        aria-label={"import workspace"}
                        colorScheme={"gray"}
                        icon={<Upload />}
                        isDisabled
                        title={"Import Workspace"}
                    />
                    <Button
                        aria-label={"create new project"}
                        colorScheme={"yellow"}
                        leftIcon={<AddPageAlt />}
                        onClick={handleOnWorkspaceCreate}
                    >
                        Create Workspace
                    </Button>
                </ButtonGroup>
            )
        })
    }, [setHeaderContent, handleOnWorkspaceCreate]);

    return (
        <HomePageLayoutContent>
            <ContextSheet>
                <ContextSheetHeader>
                    {!!queryParams.get("group") && (
                        <IconButton
                            aria-label={"back to workspaces"}
                            colorScheme={"gray"}
                            icon={<NavArrowLeft />}
                            title={"back to workspaces"}
                            variant={"ghost"}
                            onClick={() => setQueryParam({ })}
                        />
                    )}
                    <ContextSheetTitle title={!!queryParams.get("group") ? queryParams.get("group") : "Workspaces"} />
                </ContextSheetHeader>

                <Divider />
                
                <ContextSheetBody>
                    <Tabs height={"100%"} index={tabIndex}>
                        <TabList backgroundColor={"whiteAlpha.50"} height={12} paddingX={6}>
                            <Tab
                                visibility={!!queryParams.get("group") ? "hidden" : "visible"}
                                onClick={() => setQueryParam({ tab: WorkspaceListTabs.All })}
                            >
                                Workspaces
                            </Tab>
                            <Tab
                                visibility={!!queryParams.get("group") ? "hidden" : "visible"}
                                onClick={() => setQueryParam({ tab: WorkspaceListTabs.Shared })}
                            >
                                Shared
                            </Tab>
                            <Tab
                                visibility={!!queryParams.get("group") ? "hidden" : "visible"}
                                onClick={() => setQueryParam({ tab: WorkspaceListTabs.Archived })}
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
                                    onRemove={handleOnWorkspaceRemove}
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
                                    onRemove={handleOnWorkspaceRemove}
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
                                    onRemove={handleOnWorkspaceRemove}
                                />
                            </TabPanel>
                            <TabPanel>
                                <WorkspaceList
                                    workspaces={workspaces?.filter(x => x.group === queryParams.get("group")) || []}
                                    view={view}
                                    isGrouped={false}
                                    emptyTitle={"No workspaces"}
                                    emptyDescription={"To get started, click the \"Create Workspace\" button to create a new project."}
                                    onClick={handleOnWorkspaceClick}
                                    onSelected={setSelected}
                                    onRemove={handleOnWorkspaceRemove}
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
                                        onClick={handleOnWorkspaceRemove}
                                    />
                                </ToolbarSection>
                                <ToolbarSection>
                                    <IconButton
                                        aria-label={"close"}
                                        icon={<Cancel />}
                                        title={"close"}
                                        onClick={handleOnWorkspaceCancelSelected}
                                    />
                                </ToolbarSection>
                            </Toolbar>
                        </Box>
                    </ScaleFade>
                </ContextSheetBody>
            </ContextSheet>
        </HomePageLayoutContent>
    )
}