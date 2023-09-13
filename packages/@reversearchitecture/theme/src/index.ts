import { extendTheme } from "@chakra-ui/react";
import { Avatar } from "./components/Avatar";
import { Breadcrumb } from "./components/Breadcrumb";
import { Button } from "./components/Button";
import { Checkbox } from "./components/Checkbox";
import { List } from "./components/List";
import { Menu } from "./components/Menu";
import { Modal } from "./components/Modal";
import { Radio } from "./components/Radio";
import { Tabs } from "./components/Tabs";
import { Tag } from "./components/Tag";
import { colors } from "./foundations/Colors";
import { textStyles } from "./foundations/TextStyles";

export const theme =  extendTheme({
    components: {
        Avatar,
        Button,
        Breadcrumb,
        Checkbox,
        List,
        Menu,
        Modal,
        // Radio,x
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