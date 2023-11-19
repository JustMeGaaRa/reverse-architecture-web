import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

export const Divider = defineStyleConfig({
    sizes: {
        md: defineStyle({
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: 10,
            borderColor: "gray.400"
        })
    },
})