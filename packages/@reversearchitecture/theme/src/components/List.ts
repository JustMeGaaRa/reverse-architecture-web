import { listAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const {
    definePartsStyle,
    defineMultiStyleConfig
} = createMultiStyleConfigHelpers(parts.keys);
  
export const List = defineMultiStyleConfig({
    baseStyle: definePartsStyle((props) => ({
        item: {
            color: mode("", "gray.700")(props),
            transitionProperty: "all",
            transitionDuration: "normal",
            transitionTimingFunction: "ease",
            _hover: {
                backgroundColor: mode("", "gray.100")(props),
                color: mode("", "basic.white")(props),
            },
            _active: {
                backgroundColor: mode("", "gray.100")(props),
                color: mode("", "yellow.900")(props),
            },
            _activeLink: {
                backgroundColor: mode("", "gray.100")(props),
                color: mode("", "yellow.900")(props),
            },
            _disabled: {
                color: mode("", "gray.200")(props),
            }
        }
    })),
    sizes: {
        sm: {
            item: {
                borderRadius: 8,
                fontSize: "14px",
                height: "32px",
                width: "100%",
                padding: "8px",
            },
            icon: {
                fontSize: "16px",
            }
        },
        md: {
            item: {
                borderRadius: 12,
                fontSize: "16px",
                height: "40px",
                width: "100%",
                px: "12px",
                py: "8px",
            },
            icon: {
                fontSize: "24px",
            }
        },
        lg: {
            item: {
                borderRadius: 16,
                fontSize: "16px",
                height: "48px",
                width: "100%",
                padding: "12px",
            },
            icon: {
                fontSize: "24px",
            }
        },
    },
    defaultProps: {
        size: "md"
    }
})