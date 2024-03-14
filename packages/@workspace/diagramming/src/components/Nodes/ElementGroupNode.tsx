import { Box, Flex } from "@chakra-ui/react";
import { IElement, IElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { BoundaryLabel } from "./BoundaryLabel";

export const ElementGroupNode: FC<PropsWithChildren<{
    element: IElement;
    style: IElementStyleProperties;
    width?: number;
    height?: number;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}>> = ({
    children,
    element,
    style,
    width,
    height,
    onMouseEnter,
    onMouseLeave
}) => {
    return (
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
                textColor={style.color}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <BoundaryLabel element={element} style={style} />
                {children}
            </Flex>
        </Box>
    )
}