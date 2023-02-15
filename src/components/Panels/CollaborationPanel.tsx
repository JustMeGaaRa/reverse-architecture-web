import { HStack } from "@chakra-ui/react";
import { FC } from "react";
import { Panel, PanelProps } from "./Panel";
import { OnlineUsers, SharePopover } from "..";
import { useOnlineUsers } from "../c4-view-renderer/hooks/useOnlineUsers";
import { useShare } from "../c4-view-renderer/hooks/useShare";

export type CollaborationPanelProps = Partial<Pick<PanelProps, "dock">>;

export const CollaborationPanel: FC<CollaborationPanelProps> = ({
    dock = "top-right",
}) => {
    const { users } = useOnlineUsers();
    const { link, clipboardCopy } = useShare();

    return (
        <Panel dock={dock} px={4} py={2}>
            <HStack borderRadius={"lg"} gap={2}>
                <OnlineUsers users={users} />
                <SharePopover link={link} onCopy={clipboardCopy} />
            </HStack>
        </Panel>
    );
}