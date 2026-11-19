(() => {
  const stages = {
    assault: {
      label: ['المرحلة ٠١ / الموجة الأولى', 'STAGE 01 / THE FIRST WAVE'],
      title: ['قوارب الاقتحام تبلغ الضفة الشرقية.', 'Assault boats reach the east bank.'],
      copy: ['عبرت وحدات المشاة القناة بقوارب الاقتحام وثبّتت مواقع على الضفة الشرقية. وكانت مهمتها تأمين المنطقة بينما يجهز المهندسون مسارات عبور القوات والمعدات التالية.', 'Infantry crossed the canal in assault boats, establishing footholds on the eastern bank. Their task was to secure the area while engineers prepared routes for the units and equipment to follow.'],
      foot: ['عبور الأفراد أولاً / ثم المعدات', 'PEOPLE FIRST / EQUIPMENT FOLLOWS']
    },
    breach: {
      label: ['المرحلة ٠٢ / فتح الطريق', 'STAGE 02 / CLEARING A WAY'],
      title: ['مضخات المياه تفتح ثغرات في الساتر.', 'Water pumps cut through the embankment.'],
      copy: ['استخدم المهندسون مضخات مياه قوية لإزالة أجزاء من الساتر الترابي وفتح ممرات. ساعد العمل على تجهيز نقاط العبور لحركة القوات والمعدات الثقيلة.', 'Engineering teams used high-pressure water pumps to remove sections of the sand embankment and open passages for troops and heavy equipment.'],
      foot: ['ممرات / حركة آمنة للمعدات', 'PASSAGES / ROUTES FOR EQUIPMENT']
    },
    bridges: {
      label: ['المرحلة ٠٣ / ربط الضفتين', 'STAGE 03 / CONNECTING THE BANKS'],
      title: ['الكباري العائمة تحوّل العبور إلى خط إمداد.', 'Pontoon bridges turn a crossing into a supply line.'],
      copy: ['أقامت أطقم المهندسين كباري عائمة عبر القناة. أتاحت هذه المعابر نقل الدبابات والمركبات والإمدادات إلى رؤوس الكباري التي أُنشئت شرق القناة.', 'Engineering crews assembled pontoon bridges across the canal. The crossings carried tanks, vehicles, and supplies to the bridgeheads established on the eastern bank.'],
      foot: ['وصل / نقل / استمرار', 'CONNECT / MOVE / SUSTAIN']
    },
    supply: {
      label: ['المرحلة ٠٤ / تثبيت المواقع', 'STAGE 04 / HOLDING THE POSITIONS'],
      title: ['القوات تثبّت رؤوس الكباري وتواصل الإمداد.', 'Forces hold the bridgeheads as supplies move.'],
      copy: ['بعد إنشاء مواقع على الضفة الشرقية، استمر نقل الأفراد والمعدات والإمدادات عبر الكباري. اعتمدت استمرارية العبور على التنسيق بين القوات والمهندسين وأطقم الدعم.', 'After positions were established on the eastern bank, personnel, equipment, and supplies continued moving across the bridges. Sustaining the crossing relied on coordination between combat units, engineers, and support crews.'],
      foot: ['تثبيت / إمداد / تنسيق', 'HOLD / SUPPLY / COORDINATE']
    }
  };

  const tabs = [...document.querySelectorAll('.stage-tab')];
  const story = document.querySelector('.stage-story');
  const schematic = document.querySelector('.schematic');
  let activeStage = 'assault';

  window.updateOperationStage = (language = document.documentElement.lang) => {
    const stage = stages[activeStage];
    if (!stage || !story) return;
    const languageIndex = language === 'ar' ? 0 : 1;
    story.querySelector('.story-label').textContent = stage.label[languageIndex];
    story.querySelector('h3').textContent = stage.title[languageIndex];
    story.querySelector('p').textContent = stage.copy[languageIndex];
    story.querySelector('.story-foot').textContent = stage.foot[languageIndex];
  };

  tabs.forEach((tab) => tab.addEventListener('click', () => {
    activeStage = tab.dataset.stage;
    tabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
    });
    if (schematic) schematic.dataset.active = activeStage;
    window.updateOperationStage();
  }));

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

  if (window.gsap) {
    gsap.set('.loader-mark', { y: 10, opacity: 0 });
    gsap.to('.loader-mark', { y: 0, opacity: 1, duration: .65, ease: 'power2.out' });
    gsap.to('.loader-progress-bar', { width: '100%', duration: 1.2, ease: 'power2.inOut' });
    gsap.timeline({ delay: .2 })
      .fromTo('.file-label', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: .5 })
      .fromTo('.hero h1', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out' }, '-=.2')
      .fromTo('.hero-deck, .hero-link', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: .5, stagger: .1 }, '-=.3');

    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray('.section-intro, .before-records article, .work-roles article, .leaders-list article, .after-main').forEach((item) => {
        gsap.from(item, { y: 22, opacity: 0, duration: .65, ease: 'power2.out', scrollTrigger: { trigger: item, start: 'top 90%', once: true } });
      });
    }

    const finishLoading = () => {
      if (!loader) return;
      gsap.to(loader, { opacity: 0, duration: .5, delay: .15, onComplete: () => { loader.style.display = 'none'; } });
    };
    if (document.readyState === 'complete') finishLoading();
    else window.addEventListener('load', finishLoading, { once: true });
  } else if (loader) {
    window.addEventListener('load', () => { loader.style.display = 'none'; }, { once: true });
    setTimeout(() => { loader.style.display = 'none'; }, 2500);
  }
})();
