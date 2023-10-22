import {Container, Sprite, Text, utils} from "pixi.js";
import {UIButton} from "./UIButton";

export class UI extends Container {

    private buttons: UIButton[] = [];
    private fpsText: Text;
    private fullScreenBtn: Sprite;

    constructor() {
        super();

        this.createSectionButtons();
        this.createFullScreenHandler();
        this.createFSPHandler();
    }

    public setFPS (fps: number) {
        this.fpsText.text = `FPS: ${fps}`;
    }

    public updateLayout (availableWidth: number, availableHeight: number) {
        const [btn1, btn2, btn3] = this.buttons;

        btn1.position.set(availableWidth / 3, 50);
        btn2.position.set(2 * availableWidth / 3, btn1.y);
        btn3.position.set(availableWidth / 2, btn2.y + (availableWidth > availableHeight ? 0: 60));

        this.fpsText.position.set(5, 5);

        this.fullScreenBtn?.position.set(availableWidth - 20, 20);
    }

    public getButtons () {
        return this.buttons;
    }

    private createSectionButtons () {
        this.buttons = [new UIButton("CARDS"), new UIButton("TEXT"), new UIButton("PARTICLES")];
        this.addChild(...this.buttons);
    }

    private createFullScreenHandler () {
        if (utils.isMobile.any) {
            return;
        }

        this.fullScreenBtn = Sprite.from("fullscreen");
        this.fullScreenBtn.buttonMode = true;
        this.fullScreenBtn.interactive = true;
        this.fullScreenBtn.on("pointertap", () => this.toggleFullScreen());
        this.fullScreenBtn.scale.set(0.15);
        this.fullScreenBtn.anchor.set(1, 0);
        this.addChild(this.fullScreenBtn);
    }

    private createFSPHandler () {
        this.fpsText = new Text("", {
            fontSize: 12
        });
        this.addChild(this.fpsText);
    }

    private toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}