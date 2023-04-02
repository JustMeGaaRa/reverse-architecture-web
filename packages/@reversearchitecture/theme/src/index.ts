import { extendTheme, Menu } from "@chakra-ui/react";
import { Button } from "./components/Button";
import { Modal } from "./components/Modal";
import { colors } from "./foundations/Colors";

export const theme =  extendTheme({
    components: {
        Button,
        Modal
    },
    colors,
    config: {
        initialColorMode: "system",
        useSystemColorMode: true
    }
});