import { Box, Divider, Flex } from "@chakra-ui/react";
import {
    Shell,
    ShellBody,
    ShellHeader,
    ShellTitle,
} from "@restruct/ui";
import { ProfileCircle } from "iconoir-react";
import { FC } from "react";
import { Outlet } from "react-router";
import { Route, RouteList, RouteSection } from "../../../features";
import { HomeNavigationActions } from "../../home";

export const SettingsPage: FC = () => {
    return (
        <Shell>
            <HomeNavigationActions />
            <Flex direction={"row"} height={"100%"}>
                <Box height={"100%"} width={"400px"}>
                    <ShellHeader>
                        <ShellTitle title={"Settings"} />
                    </ShellHeader>

                    <Divider />

                    <ShellBody>
                        <Box padding={2} height={"100%"}>
                            <RouteSection title={"Account"}>
                                <RouteList size={"md"}>
                                    <Route
                                        isExpanded
                                        icon={<ProfileCircle />}
                                        title={"Personal Profile"}
                                        to={"profile"}
                                    />
                                </RouteList>
                            </RouteSection>
                        </Box>
                    </ShellBody>
                </Box>
                
                <Outlet />
            </Flex>
        </Shell>
    );
};