import { breadcrumbAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const {
    definePartsStyle,
    defineMultiStyleConfig
} = createMultiStyleConfigHelpers(parts.keys);

export const Breadcrumb = defineMultiStyleConfig({
    baseStyle: definePartsStyle((props) => ({
        container: {
            backgroundColor: mode("", "surface.tinted-black-1")(props),
            backdropFilter: "blur(16px)",
            borderRadius: 12,
        },
        separator: {
            color: mode("", "gray.900")(props),
            margin: "0px",
            paddingY: "2px",
            paddingX: "4px",
            textStyle: "b3"
        },
        item: {
            height: "24px",
            textStyle: "b3"
        },
        link: {
            borderRadius: 8,
            display: "inline-flex",
            gap: "4px",
            paddingX: "4px",
            paddingY: "2px",
            color: mode("", "gray.900")(props),
            cursor: "pointer",
            textDecoration: "none",
            textStyle: "b3",

            _hover: {
                backgroundColor: mode("", "surface.tinted-white-10")(props),
                backdropFilter: "blur(32px)",
                color: mode("", "white")(props),
            },
            _active: {
                color: mode("", "gray.500")(props),
            },
            _activeLink: {
                color: mode("", "gray.500")(props),
            },
            _selected: {
                color: mode("", `${props.colorScheme}.600`)(props),

                _hover: {
                    backgroundColor: mode("", "surface.tinted-white-2")(props),
                    backdropFilter: "blur(16px)",
                    color: mode("", "white")(props),
                }
            }
        }
    })),
    defaultProps: {
        colorScheme: "lime",
    }
})