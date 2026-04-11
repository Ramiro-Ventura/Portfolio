
class CanvasTransitionAnimation {

    constructor(canvas, fillColor = "#eee", shapesMultiplier = 4, stagger = 100, transition = 0.05) {

        this.canvas = canvas;
        this.fillColor = fillColor;
        this.shapesMultiplier = shapesMultiplier;
        this.stagger = stagger;
        this.transition = transition;

        this.ctx = canvas.getContext('2d');

        this.shapes = [];
        this.canAnimate = true;

        window.addEventListener('resize', this.resize.bind(this));

        if(this.canvas.width != window.innerWidth){

            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        this.createShapes();
    }

    createShapes(){

        this.shapes = [];

        const columns = Math.ceil(this.canvas.width / this.canvas.height) * this.shapesMultiplier;
        const shapeWidth = this.canvas.width / columns;

        const rows = Math.ceil(this.canvas.height / shapeWidth);
        const shapeHeight = this.canvas.height / rows;

        for (let r = 0; r < rows; r++) {

            for (let c = 0; c < columns; c++) {
                
                const x = Math.floor(c * shapeWidth);
                const y = Math.floor(r * shapeHeight);

                this.shapes.push({
                    x: x,
                    y: y,
                    width: Math.ceil(shapeWidth),
                    height: Math.ceil(shapeHeight),
                    on: false
                });
            }
        }

        this.shuffle(this.shapes);
    }

    openCanvas() {

        return new Promise((resolve) => {
            
            let finishedShapes = 0;
            this.direction = 'open';

            const onResize = () => {
                window.removeEventListener('resize', onResize);
                resolve();
            };
            window.addEventListener('resize', onResize);

            for (let s = 0; s < this.shapes.length; s++) {

                setTimeout(() => {

                    this.changeShapeStatus(this.shapes[s], 'on', () => {

                        finishedShapes++;
                        if (finishedShapes === this.shapes.length) resolve();
                        
                    });

                }, s * this.stagger);
            }
        });
    }

    closeCanvas(){

        return new Promise((resolve) => {
            
            let finishedShapes = 0;
            this.direction = 'close';

            const onResize = () => {
                window.removeEventListener('resize', onResize);
                resolve();
            };
            window.addEventListener('resize', onResize);

            for (let s = 0; s < this.shapes.length; s++) {

                setTimeout(() => {
                    
                    this.changeShapeStatus(this.shapes[s], 'off', () => {

                        finishedShapes++;
                        if (finishedShapes === this.shapes.length) resolve();
                        
                    });

                }, s * this.stagger);
            }
        });
    }

    changeShapeStatus(shape, status, callback) {

        if (!this.canAnimate) return;

        let alpha = status == 'on' ? 0 : 1;
        const _this = this;
        
        const rgb = this.hexToRgb(this.fillColor);

        function animate() {

            if(!shape) return;

            _this.ctx.clearRect(shape.x, shape.y, shape.width, shape.height);
            
            if(status == 'on') alpha += _this.transition;
            else if (status == 'off') alpha -= _this.transition;

            _this.ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
            _this.ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
                    
            let continueAnimating = status == 'on' ? alpha < 1 : alpha > 0;

            if (continueAnimating) requestAnimationFrame(animate);
            else{

                shape.on = status == 'on';
                if(callback) callback();
            }

        }

        animate();
    }

    shuffle(array) {

        for (let i = array.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    hexToRgb(hex) {

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) || 
                    /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex);
        return result ? {
            r: parseInt(result[1].length === 1 ? result[1] + result[1] : result[1], 16),
            g: parseInt(result[2].length === 1 ? result[2] + result[2] : result[2], 16),
            b: parseInt(result[3].length === 1 ? result[3] + result[3] : result[3], 16)
        } : { r: 238, g: 238, b: 238 };
    }
    
    resize() {

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.createShapes();

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if(this.direction != 'open') return;

        this.ctx.fillStyle = this.fillColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


let lenis;

window.addEventListener('load', () => {

    //Always play first time going down
    //playUp -> Play the animation when going up if true, it not plays of false
    //playDown -> Play the animation when going down if true, it not plays if false

    SetCurrentAge();

    let scrollTrigger = {

        triggerDown: 'center 85%',
        playUp: false,
        playDown: true,
        debug: false
    };

    let animation = new Animations(scrollTrigger);

    animation.create('.about-me-text-container', {

        transition: 0.4,
        from: { opacity: 0, x: '-100%' },
        to: { opacity: 1, x: 0 }
    });
    animation.create('.about-me-image-wrapper', {

        transition: 0.4,
        from: { opacity: 0, transform: 'translateX(100%) rotate(-50deg)' },
        to: { opacity: 1, transform: 'translateX(0) rotate(0deg)' }
    });
    animation.create('.work-title, .contacts-title', {

        transition: 0.4,
        from: { opacity: 0 },
        to: { opacity: 1 }
    });
    animation.create('.work-project-container', {

        transition: 0.4,
        from: { opacity: 0, scale: 0.7 },   
        to: { opacity: 1, scale: 1 }
    });
    animation.create('.contact-container', {

        from: { opacity: 0, scale: 0 },   
        to: { opacity: 1, scale: 1 }
    });

    lenis = new Lenis({duration: 0.7 });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

});

const SetCurrentAge = () => {

    let ageSpan = document.querySelector("#age-span");
    let birthDate = new Date("January 15, 2004");
    let today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;  
    
    ageSpan.innerHTML = age;

};

function OnContactClick(contactContainer){

    if(contactContainer.dataset.name === "email"){

        navigator.clipboard.writeText('ramiro.herlander.ventura@gmail.com')
        .then(() => {

            alert('Email copied');
        });

    }else{

        let link = contactContainer.dataset.name == 'github' ? 'https://github.com/Ramiro-Ventura' : 'https://www.linkedin.com/in/ramiro-ventura/';
        window.open(link, "_blank", 'noopener,noreferrer');
    }

}

function OpenProject(link){

    window.open(link, '_blank', 'noopener,noreferrer');
}


let canvasTransition = new CanvasTransitionAnimation(document.querySelector('.menu-canvas'), '#eee', 5, 20, 0.07);
let isAnimating = false;

async function OnMenuBtnClick(){

    let menuContainer = document.querySelector('.menu-container');

    if(menuContainer.dataset.status === "close")
        OpenMenu();
    else
        CloseMenu();
}

async function OpenMenu(){

    if(isAnimating) return;

    let menuContainer   = document.querySelector('.menu-container');
    let menuBtn         = document.querySelector('.menu-btn');
    let menuStrokes     = gsap.utils.toArray('.menu-btn-stroke');

    let duration = 0.5;
    let yValue = parseInt(getComputedStyle(menuStrokes[0]).height) + parseInt(getComputedStyle(menuBtn).gap);

    beforeOpenCanvas();
    await canvasTransition.openCanvas();
    afterOpenCanvas();


    function beforeOpenCanvas(){

        const tl = gsap.timeline({
            onComplete: () => { isAnimating = false; }
        });

        tl.to(menuStrokes[0], { y: yValue, rotateZ: 45, transformOrigin: "center center", duration: duration, ease: "power2.inOut" })
        .to(menuStrokes[1], { opacity: 0, duration: duration }, "<")
        .to(menuStrokes[2], { y: -yValue, rotateZ: -45, transformOrigin: "center center", duration: duration, ease: "power2.inOut" }, "<")

        menuContainer.style.display = "block";
        menuContainer.dataset.status = "open";
        //document.documentElement.style.overflow = "hidden";
        //document.documentElement.style.paddingRight = "15px";
        lenis.stop();
        isAnimating = true;
        //menuBtn.style.marginRight = "15px";
    }

    function afterOpenCanvas(){

        document.querySelector('.menu-content-container').style.opacity = 1;
        isAnimating = false;

    }
}   

function CloseMenu(){

    if(isAnimating) return;

    let menuContainer   = document.querySelector('.menu-container');
    let menuBtn         = document.querySelector('.menu-btn');
    let menuStrokes     = gsap.utils.toArray('.menu-btn-stroke');

    let duration = 0.5;

    beforeClosingCanvas();
    
    setTimeout(async () => {

        await canvasTransition.closeCanvas();
        afterClosingCanvas();

    }, 400);

    function beforeClosingCanvas(){

        menuContainer.dataset.status = "close";
        document.querySelector('.menu-content-container').style.opacity = 0;
        isAnimating = true;
    }

    function afterClosingCanvas(){

                const tl = gsap.timeline({
            onComplete: () => { isAnimating = false; }
        });

        tl.to([menuStrokes[0], menuStrokes[2]], { y: 0, rotateZ: 0, transformOrigin: "center center", duration: duration, ease: "power2.inOut"})
        .to(menuStrokes[1], { opacity: 1, duration: duration}, ">-=0.3");

        isAnimating = false;
        menuContainer.style.display = "none";
        //document.documentElement.style.overflow = "auto";
        //document.documentElement.style.paddingRight = "0px";
        //menuBtn.style.marginRight = "0px";
        lenis.start();
    }
}

function OnMenuItemClick(sectionId){

    let menuContainer = document.querySelector('.menu-container');

    if(menuContainer.dataset.status === "open"){

        let section = document.querySelector(`#${sectionId}`);
        if(section) section.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => CloseMenu(), 500);
    }

}



