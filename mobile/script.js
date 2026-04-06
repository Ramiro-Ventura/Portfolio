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
    const lenis = new Lenis({
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