const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")

let cw = window.innerWidth
let ch = window.innerHeight

let charArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G']

let maxCharCount = 300;
let fallingCharArr = [];
let fontSize = 13;
let maxColumns = cw / fontSize;

canvas.width = cw;
canvas.height = ch;

let frames = 0;

class FallingChar {

    constructor(x, y) {
        this.x = x;
        this.y = y
    }

    draw(ctx) {
        this.value = charArr[Math.floor(Math.random() * (charArr.length - 1))].toUpperCase()
        this.speed = Math.random() * fontSize * 3 / 4 + fontSize * 3 / 4
        
        ctx.fillStyle = "rgba(0,255,0)";
        ctx.font = fontSize + "px san-serif";
        ctx.fillText(this.value, this.x, this.y);
        this.y += this.speed;

        if (this.y > ch) {
            this.y = Math.random() * ch / 2 - 50;
            this.x = Math.floor(Math.random() * maxColumns) * fontSize;
            this.speed = -Math.random() * fontSize * 3 / 4 + fontSize * 3 / 4;
        }

    }
}

let update = () => {
    if (fallingCharArr.length < maxCharCount) {
        let fallingChar = new FallingChar(Math.floor(Math.random() * maxColumns) * fontSize, Math.random() * ch / 2 - 50);
        fallingCharArr.push(fallingChar);
    }

    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, cw, ch);
    for (let i = 0; i < fallingCharArr.length && frames % 2 == 0; i += 1) {
        fallingCharArr[i].draw(ctx)
    }
    requestAnimationFrame(update);
    frames += 1;

};
update()