import * as particles from 'pixi-particles';

import {AbstractAssignment} from "./AbstractAssignment";
import {ParticleContainer} from "pixi.js";


export class ParticlesAssignment extends AbstractAssignment {

    private emitter: particles.Emitter;

    public init() {
        const container = new ParticleContainer();
        this.emitter = new particles.Emitter(
            container,
            ["Fire_particle"],
            emitterConfig
        );

        this.emitter.autoUpdate = true;
        this.emitter.emit = true;

        container.y = 200;
        this.addChild(container);
    }

    public clean () {
        this.emitter?.destroy();
        this.emitter = null;

        this.removeChildren();
    }

    public updateLayout (width: number = window.innerWidth, height: number = window.innerHeight) {
        this.scale.set(1);
    }

}

const emitterConfig = {
    "alpha": {
        "start": 0.62,
        "end": 0
    },
    "scale": {
        "start": 0.25,
        "end": 0.75,
        "minimumScaleMultiplier": 1
    },
    "color": {
        "start": "#fff191",
        "end": "#ff622c"
    },
    "speed": {
        "start": 500,
        "end": 500,
        "minimumSpeedMultiplier": 1
    },
    "acceleration": {
        "x": 0,
        "y": 0
    },
    "maxSpeed": 0,
    "startRotation": {
        "min": 265,
        "max": 275
    },
    "noRotation": false,
    "rotationSpeed": {
        "min": 50,
        "max": 50
    },
    "lifetime": {
        "min": 0.1,
        "max": 0.75
    },
    "blendMode": "normal",
    "frequency": 0.001,
    "emitterLifetime": -1,
    "maxParticles": 1000,
    "pos": {
        "x": 0,
        "y": 0
    },
    "addAtBack": false,
    "spawnType": "rect",
    "spawnRect": {
        "x": -50,
        "y": 0,
        "w": 100,
        "h": 0
    }
};