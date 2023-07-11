export default class JoystickCurve {

    private readonly initialValue: number;
    private readonly modifier: number | Array<number> | undefined

    constructor(initialValue: number, modifier?: number | Array<number>) {
        this.initialValue = initialValue;
        this.modifier = modifier;
    }

    getByIndex(index: number): number {

        if (!this.modifier) {
            return this.initialValue;
        }

        let value = this.initialValue;

        if (this.modifier instanceof Array) {
            for (let i = 0; i < index; i++) {
                value += this.modifier[i % this.modifier.length];
            }
        } else {
            value += index * this.modifier;
        }

        return value;
    }

    getModifier(): number | Array<number> | undefined {
        return this.modifier;
    }

    getInitialValue(): number {
        return this.initialValue;
    }
}