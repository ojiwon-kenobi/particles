//canvas setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
let particleArray=[];
const numberOfParticles = 10;

//get mouse position
const mouse = {
    x: null,
    y: null
}
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y= event.y;
    // console.log(mouse.x, mouse.y);
})

setInterval(function() {
    mouse.x = undefined;
    mouse.y= undefined;
}, 1000);

//create particles
class Particle {
    constructor(x,y,size,color,weight ) {
        this.x = x;
        this.y=y;
        this.size = size;
        this.color=color;
        this.weight=weight;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size,0,Math.PI*2, false);
        var gradient = ctx.createRadialGradient(this.x, this.y, this.size*4/5, this.x, this.y, this.size);

        // Add color stops
        gradient.addColorStop(0, "rgba(255,255,255,0.8)");
        gradient.addColorStop(0.9, "#00b140");
        ctx.fillStyle = gradient;

        ctx.fill();
    }
    update() {
        this.size-=(Math.random()*0.1); //shrink particle little by litte
        if(this.size < 0) { //if the particles are smaller than zero, tey'll appear where the mouse is at the mment
            this.x= Math.random()*canvas.width; //interactive
            this.y= Math.random()*(canvas.height);/* - canvas.height*2/3) + canvas.height*2/3;*/ 
            this.size = (Math.random() * 12) + 6;
            this.weight = (Math.random())-0.5;
        }
        this.y -= this.weight/4;//want it to rise
        this.weight += 0.02; //want it ...to rise faster? //rising should not be accelerated tho
        }
}

function init() {
    particleArray=[];
    for(let i =0; i < numberOfParticles; i++) {
        let x= Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = (Math.random()* 5) + 4;
        let color = 'red';
        let weight = 1;
        particleArray.push(new Particle(x, y, size, color, weight));
    }
}

function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for(let i = 0; i< particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }
    requestAnimationFrame(animate);
}
init();
animate();
