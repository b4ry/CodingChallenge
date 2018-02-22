 export class CountdownFormatValueConverter {
    private secondToMinute: number = 60;
    private secondToHours: number = 3600;

    toView(remainingSeconds) {
        let seconds: number = 0;
        let minutes: number = 0;
        let hours: number = 0;

        if (this.isAtLeastAMinute(remainingSeconds)) {
            if (this.isAtLeastAnHour(remainingSeconds)) {
                hours = this.extractRemaingHours(remainingSeconds);
                remainingSeconds = this.updateRemainingSeconds(remainingSeconds, hours);
                minutes = this.extractRemainingMinutes(remainingSeconds);
                seconds = this.extractRemainingSeconds(remainingSeconds);
            } else {
                minutes = this.extractRemainingMinutes(remainingSeconds);
                seconds = this.extractRemainingSeconds(remainingSeconds);
            }
        } else {
            seconds = remainingSeconds;
        }

        return hours + " hrs " + minutes + " min " + seconds + " secs";
    }

    private isAtLeastAMinute(totalSeconds: number){
        return totalSeconds > this.secondToMinute;
    }
    
    private isAtLeastAnHour(totalSeconds: number){
        return totalSeconds > this.secondToHours;
    }

     private extractRemainingSeconds(remainingSeconds: any): number {
         return remainingSeconds % this.secondToMinute;
     }

     private extractRemainingMinutes(remainingSeconds: any): number {
         return Math.floor(remainingSeconds / this.secondToMinute);
     }

     private extractRemaingHours(remainingSeconds: any): number {
         return Math.floor(remainingSeconds / this.secondToHours);
     }

     private updateRemainingSeconds(remainingSeconds: any, hours: number): number {
         return remainingSeconds - hours * this.secondToHours;
     }
  }