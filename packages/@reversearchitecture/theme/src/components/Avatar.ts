import { avatarAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const {
    definePartsStyle,
    defineMultiStyleConfig
} = createMultiStyleConfigHelpers(avatarAnatomy.keys);

const sizes = {
    md: definePartsStyle((props) => ({
        container: {
            backgroundColor: `${props.colorScheme}.100`,
            borderRadius: "16px",
            borderWidth: "1px",
            borderColor: `${props.colorScheme}.primary`,
            height: "40px",
            width: "40px",
        },
        excessLabel: {
            backgroundColor: "gray.200",
            borderRadius: "16px",
            borderWidth: "1px",
            height: "40px",
            width: "40px",
        }
    })),
}

const baseStyle = definePartsStyle({
})

export const Avatar = defineMultiStyleConfig({
    baseStyle,
    sizes,
})