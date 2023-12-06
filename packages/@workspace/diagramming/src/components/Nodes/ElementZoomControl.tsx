import { Button, Flex, Icon } from "@chakra-ui/react";
import { ZoomIn } from "iconoir-react";
import { FC } from "react";

export const ElementZoomControl: FC<{
    isVisible?: boolean;
    onZoomClick?: () => void;
}> = ({
    isVisible,
    onZoomClick
}) => {
    return (
        <Flex
            aria-label={"element zoom control"}
            aria-selected={isVisible}
            backgroundColor={"gray.900"}
            borderRadius={8}
            position={"absolute"}
            left={-6}
            top={2}
            visibility={"hidden"}
            height={"24px"}
            zIndex={-1}
            transitionProperty={"visibility"}
            transitionDelay={isVisible ? "unset" : "0.5s"}
            _selected={{ visibility: "visible" }}
            _hover={{
                backgroundColor: "white",
                visibility: "visible"
            }}
            _groupHover={{ visibility: "visible" }}
        >
            <Button
                aria-label={"zoom into element"}
                leftIcon={<Icon as={ZoomIn} color={"gray.100"} boxSize={4} />}
                size={"xs"}
                variant={"tonal"}
                onClick={onZoomClick}
            >
                Zoom In
            </Button>
        </Flex>
    )
}