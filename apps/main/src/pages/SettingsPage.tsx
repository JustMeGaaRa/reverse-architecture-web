import { Box, Divider, Flex } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle,
    Route,
    RouteList,
    RouteSection
} from "@reversearchitecture/ui";
import { ProfileCircle } from "iconoir-react";
import { FC } from "react";
import { Outlet } from "react-router";

export const SettingsPage: FC = () => {
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
                    <ContextSheetHeader>
                        <ContextSheetTitle title={"Settings"} />
                    </ContextSheetHeader>

                    <Divider />

                    <ContextSheetBody>
                        <Box padding={2} height={"100%"}>
                            <RouteSection title={"Section 1"}>
                                <RouteList>
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
                                <RouteList>
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
                        </Box>
                    </ContextSheetBody>
                </Box>
                
                <Outlet />
            </Flex>
        </ContextSheet>
    );
};