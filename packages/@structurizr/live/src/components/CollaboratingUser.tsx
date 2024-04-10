import { ViewportAnimatedElement } from "@structurizr/react";
import { FC } from "react";
import { WorkspaceUser } from "../types";
import { UserMouseCursor } from "./UserMouseCursor";

export const CollaboratingUser: FC<{ user: WorkspaceUser }> = ({ user }) => {
    return (
        <ViewportAnimatedElement position={user.mouse} zIndex={1000}>
            <UserMouseCursor colorScheme={user.info.color} name={user.info.fullname} />
        </ViewportAnimatedElement>
    )
}