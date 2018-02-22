import { JackpotFormatValueConverter } from "../../../src/resources/value-converters/jackpot-format-value-converter";


describe('jackpotFormater value-converter', () => {
    
      let formater: JackpotFormatValueConverter;

      beforeAll(() => {
        this.formater = new JackpotFormatValueConverter();
      });
    
      it('must suffix the formated value with m when input value is a million or more', () => {
        let input: number = 1000000;
        let result: string = this.formater.toView(input);

        expect(result.slice(-1)).toEqual('m');
      });
      
      it('must suffix the formated value with k when input value is under a million', () => {
        let input: number = 10000;
        let result: string = this.formater.toView(input);

        expect(result.slice(-1)).toEqual('k');
      });
          
      it('must format the input value as interger muliple of a milion when input is million of more', () => {
        let input: number = 1000000;
        let resultString: string = this.formater.toView(input);
        resultString = resultString.substring(0, resultString.length-1);

        expect(parseInt(resultString)).toEqual(1);
      });
          
      it('must format the input value as interger multiple of a thousand input is under a million', () => {
        let input: number = 10000;
        let resultString: string = this.formater.toView(input);
        resultString = resultString.substring(0, resultString.length-1);

        expect(parseInt(resultString)).toEqual(10);
      });
    });