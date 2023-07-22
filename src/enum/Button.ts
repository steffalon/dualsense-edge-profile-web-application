export enum Button {
    UP = 0x00,
    LEFT = 0x01,
    DOWN = 0x02,
    RIGHT = 0x03,
    CIRCLE = 0x04,
    CROSS = 0x05,
    SQUARE = 0x06,
    TRIANGLE = 0x07,
    R1 = 0x08,
    R2 = 0x09,
    R3 = 0x0A,
    L1 = 0x0B,
    L2 = 0x0C,
    L3 = 0x0D,
    Options = 0x10,
    Touchpad = 0x11,
}

export enum ButtonIndex {
    UP,
    LEFT,
    DOWN,
    RIGHT,
    CIRCLE,
    CROSS,
    SQUARE,
    TRIANGLE,
    R1,
    R2,
    R3,
    L1,
    L2,
    L3,
    PADDLE_LEFT,
    PADDLE_RIGHT,
    Options,
    Touchpad,
}

/*
ADDRESS INPUT MAPPING

Dpad top = 0x00
Dpad left = 0x01
Dpad down = 0x02
Dpad right = 0x03
Circle = 0x04
Cross = 0x05
Square = 0x06
Triangle = 0x07
R1 = 0x08
R2 = 0x09
R3 = 0x0A
L1 = 0x0B
L2 = 0x0C
L3 = 0x0D
PADDLE LEFT = NOT ADDRESSED
PADDLE RIGHT = NOT ADDRESSED
Options = 0x10
Touchpad = 0x11
 */