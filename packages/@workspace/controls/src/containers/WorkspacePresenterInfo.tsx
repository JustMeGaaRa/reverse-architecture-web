import { Avatar, Box, Text } from "@chakra-ui/react";
import { Toolbar, ToolbarSection } from "@restruct/ui";
import { WorkspacePanel } from "@workspace/core";
import { usePresentationMode } from "@workspace/live";
import { FC } from "react";

export const WorkspacePresenterInfo: FC<{ isVisible?: boolean }> = ({ isVisible = false }) => {
    const { presenterInfo } = usePresentationMode();
    
    return isVisible && presenterInfo != null && presenterInfo !== undefined && (
        <WorkspacePanel position={"bottom-left"}>
            <Toolbar>
                <ToolbarSection>
                    <Avatar
                        colorScheme={presenterInfo.color}
                        name={presenterInfo.fullname}
                        size={"md"}
                        title={presenterInfo.fullname}
                    />
                    <Box paddingLeft={2} paddingRight={4} maxWidth={"300px"}>
                        <Text color={`${presenterInfo.color}.600`} noOfLines={1}>
                            {`${presenterInfo.fullname} is presenting`}
                        </Text>
                    </Box>
                </ToolbarSection>
            </Toolbar>
        </WorkspacePanel>
    )
}