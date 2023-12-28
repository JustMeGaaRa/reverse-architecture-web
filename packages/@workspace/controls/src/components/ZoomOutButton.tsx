import { FC } from "react";
import { Minus } from "iconoir-react";
import { IconButton } from "@chakra-ui/react";
import { useZoom } from "../hooks";

export const ZoomOutButton: FC = () => {
    const { zoomOut } = useZoom();

    return (
        <IconButton
            aria-label={"zoom out"}
            icon={<Minus height={"24px"} width={"24px"} />}
            title={"zoom out"}
            onClick={() => zoomOut()}
        />
    )
}