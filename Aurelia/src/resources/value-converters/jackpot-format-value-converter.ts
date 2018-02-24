export class JackpotFormatValueConverter {
    public toView(value): string {
        let suffix: string = "";
        let jackpotStringValue: string = "";

        if (value) {
            if (value >= 1000000) {
                suffix = "m";
                jackpotStringValue = Math.round(value / 1000000.00).toString();
            } else {
                suffix = "k";
                jackpotStringValue = Math.round(value / 1000.00).toString();
            }
        }

        return jackpotStringValue + suffix;
    }
  }