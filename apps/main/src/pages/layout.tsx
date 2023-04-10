import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Flex,
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
                    <NavigationSidebarToggle isExpanded={isOpen} onClick={onToggle} />
                    <Logo />
                </HStack>
                <Box>
                    <Search />
                </Box>
                <Box>
                    <ButtonGroup mr={4} size={"lg"} variant={"outline"}>
                        <Button
                            colorScheme={"yellow"}
                            leftIcon={<AddPageAlt />}
                        >
                            Create new file
                        </Button>
                        <IconButton
                            aria-label={"button"}
                            colorScheme={"gray"}
                            icon={<Upload />}
                        />
                    </ButtonGroup>
                </Box>
            </PageHeader>
            <PageBody>
                <Navigation>
                    <NavigationSidebar isExpanded={isOpen}>
                        <Flex
                            direction={"column"}
                            justifyContent={"space-between"}
                            px={2}
                            height={"100%"}
                        >
                            <RouteList>
                                <Route isExpanded={isOpen} icon={<HomeSimple />} title={"Dashboard"} to={"dashboard"} />
                                <Route isExpanded={isOpen} icon={<MultiplePagesEmpty />} title={"My Projects"} to={"projects"} />
                                <Route isExpanded={isOpen} icon={<Globe />} title={"Community"} to={"hub"} />
                            </RouteList>
                            <RouteList>
                                <Route isExpanded={isOpen} icon={<BellNotification />} title={"Notifications"} to={"notifications"} />
                                <Route isExpanded={isOpen} icon={<Settings />} title={"Settings"} to={"settings"} />
                                <Route isExpanded={isOpen} icon={<HelpCircle />} title={"Help & Feedback"} to={"help"} />
                            </RouteList>
                        </Flex>
                        <Box py={4}>
                            <Divider my={4} background={"gray.200"} />
                            <AccountMenu expanded={isOpen} />
                        </Box>
                    </NavigationSidebar>
                    <NavigationContent>
                        <Outlet />
                    </NavigationContent>
                </Navigation>
            </PageBody>
        </Page>
    )
}