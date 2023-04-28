import { Flex } from "@chakra-ui/react";
import { ElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";

export type DefaultBoxProps = {
    style: ElementStyleProperties;
    selected?: boolean,
}

export const DefaultBox: FC<PropsWithChildren<DefaultBoxProps>> = ({
    children,
    style,
    selected
}) => {
    return (
        <Flex
            background={style.background}
            borderWidth={style.strokeWidth}
            borderColor={style.stroke}
            align={"center"}
            justify={"center"}
            padding={2}
            height={style.height}
            width={style.width}
            textColor={"whiteAlpha.900"}
        >
            {children}
        </Flex>
    );
}