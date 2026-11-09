'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, BookOpen, Gamepad2, Home } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../utils/audio';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { stats, toggleSound } = useGame();

  const handleNavClick = () => {
    soundManager.playPop();
  };

  const navLinks = [
    { href: '/', label: 'หน้าแรก', icon: Home },
    { href: '/quiz', label: 'เล่นควิซ', icon: Gamepad2 },
    { href: '/library', label: 'คลังคำศัพท์', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-amber-400/95 backdrop-blur-md border-b-4 border-amber-600 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 py-2 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={handleNavClick}
          className="flex items-center gap-2.5 group"
        >
          <motion.div
            whileHover={{ rotate: [-4, 4, -4], scale: 1.1 }}
            className="w-11 h-11 bg-white rounded-2xl border-3 border-amber-800 flex items-center justify-center text-2xl shadow-cartoon-sm"
          >
            🍔
          </motion.div>
          <div className="flex flex-col">
            <span className="font-cartoon text-xl sm:text-2xl font-bold text-amber-950 tracking-tight leading-none group-hover:text-red-600 transition-colors">
              Burger Boy
            </span>
            <span className="text-[10px] sm:text-xs font-extrabold text-amber-900 tracking-wider uppercase">
              Vocab Adventure ✨
            </span>
          </div>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`relative px-4 py-2 rounded-xl font-cartoon font-bold text-sm sm:text-base flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-amber-100 text-amber-950 border-2 border-amber-800 shadow-cartoon-sm -translate-y-0.5'
                    : 'text-amber-950 hover:bg-amber-300/80 hover:text-amber-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-red-500' : 'text-amber-800'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Gamified Header Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak Indicator */}
          <div
            title={`เข้าเรียนต่อเนื่อง ${stats.streak} วันแล้ว!`}
            className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-cartoon font-bold px-3 py-1.5 rounded-2xl border-2 border-amber-950 shadow-cartoon-sm text-xs sm:text-sm"
          >
            <motion.span
              animate={{ scale: [1, 1.25, 1], rotate: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="text-base sm:text-lg"
            >
              🔥
            </motion.span>
            <span>{stats.streak} วัน</span>
          </div>

          {/* Sound Effect Toggle */}
          <button
            onClick={toggleSound}
            aria-label="เปิด/ปิดเสียงเอฟเฟกต์"
            className="btn-chunky p-2 rounded-xl bg-white border-2 border-amber-800 shadow-cartoon-sm text-amber-900 hover:bg-amber-50"
          >
            {stats.soundEnabled ? (
              <Volume2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around bg-amber-300/80 border-t-2 border-amber-500 py-1.5 px-2">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold font-cartoon ${
                isActive
                  ? 'bg-amber-100 text-amber-950 border border-amber-800'
                  : 'text-amber-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
};
