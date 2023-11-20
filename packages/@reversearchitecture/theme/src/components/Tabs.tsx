import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { mode, getColorVar } from "@chakra-ui/theme-tools";

const {
    definePartsStyle,
    defineMultiStyleConfig
} = createMultiStyleConfigHelpers(tabsAnatomy.keys);

export const Tabs = defineMultiStyleConfig({
    baseStyle: {
        tabpanel: {
            padding: 0,
        }
    },
    variants: {
        line: (props) => ({
            tab: {
                position: "relative",
                color: mode("", "gray.900")(props),
                fontsize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                height: "48px",
                padding: 4,

                _hover: {
                    background: "radial-gradient(77.22% 96% at 50.52% 96%, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 62.5%)",
                    color: mode("", "basic.white")(props)
                },
                _active: {
                    background: "radial-gradient(77.22% 96% at 50.52% 96%, rgba(227, 251, 81, 0.10) 0%, rgba(227, 251, 81, 0.00) 62.5%)",
                    borderBottomColor: "transparent",
                    color: mode("", "basic.white")(props),

                    _after: {
                        position: "absolute",
                        content: "''",
                        bottom: "-2px",
                        left: 0,
                        right: 0,
                        backgroundColor: mode("", `${props.colorScheme}.600`)(props),
                        height: "3px",
                        borderRadius: "4px",
                        marginX: 2
                    }
                },
                _selected: {
                    background: "radial-gradient(77.22% 96% at 50.52% 96%, rgba(227, 251, 81, 0.10) 0%, rgba(227, 251, 81, 0.00) 62.5%)",
                    borderBottomColor: "transparent",
                    color: mode("", "basic.white")(props),

                    _after: {
                        position: "absolute",
                        content: "''",
                        bottom: "-2px",
                        left: 0,
                        right: 0,
                        backgroundColor: mode("", `${props.colorScheme}.600`)(props),
                        height: "3px",
                        borderRadius: "4px",
                        marginX: 2
                    }
                },
                _disabled: {
                    color: mode("", "gray.400")(props),
                }
            }
        })
    },
    defaultProps: {
        colorScheme: "lime",
        size: "md",
        variant: "line",
    }
})