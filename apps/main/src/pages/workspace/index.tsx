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
    AddKeyframes,
    AddUser,
    ChatLines,
    Code,
    HelpCircle,
    Timer
} from "iconoir-react";
import { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router";
import { WorkspaceMenu } from "../../containers";

export const Workspace: FC<PropsWithChildren<{

}>> = ({

}) => {
    const title = "Big Bank plc.";
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
                    <Divider
                        borderWidth={1}
                        color={"gray.200"}
                        height={"32px"}
                        orientation={"vertical"}
                    />
                    <WorkspaceMenu title={title} />
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