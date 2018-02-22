export interface Draw {
    ProductId: string,
    DrawNumber: number,
    DrawDisplayName: string,
    DrawDate: Date,
    DrawLogoUrl: string,
    DrawType: string,
    Div1Amount: number,
    IsDiv1Estimated: boolean,
    IsDiv1Unknown: boolean,
    DrawCloseDateTimeUTC: Date,
    DrawEndSellDateTimeUTC: Date,
    DrawCountDownTimerSeconds: number
}