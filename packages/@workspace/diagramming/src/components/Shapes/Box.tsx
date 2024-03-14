import { Flex } from "@chakra-ui/react";
import { IElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { HexColor } from "../../utils";

export type DefaultBoxProps = {
    style: IElementStyleProperties;
    selected?: boolean,
}

export const DefaultBox: FC<PropsWithChildren<DefaultBoxProps>> = ({
    children,
    style,
    selected
}) => {
    return (
        <Flex
            backgroundColor={HexColor.withAlpha(style.background, 0.1)}
            backdropFilter={"auto"}
            backdropBlur={"8px"}
            borderColor={HexColor.withAlpha(style.stroke, selected ? 0.7 : 0.4)}
            borderWidth={style.strokeWidth}
            cursor={"pointer"}
            align={"center"}
            justify={"center"}
            padding={2}
            height={style.height}
            width={style.width}
        >
            {children}
        </Flex>
    );
}