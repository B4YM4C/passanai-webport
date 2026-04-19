'use client';

import { useEffect } from 'react';

export default function Cinema() {
  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll('.cinema .scene'));
    const markers = Array.from(document.querySelectorAll('.cinema-marker .frame'));
    const COUNT = scenes.length;

    const hero = document.querySelector('header.hero');
    const aboutEl = document.getElementById('about');

    function cinemaStartY() {
      if (hero) return hero.offsetTop + hero.offsetHeight * 0.5;
      if (aboutEl) return aboutEl.offsetTop - window.innerHeight * 0.5;
      return 0;
    }

    function updateCinema() {
      const startY = cinemaStartY();
      const endY = document.documentElement.scrollHeight - window.innerHeight;

      if (window.scrollY < startY) {
        scenes.forEach((v) => v.classList.remove('active', 'past'));
        markers.forEach((m) => m.classList.remove('active'));
        return;
      }

      const range = Math.max(1, endY - startY);
      const p = Math.max(0, Math.min(1, (window.scrollY - startY) / range));
      const pos = p * (COUNT - 1);
      const activeIdx = Math.min(COUNT - 1, Math.round(pos));

      scenes.forEach((v, idx) => {
        v.classList.remove('active', 'past');
        if (idx < activeIdx) v.classList.add('past');
        else if (idx === activeIdx) v.classList.add('active');
      });

      markers.forEach((m, idx) => m.classList.toggle('active', idx === activeIdx));
    }

    function managePlayback() {
      const startY = cinemaStartY();
      const endY = document.documentElement.scrollHeight - window.innerHeight;

      if (window.scrollY < startY) return;

      const range = Math.max(1, endY - startY);
      const p = Math.max(0, Math.min(1, (window.scrollY - startY) / range));
      const pos = p * (COUNT - 1);
      const activeIdx = Math.min(COUNT - 1, Math.round(pos));

      scenes.forEach((v, idx) => {
        const nearActive = Math.abs(idx - activeIdx) <= 1;
        if (nearActive) {
          v.play().catch(() => {});
        }
      });
    }

    scenes.forEach((v) => {
      v.playbackRate = 1.0;
      v.play().catch(() => {});
    });
    updateCinema();
    managePlayback();

    let raf = null;
    const scrollHandler = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        updateCinema();
        managePlayback();
        raf = null;
      });
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', updateCinema);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', updateCinema);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
