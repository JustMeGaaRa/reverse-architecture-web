import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const {
    definePartsStyle,
    defineMultiStyleConfig
} = createMultiStyleConfigHelpers(checkboxAnatomy.keys);

export const Checkbox = defineMultiStyleConfig({
    baseStyle: (props) => ({
        control: {
            borderColor: mode("", "whiteAlpha.700")(props),
            borderRadius: "4px",
            borderWidth: 1,
            _checked: {
                backgroundColor: mode("", `${props.colorScheme}.200`)(props),
                borderColor: mode("", `${props.colorScheme}.900`)(props),
            },
            _indeterminate: {
                backgroundColor: mode("", `${props.colorScheme}.200`)(props),
                borderColor: mode("", `${props.colorScheme}.900`)(props),
            },
            _hover: {
                borderColor: mode("", "whiteAlpha.900")(props),
                _checked: {
                    backgroundColor: mode("", `${props.colorScheme}.400`)(props),
                    borderColor: mode("", `${props.colorScheme}.900`)(props),
                },
                _indeterminate: {
                    backgroundColor: mode("", `${props.colorScheme}.400`)(props),
                    borderColor: mode("", `${props.colorScheme}.900`)(props),
                }
            },
            _focus: {
                borderColor: mode("", "whiteAlpha.900")(props),
                boxShadow: mode("", "0 0 0 5px rgba(255, 255, 255, 0.35)")(props),
                _checked: {
                    backgroundColor: mode("", `${props.colorScheme}.200`)(props),
                    borderColor: mode("", `${props.colorScheme}.900`)(props),
                    boxShadow: mode("", "0 0 0 5px rgba(227, 251, 81, 0.35)")(props),
                },
                _indeterminate: {
                    backgroundColor: mode("", `${props.colorScheme}.200`)(props),
                    borderColor: mode("", `${props.colorScheme}.900`)(props),
                    boxShadow: mode("", "0 0 0 5px rgba(227, 251, 81, 0.35)")(props),
                }
            },
            _disabled: {
                borderColor: mode("", `${props.colorScheme}.200`)(props),
                _checked: {
                    backgroundColor: mode("", `${props.colorScheme}.100`)(props),
                    borderColor: mode("", `${props.colorScheme}.200`)(props),
                },
                _indeterminate: {
                    backgroundColor: mode("", `${props.colorScheme}.100`)(props),
                    borderColor: mode("", `${props.colorScheme}.200`)(props),
                }
            }
        },
        icon: {
            _checked: {
                color: mode("", "whiteAlpha.900")(props),
            },
            _disabled: {
                _checked: {
                    color: mode("", "whiteAlpha.400")(props),
                },
                _indeterminate: {
                    color: mode("", "whiteAlpha.400")(props),
                }
            }
        }
    }),
    defaultProps: {
        colorScheme: "yellow",
        size: "md",
    }
})