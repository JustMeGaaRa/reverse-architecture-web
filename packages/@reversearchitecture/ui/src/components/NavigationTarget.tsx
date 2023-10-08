import { FC } from "react";
import { useNavigationContext } from "../hooks";

export const NavigationTarget: FC = () => {
    const { components } = useNavigationContext();
    return (<>{components}</>);
}