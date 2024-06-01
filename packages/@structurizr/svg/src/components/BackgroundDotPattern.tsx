import { FC } from "react";
import { BackgroundType } from "./BackgroundType";

export const BackgroundDotPattern: FC<{
    fill?: string;
}> = ({
    fill = "#91919a"
}) => {
    return (
        <pattern id={BackgroundType.Dot} viewBox={"0 0 100 100"} height={1} width={1}>
            <circle cx="0.5" cy="0.5" r="0.5" fill={fill} />
        </pattern>
    )
}