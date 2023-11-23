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
            backgroundColor: mode("", "surface.tinted-black-10")(props),
            backdropFilter: "blur(16px)",
            borderRadius: 12,
        },
        separator: {
            color: mode("", "gray.900")(props),
            paddingY: "2px",
            textStyle: "b3"
        },
        item: {
            borderRadius: 8,
            height: "24px",
        },
        link: {
            borderRadius: 8,
            paddingX: "8px",
            paddingY: "2px",
            color: mode("", "gray.900")(props),
            cursor: "pointer",
            textDecoration: "none",
            textStyle: "b3",

            _hover: {
                backgroundColor: mode("", "surface.tinted-white-10")(props),
                backdropFilter: "blur(32px)",
                color: mode("", "basic.white")(props)
            },
            _active: {
                color: mode("", "gray.500")(props)
            },
            _activeLink: {
                color: mode("", "gray.500")(props)
            },
            _selected: {
                color: mode("", `${props.colorScheme}.600`)(props)
            }
        }
    })),
    defaultProps: {
        size: "md",
        colorScheme: "lime",
    }
})