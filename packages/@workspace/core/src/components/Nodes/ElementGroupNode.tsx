import { Box, Flex } from "@chakra-ui/react";
import { foldStyles, IElement } from "@structurizr/dsl";
import { FC, PropsWithChildren, useMemo } from "react";
import { useWorkspace } from "../../hooks";
import { ReverseArchitectureElementStyle } from "../../types";
import { ElementProvider } from "../WorkspaceProvider";
import { BoundaryLabel } from "./BoundaryLabel";

export const ElementGroupNode: FC<PropsWithChildren<{
    element: IElement;
    width?: number;
    height?: number;
    isReadonly?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}>> = ({
    children,
    element,
    width,
    height,
    isReadonly,
    onMouseEnter,
    onMouseLeave
}) => {
    const { workspace } = useWorkspace();
    
    const elementStyle = useMemo(() => foldStyles(
        ReverseArchitectureElementStyle,
        workspace.views.configuration.styles.elements,
        element.tags
    ), [element.tags, workspace.views.configuration.styles.elements]);
    
    return (
        <ElementProvider isReadonly={isReadonly}>
            <Box
                aria-label={"boundary outline"}
                borderColor={"transparent"}
                borderRadius={"33px"}
                borderWidth={1}
                position={"relative"}
            >
                <Flex
                    borderColor={"gray.400"}
                    borderWidth={2}
                    borderRadius={32}
                    align={"end"}
                    justify={"start"}
                    padding={4}
                    width={width}
                    height={height}
                    textColor={elementStyle.color}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    <BoundaryLabel
                        element={element}
                        style={elementStyle}
                    />
                    {children}
                </Flex>
            </Box>
        </ElementProvider>
    )
}