export interface LabelProperties {
    labelPlacement: LabelPlacement;
    where: unknown;
    labelExpression: string;
    useCodedValues: boolean;
    symbol: TextSymbol;
    minScale: number;
    maxScale: number;
}

type LabelPlacement = "above-right";

interface TextSymbol {
    type: SymbolType;
    color: Color;
    backgroundColor: unknown;
    borderLineColor: unknown;
    borderLineSize: unknown;
    verticalAlignment: VerticalAlignment;
    horizontalAlignment: HorizontalAlignment;
    rightToLeft: boolean;
    angle: number;
    xoffset: number;
    yoffset: number;
    kerning: boolean;
    haloColor: unknown;
    haloSize: unknown;
    font: Font;
}

type SymbolType = "text";

type Color = [number, number, number, number];

type VerticalAlignment = "bottom";

type HorizontalAlignment = "center";

interface Font {
    family: string;
    size: number;
    style: FontStyle;
    weight: FontWeight;
    decoration: FontDecoration;
}

type FontStyle = "normal";
type FontWeight = "normal";
type FontDecoration = "none";
