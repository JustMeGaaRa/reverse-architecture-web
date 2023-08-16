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
        },
        item: {
        },
        separator: {

        },
        link: {
            backgroundColor: mode("", "whiteAlpha.100")(props),
            borderColor: mode("", "whiteAlpha.200")(props),
            borderWidth: 1,
            borderRadius: 8,
            color: mode("", "whiteAlpha.700")(props),
            fontSize: "14px",
            height: "24px",
            _hover: {
                backgroundColor: mode("", "whiteAlpha.200")(props),
                borderColor: mode("", "whiteAlpha.400")(props),
                color: mode("", "basic.white")(props),
                textDecoration: "none"
            },
            _active: {
                backgroundColor: mode("", `${props.colorScheme}.100`)(props),
                borderColor: mode("", `${props.colorScheme}.900`)(props),
                color: mode("", "basic.white")(props)
            },
            _activeLink: {
                backgroundColor: mode("", `${props.colorScheme}.100`)(props),
                borderColor: mode("", `${props.colorScheme}.900`)(props),
                color: mode("", "basic.white")(props)
            }
        }
    }))
})