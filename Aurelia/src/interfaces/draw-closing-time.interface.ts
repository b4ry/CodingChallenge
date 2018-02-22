import { Draw } from "./draw.interface";

export interface DrawClosingTime {
    Draws: Draw[],
    ErrorInfo: string,
    Success: boolean
}