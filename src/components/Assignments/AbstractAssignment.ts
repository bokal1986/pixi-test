import {Container} from "pixi.js";


export abstract class AbstractAssignment extends Container {

    public abstract init (): void;
    public abstract clean (): void;
    public abstract updateLayout(width?: number, height?: number): void;

}