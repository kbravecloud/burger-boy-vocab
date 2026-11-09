'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Sparkles, Flame, BookCheck, Trophy, ArrowRight, BookOpen } from 'lucide-react';
import { ForestBackground } from '../components/common/ForestBackground';
import { BurgerBoyCharacter } from '../components/common/BurgerBoyCharacter';
import { CATEGORIES, VOCABULARY_LIST } from '../data/vocabulary';
import { useGame } from '../context/GameContext';
import { soundManager } from '../utils/audio';

export default function DashboardPage() {
  const { stats } = useGame();

  const handleButtonClick = () => {
    soundManager.playPop();
  };

  return (
    <div className="flex-1 flex flex-col pb-16">
      {/* 2D CARTOON FOREST BACKDROP (WITH WALKING BURGER BOY MASCOT) */}
      <ForestBackground />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full -mt-6 sm:-mt-8 z-20 flex flex-col gap-8">
        {/* 1) USER WELCOME HEADER & CARTOON AVATAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-amber-900 shadow-cartoon flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          {/* Decorative Background Glow */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-200/50 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-4 sm:gap-6 z-10 w-full md:w-auto">
            {/* Cartoon Avatar with Level Badge */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-amber-100 border-3 border-amber-900 flex items-center justify-center p-1 shadow-cartoon-sm overflow-hidden">
                <BurgerBoyCharacter mood="idle" size="sm" className="scale-125" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-red-500 text-white font-cartoon text-xs font-bold px-2.5 py-0.5 rounded-full border-2 border-amber-950 shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-yellow-300" />
                <span>Lv. 5</span>
              </div>
            </div>

            {/* Greeting Text */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-lg border border-amber-300 w-fit">
                  ยินดีต้อนรับกลับมา
                </span>
                <span className="text-xs text-emerald-600 font-bold hidden sm:inline">● กำลังออนไลน์</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-950 font-cartoon mt-1">
                สวัสดี, Burger Master! 👋
              </h1>
              <p className="text-xs sm:text-sm text-amber-900/80 font-medium mt-0.5">
                ฝึกฝนวันละนิด พิชิตคลังคำศัพท์ภาษาอังกฤษแบบเซียนเบอร์เกอร์!
              </p>
            </div>
          </div>

          {/* Mini XP / Level progress on header */}
          <div className="w-full md:w-64 bg-amber-50 rounded-2xl p-3 border-2 border-amber-300 flex flex-col gap-1.5 shrink-0 z-10">
            <div className="flex items-center justify-between text-xs font-bold text-amber-950">
              <span className="flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                คะแนนรวม (XP)
              </span>
              <span className="text-red-600 font-cartoon text-sm">{stats.totalPoints.toLocaleString()} XP</span>
            </div>
            {/* XP Progress Bar */}
            <div className="w-full h-3 bg-amber-200 rounded-full overflow-hidden border border-amber-400">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '68%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
              />
            </div>
            <div className="text-[11px] text-amber-800/70 text-right font-semibold">
              อีก 350 XP เพื่อเลื่อนสู่ Level 6
            </div>
          </div>
        </motion.div>

        {/* 2) CLEAR GAMIFIED STATS DISPLAY (DAILY STREAK & LEARNED WORDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Stat 1: Daily Streak (เด่นชัดตามที่โจทย์ระบุ) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-amber-500 to-red-500 rounded-3xl p-5 border-4 border-amber-950 shadow-cartoon text-white flex items-center justify-between relative overflow-hidden"
          >
            <div className="flex flex-col z-10">
              <div className="flex items-center gap-1.5 text-yellow-200 font-extrabold text-xs tracking-wider uppercase">
                <span>ความต่อเนื่องในการเรียน</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black font-cartoon tracking-tight mt-1">
                {stats.streak} วันติดกัน!
              </div>
              <div className="text-xs text-white/90 font-medium mt-1">
                สุดยอดมาก! เข้ามาเรียนต่อเนื่องไม่ขาดสาย
              </div>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [-6, 6, -6] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-4xl shadow-inner shrink-0"
            >
              🔥
            </motion.div>
          </motion.div>

          {/* Stat 2: Total Learned Words (คำศัพท์ที่เรียนรู้สะสม ตามที่โจทย์ระบุ) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-5 border-4 border-amber-950 shadow-cartoon text-white flex items-center justify-between relative overflow-hidden"
          >
            <div className="flex flex-col z-10">
              <div className="flex items-center gap-1.5 text-emerald-200 font-extrabold text-xs tracking-wider uppercase">
                <span>คำศัพท์ที่เรียนรู้สะสม</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black font-cartoon tracking-tight mt-1">
                {stats.totalWordsLearned} คำ
              </div>
              <div className="text-xs text-white/90 font-medium mt-1">
                จากคลังคำศัพท์ทั้งหมด {VOCABULARY_LIST.length} รายการ
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-4xl shadow-inner shrink-0">
              📚
            </div>
          </motion.div>

          {/* Stat 3: Bookmarks / Favorites */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-5 border-4 border-amber-950 shadow-cartoon text-white flex items-center justify-between relative overflow-hidden sm:col-span-2 lg:col-span-1"
          >
            <div className="flex flex-col z-10">
              <div className="flex items-center gap-1.5 text-pink-200 font-extrabold text-xs tracking-wider uppercase">
                <span>คำศัพท์ที่กดบันทึกไว้</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black font-cartoon tracking-tight mt-1">
                {stats.bookmarkedWordIds.length} คำ
              </div>
              <Link
                href="/library?filter=bookmarked"
                onClick={handleButtonClick}
                className="text-xs text-yellow-200 underline font-bold mt-1 hover:text-white flex items-center gap-1"
              >
                ดูคำศัพท์ที่ชอบทั้งหมด <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-4xl shadow-inner shrink-0">
              💖
            </div>
          </motion.div>
        </div>

        {/* 3) PROMINENT QUICK PLAY BUTTON (เริ่มเล่นเกมด่วน) */}
        <motion.div
          initial={{ scale: 0.96 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 sm:p-8 border-4 border-amber-950 shadow-cartoon-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          {/* Subtle Sparkle Background Shapes */}
          <div className="absolute top-2 right-12 text-3xl opacity-40 select-none">✨</div>
          <div className="absolute bottom-2 left-16 text-3xl opacity-40 select-none">⭐</div>

          <div className="flex flex-col text-center md:text-left z-10">
            <div className="inline-flex items-center justify-center md:justify-start gap-1.5 text-xs font-black uppercase text-amber-950 bg-yellow-200 px-3 py-1 rounded-full border-2 border-amber-900 w-fit mx-auto md:mx-0">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>โหมดสุ่มควิซความไวสูง (Speed Mode)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-cartoon text-amber-950 mt-2">
              พร้อมพิชิตภารกิจคำศัพท์วันนี้หรือยัง? 🚀
            </h2>
            <p className="text-sm sm:text-base text-amber-900 font-semibold mt-1 max-w-xl">
              ทดสอบความจำกับเกมแฟลชการ์ดสไตล์มือถือ ตอบถูกสะสมคะแนน ป้องกันหัวใจไม่ให้แตกสลาย!
            </p>
          </div>

          {/* The Big Chunky Quick Play Button */}
          <Link
            href="/quiz"
            onClick={handleButtonClick}
            className="btn-chunky group z-10 inline-flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white font-cartoon text-xl sm:text-2xl font-black px-8 sm:px-12 py-5 rounded-2xl border-4 border-amber-950 shadow-btn-red whitespace-nowrap active:translate-y-1 transition-all"
          >
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"
            >
              <Play className="w-6 h-6 fill-white" />
            </motion.div>
            <span>เริ่มเล่นเกมด่วน (Quick Play)</span>
          </Link>
        </motion.div>

        {/* 4) VOCABULARY CATEGORY GRID (หมวดหมู่คำศัพท์สี่เหลี่ยม) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📦</span>
              <div>
                <h3 className="text-xl sm:text-2xl font-black font-cartoon text-amber-950">
                  หมวดหมู่คำศัพท์ยอดนิยม
                </h3>
                <p className="text-xs sm:text-sm text-amber-800 font-semibold">
                  เลือกหมวดที่สนใจเพื่อเข้าเล่นควิซเฉพาะทาง หรือเข้าไปท่องศัพท์ในคลัง
                </p>
              </div>
            </div>

            <Link
              href="/library"
              onClick={handleButtonClick}
              className="btn-chunky hidden sm:flex items-center gap-1.5 bg-white text-amber-900 font-cartoon font-bold px-4 py-2 rounded-xl border-2 border-amber-900 shadow-cartoon-sm hover:bg-amber-50 text-sm"
            >
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>เปิดดูคลังคำศัพท์ทั้งหมด</span>
            </Link>
          </div>

          {/* Grid Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((cat) => {
              const catWords = VOCABULARY_LIST.filter((w) => w.category === cat.id);
              const totalCount = catWords.length;

              return (
                <motion.div
                  key={cat.id}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-3xl p-5 border-4 border-amber-900 shadow-cartoon flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Decorative corner tag */}
                  <div className="flex items-start justify-between">
                    {/* Category Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 border-3 border-amber-900 flex items-center justify-center text-3xl shadow-cartoon-sm group-hover:rotate-6 transition-transform">
                      {cat.icon}
                    </div>

                    <span className={`text-xs font-black font-cartoon px-3 py-1 rounded-full border ${cat.badgeBg}`}>
                      {totalCount} คำศัพท์
                    </span>
                  </div>

                  <div className="my-4">
                    <h4 className="text-lg sm:text-xl font-black font-cartoon text-amber-950 group-hover:text-red-600 transition-colors">
                      {cat.name}
                    </h4>
                    <div className="text-xs font-bold text-amber-800/70 mb-1">
                      {cat.nameEn}
                    </div>
                    <p className="text-xs text-gray-600 font-medium line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  {/* Actions for this category */}
                  <div className="pt-3 border-t-2 border-amber-100 flex items-center justify-between gap-2">
                    <Link
                      href={`/library?category=${cat.id}`}
                      onClick={handleButtonClick}
                      className="text-xs font-bold text-amber-800 hover:text-amber-950 hover:underline flex items-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> ท่องคำศัพท์
                    </Link>

                    <Link
                      href={`/quiz?category=${cat.id}`}
                      onClick={handleButtonClick}
                      className="btn-chunky inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-cartoon text-xs font-bold px-3.5 py-1.5 rounded-xl border-2 border-amber-950 shadow-btn-green active:translate-y-0.5"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>เล่นควิซหมวดนี้</span>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
