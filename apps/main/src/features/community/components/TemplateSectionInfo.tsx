import { SkeletonText, Text } from "@chakra-ui/react";
import { ShellTitle } from "@restruct/ui";
import { FC } from "react";

export const TemplateSectionInfo: FC<{
    isLoading?: boolean;
    title: string;
    description: string;
}> = ({
    isLoading,
    title,
    description,
}) => {
    return (
        <>
            <ShellTitle isLoading={isLoading} title={title} />
            <SkeletonText
                isLoaded={!isLoading}
                borderRadius={"md"}
                noOfLines={5}
                padding={2}
            >
                <Text color={"gray.900"} textStyle={"b3"}>
                    {description}
                </Text>
            </SkeletonText>
        </>
    );
}