import {
    createContext,
    FC,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState,
} from "react";

export type Viewbox = { x: number; y: number; height: number; width: number };

export const ViewportContext = createContext<{
    zoom: number;
    viewbox: Viewbox;
    setZoom: React.Dispatch<SetStateAction<number>>;
    setViewbox: React.Dispatch<SetStateAction<Viewbox>>;
}>({
    zoom: 1,
    viewbox: {
        x: 0,
        y: 0,
        height: 1000,
        width: 1000,
    },
    setZoom: () => {},
    setViewbox: () => {},
});

export const ViewportProvider: FC<PropsWithChildren> = ({ children }) => {
    const [zoom, setZoom] = useState<number>(1);
    const [viewbox, setViewbox] = useState<Viewbox>({
        x: 0,
        y: 0,
        height: 1000,
        width: 1000,
    });

    return (
        <ViewportContext.Provider value={{ zoom, viewbox, setZoom, setViewbox }}>
            {children}
        </ViewportContext.Provider>
    );
};

export const useViewport = () => {
    return useContext(ViewportContext);
};
