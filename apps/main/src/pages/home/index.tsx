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
    Logo,
    Navigation,
    NavigationContent,
    NavigationSidebarToggle,
    NavigationSidebar,
    Page,
    PageBody,
    PageHeader,
    Route,
    RouteList,
    Search
} from "@reversearchitecture/ui";
import {
    AddPageAlt,
    BellNotification,
    HelpCircle,
    HomeSimple,
    Internet,
    MultiplePagesEmpty,
    Settings,
    Upload
} from "iconoir-react";
import { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router";
import { AccountMenu } from "../../containers";

export const Layout: FC<PropsWithChildren<{

}>> = ({
    
}) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Page>
            <PageHeader>
                <HStack gap={2}>
                    <NavigationSidebarToggle isExpanded={isOpen} onClick={onToggle} />
                    <Logo />
                </HStack>
                <Box>
                    <Search />
                </Box>
                <Box>
                    <ButtonGroup size={"lg"} variant={"outline"}>
                        <Button
                            aria-label={"create new file"}
                            colorScheme={"yellow"}
                            leftIcon={<AddPageAlt />}
                        >
                            Create new file
                        </Button>
                        <IconButton
                            aria-label={"import file"}
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
                                <Route
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
                                    to={"hub"}
                                />
                            </RouteList>
                            <RouteList>
                                <Route
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
                                    isExpanded={isOpen}
                                    icon={HelpCircle}
                                    title={"Help & Feedback"}
                                    to={"help"}
                                />
                            </RouteList>
                        </Flex>
                        <Box py={4}>
                            <Divider mb={2} background={"gray.200"} />
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