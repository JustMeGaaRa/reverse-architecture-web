import { ButtonGroup, Icon, IconButton } from "@chakra-ui/react";
import { ZoomMinus, ZoomPlus } from "@restruct/icons";
import { FC } from "react";

export const ZoomButtonGroup: FC<{
    isPanelVisible?: boolean;
    isZoomInVisible?: boolean;
    isZoomOutVisible?: boolean;
    onZoomInClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onZoomOutClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({
    isPanelVisible = true,
    isZoomInVisible = true,
    isZoomOutVisible = true,
    onZoomInClick,
    onZoomOutClick
}) => {
    return (
        <ButtonGroup
            aria-label={"structurizr__zoom-button-group"}
            aria-selected={isPanelVisible}
            backgroundColor={"gray.900"}
            borderRadius={8}
            alignItems={"start"}
            isAttached
            orientation={"vertical"}
            left={-6}
            top={isZoomInVisible ? 2 : 6}
            position={"absolute"}
            pointerEvents={"all"}
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
                    color={"gray.100"}
                    icon={<ZoomPlus color={"gray.100"} boxSize={5} />}
                    title={"Zoom in"}
                    onClick={onZoomInClick}
                />
            )}
            {isZoomOutVisible && (
                <IconButton
                    aria-label={"zoom out from element"}
                    color={"gray.100"}
                    icon={<ZoomMinus color={"gray.100"} boxSize={5} />}
                    title={"Zoom out"}
                    onClick={onZoomOutClick}
                />
            )}
        </ButtonGroup>
    )
}