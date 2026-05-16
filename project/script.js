window.addEventListener("load", () => {

    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);  

    MagicCursorSetup();
    SmoothScroolSetup();


    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".description-section",
            start: "top top",
            end: "+=300%",
            scrub: 1,                
            pin: true
        }
    });

    timeline.to('.project-name', {

        opacity: 1,
        ease: "power2.out"
    })
    .to('.project-name', {

        y: 0,
        top: 0,
        ease: "expo.out",
        duration: 1.5

    })
    .to('.project-description', {

        opacity: 1
    })
    .to({}, {duration:1})


        
    let images = [  "https://img.icons8.com/color/300/javascript--v1.png",
                    "https://img.icons8.com/color/300/html-5--v1.png",
                    "https://img.icons8.com/fluency/300/css3.png",
                    'https://img.icons8.com/color/300/mysql-logo.png',
                    //"https://img.icons8.com/color/300/wordpress.png",
                    //"https://img.icons8.com/plasticine/300/c-sharp-logo.png",
                    "https://img.icons8.com/color/300/gimp.png",
                    "https://img.icons8.com/fluency/300/visual-studio-code-2019.png",
                    //"https://img.icons8.com/fluency/300/visual-studio.png",
                    //"https://img.icons8.com/fluency/300/github.png",
                    "https://img.icons8.com/external-tal-revivo-color-tal-revivo/300/external-hypertext-preprocessor-a-widely-used-open-source-general-purpose-scripting-language-logo-color-tal-revivo.png",
                    //"https://img.icons8.com/color/300/net-framework.png",
                    //"https://img.icons8.com/color/300/microsoft-sql-server.png"
    ]

    let toolsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".tools-section",
            start: "top top",
            end: "+=200%",
            scrub: 1,
            pin: true
        }
    });

    SplitText(document.querySelector('.tools-section-title'), 'tools-title-char');

    let toolsTitleChars = document.querySelectorAll('.tools-title-char');

    for (let index = 0; index < toolsTitleChars.length; index++) {

        const toolsTitleChar = toolsTitleChars[index];

        let y = index % 2 == 0 ? -40 : 40;
        toolsTimeline.from(toolsTitleChar, { opacity: 0, y: y, duration: 0.5 });
        
    }

    toolsTimeline.to({}, { duration: 2 })
    .to('.tools-section', {

        yPercent: -35,
        ease: 'power2.out',
        duration: 6
    })

    //This causes the lag
    const world = new World('.tools-section');

    for(let image of images){

        const x = Math.random() * (window.innerWidth - 100) + 50;
        const y = Math.random() * (window.innerHeight / 2);

        const size = Math.random() * (300 - 200) + 200;

        let body = new Box({
            x: x,
            y: y,
            width: size,
            height: size,
            mass: [1, 20],
            isStatic: false,
            image: image,
            bounce: [0.3, 1],
            gravity: [0.2, 1],
            friction: [0.1, 0.97]
        });

        world.addBody(body);

    }


    let projectImageBtns = document.querySelectorAll('.project-image-button');

    for (const projectImageBtn of projectImageBtns) {
        
        projectImageBtn.addEventListener('mouseenter', () => {

            gsap.to(projectImageBtn, { y: -20, duration: 0.2, ease: 'power2.out'});
        });

        projectImageBtn.addEventListener('mouseleave', () => {

            gsap.to(projectImageBtn, { y: 0, duration: 0.2, ease:  'power2.out'});
        });
    }

});

function MagicCursorSetup(){

    //#region Cursor
        let cursor = new MagicCursor({
            cursor: "/new-portfolio/assets/custom-cursor.webp",
            delay: 0.15,
            className: "follower",
            position: "50% 50%",
        });
    //#endregion Cursor
}

const SmoothScroolSetup = () => {

   const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => lenis.raf(time * 1000));

    gsap.ticker.lagSmoothing(0);

}

const SplitText = (element, charClass) => {

    if (element.dataset.splitDone) return;
    element.dataset.splitDone = "true";

    const walkTextNodes = (node) => {

        const children = [...node.childNodes];

        children.forEach(child => {

            if (child.nodeType === Node.TEXT_NODE) {

                const text = child.textContent;
                const tokens = text.split(/(\s+)/);

                const html = tokens.map(token => {

                    if (!token) return "";

                    if (/^\s+$/.test(token)) 
                        return token.replace(/ /g, `<span class="${charClass}-space" style="display:inline;"> </span>`);

                    const chars = [...token].map(char => `<span class="${charClass}" style="display:inline-block;">${char}</span>`).join("");

                    return `<span class="${charClass}-word" style="display:inline-block; white-space:nowrap;">${chars}</span>`;

                }).join("");

                const wrapper = document.createElement("span");
                wrapper.innerHTML = html;
                child.replaceWith(...wrapper.childNodes);

            } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== "BR") walkTextNodes(child);
        });
    };

    walkTextNodes(element);
};