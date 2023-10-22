import {Sprite, Texture} from "pixi.js";


export class Card extends Sprite {

    constructor() {
        super(Texture.from("card"));
    }

}