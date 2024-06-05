import { Flex } from "@chakra-ui/react";
import { IElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";

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
            backgroundColor={style.background}
            backdropFilter={"auto"}
            backdropBlur={"8px"}
            borderColor={style.stroke}
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