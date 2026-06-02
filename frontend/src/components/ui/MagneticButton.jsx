import { useRef } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className = '', onClick, ...props }) {
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);

        gsap.to(buttonRef.current, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
        gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1.1, 0.4)',
    });
  };

  return (
    <button
      ref={buttonRef}
      className={`magnetic-button ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      <span className="magnetic-button-content">{children}</span>
    </button>
  );
}
