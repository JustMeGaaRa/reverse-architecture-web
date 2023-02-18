export type HtmlElementText = () => string;

function collectChildren(children: HtmlElementText[]): string {
    return children && children.map((c) => c()).join("");
}

export function div(
    style: Partial<{ textAlign: string }>,
    ...children: HtmlElementText[]
): HtmlElementText {
    return () =>
        `<div style="text-align: ${style.textAlign}">${
            collectChildren(children)
        }</div>`;
}


export function bold(...children: HtmlElementText[]): HtmlElementText {
    return () => `<b>${collectChildren(children)}</b>`;
}

export function font(
    style: Partial<{ fontSize: number, fontColor: string }>,
    ...children: HtmlElementText[]
): HtmlElementText {
    return () =>
        `<font style="font-size: ${style.fontSize}px; color=${style.fontColor}">${
            collectChildren(children)
        }</font>`;
}

export function br(): HtmlElementText {
    return () => `<br>`;
}

export function text(text: string): HtmlElementText {
    return () => text;
}

export function none(): HtmlElementText {
    return () => "";
}

export function html(...children: HtmlElementText[]) {
    return {
        toHtml: () => `${collectChildren(children)}`
    };
}
