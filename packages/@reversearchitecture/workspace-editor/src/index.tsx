import Editor, { Monaco } from "@monaco-editor/react";
import { StructurizrLanguage } from "@monaco-editor/structurizr";
import { FC, useCallback, useRef } from "react";

export const WorkspaceEditor: FC<{
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
    }, []);
    
    return (
        <>
            <Editor
                height={"100%"}
                theme={"vs-dark"}
                defaultLanguage={"structurizr-dsl"}
                value={value}
                options={{
                    minimap: { enabled: false },
                    autoClosingBrackets: "always",
                    autoClosingQuotes: "always",
                    padding: { top: 16, bottom: 16 },
                    fontLigatures: true
                }}
                onMount={handleOnMount}
                onChange={(value, event) => onChange && onChange(value)}
            />
        </>
    )
}