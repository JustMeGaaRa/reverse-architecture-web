import { Box, Icon } from "@chakra-ui/react";
import {
    Home,
    Document3Lines,
    Share,
    NotificationBell,
    Settings,
    QuestionMarkCircle
} from "@reversearchitecture/icons";
import {
    Route,
    RouteList,
    usePageSidebar,
    usePageHeader,
} from "@reversearchitecture/ui";
import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { CommandCenter } from "../../features";
import { HelpShortcutsModal } from "./HelpShortcutsModal";

export const HomePageLayoutContent: FC<PropsWithChildren> = ({ children }) => {
    const { setShowSidebarButton, setSidebarContent } = usePageSidebar();
    const { setHeaderContent } = usePageHeader();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const navigate = useNavigate();

    // reset sidebar and header content
    useEffect(() => {
        setSidebarContent({
            top: (<></>),
            middle: (<></>),
            bottom: (<></>)
        });
        setHeaderContent({
            left: (<></>),
            middle: (<></>),
            right: (<></>)
        });
    }, [setHeaderContent, setSidebarContent]);

    // sidebar section
    useEffect(() => {
        setShowSidebarButton(true);
        setSidebarContent({
            top: (
                <RouteList>
                    <Route
                        icon={<Icon as={Home} boxSize={5} />}
                        title={"Dashboard"}
                        to={"dashboard"}
                    />
                    <Route
                        icon={<Icon as={Document3Lines} boxSize={5} />}
                        title={"Workspaces"}
                        to={"workspaces"}
                    />
                    <Route
                        icon={<Icon as={Share} boxSize={5} />}
                        title={"Community"}
                        to={"community"}
                    />
                </RouteList>
            ),
            bottom: (
                <RouteList>
                    <Route
                        icon={<Icon as={NotificationBell} boxSize={5} />}
                        isDisabled
                        title={"Notifications"}
                        to={"notifications"}
                    />
                    <Route
                        icon={<Icon as={Settings} boxSize={5} />}
                        isDisabled
                        title={"Settings"}
                        to={"settings"}
                    />
                    <Route
                        icon={<Icon as={QuestionMarkCircle} boxSize={5} />}
                        isDisabled
                        title={"Help & Feedback"}
                        to={"help"}
                    />
                </RouteList>
            )
        })
    }, [setSidebarContent, setShowSidebarButton, navigate]);

    // header section
    useEffect(() => {
        setHeaderContent({
            middle: (
                <CommandCenter width={["sm", "md", "lg"]} />
            ),
        })
    }, [setHeaderContent]);

    const isOpen = searchParams.get("help") === "commands";

    const onClose = useCallback(() => {
        setSearchParams(params => {
            params.delete("help");
            return params;
        })
    }, [setSearchParams]);

    return (
        <>
            {children}
            <HelpShortcutsModal
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    )
}