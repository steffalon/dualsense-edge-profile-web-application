import JoystickCurve from "./JoystickCurve";

export default class Joystick {

    private profileId: number;
    private adjustments: Array<JoystickCurve>

    private curveValues: Array<number> = [];


    constructor(id: number, adjustments: Array<JoystickCurve>) {
        this.profileId = id;
        this.adjustments = adjustments;
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

    setCurveValues(curveValues: Array<number>) {
        this.curveValues = curveValues;
    }

    getCurveValues(): Array<number> {
        return this.curveValues;
    }
}