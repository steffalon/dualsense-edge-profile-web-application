export default class Trigger {

    private min: number;
    private max: number;

    constructor(min: number = 0x00, max: number = 0xff) {
        this.min = min;
        this.max = max;
    }

    getMin(): number {
        return this.min;
    }

    setMin(value: number) {
        this.min = value;
    }

    getMax(): number {
        return this.max;
    }

    setMax(value: number) {
        this.max = value;
    }
}