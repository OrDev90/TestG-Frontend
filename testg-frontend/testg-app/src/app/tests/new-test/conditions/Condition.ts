export class Condition {

    condition: string;
    firstParameter: string;
    firstValue: string;
    firstSign: string;
    secondParameter: string;
    secondValue: string;
    secondSign: string;

    constructor(condition: string,
        firstParameter: string,
        firstValue: string,
        firstSign: string,
        secondParameter: string,
        secondValue: string,
        secondSign: string) {
        this.condition = condition;
        this.firstParameter = firstParameter;
        this.firstValue = firstValue;
        this.firstSign = firstSign;
        this.secondParameter = secondParameter;
        this.secondValue = secondValue;
        this.secondSign = secondSign;
    }
}