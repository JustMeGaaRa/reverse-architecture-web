import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { ElementStyleProperties } from "../../store/C4Diagram";

export type DefaultBoxProps = {
    style: ElementStyleProperties;
    width?: number;
    height?: number;
    selected?: boolean,
}

export const DefaultBox: FC<PropsWithChildren<DefaultBoxProps>> = ({
    children,
    style,
    width,
    height,
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
            width={width}
            height={height}
            textColor={"whiteAlpha.900"}
        >
            {children}
        </Flex>
    );
}