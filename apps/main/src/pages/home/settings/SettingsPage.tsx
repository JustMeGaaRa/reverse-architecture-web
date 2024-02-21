import { Box, Divider, Flex } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle,
    Route,
    RouteList,
    RouteSection,
    usePageHeader
} from "@reversearchitecture/ui";
import { ProfileCircle } from "iconoir-react";
import { FC, useEffect } from "react";
import { Outlet } from "react-router";
import { HomePageResetActionsWrapper } from "../../home";

export const SettingsPage: FC = () => {
    const { setHeaderContent } = usePageHeader();

    useEffect(() => {
        setHeaderContent({
            right: (<></>)
        })
    }, [setHeaderContent]);

    return (
        <HomePageResetActionsWrapper>
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
                        </ContextSheetBody>
                    </Box>
                    
                    <Outlet />
                </Flex>
            </ContextSheet>
        </HomePageResetActionsWrapper>
    );
};