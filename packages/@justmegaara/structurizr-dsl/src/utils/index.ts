export function line(line: string) {
    return  line ? `${line}\n` : ""; 
}

export function indent(text: string) {
    return text
        .split('\n')
        .map(line => `\t${line}`)
        .join('\n');
}