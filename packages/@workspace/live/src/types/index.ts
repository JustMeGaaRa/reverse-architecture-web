import { UserInfo } from "@workspace/core";

export type SharingOptions = {
    presentationModeOn: boolean;
    presentingUser?: UserInfo;
}

export type UserInfoRequired =
    Required<Pick<UserInfo, "username" | "fullname">>
    & Partial<Pick<UserInfo, "color">>;