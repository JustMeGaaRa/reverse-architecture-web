import { FC } from "react";
import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { Outlet } from "react-router";
import { ContextSheet } from "../../../components/ContextSheet";
import { RouteList } from "../../../components/RouteList";
import { Route } from "../../../components/Route";
import { ProfileCircle } from "iconoir-react";

export const Settings: FC<{

}> = () => {
    return (
        <ContextSheet>
            <Flex
                direction={"row"}
                height={"100%"}
            >
                <Box
                    padding={4}
                    height={"100%"}
                    width={"400px"}
                >
                    <Heading as={"h5"}>Settings</Heading>
                    <Divider  my={8} />
                    <RouteList>
                        <Route
                            isExpanded
                            icon={<ProfileCircle />}
                            title={"Personal Profile"}
                            to={"profile"}
                        />
                        <Route
                            isExpanded
                            icon={<ProfileCircle />}
                            title={"Option 2"}
                            to={"option-2"}
                        />
                        <Route
                            isExpanded
                            icon={<ProfileCircle />}
                            title={"Option 2"}
                            to={"option-2"}
                        />
                    </RouteList>
                </Box>
                <Outlet />
            </Flex>
        </ContextSheet>
    );
};