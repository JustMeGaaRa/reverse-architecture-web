import { ComponentStyleConfig } from "@chakra-ui/react";
import { mode, getColorVar } from "@chakra-ui/theme-tools";

export const Button: ComponentStyleConfig = {
    baseStyle: {
        fontWeight: "normal",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 1.0,
    },
    sizes: {
        xs: {
            borderRadius: "8px",
            height: "24px",
            paddingX: "4px",
            fontSize: "14px"
            // iconSize: 16px
        },
        sm: {
            borderRadius: "12px",
            height: "32px",
            paddingX: "6px",
            fontSize: "14px"
            // iconSize: 20px
        },
        md: {
            borderRadius: "16px",
            height: "40px",
            paddingX: "10px",
            fontSize: "16px"
            // iconSize: 20px
        },
        lg: {
            borderRadius: "16px",
            height: "48px",
            paddingX: "12px",
            fontSize: "16px"
            // iconsSize: 24px
        }
    },
    variants: {
        ghost: (props) => ({
            backgroundColor: mode("", "transparent")(props),
            backdropFilter: "blur(32px)",
            color: mode("", "gray.900")(props),
            opacity: 1.0,

            _hover: {
                backgroundColor: mode("", "rgba(255, 255, 255, 0.10)")(props),
                color: mode("", "white")(props),
                opacity: 1.0,
            },
            _focus: {

            },
            _active: {
                backgroundColor: mode("", `rgba(255, 255, 255, 0.10)`)(props),
                boxShadow: mode("", "0px 2px 4px 0px rgba(0, 0, 0, 0.10)")(props),
                color: mode("", "#D0D1D1")(props),
                opacity: 1.0,
            },
            _activeLink: {
                backgroundColor: mode("", `rgba(255, 255, 255, 0.10)`)(props),
                boxShadow: mode("", "0px 2px 4px 0px rgba(0, 0, 0, 0.10)")(props),
                color: mode("", "#D0D1D1")(props),
                opacity: 1.0,
            },
            _disabled: {
                // white 10%
                backgroundColor: mode("", "rgba(255, 255, 255, 0.10)")(props),
                borderWidth: 0,
                color: mode("", "gray.400")(props),
                opacity: 1.0,

                _hover: {
                    backgroundColor: mode("", "rgba(255, 255, 255, 0.10)")(props),
                    borderWidth: 0,
                    color: mode("", "gray.400")(props),
                    opacity: 1.0,
                }
            }
        }),
        filled: (props) => ({
            backgroundColor: mode("", `${props.colorScheme}Alpha.50`)(props),
            borderWidth: 2,
            borderColor: mode("", `${props.colorScheme}Alpha.200`)(props), // `linear-gradient(${getColorVar(props.theme, `${props.colorScheme}Alpha.200`)}, transparent)`
            boxShadow: mode("", `0 -8px 12px 0 ${getColorVar(props.theme, `${props.colorScheme}Alpha.100`)} inset, 0 2px 4px 0 rgba(0, 0, 0, 0.10)`)(props),
            backdropFilter: "blur(64px)",
            color: mode("", `${props.colorScheme}.600`)(props),

            _hover: {
                backgroundColor: mode("", `${props.colorScheme}Alpha.100`)(props),
                borderColor: mode("", `${props.colorScheme}Alpha.200`)(props),
            },
            _focus: {

            },
            _active: {
                backgroundColor: mode("", `${props.colorScheme}Alpha.10`)(props),
                borderColor: mode("", `${props.colorScheme}Alpha.20`)(props), // `linear-gradient(rgba(226, 250, 81, 0.02), rgba(226, 250, 81 / 0.001))`
                color: mode("", `${props.colorScheme}.400`)(props),
            },
            _activeLink: {
                backgroundColor: mode("", `${props.colorScheme}Alpha.10`)(props),
                borderColor: mode("", `${props.colorScheme}Alpha.20`)(props), // `linear-gradient(rgba(226, 250, 81, 0.02), rgba(226, 250, 81 / 0.001))`
                color: mode("", `${props.colorScheme}.400`)(props),
            },
            _disabled: {
                backgroundColor: mode("", "rgba(255, 255, 255, 0.10)")(props),
                borderWidth: 0,
                color: mode("", "gray.400")(props),
                opacity: 1.0,

                _hover: {
                    backgroundColor: mode("", "rgba(255, 255, 255, 0.10)")(props),
                    borderWidth: 0,
                    color: mode("", "gray.400")(props),
                    opacity: 1.0,
                }
            }
        }),
        tonal: (props) => ({
            backgroundColor: mode("", "rgba(255, 255, 255, 0.10)")(props),
            boxShadow: mode("", "0px 2px 4px 0px rgba(0, 0, 0, 0.10)")(props),
            color: mode("", "gray.900")(props),
            opacity: 1.0,

            _hover: {
                backgroundColor: mode("", "rgba(255, 255, 255, 0.10)")(props),
                color: mode("", "white")(props),
                opacity: 1.0,
            },
            _focus: {
                backgroundColor: mode("", "")(props),
                color: mode("", "")(props),
                opacity: 1.0,
            },
            _active: {
                backgroundColor: mode("", "rgba(255, 255, 255, 0.05)")(props),
                boxShadow: mode("", "0px 2px 4px 0px rgba(0, 0, 0, 0.10)")(props),
                color: mode("", "gary.800")(props),
                opacity: 1.0,
            },
            _activeLink: {
                backgroundColor: mode("", "rgba(255, 255, 255, 0.05)")(props),
                boxShadow: mode("", "0px 2px 4px 0px rgba(0, 0, 0, 0.10)")(props),
                color: mode("", "gary.800")(props),
                opacity: 1.0,
            },
            _disabled: {
                backgroundColor: mode("", "rgba(255, 255, 255, 0.10)")(props),
                borderWidth: 0,
                color: mode("", "gray.400")(props),
                opacity: 1.0,

                _hover: {
                    backgroundColor: mode("", "rgba(255, 255, 255, 0.10)")(props),
                    borderWidth: 0,
                    color: mode("", "gray.400")(props),
                    opacity: 1.0,
                }
            }
        }),
        menuitem: (props) => ({
            // TODO: add support for light source
            color: mode("", "gray.900")(props),
            _hover: {
                backgroundColor: mode("", "#FFFFFF1A")(props),
                boxShadow: mode("", "0px 2px 4px 0px rgba(0, 0, 0, 0.10)")(props),
                color: mode("", "white")(props),
            },
            _pressed: {
                backgroundColor: mode("", "#FFFFFF0D")(props),
                color: mode("", `gray.500`)(props),
            },
            _focus: {

            },
            _active: {
                backgroundColor: mode("", "#FFFFFF1A")(props),
                color: mode("", `${props.colorScheme}.600`)(props),

                _hover: {
                    // NOTE: not supported by styles
                },
                _pressed: {
                    backgroundColor: mode("", "#FFFFFF0D")(props),
                    color: mode("", `${props.colorScheme}.500`)(props),
                }
            },
            _activeLink: {
                backgroundColor: mode("", "#FFFFFF1A")(props),
                color: mode("", `${props.colorScheme}.600`)(props),

                _hover: {
                    // NOTE: not supported by styles
                },
                _pressed: {
                    backgroundColor: mode("", "#FFFFFF0D")(props),
                    color: mode("", `${props.colorScheme}.500`)(props),
                }
            },
            _disabled: {
                color: mode("", "gray.400")(props),
                opacity: 1.0,

                _hover: {
                    color: mode("", "gray.400")(props),
                    opacity: 1.0,
                }
            }
        }),
    },
    defaultProps: {
        colorScheme: "lime",
        size: "md",
        variant: "filled",
    }
};