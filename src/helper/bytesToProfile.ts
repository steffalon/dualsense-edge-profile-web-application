import Profile from "../model/Profile";
import Joystick from "../model/Joystick";
import {JoystickProfileId} from "../enum/JoystickProfileId";
import JoystickCurve from "../model/JoystickCurve";
import Trigger from "../model/Trigger";
import {ProfileButtonSelector} from "../enum/ProfileButtonSelector";
import {arrayCRC32Le} from "./CRC32";

export const PS5_JOYSTICK_CURVE = [
    new Joystick(JoystickProfileId.DEFAULT, [
        new JoystickCurve(128),
        new JoystickCurve(128),
        new JoystickCurve(196),
        new JoystickCurve(196),
        new JoystickCurve(225),
        new JoystickCurve(225)
    ]),
    new Joystick(JoystickProfileId.QUICK, [
        new JoystickCurve(38),
        new JoystickCurve(38),
        new JoystickCurve(122, -3),
        new JoystickCurve(139, [6, 5]),
        new JoystickCurve(255),
        new JoystickCurve(255)
    ]),
    new Joystick(JoystickProfileId.PRECISE, [
        new JoystickCurve(70, 3),
        new JoystickCurve(57, [-3, -4]),
        new JoystickCurve(134, 3),
        new JoystickCurve(115, [-6, -7]),
        new JoystickCurve(196, 2),
        new JoystickCurve(177, [-7, -8])
    ]),
    new Joystick(JoystickProfileId.STEADY, [
        new JoystickCurve(62, -1),
        new JoystickCurve(62, -1),
        new JoystickCurve(120, -4),
        new JoystickCurve(129, [0, -1]),
        new JoystickCurve(197, [3, 2]),
        new JoystickCurve(179, [-5, -6])
    ]),
    new Joystick(JoystickProfileId.DIGITAL, [
        new JoystickCurve(38),
        new JoystickCurve(38),
        new JoystickCurve(38),
        new JoystickCurve(75, 18),
        new JoystickCurve(255),
        new JoystickCurve(255)
    ]),
    new Joystick(JoystickProfileId.DYNAMIC, [
        new JoystickCurve(69, [3, 2]),
        new JoystickCurve(57, [-3, -4]),
        new JoystickCurve(183, [-4, -5]),
        new JoystickCurve(198, 3),
        new JoystickCurve(255),
        new JoystickCurve(255)
    ]),
];

export function bytesArrayToProfile(bytesArray: Array<Array<number>>): Profile {

    const assignmentDictionary = {
        0: ProfileButtonSelector.UNASSIGNED,
        112: ProfileButtonSelector.FN_TRIANGLE,
        115: ProfileButtonSelector.FN_CIRCLE,
        118: ProfileButtonSelector.FN_CROSS,
        121: ProfileButtonSelector.FN_SQUARE,
    }

    let label: string = "";

    for (let i = 6; i < bytesArray[0].length - 4; i++) {
        if (bytesArray[0][i] !== 0) {
            label += String.fromCharCode(bytesArray[0][i]);
        }
    }

    for (let i = 2; i < 27; i++) {
        if (bytesArray[1][i] !== 0) {
            label += String.fromCharCode(bytesArray[1][i]);
        }
    }

    let leftJoystickCurrentCurveValues = bytesArray[1].slice(47, 53);

    let rightJoystickCurrentCurveValues = bytesArray[1].slice(56, 60);
    rightJoystickCurrentCurveValues.push(...bytesArray[2].slice(2, 4));

    const profile = new Profile(
        label,
        new Joystick(PS5_JOYSTICK_CURVE[bytesArray[2][30]].getProfileId(), PS5_JOYSTICK_CURVE[bytesArray[2][30]].getAdjustments()),
        new Joystick(PS5_JOYSTICK_CURVE[bytesArray[2][32]].getProfileId(), PS5_JOYSTICK_CURVE[bytesArray[2][32]].getAdjustments()),
        new Trigger(bytesArray[2][4], bytesArray[2][5]),
        new Trigger(bytesArray[2][6], bytesArray[2][7]),
        bytesArray[2].slice(11, 28),
        // @ts-ignore
        assignmentDictionary[bytesArray[0][0]]
    );

    profile.getLeftJoyStick().setCurveValues(leftJoystickCurrentCurveValues);
    profile.getRightJoyStick().setCurveValues(rightJoystickCurrentCurveValues);

    return profile;
}

export function profileToBytes(profile: Profile): Array<Uint8Array> {

    let buffers: Array<Uint8Array> = [new Uint8Array(64), new Uint8Array(64), new Uint8Array(64)];

    buffers[0][0] = profile.getProfileButtonSelector();
    buffers[1][0] = profile.getProfileButtonSelector();
    buffers[2][0] = profile.getProfileButtonSelector();

    buffers[0][2] = 1;

    buffers[1][1] = 1;
    buffers[2][1] = 2;

    let label = profile.getLabel().split('');

    for (let i = 6; i < buffers[0].length - 4; i++) {
        if (!(i % 2) && label.length) {
            // @ts-ignore
            buffers[0][i] = label.shift().charCodeAt(0);
        }
    }

    for (let i = 2; i < 27; i++) {
        if (!(i % 2) && label.length) {
            // @ts-ignore
            buffers[1][i] = label.shift().charCodeAt(0);
        }
    }

    buffers[1].set([0x7e, 0x05, 0x28, 0x42, 0x8a, 0x5d, 0x42, 0x4e, 0xa6, 0xa8, 0xcd, 0xce, 0x85, 0x54, 0x22, 0x43], 28)

    buffers[2][30] = profile.getLeftJoyStick().getProfileId();
    buffers[2][32] = profile.getRightJoyStick().getProfileId();

    // Deep copy using JSON
    let joyConL = JSON.parse(JSON.stringify(profile.getLeftJoyStick().getCurveValues()));
    let joyConR = JSON.parse(JSON.stringify(profile.getRightJoyStick().getCurveValues()));

    console.log(joyConL, joyConR);

    for (let i = 47; i < 53; i++) {
        buffers[1][i] = joyConL.shift();
    }

    for (let i = 56; i < 60; i++) {
        buffers[1][i] = joyConR.shift();
    }

    buffers[2][2] = joyConR.shift();
    buffers[2][3] = joyConR.shift();

    buffers[2][4] = profile.getLeftTrigger().getMin();
    buffers[2][5] = profile.getLeftTrigger().getMax();
    buffers[2][6] = profile.getRightTrigger().getMin();
    buffers[2][7] = profile.getRightTrigger().getMax();

    buffers[2].set(profile.getButtonMapping(), 11);

    buffers[2][28] = 0xC0;
    buffers[2].set([0x1c, 0x55, 0xbb, 0x05, 0x87, 0x01], 34);

    buffers[2].set(arrayCRC32Le(buffers), 56);

    return buffers;
}