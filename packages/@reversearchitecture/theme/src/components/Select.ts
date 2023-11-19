import { selectAnatomy as parts } from "@chakra-ui/anatomy";
import { ComponentStyleConfig, createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const {
    definePartsStyle,
    defineMultiStyleConfig
} = createMultiStyleConfigHelpers(parts.keys);

export const Select: ComponentStyleConfig = {
    baseStyle: definePartsStyle((props) => ({
        field: {

        },
        icon: {

        }
    })),
    sizes: {
        sm: {

        },
        md: {

        },
    },
    variants: {
        filled: (props) => ({

        }),
        ghost: (props) => ({

        })
    },
    defaultProps: {
        colorScheme: "gray",
        size: "md",
        variant: "compact",
    }
}