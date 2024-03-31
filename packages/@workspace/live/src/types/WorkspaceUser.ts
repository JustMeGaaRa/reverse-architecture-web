import { UserInfo } from "./User";
import { UserAwareness } from "./UserAwareness";

export type WorkspaceUser = Partial<UserAwareness> & {
    info: UserInfo;
    following?: UserInfo;
};