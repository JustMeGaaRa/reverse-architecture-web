import { ButtonGroup, Icon, IconButton } from "@chakra-ui/react";
import { Collapse, Expand } from "iconoir-react";
import { FC } from "react";

export const ElementCollapseControl: FC<{
    isPanelVisible?: boolean;
    isCollapsed?: boolean;
    onCollapseClick?: () => void;
    onExpandClick?: () => void;
}> = ({
    isPanelVisible = true,
    isCollapsed = false,
    onCollapseClick,
    onExpandClick
}) => {
    return (
        <ButtonGroup
            aria-label={"workspace__element-collapse-control"}
            aria-selected={isPanelVisible}
            backgroundColor={"gray.900"}
            borderRadius={8}
            alignItems={"start"}
            isAttached
            orientation={"vertical"}
            left={-6}
            top={2}
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
            {!isCollapsed && (
                <IconButton
                    aria-label={"collapse element"}
                    icon={<Icon as={Collapse} color={"gray.100"} boxSize={4} />}
                    onClick={onCollapseClick}
                />
            )}
            {isCollapsed && (
                <IconButton
                    aria-label={"expand element"}
                    icon={<Icon as={Expand} color={"gray.100"} boxSize={4} />}
                    onClick={onExpandClick}
                />
            )}
        </ButtonGroup>
    )
}