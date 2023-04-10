import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components/Button";
import { Menu } from "./components/Menu";
import { Modal } from "./components/Modal";
import { colors } from "./foundations/Colors";
import { textStyles } from "./foundations/TextStyles";

export const theme =  extendTheme({
    components: {
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