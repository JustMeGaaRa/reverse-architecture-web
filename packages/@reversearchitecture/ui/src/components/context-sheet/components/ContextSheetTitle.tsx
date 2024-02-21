import { HStack, Icon, Skeleton, Text } from "@chakra-ui/react";
import { FC } from "react";

export const ContextSheetTitle: FC<{
    isLoading?: boolean;
    icon?: any;
    title: string
}> = ({
    isLoading,
    icon,
    title
}) => {
    return (
        <HStack padding={2}>
            {icon && (<Icon as={icon} boxSize={8} />)}
            <Skeleton isLoaded={!isLoading} borderRadius={"md"}>
                <Text as={"h6"} noOfLines={1} textStyle={"h6"}>
                    {title}
                </Text>
            </Skeleton>
        </HStack>
    )
}