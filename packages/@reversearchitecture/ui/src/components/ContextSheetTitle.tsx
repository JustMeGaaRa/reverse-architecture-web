import { Heading } from "@chakra-ui/react";
import { FC } from "react";

export const ContextSheetTitle: FC<{ title: string }> = ({ title }) => {
    return (
        <Heading
            as={"h5"}
            fontSize={24}
            fontWeight={"normal"}
            noOfLines={1}
        >
            {title}
        </Heading>
    )
}