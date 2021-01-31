let slider = ({ container, slide, nextArrow, prewArrow, totalCounter, currentCounter, wrapper, field }) => {

    // Slide

    const prev = document.querySelector(prewArrow),
        slider = document.querySelector(container),
        next = document.querySelector(nextArrow),
        currentNum = document.querySelector(currentCounter),
        totalNum = document.querySelector(totalCounter),
        slides = document.querySelectorAll(slide),
        slidesWrapper = document.querySelector(wrapper),
        slidesFiled = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;


    let slideIndex = 1,
        offset = 0;

    if (slides.length < 10) {
        currentNum.textContent = `0${slideIndex}`;
        totalNum.texContent = `0${slides.length}`;
    } else {
        currentNum.textContent = slideIndex;
        totalNum.texContent = slides.length;
    }

    slidesFiled.style.width = 100 * slides.length + '%';
    slidesFiled.style.display = 'flex';
    slidesFiled.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';



    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');

    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    let slideTransform = () => {
        slidesFiled.style.transform = `translateX(-${offset}px)`;
    };

    let createDots = () => {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    };

    let currentCount = () => {
        if (slides.length < 10) {
            currentNum.textContent = `0${slideIndex}`;
        } else {
            currentNum.textContent = slideIndex;
        }
    };

    let symbolCutting = str => +str.replace(/\D/g, '');

    next.addEventListener('click', () => {

        if (offset == symbolCutting(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += symbolCutting(width);
        }

        slideTransform();

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentCount();

        createDots();

    });

    prev.addEventListener('click', () => {

        if (offset == 0) {
            offset = symbolCutting(width) * (slides.length - 1);
        } else {
            offset -= symbolCutting(width);
        }

        slideTransform();

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currentCount();

        createDots();

    });


    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = symbolCutting(width) * (slideTo - 1);

            slideTransform();

            currentCount();

            createDots();

        });

    });

    // const hideSlides = () => {
    //     slides.forEach(slide => {
    //         slide.classList.add('hide');
    //     });
    // };

    // const showSlide = (num) => {

    //     if (num > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (num < 1) {
    //         slideIndex = slides.length;
    //     }

    //     hideSlides();

    //     slides[slideIndex - 1].classList.remove('hide');

    //     if (slides.length < 10) {
    //         currentNum.textContent = `0${slideIndex}`;
    //     } else {
    //         currentNum.textContent = slideIndex;
    //     }

    // };

    // showSlide(slideIndex);

    // if (slides.length < 10) {
    //     totalNum.textContent = `0${slides.length}`;
    // } else {
    //     totalNum.textContent = slides.length;
    // }

    // prev.addEventListener('click', () => {

    //     slideIndex--;
    //     showSlide(slideIndex);

    // });

    // next.addEventListener('click', () => {

    //     slideIndex++;
    //     showSlide(slideIndex);

    // });


};

export default slider;