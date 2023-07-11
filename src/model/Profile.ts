import Joystick from "./Joystick";
import Trigger from "./Trigger";
import {Button} from "../enum/Button";
import {ProfileButtonSelector} from "../enum/ProfileButtonSelector";

export default class Profile {

    private label: string;

    private leftJoystick: Joystick;
    private rightJoystick: Joystick;

    private leftTrigger: Trigger;
    private rightTrigger: Trigger;

    private buttonMapping: Array<Button>;


    private profileButtonSelector: ProfileButtonSelector;

    constructor(
        label: string = "Label",
        leftJoystick: Joystick,
        rightJoystick: Joystick,
        leftTrigger: Trigger,
        rightTrigger: Trigger,
        buttonMapping: Array<Button> = [
            Button.SQUARE,
            Button.CROSS,
            Button.CIRCLE,
            Button.TRIANGLE,
            Button.L1,
            Button.R1,
            Button.L2,
            Button.R2,
            Button.OPTIONS,
            Button.CREATE,
            Button.L3,
            Button.R3,
            Button.PS,
            Button.TOUCHPAD,
            Button.MUTE,
            Button.UNASSIGNED, //LEFT_PADDLE
            Button.UNASSIGNED, //RIGHT_PADDLE
        ],
        profileButtonSelector: ProfileButtonSelector = ProfileButtonSelector.UNASSIGNED
    ) {
        this.label = label;
        this.leftJoystick = leftJoystick;
        this.rightJoystick = rightJoystick;
        this.leftTrigger = leftTrigger;
        this.rightTrigger = rightTrigger;
        this.buttonMapping = buttonMapping;
        this.profileButtonSelector = profileButtonSelector;
    }


    getLabel(): string {
        return this.label;
    }

    setLabel(value: string) {
        this.label = value;
    }

    getLeftJoyStick(): Joystick {
        return this.leftJoystick;
    }

    setLeftJoyStick(value: Joystick) {
        this.leftJoystick = value;
    }

    getRightJoyStick(): Joystick {
        return this.rightJoystick;
    }

    setRightJoyStick(value: Joystick) {
        this.rightJoystick = value;
    }

    getLeftTrigger(): Trigger {
        return this.leftTrigger;
    }

    setLeftTrigger(value: Trigger) {
        this.leftTrigger = value;
    }

    getRightTrigger(): Trigger {
        return this.rightTrigger;
    }

    setRightTrigger(value: Trigger) {
        this.rightTrigger = value;
    }

    getButtonMapping(): Array<Button> {
        return this.buttonMapping;
    }

    setButtonMapping(value: Array<Button>) {
        this.buttonMapping = value;
    }


    getProfileButtonSelector(): ProfileButtonSelector {
        return this.profileButtonSelector;
    }

    setProfileButtonSelector(value: ProfileButtonSelector) {
        this.profileButtonSelector = value;
    }
}