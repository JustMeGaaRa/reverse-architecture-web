import { FC } from "react";

export type ButtonGroupProps = React.SVGProps<SVGElement> & {
    x?: number;
    y?: number;
    height?: number;
    width?: number;
    scale?: number;
    backgroundColor?: string;
    color?: string;
    onMouseOver?: (event: React.MouseEvent<SVGSVGElement>) => void;
    onMouseOut?: (event: React.MouseEvent<SVGSVGElement>) => void;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({
    children,
    x = 0,
    y = 0,
    height = 30,
    width = 30,
    scale = 1,
    backgroundColor = "white",
    color = "black",
    onMouseOver,
    onMouseOut,
}) => {
    return (
        <g
            className={"structurizr__button-group"}
            transform={`translate(${x},${y}) scale(${scale})`}
            color={color}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
        >
            <rect
                cursor={"pointer"}
                fill={backgroundColor}
                height={height}
                width={width}
                rx={7}
                ry={7}
            />
            {children}
        </g>
    );
};
