import Profile from "../model/Profile";
import Joystick from "../model/Joystick";
import {PS5_JOYSTICK_CURVE} from "./bytesToProfile";
import Trigger from "../model/Trigger";
import ButtonMapping from "../model/ButtonMapping";
import {ProfileButtonSelector} from "../enum/ProfileButtonSelector";

export function generateId(): string {
    return new Array(16).fill(0, 0).map(() => Math.floor(Math.random() * 255), 28).join();
}

export function assembleBlankProfile(label: string = "Unnamed"): Profile {

    const joystick_l = new Joystick(PS5_JOYSTICK_CURVE[0x00].getProfileId(), PS5_JOYSTICK_CURVE[0x00].getAdjustments());
    joystick_l.setCurveValues([0, 0, 0, 0, 0, 0]);

    const joystick_r = new Joystick(PS5_JOYSTICK_CURVE[0x00].getProfileId(), PS5_JOYSTICK_CURVE[0x00].getAdjustments());
    joystick_r.setCurveValues([0, 0, 0, 0, 0, 0]);

    return new Profile(
        generateId(),
        label,
        joystick_l,
        joystick_r,
        new Trigger(0, 0xFF),
        new Trigger(0, 0xFF),
        new ButtonMapping(new Array(16).fill(0).map((_, index) => index),
        )
    );
}

export function getProfileButtonSelector(profileButtonSelector: ProfileButtonSelector): string {
    switch (profileButtonSelector) {
        case ProfileButtonSelector.FN_CIRCLE:
            return "FN + CIRCLE";
        case ProfileButtonSelector.FN_CROSS:
            return "FN + CROSS";
        case ProfileButtonSelector.FN_SQUARE:
            return "FN + SQUARE";
        case ProfileButtonSelector.FN_TRIANGLE:
            return "FN + TRIANGLE";
        case ProfileButtonSelector.UNASSIGNED:
            return "UNASSIGNED";
        default:
            return "UNKNOWN";
    }
}
