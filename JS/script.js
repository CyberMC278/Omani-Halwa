document.addEventListener('DOMContentLoaded', () => {
    // 1. إدارة وتفعيل الوضع الداكن (Dark Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }

    themeToggleBtn?.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // 2. التحكم بشريط التنقل وتحديد الرابط النشط (Scroll Spy)
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // إخفاء/إظهار شريط التنقل
        if (currentScroll > 80) {
            if (currentScroll > lastScrollTop) {
                header?.classList.add('header-hidden');
            } else if (lastScrollTop - currentScroll > 10) {
                header?.classList.remove('header-hidden');
            }
        } else {
            header?.classList.remove('header-hidden');
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

        // تحديث الرابط النشط
        let activeId = '';
        const scrollPosition = currentScroll + 120;

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                activeId = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    });
});

// تحديد اللغة الافتراضية
let currentLang = localStorage.getItem("siteLang") || "ar";
const langToggleBtn = document.getElementById("langToggle");

function applyLanguage(lang) {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    if(langToggleBtn && translations[lang] && translations[lang].lang_btn) {
        langToggleBtn.textContent = translations[lang].lang_btn;
    }

    localStorage.setItem("siteLang", lang);
}

applyLanguage(currentLang);

if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
        currentLang = currentLang === "ar" ? "en" : "ar";
        applyLanguage(currentLang);
    });
}