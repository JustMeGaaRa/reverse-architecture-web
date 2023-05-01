import { Box, Divider, Flex } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader,
    Route,
    RouteList,
    RouteSection
} from "@reversearchitecture/ui";
import { ProfileCircle } from "iconoir-react";
import { FC } from "react";
import { Outlet } from "react-router";

export const Settings: FC<{

}> = () => {
    return (
        <ContextSheet>
            <Flex
                direction={"row"}
                height={"100%"}
            >
                <Box
                    height={"100%"}
                    width={"400px"}
                >
                    <ContextSheetHeader title={"Settings"} />
                    <Divider />
                    <ContextSheetContent padding={2}>
                        <RouteSection title={"Section 1"}>
                            <RouteList size={"md"}>
                                <Route
                                    isExpanded
                                    icon={ProfileCircle}
                                    title={"Personal Profile"}
                                    to={"profile"}
                                />
                                <Route
                                    isExpanded
                                    icon={ProfileCircle}
                                    title={"Text"}
                                    to={"text"}
                                />
                                <Route
                                    isExpanded
                                    icon={ProfileCircle}
                                    title={"Text"}
                                    to={"text"}
                                />
                            </RouteList>
                        </RouteSection>
                        <RouteSection title={"Section 2"}>
                            <RouteList size={"md"}>
                                <Route
                                    isExpanded
                                    icon={ProfileCircle}
                                    title={"Text"}
                                    to={"text"}
                                />
                                <Route
                                    isExpanded
                                    icon={ProfileCircle}
                                    title={"Text"}
                                    to={"text"}
                                />
                            </RouteList>
                        </RouteSection>
                    </ContextSheetContent>
                </Box>
                <Outlet />
            </Flex>
        </ContextSheet>
    );
};