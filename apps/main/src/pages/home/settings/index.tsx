import { FC } from "react";
import { Box, Divider, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router";
import { ContextSheet } from "../../../components/ContextSheet";
import { RouteList } from "../../../components/RouteList";
import { Route } from "../../../components/Route";
import { ProfileCircle } from "iconoir-react";
import { RouteSection } from "../../../components/RouteSection";
import { ContextSheetHeader } from "../../../components/ContextSheetHeader";
import { ContextSheetContent } from "../../../components/ContextSheetContent";

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
                            <RouteList size={"sm"}>
                                <Route
                                    isExpanded
                                    icon={<ProfileCircle />}
                                    title={"Personal Profile"}
                                    to={"profile"}
                                />
                                <Route
                                    isExpanded
                                    icon={<ProfileCircle />}
                                    title={"Text"}
                                    to={"text"}
                                />
                                <Route
                                    isExpanded
                                    icon={<ProfileCircle />}
                                    title={"Text"}
                                    to={"text"}
                                />
                            </RouteList>
                        </RouteSection>
                        <RouteSection title={"Section 2"}>
                            <RouteList size={"sm"}>
                                <Route
                                    isExpanded
                                    icon={<ProfileCircle />}
                                    title={"Text"}
                                    to={"text"}
                                />
                                <Route
                                    isExpanded
                                    icon={<ProfileCircle />}
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