"use strict";
function GetRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
function GetRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
class Particle {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = 0;
        this.y = 0;
        this.dx = 0.1;
        this.dy = 0.1;
        this.radius = 5;
        this.x = GetRandomFloat(0, width);
        this.y = GetRandomFloat(0, height);
        this.dx = GetRandomFloat(-0.2, 0.2);
        this.dy = GetRandomFloat(-0.2, 0.2);
        this.radius = GetRandomFloat(5, 20);
    }
    Update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x + this.radius >= this.width) {
            this.dx = -this.dx;
            this.x = this.width - this.radius;
        }
        if (this.x - this.radius <= 0) {
            this.dx = -this.dx;
            this.x = this.radius;
        }
        if (this.y + this.radius >= this.height) {
            this.dy = -this.dy;
            this.y = this.height - this.radius;
        }
        if (this.y - this.radius <= 0) {
            this.dy = -this.dy;
            this.y = this.radius;
        }
    }
    Draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}
const ParticleCount = 100;
const ColorPalette = [
    ["#086788", "#07a0c3", "#f0c808", "#fff1d0", "#dd1c1a"],
    ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"],
    ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"]
];
class Simulaiton {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.particles = [];
        const k = GetRandomInt(0, ColorPalette.length - 1);
        const palette = ColorPalette[k];
        for (let i = 0; i < ParticleCount; i++) {
            const n = GetRandomInt(0, palette.length - 1);
            const color = palette[n];
            this.particles.push(new Particle(width, height, color));
        }
    }
    Update() {
        this.particles.forEach(p => p.Update());
    }
    Draw(ctx) {
        ctx.fillStyle = '#212529';
        ctx.fillRect(0, 0, this.width, this.height);
        this.particles.forEach(p => p.Draw(ctx));
    }
}
function main() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const canvas = document.createElement('canvas');
    if (!canvas) {
        return;
    }
    document.body.appendChild(canvas);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    const sim = new Simulaiton(width, height);
    const updateFrameRate = 60;
    setInterval(() => {
        sim.Update();
        sim.Draw(ctx);
    }, 1000 / updateFrameRate);
}
main();
