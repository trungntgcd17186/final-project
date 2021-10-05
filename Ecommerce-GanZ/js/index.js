var slide2s = document.querySelectorAll('.product__new__slide')
var btn2s = document.querySelectorAll('.btn2')
let currentSlide2 = 1;

// javascirpt for image slider manual navigation

var manuaNav2 = function (manual2) {
    slide2s.forEach((product__new__slide) => {
        product__new__slide.classList.remove('is-active');
    })
    btn2s.forEach((btn2) => {
        btn2.classList.remove('is-active');
    })

    slide2s[manual2].classList.add('is-active')
    btn2s[manual2].classList.add('is-active')
}

btn2s.forEach((btn2, i) => {
    btn2.addEventListener("click", () => {
        manuaNav2(i)
        currentSlide2 = i;
    })
})

var repeat = function (activeClass) {
    let active2 = document.getElementsByClassName('is-active')
    let i = 1;

    var repeater = () => {
        setTimeout(function () {

            [...active2].forEach((activeSlide) => {
                activeSlide.classList.remove('is-active');
            })

            slide2s[i].classList.add('is-active');
            btn2s[i].classList.add('is-active')
            i++

            if (slide2s.length == i) {
                i = 0;
            }
            if (i >= slide2s.length) {
                return;
            }

            repeater();
        }, 7000);
    }
    repeater();
}
repeat();


var counter = 1;
setInterval(function () {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter > 4){
        counter = 1
    }
}, 5000);


// mobile menu

function mobileMenu() {
    var menuMobile = document.getElementById('mobile-menu')
    if (menuMobile.style.display === "block") {
        menuMobile.style.display = "none";
      } else {
        menuMobile.style.display = "block";
    }
}

function closeMenu() {
    var menuMobile = document.getElementById('mobile-menu')
        menuMobile.style.display = "none";
}

function inputOpenSearch(){
    let inputSearch = document.querySelector('.header-with-search .header__search-container .header__search');
    inputSearch.classList.toggle('header__search-mobile');
}
