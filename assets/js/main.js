// Инициализация Fancybox модалок
document.addEventListener('DOMContentLoaded', function() {
    initFancybox();
    initSwiper();
    initQuizAnchor();
    initQuizSteps();
    initCustomSelects();
});

/**
 * Fancybox модальные окна
 */
function initFancybox() {
    Fancybox.bind('[data-fancybox="form-modal"]', {
        content: document.querySelector('#modal'),
        closeButton: false,
        keyboard: true,
        dragToClose: false,
        
        on: {
            done: (fancybox) => {
                // Крестик в первой модалке
                const closeBtn = document.getElementById('modalClose');
                if (closeBtn) {
                    closeBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        fancybox.close();
                    });
                }
                
                // Отправка формы
                const form = document.getElementById('quizForm');
                if (form) {
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        
                        fancybox.close();
                        
                        // Открываем вторую модалку
                        Fancybox.show([{
                            src: '#modalSuccess',
                            type: 'inline'
                        }], {
                            closeButton: false,
                            on: {
                                done: (successFancybox) => {
                                    // Крестик во второй модалке
                                    const successClose = document.getElementById('modalSuccessClose');
                                    if (successClose) {
                                        successClose.addEventListener('click', (e) => {
                                            e.preventDefault();
                                            successFancybox.close();
                                        });
                                    }
                                    
                                    // Кнопка "Вернуться на сайт"
                                    const returnBtn = document.getElementById('returnToSite');
                                    if (returnBtn) {
                                        returnBtn.addEventListener('click', () => {
                                            successFancybox.close();
                                        });
                                    }
                                }
                            }
                        });
                    });
                }
            }
        }
    });
}

/**
 * Swiper карусель для отзывов
 */
function initSwiper() {
    const reviewsSwiper = new Swiper('.reviews__swiper', {
        slidesPerView: 1.2,
        spaceBetween: 24,
        centeredSlides: true,
        loop: true,

        pagination: {
            el: '.reviews__pagination',
            clickable: true,
        },

        breakpoints: {
            768: {
                slidesPerView: 3,
                centeredSlides: false
            }
        }
    });
}

/**
 * Intersection Observer для плавающего блока
 */
function initQuizAnchor() {
    const anchor = document.querySelector('.quiz-anchor');
    const hero = document.querySelector('.hero');

    if (!anchor || !hero) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                anchor.classList.remove('quiz-anchor--hidden');
            } else {
                anchor.classList.add('quiz-anchor--hidden');
            }
        },
        { threshold: 0.1 }
    );

    observer.observe(hero);
}

/**
 * Переключение шагов квиза
 */
function initQuizSteps() {
    document.addEventListener('click', (e) => {
        const next = e.target.closest('[data-next]');
        const back = e.target.closest('[data-back]');

        if (next) {
            e.preventDefault();
            const currentStep = next.dataset.next;
            const nextStep = parseInt(currentStep) + 1;
            switchStep(currentStep, nextStep);
        }

        if (back) {
            e.preventDefault();
            const currentStep = back.dataset.back;
            const prevStep = parseInt(currentStep) - 1;
            switchStep(currentStep, prevStep);
        }

        function switchStep(from, to) {
            const quizSection = document.querySelector('#super-quiz');
            
            quizSection.querySelector(`.quiz__step[data-step="${from}"]`).classList.remove('quiz__step--active');
            quizSection.querySelector(`.quiz__step[data-step="${to}"]`).classList.add('quiz__step--active');
            
            quizSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

/**
 * Кастомные селекты
 */
function initCustomSelects() {
    document.querySelectorAll('.select').forEach(select => {
        const selected = select.querySelector('.select__selected');
        const options = select.querySelector('.select__options');

        selected.addEventListener('click', () => {
            select.classList.toggle('select--active');
        });

        options.querySelectorAll('.select__option').forEach(option => {
            option.addEventListener('click', () => {
                selected.textContent = option.textContent;
                select.classList.remove('select--active');
            });
        });
    });

    // Закрытие при клике вне селекта
    document.addEventListener('click', (e) => {
        document.querySelectorAll('.select').forEach(select => {
            if (!select.contains(e.target)) {
                select.classList.remove('select--active');
            }
        });
    });
}