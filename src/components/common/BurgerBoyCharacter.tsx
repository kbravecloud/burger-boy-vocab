'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BurgerBoyCharacterProps {
  mood?: 'idle' | 'happy' | 'sad' | 'walking';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const BurgerBoyCharacter: React.FC<BurgerBoyCharacterProps> = ({
  mood = 'idle',
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-44 h-44',
    xl: 'w-60 h-60',
  };

  const getAnimation = () => {
    switch (mood) {
      case 'happy':
        return {
          y: [0, -16, 0, -12, 0],
          rotate: [0, -4, 4, -2, 0],
          scale: [1, 1.08, 1, 1.05, 1],
          transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'sad':
        return {
          y: [0, 4, 0],
          rotate: [0, -2, 2, 0],
          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'walking':
        return {
          y: [0, -8, 0],
          rotate: [-3, 3, -3],
          transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'idle':
      default:
        return {
          y: [0, -5, 0],
          transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
        };
    }
  };

  return (
    <motion.div
      animate={getAnimation()}
      className={`relative inline-block select-none ${sizeMap[size]} ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Soft shadow under character */}
        <ellipse cx="100" cy="188" rx="55" ry="10" fill="#000000" fillOpacity="0.15" />

        {/* Legs & Shoes */}
        <motion.g
          animate={
            mood === 'walking'
              ? { y: [0, -3, 0], x: [-2, 2, -2], transition: { duration: 0.4, repeat: Infinity } }
              : {}
          }
        >
          {/* Left Leg */}
          <rect x="74" y="152" width="14" height="24" rx="7" fill="#78350F" stroke="#451A03" strokeWidth="4" />
          <ellipse cx="78" cy="178" rx="16" ry="9" fill="#EF4444" stroke="#7F1D1D" strokeWidth="4" />
          <ellipse cx="80" cy="176" rx="6" ry="3" fill="#F87171" />

          {/* Right Leg */}
          <rect x="112" y="152" width="14" height="24" rx="7" fill="#78350F" stroke="#451A03" strokeWidth="4" />
          <ellipse cx="122" cy="178" rx="16" ry="9" fill="#EF4444" stroke="#7F1D1D" strokeWidth="4" />
          <ellipse cx="124" cy="176" rx="6" ry="3" fill="#F87171" />
        </motion.g>

        {/* --- BURGER BODY LAYERS --- */}
        {/* Bottom Bun */}
        <path
          d="M48 142 C48 135 152 135 152 142 C152 155 138 162 100 162 C62 162 48 155 48 142 Z"
          fill="#F59E0B"
          stroke="#78350F"
          strokeWidth="5"
        />

        {/* Juicy Patty */}
        <rect
          x="44"
          y="126"
          width="112"
          height="18"
          rx="9"
          fill="#78350F"
          stroke="#451A03"
          strokeWidth="4"
        />

        {/* Melted Cheese with delicious dripping corners */}
        <path
          d="M44 122 L156 122 L148 134 L126 128 L104 136 L84 126 L60 134 Z"
          fill="#FBBF24"
          stroke="#D97706"
          strokeWidth="3"
        />

        {/* Crisp Wavy Lettuce */}
        <path
          d="M40 114 Q46 106 54 114 Q62 122 70 114 Q78 106 86 114 Q94 122 102 114 Q110 106 118 114 Q126 122 134 114 Q142 106 150 114 Q158 122 162 114 C162 124 38 124 40 114 Z"
          fill="#10B981"
          stroke="#065F46"
          strokeWidth="4"
        />

        {/* Top Bun (Character Face) */}
        <path
          d="M42 112 C40 65 65 42 100 42 C135 42 160 65 158 112 C158 116 42 116 42 112 Z"
          fill="#FBBF24"
          stroke="#78350F"
          strokeWidth="5"
        />

        {/* Sesame Seeds on top bun */}
        <ellipse cx="72" cy="58" rx="4" ry="2" transform="rotate(-15 72 58)" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
        <ellipse cx="100" cy="52" rx="4" ry="2" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
        <ellipse cx="128" cy="58" rx="4" ry="2" transform="rotate(20 128 58)" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
        <ellipse cx="84" cy="68" rx="4" ry="2" transform="rotate(5 84 68)" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
        <ellipse cx="116" cy="68" rx="4" ry="2" transform="rotate(-10 116 68)" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />

        {/* Rosy Cheeks */}
        <circle cx="68" cy="98" r="8" fill="#F87171" fillOpacity="0.55" />
        <circle cx="132" cy="98" r="8" fill="#F87171" fillOpacity="0.55" />

        {/* Eyes based on mood */}
        {mood === 'happy' ? (
          <>
            {/* Happy Curved Eyes ^ _ ^ */}
            <path d="M72 88 Q80 78 88 88" stroke="#1F2937" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M112 88 Q120 78 128 88" stroke="#1F2937" strokeWidth="5" strokeLinecap="round" fill="none" />
          </>
        ) : mood === 'sad' ? (
          <>
            {/* Droopy Eyes */}
            <ellipse cx="80" cy="88" rx="7" ry="8" fill="#1F2937" />
            <ellipse cx="120" cy="88" rx="7" ry="8" fill="#1F2937" />
            {/* Teardrop */}
            <path d="M68 94 C68 91 73 97 73 99 C73 102 68 102 68 99 Z" fill="#60A5FA" />
          </>
        ) : (
          <>
            {/* Big Shiny Eyes */}
            <g>
              <ellipse cx="80" cy="86" rx="8" ry="9" fill="#1F2937" />
              <circle cx="83" cy="83" r="3.5" fill="#FFFFFF" />
              <circle cx="77" cy="88" r="1.5" fill="#FFFFFF" />
            </g>
            <g>
              <ellipse cx="120" cy="86" rx="8" ry="9" fill="#1F2937" />
              <circle cx="123" cy="83" r="3.5" fill="#FFFFFF" />
              <circle cx="117" cy="88" r="1.5" fill="#FFFFFF" />
            </g>
          </>
        )}

        {/* Mouth */}
        {mood === 'happy' ? (
          <path
            d="M86 98 Q100 116 114 98"
            stroke="#1F2937"
            strokeWidth="4"
            fill="#EF4444"
            strokeLinecap="round"
          />
        ) : mood === 'sad' ? (
          <path
            d="M88 105 Q100 95 112 105"
            stroke="#1F2937"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <path
            d="M90 98 Q100 108 110 98"
            stroke="#1F2937"
            strokeWidth="4"
            strokeLinecap="round"
            fill="#EF4444"
          />
        )}

        {/* Chef's Hat on top! */}
        <g transform="translate(72, 8)">
          <path
            d="M10 36 C4 24 18 10 28 14 C34 4 48 4 52 14 C62 10 74 22 70 36 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="3.5"
          />
          <rect
            x="12"
            y="32"
            width="56"
            height="12"
            rx="4"
            fill="#FFFFFF"
            stroke="#94A3B8"
            strokeWidth="3"
          />
          <rect x="18" y="36" width="44" height="4" fill="#EF4444" rx="2" />
        </g>

        {/* Arms / Hands */}
        {mood === 'happy' ? (
          <>
            {/* Hands raised celebrating */}
            <path d="M42 120 Q24 95 28 85" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="28" cy="84" r="6" fill="#FBBF24" stroke="#78350F" strokeWidth="2" />
            <path d="M158 120 Q176 95 172 85" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="172" cy="84" r="6" fill="#FBBF24" stroke="#78350F" strokeWidth="2" />
          </>
        ) : (
          <>
            {/* Cute resting / gesturing hands */}
            <circle cx="38" cy="126" r="7" fill="#FBBF24" stroke="#78350F" strokeWidth="3" />
            <circle cx="162" cy="126" r="7" fill="#FBBF24" stroke="#78350F" strokeWidth="3" />
          </>
        )}
      </svg>
    </motion.div>
  );
};
