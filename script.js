/**
 * Suvradip Dey Portfolio Interactivity Engine
 * Lightweight, zero dependencies, high performance
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Typing Effect
  const typedTextEl = document.getElementById('typedText');
  const words = [
    'Modern React Web Apps',
    'High-Converting E-Commerce',
    'SEO-Optimized Digital Experiences',
    'Scalable Frontend Architectures',
    'Clean & Tested Code'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 45;
    } else {
      typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingDelay = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingDelay = 400; // Pause before typing new word
    }

    setTimeout(typeEffect, typingDelay);
  }
  typeEffect();

  // 2. Mobile Menu Navigation
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('open');
      });
    });
  }

  // 3. Scroll Spy for Active Navigation
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 4. Project Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Project Case Studies Data & Modal
  const projectData = {
    portfolio: {
      category: 'FLAGSHIP PROJECT & DIGITAL IDENTITY',
      title: 'Personal Portfolio & Brand Platform',
      body: `
        <p><strong>Overview:</strong> This website was designed and built from the ground up to demonstrate production-grade frontend engineering, accessible UI design, and continuous Git deployment.</p>
        <h4>Key Engineering Highlights:</h4>
        <ul>
          <li><strong>Architecture:</strong> Zero-dependency, ultra-lightweight DOM footprint yielding instantaneous load times and 100% Core Web Vitals score.</li>
          <li><strong>SEO First:</strong> Complete OpenGraph tags, schema metadata, and semantic markup for search discovery.</li>
          <li><strong>Responsive Ergonomics:</strong> Tested across mobile, tablet, and widescreen layouts using modern CSS Flexbox and Grid.</li>
          <li><strong>Version Control:</strong> Managed through continuous Git commits with semantic commit message conventions.</li>
        </ul>
        <h4>Tech Stack:</h4>
        <p>HTML5, Modern CSS3 (Custom Design Tokens), Vanilla JavaScript, Git & GitHub.</p>
      `,
      github: 'https://github.com/HENRY3757v'
    },
    shopease: {
      category: 'FULL-FEATURED E-COMMERCE',
      title: 'TheShopEase – Modern Online Storefront',
      body: `
        <p><strong>Overview:</strong> TheShopEase is a full-featured e-commerce client built with React.js and Tailwind CSS designed to provide a fast, app-like online shopping journey.</p>
        <h4>Key Engineering Highlights:</h4>
        <ul>
          <li><strong>State Management:</strong> Real-time cart state with persistent item counts, quantity incrementation, and automatic price calculations.</li>
          <li><strong>Catalog Filtering:</strong> Instant client-side filtering by category, search queries, and price ranges without full page reloads.</li>
          <li><strong>Responsive Experience:</strong> Mobile-first drawer navigation, quick-view modals, and accessible checkout actions.</li>
          <li><strong>SEO & Speed:</strong> Semantic structure, asset optimization, and clean component-driven architecture.</li>
        </ul>
        <h4>Tech Stack:</h4>
        <p>React.js, Tailwind CSS, JavaScript (ES6+), React Hooks (useState, useEffect, useContext).</p>
      `,
      github: 'https://github.com/HENRY3757v/THESHOPEASE'
    },
    smartprocure: {
      category: 'ENTERPRISE SYSTEM',
      title: 'SmartProcure – B2B Procurement Portal',
      body: `
        <p><strong>Overview:</strong> An enterprise workflow solution created to streamline vendor quotation comparisons, internal requisition approvals, and purchase tracking.</p>
        <h4>Key Engineering Highlights:</h4>
        <ul>
          <li><strong>Data Management:</strong> Structured tables for comparing supplier price bids and delivery timelines.</li>
          <li><strong>Workflow Automation:</strong> Status badges tracking orders from Draft to Approved, Dispatched, and Delivered.</li>
          <li><strong>Clean Interface:</strong> High-density UI engineered for speed and minimal cognitive overhead during high-volume operations.</li>
        </ul>
        <h4>Tech Stack:</h4>
        <p>JavaScript, REST APIs, CSS Architecture, Relational SQL Design.</p>
      `,
      github: 'https://github.com/HENRY3757v'
    },
    pythonutils: {
      category: 'UTILITIES & AUTOMATION',
      title: 'Python Data & Automation Suite',
      body: `
        <p><strong>Overview:</strong> A collection of automated scripts and data processors built in Python to interact with SQL databases, parse structured feeds, and eliminate repetitive clerical work.</p>
        <h4>Key Engineering Highlights:</h4>
        <ul>
          <li><strong>Automated Ingestion:</strong> Scripts parse CSV, JSON, and raw data streams into normalized relational tables.</li>
          <li><strong>Database Transactions:</strong> Executes parameterized queries to maintain data integrity and prevent SQL injection.</li>
          <li><strong>Algorithmic Efficiency:</strong> Optimized processing loops for rapid batch computations.</li>
        </ul>
        <h4>Tech Stack:</h4>
        <p>Python 3, SQLite / PostgreSQL, Data Parsing Libraries, Automation Scripts.</p>
      `,
      github: 'https://github.com/HENRY3757v'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalGithubBtn = document.getElementById('modalGithubBtn');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];
      if (data) {
        modalCategory.textContent = data.category;
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.body;
        modalGithubBtn.href = data.github;
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // 6. Toast Notification Helper
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // 7. Copy Email Action
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'leodas8777@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('Direct email: leodas8777@gmail.com');
      });
    });
  }

  // 8. Contact Form Submission (Mailto Bridge)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const service = document.getElementById('projectType').value;
      const message = document.getElementById('messageText').value.trim();

      const subject = encodeURIComponent(`Project Inquiry: ${service} - from ${name}`);
      const body = encodeURIComponent(
        `Hi Suvradip,\n\nMy name is ${name} (${email}).\n\nI am reaching out regarding: ${service}\n\nProject Details:\n${message}\n\nLooking forward to hearing from you!`
      );

      // Open mail client
      window.location.href = `mailto:leodas8777@gmail.com?subject=${subject}&body=${body}`;
      showToast('Opening your email client to send message...');
      contactForm.reset();
    });
  }

  // 9. Automatic Year Update
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
});
