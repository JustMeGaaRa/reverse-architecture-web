import { Box } from "@chakra-ui/react";
import { FC } from "react";

export const ElementSelectionBorder: FC<{
    borderRadius: number;
    colorScheme: string;
    height: number;
    width: number;
    isVisible?: boolean;
}> = ({
    borderRadius,
    colorScheme,
    height,
    width,
    isVisible
}) => {
    return isVisible && (
        <Box
            className={"workspace__element-selected"}
            borderColor={`${colorScheme}.600`}
            borderRadius={borderRadius}
            borderWidth={1}
            pointerEvents={"none"}
            position={"relative"}
            height={`${height}px`}
            width={`${width}px`}
        />
    )
}