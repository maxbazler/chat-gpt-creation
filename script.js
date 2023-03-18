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