import {
    Box,
    ButtonGroup,
    Divider,
    Flex,
    IconButton,
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Text,
    ScaleFade,
    Button,
    Icon,
    Slide,
    SlideFade,
} from "@chakra-ui/react";
import {
    ButtonSegmentedToggle,
    ContentViewMode,
    ContextSheet,
    ContextSheetBody,
    ContextSheetCloseButton,
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
    AppleShortcuts,
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

    const handleOnStackWorkspaces = useCallback(() => {

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
                <ButtonGroup key={"workspace-list-actions"} mr={4} variant={"filled"}>
                    <IconButton
                        aria-label={"import workspace"}
                        colorScheme={"gray"}
                        icon={<Upload />}
                        isDisabled
                        title={"Import Workspace"}
                    />
                    <Button
                        aria-label={"new project"}
                        colorScheme={"lime"}
                        leftIcon={<Icon as={AddPageAlt} boxSize={5} />}
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
                                <Tab
                                    visibility={!!queryParams.get("group") ? "hidden" : "visible"}
                                    onClick={() => setQueryParam({ tab: WorkspaceListTabs.All })}
                                >
                                    My Workspaces
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
                                    <WorkspaceList
                                        workspaces={workspaces}
                                        view={view}
                                        emptyTitle={"No workspaces"}
                                        emptyDescription={"To get started, click the \"Create Workspace\" button to create a new project."}
                                        emptyAction={(
                                            <Button
                                                aria-label={"new project"}
                                                colorScheme={"lime"}
                                                leftIcon={<Icon as={AddPageAlt} boxSize={5} />}
                                                iconSpacing={"0px"}
                                                onClick={handleOnWorkspaceCreate}
                                            >
                                                <Text marginX={2}>New Workspace</Text>
                                            </Button>
                                        )}
                                        onClick={handleOnWorkspaceClick}
                                        onSelected={setSelected}
                                        onRemove={handleOnWorkspaceRemove}
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <WorkspaceList
                                        workspaces={[]}
                                        view={view}
                                        emptyTitle={"No shared workspaces"}
                                        emptyDescription={"To get started, click the \"Create Workspace\" button to create a new project."}
                                        emptyAction={(
                                            <Button
                                                aria-label={"new project"}
                                                colorScheme={"lime"}
                                                leftIcon={<Icon as={AddPageAlt} boxSize={5} />}
                                                iconSpacing={"0px"}
                                                onClick={handleOnWorkspaceCreate}
                                            >
                                                <Text marginX={2}>New Workspace</Text>
                                            </Button>
                                        )}
                                        onClick={handleOnWorkspaceClick}
                                        onSelected={setSelected}
                                        onRemove={handleOnWorkspaceRemove}
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <WorkspaceList
                                        workspaces={[]}
                                        view={view}
                                        emptyTitle={"No archived workspaces"}
                                        emptyDescription={"To get started, click the \"Create Workspace\" button to create a new project."}
                                        onClick={handleOnWorkspaceClick}
                                        onSelected={setSelected}
                                        onRemove={handleOnWorkspaceRemove}
                                    />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                        <ScaleFade in={selected?.length > 0}>
                            <Box position={"absolute"} bottom={4} left={"50%"} transform={"translateX(-50%)"}>
                                <Toolbar>
                                    <ToolbarSection>
                                        <IconButton
                                            aria-label={"close"}
                                            icon={<Cancel />}
                                            title={"close"}
                                            variant={"tonal"}
                                            onClick={handleOnWorkspaceCancelSelected}
                                        />
                                        <Text paddingX={2}>
                                            {`${selected.length} selected`}
                                        </Text>
                                    </ToolbarSection>
                                    <ToolbarSection>
                                        <IconButton
                                            aria-label={"stack elements"}
                                            icon={<AppleShortcuts />}
                                            title={"stack elements"}
                                            onClick={handleOnStackWorkspaces}
                                        />
                                        <IconButton
                                            aria-label={"copy"}
                                            icon={<Copy />}
                                            title={"copy"}
                                        />
                                        <IconButton
                                            aria-label={"remove"}
                                            icon={<BinMinus />}
                                            title={"remove"}
                                            onClick={handleOnWorkspaceRemove}
                                        />
                                    </ToolbarSection>
                                </Toolbar>
                            </Box>
                        </ScaleFade>
                    </ContextSheetBody>
                )}

                {queryParams.get("group") && (
                    <Flex direction={"column"} gap={2} padding={2} height={"100%"}>
                        <ScaleFade in={!!queryParams.get("group")}>
                            <Flex
                                background={"surface.tinted-white-10"}
                                borderRadius={24}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                                gap={2}
                                padding={4}
                                paddingRight={2}
                                height={16}
                                width={"100%"}
                            >
                                <ContextSheetTitle icon={AppleShortcuts} title={queryParams.get("group")} />
                                <ContextSheetCloseButton size={"lg"} onClick={() => setQueryParam({})} />
                            </Flex>
                        </ScaleFade>
                        <ScaleFade in={!!queryParams.get("group")} transition={{ enter: { delay: 0.3 } }}>
                            <Box
                                background={"surface.tinted-white-5"}
                                borderRadius={24}
                                padding={4}
                                height={"100%"}
                                width={"100%"}
                            >
                                <WorkspaceList
                                    workspaces={workspaces?.filter(x => x.group === queryParams.get("group")) || []}
                                    view={view}
                                    emptyTitle={"No workspaces"}
                                    emptyDescription={"To get started, click the \"Create Workspace\" button to create a new project."}
                                    onClick={handleOnWorkspaceClick}
                                    onSelected={setSelected}
                                    onRemove={handleOnWorkspaceRemove}
                                />
                            </Box>
                        </ScaleFade>
                    </Flex>
                )}
            </ContextSheet>
        </HomePageLayoutContent>
    )
}