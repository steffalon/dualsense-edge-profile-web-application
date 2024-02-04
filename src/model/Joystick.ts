import JoystickCurve from "./JoystickCurve";

export default class Joystick {

    private profileId: number;
    private adjustments: Array<JoystickCurve>
    private modifier: number;

    private curveValues: Array<number> = [];


    constructor(id: number, adjustments: Array<JoystickCurve>, modifier: number) {
        this.profileId = id;
        this.adjustments = adjustments;
        this.modifier = modifier; // Unknown? Value set when creating specific joystick profile on console
    }

    setProfileId(profileId: number): void {
        this.profileId = profileId;
    }

    getProfileId(): number {
        return this.profileId;
    }

    setAdjustments(adjustments: Array<JoystickCurve>): void {
        this.adjustments = adjustments;
    }

    getAdjustments(): Array<JoystickCurve> {
        return this.adjustments;
    }

    setModifier(modifier: number): void {
        this.modifier = modifier
    }

    getModifier(): number {
        return this.modifier;
    }

    setCurveValues(curveValues: Array<number>) {
        this.curveValues = curveValues;
    }

    getCurveValues(): Array<number> {
        return this.curveValues;
    }
}