import { Icon } from "@chakra-ui/react";
import {
    Home,
    Document3Lines,
    Share,
    NotificationBell,
    Settings,
    QuestionMarkCircle
} from "@restruct/icons";
import {
    PageHeaderSectionPortal,
    PageSidebarSectionPortal,
    usePageSidebar,
} from "@restruct/ui";
import { FC, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CommandCenter, Route, RouteList } from "../../features";
import { HelpShortcutsModal } from "./HelpShortcutsModal";

export const HomeNavigationActions: FC = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const { setShowSidebarButton } = usePageSidebar();

    useEffect(() => {
        setShowSidebarButton(true);
    }, [setShowSidebarButton])

    const onClickCommandsTableClose = useCallback(() => {
        setSearchParams(params => {
            params.delete("help");
            return params;
        })
    }, [setSearchParams]);

    return (
        <>
            <PageSidebarSectionPortal section={"start"}>
                <RouteList>
                    <Route
                        icon={<Home boxSize={6} />}
                        title={"Dashboard"}
                        to={"/dashboard"}
                    />
                    <Route
                        icon={<Document3Lines boxSize={6} />}
                        title={"Workspaces"}
                        to={"/workspaces"}
                    />
                    <Route
                        icon={<Share boxSize={6} />}
                        title={"Community"}
                        to={"/community"}
                    />
                </RouteList>
            </PageSidebarSectionPortal>
            <PageSidebarSectionPortal section={"end"}>
                <RouteList>
                    <Route
                        icon={<NotificationBell boxSize={6} />}
                        isDisabled
                        title={"Notifications"}
                        to={"/notifications"}
                    />
                    <Route
                        icon={<Settings boxSize={6} />}
                        isDisabled
                        title={"Settings"}
                        to={"/settings"}
                    />
                    <Route
                        icon={<QuestionMarkCircle boxSize={6} />}
                        isDisabled
                        title={"Help & Feedback"}
                        to={"/help"}
                    />
                </RouteList>
            </PageSidebarSectionPortal>

            <PageHeaderSectionPortal section={"center"}>
                <CommandCenter width={["sm", "md", "lg"]} />
            </PageHeaderSectionPortal>
            
            <HelpShortcutsModal
                isOpen={searchParams.get("help") === "commands"}
                onClose={onClickCommandsTableClose}
            />
        </>
    )
}