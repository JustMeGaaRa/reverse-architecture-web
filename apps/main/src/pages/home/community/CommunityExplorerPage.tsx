import {
    Box,
    Button,
    Divider,
    Flex,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    StackDivider,
    Tag,
    TagLabel
} from "@chakra-ui/react";
import {
    Shell,
    ShellBody,
    ShellHeader,
    ShellTitle,
    useSnackbar
} from "@restruct/ui";
import { IWorkspaceInfo } from "@structurizr/y-workspace";
import {
    Compass,
    FireFlame,
    NavArrowDown,
    SunLight
} from "iconoir-react";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    CommunityTemplateExplorer,
    CommunityApi,
    useWorkspaceExplorer,
    useLoaderState,
    CommunityTemplateModal,
} from "../../../features";
import { HomeNavigationActions } from "../HomeNavigationActions";
import { CommunityExplorerActions } from "./CommunityExplorerActions";

export const CommunityExplorerPage: FC<PropsWithChildren> = () => {
    const navigate = useNavigate();
    const [ queryParams, setQueryParam ] = useSearchParams();
    const { snackbar } = useSnackbar();
    const { clone } = useWorkspaceExplorer();
    const [ filters, setFitlers ] = useState({ category: undefined, tag: undefined });
    
    const handleOnFilterChange = useCallback((category: string, tag: string) => {
        setFitlers({ category, tag });
    }, []);
    
    const handleOnClickWorkspacePreview = useCallback((workspace: IWorkspaceInfo) => {
        setQueryParam({ preview: workspace.workspaceId });
    }, [setQueryParam]);

    const handleOnClickWorskapceTryOut = useCallback((workspace: IWorkspaceInfo) => {
        const communityApi = new CommunityApi();
        communityApi.getWorkspaceById(workspace.workspaceId)
            .then(workspace => {
                // const clonedWorkspace = clone(workspace);
                // navigate(`/workspaces/${clonedWorkspace.workspaceId}`);
            })
            .catch(error => {
                snackbar({
                    title: "Error cloning workspace",
                    description: error.message,
                    status: "error"
                })
            });
    }, [clone, navigate, snackbar]);

    const handleOnClickTemplateModalClose = useCallback(() => {
        setQueryParam({});
    }, [setQueryParam]);

    return (
        <Shell>
            <HomeNavigationActions />
            <CommunityExplorerActions />

            <ShellHeader>
                <ShellTitle title={"Community"} />
            </ShellHeader>

            <Divider />

            <ShellBody>
                <Flex direction={"column"} height={"100%"}>
                    <Box flexBasis={"80px"} flexGrow={0} flexShrink={0} padding={6}>
                        <CommunityTemplateFilters onFilterChange={handleOnFilterChange} />
                    </Box>
                    <Box flexGrow={1} overflowY={"scroll"} padding={6}>
                        <CommunityTemplateExplorer
                            filters={filters}
                            onClick={handleOnClickWorkspacePreview}
                            onTryIt={handleOnClickWorskapceTryOut}
                        />
                    </Box>
                </Flex>
            </ShellBody>

            <CommunityTemplateModal
                workspaceId={queryParams.get("preview")}
                isOpen={!!queryParams.get("preview")}
                onClose={handleOnClickTemplateModalClose}
            />
        </Shell>
    );
}

