window.addEventListener("load", () => {

    //CheckVersion();
    
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);  

    SetCurrentAge();
    MagicCursorSetup();
    SmoothScroolSetup();
    HeroAnimations();
    WorkAnimations();
    ContactAnimations();


});

//window.addEventListener('resize', () => CheckVersion());
    
const CheckVersion = () => { if (window.innerWidth < 992) window.location.replace('/new-portfolio/mobile'); }

const SetCurrentAge = () => {

    let ageSpan = document.querySelector("#age-span");
    let birthDate = new Date("January 15, 2004");
    let today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;  
    
    ageSpan.innerHTML = age;

}

function MagicCursorSetup(){

    //#region Cursor
        let cursor = new MagicCursor({
            cursor: "/new-portfolio/assets/custom-cursor.webp",
            delay: 0.15,
            className: "follower",
            position: "50% 50%",
        });
    //#endregion Cursor


    //#region Contacts section
        let githubImageURL = 'https://img.icons8.com/fluency/96/github.png';
        let linkedinImageURL = 'https://img.icons8.com/color/96/linkedin.png';
        let emailImageURL = 'https://img.icons8.com/color/96/gmail-new.png';

        let githubImage = new Image();
        let linkedinImage = new Image();
        let emailImage = new Image();

        githubImage.src = githubImageURL;
        linkedinImage.src = linkedinImageURL;
        emailImage.src = emailImageURL;

        let contactsParticlesBase = {

            baseSize: [35, 50],
            finalSize: [5, 8],
            gravity: -0.15,
            friction: 0.96,
            rotation: [-20, 20],
            spin: [-0.05, 0.05],
            speedMultiplier: 2,
            spawnDistance: 80,
            spawnChance: 0.7,
            decay: 0.01,
            lifetime: 0.2
        }

        cursor.onHover({

            selector: '.contacts-section',
            particles: {
                shape: { a: githubImage, b: linkedinImage, c: emailImage },
                ...contactsParticlesBase
            }
        });

        cursor.onHover({

            selector: '.github',
            particles: {
                shape: githubImage,
                ...contactsParticlesBase
            }
        });

        cursor.onHover({

            selector: '.linkedin',
            particles: {
                shape: linkedinImage,
                ...contactsParticlesBase
            }
        });

        cursor.onHover({

            selector: '.email',
            particles: {
                shape: emailImage,
                ...contactsParticlesBase
            }
        });

        cursor.onHover({

            selector: '.contact-text',
            cursor: '/new-portfolio/assets/custom-cursor-pointer.webp',
            className: 'follower-contact-wrapper',
            width: "100px",
            height: "40px",
            position: "5% 50%",
            onEnter: (element) => {

                if(element.innerHTML.toLowerCase() == 'email')
                    document.querySelector("#follower p").innerHTML = "COPY";
                else 
                    document.querySelector("#follower p").innerHTML = "OPEN";
                
            },
            onLeave: () => {
                document.querySelector("#follower p").innerHTML = "";
            }
        });

    //#endregion Contacts section


    //#region work-project-container
        cursor.onHover({

            selector: '.work-project-container',
            cursor: '/new-portfolio/assets/custom-cursor-pointer.webp',
            className: 'follower-hover',
            width: "100px",
            height: "40px",
            position: "5% 50%"
        });
    //#endregion work-project-container


    //#region container-magnetic-object
        cursor.onHover({

            selector: '.container-magnetic-object',
            width: '0px',
            height: '0px',
            particles: null
        });
    //#endregion container-magnetic-object


    //#region hero-image
        cursor.onHover({

            selector: '.hero-image',
            className: 'follower-hero-image',
            width: "150px",
            height: "150px",
            position: "50% 80%"
        });
    //#endregion hero-image


    //#region Menu items
        cursor.onHover({

            selector: ".menu-links",
            cursor: '/new-portfolio/assets/custom-cursor-pointer.webp'
        })
    //#endregion Menu items

}

const SmoothScroolSetup = () => {

   const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => lenis.raf(time * 1000));

    gsap.ticker.lagSmoothing(0);

}

