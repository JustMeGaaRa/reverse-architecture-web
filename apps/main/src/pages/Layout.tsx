import {
    Box,
    Divider,
    Flex,
    useDisclosure
} from "@chakra-ui/react";
import {
    ReverseArchitectureLogo,
    PageContent,
    PageSidebarToggleButton,
    PageSidebar,
    Page,
    PageBody,
    PageHeader,
    Route,
    RouteList,
    Search,
    PageHomeButton
} from "@reversearchitecture/ui";
import {
    BellNotification,
    HelpCircle,
    HomeSimple,
    Internet,
    MultiplePagesEmpty,
    Settings
} from "iconoir-react";
import { FC, PropsWithChildren } from "react";
import { Outlet, useNavigate } from "react-router";
import {
    AccountMenu,
    NavigationTarget,
} from "../containers";

export const Layout: FC<PropsWithChildren> = () => {
    const { isOpen, onToggle } = useDisclosure();
    const navigate = useNavigate();

    return (
        <Page>
            <PageSidebar isOpen={isOpen}>
                <PageHomeButton
                    icon={<ReverseArchitectureLogo />}
                    onClick={() => navigate("/")}
                />
                <Flex
                    direction={"column"}
                    justifyContent={"space-between"}
                    padding={4}
                    height={"100%"}
                >
                    <RouteList>
                        <Route
                            isDisabled={true}
                            isExpanded={isOpen}
                            icon={HomeSimple}
                            title={"Dashboard"}
                            to={"dashboard"}
                        />
                        <Route
                            isExpanded={isOpen}
                            icon={MultiplePagesEmpty}
                            title={"All Projects"}
                            to={"projects"}
                        />
                        <Route
                            isExpanded={isOpen}
                            icon={Internet}
                            title={"Community"}
                            to={"community"}
                        />
                    </RouteList>
                    <RouteList>
                        <Route
                            isDisabled={true}
                            isExpanded={isOpen}
                            icon={BellNotification}
                            title={"Notifications"}
                            to={"notifications"}
                        />
                        <Route
                            isExpanded={isOpen}
                            icon={Settings}
                            title={"Settings"}
                            to={"settings"}
                        />
                        <Route
                            isDisabled={true}
                            isExpanded={isOpen}
                            icon={HelpCircle}
                            title={"Help & Feedback"}
                            to={"help"}
                        />
                    </RouteList>
                </Flex>
                <Box>
                    <Box padding={2}>
                        <AccountMenu expanded={isOpen} />
                    </Box>
                    <Divider backgroundColor={"whiteAlpha.200"} />
                    <PageSidebarToggleButton
                        isExpanded={isOpen}
                        onClick={onToggle}
                    />
                </Box>
            </PageSidebar>
            <PageBody>
                <PageHeader>
                    <Box />
                    <Box flexGrow={1} maxWidth={["xl"]} mx={4}>
                        <Search />
                    </Box>
                    <Box mr={4}>
                        <NavigationTarget />
                    </Box>
                </PageHeader>
                <PageContent>
                    <Outlet />
                </PageContent>
            </PageBody>
        </Page>
    )
}