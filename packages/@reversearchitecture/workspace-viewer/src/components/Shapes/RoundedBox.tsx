import { Flex } from "@chakra-ui/react";
import { ElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";

export type RoundedBoxProps = {
    style: ElementStyleProperties;
    selected?: boolean,
}

export const RoundedBox: FC<PropsWithChildren<RoundedBoxProps>> = ({
    children,
    style,
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
            height={style.height}
            width={style.width}
            textColor={"whiteAlpha.900"}
        >
            {children}
        </Flex>
    );
}