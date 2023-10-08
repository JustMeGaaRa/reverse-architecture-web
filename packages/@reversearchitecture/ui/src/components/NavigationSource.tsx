import { FC, PropsWithChildren, useEffect } from "react";
import { useNavigationContext } from "../hooks";

export const NavigationSource: FC<PropsWithChildren> = ({ children }) => {
    const { setComponents } = useNavigationContext();

    useEffect(() => {
        setComponents(children);
    }, [children, setComponents])

    return null;
}