/**
 * blog.js — Professional Blog Page Functionality
 * Stephen Baraka Portfolio
 * Features: Category filtering, search filter, scroll reveal animations,
 * back-to-top button, newsletter form, article navigation
 */

document.addEventListener('DOMContentLoaded', function () {

  'use strict';

  // ============================================================
  // 1. BLOG DATA — All articles with links, categories & keywords
  // ============================================================
  const articles = [
    {
      id: 1,
      slug: 'web-development-journey',
      title: 'My Journey Into Web Development',
      description: 'How I went from writing my first HTML tag to building full-stack web applications. A story of persistence, late nights, and the joy of creating.',
      category: 'Journey',
      date: 'Jan 15, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
      link: 'articles/web-development-journey.html',
      keywords: ['html', 'css', 'javascript', 'full-stack', 'beginner', 'learning', 'career', 'web development'],
      featured: true
    },
    {
      id: 2,
      slug: 'frontend-development',
      title: 'Why I Love Frontend Development',
      description: 'Frontend development combines creativity and technical problem solving. Here is why it excites me every single day.',
      category: 'Frontend',
      date: 'Jan 10, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&q=80',
      link: 'articles/frontend-development.html',
      keywords: ['frontend', 'ui', 'ux', 'design', 'creativity', 'user interface', 'web design'],
      featured: false
    },
    {
      id: 3,
      slug: 'internhub-kenya',
      title: 'Building InternHub Kenya – My Biggest Project',
      description: 'A deep dive into designing and developing a platform that connects Kenyan students with verified internship opportunities.',
      category: 'Projects',
      date: 'Jan 5, 2026',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      link: 'articles/internhub-kenya.html',
      keywords: ['project', 'internship', 'kenya', 'platform', 'full-stack', 'students', 'opportunities'],
      featured: false
    },
    {
      id: 4,
      slug: 'react-tips',
      title: '5 React Tips That Improved My Workflow',
      description: 'Practical React patterns and techniques that made me a more efficient developer. From hooks to state management.',
      category: 'React',
      date: 'Dec 28, 2025',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
      link: 'articles/react-tips.html',
      keywords: ['react', 'hooks', 'state management', 'components', 'frontend', 'patterns', 'workflow'],
      featured: false
    },
    {
      id: 5,
      slug: 'javascript-concepts',
      title: 'JavaScript Concepts Every Developer Should Know',
      description: 'Closures, promises, async/await, and the event loop — mastering these will level up your JavaScript game significantly.',
      category: 'JavaScript',
      date: 'Dec 20, 2025',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&q=80',
      link: 'articles/javascript-concepts.html',
      keywords: ['javascript', 'closures', 'promises', 'async', 'event loop', 'js', 'coding', 'fundamentals'],
      featured: false
    },
    {
      id: 6,
      slug: 'css-tricks',
      title: 'CSS Tricks I Use Every Day',
      description: 'From Flexbox to CSS Grid, custom properties to animations — these CSS techniques save me time and produce beautiful results.',
      category: 'CSS',
      date: 'Dec 12, 2025',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&q=80',
      link: 'articles/css-tricks.html',
      keywords: ['css', 'flexbox', 'grid', 'animations', 'responsive', 'design', 'styling', 'frontend'],
      featured: false
    },
    {
      id: 7,
      slug: 'github-tips',
      title: 'GitHub Tips for Beginners',
      description: 'Essential GitHub workflows every new developer should master. Collaboration, branching, pull requests and open source contributions.',
      category: 'GitHub',
      date: 'Dec 5, 2025',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&q=80',
      link: 'articles/github-tips.html',
      keywords: ['github', 'git', 'version control', 'collaboration', 'open source', 'workflow', 'beginners'],
      featured: false
    },
    {
      id: 8,
      slug: 'learning-roadmap',
      title: 'My 2026 Learning Roadmap',
      description: 'The technologies, frameworks, and skills I plan to master this year. From TypeScript to cloud deployment and beyond.',
      category: 'Journey',
      date: 'Dec 1, 2025',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
      link: 'articles/learning-roadmap.html',
      keywords: ['roadmap', 'learning', 'typescript', 'cloud', 'goals', '2026', 'skills', 'growth'],
      featured: false
    },
    {
      id: 9,
      slug: 'javascript-event-loop',
      title: 'Understanding the JavaScript Event Loop',
      description: 'A visual guide to how asynchronous code works in JavaScript. Master the call stack, task queue, and microtask queue.',
      category: 'JavaScript',
      date: 'Nov 22, 2025',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
      link: 'articles/javascript-event-loop.html',
      keywords: ['javascript', 'event loop', 'async', 'call stack', 'microtask', 'promises', 'concurrency'],
      featured: false
    }
  ];

  // ============================================================
  // 2. RENDER FEATURED ARTICLE
  // ============================================================
  const featuredArticle = articles.find(a => a.featured === true) || articles[0];

  const featuredEl = document.getElementById('blog-featured');
  if (featuredEl) {
    featuredEl.innerHTML = `
      <div class="blog-featured-image-wrapper">
        <img src="${featuredArticle.image}" alt="${featuredArticle.title}" class="blog-featured-image" loading="lazy">
      </div>
      <div class="blog-featured-content">
        <span class="blog-featured-badge"><i class="fa-solid fa-star"></i> Featured Article</span>
        <h2 class="blog-featured-title">${featuredArticle.title}</h2>
        <div class="blog-featured-meta">
          <span><i class="fa-regular fa-calendar"></i> ${featuredArticle.date}</span>
          <span class="divider"></span>
          <span><i class="fa-regular fa-clock"></i> ${featuredArticle.readTime}</span>
        </div>
        <span class="blog-featured-category">${featuredArticle.category}</span>
        <p class="blog-featured-description">${featuredArticle.description}</p>
        <a href="${featuredArticle.link}" class="blog-read-more">
          Read Full Article
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    `;
  }

  // ============================================================
  // 3. RENDER LATEST ARTICLES GRID
  // ============================================================
  const gridEl = document.getElementById('articles-grid');

  function renderArticles(articleList) {
    if (!gridEl) return;
    if (articleList.length === 0) {
      gridEl.innerHTML = `
        <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--blog-muted, #94A3B8);">
          <i class="fa-solid fa-search" style="font-size: 48px; margin-bottom: 20px; color: #6366F1;"></i>
          <h3 style="color: #E5E7EB; margin-bottom: 8px;">No articles found</h3>
          <p>Try a different search term or category.</p>
        </div>
      `;
      return;
    }

    gridEl.innerHTML = articleList.map(article => `
      <article class="blog-article-card reveal-card">
        <div class="blog-article-card-image-wrapper">
          <img src="${article.image}" alt="${article.title}" class="blog-article-card-image" loading="lazy">
          <span class="blog-article-card-category">${article.category}</span>
        </div>
        <div class="blog-article-card-body">
          <div class="blog-article-card-meta">
            <span><i class="fa-regular fa-calendar"></i> ${article.date}</span>
            <span><i class="fa-regular fa-clock"></i> ${article.readTime}</span>
          </div>
          <h3 class="blog-article-card-title">${article.title}</h3>
          <p class="blog-article-card-description">${article.description}</p>
          <a href="${article.link}" class="blog-article-card-link">
            Read More
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </article>
    `).join('');
  }

  // Initial render (exclude featured from grid)
  const nonFeatured = articles.filter(a => !a.featured);
  renderArticles(nonFeatured);

  // ============================================================
  // 4. CATEGORY FILTER
  // ============================================================
  const filterBtns = document.querySelectorAll('.blog-category-pill');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const category = this.getAttribute('data-filter').toLowerCase();

      let filtered;
      if (category === 'all') {
        filtered = articles.filter(a => !a.featured);
      } else {
        filtered = articles.filter(a => a.category.toLowerCase() === category && !a.featured);
      }

      renderArticles(filtered);

      // Re-trigger scroll reveal for new cards
      setTimeout(() => {
        const cards = document.querySelectorAll('.blog-article-card');
        cards.forEach(card => {
          const rect = card.getBoundingClientRect();
          if (rect.top < window.innerHeight - 80) {
            card.classList.add('active-card');
          }
        });
      }, 100);
    });
  });

  // ============================================================
  // 5. SEARCH FILTER
  // ============================================================
  const searchInput = document.getElementById('blog-search');

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();

      // Reset category pills to "All"
      filterBtns.forEach(b => b.classList.remove('active'));
      document.querySelector('[data-filter="all"]')?.classList.add('active');

      if (query === '') {
        renderArticles(articles.filter(a => !a.featured));
        return;
      }

      const results = articles.filter(a => {
        if (a.featured) return false;

        // Match against title, description, category, and keywords
        const matchTitle = a.title.toLowerCase().includes(query);
        const matchDesc = a.description.toLowerCase().includes(query);
        const matchCategory = a.category.toLowerCase().includes(query);
        const matchKeywords = a.keywords.some(k => k.toLowerCase().includes(query));

        return matchTitle || matchDesc || matchCategory || matchKeywords;
      });

      renderArticles(results);

      // Re-trigger scroll reveal
      setTimeout(() => {
        const cards = document.querySelectorAll('.blog-article-card');
        cards.forEach(card => {
          const rect = card.getBoundingClientRect();
          if (rect.top < window.innerHeight - 80) {
            card.classList.add('active-card');
          }
        });
      }, 100);
    });
  }

  // ============================================================
  // 6. SCROLL REVEAL ANIMATIONS
  // ============================================================
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal-card');
    const windowHeight = window.innerHeight;
    const revealPoint = 80;

    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - revealPoint) {
        el.classList.add('active-card');
      }
    });

    // Also reveal stat cards
    const statCards = document.querySelectorAll('.blog-stat-card');
    statCards.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 60) {
        el.classList.add('active-card');
      }
    });

    // Newsletter section
    const newsletter = document.querySelector('.newsletter-section');
    if (newsletter) {
      const rect = newsletter.getBoundingClientRect();
      if (rect.top < windowHeight - 60) {
        newsletter.classList.add('active-card');
      }
    }

    // Quote section
    const quote = document.querySelector('.blog-quote');
    if (quote) {
      const rect = quote.getBoundingClientRect();
      if (rect.top < windowHeight - 60) {
        quote.classList.add('active-card');
      }
    }
  }

  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', function () {
    setTimeout(revealOnScroll, 200);
  });

  // ============================================================
  // 7. BACK TO TOP BUTTON
  // ============================================================
  const backToTop = document.getElementById('back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // 8. INITIAL ACTIVE NAV HIGHLIGHT
  // ============================================================
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href');
    if (href === 'blog.html') {
      a.classList.add('active');
    }
  });

  // ============================================================
  // 9. NEWSLETTER FORM
  // ============================================================
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = this.querySelector('input');
      const btn = this.querySelector('button');
      if (input && input.value.trim() !== '') {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Subscribed!';
        btn.style.background = '#22c55e';
        input.value = '';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
        }, 2500);
      }
    });
  }

  console.log('📝 Blog page initialized successfully');
});

