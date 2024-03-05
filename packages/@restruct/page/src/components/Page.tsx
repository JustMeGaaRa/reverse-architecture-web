import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const Page: FC<PropsWithChildren<{
    backgroundColor?: string;
}>> = ({
    children,
    backgroundColor
}) => {
    console.log("page")
    
    return (
        <Flex
            className={"restruct__page"}
            backgroundColor={backgroundColor ?? "black"}
            direction={"column"}
            height={"100vh"}
            width={"100vw"}
            overflow={"hidden"}
            margin={0}
            padding={0}
        >
            {children}
        </Flex>
    )
}