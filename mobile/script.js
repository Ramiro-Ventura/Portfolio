let lenis;

window.addEventListener('load', () => {

    //Always play first time going down
    //playUp -> Play the animation when going up if true, it not plays of false
    //playDown -> Play the animation when going down if true, it not plays if false

    let scrollTrigger = {

        triggerDown: 'center 85%',
        playUp: false,
        playDown: true,
        debug: false
    };

    let animation = new Animations(scrollTrigger);

    let aboutMeImageAnimation = {

        transition: 0.4,
        from: {

            opacity: 0,
            x: '100%'
        },
        to: {
            opacity: 1,
            x: 0
        }
    }

    let aboutMeTextAnimation = {

        transition: 0.4,
        from: {

            opacity: 0,
            x: '-100%'
        },
        to: {
            opacity: 1,
            x: 0
        }
    }

    animation.create('.about-me-text-container', aboutMeTextAnimation);
    animation.create('.about-me-image-wrapper', aboutMeImageAnimation);
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

    //CheckVersion();
    //if (window.innerWidth >= 992) window.location.replace('/new-portfolio')
    lenis = new Lenis({
        duration: 0.7,  
    })

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

});

//window.addEventListener('resize', () => CheckVersion());
    
//const CheckVersion = () => { if (window.innerWidth >= 992) window.location.replace('/new-portfolio'); }

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

async function OnMenuBtnClick(){

    let menuContainer = document.querySelector('.menu-container');

    let canvasTransition = new CanvasTransitionAnimation(document.querySelector('.menu-canvas'), '#eee', 5, 40, 0.05);

    if(menuContainer.dataset.status === "close"){

        menuContainer.style.display = "block";
        menuContainer.dataset.status = "open";
        document.documentElement.style.overflow = "hidden";
        lenis.stop();
        await canvasTransition.OpenCanvas();
        document.querySelector('.menu-content-container').style.opacity = 1;
    }else{

        menuContainer.dataset.status = "close";
        document.querySelector('.menu-content-container').style.opacity = 0;
        await canvasTransition.CloseCanvas();
        menuContainer.style.display = "none";
        document.documentElement.style.overflow = "auto";
        lenis.start();
    }

}




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

        const columns = Math.ceil(this.canvas.width / this.canvas.height) * this.shapesMultiplier;
        const shapeWidth = this.canvas.width / columns;

        const rows = Math.ceil(canvas.height / shapeWidth);
        const shapeHeight = canvas.height / rows;

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

    /*OpenCanvas(){

        this.direction = 'open';
        for (let s = 0; s < this.shapes.length; s++)
            setTimeout(() => this.turnShapeOn(this.shapes[s]), s * this.stagger);

    }*/

    OpenCanvas() {
        return new Promise((resolve) => {
            
            let finishedShapes = 0;
            this.direction = 'open';

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

    CloseCanvas(){

        return new Promise((resolve) => {
            
            let finishedShapes = 0;
            this.direction = 'close';

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

    TurnOnAll(){

        for (let s = 0; s < this.shapes.length; s++) this.turnShapeOn(this.shapes[s]);
    }

    TurnOffAll(){

        for (let s = 0; s < this.shapes.length; s++) this.turnShapeOff(this.shapes[s]);
    }

    /*
    turnShapeOn(shape) {

        if(!this.canAnimate) return;

        let alpha = 0;  
        let _this = this;

        function animate() {

            _this.ctx.clearRect(shape.x, shape.y, shape.width, shape.height);
            
            alpha += _this.transition;
            _this.ctx.globalAlpha = Math.min(alpha, 1);
            _this.ctx.fillStyle = _this.fillColor;
            _this.ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
            _this.ctx.globalAlpha = 1;

            if (alpha < 1) requestAnimationFrame(animate);
            else  shape.on = true;
            
        }

        animate();
    }

    turnShapeOff(shape) {

        if(!this.canAnimate) return;

        let alpha = 1;
        let _this = this;

        function animate() {

            _this.ctx.clearRect(shape.x, shape.y, shape.width, shape.height);
            
            alpha -= _this.transition;
            _this.ctx.globalAlpha = Math.max(0, alpha);
            _this.ctx.fillStyle = _this.fillColor;
            _this.ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
            _this.ctx.globalAlpha = 1;

            if (alpha > 0) requestAnimationFrame(animate);
            else shape.on = false;
            
        }

        animate();
    }
    */

    turnShapeOn(shape) {

        if (!this.canAnimate) return;

        let alpha = 0;
        const _this = this;

        const rgb = this.hexToRgb(this.fillColor);

        function animate() {

            _this.ctx.clearRect(shape.x, shape.y, shape.width, shape.height);
            
            alpha += _this.transition;

            _this.ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
            _this.ctx.fillRect(shape.x, shape.y, shape.width, shape.height);

            if (alpha < 1) requestAnimationFrame(animate);
            else shape.on = true;
            
        }
        animate();
    }

    changeShapeStatus(shape, status, callback) {

        if (!this.canAnimate) return;

        let alpha = status == 'on' ? 0 : 1;
        const _this = this;
        
        const rgb = this.hexToRgb(this.fillColor);

        function animate() {

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

        if(this.shapes.length == 0) return;  

        this.canAnimate = false;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if(this.direction != 'open') return;

        this.ctx.fillStyle = this.fillColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

}

