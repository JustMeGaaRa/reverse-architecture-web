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
    background: mode("", "transparent")(props),
    borderRadius: "8px",
    color: mode("", "basic.white")(props),
    _hover: {
        backgroundColor: mode("", "gray.100")(props),
    },
    _active: {
        backgroundColor: mode("", "gray.100")(props),
        color: mode("", "yellow.900")(props),
    },
    _disabled: {
        backgroundColor: mode("", "transparent")(props),
        color: mode("", "gray.200")(props),
    }
}));

const listStyleStyle = defineStyle((props) => ({
    backgroundColor: mode("", "basic.eerie-black")(props),
    borderColor: mode("", "gray.200")(props),
    borderRadius: "14px",
    padding: "8px"
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