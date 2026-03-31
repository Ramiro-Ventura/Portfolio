window.addEventListener('load', () => {

    //Always play first time going down
    //playUp -> Rest the animation when above the screen if true, it not resets if false
    //playDown -> Rest the animation when below the screen if true, it not resets if false

    let scrollTrigger = {

        selector: '.about-me-image-wrapper',
        triggerDown: 'center 80%',
        triggerUp: 'center 20%',
        transition: 0.4,
        playUp: true,
        playDown: true,
        debug: true
    };

    let from = {

        opacity: 0,
        x: '100%'
    };

    let to = {

        opacity: 1,
        x: 0
    }

    new Animations({scrollTrigger, from, to});

    //CheckVersion();
    //if (window.innerWidth >= 992) window.location.replace('/new-portfolio')
    const lenis = new Lenis();

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
        window.open(link, "_blank");
    }

}



