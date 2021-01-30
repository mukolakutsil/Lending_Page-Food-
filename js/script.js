document.addEventListener('DOMContentLoaded', () => {
    // Tabs

    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsParent = document.querySelector('.tabheader'),
        tabsContent = document.querySelectorAll('.tabcontent');


    let hideTabsContent = () => {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };

    let showTabContent = (i = 0) => {
        tabs[i].classList.add('tabheader__item_active');
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

    };

    hideTabsContent();
    showTabContent();


    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabsContent();
                    showTabContent(i);
                }
            });
        }

    });

    // Timer

    const deadline = '2021-02-01';

    let getTimeRemaining = (endtime) => {

        // Рахуємо та повертаємо дні, години, ....
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    let addZero = (num) => {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    };

    let setClock = (selector, endTime) => {

        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');


        let updateClock = () => {
            // Викликаємо функцію і отримані дані записуємов в змінну
            const t = getTimeRemaining(endTime);

            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            const timeInterval = setInterval(updateClock, 1000);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        };

        updateClock();

    };

    setClock('.timer', deadline);


    // Modal


    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalIconClose = document.querySelector('.modal__close');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalIconClose.addEventListener('click', () => {
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 20000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);


    // window.pageYOffset - скільки користувач уже проскролив
    // document.documentElement.clientHeight - довжина всього документа
    // document.documentElement.scrollHeight - де ми зараз

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {

            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.price = price;
            this.transfer = 27;
            this.changeToUAH();

        }

        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }


    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        `Меню "Фитнес" - это новый подход к приготовлению блюд: 
        больше свежих овощей и фруктов. Продукт активных и здоровых
        людей. Это абсолютно новый продукт с оптимальной ценой и высоким
        качеством!`,
        9,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        `Меню “Постное” - это тщательный подбор ингредиентов: 
        полное отсутствие продуктов животного происхождения, 
        молоко из миндаля, овса, кокоса или гречки, правильное 
        количество белков за счет тофу и импортных вегетарианских стейков.`,
        14,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        `В меню “Премиум” мы используем 
        не только красивый дизайн
        упаковки, но и качественное
        исполнение блюд. Красная рыба,
        морепродукты, фрукты - 
        ресторанное меню без похода в
        ресторан! Ждем только Вас)))`,
        21,
        ".menu .container"
    ).render();


    // Slide

    const prev = document.querySelector('.offer__slider-prev'),
        slider = document.querySelector('.offer__slider'),
        next = document.querySelector('.offer__slider-next'),
        currentNum = document.querySelector('#current'),
        totalNum = document.querySelector('#total'),
        slides = document.querySelectorAll('.offer__slide'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesFiled = document.querySelector('.offer__slide-inner'),
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

    next.addEventListener('click', () => {

        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
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
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
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
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

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




    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Дякуємо! Скоро ми з вам зателефонуємо',
        failure: 'Щось пішло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            fetch('../server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            }).then(data => data.text())
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });


            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         statusMessage.remove();
            //         form.reset();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 3000);

    }
});