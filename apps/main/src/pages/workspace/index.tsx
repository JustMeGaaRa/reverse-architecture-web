import { Avatar, AvatarGroup, Box, Flex, HStack, IconButton } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { Logo } from "../../components/Logo";
import { Page } from "../../components/Page";
import { PageHeader } from "../../components/PageHeader";
import { PageBody } from "../../components/PageBody";
import { Navigation } from "../../components/Navigation";
import { NavigationBackButton } from "../../components/NavigationBackButton";
import { NavigationSidebar } from "../../components/NavigationSidebar";
import { NavigationContent } from "../../components/NavigationContent";
import { AddKeyframes, AddUser, ChatLines, Code, HelpCircle, Timer } from "iconoir-react";
import { Outlet } from "react-router";
import { RouteList } from "../../components/RouteList";
import { Route } from "../../components/Route";
import { NavigationHomeButton } from "../../components/NavigationHomeButton";

export const Workspace: FC<PropsWithChildren<{

}>> = ({

}) => {
    const users = [
        { name: "Joseph Joestar", },
        { name: "Erina Pendleton", },
        { name: "Robert Speedwagon", },
        { name: "Will Zeppeli", },
    ]

    return (
        <Page>
            <PageHeader>
                <HStack gap={2}>
                    <NavigationHomeButton />
                    <Logo />
                </HStack>
                <HStack gap={2}>
                    <AvatarGroup max={3} colorScheme={"purple"}>
                        {users.map(user => (
                            <Avatar
                                key={user.name}
                                name={user.name}
                                cursor={"pointer"}
                                title={user.name}
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
                                    icon={<AddKeyframes />}
                                    title={"add frames"}
                                    to={"add"}
                                />
                                <Route
                                    icon={<Code />}
                                    title={"code editor"}
                                    to={"editor"}
                                />
                                <Route
                                    icon={<Timer />}
                                    title={"timer"}
                                    to={"timer"}
                                />
                                <Route
                                    icon={<ChatLines />}
                                    title={"comments"}
                                    to={"comments"}
                                />
                            </RouteList>
                            <RouteList>
                                <Route
                                    icon={<HelpCircle />}
                                    title={"help"}
                                    to={"help"}
                                />
                            </RouteList>
                        </Flex>
                    </NavigationSidebar>
                    <NavigationContent>
                        <Outlet />
                    </NavigationContent>
                </Navigation>
            </PageBody>
        </Page>
    )
}