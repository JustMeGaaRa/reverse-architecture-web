import { FC } from "react";
import { useCurrentUserEffect } from "../hooks";
import { UserInfoRequired } from "../types";

export const CurrentUser: FC<{ info: UserInfoRequired }> = ({ info }) => {
    useCurrentUserEffect(info);
    return null;
}