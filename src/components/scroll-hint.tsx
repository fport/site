'use client';

import { useEffect, useState } from 'react';

/**
 * A glass strip pinned to the bottom of the viewport telling the reader there
 * is more page below. It takes itself away once the page is scrolled to the
 * end — or straight away on a page short enough not to scroll at all.
 */
export function ScrollHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const remaining =
        document.documentElement.scrollHeight -
        window.scrollY -
        window.innerHeight;
      setVisible(remaining > 48);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    // Fonts and images land after mount and change the page height with them.
    const observer = new ResizeObserver(update);
    observer.observe(document.body);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="scroll-hint" data-hidden={!visible} aria-hidden={!visible}>
      <button
        type="button"
        className="scroll-hint__cue"
        tabIndex={visible ? 0 : -1}
        onClick={() =>
          window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })
        }
      >
        more
        <span className="scroll-hint__arrow" aria-hidden="true">
          ↓
        </span>
      </button>
    </div>
  );
}
