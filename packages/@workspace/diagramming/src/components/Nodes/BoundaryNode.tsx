import { Box, Flex } from "@chakra-ui/react";
import { IElement, ElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { BoundaryLabel } from "./BoundaryLabel";

export const BoundaryNode: FC<PropsWithChildren<{
    data: IElement;
    style: ElementStyleProperties;
    width?: number;
    height?: number;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}>> = ({
    children,
    data,
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
                backgroundColor={"gray.100"}
                borderStyle={"dashed"}
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
                <BoundaryLabel data={data} style={style} />
                {children}
            </Flex>
        </Box>
    );
}