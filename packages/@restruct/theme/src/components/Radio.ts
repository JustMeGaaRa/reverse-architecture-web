import { radioAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const {
    definePartsStyle,
    defineMultiStyleConfig
} = createMultiStyleConfigHelpers(radioAnatomy.keys);

export const Radio = defineMultiStyleConfig({
    baseStyle: (props) => ({
        control: {
            borderRadius: "16px",
            _hover: {
                backgroundColor: mode("", "whiteAlpha.100")(props),
            }
        },
        container: {
            backgroundColor: mode("", "whiteAlpha.100")(props),
            borderColor: mode("", "whiteAlpha.700")(props),
            borderWidth: 1,
            _checked: {
                backgroundColor: mode("", `${props.colorScheme}.200`)(props),
                borderColor: mode("", `${props.colorScheme}.900`)(props),
                color: mode("", `${props.colorScheme}.900`)(props),
            },
            _hover: {
                borderColor: mode("", "whiteAlpha.900")(props),
                _checked: {
                    backgroundColor: mode("", `${props.colorScheme}.400`)(props),
                    borderColor: mode("", `${props.colorScheme}.900`)(props),
                    color: mode("", `${props.colorScheme}.900`)(props),
                }
            },
            _focus: {
                borderColor: mode("", "whiteAlpha.900")(props),
                boxShadow: mode("", "0 0 0 5px rgba(255, 255, 255, 0.35)")(props),
                _checked: {
                    backgroundColor: mode("", `${props.colorScheme}.200`)(props),
                    borderColor: mode("", `${props.colorScheme}.900`)(props),
                    boxShadow: mode("", "0 0 0 5px rgba(227, 251, 81, 0.35)")(props),
                    color: mode("", `${props.colorScheme}.900`)(props),
                }
            },
            _disabled: {
                borderColor: mode("", "whiteAlpha.200")(props),
                _checked: {
                    backgroundColor: mode("", `${props.colorScheme}.100`)(props),
                    borderColor: mode("", `${props.colorScheme}.200`)(props),
                    color: mode("", `${props.colorScheme}.200`)(props),
                }
            }
        },
        label: {
            color: mode("", "whiteAlpha.700")(props),
            _checked: {
                color: mode("", `${props.colorScheme}.900`)(props),
            }
        }
    }),
    defaultProps: {
        colorScheme: "yellow",
        size: "md",
    }
})