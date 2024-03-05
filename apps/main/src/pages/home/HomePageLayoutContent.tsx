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
import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CommandCenter, Route, RouteList } from "../../features";
import { HelpShortcutsModal } from "./HelpShortcutsModal";

export const HomePageResetActionsWrapper: FC<PropsWithChildren> = ({ children }) => {
    console.log("context wrapper: home page");
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
                        icon={<Icon as={Home} boxSize={5} />}
                        title={"Dashboard"}
                        to={"/dashboard"}
                    />
                    <Route
                        icon={<Icon as={Document3Lines} boxSize={5} />}
                        title={"Workspaces"}
                        to={"/workspaces"}
                    />
                    <Route
                        icon={<Icon as={Share} boxSize={5} />}
                        title={"Community"}
                        to={"/community"}
                    />
                </RouteList>
            </PageSidebarSectionPortal>
            <PageSidebarSectionPortal section={"end"}>
                <RouteList>
                    <Route
                        icon={<Icon as={NotificationBell} boxSize={5} />}
                        isDisabled
                        title={"Notifications"}
                        to={"/notifications"}
                    />
                    <Route
                        icon={<Icon as={Settings} boxSize={5} />}
                        isDisabled
                        title={"Settings"}
                        to={"/settings"}
                    />
                    <Route
                        icon={<Icon as={QuestionMarkCircle} boxSize={5} />}
                        isDisabled
                        title={"Help & Feedback"}
                        to={"/help"}
                    />
                </RouteList>
            </PageSidebarSectionPortal>

            <PageHeaderSectionPortal section={"center"}>
                <CommandCenter width={["sm", "md", "lg"]} />
            </PageHeaderSectionPortal>

            {children}
            
            <HelpShortcutsModal
                isOpen={searchParams.get("help") === "commands"}
                onClose={onClickCommandsTableClose}
            />
        </>
    )
}