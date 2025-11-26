import React, { useEffect, useState } from 'react';

const Snowfall: React.FC = () => {
  const [items, setItems] = useState<{id: number, content: string}[]>([]);

  useEffect(() => {
    // Generate static count of flakes to avoid re-renders constantly
    const count = 50;
    const newItems = Array.from({ length: count }, (_, i) => {
      // 4% chance of being something weird
      const isWeird = Math.random() > 0.96; 
      const content = isWeird 
        ? ['🍕', '💾', '👽', '🦖', '👾'][Math.floor(Math.random() * 5)] 
        : '❄';
      return { id: i, content };
    });
    setItems(newItems);
  }, []);

  return (
    <div className="snow-container" aria-hidden="true">
      {items.map((item) => {
        const left = Math.random() * 100;
        const animationDuration = 5 + Math.random() * 10;
        const delay = Math.random() * 5;
        const size = item.content === '❄' ? (0.5 + Math.random() * 1) : 1.2; // Weird items slightly bigger

        return (
          <div
            key={item.id}
            className="snowflake"
            style={{
              left: `${left}%`,
              animationDuration: `${animationDuration}s`,
              animationDelay: `-${delay}s`,
              fontSize: `${size}em`,
              filter: item.content !== '❄' ? 'drop-shadow(0 0 2px rgba(255,255,255,0.5))' : 'none'
            }}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
};

export default Snowfall;