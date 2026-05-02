import React, { useEffect, useState } from "react";

export default function CustomScrollbar() {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const currentScrollY = window.scrollY;

      const scrollableHeight = documentHeight - windowHeight;
      
      if (scrollableHeight > 0) {
        const scrolled = (currentScrollY / scrollableHeight) * 100;
        setScrollTop(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { width: 0px; display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Track - Purely based on your styles */}
      <div className="fixed right-1.5 top-2 bottom-2 w-2 z-[999] bg-black/5 dark:bg-white/0 backdrop-blur-sm rounded-full">
        
        {/* Thumb - Using your exact gradient and logic */}
        <div 
          className="absolute w-full rounded-full bg-gradient-to-b from-primary-value to-secondary-value bg-primary-500"
          style={{ 
            height: '80px', 
            transform: `translateY(${scrollTop * ( (window.innerHeight - 100) / 100 )}px)`,
            transition: 'none',
          }}
        />
      </div>
    </>
  );
}