import { HStack, Kbd } from "@chakra-ui/react";
import { FC } from "react";

export const Shortcut: FC<{
    keys: string[],
    separator?: string
}> = ({
    keys,
    separator = "+"
}) => {
    return (
        <HStack divider={<>{separator}</>}>
            {keys.map((key) => (
                <Kbd
                    key={key}
                    backgroundColor={"whiteAlpha.200"}
                    borderRadius={"12px"}
                    borderWidth={0}
                    fontSize={"16px"}
                    fontWeight={"normal"}
                    height={"32px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    {key}
                </Kbd>
            ))}
        </HStack>
    )
}