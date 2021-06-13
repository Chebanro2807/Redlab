class RedLab {
    constructor () {
        this.header = document.querySelector(".header");
        this.orderWrap = document.querySelector(".oreder-cleaning");
        this.orderText = document.querySelector(".oreder-cleaning__text");
        this.ball = document.querySelector(".oreder-cleaning__ball");
        this.ballwrap = document.querySelector(".oreder-cleaning__wrap");

        this.cleaning = document.querySelector(".cleaning"); 
        this.cleaning__img = document.querySelector(".cleaning__img"); 
        this.cleaning__text = document.querySelector(".cleaning__text"); 
        this.cleaning__menu = document.querySelector(".cleaning__menu"); 

        this.places = document.querySelectorAll(".cleaning__item");
        this.pictures = document.querySelectorAll(".cleaning__img-item");
        this.places.forEach(place => {
            place.addEventListener("click", this.addArrow.bind(this, place));
            place.addEventListener("mouseover", this.showImg.bind(this, place));
            place.addEventListener("mouseout", this.hideImg.bind(this, place));
        })

        this.yEvent = 0;

        this.ballwrap.onmousemove = this.moveBall.bind(this);
        window.addEventListener("scroll", this.scroolDown.bind(this));
        this.ballwrap.addEventListener("mouseout", this.returnInPozition.bind(this));
        this.createAppearScrollAnimation();
        this.scroolDown();
    }

    hideImg() {
        this.cleanImg();
        this.cleaning__img.classList.remove("img-index");
    }

    showImg(place) {
        if (place.firstChild.classList.contains("div-show")) {
            return;
        }
        this.cleanImg();
        this.placeIndex = Number(place.getAttribute("data-index"));
        this.pictures[this.placeIndex].classList.add("show-img");
        this.cleaning__img.classList.add("img-index");
    }

    cleanImg() {
        this.pictures.forEach(pict => {
            pict.classList.remove("show-img");
        })
    }

    addArrow(place) {
        this.changeBg();
        this.pictures[2].style.cssText = "background-size: cover";
        this.cleanArrows();
        place.querySelector("p").style.cssText = "font-style: italic; opacity: 1; left:54px; transition: left 1s;";
        place.querySelector("div").classList.add("div-show");
        place.style.cssText = "font-style: italic; opacity: 1;";
        this.cleanPlus();
        switch (this.placeIndex) {
            case 0: this.createPlusForKitchen();
                break;
            case 1:
                break;
            case 2: this.createPlusForBathroom();
                break;
            case 3:
                break;
        }
        this.hideImg();
    }

    changeBg() {
        this.cleaning__img.style.cssText = "background-image: url(/img/cleaning/cleaning"+this.placeIndex+".webp);"
    }

    cleanPlus() {
        document.querySelectorAll(".show-plus").forEach(item => {
            item.classList.remove("show-plus")});
    }

    createPlusForKitchen() {
        document.querySelectorAll(".cleaning__kitchen-plus-itemwrap").forEach(item => {
            item.classList.add("show-plus");
        })
    }

    createPlusForBathroom() {
        document.querySelectorAll(".cleaning__bathroom-plus-itemwrap").forEach(item => {
            item.classList.add("show-plus");
        })
    }

    cleanArrows() {
        this.places.forEach(place => {
            place.querySelector("p").style.cssText = "opacity: 1; left:0px; transition: left 1s;";
            place.querySelector("div").classList.remove("div-show");
        })
    }

    moveBall(event){
        if (window.scrollY === 0) {
            this.yEvent = event.clientY+202.5-660;
        } else {
            this.yEvent = event.clientY+202.5-(window.innerHeight/10*8.7);
        }
        let xEvent = event.clientX+217.5-(window.innerWidth/2);
        let x = xEvent * 100 / this.ballwrap.clientWidth + "%";
        let y = this.yEvent * 100 / this.ballwrap.clientHeight + "%";
        if (Number(x.slice(0, -1)) < 0 || Number(y.slice(0, -1)) < 0) {
            this.ball.style.cssText = "" 
        }else{
            this.ball.style.cssText = "left:" + x + "; top:" + y + "; transform: translate(-" + x + ", -" + y + ");" 
            this.orderText.style.cssText = "left:" + x + "; top:" + y + "; transform: translate(-" + x + ", -" + y + ");" 
        }
    }

    returnInPozition () {
        if (window.scrollY === 0) {
            this.ball.style.cssText = "left: 50%; top: 50%; transform: translate(-50%, -50%);";
        } else {
            this.ball.style.cssText = "top:65%;";
        }
        
        this.orderText.style.cssText = "";
    }

    scroolDown() {
        if (window.scrollY === 0) {
            this.header.classList.remove("white");
            this.ball.classList.remove("small-circle");
            this.orderText.classList.remove("small-text");
            this.orderWrap.classList.remove("small-wrap");
            this.ball.style.cssText = "top: 50%;";
        } else {
            this.header.classList.add("white");
            this.ball.classList.add("small-circle");
            this.orderText.classList.add("small-text");
            this.orderWrap.classList.add("small-wrap");
            this.ball.style.cssText = "top: 65%;";
        }
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            this.header.classList.add("hide-header");
            this.cleaning.classList.add("full-screen");
            this.cleaning__img.classList.add("full-screen__img");
            this.cleaning__text.classList.add("full-screen__text");
            this.cleaning__menu.classList.add("full-screen__menu");

            this.orderWrap.classList.add("hide");
            this.ball.classList.add("hide");
            this.orderText.classList.add("hide-text");
            this.ballwrap.classList.add("hide");
            this.cleanPlus();
            this.addArrow(this.places[0]);
            this.createPlusForKitchen();
            this.cleaning__img.style.cssText = "background-image: url(/img/cleaning/cleaning0.webp);"
        } else {
            this.header.classList.remove("hide-header");
            this.cleaning.classList.remove("full-screen");
            this.cleaning__img.classList.remove("full-screen__img");
            this.cleaning__text.classList.remove("full-screen__text");
            this.cleaning__menu.classList.remove("full-screen__menu");
        
            this.orderWrap.classList.remove("hide");
            this.orderText.classList.remove("hide-text");
            this.ball.classList.remove("hide");
            this.ballwrap.classList.remove("hide");
            this.cleaning__img.style.cssText = "background-image: url(/img/cleaning/cleaning0.webp);"
            this.cleanPlus();
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