import { createContext } from "react";
import { PageOptions } from "../types";

export const PageContext = createContext<PageOptions>({
    headerOptions: {
        height: 80,
        sections: {
            left: [],
            middle: [],
            right: [],
        }
    },
    sidebarOptions: {
        isOpen: false,
        showButton: false,
        width: [80, 320],
        sections: {
            logo: [],
            top: [],
            middle: [],
            bottom: [],
        }
    }
})