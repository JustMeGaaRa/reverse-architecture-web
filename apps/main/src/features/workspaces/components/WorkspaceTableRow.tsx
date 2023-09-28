import { AspectRatio, Box, Flex, Icon, IconButton, Image, Td, Tr } from "@chakra-ui/react";
import { MediaImage, MoreHoriz } from "iconoir-react";
import { FC } from "react";
import { useSelectionItem } from "../hooks";
import { TableColumnInfo, WorkspaceInfo } from "../types";

export const WorkspaceTableRow: FC<{
    workspace: WorkspaceInfo;
    columns: TableColumnInfo[];
    onClick?: () => void;
}> = ({
    workspace,
    columns,
    onClick
}) => {
    const { index, isSelected } = useSelectionItem();

    return (
        <Tr
            data-group
            backgroundColor={isSelected ? "whiteAlpha.200" : "transparent"}
            borderRadius={16}
            cursor={"pointer"}
            _hover={{ background: "whiteAlpha.100" }}
            onClick={onClick}
        >
            <Td width={12}>
                <AspectRatio ratio={2/1}>
                    <Box
                        backgroundColor={"whiteAlpha.100"}
                        borderColor={"transparent"}
                        borderRadius={12}
                        height={"100%"}
                        width={"100%"}
                        overflow={"hidden"}
                        _groupHover={{
                            borderColor: "yellow.900",
                            borderWidth: 2,
                            padding: 1,
                        }}
                    >
                        
                        <Flex
                            backgroundColor={"whiteAlpha.100"}
                            borderRadius={10}
                            alignItems={"center"}
                            justifyContent={"center"}
                            overflow={"hidden"}
                            height={"100%"}
                            width={"100%"}
                        >
                            {workspace.coverUrl && (
                                <Image
                                    alt={"workspace preview image"}
                                    src={workspace.coverUrl}
                                    transitionProperty={"all"}
                                    transitionDuration={"0.3s"}
                                    transitionTimingFunction={"ease"}
                                    _groupHover={{ transform: "scale(2)" }}
                                />
                            )}
                            
                            {!workspace.coverUrl && (
                                <Icon
                                    as={MediaImage}
                                    color={"whiteAlpha.700"}
                                    fontSize={24}
                                    strokeWidth={1}
                                />
                            )}
                        </Flex>
                    </Box>
                </AspectRatio>
            </Td>
            {columns.map(({ name }) => (
                <Td key={name}>
                    {workspace[name]}
                </Td>
            ))}
            <Td width={12}>
                <IconButton
                    aria-label={"more options"}
                    colorScheme={"gray"}
                    icon={<MoreHoriz />}
                    size={"sm"}
                    variant={"ghost"}
                    title={"more options"}
                />
            </Td>
        </Tr>
    )
}