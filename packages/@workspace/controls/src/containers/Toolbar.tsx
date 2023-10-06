import { HStack, StackDivider } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const Toolbar: FC<PropsWithChildren<{
    size?: "xs" | "sm" | "md" | "lg";
}>> = ({
    children,
    size = "md"
}) => {
    const styles = {
        xs: {
            borderRadius: 8,
            padding: 0
        },
        sm: {
            borderRadius: 12,
            padding: 0
        },
        md: {
            borderRadius: 16,
            padding: 1
        },
        lg: {
            borderRadius: 24,
            padding: 2
        }
    }

    return (
        <HStack
            alignItems={"center"}
            divider={<StackDivider borderColor={"whiteAlpha.300"} />}
            justifyContent={"center"}
            backgroundColor={"whiteAlpha.100"}
            backdropFilter={"blur(16px)"}
            borderColor={"whiteAlpha.200"}
            borderWidth={1}
            {...styles[size]}
        >
            {children}
        </HStack>
    );
}