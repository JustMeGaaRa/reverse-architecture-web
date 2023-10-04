import { ComponentStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const Button: ComponentStyleConfig = {
    baseStyle: {
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
            backgroundColor: mode("", "transparent")(props),
            color: mode("", `${props.colorScheme}.800`)(props),
            _hover: {
                backgroundColor: mode("", `${props.colorScheme}.200`)(props),
                color: mode("", `${props.colorScheme}.900`)(props),
            },
            _focus: {
                backgroundColor: mode("", `${props.colorScheme}.200`)(props),
                borderWidth: 0,
                borderColor: mode("", `${props.colorScheme}.900`)(props),
                color: mode("", `${props.colorScheme}.900`)(props),
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
                color: mode("", `${props.colorScheme}.400`)(props),
            }
        }),
        outline: (props) => ({
            backgroundColor: mode("", `${props.colorScheme}.100`)(props),
            borderColor: mode("", `${props.colorScheme}.800`)(props),
            borderWidth: 1,
            color: mode("", `${props.colorScheme}.800`)(props),
            _hover: {
                backgroundColor: mode("", `${props.colorScheme}.200`)(props),
                borderColor: mode("", `${props.colorScheme}.900`)(props),
                borderWidth: 1,
                color: mode("", `${props.colorScheme}.900`)(props),
            },
            _focus: {
                backgroundColor: mode("", `${props.colorScheme}.200`)(props),
                borderColor: mode("", `${props.colorScheme}.900`)(props),
                borderWidth: 1,
                boxShadow: mode("", "0 0 0 5px yellow.200")(props),
                color: mode("", `${props.colorScheme}.900`)(props),
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
        }),
        menuitem: (props) => ({
            color: mode("", "gray.800")(props),
            _hover: {
                backgroundColor: mode("", "whiteAlpha.100")(props),
                color: mode("", "basic.white")(props),
            },
            _focus: {
                backgroundColor: mode("", "whiteAlpha.200")(props),
                color: mode("", `${props.colorScheme}.900`)(props),
            },
            _active: {
                backgroundColor: mode("", "whiteAlpha.100")(props),
                color: mode("", `${props.colorScheme}.900`)(props),
            },
            _activeLink: {
                backgroundColor: mode("", "whiteAlpha.100")(props),
                color: mode("", `${props.colorScheme}.900`)(props),
            },
            _disabled: {
                color: mode("", "gray.200")(props),
            }
        }),
    },
    defaultProps: {
        colorScheme: "yellow",
        size: "md",
        variant: "outline",
    }
};