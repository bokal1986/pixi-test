import {Container, Ticker} from "pixi.js";
import {UI} from "./components/UI/UI";
import {CardsAssignment} from "./components/Assignments/CardsAssignment";
import {AbstractAssignment} from "./components/Assignments/AbstractAssignment";
import {TextAssignment} from "./components/Assignments/TextAssignment";
import {ParticlesAssignment} from "./components/Assignments/ParticlesAssignment";

export class Game extends Container {

    private ui: UI;
    private assignment: AbstractAssignment;
    private assignmentContainer: Container;
    private assignmentIndex: number = 0;

    public init () {
        this.prepareAssignmentContainer();
        this.buildAssignment();
        this.createUI();
        this.addListeners();
    }

    public updateLayout (availableWidth: number, availableHeight: number) {
        this.assignmentContainer.position.set(availableWidth / 2, availableHeight / 2);
        this.assignment.updateLayout(availableWidth, availableHeight);
        this.ui.updateLayout(availableWidth, availableHeight);
    }

    private createUI () {
        this.ui = new UI();
        this.addChild(this.ui);
    }

    private prepareAssignmentContainer () {
        this.assignmentContainer = new Container();
        this.addChild(this.assignmentContainer);
    }

    private buildAssignment () {
        this.cleanCurrentAssignment();

        const assignments = [CardsAssignment, TextAssignment, ParticlesAssignment];

        this.assignment = new assignments[this.assignmentIndex]();
        this.assignmentContainer.addChild(this.assignment);

        this.assignment.init();
        this.assignment.updateLayout();
    }

    private cleanCurrentAssignment () {
        if (!this.assignment) return;

        this.assignmentContainer.removeChild(this.assignment);
        this.assignment.clean();
    }

    private addListeners () {
        this.addFPSListener();
        this.addButtonsListeners();
    }

    private addFPSListener () {
        const ticker = Ticker.shared;
        ticker.add(() => this.ui.setFPS(ticker.FPS));
        ticker.start();
    }

    private addButtonsListeners () {
        const buttons = this.ui.getButtons();
        buttons.forEach((b, i) => b.on("pointertap", () => {
            this.assignmentIndex = i;
            this.buildAssignment();
        }));
    }
}