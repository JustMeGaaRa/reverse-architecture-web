import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { ContextLevelProvider, useContextLevel } from "../../../components";

export const Page: FC<PropsWithChildren> = ({ children }) => {
    const { level, getLevelColor } = useContextLevel();
    
    return (
        <Flex
            backgroundColor={getLevelColor(level)}
            direction={"row"}
            height={"100vh"}
            width={"100vw"}
            overflow={"hidden"}
            margin={0}
            padding={0}
        >
            <ContextLevelProvider level={level + 1}>
                {children}
            </ContextLevelProvider>
        </Flex>
    )
}