import Editor, { Monaco } from "@monaco-editor/react";
import { FC, useCallback, useRef } from "react";
import { StructurizrLanguage } from "./StructurizrLanguage";

export const StructurizrEditor: FC<{
    value: string,
    onChange?: (value: string) => void,
}> = ({
    value,
    onChange
}) => {
    const monacoRef = useRef();

    const handleOnMount = useCallback((editor: any, monaco: Monaco) => {
        monacoRef.current = editor;
        monaco.languages.register({ id: "structurizr-dsl" });
        monaco.languages.setMonarchTokensProvider("structurizr-dsl", StructurizrLanguage);
        monaco.editor.defineTheme("reverse-architecture", {
            base: "vs-dark",
            inherit: true,
            rules: [],
            colors: {
                "editor.background": "#1D1F20"
            },
        })
    }, []);
    
    return (
        <>
            <Editor
                height={"100%"}
                theme={"reverse-architecture"}
                defaultLanguage={"structurizr-dsl"}
                value={value}
                options={{
                    minimap: { enabled: false },
                    autoClosingBrackets: "always",
                    autoClosingQuotes: "always",
                    padding: { top: 16, bottom: 16 },
                    fontLigatures: true,
                    scrollbar: { verticalScrollbarSize: 4 },
                    wordWrap: "off",
                    theme: "reverse-architecture",
                }}
                onMount={handleOnMount}
                onChange={(value, event) => onChange?.(value)}
            />
        </>
    )
}