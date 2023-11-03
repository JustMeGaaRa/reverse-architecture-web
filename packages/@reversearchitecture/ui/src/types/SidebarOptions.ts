import { ReactNode } from "react";

export type SidebarContent = {
    logo: ReactNode;
    top: ReactNode;
    middle: ReactNode;
    bottom: ReactNode;
}

export type SidebarOptions = {
    isOpen: boolean;
    showButton: boolean;
    width: [number, number];
    sections: SidebarContent;
}