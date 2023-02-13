import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { ElementStyleProperties } from "../../../../dsl";

export type RoundedBoxProps = {
    style: ElementStyleProperties;
    width?: number;
    height?: number;
    selected?: boolean,
}

export const RoundedBox: FC<PropsWithChildren<RoundedBoxProps>> = ({
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
            borderRadius={"2xl"}
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