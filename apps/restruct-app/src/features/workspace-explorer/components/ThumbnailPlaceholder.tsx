import { Box } from "@chakra-ui/react";
import { FC } from "react";

export const ThumbnailPlaceholder: FC<{
    outlineColor?: string;
    outlineRadius?: number;
    outlineWidth?: number;
}> = ({
    outlineColor,
    outlineRadius,
    outlineWidth
}) => {
    return (
        <Box
            borderRadius={outlineRadius ?? 12}
            borderWidth={outlineWidth ?? 1}
            borderColor={outlineColor ?? "surface.white-tinted-5"}
            height={"100%"}
            width={"100%"}
            overflow={"hidden"}
            _active={{
                background: "linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%)"
            }}
            _groupActive={{
                background: "linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%)"
            }}
            _hover={{
                background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
            }}
            _groupHover={{
                background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
            }}
        >
            <svg height={"100%"} width={"100%"}>
                <pattern
                    id={"diagonal-lines"}
                    height={"10"}
                    width={"10"}
                    patternUnits={"userSpaceOnUse"}
                    patternTransform={"rotate(45)"}
                >
                    <line
                        x1={"0"}
                        y1={"0"}
                        x2={"0"}
                        y2={"10"}
                        strokeWidth={"2"}
                        stroke={"white"}
                        strokeOpacity={"0.05"}
                    />
                </pattern>
                <rect
                    height={"100%"}
                    width={"100%"}
                    fill={"url(#diagonal-lines)"}
                />
            </svg>
        </Box>
    )
}