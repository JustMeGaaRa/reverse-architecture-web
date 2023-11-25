import { ReactNode } from "react";

export type HeaderContent = {
    left: ReactNode;
    middle: ReactNode;
    right: ReactNode;
}

export type HeaderOptions = {
    height: number;
    sections: HeaderContent;
}