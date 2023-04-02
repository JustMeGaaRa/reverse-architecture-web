import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const {
    defineMultiStyleConfig,
    definePartsStyle
} = createMultiStyleConfigHelpers(menuAnatomy.keys);

const commandStyle = defineStyle((props) => ({

}));

const groupStyle = defineStyle((props) => ({

}));

const iconStyle = defineStyle((props) => ({

}));

const itemStyle = defineStyle((props) => ({
    background: mode("whiteAlpha.900", "brand.bg")(props),
    _active: {
        background: mode("blackAlpha.200", "brand.hover")(props),
    }
}));

const listStyleStyle = defineStyle((props) => ({
    background: mode("whiteAlpha.900", "brand.bg")(props)
}));

const menuStyle = defineStyle((props) => ({

}));

const menuButtonStyle = defineStyle((props) => ({

}));

const buttonStyle = defineStyle((props) => ({

}));

const dividerStyle = defineStyle((props) => ({

}));

const groupTitleStyle = defineStyle((props) => ({

}));

export const Menu = defineMultiStyleConfig({
    baseStyle: definePartsStyle((props) => ({
        command: commandStyle(props),
        group: groupStyle(props),
        icon: iconStyle(props),
        item: itemStyle(props),
        list: listStyleStyle(props),
        menu: menuStyle(props),
        menuButton: menuButtonStyle(props),
        button: buttonStyle(props),
        divider: dividerStyle(props),
        groupTitle: groupTitleStyle(props)
    }))
});