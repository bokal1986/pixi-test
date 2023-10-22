import {Application, Loader} from "pixi.js";
import "./style.css";
import {Game} from "./Game";

const app = new Application({
    backgroundColor: 0x7D8F6D,
    width: window.innerWidth,
    height: window.innerHeight
});

const gameInstance = new Game();

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    document.body.appendChild(app.view as HTMLCanvasElement);

    gameInstance.init();

    app.stage.addChild(gameInstance);

    resizeCanvas();
};

async function loadGameAssets(): Promise<void> {
    return new Promise((resolve, reject) => {
        const preloader = new Loader();
        preloader.add("card", "./assets/card.png");
        preloader.add("bunny_blue", "./assets/bunny_blue.png");
        preloader.add("bunny_green", "./assets/bunny_green.png");
        preloader.add("Fire_particle", "./assets/Fire.png");
        preloader.add("fullscreen", "./assets/fullscreen.png");
        preloader.onComplete.once(() => resolve());
        preloader.onError.once(() => reject());
        preloader.load();
    });
}

function resizeCanvas(): void {
    const resize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        app.renderer.resize(window.innerWidth, window.innerHeight);

        gameInstance.updateLayout(width, height);
    };

    resize();

    window.addEventListener("resize", resize);
}