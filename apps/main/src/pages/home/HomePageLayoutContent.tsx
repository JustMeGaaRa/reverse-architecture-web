import { Box, Icon } from "@chakra-ui/react";
import {
    Route,
    RouteList,
    CommandCenter,
    ReverseArchitectureSvg,
    PageHomeButton,
    usePageSidebar,
    usePageHeader,
    SearchGroupResult
} from "@reversearchitecture/ui";
import {
    BellNotification,
    HelpCircle,
    HomeSimple,
    Internet,
    Page,
    Settings,
} from "iconoir-react";
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSearch } from "../../features";

export const HomePageLayoutContent: FC<PropsWithChildren> = ({ children }) => {
    const { sidebarOptions, setShowSidebarButton, setSidebarContent } = usePageSidebar();
    const { setHeaderContent } = usePageHeader();
    const navigate = useNavigate();

    // reset sidebar and header content
    useEffect(() => {
        setSidebarContent({
            logo: (<></>),
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

    // header section
    const [ results, setResults ] = useState<SearchGroupResult[]>([]);
    const { onSearch } = useSearch();

    const handleOnSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {

        onSearch(event.target.value)
            .then((results) => {
                setResults(results);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [onSearch]);

    useEffect(() => {
        setHeaderContent({
            middle: (
                <Box aria-label={"community page search"} width={["sm", "md", "lg"]}>
                    <CommandCenter
                        searchResults={results}
                        onChange={handleOnSearchChange}
                    />
                </Box>
            ),
        })
    }, [setHeaderContent, handleOnSearchChange, results]);

    return (<>{children}</>)
}