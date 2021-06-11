class RedLab {
    constructor () {
        this.header = document.querySelector(".header");
        this.orderText = document.querySelector(".oreder-cleaning__text");
        this.ball = document.querySelector(".oreder-cleaning__ball");
        this.ballwrap = document.querySelector(".oreder-cleaning__wrap");

        this.ballwrap.onmousemove = this.moveBall.bind(this);
        this.createAppearScrollAnimation();
        window.addEventListener("scroll", this.scroolDown.bind(this));
        this.ballwrap.addEventListener("mouseout", this.returnInPozition.bind(this));
    }

    moveBall(event){
        let YEvent = event.clientY+202.5-660;
        let xEvent = event.clientX+202.5-(window.innerWidth/2)
        let x = xEvent * 100 / this.ballwrap.clientWidth + "%";
        let y = YEvent * 100 / this.ballwrap.clientHeight + "%";
        if (Number(x.slice(0, -1)) < 0 || Number(y.slice(0, -1)) < 0) {
            this.ball.style.cssText = "left: 50%; top: 50%; transform: translate(-50%, -50%);" 
        }else{
            this.ball.style.cssText = "left:" + x + "; top:" + y + "; transform: translate(-" + x + ", -" + y + ");" 
            this.orderText.style.cssText = "left:" + x + "; top:" + y + "; transform: translate(-" + x + ", -" + y + ");" 
        }
    }

    returnInPozition () {
        this.ball.style.cssText = "left: 50%; top: 50%; transform: translate(-50%, -50%);";
        this.orderText.style.cssText = "";
    }

    scroolDown() {
        if (window.scrollY === 0) {
            this.header.classList.remove("white");
            this.ball.classList.remove("small-circle");
            this.orderText.classList.remove("small-text");
        } else {
            this.header.classList.add("white");
            this.ball.classList.add("small-circle");
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