function HeroAnimations(){

    let timeline = gsap.timeline({
        scrollTrigger: {
            id: "hero-section",
            trigger: ".hero-section",
            start: "top top",
            end: "+=1000%",
            scrub: 1,            
            pin: true
        }
    });

    const heroImagesDuration = 0.7;
    const imagesAndTextDuration = 0.55;

    timeline.to(".ramiro",              { xPercent: -50, left: "50%", ease: "power2.out", duration: heroImagesDuration }, "<")
    .to(".ventura",                     { xPercent: 50, right: "50%", ease: "", duration: heroImagesDuration }, "<")
    .to(".hero-image-container-top",    { yPercent: -100, ease: "", duration: heroImagesDuration }, "-=0.35")
    .to(".hero-image-container-bottom", { yPercent: 100,    ease: "power2.out", duration: heroImagesDuration }, "<")
    .to(".about-me-container",          { opacity: 1 }, "-=0.8")
    .to(".hero-image-container",        { opacity: 0, scale: 0, duration: 0}, "+=0.4");

    const textContainers = gsap.utils.toArray(".about-me-text-container");
    const images = gsap.utils.toArray(".about-me-image-wrapper");

    let angles = [-5.38, 1.89, -7.82102, -1.68, 4.71];

    textContainers.forEach((textContainer, index) => {

        let aboutMeText = textContainer.querySelector('.about-me-text');
        let aboutMePs = aboutMeText.querySelectorAll('p'); 
        //SplitText(aboutMeText, 'about-me-text-chars');

        //const chars = textContainer.querySelectorAll('.about-me-text-chars');

        timeline.set(textContainer, { scale: 1, immediateRender: false }, index === 0 ? "-=0.4" : ">");
        
        timeline.fromTo(textContainer, { opacity: 0, yPercent: 10 }, { opacity: 1, yPercent: 0, duration: imagesAndTextDuration }, index === 0 ? "-=0.4" : ">");

        if (images[index]) {

            gsap.set(images[index], { xPercent: -50, yPercent: 200, scale: 1.5, rotation: angles[index] * -1 });

            // Animação
            timeline.to(images[index], {
                scale: 1,
                yPercent: -50,
                xPercent: -50,   // mantém o centramento durante a animação
                rotation: angles[index],
                duration: imagesAndTextDuration,
                ease: "expo.out"
            }, "<");
        }

        gsap.set(aboutMePs, { opacity: 0.01, y: -20 });
        timeline.to(aboutMePs, {

            opacity: 1,
            y: 0,
            stagger: 0.4,
            duration: 0.4
        }, ">");

        /*timeline.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.1
        }, ">");*/



        if(index == 0) timeline.addLabel('about-me');

        if (index !== textContainers.length - 1) timeline.to(textContainer, { opacity: 0, yPercent: -5, duration: imagesAndTextDuration });
        
    });
}

function WorkAnimations(){


    const workTimeline = gsap.timeline({
        scrollTrigger: {
            id: "work-section",
            trigger: ".work-section",
            start: "top top",
            end: "+=700%",
            scrub: 1,
            pin: true
        }
    });

    let primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    let textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color')

    workTimeline.to(".work-word", { rotateX: "90deg",z: -200, opacity: 0.2, ease: "none"})
    .to(".work-section", {backgroundColor: textColor, duration: 0.2}, "<")
    .set(".work-word", { scale: 0, opacity: 0, duration: 0 }, ">");

    let workProjectsContainers = gsap.utils.toArray('.work-project-container');

    workProjectsContainers.forEach((project, index) => {
        
        workTimeline.to(project, { y: 0, ease: "power2.out" }, index === 0 ? "-=0.5" : "<")

        if (index !== workProjectsContainers.length - 1) workTimeline.to(project, { scale: 0.7 });
    });

    workTimeline.to(".work-section", {backgroundColor: primaryColor, duration: 0.2 }, ">");

}

