import { Box } from "@chakra-ui/react";
import { IElement, ElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { ElementShapeSelector } from "./ElementShapeSelector";

export const ElementPlaceholderNode: FC<PropsWithChildren<{
    data: IElement;
    style: ElementStyleProperties;
    height?: number;
    width?: number;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}>> = ({
    children,
    data,
    style,
    onMouseEnter,
    onMouseLeave
}) => {
    return (
        <ElementShapeSelector style={style}>
            <ElementFlowShortcut shortcutKeys={""} />
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