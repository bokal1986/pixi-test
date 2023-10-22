import {AbstractAssignment} from "./AbstractAssignment";
import {MixText} from "./Text/MixText";

const updateTimeSeconds = 2;

export class TextAssignment extends AbstractAssignment {

    private mixText: MixText;
    private timer: NodeJS.Timeout;

    public init() {
        this.createMixText();
        this.startUpdateInterval();
    }

    public clean () {
        clearInterval(this.timer);
        this.timer = null;
        this.mixText = null;

        this.destroy();
    }

    public updateLayout (width: number = window.innerWidth, height: number = window.innerHeight) {
        this.mixText.scale.set(1);
        this.mixText.scale.set(width / this.mixText.getBounds().width);
        this.mixText.x = -this.mixText.getBounds().width / 2;
    }

    protected createMixText () {
        this.mixText = new MixText();
        this.addChild(this.mixText);
    }

    protected startUpdateInterval () {
        this.timer = setInterval(() => {
            this.mixText.refreshText();
            this.updateLayout();
        }, updateTimeSeconds * 1000);
    }
}