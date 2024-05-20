
import ScrollReveal from 'scrollreveal';

export const initMenuEffects = () => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    const navLink = document.querySelectorAll('.nav__link');

    function linkAction() {
        navMenu.classList.remove('show-menu');
    }

    navLink.forEach((n) => n.addEventListener('click', linkAction));
};

// Hiệu ứng cho việc thay đổi background header khi scroll
export const initScrollHeaderEffect = () => {
    const header = document.getElementById('header');

    function scrollHeader() {
        if (this.scrollY >= 50) header.classList.add('scroll-header');
        else header.classList.remove('scroll-header');
    }

    window.addEventListener('scroll', scrollHeader);
};

// Hiệu ứng cho việc hiển thị nút scroll-up
export const initScrollUpEffect = () => {
    function scrollUp() {
        const scrollUp = document.getElementById('scroll-up');
        if (this.scrollY >= 200) scrollUp.classList.add('show-scroll');
        else scrollUp.classList.remove('show-scroll');
    }

    window.addEventListener('scroll', scrollUp);
};

// Hiệu ứng cho việc kích hoạt link trong menu khi scroll
export const initScrollActiveEffect = () => {
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            let sectionId;
            sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
            } else {
                document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
            }
        });
    }

    window.addEventListener('scroll', scrollActive);
};

