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
                <Kbd key={key}>{key}</Kbd>
            ))}
        </HStack>
    )
}