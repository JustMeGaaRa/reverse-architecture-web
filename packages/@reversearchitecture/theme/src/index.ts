import { extendTheme } from "@chakra-ui/react";
import { Avatar } from "./components/Avatar";
import { Button } from "./components/Button";
import { Menu } from "./components/Menu";
import { Modal } from "./components/Modal";
import { colors } from "./foundations/Colors";
import { textStyles } from "./foundations/TextStyles";

export const theme =  extendTheme({
    components: {
        Avatar,
        Button,
        Menu,
        Modal
    },
    colors,
    textStyles,
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false
    }
});