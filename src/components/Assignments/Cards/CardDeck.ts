import {Container} from "pixi.js";
import {Card} from "./Card";

const offset = 3;

export class CardDeck extends Container {

    private cards: Card[] = [];

    public addCard (card: Card) {
        this.cards.push(card);
        this.addChild(card);

        card.position.set(offset * this.cards.length);
    }

    public releaseCard (): Card {
        if (!this.cards.length) return;

        return this.cards.pop();
    }

    public fill (deckSize: number) {
        this.cleanDeck();

        while (this.cards.length < deckSize) {
            this.addCard(new Card());
        }
    }

    private cleanDeck () {
        while (this.cards.length) {
            this.releaseCard();
        }
    }
}