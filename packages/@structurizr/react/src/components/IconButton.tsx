import { FC, useCallback, useState } from "react";

export const IconButton: FC<{
    icon: JSX.Element;
    onHover?: (event: React.MouseEvent<SVGSVGElement>) => void;
    onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
}> = ({
    icon,
    onHover,
    onClick,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleOnMouseOver = useCallback((event: React.MouseEvent<SVGSVGElement>) => {
        setIsHovered(true);
        onHover?.(event);
    }, [onHover]);

    const handleOnMouseOut = useCallback((event: React.MouseEvent<SVGSVGElement>) => {
        setIsHovered(false);
    }, []);

    return (
        <g
            className={"structurizr__icon-button"}
            cursor={"pointer"}
            onMouseOver={handleOnMouseOver}
            onMouseOut={handleOnMouseOut}
            onClick={onClick}
        >
            {icon}
        </g>
    );
};
