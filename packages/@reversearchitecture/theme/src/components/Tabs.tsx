import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const {
    definePartsStyle,
    defineMultiStyleConfig
} = createMultiStyleConfigHelpers(tabsAnatomy.keys);

export const Tabs = defineMultiStyleConfig({
    baseStyle: {
        tab: {
            colorScheme: "yellow",
            fontWeight: "normal",
        }
    },
    sizes: {
        md: {
            tab: {
                
            }
        }
    },
    variants: {
        line: (props) => ({
            tab: {
                color: mode("", "gray.700")(props),
                _hover: {
                    color: mode("", "basic.White")(props)
                },
                _active: {
                    borderBottomColor: mode("", `${props.colorScheme}.primary`)(props),
                    color: mode("", "basic.White")(props)
                },
                _selected: {
                    borderBottomColor: mode("", `${props.colorScheme}.primary`)(props),
                    color: mode("", "basic.White")(props)
                },
                _disabled: {
                    color: mode("", "gray.200")(props)
                }
            }
        })
    },
    defaultProps: {
        colorScheme: "yellow",
        size: "md",
        variant: "line",
    }
})