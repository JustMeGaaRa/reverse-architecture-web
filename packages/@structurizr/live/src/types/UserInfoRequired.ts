import { UserInfo } from "./User";

export type UserInfoRequired =
    Required<Pick<UserInfo, "username" | "fullname">>
    & Partial<Pick<UserInfo, "color">>;