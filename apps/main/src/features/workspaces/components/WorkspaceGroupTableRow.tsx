import { AspectRatio, Box, Flex, Icon, IconButton, Td, Tr } from "@chakra-ui/react";
import { MediaImage, MoreHoriz } from "iconoir-react";
import { FC } from "react";
import { useSelectionItem } from "../hooks";
import { TableColumnInfo, WorkspaceGroupInfo } from "../types";

export const WorkspaceGroupTableRow: FC<{
    group: WorkspaceGroupInfo;
    columns: TableColumnInfo[];
    onClick?: () => void;
}> = ({
    group,
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
                            <Icon
                                as={MediaImage}
                                color={"whiteAlpha.700"}
                                fontSize={24}
                                strokeWidth={1}
                            />
                        </Flex>
                    </Box>
                </AspectRatio>
            </Td>
            {columns.map(({ name }) => (
                <Td key={name}>
                    {group[name]}
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