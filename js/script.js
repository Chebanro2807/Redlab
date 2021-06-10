class RedLab {
    constructor () {
        this.header = document.querySelector(".header");
        this.orderRound = document.querySelector(".oreder-cleaning");
        this.orderText = document.querySelector(".oreder-cleaning__text");
        this.createAppearScrollAnimation();
        window.addEventListener("scroll", this.scroolDown.bind(this));
    }

    scroolDown() {
        if (window.scrollY === 0) {
            this.header.classList.remove("white");
            this.orderRound.classList.remove("small-circle");
            this.orderText.classList.remove("small-text");
        } else {
            this.header.classList.add("white");
            this.orderRound.classList.add("small-circle");
            this.orderText.classList.add("small-text");
        }
    }

    animOnScroll(animItems) {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = this.offset(animItem).top;
            const animStart = 100;
    
            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
    
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('active-scroll-js');
            } else {
                if (!animItem.classList.contains('anim-no-hide-js')) {
                    animItem.classList.remove('active-scroll-js');
                }
            }
        }
    }
    
    offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    
    createAppearScrollAnimation() {
        const animItems = document.querySelectorAll('.anim-items-js');
        if (animItems.length > 0) {
            window.addEventListener('scroll', this.animOnScroll.bind(this, animItems));
        }
        this.animOnScroll(animItems);
    }
}

new RedLab();
