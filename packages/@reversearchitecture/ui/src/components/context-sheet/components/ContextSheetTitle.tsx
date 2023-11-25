import { HStack, Icon, Text } from "@chakra-ui/react";
import { FC } from "react";

export const ContextSheetTitle: FC<{ icon?: any; title: string }> = ({ icon, title }) => {
    return (
        <HStack>
            {icon && (<Icon as={icon} boxSize={8} />)}
            <Text as={"h6"} noOfLines={1} textStyle={"h6"}>
                {title}
            </Text>
        </HStack>
    )
}