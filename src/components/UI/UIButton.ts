import {Container, Graphics, Text} from "pixi.js";

const width: number = 130;
const height: number = 50;

export class UIButton extends Container {

    constructor(title: string) {
        super();

        this.buttonMode = true;
        this.interactive = true;

        this.constructBackground();
        this.constructTitle(title);
    }

    private constructBackground () {
        const background = new Graphics();
        background
            .beginFill(0xDDF542)
            .lineStyle({width: 2, alpha: 0.5, color: 0})
            .drawRoundedRect(-width / 2, -height / 2, width, height, 10);

        this.addChild(background);
    }

    private constructTitle (title: string) {
        const titleText = new Text(title, {
            fontSize: 20,
            fill: 0x191E47,
            fontFamily: "Tahoma",
            fontWeight: "bold"
        });
        titleText.anchor.set(0.5);
        this.addChild(titleText);
    }
}