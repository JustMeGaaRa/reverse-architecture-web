import { extendTheme, Menu } from "@chakra-ui/react";
import { Button } from "./components/Button";
import { Modal } from "./components/Modal";
import { colors } from "./foundations/Colors";

export const theme =  extendTheme({
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false
    }
});