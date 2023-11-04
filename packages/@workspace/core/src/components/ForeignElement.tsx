import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { useViewportUtils } from "../hooks";

export const ForeignElement: FC<PropsWithChildren<{
    position: { x: number; y: number; }
}>> = ({
    children,
    position
}) => {
    const { getRenderingPoint } = useViewportUtils();
    const renderingPoint = getRenderingPoint(position);

    return (
        <Box
            position={"absolute"}
            top={`${renderingPoint?.y ?? 0}px`}
            left={`${renderingPoint?.x ?? 0}px`}
        >
            {children}
        </Box>
    )
}