import { useEffect, useRef, useState } from "react";

function ScrollReveal({ children, className = "" }) {
  const ref = useRef(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {

        if (entry.isIntersecting) {

          setVisible(true);

          observer.unobserve(element);

        }

      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };

  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${
        visible ? "is-visible" : ""
      }`}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;