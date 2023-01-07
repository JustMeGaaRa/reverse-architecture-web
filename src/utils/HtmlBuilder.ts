export type HtmlElementText = () => string;

function collectChildren(children: HtmlElementText[]): string {
    return children && children.map((c) => c()).join("");
}

export function bold(...children: HtmlElementText[]): HtmlElementText {
    return () => `<b>${collectChildren(children)}</b>`;
}

export function font(
    style: { fontSize: number },
    ...children: HtmlElementText[]
): HtmlElementText {
    return () =>
        `<font style="font-size: ${style.fontSize}px">${
            collectChildren(children)
        }</font>`;
}

export function br(): HtmlElementText {
    return () => `<br>`;
}

export function text(text: string): HtmlElementText {
    return () => text;
}

export function html(...children: HtmlElementText[]) {
    return {
        toHtml: () => `${collectChildren(children)}`
    };
}