function ContactAnimations(){

    /*const timeline = gsap.timeline({
        scrollTrigger: {
            id: "contacts-section",
            trigger: ".contacts-section",
            start: "top top",
            end: "+=400%",
            scrub: 1,
            pin: true
        }
    });*/

    TimelineAnimations();
    const contactContainers = gsap.utils.toArray('.contact-container');

    contactContainers.forEach(contactContainer => {

        let magneticObject  = contactContainer.querySelector(".container-magnetic-object");
        let contactText     = contactContainer.querySelector(".contact-text");
        let underline       = contactContainer.querySelector('.contact-text-underline');
        let contactValue    = contactContainer.querySelector('.contact-value');
        
        //TimelineAnimations(timeline, magneticObject, contactText);
        
        MagnetismEffect(magneticObject);
        
        HoverAnimations(contactContainer, contactText, underline, contactValue);

        OnContactClick(contactContainer, magneticObject, contactText);
    });

    function TimelineAnimations(){

        let magneticObjects  = document.querySelectorAll(".container-magnetic-object");
        let contactTexts     = document.querySelectorAll(".contact-text");

        const timeline = gsap.timeline({
            scrollTrigger: {
                id: "contacts-section",
                trigger: ".contacts-section",
                start: "top top",
                end: "+=400%",
                scrub: 1,                
                pin: true
            }
        });

        timeline.to('.contacts-title', {

            opacity: 1,
            ease: "power2.out"
        })
        .to('.contacts-title', {

            y: 0,
            top: 0,
            ease: "expo.out"

        })
        .to('.contacts-containers-wraper', {

            opacity: 1,
            scale: 1,
            duration: 0
        })
        .to(magneticObjects, { 

            x: 0,
            opacity: 1,
            ease: "elastic.out(0.7, 0.3)",
            stagger: 0.3,
            duration: 0.5

        })
        .to(contactTexts, {

            rotateX: 0,
            opacity: 1,
            transformPerspective: 800,
            ease: "power2.out",
            stagger: 0.3,
            duration: 0.5

        }, "<")
        .addLabel('contacts')
        .to({}, { duration: 0.2 })
        .to('.contacts-section', {

            yPercent: -35
        }, ">");

    }

    /*function TimelineAnimations(timeline, magneticObject, contactText){

        gsap.set(contactText, { transformPerspective: 200 })

        timeline.to('.contacts-title', {

            opacity: 1,
            //duration: 5,
            ease: "power2.out"
        })
        .to('.contacts-title', {

            y: 0,
            top: 0,
            //duration: 8,
            ease: "expo.out"

        })
        .from(magneticObject, { 

            xPercent: -200,   
            opacity: 0,
            //duration: 8,
            ease: "elastic.out(0.7, 0.3)",

        })
        .from(contactText, {

            rotateX: "90deg",
            z: -200,
            opacity: 0.2,
            ease: "power2.out",
            //duration: 8

        }, "<");

    }*/

    function MagnetismEffect(magneticObject){

        let magneticObjectsImg = magneticObject.querySelector("img");


        magneticObject.addEventListener("mousemove", (e) => {

            const rect = magneticObject.getBoundingClientRect();
            
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            const normX = mouseX / (rect.width / 2);
            const normY = mouseY / (rect.height / 2);

            gsap.to(magneticObject, {
                x: mouseX * 1.5,
                y: mouseY * 1.5,
                duration: 0.6,
                ease: "power2.out"
            });

            gsap.to(magneticObjectsImg, {
                x: mouseX * 0.05,
                y: mouseY * 0.05,
                rotateX: -normY * 40,
                rotateY: normX * 40,
                rotateZ: normX * normY * 10,
                transformPerspective: 600,
                duration: 0.6,
                ease: "power2.out"
            });
        });

        magneticObject.addEventListener("mouseleave", () => {

            gsap.to(magneticObject, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1.7, 0.2)"
            });

            gsap.to(magneticObjectsImg, {
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                duration: 0.8,
                ease: "elastic.out(1.8, 0.4)"
            });
        });

    }

    function HoverAnimations(contactContainer, contactText, underline, contactValue){

        let duration = .5;
        let ease = "power2.out";

        SplitText(contactValue, `char char-${contactContainer.dataset.name}`);

        gsap.set(`.char-${contactContainer.dataset.name}`, { opacity: 0, y: 20 });

        contactText.addEventListener("mousemove", (e) => {
            
            gsap.to(underline, { width: "100%", duration: duration, ease: ease });

            gsap.to(`.char-${contactContainer.dataset.name}`,{
                opacity: 1,
                y: 0,
                stagger: 0.01,
                duration: duration,
                ease: ease
            }, "<");

        });

        contactText.addEventListener("mouseleave", (e) => {

            gsap.to(underline, { width: "0%", duration: duration, ease: ease });

            gsap.to(`.char-${contactContainer.dataset.name}`, {
                opacity: 0,
                y: 20,
                stagger: 0.01,
                duration: duration,
                ease: ease
            }, "<");

        });
    }

    function OnContactClick(contactContainer, magneticObject, contactText){

        let links = {

            github: "https://github.com/Ramiro-Ventura",
            linkedin: "https://linkedin.com/in/ramiro-ventura",
            email: "ramiro.herlander.ventura@gmail.com"
        }

        contactText.addEventListener("click", () => {

            if(contactContainer.dataset.name === "email"){

                navigator.clipboard.writeText(links.email).then(() => {

                    document.querySelector("#follower p").innerHTML = "COPIED";

                    let magneticObjectsImg = magneticObject.querySelector("img");

                    gsap.set(magneticObject, { x: 80, y: 80, duration: 0 });
                    gsap.set(magneticObjectsImg, { x: 20, y: 20, duration: 0 });

                    gsap.to([magneticObject, magneticObjectsImg], {x: 0, y: 0, duration: 1, ease: "elastic.out(0.7, 0.2)"});

                }).catch(() => {});

            }else{

                window.open(links[contactContainer.dataset.name], "_blank");
            }
        });

    }

}

