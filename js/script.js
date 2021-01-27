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


});
