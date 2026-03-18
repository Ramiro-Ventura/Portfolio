window.addEventListener("load", () => {

    SetCurrentAge();

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);


    HeroAnimations(gsap);



    const workTimeline = gsap.timeline({
        scrollTrigger: {
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
    .to("body", {backgroundColor: textColor, duration: 0.2}, "<");

    let workProjectsContainers = gsap.utils.toArray('.work-project-container');

    workProjectsContainers.forEach((project, index) => {
        
        workTimeline.to(project, { y: 0, ease: "power2.out" }, index === 0 ? "-=0.5" : "<")

        if (index !== workProjectsContainers.length - 1)
            workTimeline.to(project, { scale: 0.7 });
        else 
            workTimeline.to(workProjectsContainers, { yPercent: -105 });

        lastProject = project;

    });

    workTimeline.set(".work-word", { yPercent: -100, duration: 0 }, "<");
    workTimeline.to(".work-word", { rotateX: "180deg", opacity: 1, z: 0, ease: "none"}, "<");

    workTimeline.to("body", {backgroundColor: primaryColor, duration: 0.2 }, "<");


    /*workTimeline.to(".work-project-container", {
        y: 0,
        ease: "none",
        stagger: 0.5 // This ensures project 2 starts halfway through project 1
    });*/

});


function HeroAnimations(gsap){

    let timeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "+=700%",
            scrub: 1,
            pin: true
        }
    });

    timeline.to(".ramiro", { xPercent: -50, left: "50%"  , ease: "power2.out", duration: 1 }, "<")
    .to(".ventura", { xPercent: 50, right: "50%", ease: "", duration: 1 }, "<")
    .to(".hero-image-container-top", { yPercent: -100, ease: "", duration: 1 }, "-=0.35")
    .to(".hero-image-container-bottom", { yPercent: 100, ease: "power2.out", duration: 1 }, "<")
    .fromTo(".about-me-container", { opacity: 0 }, { opacity: 1 }, "-=0.8")
    .to(".hero-image-container", { opacity: 0, scale: 0, duration: 0}, "+=0.4");

    const textContainers = gsap.utils.toArray(".about-me-text-container");
    const images = gsap.utils.toArray(".about-me-image-wrapper");

    let angles = ["-5.38deg", "1.89deg", "-7.82102deg", "-1.68deg", "4.71deg"]

    textContainers.forEach((textContainer, index) => {

        timeline.set(textContainer, { scale: 1, immediateRender: false }, index === 0 ? "-=0.4" : ">");        
        
        timeline.fromTo(textContainer, { opacity: 0, yPercent: 10 }, { opacity: 1, yPercent: 0, duration: 1 }, index === 0 ? "-=0.4" : ">");

        if (images[index]) timeline.fromTo(images[index], { scale: 1.5, y: 1000, rotation: angles[index]}, { scale: 1, y: 0, rotation: angles[index], duration: 1, ease: "circ.out" }, "<");

        timeline.to({}, { duration: 0.5 });

        if (index !== textContainers.length - 1) timeline.to(textContainer, { opacity: 0, yPercent: -5, duration: 1 });
        
    });
}


const SetCurrentAge = () => {

    let ageSpan = document.querySelector("#age-span");
    let birthDate = new Date("January 15, 2004");
    let today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;  
    
    ageSpan.innerHTML = age;

}


const Reverse = (number) => number * -1;

function GenerateCats(parent){
    let coordinates = [["97%","47%"], ["93%","82%"], ["14%","20%"], ["68%","96%"], ["55%","53%"], ["26%","33%"], ["87%","15%"], ["75%","63%"], ["20%","77%"], ["32%","94%"], ["44%","22%"], ["55%","85%"], ["36%","56%"], ["70%","30%",]];

    for(let c = 0; c < 14; c++){

        let left = coordinates[c][0];
        let top = coordinates[c][1];

        let catImg = document.createElement("img");
        catImg.src = `assets/cat_${c + 1}.png`;
        catImg.style.left = `${left}`;
        catImg.style.top = `${top}`;
        catImg.draggable = false;
        parent.appendChild(catImg);
    }
}

/**
 * Generates a random floating-point number between min (inclusive) and max (exclusive).
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} A random number within the specified range.
 */
function Random(min, max) {

    return Math.random() * (max - min) + min;
}

