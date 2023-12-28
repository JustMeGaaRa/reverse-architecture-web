import { IconButton } from "@chakra-ui/react";
import { Plus } from "iconoir-react";
import { FC } from "react";
import { useZoom } from "../hooks";

export const ZoomInButton: FC = () => {
    const { zoomIn } = useZoom();

    return (
        <IconButton
            aria-label={"zoom in"}
            title={"zoom in"}
            icon={<Plus />}
            onClick={() => zoomIn()}
        />
    )
}