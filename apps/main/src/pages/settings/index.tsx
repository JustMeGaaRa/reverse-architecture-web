import { FC } from "react";
import { Box, Button, ButtonGroup, Divider, Flex, Heading } from "@chakra-ui/react";
import { Outlet } from "react-router";
import { ContextSheet } from "../../components/ContextSheet";
import { NavLink } from "react-router-dom";

export const Settings: FC<{

}> = () => {
    return (
        <ContextSheet>
            <Flex
                direction={"row"}
                height={"100%"}
            >
                <Box
                    padding={"24px"}
                    height={"100%"}
                >
                    <Heading as={"h1"}>Settings</Heading>
                    <Divider  my={8} />
                    <ButtonGroup
                        orientation={"vertical"}
                        width={"250px"}
                    >
                        <Button as={NavLink} to={"profile"}>
                            Profile
                        </Button>
                        <Button as={NavLink} to={"theme"}>
                            Theme
                        </Button>
                    </ButtonGroup>
                </Box>
                <Outlet />
            </Flex>
        </ContextSheet>
    );
};