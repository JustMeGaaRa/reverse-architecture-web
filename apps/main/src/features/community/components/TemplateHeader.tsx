import { Box, Button, Heading, Highlight, Text } from "@chakra-ui/react";
import { ArrowTrCircle } from "iconoir-react";
import { FC } from "react";
import { InformationHeader, WorkspaceInfo } from "../..";

export const TemplateHeader: FC<{
    information: WorkspaceInfo;
    onTryItOutClick?: () => void;
}> = ({
    information,
    onTryItOutClick
}) => {
    return (
        <Box paddingY={4} width={"100%"}>
            <InformationHeader
                title={(
                    <Text color={"whiteAlpha.700"} fontSize={"12px"}>
                        <Highlight query={"Research & Design"} styles={{ color: "yellow.900" }}>
                            {"Community -> Research & Design"}
                        </Highlight>
                    </Text>
                )}
                subtitle={(
                    <Heading
                        as={"h6"}
                        fontSize={"20px"}
                    >
                        {information?.name}
                    </Heading>
                )}
                action={(
                    <Button
                        colorScheme={"yellow"}
                        leftIcon={<ArrowTrCircle />}
                        padding={2}
                        size={"sm"}
                        title={"try it out"}
                        onClick={onTryItOutClick}
                    >
                        Try it out
                    </Button>
                )}
            />
        </Box>
    )
}