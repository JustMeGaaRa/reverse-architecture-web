import { Box, Icon } from "@chakra-ui/react";
import {
    Route,
    RouteList,
    CommandCenter,
    ReverseArchitectureSvg,
    PageHomeButton,
    usePageSidebar,
    usePageHeader
} from "@reversearchitecture/ui";
import {
    BellNotification,
    HelpCircle,
    HomeSimple,
    Internet,
    Page,
    Settings,
} from "iconoir-react";
import { FC, PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router";

export const HomePageLayoutContent: FC<PropsWithChildren> = ({ children }) => {
    const { sidebarOptions, setShowSidebarButton, setSidebarContent } = usePageSidebar();
    const { setHeaderContent } = usePageHeader();
    const navigate = useNavigate();

    useEffect(() => {
        setShowSidebarButton(true);
        setSidebarContent({
            logo: (
                <PageHomeButton
                    icon={<ReverseArchitectureSvg showText={sidebarOptions.isOpen} />}
                    onClick={() => navigate("/")}
                />
            ),
            top: (
                <RouteList>
                    <Route
                        icon={<Icon as={HomeSimple} boxSize={5} />}
                        isDisabled
                        title={"Dashboard"}
                        to={"dashboard"}
                    />
                    <Route
                        icon={<Icon as={Page} boxSize={5} />}
                        title={"Workspaces"}
                        to={"workspaces"}
                    />
                    <Route
                        icon={<Icon as={Internet} boxSize={5} />}
                        title={"Community"}
                        to={"community"}
                    />
                </RouteList>
            ),
            middle: (<></>),
            bottom: (
                <RouteList>
                    <Route
                        icon={<Icon as={BellNotification} boxSize={5} />}
                        isDisabled
                        title={"Notifications"}
                        to={"notifications"}
                    />
                    <Route
                        icon={<Icon as={Settings} boxSize={5} />}
                        title={"Settings"}
                        to={"settings"}
                    />
                    <Route
                        icon={<Icon as={HelpCircle} boxSize={5} />}
                        isDisabled
                        title={"Help & Feedback"}
                        to={"help"}
                    />
                </RouteList>
            )
        })
    }, [setSidebarContent, setShowSidebarButton, navigate, sidebarOptions.isOpen]);

    useEffect(() => {
        setHeaderContent({
            left: (<></>),
            middle: (
                <Box
                    aria-label={"community page search"}
                    width={["sm", "md", "lg"]}
                    maxWidth={["xl"]}
                >
                    <CommandCenter />
                </Box>
            ),
            right: (<></>)
        })
    }, [setHeaderContent]);

    return (
        <>
            {children}
        </>
    )
}