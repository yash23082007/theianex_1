import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e) => {
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.35 });
    };

    const onHover = () => {
      gsap.to(ring.current, { scale: 2.2, borderColor: 'var(--accent)', backgroundColor: 'rgba(255, 77, 0, 0.08)', duration: 0.3 });
      gsap.to(dot.current, { scale: 0.5, duration: 0.2 });
    };

    const onLeave = () => {
      gsap.to(ring.current, { scale: 1, borderColor: 'var(--accent)', backgroundColor: 'transparent', duration: 0.3 });
      gsap.to(dot.current, { scale: 1, duration: 0.2 });
    };

    document.addEventListener('mousemove', moveCursor);

        const updateHoverListeners = () => {
      document.querySelectorAll('a, button, select, input, textarea, .clickable, [role="button"]').forEach((el) => {
        el.removeEventListener('mouseenter', onHover);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onHover);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    updateHoverListeners();

        const observer = new MutationObserver(updateHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
