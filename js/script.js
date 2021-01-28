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


    const openModalBtn = document.querySelectorAll('[data-modal]'),
        windowModal = document.querySelector('.modal'),
        closeModalBtn = document.querySelector('.modal__close');

    let openModal = () => {
        windowModal.classList.add('show');
        windowModal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    }, closeModal = () => {
        windowModal.classList.add('hide');
        windowModal.classList.remove('show');
        document.body.style.overflow = '';
    };


    openModalBtn.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    closeModalBtn.addEventListener('click', closeModal);

    windowModal.addEventListener('click', (e) => {
        if (e.target === windowModal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && windowModal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimer = setTimeout(openModal, 5000);

    let showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }

        // window.pageYOffset - скільки користувач уже проскролив
        // document.documentElement.clientHeight - довжина всього документа
        // document.documentElement.scrollHeight - де ми зараз
    };

    window.addEventListener('scroll', showModalByScroll);

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
});
