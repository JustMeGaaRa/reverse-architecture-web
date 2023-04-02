import { ComponentStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const Button: ComponentStyleConfig = {
    baseStyle: (props) => ({
        rounded: "8px"
    }),
    sizes: {
    },
    variants: {
        ghost: (props) => ({
            bg: "transparent",
            _hover: {
                background: mode("", "brand.hover")(props),
                color: mode("", "brand.color")(props)
            },
            _active: {
                background: mode("", "transparent")(props),
                color: mode("", "brand.color")(props)
            }
        })
    },
    defaultProps: {
        size: "md",
        variant: "ghost",
    }
};