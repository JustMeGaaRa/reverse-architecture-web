import { IElement, IRelationship, Relationship, Technology } from "@structurizr/dsl";
import { EdgeStyle, NodeStyle } from "./types";

export class ElementHtmlUtils {
    static elementHtmlBuilder(element: IElement) {
        const htmlObject = html(
            font(
                { fontSize: 16 },
                bold(text("%c4Name%"))
            ),
            div(
                { textAlign: "center" },
                element.technology
                    ? text("[%c4Type%: %c4Technology%]")
                    : text("[%c4Type%]")
            ),
            br(),
            div(
                { textAlign: "center" },
                font(
                    { fontSize: 11, fontColor: "#cccccc" },
                    text("%c4Description%"),
                )
            )
        );
        return htmlObject.toHtml();
    }

    static scopeHtmlBuilder(element: { technology?: Technology[] }) {
        const htmlObject = html(
            font(
                { fontSize: 16 },
                bold(
                    div(
                        { textAlign: "left" },
                        text("%c4Name%")
                    )
                )
            ),
            div(
                { textAlign: "left" },
                element.technology
                    ? text("[%c4Application%: %c4Technology%]")
                    : text("[%c4Application%]")
            )
        );
        return htmlObject.toHtml();
    }

    static relationshipHtmlBuilder(rel: IRelationship) {
        const htmlObject = html(
            div(
                { textAlign: "left" },
                rel.description
                    ? div({ textAlign: "center" }, bold(text("%c4Description%")))
                    : none(),
                rel.technology
                    ? div({ textAlign: "center" }, text("[%c4Technology%]"))
                    : none()
            )
        );
        return htmlObject.toHtml();
    }
    
    static formatStyle<T>(style: Partial<T>) {
        const formatType = (value) => typeof value == "boolean" ? value ? "1" : "0" : value
        return Object.keys(style)
            .map(key => `${key}=${formatType(style[key])}`)
            .join(";");
    }

    static formatNodeStyle(style: Partial<NodeStyle>) {
        return ElementHtmlUtils.formatStyle(style);
    }

    static formatEdgeStyle(style: Partial<EdgeStyle>) {
        return ElementHtmlUtils.formatStyle(style);
    }
}

type HtmlElementText = () => string;

function collectChildren(children: HtmlElementText[]): string {
    return children && children.map((c) => c()).join("");
}

function div(
    style: Partial<{ textAlign: string }>,
    ...children: HtmlElementText[]
): HtmlElementText {
    return () =>
        `<div style="text-align: ${style.textAlign}">${
            collectChildren(children)
        }</div>`;
}


function bold(...children: HtmlElementText[]): HtmlElementText {
    return () => `<b>${collectChildren(children)}</b>`;
}

function font(
    style: Partial<{ fontSize: number, fontColor: string }>,
    ...children: HtmlElementText[]
): HtmlElementText {
    return () =>
        `<font style="font-size: ${style.fontSize}px; color=${style.fontColor}">${
            collectChildren(children)
        }</font>`;
}

function br(): HtmlElementText {
    return () => `<br>`;
}

function text(text: string): HtmlElementText {
    return () => text;
}

function none(): HtmlElementText {
    return () => "";
}

function html(...children: HtmlElementText[]) {
    return {
        toHtml: () => `${collectChildren(children)}`
    };
}