import { extendTheme, ComponentStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { Button } from "./components/Button";

const Box: ComponentStyleConfig = {
    baseStyle: (props) => ({
        rounded: "8px",
        _hover: {
            bg: mode("gray.100", "brand.background")(props),
            color: mode("gray.800", "brand.color")(props)
        },
        _active: {
            bg: mode("gray.100", "brand.background")(props),
            color: mode("gray.800", "brand.color")(props)
        }
    }),
    sizes: {
    },
    variants: {
    },
    defaultProps: {
        variant: "ghost"
    }
};

const colors = {

    brand: {
        background: "#3F4614",
        color: "#E5FF00"
    }
}

export const theme =  extendTheme({
    components: {
        Box,
        Button
    },
    colors,
    config: {
        initialColorMode: "system",
        useSystemColorMode: true
    }
});