export const CommunityTemplateFilters: FC<{
    onFilterChange: (category: string, tag: string) => void;
}> = ({
    onFilterChange
}) => {
    const categories = useMemo(() => {
        return [
            { tag: "Explore", icon: <Compass /> },
            { tag: "New", icon: <SunLight /> },
            { tag: "Popular", icon: <FireFlame /> }
        ];
    }, []);
    const [ selectedCategory, setSelectedCategory ] = useState(categories.at(0));
    const [ filterTags, setFilterTags ] = useState([]);
    const [ selectedTag, setSelectedTag ] = useState("");

    const [ isLoading, onStartLoading, onStopLoading ] = useLoaderState({ isLoading: true });

    useEffect(() => {
        const communityApi = new CommunityApi();
        const controller = new AbortController();
        onStartLoading();

        communityApi.getFilterTags()
            .then(tags => {
                setFilterTags(tags);
                onStopLoading();
            })
            .catch(error => {
                console.error(error);
                onStopLoading();
            });

        return () => {
            controller.abort();
        }
    }, [onStartLoading, onStopLoading]);

    const handleOnClickCategory = useCallback((filter: CategoryItem) => {
        setSelectedCategory(filter);
        onFilterChange(filter.tag, selectedTag);
    }, [onFilterChange, selectedTag]);

    const handleOnClickFilter = useCallback((tag: string) => {
        setSelectedTag(selected => selected === tag ? "" : tag);
        onFilterChange(selectedCategory.tag, tag);
    }, [onFilterChange, selectedCategory.tag]);

    return (
        <HStack
            divider={
                <StackDivider
                    borderColor={"gray.400"}
                    height={"24px"}
                    alignSelf={"center"}
                />
            }
            gap={2}
            overflowX={"hidden"}
        >
            <CategoryDropdown selectedCategory={selectedCategory}>
                {categories.map((category) => (
                    <CategoryDropdownItem
                        key={category.tag}
                        category={category}
                        onSelect={handleOnClickCategory}
                    />
                ))}
            </CategoryDropdown>
            {!isLoading && filterTags?.length > 0 && (
                <FilterList>
                    {filterTags.map((tag) => (
                        <FilterItem
                            key={tag}
                            title={tag}
                            isSelected={selectedTag === tag}
                            onClick={handleOnClickFilter}
                        />
                    ))}
                </FilterList>
            )}
        </HStack>
    )
}

export const FilterList: FC<PropsWithChildren<{
    size?: "sm" | "md" | "lg";
    variant?: "tonal" | "unstyled";
}>> = ({
    children,
    size,
    variant,
}) => {
    return (
        <HStack>
            {children}
        </HStack>
    )
}

export const FilterItem: FC<{
    title: string;
    isSelected?: boolean;
    onClick: (name: string) => void;
}> = ({
    title,
    isSelected,
    onClick
}) => {
    const capitalize = (caption: string) => {
        return caption.charAt(0).toUpperCase() + caption.toLowerCase().slice(1);
    }

    const handleOnClickTag = useCallback(() => {
        onClick(title);
    }, [onClick, title]);

    return (
        <Tag
            data-group
            key={title}
            aria-selected={isSelected}
            onClick={handleOnClickTag}
        >
            <TagLabel aria-selected={isSelected}>
                {capitalize(title)}
            </TagLabel>
        </Tag>
    )
}

type CategoryItem = { tag: string; icon: any; }

export const CategoryDropdown: FC<PropsWithChildren<{
    selectedCategory?: CategoryItem;
    size?: "sm" | "md" | "lg";
    variant?: "tonal" | "unstyled";
    width?: string;
}>> = ({
    children,
    selectedCategory,
    size,
    variant,
    width
}) => {
    return (
        <Menu closeOnBlur closeOnSelect>
            <MenuButton
                as={Button}
                leftIcon={selectedCategory?.icon}
                rightIcon={<NavArrowDown />}
                size={size ?? "sm"}
                textAlign={"left"}
                variant={variant ?? "tonal"}
                width={width ?? "auto"}
            >
                {selectedCategory?.tag}
            </MenuButton>
            <MenuList>
                {children}
            </MenuList>
        </Menu>
    )
}

export const CategoryDropdownItem: FC<{
    category: CategoryItem;
    onSelect: (category: CategoryItem) => void;
}> = ({
    category,
    onSelect
}) => {
    const handleOnClickManuItem = useCallback(() => {
        onSelect(category);
    }, [onSelect, category]);

    return (
        <MenuItem
            icon={category.icon}
            onClick={handleOnClickManuItem}
        >
            {category.tag}
        </MenuItem>
    )
}