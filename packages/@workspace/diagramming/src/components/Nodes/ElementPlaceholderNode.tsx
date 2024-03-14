import { Box } from "@chakra-ui/react";
import { IElement, IElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { ElementLabel } from "./ElementLabel";
import { ElementShapeSelector } from "./ElementShapeSelector";

export const ElementPlaceholderNode: FC<PropsWithChildren<{
    element: IElement;
    style: IElementStyleProperties;
    height?: number;
    width?: number;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}>> = ({
    children,
    element,
    style,
    onMouseEnter,
    onMouseLeave
}) => {
    return (
        <ElementShapeSelector style={style}>
            {/* <ElementFlowShortcut shortcutKeys={"Ctrl + ↑"} /> */}
            <ElementLabel
                element={element}
                style={style}
                showDescription
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
            {children}
        </ElementShapeSelector>
    )
}

export const ElementFlowShortcut: FC<{
    shortcutKeys: string;
}> = ({
    shortcutKeys,
}) => {
    return (
        <Box
            borderColor={"gray.400"}
            borderRadius={8}
            borderWidth={1}
            paddingX={2}
        >
            {shortcutKeys}
        </Box>
    )
}