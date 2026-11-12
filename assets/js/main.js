/* ==========================================================================
   Mind Blowing MEDIA — Casting & Media House
   Interactive Multi-Sliders (Swiper) + Odometer Live Countdown + Modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* -------------------- 1. Navbar Scroll & Mobile Menu -------------------- */
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 36) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navLinks.querySelectorAll('.nav-dropdown.open').forEach((dd) => dd.classList.remove('open'));
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Navbar Dropdown Accordion & Click-Outside Handler
  const navDropdowns = document.querySelectorAll('.nav-dropdown');
  navDropdowns.forEach((dd) => {
    const toggleBtn = dd.querySelector('.nav-dropdown-toggle');
    if (!toggleBtn) return;
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !dd.classList.contains('open');
      navDropdowns.forEach((other) => {
        other.classList.remove('open');
        const btn = other.querySelector('.nav-dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        dd.classList.add('open');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      navDropdowns.forEach((dd) => {
        dd.classList.remove('open');
        const btn = dd.querySelector('.nav-dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  /* -------------------- 2. Multi-Slider Setup (Swiper.js) -------------------- */
  let heroSwiper = null;
  if (typeof Swiper !== 'undefined') {
    // Slider #1A & #1B: Hero Thumbnail Strip & Main Cinematic Slider
    const heroSliderEl = document.querySelector('#heroSlider');
    const heroThumbEl = document.querySelector('#heroThumbSlider');
    let heroThumbs = null;

    if (heroThumbEl) {
      heroThumbs = new Swiper('#heroThumbSlider', {
        spaceBetween: 12,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
      });
    }

    if (heroSliderEl) {
      heroSwiper = new Swiper('#heroSlider', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 900,
        loop: true,
        autoplay: {
          delay: 5500,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.hero-next',
          prevEl: '.hero-prev',
        },
        thumbs: heroThumbs ? { swiper: heroThumbs } : undefined,
      });
    }

    // Slider #2: Filterable Media Portfolio Multi-Card Slider
    const portfolioWrapper = document.getElementById('portfolioWrapper');
    const allPortfolioSlides = portfolioWrapper
      ? Array.from(portfolioWrapper.querySelectorAll('.portfolio-card'))
      : [];

    let portfolioSwiper = null;
    if (document.querySelector('#portfolioSlider')) {
      portfolioSwiper = new Swiper('#portfolioSlider', {
        slidesPerView: 1,
        spaceBetween: 24,
        speed: 650,
        grabCursor: true,
        autoplay: {
          delay: 4800,
          disableOnInteraction: true,
        },
        navigation: {
          nextEl: '.port-next',
          prevEl: '.port-prev',
        },
        breakpoints: {
          680: { slidesPerView: 2 },
          1040: { slidesPerView: 3 },
        },
      });
    }

    // Portfolio Category Filtering
    const filterButtons = document.querySelectorAll('#portfolioFilters .filter-pill');
    if (filterButtons.length && portfolioWrapper && portfolioSwiper) {
      filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          filterButtons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          const filter = btn.dataset.filter;
          portfolioWrapper.innerHTML = '';

          const matched = allPortfolioSlides.filter((card) => {
            return filter === 'all' || card.dataset.category === filter;
          });

          matched.forEach((card) => portfolioWrapper.appendChild(card));
          portfolioSwiper.update();
          portfolioSwiper.slideTo(0, 400);
          refreshScrollTriggers();
        });
      });
    }

    // Slider #3: Production Craft 3D Coverflow Slider
    if (document.querySelector('#btsSlider')) {
      new Swiper('#btsSlider', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        initialSlide: 1,
        loop: true,
        speed: 700,
        autoplay: {
          delay: 4200,
          disableOnInteraction: true,
        },
        coverflowEffect: {
          rotate: 18,
          stretch: 0,
          depth: 160,
          modifier: 1.2,
          slideShadows: true,
        },
        navigation: {
          nextEl: '.craft-next',
          prevEl: '.craft-prev',
        },
      });
    }

    // Slider #4: Open Casting Calls Slider
    if (document.querySelector('#castingCallsSlider')) {
      new Swiper('#castingCallsSlider', {
        slidesPerView: 1,
        spaceBetween: 22,
        speed: 650,
        grabCursor: true,
        navigation: {
          nextEl: '.casting-next',
          prevEl: '.casting-prev',
        },
        breakpoints: {
          680: { slidesPerView: 2 },
          1080: { slidesPerView: 3 },
        },
      });
    }

    // Slider #5: Infinite Partner Brands Marquee Slider
    if (document.querySelector('#brandSlider')) {
      new Swiper('#brandSlider', {
        slidesPerView: 'auto',
        spaceBetween: 18,
        loop: true,
        speed: 4500,
        allowTouchMove: false,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
      });
    }

    // Slider #6: Client Testimonials Slider (Home)
    if (document.querySelector('#testimonialSlider')) {
      new Swiper('#testimonialSlider', {
        slidesPerView: 1,
        spaceBetween: 24,
        speed: 700,
        loop: true,
        autoplay: {
          delay: 5200,
          disableOnInteraction: true,
        },
        navigation: {
          nextEl: '.testi-next',
          prevEl: '.testi-prev',
        },
        breakpoints: {
          768: { slidesPerView: 2 },
          1120: { slidesPerView: 3 },
        },
      });
    }

    // Slider #7: Video Reviews Slider (Reviews Page)
    if (document.querySelector('#videoReviewSlider')) {
      new Swiper('#videoReviewSlider', {
        slidesPerView: 1,
        spaceBetween: 24,
        speed: 650,
        grabCursor: true,
        navigation: {
          nextEl: '.video-rev-next',
          prevEl: '.video-rev-prev',
        },
        breakpoints: {
          768: { slidesPerView: 2 },
          1120: { slidesPerView: 3 },
        },
      });
    }
  }

  function refreshScrollTriggers() {
    if (typeof window.ScrollTrigger !== 'undefined') {
      window.ScrollTrigger.refresh();
    }
  }

  /* -------------------- 3. Scroll-Triggered Odometer Stats -------------------- */
  const statsStrip = document.getElementById('statsStrip');
  let statsAnimated = false;

  function animateStatValue(el, target) {
    if (!el) return;
    if (el.odometer && typeof el.odometer.update === 'function') {
      el.odometer.update(target);
      return;
    }
    if (typeof window.Odometer === 'function') {
      const odo = new window.Odometer({ el, value: 0, format: '(,ddd)', theme: 'default' });
      odo.update(target);
      return;
    }
    // Smooth requestAnimationFrame fallback if Odometer CDN is unavailable
    const duration = 1200;
    const start = performance.now();
    function step(ts) {
      const progress = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString('en-US');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function triggerStatsAnimation() {
    if (statsAnimated || !statsStrip) return;
    statsAnimated = true;
    statsStrip.querySelectorAll('.stat-odo').forEach((el) => {
      const target = parseInt(el.dataset.target || '0', 10);
      animateStatValue(el, target);
    });
  }

  if (statsStrip) {
    if ('IntersectionObserver' in window) {
      const statsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              triggerStatsAnimation();
              statsObserver.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      statsObserver.observe(statsStrip);
    } else {
      triggerStatsAnimation();
    }
  }

  /* -------------------- 5. Modals & Interactive Video Player -------------------- */
  const reelModal = document.getElementById('reelModal');
  const reelVideo = document.getElementById('reelVideo');
  const reelIframe = document.getElementById('reelIframe');
  const reelExternalLink = document.getElementById('reelExternalLink');
  const reelTitle = document.getElementById('reelTitle');
  const reelCategory = document.getElementById('reelCategory');
  const submitModal = document.getElementById('submitModal');
  const talentDetailModal = document.getElementById('talentDetailModal');
  const lightboxModal = document.getElementById('lightboxModal');

  let canvasStreamRaf = null;

  function extractYouTubeId(url) {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return match ? match[1] : null;
  }

  function startCanvasReelFallback(posterSrc, titleText) {
    if (!reelVideo || typeof HTMLCanvasElement === 'undefined') return;
    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 540;
    const ctx = canvas.getContext('2d');
    if (!ctx || typeof canvas.captureStream !== 'function') return;

    const img = new Image();
    img.src = posterSrc || 'assets/images/hero-cinema.jpg';
    const startTime = performance.now();

    function drawFrame(now) {
      const elapsed = (now - startTime) / 1000;
      ctx.fillStyle = '#07080b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (img.complete && img.naturalWidth > 0) {
        const scale = 1.04 + Math.sin(elapsed * 0.45) * 0.04;
        const w = canvas.width * scale;
        const h = canvas.height * scale;
        const x = (canvas.width - w) / 2 + Math.cos(elapsed * 0.35) * 14;
        const y = (canvas.height - h) / 2;
        ctx.drawImage(img, x, y, w, h);
      }

      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, 'rgba(7,8,11,0.35)');
      grad.addColorStop(1, 'rgba(7,8,11,0.82)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cinema HUD Timecode
      const secs = Math.floor(elapsed);
      const mm = String(Math.floor(secs / 60)).padStart(2, '0');
      const ss = String(secs % 60).padStart(2, '0');
      const ff = String(Math.floor((elapsed * 24) % 24)).padStart(2, '0');

      ctx.fillStyle = '#ff6b1a';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText(`REC ● 00:${mm}:${ss}:${ff}  •  4K CINEMA PREVIEW`, 32, 44);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText(titleText || 'MIND BLOWING MEDIA', 32, canvas.height - 42);

      canvasStreamRaf = requestAnimationFrame(drawFrame);
    }

    canvasStreamRaf = requestAnimationFrame(drawFrame);
    const stream = canvas.captureStream(30);
    reelVideo.srcObject = stream;
    reelVideo.muted = true;
    reelVideo.play().catch(() => {});
  }

  function stopReelPlayer() {
    if (canvasStreamRaf) {
      cancelAnimationFrame(canvasStreamRaf);
      canvasStreamRaf = null;
    }
    if (reelVideo) {
      reelVideo.pause();
      reelVideo.onerror = null;
      if (reelVideo.srcObject) {
        reelVideo.srcObject.getTracks().forEach((t) => t.stop());
        reelVideo.srcObject = null;
      }
      reelVideo.removeAttribute('src');
      reelVideo.load();
    }
    if (reelIframe) {
      reelIframe.src = '';
      reelIframe.hidden = true;
    }
  }

  function openReelPlayer({ title, category, poster, videoUrl }) {
    stopReelPlayer();
    if (reelTitle) reelTitle.textContent = title || 'Mind Blowing Media শো-রিল';
    if (reelCategory) reelCategory.textContent = category || 'অফিসিয়াল প্রিভিউ';

    const defaultYtUrl = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ';
    const targetUrl = videoUrl || defaultYtUrl;
    const ytId = extractYouTubeId(targetUrl);

    if (reelExternalLink) {
      reelExternalLink.href = ytId ? `https://www.youtube.com/watch?v=${ytId}` : targetUrl;
    }

    if (ytId && reelIframe && reelVideo) {
      reelVideo.hidden = true;
      reelIframe.hidden = false;
      reelIframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
    } else if (reelVideo) {
      if (reelIframe) reelIframe.hidden = true;
      reelVideo.hidden = false;
      reelVideo.poster = poster || 'assets/images/hero-cinema.jpg';
      reelVideo.muted = false;
      reelVideo.src = targetUrl;
      reelVideo.onerror = () => {
        startCanvasReelFallback(poster, title);
      };
      reelVideo.play().catch(() => {
        reelVideo.muted = true;
        reelVideo.play().catch(() => startCanvasReelFallback(poster, title));
      });
    }

    openModal(reelModal);
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    if (modal === reelModal) stopReelPlayer();
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      closeModal(document.getElementById(btn.dataset.closeModal));
    });
  });

  [reelModal, submitModal, talentDetailModal, lightboxModal].forEach((modal) => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [reelModal, submitModal, talentDetailModal, lightboxModal].forEach((m) => {
        if (m && m.classList.contains('open')) closeModal(m);
      });
    }
  });

  /* -------------------- 6. Talent Directory & Live Filtering -------------------- */
  const directoryProfiles = [
    {
      id: 1,
      name: 'আরিফুর রহমান',
      category: 'অভিনেতা',
      age: 28,
      height: "5' 10\"",
      expYears: 4,
      expLevel: 'senior',
      expLabel: '৪ বছর অভিজ্ঞতা',
      specialty: 'রোমান্টিক ও ড্রামা লিড রোল',
      photo: 'assets/images/portfolio-casting.jpg',
      bio: 'টেলিভিশন নাটক, ওটিটি ওয়েব ফিল্ম ও বড় ব্র্যান্ডের টিভিসিতে নিয়মিত লিড চরিত্রে অভিনয় করেছেন।',
      driveLink: 'https://drive.google.com/',
      videoLink: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
      isNew: false,
    },
    {
      id: 2,
      name: 'নুসরাত জাহান',
      category: 'অভিনেত্রী',
      age: 22,
      height: "5' 4\"",
      expYears: 2,
      expLevel: 'mid',
      expLabel: '২ বছর অভিজ্ঞতা',
      specialty: 'মডেল ও কমার্শিয়াল ফেস',
      photo: 'assets/images/portfolio-music.jpg',
      bio: 'ফ্যাশন শুট, লাইফস্টাইল বিজ্ঞাপন এবং রোমান্টিক একক নাটকে সাবলীল অভিনয়ের জন্য পরিচিত।',
      driveLink: 'https://drive.google.com/',
      videoLink: 'https://www.youtube.com/watch?v=eRsGyueVLvQ',
      isNew: false,
    },
    {
      id: 3,
      name: 'আয়ান চৌধুরী',
      category: 'অভিনেতা',
      age: 31,
      height: "5' 11\"",
      expYears: 6,
      expLevel: 'senior',
      expLabel: '৬ বছর অভিজ্ঞতা',
      specialty: 'অ্যাকশন ও থ্রিলার ক্যারেক্টার',
      photo: 'assets/images/portfolio-film.jpg',
      bio: 'থিয়েটার ব্যাকগ্রাউন্ড ও মার্শাল আর্ট প্রশিক্ষণপ্রাপ্ত; থ্রিলার সিনেমা ও অ্যাকশন ওটিটি সিরিজে বিশেষ দক্ষতা।',
      driveLink: 'https://drive.google.com/',
      videoLink: 'https://www.youtube.com/watch?v=HomAZcKm3fk',
      isNew: false,
    },
    {
      id: 4,
      name: 'তাসনিম তিশা',
      category: 'মডেল',
      age: 24,
      height: "5' 6\"",
      expYears: 3,
      expLevel: 'mid',
      expLabel: '৩ বছর অভিজ্ঞতা',
      specialty: 'র‍্যাম্প ও ব্র্যান্ড অ্যাম্বাসেডর',
      photo: 'assets/images/hero-studio.jpg',
      bio: 'ঢাকা ফ্যাশন উইক, জুয়েলারি টিভিসি এবং মিউজিক ভিডিওর নিয়মিত পারফর্মার।',
      driveLink: 'https://drive.google.com/',
      videoLink: 'https://www.youtube.com/watch?v=mN0zPOpADL4',
      isNew: false,
    },
    {
      id: 5,
      name: 'সাদমান সাকিব',
      category: 'অভিনেতা',
      age: 20,
      height: "5' 8\"",
      expYears: 1,
      expLevel: 'fresher',
      expLabel: '১ বছর অভিজ্ঞতা',
      specialty: 'ক্যাম্পাস ড্রামা ও শর্ট ফিল্ম',
      photo: 'assets/images/hero-cinema.jpg',
      bio: 'বিশ্ববিদ্যালয় ড্রামা ক্লাবের সক্রিয় সদস্য; ইতোমধ্যে ৪টি প্রশংসিত শর্ট ফিল্ম ও ওয়েব কনটেন্টে কাজ করেছেন।',
      driveLink: 'https://drive.google.com/',
      videoLink: 'https://www.youtube.com/watch?v=YE7VzlLtp-4',
      isNew: false,
    },
    {
      id: 6,
      name: 'মেহনাজ করিম',
      category: 'অভিনেত্রী',
      age: 36,
      height: "5' 5\"",
      expYears: 7,
      expLevel: 'senior',
      expLabel: '৭ বছর অভিজ্ঞতা',
      specialty: 'ক্যারেক্টার আর্টিস্ট ও ভয়েস ওভার',
      photo: 'assets/images/portfolio-casting.jpg',
      bio: 'দীর্ঘদিন মঞ্চনাটক, মেগা সিরিয়াল ও কর্পোরেট ডকুমেন্টারির ভয়েস-ওভারে যুক্ত আছেন।',
      driveLink: 'https://drive.google.com/',
      videoLink: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
      isNew: false,
    },
  ];

  const directoryGrid = document.getElementById('directoryGrid');
  const directoryEmpty = document.getElementById('directoryEmpty');
  const directoryCountNum = document.getElementById('directoryCountNum');
  const dirSearch = document.getElementById('dirSearch');
  const dirCategory = document.getElementById('dirCategory');
  const dirAge = document.getElementById('dirAge');
  const dirExperience = document.getElementById('dirExperience');
  const resetDirFiltersBtn = document.getElementById('resetDirFiltersBtn');

  let activeModalProfile = null;

  function openTalentDetail(profile) {
    activeModalProfile = profile;
    const tmPhoto = document.getElementById('tmPhoto');
    const tmCategory = document.getElementById('tmCategory');
    const tmName = document.getElementById('tmName');
    const tmSpecialty = document.getElementById('tmSpecialty');
    const tmAge = document.getElementById('tmAge');
    const tmHeight = document.getElementById('tmHeight');
    const tmExperience = document.getElementById('tmExperience');
    const tmBio = document.getElementById('tmBio');
    const tmDriveLink = document.getElementById('tmDriveLink');

    if (tmPhoto) tmPhoto.src = profile.photo;
    if (tmCategory) tmCategory.textContent = profile.category;
    if (tmName) tmName.textContent = profile.name;
    if (tmSpecialty) tmSpecialty.textContent = profile.specialty;
    if (tmAge) tmAge.textContent = `${profile.age} বছর`;
    if (tmHeight) tmHeight.textContent = profile.height || 'উল্লেখ নেই';
    if (tmExperience) tmExperience.textContent = profile.expLabel;
    if (tmBio) tmBio.textContent = profile.bio;
    if (tmDriveLink) tmDriveLink.href = profile.driveLink || '#registration-section';

    openModal(talentDetailModal);
  }

  function createDirectoryCard(profile) {
    const card = document.createElement('article');
    card.className = 'dir-card';

    const photoWrap = document.createElement('div');
    photoWrap.className = 'dir-photo';

    const img = document.createElement('img');
    img.src = profile.photo;
    img.alt = profile.name;
    photoWrap.appendChild(img);

    const topBadges = document.createElement('div');
    topBadges.className = 'dir-badges-top';

    const catBadge = document.createElement('span');
    catBadge.className = 'dir-cat-badge';
    catBadge.textContent = profile.category;

    const ageBadge = document.createElement('span');
    ageBadge.className = 'dir-age-badge';
    ageBadge.textContent = `${profile.age} বছর`;

    topBadges.append(catBadge, ageBadge);
    photoWrap.appendChild(topBadges);

    if (profile.isNew) {
      const newBadge = document.createElement('span');
      newBadge.className = 'dir-new-badge';
      newBadge.textContent = 'নতুন জমা দেওয়া';
      photoWrap.appendChild(newBadge);
    }

    const body = document.createElement('div');
    body.className = 'dir-body';

    const title = document.createElement('h3');
    title.textContent = profile.name;

    const specialty = document.createElement('p');
    specialty.className = 'dir-specialty';
    specialty.textContent = profile.specialty;

    const metaRow = document.createElement('div');
    metaRow.className = 'dir-meta-row';

    const heightSpan = document.createElement('span');
    heightSpan.innerHTML = '<i class="fa-solid fa-ruler-vertical"></i> ';
    heightSpan.appendChild(document.createTextNode(profile.height || "5' 8\""));

    const expSpan = document.createElement('span');
    expSpan.innerHTML = '<i class="fa-solid fa-briefcase"></i> ';
    expSpan.appendChild(document.createTextNode(profile.expLabel));

    metaRow.append(heightSpan, expSpan);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-outline-gold btn-sm w-full';
    btn.innerHTML = '<i class="fa-solid fa-circle-play"></i> <span>প্রোফাইল ও অডিশন দেখুন</span>';
    btn.addEventListener('click', () => openTalentDetail(profile));

    body.append(title, specialty, metaRow, btn);
    card.append(photoWrap, body);
    return card;
  }

  function renderDirectory() {
    if (!directoryGrid) return;
    const query = (dirSearch ? dirSearch.value : '').trim().toLowerCase();
    const cat = dirCategory ? dirCategory.value : 'all';
    const ageRange = dirAge ? dirAge.value : 'all';
    const expFilter = dirExperience ? dirExperience.value : 'all';

    const filtered = directoryProfiles.filter((p) => {
      const matchSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.specialty.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);

      const matchCat = cat === 'all' || p.category === cat;

      let matchAge = true;
      if (ageRange === '18-25') matchAge = p.age >= 18 && p.age <= 25;
      else if (ageRange === '26-35') matchAge = p.age >= 26 && p.age <= 35;
      else if (ageRange === '35+') matchAge = p.age > 35;

      const matchExp = expFilter === 'all' || p.expLevel === expFilter;

      return matchSearch && matchCat && matchAge && matchExp;
    });

    directoryGrid.innerHTML = '';
    filtered.forEach((profile) => {
      directoryGrid.appendChild(createDirectoryCard(profile));
    });

    if (directoryCountNum) directoryCountNum.textContent = String(filtered.length);
    if (directoryEmpty) directoryEmpty.hidden = filtered.length > 0;
    refreshScrollTriggers();
  }

  [dirSearch, dirCategory, dirAge, dirExperience].forEach((ctrl) => {
    if (!ctrl) return;
    ctrl.addEventListener('input', renderDirectory);
    ctrl.addEventListener('change', renderDirectory);
  });

  if (resetDirFiltersBtn) {
    resetDirFiltersBtn.addEventListener('click', () => {
      if (dirSearch) dirSearch.value = '';
      if (dirCategory) dirCategory.value = 'all';
      if (dirAge) dirAge.value = 'all';
      if (dirExperience) dirExperience.value = 'all';
      renderDirectory();
    });
  }

  renderDirectory();

  const tmWatchAuditionBtn = document.getElementById('tmWatchAuditionBtn');
  if (tmWatchAuditionBtn) {
    tmWatchAuditionBtn.addEventListener('click', () => {
      if (!activeModalProfile) return;
      closeModal(talentDetailModal);
      openReelPlayer({
        title: `${activeModalProfile.name} — অডিশন শো-রিল`,
        category: `${activeModalProfile.category} • ${activeModalProfile.expLabel}`,
        poster: activeModalProfile.photo,
        videoUrl: activeModalProfile.videoLink,
      });
    });
  }

  /* -------------------- 7. New Artist Registration Form -------------------- */
  const artistRegistrationForm = document.getElementById('artistRegistrationForm');
  if (artistRegistrationForm) {
    artistRegistrationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameVal = document.getElementById('regName').value.trim();
      const phoneVal = document.getElementById('regPhone').value.trim();
      const categoryVal = document.getElementById('regCategory').value;
      const ageVal = parseInt(document.getElementById('regAge').value, 10) || 24;
      const heightVal = document.getElementById('regHeight').value.trim() || "5' 8\"";
      const driveVal = document.getElementById('regDriveLink').value.trim() || 'https://drive.google.com/';
      const videoVal = document.getElementById('regVideoLink').value.trim() || 'https://youtube.com/';
      const expVal = document.getElementById('regExperience').value.trim();

      const newProfile = {
        id: Date.now(),
        name: nameVal,
        category: categoryVal || 'অভিনেতা',
        age: ageVal,
        height: heightVal,
        expYears: expVal ? 2 : 0,
        expLevel: expVal ? 'mid' : 'fresher',
        expLabel: expVal ? 'অভিজ্ঞতাসম্পন্ন' : 'নতুন শিল্পী',
        specialty: expVal ? expVal.slice(0, 48) : `${categoryVal || 'শিল্পী'} — নতুন প্রোফাইল`,
        photo: 'assets/images/portfolio-casting.jpg',
        bio: expVal || `ফোন/হোয়াটসঅ্যাপ: ${phoneVal}। নতুন কাস্টিং ও অডিশনের জন্য আবেদন করেছেন।`,
        driveLink: driveVal,
        videoLink: videoVal,
        isNew: true,
      };

      directoryProfiles.unshift(newProfile);
      renderDirectory();
      artistRegistrationForm.reset();
      showToast(`ধন্যবাদ ${nameVal}! আপনার প্রোফাইল ট্যালেন্ট ডিরেক্টরিতে যুক্ত হয়েছে।`);
    });
  }

  // Showreel Play Buttons & Open Casting Call Apply Buttons
  document.addEventListener('click', (e) => {
    const playBtn = e.target.closest('.js-play-reel');
    if (playBtn) {
      openReelPlayer({
        title: playBtn.dataset.title,
        category: playBtn.dataset.category,
        poster: playBtn.dataset.poster,
        videoUrl: playBtn.dataset.video,
      });
    }

    const applyBtn = e.target.closest('.js-apply-casting');
    if (applyBtn) {
      const regSection = document.getElementById('registration-section');
      const regCat = document.getElementById('regCategory');
      const regExp = document.getElementById('regExperience');
      if (regCat && applyBtn.dataset.category) {
        regCat.value = applyBtn.dataset.category;
      }
      if (regExp && applyBtn.dataset.role && !regExp.value.trim()) {
        regExp.value = `আগ্রহী চরিত্র: ${applyBtn.dataset.role}`;
      }
      if (regSection) {
        regSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      showToast(`“${applyBtn.dataset.role}” চরিত্রের জন্য ক্যাটাগরি নির্বাচন করা হয়েছে—নিচে আপনার তথ্য দিন।`);
    }
  });

  /* -------------------- 8. FAQ Accordion -------------------- */
  const faqItems = document.querySelectorAll('#faqList .faq-item');
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach((other) => {
        other.classList.remove('active');
        const otherBtn = other.querySelector('.faq-trigger');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const openShowreelBtn = document.getElementById('openShowreelBtn');
  if (openShowreelBtn) {
    openShowreelBtn.addEventListener('click', () => {
      openReelPlayer({
        title: 'Mind Blowing Media ২০২৬ মেগা শো-রিল',
        category: 'অফিসিয়াল শো-রিল • ২:৪৫ মিনিট',
        poster: 'assets/images/hero-cinema.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
      });
    });
  }

  ['openSubmitModalBtn', 'ctaSubmitBtn'].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', () => openModal(submitModal));
  });

  // Demo Form Submission + Toast
  const demoForm = document.getElementById('demoSubmitForm');
  const toastBanner = document.getElementById('toastBanner');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer = null;

  function showToast(msg) {
    if (!toastBanner || !toastMsg) return;
    toastMsg.textContent = msg;
    toastBanner.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastBanner.classList.remove('show');
    }, 4500);
  }

  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(submitModal);
      demoForm.reset();
      showToast('আপনার প্রোফাইল ও প্রজেক্টের তথ্য সফলভাবে গৃহীত হয়েছে (ডিজাইন ডেমো)!');
    });
  }

  /* -------------------- 9. Gallery Auto-Scroll (Splide) & Full-Image Fancybox -------------------- */
  const hasFancybox = typeof window.Fancybox !== 'undefined';
  const fancyboxOptions = {
    Toolbar: {
      display: {
        left: ['infobar'],
        middle: [],
        right: ['slideshow', 'fullscreen', 'iterateZoom', 'thumbs', 'download', 'close'],
      },
    },
    Images: {
      zoom: true,
    },
    Slideshow: {
      playOnStart: false,
      timeout: 3000,
    },
    Thumbs: {
      type: 'classic',
    },
  };

  // A. Splide Continuous Auto-Scroll Gallery Reel
  const galleryAutoSplideEl = document.getElementById('galleryAutoSplide');
  if (galleryAutoSplideEl && typeof window.Splide !== 'undefined') {
    const splideInstance = new window.Splide(galleryAutoSplideEl, {
      type: 'loop',
      drag: 'free',
      focus: 'center',
      arrows: false,
      pagination: false,
      gap: '20px',
      autoWidth: true,
      autoScroll: {
        speed: 0.9,
        pauseOnHover: true,
        pauseOnFocus: true,
      },
    });

    const extensions = window.splide && window.splide.Extensions ? window.splide.Extensions : undefined;
    splideInstance.mount(extensions);

    const toggleAutoScrollBtn = document.getElementById('toggleAutoScrollBtn');
    if (toggleAutoScrollBtn) {
      let manuallyPaused = false;
      toggleAutoScrollBtn.addEventListener('click', () => {
        const autoScrollApi = splideInstance.Components && splideInstance.Components.AutoScroll;
        if (!autoScrollApi) return;
        if (manuallyPaused) {
          autoScrollApi.play();
          manuallyPaused = false;
          toggleAutoScrollBtn.innerHTML = '<i class="fa-solid fa-pause"></i> <span>অটো-স্ক্রল পজ</span>';
        } else {
          autoScrollApi.pause();
          manuallyPaused = true;
          toggleAutoScrollBtn.innerHTML = '<i class="fa-solid fa-play"></i> <span>অটো-স্ক্রল চালু</span>';
        }
      });
    }
  }

  // B. Fancybox Full-Image Binding & Slideshow Launch
  function bindGalleryFancybox() {
    if (!hasFancybox) return;
    window.Fancybox.unbind('[data-fancybox="gallery-autoscroll"]');
    window.Fancybox.unbind('[data-fancybox="gallery-grid"]');
    window.Fancybox.bind('[data-fancybox="gallery-autoscroll"]', fancyboxOptions);
    window.Fancybox.bind('[data-fancybox="gallery-grid"]', fancyboxOptions);
  }
  bindGalleryFancybox();

  const startFancySlideshowBtn = document.getElementById('startFancySlideshowBtn');
  if (startFancySlideshowBtn && hasFancybox) {
    startFancySlideshowBtn.addEventListener('click', () => {
      const visibleAnchors = Array.from(document.querySelectorAll('#galleryGrid .gallery-img-wrap[data-fancybox="gallery-grid"]'));
      const sourceAnchors = visibleAnchors.length
        ? visibleAnchors
        : Array.from(document.querySelectorAll('#galleryAutoSplide .autoscroll-card'));
      if (!sourceAnchors.length) return;

      const items = sourceAnchors.map((a) => ({
        src: a.getAttribute('href'),
        caption: a.dataset.caption || '',
        thumb: a.querySelector('img') ? a.querySelector('img').getAttribute('src') : a.getAttribute('href'),
      }));

      window.Fancybox.show(items, {
        ...fancyboxOptions,
        Slideshow: {
          playOnStart: true,
          timeout: 2800,
        },
      });
    });
  }

  // C. Homepage Craft Coverflow Full-Image Click via Fancybox
  const craftImages = Array.from(document.querySelectorAll('#btsSlider .craft-slide:not(.swiper-slide-duplicate) .craft-img-wrap'));
  if (hasFancybox && craftImages.length) {
    document.querySelectorAll('#btsSlider .craft-img-wrap').forEach((wrap) => {
      wrap.addEventListener('click', () => {
        const clickedSrc = wrap.querySelector('img') ? wrap.querySelector('img').getAttribute('src') : '';
        const items = craftImages.map((el) => {
          const slide = el.closest('.craft-slide');
          const img = el.querySelector('img');
          const title = slide && slide.querySelector('h3') ? slide.querySelector('h3').textContent : '';
          return {
            src: img ? img.getAttribute('src') : '',
            thumb: img ? img.getAttribute('src') : '',
            caption: title,
          };
        });
        const startIndex = Math.max(0, items.findIndex((it) => it.src === clickedSrc));
        window.Fancybox.show(items, { ...fancyboxOptions, startIndex });
      });
    });
  }

  // D. Gallery Filter & Fallback Lightbox (when offline / Fancybox unavailable)
  const galleryFilters = document.querySelectorAll('#galleryFilters .filter-pill');
  const galleryGrid = document.getElementById('galleryGrid');
  const galleryCards = galleryGrid ? Array.from(galleryGrid.querySelectorAll('.gallery-card')) : [];

  if (galleryFilters.length && galleryCards.length) {
    galleryFilters.forEach((btn) => {
      btn.addEventListener('click', () => {
        galleryFilters.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        const visibleCards = [];
        galleryCards.forEach((card) => {
          const matched = filter === 'all' || card.dataset.category === filter;
          card.style.display = matched ? '' : 'none';
          const trigger = card.querySelector('.gallery-img-wrap');
          if (trigger) {
            if (matched) trigger.setAttribute('data-fancybox', 'gallery-grid');
            else trigger.removeAttribute('data-fancybox');
          }
          if (matched) visibleCards.push(card);
        });

        bindGalleryFancybox();

        if (typeof window.gsap !== 'undefined' && visibleCards.length) {
          window.gsap.fromTo(
            visibleCards,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.48, stagger: 0.05, ease: 'power2.out', clearProps: 'transform,opacity' }
          );
        }
        refreshScrollTriggers();
      });
    });
  }

  // Clicking card caption also opens the image trigger
  galleryCards.forEach((card) => {
    const caption = card.querySelector('.gallery-caption');
    const trigger = card.querySelector('a.gallery-img-wrap');
    if (caption && trigger) {
      caption.style.cursor = 'pointer';
      caption.addEventListener('click', () => trigger.click());
    }
  });

  const lbImg = document.getElementById('lbImg');
  const lbCat = document.getElementById('lbCat');
  const lbTitle = document.getElementById('lbTitle');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  let activeLightboxIndex = 0;

  function getVisibleGalleryCards() {
    return galleryCards.filter((card) => card.style.display !== 'none');
  }

  function renderLightboxItem(card) {
    if (!card || !lbImg) return;
    const img = card.querySelector('img');
    const cat = card.querySelector('.gallery-cat');
    const title = card.querySelector('.gallery-caption h3');
    lbImg.src = img ? img.getAttribute('src') : '';
    lbImg.alt = title ? title.textContent : 'গ্যালারি ছবি';
    if (lbCat) lbCat.textContent = cat ? cat.textContent : '';
    if (lbTitle) lbTitle.textContent = title ? title.textContent : '';
  }

  if (!hasFancybox && lightboxModal && galleryCards.length) {
    galleryCards.forEach((card) => {
      const link = card.querySelector('a.gallery-img-wrap');
      if (link) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const visible = getVisibleGalleryCards();
          activeLightboxIndex = Math.max(0, visible.indexOf(card));
          renderLightboxItem(visible[activeLightboxIndex]);
          openModal(lightboxModal);
        });
      }
    });

    if (lbPrev) {
      lbPrev.addEventListener('click', () => {
        const visible = getVisibleGalleryCards();
        if (!visible.length) return;
        activeLightboxIndex = (activeLightboxIndex - 1 + visible.length) % visible.length;
        renderLightboxItem(visible[activeLightboxIndex]);
      });
    }

    if (lbNext) {
      lbNext.addEventListener('click', () => {
        const visible = getVisibleGalleryCards();
        if (!visible.length) return;
        activeLightboxIndex = (activeLightboxIndex + 1) % visible.length;
        renderLightboxItem(visible[activeLightboxIndex]);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('open')) return;
      if (e.key === 'ArrowLeft' && lbPrev) lbPrev.click();
      if (e.key === 'ArrowRight' && lbNext) lbNext.click();
    });
  }

  /* -------------------- 10. Videos & Reviews Subpage Filters + Form -------------------- */
  function bindGridFilter(filterSelector, gridId, itemSelector) {
    const pills = document.querySelectorAll(filterSelector);
    const grid = document.getElementById(gridId);
    if (!pills.length || !grid) return;

    const items = Array.from(grid.querySelectorAll(itemSelector));
    pills.forEach((btn) => {
      btn.addEventListener('click', () => {
        pills.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        const visible = [];
        items.forEach((item) => {
          const matched = filter === 'all' || item.dataset.category === filter;
          item.style.display = matched ? '' : 'none';
          if (matched) visible.push(item);
        });

        if (typeof window.gsap !== 'undefined' && visible.length) {
          window.gsap.fromTo(
            visible,
            { y: 26, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power2.out', clearProps: 'transform,opacity' }
          );
        }
        refreshScrollTriggers();
      });
    });
  }

  bindGridFilter('#videoPageFilters .filter-pill', 'videoPageGrid', '.portfolio-card');
  bindGridFilter('#reviewFilters .filter-pill', 'reviewsGrid', '.testimonial-card');

  const reviewSubmitForm = document.getElementById('reviewSubmitForm');
  const reviewsGrid = document.getElementById('reviewsGrid');

  if (reviewSubmitForm && reviewsGrid) {
    reviewSubmitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameEl = document.getElementById('revName');
      const roleEl = document.getElementById('revRole');
      const catEl = document.getElementById('revCategory');
      const textEl = document.getElementById('revText');

      const nameVal = nameEl ? nameEl.value.trim() : '';
      const roleVal = roleEl ? roleEl.value.trim() : '';
      const catVal = catEl ? catEl.value : 'brand';
      const textVal = textEl ? textEl.value.trim() : '';
      if (!nameVal || !textVal) return;

      const card = document.createElement('article');
      card.className = 'testimonial-card';
      card.dataset.category = catVal;
      card.setAttribute('data-gsap', 'top');

      const stars = document.createElement('div');
      stars.className = 'stars';
      stars.textContent = '★★★★★';

      const quote = document.createElement('p');
      quote.textContent = `“${textVal}”`;

      const author = document.createElement('div');
      author.className = 'author-meta';

      const avatar = document.createElement('div');
      avatar.className = 'avatar-badge';
      avatar.textContent = nameVal.slice(0, 2);

      const meta = document.createElement('div');
      const h4 = document.createElement('h4');
      h4.textContent = nameVal;
      const roleSpan = document.createElement('span');
      roleSpan.textContent = roleVal || 'অতিথি ও ক্লায়েন্ট';

      meta.append(h4, roleSpan);
      author.append(avatar, meta);
      card.append(stars, quote, author);

      reviewsGrid.prepend(card);
      reviewSubmitForm.reset();

      if (typeof window.gsap !== 'undefined') {
        window.gsap.fromTo(
          card,
          { y: -32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', clearProps: 'transform,opacity' }
        );
      }

      showToast(`ধন্যবাদ ${nameVal}! আপনার রিভিউটি সফলভাবে যুক্ত হয়েছে।`);
      refreshScrollTriggers();
    });
  }

  /* -------------------- 10B. Multi-Page Subpage Filters, Modals, Notices, Diaries & Polls -------------------- */
  function initFilterableGrid({ filterSelector, searchInputId, gridId, itemSelector, countId, emptyId }) {
    const pills = filterSelector ? document.querySelectorAll(filterSelector) : [];
    const searchEl = searchInputId ? document.getElementById(searchInputId) : null;
    const grid = document.getElementById(gridId);
    if (!grid) return;

    const items = Array.from(grid.querySelectorAll(itemSelector));
    const countEl = countId ? document.getElementById(countId) : null;
    const emptyEl = emptyId ? document.getElementById(emptyId) : null;
    let activeFilter = 'all';

    function applyFilters(animate) {
      const q = (searchEl ? searchEl.value : '').trim().toLowerCase();
      const visible = [];

      items.forEach((item) => {
        const cat = (item.dataset.category || '').split(/\s+/);
        const matchesCat = activeFilter === 'all' || cat.includes(activeFilter);
        const text = (item.textContent || '').toLowerCase() + ' ' + (item.dataset.tags || '').toLowerCase();
        const matchesQuery = !q || text.includes(q);
        const show = matchesCat && matchesQuery;
        item.style.display = show ? '' : 'none';
        if (show) visible.push(item);
      });

      if (countEl) countEl.textContent = String(visible.length);
      if (emptyEl) emptyEl.hidden = visible.length > 0;

      if (animate && typeof window.gsap !== 'undefined' && visible.length) {
        window.gsap.fromTo(
          visible,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.42, stagger: 0.04, ease: 'power2.out', clearProps: 'transform,opacity' }
        );
      }
      refreshScrollTriggers();
    }

    if (pills.length) {
      pills.forEach((btn) => {
        btn.addEventListener('click', () => {
          pills.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          activeFilter = btn.dataset.filter || 'all';
          applyFilters(true);
        });
      });
    }

    if (searchEl) {
      searchEl.addEventListener('input', () => applyFilters(false));
    }
  }

  initFilterableGrid({
    filterSelector: '#profilesFilters .filter-pill',
    searchInputId: 'profileSearch',
    gridId: 'profilesGrid',
    itemSelector: '.dir-card',
    countId: 'profileCountNum',
    emptyId: 'profilesEmpty',
  });
  initFilterableGrid({
    filterSelector: '#intlFilters .filter-pill',
    searchInputId: 'intlSearch',
    gridId: 'intlGrid',
    itemSelector: '.dir-card',
    countId: 'intlCountNum',
    emptyId: 'intlEmpty',
  });
  initFilterableGrid({
    filterSelector: '#noticeFilters .filter-pill',
    searchInputId: 'noticeSearch',
    gridId: 'noticesList',
    itemSelector: '.notice-card',
    countId: 'noticeCountNum',
    emptyId: 'noticesEmpty',
  });
  initFilterableGrid({
    filterSelector: '#directorDiaryFilters .filter-pill',
    gridId: 'directorDiaryGrid',
    itemSelector: '.diary-card',
  });
  initFilterableGrid({
    filterSelector: '#artistDiaryFilters .filter-pill',
    gridId: 'artistDiaryGrid',
    itemSelector: '.diary-card',
  });
  initFilterableGrid({
    filterSelector: '#houseFilters .filter-pill',
    searchInputId: 'houseSearch',
    gridId: 'housesGrid',
    itemSelector: '.house-card',
    countId: 'houseCountNum',
    emptyId: 'housesEmpty',
  });
  initFilterableGrid({
    filterSelector: '#opinionFilters .filter-pill',
    gridId: 'opinionsGrid',
    itemSelector: '.diary-card',
  });

  // Static Profile / Artist Cards -> Talent Detail Modal
  document.querySelectorAll('[data-open-talent]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const ds = btn.dataset;
      openTalentDetail({
        name: ds.name || 'শিল্পী প্রোফাইল',
        category: ds.category || 'অভিনয়শিল্পী',
        specialty: ds.specialty || '',
        age: ds.age || '২৬',
        height: ds.height || "5' 9\"",
        expLabel: ds.exp || '৪ বছর অভিজ্ঞতা',
        photo: ds.photo || 'assets/images/portfolio-casting.jpg',
        bio: ds.bio || 'ভেরিফাইড Mind Blowing Media শিল্পী ও মডেল প্রোফাইল।',
        videoLink: ds.video || 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
        driveLink: ds.drive || 'index.html#registration-section',
      });
    });
  });

  // Booking / Request Modal Shortcuts (Shooting Houses / Foreign Artists / Notices)
  document.querySelectorAll('[data-open-booking]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (submitModal) {
        const selectEl = submitModal.querySelector('select');
        const label = btn.dataset.openBooking || '';
        if (selectEl && label) {
          const opt = Array.from(selectEl.options).find((o) => o.text.includes(label));
          if (opt) selectEl.value = opt.value;
        }
        openModal(submitModal);
      }
    });
  });

  // Expandable Notice Details
  document.querySelectorAll('[data-toggle-notice]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.notice-card');
      if (!card) return;
      const expanded = card.classList.toggle('expanded');
      const labelEl = btn.querySelector('span');
      const iconEl = btn.querySelector('i');
      if (labelEl) labelEl.textContent = expanded ? 'সংক্ষিপ্ত করুন' : 'বিস্তারিত শর্তাবলি';
      if (iconEl) {
        iconEl.classList.toggle('fa-chevron-down', !expanded);
        iconEl.classList.toggle('fa-chevron-up', expanded);
      }
    });
  });

  // Diary & Editorial Full Reader Modal
  const diaryReaderModal = document.getElementById('diaryReaderModal');
  if (diaryReaderModal) {
    const drTag = document.getElementById('drTag');
    const drTitle = document.getElementById('drTitle');
    const drMeta = document.getElementById('drMeta');
    const drPhoto = document.getElementById('drPhoto');
    const drQuote = document.getElementById('drQuote');
    const drBody = document.getElementById('drBody');

    document.querySelectorAll('[data-read-entry]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const ds = btn.dataset;
        if (drTag) drTag.textContent = ds.tag || 'সম্পাদকীয় নোট';
        if (drTitle) drTitle.textContent = ds.title || '';
        if (drMeta) drMeta.textContent = `${ds.author || ''} • ${ds.date || ''}`;
        if (drPhoto) {
          drPhoto.src = ds.photo || 'assets/images/hero-studio.jpg';
          drPhoto.alt = ds.title || 'ডায়েরি কভার';
        }
        if (drQuote) {
          drQuote.textContent = ds.quote || '';
          drQuote.style.display = ds.quote ? '' : 'none';
        }
        if (drBody) {
          drBody.innerHTML = '';
          const parts = (ds.body || '').split('||').filter(Boolean);
          parts.forEach((text) => {
            const p = document.createElement('p');
            p.textContent = text.trim();
            drBody.appendChild(p);
          });
        }
        openModal(diaryReaderModal);
      });
    });
  }

  // Interactive Industry Poll (Opinions Page)
  const opinionPoll = document.getElementById('opinionPoll');
  if (opinionPoll) {
    const pollOptions = Array.from(opinionPoll.querySelectorAll('.poll-option'));
    let hasVoted = false;

    function renderPollResults() {
      const total = pollOptions.reduce((sum, btn) => sum + Number(btn.dataset.votes || 0), 0) || 1;
      pollOptions.forEach((btn) => {
        const pct = Math.round((Number(btn.dataset.votes || 0) / total) * 100);
        const bar = btn.querySelector('.poll-option-bar');
        const pctEl = btn.querySelector('.poll-pct');
        if (bar) bar.style.width = `${pct}%`;
        if (pctEl) pctEl.textContent = `${pct}%`;
      });
    }

    renderPollResults();
    pollOptions.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!hasVoted) {
          btn.dataset.votes = String(Number(btn.dataset.votes || 0) + 1);
          hasVoted = true;
        }
        pollOptions.forEach((o) => o.classList.remove('selected'));
        btn.classList.add('selected');
        renderPollResults();
        showToast('আপনার মতামত পোল-এ যুক্ত হয়েছে!');
      });
    });
  }

  // Opinion Submission Form (Opinions Page)
  const opinionSubmitForm = document.getElementById('opinionSubmitForm');
  const opinionsGrid = document.getElementById('opinionsGrid');
  if (opinionSubmitForm && opinionsGrid) {
    opinionSubmitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameVal = (document.getElementById('opName')?.value || '').trim();
      const roleVal = (document.getElementById('opRole')?.value || '').trim();
      const catVal = document.getElementById('opCategory')?.value || 'ethics';
      const titleVal = (document.getElementById('opTitle')?.value || '').trim();
      const bodyVal = (document.getElementById('opBody')?.value || '').trim();
      if (!nameVal || !titleVal || !bodyVal) return;

      const card = document.createElement('article');
      card.className = 'diary-card';
      card.dataset.category = catVal;
      card.innerHTML = `
        <div class="diary-media">
          <img src="assets/images/hero-cinema.jpg" alt="" />
          <span class="diary-log-tag">পাঠকের মতামত</span>
        </div>
        <div class="diary-body">
          <div class="diary-date-row"><span><i class="fa-regular fa-calendar"></i> আজ</span><span><i class="fa-regular fa-clock"></i> ২ মিনিট পাঠ</span></div>
          <h3></h3>
          <p class="diary-excerpt"></p>
          <div class="diary-author-bar">
            <div class="diary-author-info">
              <div class="avatar-badge">${nameVal.slice(0, 2)}</div>
              <div><strong></strong><span></span></div>
            </div>
          </div>
        </div>
      `;
      card.querySelector('img').alt = titleVal;
      card.querySelector('h3').textContent = titleVal;
      card.querySelector('.diary-excerpt').textContent = bodyVal;
      card.querySelector('.diary-author-info strong').textContent = nameVal;
      card.querySelector('.diary-author-info span').textContent = roleVal || 'অতিথি লেখক';

      opinionsGrid.prepend(card);
      opinionSubmitForm.reset();
      if (typeof window.gsap !== 'undefined') {
        window.gsap.fromTo(card, { y: -28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, clearProps: 'transform,opacity' });
      }
      showToast(`ধন্যবাদ ${nameVal}! আপনার মতামত প্রকাশিত হয়েছে।`);
      refreshScrollTriggers();
    });
  }

  // Bind Fancybox on Shooting Houses Gallery if available
  if (hasFancybox && document.querySelector('[data-fancybox="shooting-houses"]')) {
    window.Fancybox.bind('[data-fancybox="shooting-houses"]', fancyboxOptions);
  }

  /* -------------------- 11. Lenis Smooth Scroll, Hash Nav & GSAP Text/Image Reveals -------------------- */
  let lenisInstance = null;

  function scrollToTargetElement(targetEl, immediate) {
    if (!targetEl) return;
    if (lenisInstance) {
      if (typeof lenisInstance.resize === 'function') lenisInstance.resize();
      lenisInstance.scrollTo(targetEl, {
        offset: -88,
        immediate: Boolean(immediate),
        duration: immediate ? 0 : 1.0,
        force: true,
      });
    } else {
      const top = Math.max(0, targetEl.getBoundingClientRect().top + window.scrollY - 88);
      window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
    }
  }

  function handleInitialUrlHash() {
    function scrollHash(immediate) {
      const rawHash = window.location.hash;
      if (!rawHash || rawHash.length < 2) return;
      const target = document.getElementById(decodeURIComponent(rawHash.slice(1)));
      if (!target) return;
      scrollToTargetElement(target, immediate);
      refreshScrollTriggers();
    }

    if (window.location.hash && window.location.hash.length > 1) {
      setTimeout(() => scrollHash(false), 120);
      window.addEventListener('load', () => setTimeout(() => scrollHash(false), 180), { once: true });
    }

    window.addEventListener('hashchange', () => scrollHash(false));
  }

  function initCinemaAnimations() {
    const hasGSAP = typeof window.gsap !== 'undefined';
    const hasScrollTrigger = typeof window.ScrollTrigger !== 'undefined';
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // A. Lenis Smooth Scroll synced with GSAP Ticker (even if GSAP is disabled we still handle hashes cleanly)
    if (typeof window.Lenis === 'function' && !reducedMotion) {
      lenisInstance = new window.Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      if (hasScrollTrigger) {
        lenisInstance.on('scroll', window.ScrollTrigger.update);
      }
      if (hasGSAP) {
        window.gsap.ticker.add((time) => {
          lenisInstance.raf(time * 1000);
        });
        window.gsap.ticker.lagSmoothing(0);
      } else {
        function rafLoop(time) {
          lenisInstance.raf(time);
          requestAnimationFrame(rafLoop);
        }
        requestAnimationFrame(rafLoop);
      }

      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          const hash = anchor.getAttribute('href');
          if (!hash || hash === '#') return;
          const targetEl = document.querySelector(hash);
          if (targetEl) {
            e.preventDefault();
            scrollToTargetElement(targetEl, false);
          }
        });
      });
    }

    // Handle cross-page hash navigation like gallery.html -> index.html#registration-section
    handleInitialUrlHash();

    if (!hasGSAP || !hasScrollTrigger || reducedMotion) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const hasScrambleText = typeof window.ScrambleTextPlugin !== 'undefined';

    if (hasScrambleText) {
      gsap.registerPlugin(ScrollTrigger, window.ScrambleTextPlugin);
    } else {
      gsap.registerPlugin(ScrollTrigger);
    }

    const MIXED_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzঅআইঈউঊএঐওঔকখগঘচছজঝটঠডঢতথদধনপফবভমযরলশষসহ';

    // Prepare pure-text targets inside an element without overwriting icons (<i>) or styled child spans
    function getScrambleTargets(el) {
      if (!el) return [];
      if (el.dataset.scramblePrepared === 'true') {
        return Array.from(el.querySelectorAll('[data-scramble-text]')).concat(
          el.dataset.scrambleText ? [el] : []
        );
      }
      el.dataset.scramblePrepared = 'true';

      const targets = [];
      const childNodes = Array.from(el.childNodes);

      childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const raw = node.textContent || '';
          if (raw.trim().length > 0) {
            const span = document.createElement('span');
            span.className = 'gsap-scramble-part';
            span.textContent = raw;
            span.dataset.scrambleText = raw;
            el.replaceChild(span, node);
            targets.push(span);
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.tagName === 'SPAN' && !node.querySelector('i, svg, img')) {
            const raw = node.textContent || '';
            if (raw.trim().length > 0) {
              node.dataset.scrambleText = raw;
              targets.push(node);
            }
          }
        }
      });

      return targets;
    }

    function pickScrambleChars(text) {
      const hasBengali = /[\u0980-\u09FF]/.test(text);
      if (hasBengali) return MIXED_CHARS;
      if (/[0-9]/.test(text) && !/[a-z]/.test(text)) return 'XO0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      return 'upperAndLowerCase';
    }

    function addScrambleTweens(tl, el, position, opts = {}) {
      const targets = getScrambleTargets(el);
      if (!hasScrambleText || !targets.length) return;

      targets.forEach((target, idx) => {
        const finalText = target.dataset.scrambleText || target.textContent;
        const pos = position !== undefined ? (idx === 0 ? position : `${typeof position === 'number' ? position + idx * 0.08 : '-=0.75'}`) : 0;
        tl.to(
          target,
          {
            duration: opts.duration || 1.1,
            ease: 'none',
            scrambleText: {
              text: finalText,
              chars: opts.chars || pickScrambleChars(finalText),
              revealDelay: opts.revealDelay !== undefined ? opts.revealDelay : 0.16,
              speed: opts.speed || 0.45,
            },
          },
          pos
        );
      });
    }

    // Navbar Brand ScrambleText on Load + Hover (preserves colored word spans)
    const brandTitle = document.querySelector('.brand-title');
    const brandSub = document.querySelector('.brand-sub');
    const brandWrap = document.querySelector('.brand');
    if (hasScrambleText && brandTitle) {
      const wordSpans = Array.from(brandTitle.querySelectorAll('span'));
      const targets = wordSpans.length ? wordSpans : [brandTitle];
      targets.forEach((sp, i) => {
        sp.dataset.scrambleText = sp.textContent;
        gsap.to(sp, {
          duration: 0.9,
          delay: i * 0.08,
          ease: 'none',
          scrambleText: { text: sp.dataset.scrambleText, chars: 'upperAndLowerCase', revealDelay: 0.1, speed: 0.45 },
        });
      });
      if (brandSub) {
        brandSub.dataset.scrambleText = brandSub.textContent;
        gsap.to(brandSub, {
          duration: 1.0,
          delay: 0.14,
          ease: 'none',
          scrambleText: { text: brandSub.dataset.scrambleText, chars: 'upperAndLowerCase', revealDelay: 0.1, speed: 0.5 },
        });
      }
      if (brandWrap) {
        brandWrap.addEventListener('mouseenter', () => {
          targets.forEach((sp) => {
            gsap.to(sp, {
              duration: 0.65,
              overwrite: 'auto',
              scrambleText: { text: sp.dataset.scrambleText, chars: 'XO0123456789MINDBLOWING', speed: 0.55 },
            });
          });
          if (brandSub) {
            gsap.to(brandSub, {
              duration: 0.75,
              overwrite: 'auto',
              scrambleText: { text: brandSub.dataset.scrambleText, chars: 'upperAndLowerCase', speed: 0.55 },
            });
          }
        });
      }
    }

    // B. Hero Entrance (Initial load only — slide changes switch cleanly without re-animating)
    let heroEntranceTl = null;
    function animateHeroSlideContent(slideEl) {
      if (!slideEl) return;
      const content = slideEl.querySelector('.hero-content');
      if (!content) return;

      const badge = content.querySelector('.hero-badge');
      const title = content.querySelector('.hero-title');
      const desc = content.querySelector('.hero-desc');
      const ctas = content.querySelector('.hero-cta-row');
      const chips = content.querySelectorAll('.hero-meta-strip .meta-chip');

      const tl = gsap.timeline({ delay: 0.05 });
      heroEntranceTl = tl;

      if (badge) {
        tl.fromTo(
          badge,
          { opacity: 0, y: -18, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out', clearProps: 'all' },
          0
        );
        addScrambleTweens(tl, badge, 0.05, { duration: 0.95, revealDelay: 0.12, speed: 0.5 });
      }

      if (title) {
        tl.fromTo(
          title,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', clearProps: 'all' },
          0.08
        );
        addScrambleTweens(tl, title, 0.1, { duration: 1.25, revealDelay: 0.18, speed: 0.45 });

        const span = title.querySelector('.text-gold-gradient');
        if (span) {
          tl.fromTo(
            span,
            { scale: 0.96 },
            { scale: 1, duration: 0.45, ease: 'back.out(1.5)', clearProps: 'transform' },
            0.25
          );
        }
      }

      if (desc) {
        tl.fromTo(
          desc,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.48, ease: 'power2.out', clearProps: 'all' },
          0.32
        );
      }

      if (ctas) {
        tl.fromTo(
          ctas,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.42, ease: 'power2.out', clearProps: 'all' },
          0.38
        );
      }

      if (chips.length) {
        tl.fromTo(
          chips,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.38, stagger: 0.06, ease: 'power2.out', clearProps: 'all' },
          0.42
        );
        chips.forEach((chip, cIdx) => {
          addScrambleTweens(tl, chip, 0.44 + cIdx * 0.08, { duration: 0.85, chars: 'upperAndLowerCase', revealDelay: 0.1, speed: 0.5 });
        });
      }
    }

    const activeHeroSlide = document.querySelector('#heroSlider .swiper-slide-active');
    if (activeHeroSlide) {
      animateHeroSlideContent(activeHeroSlide);
    }
    if (heroSwiper && typeof heroSwiper.on === 'function') {
      heroSwiper.on('slideChangeTransitionStart', () => {
        if (heroEntranceTl) {
          heroEntranceTl.progress(1).kill();
          heroEntranceTl = null;
        }
      });
    }

    // C. Subpage Hero Entrance (Gallery, Videos, Reviews Pages)
    const pageHero = document.querySelector('.page-hero');
    if (pageHero) {
      const crumbs = pageHero.querySelector('.breadcrumb-row');
      const eyebrow = pageHero.querySelector('.eyebrow');
      const h1 = pageHero.querySelector('h1');
      const desc = pageHero.querySelector('.page-hero-inner p');

      const phTl = gsap.timeline({ delay: 0.05 });
      if (crumbs) {
        phTl.fromTo(crumbs, { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'all' }, 0);
      }
      if (eyebrow) {
        phTl.fromTo(eyebrow, { opacity: 0, y: -16, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out', clearProps: 'all' }, 0.05);
        addScrambleTweens(phTl, eyebrow, 0.06, { duration: 0.9, revealDelay: 0.12, speed: 0.5 });
      }
      if (h1) {
        phTl.fromTo(h1, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', clearProps: 'all' }, 0.1);
        addScrambleTweens(phTl, h1, 0.12, { duration: 1.2, revealDelay: 0.18, speed: 0.45 });
        const span = h1.querySelector('.text-gold-gradient');
        if (span) {
          phTl.fromTo(span, { scale: 0.96 }, { scale: 1, duration: 0.45, ease: 'back.out(1.5)', clearProps: 'transform' }, 0.25);
        }
      }
      if (desc) {
        phTl.fromTo(desc, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'all' }, 0.3);
      }
    }

    // D. Scroll-Triggered Section Heading ScrambleText Animations
    function initHeadingAnimations() {
      const sections = document.querySelectorAll('section:not(.hero-section):not(.page-hero)');
      sections.forEach((sec) => {
        if (sec.dataset.gsapHeadingDone) return;
        const eyebrow = sec.querySelector('.eyebrow, .autoscroll-pill');
        const title = sec.querySelector('.section-title, .autoscroll-title, .cta-content h2');
        const sub = sec.querySelector('.section-sub, .cta-content p');

        if (!eyebrow && !title && !sub) return;
        sec.dataset.gsapHeadingDone = 'true';

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true,
          },
        });

        if (eyebrow) {
          tl.fromTo(
            eyebrow,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'all' },
            0
          );
          addScrambleTweens(tl, eyebrow, 0.02, { duration: 0.9, chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', revealDelay: 0.1, speed: 0.5 });
        }

        if (title) {
          tl.fromTo(
            title,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', clearProps: 'all' },
            0.08
          );
          addScrambleTweens(tl, title, 0.1, { duration: 1.15, revealDelay: 0.15, speed: 0.45 });

          const span = title.querySelector('.text-gold-gradient');
          if (span) {
            tl.fromTo(
              span,
              { scale: 0.96 },
              { scale: 1, duration: 0.4, ease: 'back.out(1.5)', clearProps: 'transform' },
              0.24
            );
          }
        }

        if (sub) {
          tl.fromTo(
            sub,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', clearProps: 'all' },
            0.24
          );
        }
      });

      // Sub-block headings (spotlight / review form)
      document.querySelectorAll('.video-spotlight h2, .review-form-shell h2').forEach((el) => {
        if (el.dataset.gsapHeadingDone) return;
        el.dataset.gsapHeadingDone = 'true';
        const subTl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
        subTl.fromTo(
          el,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', clearProps: 'all' },
          0
        );
        addScrambleTweens(subTl, el, 0.05, { duration: 1.1, revealDelay: 0.15, speed: 0.45 });
      });
    }

    // E. Top-to-Bottom & Bottom-to-Top Card / Section Reveals
    function initDirectionalCardAnimations() {
      const explicitNodes = Array.from(document.querySelectorAll('[data-gsap="top"], [data-gsap="bottom"]'));
      const autoNodes = Array.from(
        document.querySelectorAll(
          '.stat-item, .dir-card, .faq-item, .registration-info, .registration-form-card, .reg-highlight-item, .video-spotlight, .review-form-shell, .cta-banner, .portal-hub-card, .notice-card, .diary-card, .house-card, .checklist-card, .manifesto-card'
        )
      );

      const combined = Array.from(new Set([...explicitNodes, ...autoNodes]));

      combined.forEach((el, idx) => {
        if (el.dataset.gsapCardDone) return;
        if (el.classList.contains('swiper-slide')) return;
        el.dataset.gsapCardDone = 'true';

        const dir = el.getAttribute('data-gsap') || (idx % 2 === 0 ? 'top' : 'bottom');
        const fromY = dir === 'top' ? -38 : 42;

        gsap.fromTo(
          el,
          { y: fromY, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.72,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
            },
          }
        );
      });
    }

    // F. Image Curtain-Wipe (Top->Bottom & Bottom->Top) + Zoom-Out + Gold Sheen
    function initImageAnimations() {
      const imageContainers = document.querySelectorAll(
        '.img-reveal-top, .img-reveal-bottom, .card-media, .dir-photo, .gallery-img-wrap, .spotlight-media, .diary-media'
      );

      imageContainers.forEach((wrap, idx) => {
        if (wrap.dataset.gsapImgDone) return;
        if (wrap.closest('.swiper-slide-duplicate')) return;

        const img = wrap.querySelector('img');
        if (!img) return;
        wrap.dataset.gsapImgDone = 'true';

        if (getComputedStyle(wrap).position === 'static') {
          wrap.style.position = 'relative';
        }

        let sheen = wrap.querySelector('.gsap-sheen');
        if (!sheen) {
          sheen = document.createElement('div');
          sheen.className = 'gsap-sheen';
          wrap.appendChild(sheen);
        }

        const isTopDown =
          wrap.classList.contains('img-reveal-top') ||
          (!wrap.classList.contains('img-reveal-bottom') && idx % 2 === 0);

        const startClip = isTopDown
          ? 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
          : 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)';
        const endClip = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

        const imgTl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: 'top 90%',
            once: true,
          },
        });

        imgTl
          .fromTo(
            wrap,
            { clipPath: startClip },
            {
              clipPath: endClip,
              duration: 0.85,
              ease: 'power3.inOut',
              clearProps: 'clipPath',
            },
            0
          )
          .fromTo(
            img,
            { scale: 1.24, opacity: 0.72 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.0,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
            },
            0
          )
          .fromTo(
            sheen,
            { xPercent: -130, opacity: 0.9 },
            { xPercent: 180, opacity: 0, duration: 0.9, ease: 'power2.out' },
            0.18
          );

        wrap.addEventListener('mouseenter', () => {
          gsap.fromTo(
            sheen,
            { xPercent: -130, opacity: 0.85 },
            { xPercent: 180, opacity: 0, duration: 0.75, ease: 'power2.out', overwrite: 'auto' }
          );
        });
      });
    }

    initHeadingAnimations();
    initDirectionalCardAnimations();
    initImageAnimations();

    // G. IntersectionObserver + Timeout Safeguard (no text/image stays stuck invisible)
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const sec = entry.target;
            sec.querySelectorAll('.eyebrow, .autoscroll-pill, .section-title, .autoscroll-title, .section-sub, .cta-content h2, .cta-content p, [data-gsap]').forEach((el) => {
              if (el.style.opacity === '0' || getComputedStyle(el).opacity === '0') {
                gsap.to(el, { opacity: 1, y: 0, duration: 0.35, clearProps: 'all' });
              }
            });
            io.unobserve(sec);
          });
        },
        { threshold: 0.05 }
      );
      document.querySelectorAll('section').forEach((sec) => io.observe(sec));
    }

    setTimeout(() => {
      document.querySelectorAll('.eyebrow, .autoscroll-pill, .section-title, .autoscroll-title, .section-sub, .hero-title, .hero-desc').forEach((el) => {
        if (el.style.opacity === '0' || getComputedStyle(el).opacity === '0') {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.3, clearProps: 'all' });
        }
      });
      document.querySelectorAll('.img-reveal-top, .img-reveal-bottom, .gallery-img-wrap, .spotlight-media').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.15) {
          el.style.clipPath = 'none';
        }
      });
      ScrollTrigger.refresh();
    }, 1200);
  }

  initCinemaAnimations();

  /* -------------------- 12. Stylish Back-to-Top Floating Button (All Pages) -------------------- */
  function initBackToTopButton() {
    if (document.getElementById('backToTopBtn')) return;

    const btn = document.createElement('button');
    btn.id = 'backToTopBtn';
    btn.type = 'button';
    btn.className = 'back-to-top-btn';
    btn.setAttribute('aria-label', 'উপরে ফিরে যান');
    btn.innerHTML = `
      <svg class="back-to-top-ring" viewBox="0 0 54 54" aria-hidden="true">
        <defs>
          <linearGradient id="mbmScrollGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1d6fff" />
            <stop offset="55%" stop-color="#60a5fa" />
            <stop offset="100%" stop-color="#ff6b1a" />
          </linearGradient>
        </defs>
        <circle class="back-to-top-track" cx="27" cy="27" r="24"></circle>
        <circle class="back-to-top-progress" cx="27" cy="27" r="24"></circle>
      </svg>
      <span class="back-to-top-core"><i class="fa-solid fa-arrow-up"></i></span>
      <span class="back-to-top-tip">TOP</span>
    `;
    document.body.appendChild(btn);

    const progressCircle = btn.querySelector('.back-to-top-progress');
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    if (progressCircle) {
      progressCircle.style.strokeDasharray = `${circumference}`;
      progressCircle.style.strokeDashoffset = `${circumference}`;
    }

    function updateProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, scrollTop / docHeight));

      if (progressCircle) {
        progressCircle.style.strokeDashoffset = `${circumference * (1 - ratio)}`;
      }
      if (scrollTop > 240) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    if (lenisInstance && typeof lenisInstance.on === 'function') {
      lenisInstance.on('scroll', updateProgress);
    }
    updateProgress();

    btn.addEventListener('click', () => {
      if (lenisInstance && typeof lenisInstance.scrollTo === 'function') {
        lenisInstance.scrollTo(0, { duration: 1.15 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  initBackToTopButton();
});

