import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const {
    definePartsStyle,
    defineMultiStyleConfig
} = createMultiStyleConfigHelpers(menuAnatomy.keys);

export const Menu = defineMultiStyleConfig({
    baseStyle: definePartsStyle((props) => ({
        command: {
            
        },
        group: {
            
        },
        icon: {
            
        },
        item: {
            backgroundColor: mode("", "transparent")(props),
            color: mode("", "gray.900")(props),

            _hover: {
                backgroundColor: mode("", "surface.tinted-white-10")(props),
                backdropFilter: "blur(32px)",
                boxShadow: mode("", "0px 2px 4px 0px rgba(0, 0, 0, 0.10)")(props),
                color: mode("", "white")(props),
            },
            _active: {
                backgroundColor: mode("", "surface.tinted-white-5")(props),
                backdropFilter: "blur(32px)",
                boxShadow: mode("", "0px 2px 4px 0px rgba(0, 0, 0, 0.10)")(props),
                color: mode("", "gray.500")(props),
            },
            _selected: {
                backgroundColor: mode("", "surface.tinted-white-10")(props),
                backdropFilter: "blur(32px)",
                boxShadow: mode("", "0px 2px 4px 0px rgba(0, 0, 0, 0.10)")(props),
                color: mode("", `${props.colorScheme}.600`)(props),

                _active: {
                    backgroundColor: mode("", "surface.tinted-white-5")(props),
                    backdropFilter: "blur(32px)",
                    boxShadow: mode("", "0px 2px 4px 0px rgba(0, 0, 0, 0.10)")(props),
                    color: mode("", `${props.colorScheme}.500`)(props),
                }
            },
            _disabled: {
                color: mode("", "gray.400")(props),
            }
        },
        list: {
            backgroundColor: mode("", "surface.tinted-white-5")(props),
            backdropFilter: "blur(32px)",
            boxShadow: mode("", "0px 4px 8px 0px rgba(0, 0, 0, 0.10)")(props),
            borderWidth: "2px",
            borderColor: mode("", "surface.tinted-white-30")(props),
        },
        menu: {
            
        },
        menuButton: {
            
        },
        button: {
            
        },
        divider: {
            
        },
        groupTitle: {
            
        }
    })),
    sizes: {
        xs: {
            item: {
                borderRadius: 8,
                height: "24px",
                paddingX: "4px",
                paddingY: "0px",
                textStyle: "b3"
            },
            list: {
                borderRadius: 16,
                padding: "8px",
            }
        },
        sm: {
            item: {
                borderRadius: 12,
                height: "32px",
                paddingX: "8px",
                paddingY: "6px",
                textStyle: "b3"
            },
            list: {
                borderRadius: 16,
                padding: "8px",
            }
        },
        md: {
            item: {
                borderRadius: 16,
                height: "40px",
                paddingX: "10px",
                paddingY: "8px",
                textStyle: "b2"
            },
            list: {
                borderRadius: 20,
                padding: "8px",
            }
        },
        lg: {
            item: {
                borderRadius: 16,
                height: "48px",
                paddingX: "12px",
                paddingY: "12px",
                textStyle: "b2"
            },
            list: {
                borderRadius: 20,
                padding: "8px",
            }
        },
    },
    defaultProps: {
        colorScheme: "lime",
        size: "md"
    }
});