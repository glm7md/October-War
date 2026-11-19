(() => {
  const html = document.documentElement;
  const switcher = document.querySelector('.lang-switch');
  let current = 'en';

  function setLanguage(language) {
    current = language;
    html.lang = language;
    html.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-ar', language === 'ar');
    document.querySelectorAll('[data-en][data-ar]').forEach((element) => {
      element.innerHTML = element.dataset[language];
    });
    if (switcher) {
      switcher.textContent = language === 'en' ? 'عربي' : 'EN';
      switcher.setAttribute('aria-label', language === 'en' ? 'Switch to Arabic' : 'Switch to English');
    }
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }

  if (switcher) switcher.addEventListener('click', () => setLanguage(current === 'en' ? 'ar' : 'en'));
})();
