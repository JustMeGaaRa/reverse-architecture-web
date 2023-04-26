import { Flex } from "@chakra-ui/react";
import { ElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";

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