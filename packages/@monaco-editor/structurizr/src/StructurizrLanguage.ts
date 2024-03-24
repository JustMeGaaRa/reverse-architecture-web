import { languages } from "monaco-editor/esm/vs/editor/editor.api";

export const StructurizrLanguage: languages.IMonarchLanguage = {
    // Set the default token type
    defaultToken: "invalid",

    // Define the language's keywords
    keywords: [
        "workspace",
        "model",
        "group",
        "person",
        "softwareSystem",
        "container",
        "component",
        "deploymentEnvironment",
        "deploymentGroup",
        "deploymentNode",
        "infrastructureNode",
        "softwareSystemInstance",
        "containerInstance",
        "healthCheck",
        "element",
        "relationship",
        "tags",
        "description",
        "technology",
        "instances",
        "url",
        "properties",
        "perspectives",
        "views",
        "systemLandscape",
        "systemContext",
        "filtered",
        "dynamic",
        "deployment",
        "custom",
        "image",
        "include",
        "exclude",
        "autoLayout",
        "default",
        "animation",
        "title",
        "styles",
        "thickness",
        "color",
        "colour",
        "style",
        "routing",
        "fontSize",
        "position",
        "opacity",
        "shape",
        "icon",
        "width",
        "height",
        "background",
        "stroke",
        "strokeWidth",
        "border",
        "metadata",
        "theme",
        "themes",
        "branding",
        "terminology",
        "configuration",
        "users"
    ],

    // Define the tokenizer
    tokenizer: {
        root: [
            // identifiers and keywords
            [
                /[a-zA-Z_$][\w$]*/,
                { cases: { "@keywords": "keyword", "@default": "identifier" } }
            ],

            // whitespace
            { include: "@whitespace" },

            // strings
            [/"([^"\\]|\\.)*$/, "string.invalid"], // non-terminated string
            [/"/, "string", "@string"],

            // comments
            [/(\/\/).*/, "comment"]
        ],

        whitespace: [
            [/[ \t\r\n]+/, ""],
            [/\/\*/, "comment", "@comment"]
        ],

        comment: [
            [/\*\//, "comment", "@pop"],
            [/[^/*]+/, "comment"],
            [/[/\*]/, "comment"],
            [/#[^\n\r]*/, "comment"]
        ],

        string: [
            [/[^\\"]+/, "string"],
            [/"/, "string", "@pop"]
        ]
    }
};
