import { Flex } from "@chakra-ui/react";
import { ElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { HexColor } from "../../utils";

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
            backgroundColor={HexColor.withAlpha(style.background, 0.1)}
            backdropFilter={"auto"}
            backdropBlur={"16px"}
            borderColor={HexColor.withAlpha(style.stroke, selected ? 0.7 : 0.4)}
            borderRadius={"2xl"}
            borderWidth={style.strokeWidth}
            cursor={"pointer"}
            align={"center"}
            justify={"center"}
            padding={2}
            height={style.height}
            width={style.width}
            _hover={{
                borderColor: HexColor.withAlpha(style.stroke, 0.7),
            }}
        >
            {children}
        </Flex>
    );
}