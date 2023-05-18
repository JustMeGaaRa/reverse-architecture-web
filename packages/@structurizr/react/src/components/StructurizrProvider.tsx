import { createContext } from "react"

export interface IStructurizrContext {
    text: string;
}

export const StructurizrContext = createContext<IStructurizrContext>({
    text: ""
})

export const StructurizrProvider = StructurizrContext.Provider;