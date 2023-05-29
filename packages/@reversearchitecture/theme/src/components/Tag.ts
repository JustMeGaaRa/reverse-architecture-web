import { tagAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const {
    definePartsStyle,
    defineMultiStyleConfig
} = createMultiStyleConfigHelpers(parts.keys);

export const Tag = defineMultiStyleConfig({
    sizes: {
        xs: {
            container: {
                height: "24px",
                borderRadius: "8px",
            }
        },
        sm: {
            container: {
                height: "32px",
                borderRadius: "16px",
            }
        },
        md: {
            container: {
                height: "40px",
                borderRadius: "16px",
            }
        },
        lg: {
            container: {
                height: "48px",
                borderRadius: "16px",
            }
        }
    },
    variants: {
        outline: (props) => ({
            container: {
                backgroundColor: mode(`${props.colorScheme}.100`, `${props.colorScheme}.100`)(props),
                borderColor: mode(`${props.colorScheme}.200`, `${props.colorScheme}.200`)(props),
                borderWidth: "1px",
                color: mode(`${props.colorScheme}.700`, `${props.colorScheme}.700`)(props),
                fontSize: "14px",
                _hover: {
                    backgroundColor: mode(`${props.colorScheme}.200`, `${props.colorScheme}.200`)(props),
                    borderColor: mode(`${props.colorScheme}.400`, `${props.colorScheme}.400`)(props),
                    color: mode("basic.white", "basic.white")(props),
                },
                _active: {
                    backgroundColor: mode("yellow.100", "yellow.100")(props),
                    borderColor: mode("yellow.900", "yellow.900")(props),
                    color: mode("basic.white", "basic.white")(props),
                },
                _activeLink: {
                    backgroundColor: mode("yellow.100", "yellow.100")(props),
                    borderColor: mode("yellow.900", "yellow.900")(props),
                    color: mode("basic.white", "basic.white")(props),
                },
                "&.active": {
                    backgroundColor: mode("yellow.100", "yellow.100")(props),
                    borderColor: mode("yellow.900", "yellow.900")(props),
                    color: mode("basic.white", "basic.white")(props),
                }
            }
        })
    },
    defaultProps: {
        colorScheme: "gray",
        size: "md",
        variant: "outline",
    }
});