import { Box } from "@chakra-ui/react";
import {
    Route,
    RouteList,
    Search,
    ReverseArchitectureSvg,
    PageHomeButton,
    usePageSidebar,
    usePageHeader
} from "@reversearchitecture/ui";
import {
    AddPageAlt,
    BellNotification,
    HelpCircle,
    HomeSimple,
    Internet,
    MultiplePagesEmpty,
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
                        icon={<HomeSimple />}
                        isDisabled
                        title={"Dashboard"}
                        to={"dashboard"}
                    />
                    <Route
                        icon={<MultiplePagesEmpty />}
                        title={"Workspaces"}
                        to={"workspaces"}
                    />
                    <Route
                        icon={<Internet />}
                        title={"Community"}
                        to={"community"}
                    />
                </RouteList>
            ),
            middle: (<></>),
            bottom: (
                <RouteList>
                    <Route
                        icon={<BellNotification />}
                        isDisabled
                        title={"Notifications"}
                        to={"notifications"}
                    />
                    <Route
                        icon={<Settings />}
                        title={"Settings"}
                        to={"settings"}
                    />
                    <Route
                        icon={<HelpCircle />}
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
                    key={"community-page-search"}
                    width={["sm", "md", "lg"]}
                    maxWidth={["xl"]}
                >
                    <Search />
                </Box>
            )
        })
    }, [setHeaderContent]);

    return (
        <>
            {children}
        </>
    )
}