import { Draw } from "./draw.model";

export interface IDrawClosingTime {
    Draws: Draw[];
    ErrorInfo: string;
    Success: boolean;
}