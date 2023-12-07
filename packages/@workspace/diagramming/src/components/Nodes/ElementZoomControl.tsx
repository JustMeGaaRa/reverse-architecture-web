import { Button, ButtonGroup, Flex, Icon } from "@chakra-ui/react";
import { ZoomIn, ZoomOut } from "iconoir-react";
import { FC } from "react";

export const ElementZoomControl: FC<{
    isPanelVisible?: boolean;
    isZoomInVisible?: boolean;
    isZoomOutVisible?: boolean;
    onZoomInClick?: () => void;
    onZoomOutClick?: () => void;
}> = ({
    isPanelVisible,
    isZoomInVisible,
    isZoomOutVisible,
    onZoomInClick,
    onZoomOutClick
}) => {
    return (
        <Flex
            aria-label={"element zoom control"}
            aria-selected={isPanelVisible}
            backgroundColor={"gray.900"}
            borderRadius={8}
            position={"absolute"}
            left={-6}
            top={2}
            visibility={"hidden"}
            zIndex={-1}
            transitionProperty={"visibility"}
            transitionDelay={isPanelVisible ? "unset" : "0.5s"}
            _selected={{ visibility: "visible" }}
            _hover={{
                backgroundColor: "white",
                visibility: "visible"
            }}
            _groupHover={{ visibility: "visible" }}
        >
            <ButtonGroup
                alignItems={"start"}
                isAttached
                orientation={"vertical"}
                size={"xs"}
                variant={"tonal"}
            >
                {isZoomInVisible && (
                    <Button
                        aria-label={"zoom into element"}
                        leftIcon={<Icon as={ZoomIn} color={"gray.100"} boxSize={4} />}
                        onClick={onZoomInClick}
                    >
                        Zoom In
                    </Button>
                )}
                {isZoomOutVisible && (
                    <Button
                        aria-label={"zoom out from element"}
                        leftIcon={<Icon as={ZoomOut} color={"gray.100"} boxSize={4} />}
                        onClick={onZoomOutClick}
                    >
                        Zoom Out
                    </Button>
                )}
            </ButtonGroup>
        </Flex>
    )
}