import { tagAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const {
    definePartsStyle,
    defineMultiStyleConfig
} = createMultiStyleConfigHelpers(parts.keys);

export const Tag = defineMultiStyleConfig({
    baseStyle: {
        container: {
            cursor: "pointer",
            transitionProperty: "all",
            transitionDuration: "normal",
            transitionTimingFunction: "ease",
        }
    },
    sizes: {
        xs: {
            container: {
                height: "24px",
                borderRadius: "8px",
                paddingX: "2px"
            }
        },
        sm: {
            container: {
                height: "32px",
                borderRadius: "12px",
                paddingLeft: "8px",
                paddingRight: "4px"
            },
            label: {
                paddingLeft: "4px",
                paddingRight: "8px",
                textStyle: "b3"
            },
            closeButton: {
                borderRadius: "8px",
                height: "24px",
                width: "24px",
                paddingX: "4px",
            }
        },
        md: {
            container: {
                height: "40px",
                borderRadius: "16px",
                paddingX: "8px"
            }
        },
        lg: {
            container: {
                height: "48px",
                borderRadius: "16px",
                paddingX: "8px"
            }
        }
    },
    variants: {
        subtle: (props) => ({
            container: {
                backgroundColor: mode("", "surface.tinted-white-5")(props),
                backdropFilter: "blur(32px)",
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                color: mode("", "gray.900")(props),

                _hover: {
                    backgroundColor: mode("", "surface.tinted-white-10")(props),
                    color: mode("", "basic.white")(props)
                },
                _focus:{
                    backdropFilter: "blur(16px)",
                    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10), 0px 0px 0px 5px rgba(255, 255, 255, 0.40), 0px 0px 0px 3px #161819"
                },
                _active: {
                    backgroundColor: mode("", "surface.tinted-white-2")(props),
                    color: mode("", "gray.900")(props),
                },
                _activeLink: {
                    backgroundColor: mode("", "surface.tinted-white-2")(props),
                    color: mode("", "gray.900")(props),
                },
                _selected: {
                    backgroundColor: mode("", "surface.tinted-white-10")(props),
                    color: mode("", `${props.colorScheme}.600`)(props),
                },
                _disabled: {
                    backgroundColor: mode("", "surface.tinted-white-2")(props),
                    color: mode("", "gray.400")(props),
                }
            },
            label: {
                color: mode("", "gray.900")(props),

                _hover: {
                    color: mode("", "basic.white")(props)
                },
                _groupHover: {
                    color: mode("", "basic.white")(props)
                },
                _focus: {
                    color: mode("", "gray.900")(props),
                },
                _active: {
                    color: mode("", "gray.900")(props),
                },
                _activeLink: {
                    color: mode("", "gray.900")(props),
                },
                _selected: {
                    color: mode("", `${props.colorScheme}.600`)(props),
                },
                _disabled: {
                    color: mode("", "gray.400")(props),
                },
                _groupDisabled: {
                    color: mode("", "gray.400")(props),
                }
            },
            closeButton: {
                backgroundColor: mode("", "rgba(255, 255, 255, 0.10)")(props),
                boxShadow: mode("", "0px 2px 4px 0px rgba(0, 0, 0, 0.10)")(props),
                color: mode("", "gray.900")(props),
                opacity: 1.0,
                
                _hover: {
                    backgroundColor: mode("", "rgba(255, 255, 255, 0.10)")(props),
                    color: mode("", "white")(props),
                    opacity: 1.0,
                },
                _groupHover: {
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
                _groupActive: {
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
                },
                _groupDisabled: {
                    backgroundColor: mode("", "rgba(255, 255, 255, 0.10)")(props),
                    borderWidth: 0,
                    color: mode("", "gray.400")(props),
                    opacity: 1.0,
                }
            }
        })
    },
    defaultProps: {
        colorScheme: "lime",
        size: "sm",
        variant: "subtle",
    }
});