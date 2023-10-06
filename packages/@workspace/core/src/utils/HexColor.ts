export class HexColor {
    constructor(
        public readonly hex: string,
    ) { }

    static withAlpha(hex: string, alpha: number): string {
        const opacity = Math.round(Math.min(Math.max(alpha || 1, 0), 1) * 255);
        return hex + opacity.toString(16).toUpperCase()
    }
}