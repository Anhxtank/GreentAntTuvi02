import React, { useRef, useEffect, useState } from 'react';

interface ScrollPickerProps {
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (value: string | number) => void;
  label?: string;
}

export const ScrollPicker: React.FC<ScrollPickerProps> = ({ options, value, onChange, label }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [inputValue, setInputValue] = useState(value.toString());
  const itemHeight = 32; // height of each item in px

  const isProgrammaticScroll = useRef(false);

  useEffect(() => {
    if (containerRef.current) {
      const index = options.findIndex((opt) => opt.value.toString() === value.toString());
      if (index !== -1) {
        isProgrammaticScroll.current = true;
        containerRef.current.scrollTop = index * itemHeight;
        // Reset the flag after a short delay to allow the scroll event to fire
        setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 50);
      }
    }
    setInputValue(value.toString());
  }, [value]); // Removed options from dependency array to prevent infinite loops

  const handleScroll = () => {
    if (!containerRef.current || isDragging || isProgrammaticScroll.current) return;
    const index = Math.round(containerRef.current.scrollTop / itemHeight);
    if (index >= 0 && index < options.length) {
      const newValue = options[index].value;
      if (newValue.toString() !== value.toString()) {
        onChange(newValue);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.pageY - (containerRef.current?.offsetTop || 0));
    setScrollTop(containerRef.current?.scrollTop || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      const index = Math.round(containerRef.current.scrollTop / itemHeight);
      containerRef.current.scrollTo({
        top: index * itemHeight,
        behavior: 'smooth'
      });
      if (index >= 0 && index < options.length) {
        onChange(options[index].value);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const y = e.pageY - containerRef.current.offsetTop;
    const walk = (y - startY) * 1.5;
    containerRef.current.scrollTop = scrollTop - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].pageY - (containerRef.current?.offsetTop || 0));
    setScrollTop(containerRef.current?.scrollTop || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const y = e.touches[0].pageY - containerRef.current.offsetTop;
    const walk = (y - startY) * 1.5;
    containerRef.current.scrollTop = scrollTop - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (containerRef.current) {
      const index = Math.round(containerRef.current.scrollTop / itemHeight);
      containerRef.current.scrollTo({
        top: index * itemHeight,
        behavior: 'smooth'
      });
      if (index >= 0 && index < options.length) {
        onChange(options[index].value);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    let val = parseInt(inputValue, 10);
    if (isNaN(val)) {
      setInputValue(value.toString());
      return;
    }
    
    // Find closest valid option
    let closestOption = options[0];
    let minDiff = Infinity;
    
    for (const opt of options) {
      const optVal = parseInt(opt.value.toString(), 10);
      if (!isNaN(optVal)) {
        const diff = Math.abs(optVal - val);
        if (diff < minDiff) {
          minDiff = diff;
          closestOption = opt;
        }
      }
    }
    
    onChange(closestOption.value);
    setInputValue(closestOption.value.toString());
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between w-full items-center mb-1 px-1">
        {label && <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-gray-400">{label}</span>}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          className="w-12 text-right text-[11px] font-mono font-bold text-black bg-transparent border-b border-gray-300 focus:outline-none focus:border-black transition-colors"
        />
      </div>
      <div className="relative w-full h-[96px] bg-gray-50 border border-gray-200 rounded overflow-hidden">
        {/* Selection Highlight */}
        <div className="absolute top-1/2 left-0 w-full h-[32px] -translate-y-1/2 bg-black/5 pointer-events-none border-y border-black/10" />
        
        {/* Scrollable Area */}
        <div
          ref={containerRef}
          className="h-full w-full overflow-y-auto snap-y snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing"
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Padding to allow first and last items to be centered */}
          <div style={{ height: '32px' }} />
          {options.map((opt) => {
            const isSelected = opt.value.toString() === value.toString();
            return (
            <div
              key={opt.value}
              className={`h-[32px] flex items-center justify-center snap-center text-sm font-mono font-medium select-none transition-opacity duration-200 ${isSelected ? 'text-black opacity-100' : 'text-gray-400 opacity-40'}`}
              onClick={() => {
                onChange(opt.value);
                if (containerRef.current) {
                  const index = options.findIndex(o => o.value === opt.value);
                  containerRef.current.scrollTo({
                    top: index * itemHeight,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {opt.label}
            </div>
          )})}
          <div style={{ height: '32px' }} />
        </div>
      </div>
    </div>
  );
};
