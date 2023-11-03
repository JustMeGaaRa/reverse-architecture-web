import { HeaderOptions, SidebarOptions } from "../types";

export type SetStateAction<S> = ((prevState: S) => S);

export type PageOptions = {
    headerOptions: HeaderOptions;
    sidebarOptions: SidebarOptions;
    setHeaderOptions?: (func: SetStateAction<HeaderOptions>) => void;
    setSidebarOptions?: (func: SetStateAction<SidebarOptions>) => void;
}