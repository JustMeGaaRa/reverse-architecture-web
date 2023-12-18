import { ButtonGroup, Icon, IconButton } from "@chakra-ui/react";
import { ZoomIn, ZoomOut } from "iconoir-react";
import { FC } from "react";

export const ElementZoomControl: FC<{
    isPanelVisible?: boolean;
    isZoomInVisible?: boolean;
    isZoomOutVisible?: boolean;
    onZoomInClick?: () => void;
    onZoomOutClick?: () => void;
}> = ({
    isPanelVisible = true,
    isZoomInVisible = true,
    isZoomOutVisible = true,
    onZoomInClick,
    onZoomOutClick
}) => {
    return (
        <ButtonGroup
            aria-label={"workspace__element-zoom-control"}
            aria-selected={isPanelVisible}
            backgroundColor={"gray.900"}
            borderRadius={8}
            alignItems={"start"}
            isAttached
            orientation={"vertical"}
            left={-6}
            top={isZoomInVisible ? 2 : 6}
            position={"absolute"}
            size={"xs"}
            variant={"tonal"}
            visibility={"hidden"}
            transitionProperty={"visibility"}
            transitionDelay={isPanelVisible ? "unset" : "0.5s"}
            _selected={{ visibility: "visible" }}
            _hover={{
                backgroundColor: "white",
                visibility: "visible"
            }}
            _groupHover={{ visibility: "visible" }}
        >
            {isZoomInVisible && (
                <IconButton
                    aria-label={"zoom into element"}
                    icon={<Icon as={ZoomIn} color={"gray.100"} boxSize={4} />}
                    onClick={onZoomInClick}
                />
            )}
            {isZoomOutVisible && (
                <IconButton
                    aria-label={"zoom out from element"}
                    icon={<Icon as={ZoomOut} color={"gray.100"} boxSize={4} />}
                    onClick={onZoomOutClick}
                />
            )}
        </ButtonGroup>
    )
}