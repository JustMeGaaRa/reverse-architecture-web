import { modalAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const {
    defineMultiStyleConfig,
    definePartsStyle
} = createMultiStyleConfigHelpers(modalAnatomy.keys);

const dialogContainerStyle = defineStyle((props) => ({
}));

const dialogStyle = defineStyle((props) => ({
    background: mode("whiteAlpha.900", "brand.bg")(props),
    borderColor: mode("blackAlpha.300", "whiteAlpha.200")(props)
}));

const header = defineStyle({

});

const body = defineStyle({

});

const footer = defineStyle({

});

const closeButton = defineStyle({

});

const overlay = defineStyle({
    backdropFilter: "auto",
    backdropBlur: "2px"
});

export const Modal = defineMultiStyleConfig({
    baseStyle: definePartsStyle((props) => ({
        body,
        closeButton,
        dialog: dialogStyle(props),
        dialogContainer: dialogContainerStyle(props),
        footer,
        header,
        overlay
    }))
});