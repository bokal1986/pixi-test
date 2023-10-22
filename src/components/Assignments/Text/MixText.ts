import {Container, Sprite, Text} from "pixi.js";

const imgPrefix = "IMG#";
const lineLength = 20;

export class MixText extends Container {

    constructor() {
        super();

        this.refreshText();
    }

    public refreshText () {
        this.clean();
        this.constructRandomLine();
    }

    protected constructRandomLine () {
        const lineItems = this.getRandomLine().split(" ");

        lineItems.forEach(i => {
            if (i.startsWith(imgPrefix)) {
                this.addImage(i.replace(imgPrefix, ""));
            } else {
                this.addText(i);
            }
        });
    }

    protected clean () {
        this.removeChildren();
    }

    protected addImage (texture: string) {
        const img = Sprite.from(texture);
        img.anchor.y = 0.5;
        img.position.x = this.getLocalBounds().width;

        this.addChild(img);
    }

    protected addText (text: string) {
        const txt = new Text(text, {
            fontSize: this.getRandomInt(30, 60),
            fontFamily: this.pickRandomArrayValue(["Arial", "Tahoma", "Verdana", "Helvetica", "Impact"]),
            fill: parseInt(`${Math.random() * 0xFFFFFF}`)
        });
        txt.anchor.y = 0.5;
        txt.position.x = this.getLocalBounds().width;

        this.addChild(txt);
    }

    protected getRandomLine (): string {
        let line = "";

        let l = lineLength;
        while (l > 0) {
            line += Math.random() > 0.5 ? this.getRandomWord() : this.getRandomImage();
            line += " ";

            l--;
        }

        return line;
    }

    protected getRandomWord (): string {
        const words = "All work and no play makes Jack a dull boy".split(" ");

        return this.pickRandomArrayValue(words);
    }

    protected getRandomImage (): string {
        const images = ["card", "bunny_blue", "bunny_green"];

        return `${imgPrefix}${this.pickRandomArrayValue<string>(images)}` ;
    }

    protected pickRandomArrayValue<T> (arr: T[]): T {
        const randomIndex = this.getRandomInt(0, arr.length - 1);

        return arr[randomIndex];
    }

    protected getRandomInt (min: number, max: number): number {
        return min + Math.round(Math.random() * (max - min));
    }
}