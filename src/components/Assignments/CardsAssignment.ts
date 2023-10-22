import {AbstractAssignment} from "./AbstractAssignment";
import {CardDeck} from "./Cards/CardDeck";
import {gsap} from "gsap";

// Set to 0.1 for better animation sequence, although the assignment description asks for 1 second
const stepTimeSeconds: number = 0.1;
const deckSize: number = 144;
const movementTimeSeconds: number = 2;

class Tween extends gsap.core.Tween {}

export class CardsAssignment extends AbstractAssignment {

    private deck1: CardDeck;
    private deck2: CardDeck;
    private timer: NodeJS.Timeout;
    private tweens: Tween[] = [];

    public init () {
        this.createDecks();

        this.deck1.fill(deckSize);

        this.startAnimation();
    }

    public clean() {
        this.tweens.forEach(t => t.kill());
        this.tweens = [];

        clearInterval(this.timer);
        this.timer = null;

        this.destroy();
    }

    public updateLayout (width: number = window.innerWidth, height: number = window.innerHeight) {
        this.deck1.position.set(-650, -350);
        this.deck2.position.set(100, this.deck1.y);

        this.scale.set(Math.min(1, width / 1400));
    }

    private createDecks () {
        this.deck1 = new CardDeck();
        this.deck2 = new CardDeck();

        this.addChild(this.deck1, this.deck2);
    }

    private startAnimation () {
        this.timer = setInterval(() => this.processAnimationStep(), stepTimeSeconds * 1000);
    }

    private processAnimationStep () {
        const card = this.deck1?.releaseCard();
        if (!card) return;

        const startMovePositionGlob = card.getGlobalPosition();

        this.deck2.addCard(card);

        const startMovePositionLoc = this.deck2.toLocal(startMovePositionGlob);

        const tween: Tween = gsap.from(card, {
            x: startMovePositionLoc.x,
            y: startMovePositionLoc.y,
            rotation: Math.PI * 2,
            duration: movementTimeSeconds,
            onComplete: () => this.removeTween(tween)
        });
        this.tweens.push(tween);
    }

    private removeTween (tween: Tween) {
        const index = this.tweens.findIndex(t => t === tween);
        this.tweens.splice(index, 1);
    }
}