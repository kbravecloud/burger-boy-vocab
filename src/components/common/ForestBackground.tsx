'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BurgerBoyCharacter } from './BurgerBoyCharacter';

export const ForestBackground: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-sky-200 via-emerald-100 to-amber-50 pt-8 pb-4 border-b-4 border-amber-800/40 select-none shadow-inner">
      {/* Sun & Rays */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-10 left-12 w-28 h-28 rounded-full bg-yellow-300/80 blur-xs flex items-center justify-center opacity-70 pointer-events-none"
      >
        <div className="w-20 h-20 rounded-full bg-amber-300" />
      </motion.div>

      {/* Floating Cartoon Clouds */}
      <motion.div
        animate={{ x: [-80, 700] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="absolute top-4 left-0 opacity-80 pointer-events-none"
      >
        <svg width="120" height="45" viewBox="0 0 120 45" fill="none">
          <ellipse cx="40" cy="30" rx="30" ry="15" fill="#FFFFFF" />
          <ellipse cx="65" cy="22" rx="22" ry="16" fill="#FFFFFF" />
          <ellipse cx="90" cy="30" rx="25" ry="14" fill="#FFFFFF" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ x: [800, -100] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="absolute top-10 right-0 opacity-70 pointer-events-none"
      >
        <svg width="100" height="40" viewBox="0 0 100 40" fill="none">
          <ellipse cx="35" cy="26" rx="24" ry="13" fill="#FFFFFF" />
          <ellipse cx="55" cy="20" rx="18" ry="13" fill="#FFFFFF" />
          <ellipse cx="75" cy="26" rx="20" ry="12" fill="#FFFFFF" />
        </svg>
      </motion.div>

      {/* Background Forest Layer (Distant Pine & Round Trees) */}
      <div className="relative flex justify-between items-end px-4 sm:px-12 h-36 sm:h-44 z-0">
        {/* Tree 1: Round Oak */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-400 rounded-full border-4 border-emerald-600 shadow-md relative -mb-3">
            <div className="absolute top-2 left-2 w-4 h-4 bg-emerald-200 rounded-full opacity-60" />
          </div>
          <div className="w-4 h-12 bg-amber-800 rounded-b-md border-2 border-amber-950" />
        </div>

        {/* Tree 2: Big Layered Pine */}
        <div className="flex flex-col items-center -ml-4 hidden sm:flex">
          <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[35px] border-b-teal-500 drop-shadow-sm" />
          <div className="w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-b-[40px] border-b-teal-600 -mt-4 drop-shadow-sm" />
          <div className="w-0 h-0 border-l-[38px] border-l-transparent border-r-[38px] border-r-transparent border-b-[45px] border-b-teal-700 -mt-4 drop-shadow-sm" />
          <div className="w-5 h-8 bg-amber-900 border-2 border-amber-950 rounded-b" />
        </div>

        {/* Tree 3: Fluffy Forest Cluster */}
        <div className="flex flex-col items-center opacity-90 hidden md:flex">
          <div className="relative -mb-3">
            <div className="w-14 h-14 bg-green-500 rounded-full border-3 border-green-700 inline-block -mr-4" />
            <div className="w-18 h-18 bg-green-600 rounded-full border-3 border-green-800 inline-block relative z-10" />
            <div className="w-14 h-14 bg-green-500 rounded-full border-3 border-green-700 inline-block -ml-4" />
          </div>
          <div className="w-6 h-12 bg-amber-800 border-2 border-amber-950" />
        </div>

        {/* Center: Walking Mascot Stage */}
        <div className="flex flex-col items-center z-10 px-2 sm:px-6">
          {/* Animated Mascot Walking with Speech Bubble */}
          <div className="relative flex flex-col items-center">
            {/* Cheerful Dialogue Bubble */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="bg-white px-4 py-2 rounded-2xl border-3 border-amber-900 shadow-cartoon-sm text-xs sm:text-sm font-bold text-amber-950 mb-2 flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>🍔 สวัสดีครับ! พร้อมอัปเลเวลคำศัพท์กันนะ! 🌟</span>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-amber-900" />
            </motion.div>

            {/* Walking Mascot */}
            <BurgerBoyCharacter mood="walking" size="md" />
          </div>
        </div>

        {/* Tree 4: Apple / Berry Tree */}
        <div className="flex flex-col items-center -mr-2">
          <div className="w-16 h-16 sm:w-22 sm:h-22 bg-emerald-500 rounded-full border-4 border-emerald-700 shadow-md relative -mb-3">
            {/* Red berries/apples */}
            <div className="w-3 h-3 bg-red-500 rounded-full absolute top-3 left-4 border border-red-700" />
            <div className="w-3 h-3 bg-red-500 rounded-full absolute top-7 right-3 border border-red-700" />
            <div className="w-3 h-3 bg-red-500 rounded-full absolute bottom-4 left-6 border border-red-700" />
          </div>
          <div className="w-4 h-10 bg-amber-800 rounded-b border-2 border-amber-950" />
        </div>

        {/* Tree 5: Lush Deciduous Tree */}
        <div className="flex flex-col items-center hidden sm:flex">
          <div className="w-16 h-20 bg-lime-500 rounded-t-full border-4 border-lime-700 shadow-md relative -mb-3">
            <div className="w-3 h-3 bg-lime-300 rounded-full absolute top-4 left-3" />
          </div>
          <div className="w-4 h-10 bg-amber-900 rounded-b border-2 border-amber-950" />
        </div>
      </div>

      {/* Grassy Rolling Ground with Soil Layer & Flowers */}
      <div className="relative w-full z-10">
        {/* Top Grass Strip */}
        <div className="w-full h-8 bg-lime-500 border-t-4 border-lime-600 flex items-center justify-around px-8 relative overflow-hidden">
          {/* Cartoon Grass Tufts & Flowers */}
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center gap-1 opacity-80">
              <span className="text-xs">{i % 3 === 0 ? '🌼' : i % 3 === 1 ? '🍄' : '🌱'}</span>
            </div>
          ))}
        </div>

        {/* Earth / Ground Layer */}
        <div className="w-full h-7 bg-amber-700 border-t-2 border-amber-800 flex items-center justify-around px-4">
          <div className="w-12 h-2 bg-amber-800/60 rounded-full" />
          <div className="w-20 h-2 bg-amber-800/60 rounded-full" />
          <div className="w-14 h-2 bg-amber-800/60 rounded-full" />
          <div className="w-24 h-2 bg-amber-800/60 rounded-full" />
        </div>
      </div>
    </div>
  );
};
