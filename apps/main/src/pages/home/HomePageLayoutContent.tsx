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
    CommandCenter,
    ReverseArchitectureSvg,
    PageHomeButton,
    usePageSidebar,
    usePageHeader,
    SearchGroupResult
} from "@reversearchitecture/ui";
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSearch } from "../../features";

export const HomePageLayoutContent: FC<PropsWithChildren> = ({ children }) => {
    const { setShowSidebarButton, setSidebarContent } = usePageSidebar();
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
                    icon={ReverseArchitectureSvg}
                    title={"RE:STRUCT"}
                    onClick={() => navigate("/")}
                />
            ),
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