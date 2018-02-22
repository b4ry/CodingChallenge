import { DrawService } from "../../services/draw.service";

export class CountdownTimer {    
  public amount: number;
  public isDrawToday: boolean;
  public secondRemainingToDraw: number;
  
  constructor(private drawService: DrawService) 
  {
    this.amount = 3;
    this.isDrawToday = false;
    this.secondRemainingToDraw = 4316;
  }
}