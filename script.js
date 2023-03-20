const parallax = (e) => {
    document.querySelectorAll('.city-p').forEach((layer) => {
        const speed = layer.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        layer.style.transform = `translateX(${x}px) translateY(${y}px) scale(1.02)`;
    });
};

document.addEventListener('mousemove', parallax);
(function() {
    const cursor = document.querySelector('.top-cursor');
    gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
    });
    document.addEventListener('pointermove', movecursor);

    function movecursor(e) {
        gsap.to(cursor, {
            duration: 0.5,
            x: e.clientX,
            y: e.clientY,
        });
    }
})();

(function() {
    const cursor = document.querySelector('.main-cursor');
    gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
    });
    document.addEventListener('pointermove', movecursor);

    function movecursor(e) {
        gsap.to(cursor, {
            duration: 0,
            x: e.clientX,
            y: e.clientY,
        });
    }
})();


const canvas = document.getElementById('trail');
const context = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouseX = canvas.width / 2;
    mouseY = canvas.height / 2;
}

resizeCanvas(); // Set initial canvas dimensions and mouse position

document.addEventListener('mousemove', event => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function updateTrail() {
    context.fillStyle = 'rgba(0, 0, 0, 0.1)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Limit the position of the cursor to the bounds of the canvas
    const trailRadius = 10;
    const trailX = Math.max(trailRadius, Math.min(mouseX, canvas.width - trailRadius));
    const trailY = Math.max(trailRadius, Math.min(mouseY, canvas.height - trailRadius));

    context.beginPath();
    context.arc(trailX, trailY, trailRadius, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();

    requestAnimationFrame(updateTrail);
}

updateTrail();

window.addEventListener('resize', resizeCanvas); // Add event listener for window resize








window.onload = function() {
    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: true // Set transparent to true
    });
    document.body.appendChild(app.view);

    const rainContainer = new PIXI.Container();
    app.stage.addChild(rainContainer);

    const raindropTexture = PIXI.Texture.from('images/streak1.png');

    for (let i = 0; i < 200; i++) {
        const raindrop = new PIXI.Sprite(raindropTexture);
        raindrop.x = Math.random() * app.screen.width;
        raindrop.y = Math.random() * app.screen.height - app.screen.height;
        raindrop.anchor.set(0.5);
        raindrop.scale.set(0.4 + Math.random());
        rainContainer.addChild(raindrop);
    }

    app.ticker.add(() => {
        for (let i = 0; i < rainContainer.children.length; i++) {
            const raindrop = rainContainer.children[i];
            raindrop.y += raindrop.scale.y * 20;
            if (raindrop.y > app.screen.height) {
                raindrop.y = -raindrop.height;
            }
        }
    });
}