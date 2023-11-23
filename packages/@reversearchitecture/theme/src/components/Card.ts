import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { mode, getColorVar } from "@chakra-ui/theme-tools";

const {
    definePartsStyle,
    defineMultiStyleConfig
} = createMultiStyleConfigHelpers(cardAnatomy.keys)

export const Card = defineMultiStyleConfig({
    baseStyle: (props) => ({
        container: {
            backgroundColor: mode("", "surface.tinted-white-5")(props),
            // TODO: figure out what is wrong with zIndex when this is enabled
            // backdropFilter: "blur(64px)",
            borderRadius: "16px",
            boxShadow: mode("", `0px 2px 4px 0px ${getColorVar(props.theme, "surface.tinted-black-10")}`)(props),

            _hover: {
                cursor: "pointer",
            },
            _active: {
                backgroundColor: mode("", "surface.tinted-white-2")(props),
            },
        },
        body: {
            padding: "0px"
        },
        header: {
            padding: "0px"
        },
        footer: {
            padding: "0px"
        }
    }),
    sizes: {
        md: {

        }
    },
    defaultProps: {
        colorScheme: "gray",
        size: "md",
    }
})