import { Draw } from "./draw.model";

export interface DrawClosingTime {
    Draws: Draw[],
    ErrorInfo: string,
    Success: boolean
}