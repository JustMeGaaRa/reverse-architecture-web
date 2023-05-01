import { extendTheme } from "@chakra-ui/react";
import { Avatar } from "./components/Avatar";
import { Breadcrumb } from "./components/Breadcrumb";
import { Button } from "./components/Button";
import { List } from "./components/List";
import { Menu } from "./components/Menu";
import { Modal } from "./components/Modal";
import { Tabs } from "./components/Tabs";
import { colors } from "./foundations/Colors";
import { textStyles } from "./foundations/TextStyles";

export const theme =  extendTheme({
    components: {
        Avatar,
        Button,
        Breadcrumb,
        List,
        Menu,
        Modal,
        Tabs,
    },
    colors,
    fonts: {
        body: "Inter, sans-serif",
        heading: "Inter, sans-serif",
        mono: "Inter, sans-serif"
    },
    textStyles,
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false
    }
});