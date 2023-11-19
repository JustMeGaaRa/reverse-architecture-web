import { extendTheme } from "@chakra-ui/react";
import {
    Avatar,
    Breadcrumb,
    Button,
    Checkbox,
    Divider,
    Menu,
    Modal,
    Radio,
    Select,
    Tabs,
    Tag
} from "./components";
import {
    colors,
    textStyles
} from "./foundations";

export const RestructTheme =  extendTheme({
    components: {
        Avatar,
        Button,
        Breadcrumb,
        Checkbox,
        Divider,
        Menu,
        Modal,
        Tabs,
        Tag
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