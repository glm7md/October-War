(() => {
  const gsapReady = Boolean(window.gsap);
  const loader = document.querySelector('.loader-wrapper');
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.querySelector('.navbar');

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      const open = navLinks.classList.toggle('active');
      menuButton.classList.toggle('active', open);
      menuButton.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuButton.classList.remove('active');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }));
  }

  const updateNav = () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 70);
    let activeId = 'hero';
    document.querySelectorAll('main section[id]').forEach((section) => {
      if (section.getBoundingClientRect().top <= 130) activeId = section.id;
    });
    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
  };
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  if (gsapReady) {
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    gsap.set('.loader-mark', { y: 12, opacity: 0 });
    gsap.to('.loader-mark', { y: 0, opacity: 1, duration: .8, ease: 'power2.out' });
    gsap.to('.loader-progress-bar', { width: '100%', duration: 1.5, ease: 'power2.inOut' });
    const heroTl = gsap.timeline({ delay: .3 });
    heroTl.fromTo('.hero .eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .7 })
      .fromTo('.hero h1', { y: 38, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=.35')
      .fromTo('.hero-content>p, .hero-cta', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .65, stagger: .12 }, '-=.45');
    if (window.ScrollTrigger) {
      gsap.utils.toArray('.section-heading, .context-card, .timeline-item, .figure-card, .courage-list article, .feature-copy, .legacy-content').forEach((item) => {
        gsap.from(item, { y: 24, opacity: 0, duration: .75, ease: 'power2.out', scrollTrigger: { trigger: item, start: 'top 88%', once: true } });
      });

      const track = document.querySelector('.timeline-track');
      if (track && window.innerWidth > 760) {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * .16);
        gsap.to(track, { x: () => -distance(), ease: 'none', scrollTrigger: { trigger: '.history-timeline', start: 'top top', end: () => `+=${distance()}`, scrub: 1, pin: true, invalidateOnRefresh: true } });
      }
    }

    const finishLoading = () => {
      if (!loader) return;
      gsap.to(loader, { opacity: 0, duration: .55, delay: .2, onComplete: () => { loader.style.display = 'none'; } });
    };
    if (document.readyState === 'complete') finishLoading();
    else window.addEventListener('load', finishLoading, { once: true });
  } else if (loader) {
    window.addEventListener('load', () => { loader.style.display = 'none'; }, { once: true });
    setTimeout(() => { loader.style.display = 'none'; }, 2500);
  }
})();
