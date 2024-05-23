import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    MarkerArrowClosed,
    MarkerCircleOutline
} from "./components";
import {
    IViewMetadata,
    ViewMetadataProvider
} from "./ViewMetadataProvider";
import {
    ViewportProvider,
    useViewport
} from "./ViewportProvider";

function getPointFromEvent(event: any) {
    var point = { x: 0, y: 0 };
    // If event is triggered by a touch event, we get the position of the first finger
    if (event.targetTouches) {
        point.x = event.targetTouches[0].clientX;
        point.y = event.targetTouches[0].clientY;
    }
    else {
        point.x = event.clientX;
        point.y = event.clientY;
    }

    return point;
}

export const Viewport: FC<PropsWithChildren> = ({ children }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [isPointerDown, setIsPointerDown] = useState(false);
    const [pointerOrigin, setPointerOrigin] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const { zoom, viewbox, setZoom, setViewbox } = useViewport();

    useEffect(() => {
        if (!svgRef.current) return;

        const element = svgRef.current;
        const resizeObserver = new ResizeObserver((entries) => {
            if (entries.length === 0) return;

            const target = entries.at(0);
            setViewbox((prev) => ({
                ...prev,
                height: target.contentRect.height,
                width: target.contentRect.width,
            }));
        });
        resizeObserver.observe(element);

        return () => {
            resizeObserver.unobserve(element);
            resizeObserver.disconnect();
        };
    }, [setViewbox, svgRef]);

    const handleOnPointerDown = useCallback((event: any) => {
        const pointerTarget = getPointFromEvent(event);
        setIsPointerDown(true);
        setPointerOrigin(pointerTarget);
    }, []);

    const handleOnPointerUp = useCallback((event: any) => {
        setIsPointerDown(false);
    }, []);

    const handleOnPointerMove = useCallback((event: any) => {
        if (!isPointerDown || !svgRef.current) return;

        event.preventDefault();
        const pointerTarget = getPointFromEvent(event);

        setViewbox((prev) => ({
            ...prev,
            x: prev.x - (pointerTarget.x - pointerOrigin.x) * zoom,
            y: prev.y - (pointerTarget.y - pointerOrigin.y) * zoom,
        }));
        setPointerOrigin(pointerTarget);
    }, [isPointerDown, setViewbox, pointerOrigin.x, pointerOrigin.y, zoom]);

    const handleOnWheel = useCallback((event: any) => {
        if (!svgRef?.current) return;

        event.preventDefault();
        const zoomIntensity = 0.1;
        const scale = Math.pow(1 + zoomIntensity, event.deltaY / 100);

        // Get cursor position relative to the SVG element
        const rect = svgRef.current.getBoundingClientRect();
        const cursorX = event.clientX - rect.left;
        const cursorY = event.clientY - rect.top;

        // Calculate new viewBox dimensions
        const newWidth = viewbox.width * scale;
        const newHeight = viewbox.height * scale;
        const newX = viewbox.x + (cursorX - viewbox.x) * (1 - scale);
        const newY = viewbox.y + (cursorY - viewbox.y) * (1 - scale);

        // Update viewBox with new values
        setViewbox({ x: newX, y: newY, width: newWidth, height: newHeight });
        setZoom((zoom) => zoom * scale);
    }, [setViewbox, setZoom, viewbox.height, viewbox.width, viewbox.x, viewbox.y]);

    return (
        <svg
            ref={svgRef}
            id={"structurizr-svg"}
            cursor={"grab"}
            height={"100%"}
            width={"100%"}
            style={{
                backgroundColor: "#292B2C",
                position: "absolute",
                top: "0px",
                left: "0px",
            }}
            viewBox={`${viewbox.x} ${viewbox.y} ${viewbox.width} ${viewbox.height}`}
            onMouseDown={handleOnPointerDown}
            onMouseUp={handleOnPointerUp}
            onMouseMove={handleOnPointerMove}
            onTouchStart={handleOnPointerDown}
            onTouchEnd={handleOnPointerUp}
            onTouchMove={handleOnPointerMove}
            onWheel={handleOnWheel}
        >
            <defs>
                <MarkerArrowClosed />
                <MarkerCircleOutline />
            </defs>
            <g transform={`scale(${scale})`}>
                {children}
            </g>
        </svg>
    );
};

export const Views: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ViewportProvider>
            <Viewport>
                {children}
            </Viewport>
        </ViewportProvider>
    );
};

export const SystemLandscapeView: FC<PropsWithChildren<{
    value?: { key?: string };
    metadata?: IViewMetadata;
}>> = ({
    children,
    value,
    metadata
}) => {
    return (
        <ViewMetadataProvider metadata={metadata}>
            {children}
        </ViewMetadataProvider>
    );
};

export const ContainerView: FC<PropsWithChildren<{
    value?: { key?: string };
    metadata?: IViewMetadata;
}>> = ({
    children,
    value,
    metadata
}) => {
    return (
        <ViewMetadataProvider metadata={metadata}>
            {children}
        </ViewMetadataProvider>
    );
};

export const ComponentView: FC<PropsWithChildren<{
    value?: { key?: string };
    metadata?: IViewMetadata;
}>> = ({
    children,
    value,
    metadata
}) => {
    return (
        <ViewMetadataProvider metadata={metadata}>
            {children}
        </ViewMetadataProvider>
    );
};

export const DeploymentView: FC<PropsWithChildren<{
    value: { key?: string; environment: string };
    metadata?: IViewMetadata;
}>> = ({
    children,
    value,
    metadata
}) => {
    return (
        <ViewMetadataProvider metadata={metadata}>
            {children}
        </ViewMetadataProvider>
    );
};
