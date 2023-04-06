import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    HStack,
    IconButton,
    useDisclosure
} from "@chakra-ui/react";
import {
    AddPageAlt,
    BellNotification,
    Globe,
    HelpCircle,
    HomeSimple,
    MultiplePagesEmpty,
    Settings,
    Upload
} from "iconoir-react";
import { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router";
import { ContextSheet } from "../components/ContextSheet";
import { Route } from "../components/Route";
import { Page } from "../components/Page";
import { PageHeader } from "../components/PageHeader";
import { PageBody } from "../components/PageBody";
import { Navigation } from "../components/Navigation";
import { NavigationSidebarToggle } from "../components/NavigationSidebarToggle";
import { NavigationSidebar } from "../components/NavigationSidebar";
import { NavigationContent } from "../components/NavigationContent";
import { Logo } from "../components/Logo";
import { RouteList } from "../components/RouteList";
import { Search } from "../components/Search";
import { AccountMenu } from "../containers";

export const Layout: FC<PropsWithChildren<{
}>> = ({
}) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Page>
            <PageHeader>
                <HStack>
                    <NavigationSidebarToggle onClick={onToggle} />
                    <Logo />
                </HStack>
                <Box>
                    <Search />
                </Box>
                <Box>
                    <ButtonGroup mr={4} variant={"outline"}>
                        <Button
                            leftIcon={<AddPageAlt />}
                        >
                            Create new file
                        </Button>
                        <IconButton
                            aria-label={"button"}
                            icon={<Upload />}
                        />
                    </ButtonGroup>
                </Box>
            </PageHeader>
            <PageBody>
                <Navigation>
                    <NavigationSidebar expanded={isOpen}>
                        <Box>
                            <RouteList>
                                <Route expanded={isOpen} icon={<HomeSimple />} label={"Dashboard"} to={"dashboard"} />
                                <Route expanded={isOpen} icon={<MultiplePagesEmpty />} label={"My Projects"} to={"projects"} />
                                <Route expanded={isOpen} icon={<Globe />} label={"Community"} to={"hub"} />
                            </RouteList>
                        </Box>
                        <Box my={"20px"}>
                            <RouteList>
                                <Route expanded={isOpen} icon={<BellNotification />} label={"Notifications"} to={"notifications"} />
                                <Route expanded={isOpen} icon={<Settings />} label={"Settings"} to={"settings"} />
                                <Route expanded={isOpen} icon={<HelpCircle />} label={"Help & Feedback"} to={"help"} />
                            </RouteList>
                            <Divider orientation={"horizontal"} my={4} />
                            <AccountMenu expanded={isOpen} />
                        </Box>
                    </NavigationSidebar>
                    <NavigationContent>
                        <ContextSheet>
                            <Outlet />
                        </ContextSheet>
                    </NavigationContent>
                </Navigation>
            </PageBody>
        </Page>
    )
}