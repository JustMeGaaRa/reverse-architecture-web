import { extendTheme } from "@chakra-ui/react";
import {
    Avatar,
    Breadcrumb,
    Button,
    Card,
    Checkbox,
    Divider,
    Input,
    Menu,
    Modal,
    Radio,
    Select,
    Tabs,
    Tag
} from "./components";
import {
    colors,
    layerStyles,
    textStyles
} from "./foundations";

export const RestructTheme =  extendTheme({
    components: {
        Avatar,
        Button,
        Breadcrumb,
        Card,
        Checkbox,
        Divider,
        Input,
        Modal,
        Menu,
        Tabs,
        Tag
    },
    colors,
    fonts: {
        body: "Inter, sans-serif",
        heading: "Inter, sans-serif",
        mono: "Inter, sans-serif"
    },
    shadows: {
        outline: "0px 0px 0px 5px rgba(255, 255, 255, 0.40), 0px 0px 0px 3px #161819"
    },
    layerStyles,
    textStyles,
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false
    }
});