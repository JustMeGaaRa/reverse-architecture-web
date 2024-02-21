import { Avatar, Box, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Toolbar, ToolbarSection, UserInfo, WorkspacePanel } from "workspace";

export const PresenterInfoBar: FC<{
    presenter: UserInfo
}> = ({
    presenter
}) => {
    return presenter != null && presenter !== undefined && (
        <WorkspacePanel position={"bottom-left"}>
            <Toolbar>
                <ToolbarSection>
                    <Avatar
                        colorScheme={presenter.color}
                        name={presenter.fullname}
                        size={"md"}
                        title={presenter.fullname}
                    />
                    <Box paddingLeft={2} paddingRight={4} maxWidth={"300px"}>
                        <Text color={`${presenter.color}.600`} noOfLines={1}>
                            {`${presenter.fullname} is presenting`}
                        </Text>
                    </Box>
                </ToolbarSection>
            </Toolbar>
        </WorkspacePanel>
    )
}