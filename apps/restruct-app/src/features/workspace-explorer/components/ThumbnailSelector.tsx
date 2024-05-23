import { FC, PropsWithChildren } from "react";
import { ThumbnailImage, ThumbnailMore, ThumbnailPlaceholder } from "../components";

export const ThumbnailSelector: FC<PropsWithChildren<{
    data: any;
    outlineColor?: string;
    outlineRadius?: number;
    outlineWidth?: number;
}>> = ({
    children,
    data,
    outlineColor,
    outlineRadius,
    outlineWidth
}) => {
    if (data instanceof Array && data.length > 1) {
        return (
            <ThumbnailMore
                outlineRadius={outlineRadius}
                count={data.length}
            />
        )
    }
    if (data instanceof Object) {
        return (
            <ThumbnailImage
                outlineRadius={outlineRadius}
                url={data.coverUrl}
            >
                {children}
            </ThumbnailImage>
        )
    }
    if (data instanceof Array && data.length === 1) {
        return (
            <ThumbnailImage
                outlineRadius={outlineRadius}
                url={data?.at(0).coverUrl}
            >
                {children}
            </ThumbnailImage>
        )
    }
    return (
        <ThumbnailPlaceholder
            outlineColor={outlineColor}
            outlineWidth={outlineWidth}
            outlineRadius={outlineRadius}
        />
    )
}