let isAnimating = false;

function MenuAnimations(menuBtn){

    if(isAnimating) return;

    if(menuBtn.dataset.status == 'close'){

        OpenMenu(menuBtn);

    } else {

        CloseMenu(menuBtn);
    }
}

function OnMenuItemClick(timelineId, label){

    JumpTo(timelineId, label);
    setTimeout(() => {
        CloseMenu(document.querySelector('.menu-btn'));
    }, 500); 
}

function OpenMenu(menuBtn){

    let menuStrokes = gsap.utils.toArray('.menu-btn-stroke');
    let topColumns = gsap.utils.toArray('.menu-animation-column-top');
    let bottomColumns = gsap.utils.toArray('.menu-animation-column-bottom');

    let duration = 0.5;
    isAnimating = true;

    const openTimeline = gsap.timeline({
        onComplete: () => { isAnimating = false; }
    });

    let yValue = parseInt(getComputedStyle(menuStrokes[0]).height) + parseInt(getComputedStyle(menuBtn).gap);

    openTimeline.to(menuStrokes[0], { y: yValue, rotateZ: 45, transformOrigin: "center center", duration: duration, ease: "power2.inOut" })
    .to(menuStrokes[1], { opacity: 0, duration: duration }, "<")
    .to(menuStrokes[2], { y: -yValue, rotateZ: -45, transformOrigin: "center center", duration: duration, ease: "power2.inOut" }, "<")
    .set('.menu-container', { display: 'block', duration: 0 }, "<")
    .to(topColumns, { y: 0, stagger: 0.2, duration: duration }, "<")
    .to(bottomColumns, {  y: 0, stagger: 0.2, duration: duration, onComplete: () => lockScroll() }, "<")
    .to('.menu-content-container', { opacity: 1, duration: 0.4 }, ">");

    menuBtn.dataset.status = "open";
}

function CloseMenu(menuBtn){

    let menuStrokes = gsap.utils.toArray('.menu-btn-stroke');
    let topColumns = gsap.utils.toArray('.menu-animation-column-top');
    let bottomColumns = gsap.utils.toArray('.menu-animation-column-bottom');

    let duration = 0.5;
    isAnimating = true; 

    unlockScroll();

    let closeTimeline = gsap.timeline({

        onComplete: () => {

            gsap.set('.menu-container', { display: 'none' });
            isAnimating = false;
        }
    });

    closeTimeline.to([menuStrokes[0], menuStrokes[2]], { y: 0, rotateZ: 0, transformOrigin: "center center", duration: duration, ease: "power2.inOut"})
    .to(menuStrokes[1], { opacity: 1, duration: duration}, ">-=0.3")
    .to('.menu-content-container', { opacity: 0, duration: 0.4 }, "<")
    .to(topColumns, { y: '-100%', stagger: 0.2, duration: duration}, ">")
    .to(bottomColumns, { y: '100%', stagger: 0.2, duration: duration }, "<");

    menuBtn.dataset.status = "close";
}



//Utils
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

function JumpTo(triggerId, seekTime) {

    const st = ScrollTrigger.getById(triggerId);
    const timeline = st.animation;

    let labelTime;

    if (seekTime === undefined || seekTime === 'start') labelTime = 0;
    else if (seekTime === 'end') labelTime = timeline.duration();
    else labelTime = timeline.labels[seekTime] ?? 0;

    st.disable(false);

    gsap.to(window, {
        scrollTo: st.start + (labelTime / timeline.duration()) * (st.end - st.start),
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
            st.enable();
        }
    });
}

let scrollY = 0;

function lockScroll() {
    scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
}

function unlockScroll() {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
}