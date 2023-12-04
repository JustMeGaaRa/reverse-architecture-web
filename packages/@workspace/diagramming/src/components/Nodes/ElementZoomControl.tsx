import { Flex, Icon, IconButton } from "@chakra-ui/react";
import { ZoomIn } from "iconoir-react";
import { FC } from "react";

export const ElementZoomControl: FC<{
    isSelected?: boolean;
    isVisible?: boolean;
    onZoomClick?: () => void;
}> = ({
    isSelected,
    isVisible,
    onZoomClick
}) => {
    return (
        <Flex
            aria-label={"element zoom control"}
            aria-selected={isSelected || isVisible}
            backgroundColor={"gray.900"}
            borderRadius={8}
            position={"absolute"}
            left={-6}
            top={2}
            visibility={"hidden"}
            height={"24px"}
            width={"48px"}
            zIndex={-1}
            _selected={{ visibility: "visible" }}
            _groupHover={{ visibility: "visible" }}
        >
            <IconButton
                aria-label={"zoom into element"}
                icon={<Icon as={ZoomIn} boxSize={4} />}
                color={"gray.100"}
                size={"xs"}
                variant={"tonal"}
                onClick={onZoomClick}
            />
        </Flex>
    )
}