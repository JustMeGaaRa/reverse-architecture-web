import { Flex } from "@chakra-ui/react";
import { DeploymentNode as DeploymentNodeType, foldStyles } from "@structurizr/dsl";
import { FC, useMemo } from "react";
import { useWorkspace } from "../../hooks";
import { ReverseArchitectureElementStyle } from "../../types";
import { DeploymentNodeLabel } from "./DeploymentNodeLabel";

export const DeploymentNode: FC<{
    element: DeploymentNodeType;
    width?: number;
    height?: number;
    isSelected?: boolean,
}> = ({
    element,
    width,
    height,
}) => {
    const { workspace } = useWorkspace();
    
    const elementStyle = useMemo(() => foldStyles(
        ReverseArchitectureElementStyle,
        workspace.views.configuration.styles.elements,
        element.tags
    ), [element.tags, workspace.views.configuration.styles.elements]);
    
    return (
        <Flex
            backgroundColor={"transparent"}
            backdropFilter={"auto"}
            backdropBlur={"16px"}
            borderWidth={elementStyle.strokeWidth}
            borderColor={elementStyle.stroke}
            cursor={"pointer"}
            align={"end"}
            justify={"start"}
            padding={2}
            width={width}
            height={height}
            textColor={elementStyle.color}
            _hover={{
                borderColor: elementStyle.stroke,
            }}
        >
            <DeploymentNodeLabel
                element={element}
                style={elementStyle}
            />
        </Flex>
    );
}