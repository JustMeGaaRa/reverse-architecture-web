import { ComponentStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const Button: ComponentStyleConfig = {
    baseStyle: {
        colorScheme: "yellow",
        fontWeight: "normal",
    },
    sizes: {
        sm: {
            borderRadius: "12px",
            padding: "4px"
        },
        md: {
            borderRadius: "16px",
            padding: "8px"
        },
        lg: {
            borderRadius: "16px",
            padding: "12px"
        }
    },
    variants: {
        ghost: (props) => ({
            color: mode("", `${props.colorScheme}.primary`)(props),
            _hover: {
                backgroundColor: mode("", `${props.colorScheme}.200`)(props),
                color: mode("", `${props.colorScheme}.primary`)(props),
            },
            _focus: {
                backgroundColor: mode("", `${props.colorScheme}.200`)(props),
                borderWidth: 0,
                borderColor: mode("", `${props.colorScheme}.primary`)(props),
                color: mode("", `${props.colorScheme}.primary`)(props),
            },
            _active: {
                backgroundColor: mode("", `${props.colorScheme}.100`)(props),
                color: mode("", `${props.colorScheme}.800`)(props),
            },
            _activeLink: {
                backgroundColor: mode("", `${props.colorScheme}.100`)(props),
                color: mode("", `${props.colorScheme}.800`)(props),
            },
            _disabled: {
                backgroundColor: mode("", `${props.colorScheme}.100`)(props),
                color: mode("", `${props.colorScheme}.400`)(props),
            }
        }),
        outline: (props) => ({
            backgroundColor: mode("", `${props.colorScheme}.100`)(props),
            borderColor: mode("", `${props.colorScheme}.primary`)(props),
            borderWidth: 1,
            color: mode("", `${props.colorScheme}.primary`)(props),
            _hover: {
                backgroundColor: mode("", `${props.colorScheme}.200`)(props),
                borderColor: mode("", `${props.colorScheme}.primary`)(props),
                borderWidth: 1,
                color: mode("", `${props.colorScheme}.primary`)(props),
            },
            _focus: {
                backgroundColor: mode("", `${props.colorScheme}.200`)(props),
                borderColor: mode("", `${props.colorScheme}.primary`)(props),
                borderWidth: 1,
                boxShadow: mode("", "0 0 0 5px yellow.200")(props),
                color: mode("", `${props.colorScheme}.primary`)(props),
            },
            _active: {
                backgroundColor: mode("", `${props.colorScheme}.100`)(props),
                borderColor: mode("", `${props.colorScheme}.800`)(props),
                borderWidth: 1,
                color: mode("", `${props.colorScheme}.800`)(props),
            },
            _activeLink: {
                backgroundColor: mode("", `${props.colorScheme}.100`)(props),
                borderColor: mode("", `${props.colorScheme}.800`)(props),
                borderWidth: 1,
                color: mode("", `${props.colorScheme}.800`)(props),
            },
            _disabled: {
                backgroundColor: mode("", `${props.colorScheme}.100`)(props),
                borderColor: mode("", `${props.colorScheme}.200`)(props),
                borderWidth: 1,
                color: mode("", `${props.colorScheme}.400`)(props),
            }
        })
    },
    defaultProps: {
        colorScheme: "yellow",
        size: "md",
        variant: "outline",
    }
};