/**
 * article.js — Shared functionality for article pages
 * Stephen Baraka Portfolio
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- Reading Progress Bar ---
  const progressBar = document.querySelector('.reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    });
  }

  // --- Scroll Reveal ---
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal-article');
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 60) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', function () {
    setTimeout(revealOnScroll, 200);
  });

  // --- Table of Contents Active Highlight ---
  const tocLinks = document.querySelectorAll('.article-toc a');
  const headings = document.querySelectorAll('.article-content h2');

  if (tocLinks.length && headings.length) {
    function updateActiveToc() {
      let currentId = '';
      headings.forEach(h => {
        const rect = h.getBoundingClientRect();
        if (rect.top <= 150) {
          currentId = h.getAttribute('id');
        }
      });

      tocLinks.forEach(a => {
        a.classList.remove('active-toc');
        if (a.getAttribute('href') === '#' + currentId) {
          a.classList.add('active-toc');
        }
      });
    }

    window.addEventListener('scroll', updateActiveToc);
    updateActiveToc();

    // Smooth scroll for TOC links
    tocLinks.forEach(a => {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // --- Copy Article Link ---
  const copyBtn = document.querySelector('.copy-link-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        this.style.borderColor = '#22c55e';
        this.style.color = '#22c55e';
        setTimeout(() => {
          this.innerHTML = originalText;
          this.style.borderColor = '';
          this.style.color = '';
        }, 2000);
      });
    });
  }

  // --- Scroll to Top ---
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Active Nav Highlighting ---
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href');
    if (href === 'blog.html') {
      a.classList.add('active');
    }
  });

  console.log('Article page initialized');
});

