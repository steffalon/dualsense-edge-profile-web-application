import {Button} from "../enum/Button";

export default class ButtonMapping {

    private buttons: Array<Button>;

    constructor(buttons: Array<Button>) {
        this.buttons = buttons;
    }

    getButtons(): Array<Button> {
        return this.buttons;
    }

    setButtons(value: Array<Button>) {
        this.buttons = value;
    }
}