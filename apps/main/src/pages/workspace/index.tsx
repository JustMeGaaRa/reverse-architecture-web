import {
    Avatar,
    AvatarGroup,
    Box,
    Divider,
    Flex,
    HStack,
    IconButton
} from "@chakra-ui/react";
import {
    Navigation,
    NavigationContent,
    NavigationHomeButton,
    NavigationSidebar,
    Page,
    PageBody,
    PageHeader,
    Route,
    RouteList
} from "@reversearchitecture/ui";
import {
    defaultTheme,
    fetchTheme,
    IWorkspaceTheme
} from "@structurizr/dsl";
import {
    AddKeyframes,
    AddUser,
    ChatLines,
    Code,
    HelpCircle,
    Timer
} from "iconoir-react";
import {
    FC,
    PropsWithChildren,
    useEffect,
    useState
} from "react";
import { Outlet } from "react-router";
import {
    WorkspaceMenu,
    WorkspaceThemeProvider
} from "../../containers";
import { useOnlineUsersStore } from "../../hooks";

export const Workspace: FC<PropsWithChildren> = () => {
    const [ theme, setTheme ] = useState<IWorkspaceTheme>(defaultTheme);
    const { users } = useOnlineUsersStore();

    
    const colorSchemes = [
        "blue",
        "green",
        "red",
        "orange",
        "yellow",
        "purple",
    ]

    useEffect(() => {
        fetchTheme(`https://raw.githubusercontent.com/JustMeGaaRa/reverse-architecture-community/main/theme.json`)
            .then(theme => {
                setTheme(theme);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <Page>
            <PageHeader>
                <HStack gap={2}>
                    <NavigationHomeButton />
                    <Divider
                        borderWidth={1}
                        color={"gray.200"}
                        height={"32px"}
                        orientation={"vertical"}
                    />
                    <WorkspaceMenu title={"Big Bank plc."} />
                </HStack>
                <HStack gap={2}>
                    <AvatarGroup max={3} cursor={"pointer"}>
                        {users.map((user, index) => (
                            <Avatar
                                key={user.username}
                                colorScheme={colorSchemes[index % colorSchemes.length]}
                                name={user.fullname}
                                src={user.avatarUrl}
                                title={user.fullname}
                            />
                        ))}
                    </AvatarGroup>
                    <IconButton
                        aria-label={"share"}
                        colorScheme={"gray"}
                        icon={<AddUser />}
                        size={"md"}
                    />
                </HStack>
            </PageHeader>
            <PageBody>
                <Navigation>
                    <NavigationSidebar isExpanded={false}>
                        <Flex
                            direction={"column"}
                            justifyContent={"space-between"}
                            px={2}
                            py={4}
                            height={"100%"}
                        >
                            <Box>
                                
                            </Box>
                            <RouteList>
                                <Route
                                    icon={AddKeyframes}
                                    title={"add frames"}
                                    to={"add"}
                                />
                                <Route
                                    icon={Code}
                                    title={"code editor"}
                                    to={"editor"}
                                />
                                <Route
                                    icon={Timer}
                                    title={"timer"}
                                    to={"timer"}
                                />
                                <Route
                                    icon={ChatLines}
                                    title={"comments"}
                                    to={"comments"}
                                />
                            </RouteList>
                            <RouteList>
                                <Route
                                    icon={HelpCircle}
                                    title={"help"}
                                    to={"help"}
                                />
                            </RouteList>
                        </Flex>
                    </NavigationSidebar>
                    <NavigationContent>
                        <WorkspaceThemeProvider value={{ theme }}>
                            <Outlet />
                        </WorkspaceThemeProvider>
                    </NavigationContent>
                </Navigation>
            </PageBody>
        </Page>
    )
}