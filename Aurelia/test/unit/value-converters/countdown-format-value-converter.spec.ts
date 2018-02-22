import { CountdownFormatValueConverter } from "../../../src/resources/value-converters/countdown-format-value-converter";

describe('countdownFormatter value-converter', () => {
    
      let formatter: CountdownFormatValueConverter;

      beforeAll(() => {
        this.formatter = new CountdownFormatValueConverter();
      });
    
      it('must format output as 0 hrs 0 min xx secs when input is less than a minute', () => {
        let inputInSeconds: number = 3;
        let result: string = this.formatter.toView(inputInSeconds);

        expect(result).toEqual("0 hrs 0 min 3 secs");
      });      
    
      it('must format output as 0 hrs yy min xx secs when input is more than a minute and less than an hour', () => {
        let inputInSeconds: number = 90;
        let result: string = this.formatter.toView(inputInSeconds);

        expect(result).toEqual("0 hrs 1 min 30 secs");
      });
      
        it('must format output as zz hrs yy min xx secs when input is more than an hour', () => {
          let inputInSeconds: number = 3685;
          let result: string = this.formatter.toView(inputInSeconds);
  
          expect(result).toEqual("1 hrs 1 min 25 secs");
        });

    });