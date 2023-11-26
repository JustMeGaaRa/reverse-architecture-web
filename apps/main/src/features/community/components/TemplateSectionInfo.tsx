import { Text } from "@chakra-ui/react";
import { ContextSheetTitle } from "@reversearchitecture/ui";
import { FC } from "react";

export const TemplateSectionInfo: FC<{
    title: string;
    description: string;
}> = ({
    title,
    description,
}) => {
    return (
        <>
            <ContextSheetTitle title={title} />
            <Text color={"gray.900"} textStyle={"b3"}>
                {description}
            </Text>
        </>
    );
}