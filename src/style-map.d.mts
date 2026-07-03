export interface CharStyleLike {
  fontName: { family: string; style: string };
  fontSize: number;
}

export function isUniformStyle<T extends CharStyleLike>(styles: T[]): boolean;
export function mapSegmentStyles<T extends CharStyleLike>(segStyles: T[], oldSeg: string, newSeg: string): T[];
export function mapStylesToNewLength<T extends CharStyleLike>(styles: T[], oldText: string, newText: string): T[];
