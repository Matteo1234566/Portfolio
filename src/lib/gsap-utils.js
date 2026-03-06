'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function initGsap() {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
}

export function fadeInUp(element, options = {}) {
  return gsap.fromTo(element, 
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration || 0.8,
      ease: options.ease || 'power3.out',
      scrollTrigger: options.scrollTrigger ? {
        trigger: element,
        start: options.start || 'top 85%',
        end: options.end || 'bottom 15%',
        toggleActions: options.toggleActions || 'play none none reverse'
      } : undefined
    }
  );
}

export function fadeIn(element, options = {}) {
  return gsap.fromTo(element,
    { opacity: 0 },
    {
      opacity: 1,
      duration: options.duration || 0.6,
      ease: options.ease || 'power2.out',
      scrollTrigger: options.scrollTrigger ? {
        trigger: element,
        start: options.start || 'top 85%',
        toggleActions: options.toggleActions || 'play none none reverse'
      } : undefined
    }
  );
}

export function staggerFadeIn(elements, options = {}) {
  return gsap.fromTo(elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration || 0.6,
      stagger: options.stagger || 0.1,
      ease: options.ease || 'power3.out',
      scrollTrigger: options.scrollTrigger ? {
        trigger: elements[0]?.parentElement,
        start: options.start || 'top 80%',
        toggleActions: options.toggleActions || 'play none none reverse'
      } : undefined
    }
  );
}

export function underlineReveal(element, options = {}) {
  return gsap.fromTo(element,
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: options.duration || 0.5,
      ease: options.ease || 'power2.out',
      transformOrigin: options.origin || 'left center',
      scrollTrigger: options.scrollTrigger ? {
        trigger: element,
        start: options.start || 'top 85%',
        toggleActions: options.toggleActions || 'play none none reverse'
      } : undefined
    }
  );
}

export function imageReveal(element, options = {}) {
  return gsap.fromTo(element,
    { scale: options.scaleStart || 1.2, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: options.duration || 1,
      ease: options.ease || 'power3.out',
      scrollTrigger: options.scrollTrigger ? {
        trigger: element,
        start: options.start || 'top 85%',
        toggleActions: options.toggleActions || 'play none none reverse'
      } : undefined
    }
  );
}

export function parallax(element, options = {}) {
  return gsap.to(element, {
    y: options.y || -100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: options.start || 'top bottom',
      end: options.end || 'bottom top',
      scrub: options.scrub || 1
    }
  });
}

export function splitTextAnimation(element, options = {}) {
  const text = element.textContent;
  element.innerHTML = text
    .split('')
    .map(char => char === ' ' ? '<span class="inline-block">&nbsp;</span>' : `<span class="inline-block">${char}</span>`)
    .join('');
  
  const chars = element.querySelectorAll('span');
  
  return gsap.fromTo(chars,
    { opacity: 0, y: options.y || 20, rotationX: options.rotation || -90 },
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: options.duration || 0.5,
      stagger: options.stagger || 0.02,
      ease: options.ease || 'back.out(1.7)',
      scrollTrigger: options.scrollTrigger ? {
        trigger: element,
        start: options.start || 'top 85%',
        toggleActions: options.toggleActions || 'play none none reverse'
      } : undefined
    }
  );
}

export function useGsapReveal(ref, options = {}) {
  const elementRef = ref;
  
  useEffect(() => {
    if (!elementRef.current || typeof window === 'undefined') return;
    
    const el = elementRef.current;
    
    gsap.fromTo(el,
      { opacity: 0, y: options.y || 50 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 0.8,
        ease: options.ease || 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: options.start || 'top 85%',
          toggleActions: options.toggleActions || 'play none none reverse'
        }
      }
    );
  }, []);
  
  return elementRef;
}

export function smoothScrollTrigger() {
  if (typeof window === 'undefined') return;
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: target, offsetY: 50 },
          ease: 'power3.inOut'
        });
      }
    });
  });
}

export { gsap, ScrollTrigger };
