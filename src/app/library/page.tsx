'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  Heart,
  Play,
  Search,
  BookOpen,
  Sparkles,
  SlidersHorizontal,
  Bookmark,
  Check,
} from 'lucide-react';
import { VOCABULARY_LIST, CATEGORIES } from '../../data/vocabulary';
import { Difficulty, CategoryId, VocabWord } from '../../types/vocab';
import { useGame } from '../../context/GameContext';
import { soundManager, speakEnglishWord } from '../../utils/audio';

function LibraryPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as CategoryId) || 'all';

  const { isBookmarked, toggleBookmark } = useGame();

  // 1. Difficulty Filter State
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');

  // 2. Category State
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>(initialCategory);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBookmarked, setOnlyBookmarked] = useState(searchParams.get('filter') === 'bookmarked');

  const difficulties: { id: Difficulty | 'all'; label: string; icon: string; color: string }[] = [
    { id: 'all', label: 'ทั้งหมด (All)', icon: '🌟', color: 'bg-amber-400 text-amber-950' },
    { id: 'beginner', label: 'ระดับเริ่มต้น (Beginner)', icon: '🟢', color: 'bg-emerald-400 text-emerald-950' },
    { id: 'intermediate', label: 'ระดับกลาง (Intermediate)', icon: '🟡', color: 'bg-yellow-400 text-yellow-950' },
    { id: 'advanced', label: 'ระดับสูง (Advanced)', icon: '🔴', color: 'bg-red-400 text-red-950' },
  ];

  // Filtered Word List
  const filteredWords = useMemo(() => {
    return VOCABULARY_LIST.filter((word) => {
      // Difficulty match
      if (difficulty !== 'all' && word.difficulty !== difficulty) return false;

      // Category match
      if (selectedCategory !== 'all' && word.category !== selectedCategory) return false;

      // Bookmarked filter
      if (onlyBookmarked && !isBookmarked(word.id)) return false;

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          word.word.toLowerCase().includes(q) ||
          word.meaning.toLowerCase().includes(q) ||
          word.example.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [difficulty, selectedCategory, onlyBookmarked, searchQuery, isBookmarked]);

  const handleDifficultyChange = (d: Difficulty | 'all') => {
    soundManager.playPop();
    setDifficulty(d);
  };

  const handleCategoryChange = (c: CategoryId | 'all') => {
    soundManager.playPop();
    setSelectedCategory(c);
  };

  const handlePronounce = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    soundManager.playPop();
    speakEnglishWord(word);
  };

  const handlePlayCategoryQuiz = () => {
    soundManager.playPop();
    let query = '';
    if (selectedCategory !== 'all') {
      query += `category=${selectedCategory}`;
    }
    if (difficulty !== 'all') {
      query += `${query ? '&' : ''}difficulty=${difficulty}`;
    }
    router.push(`/quiz${query ? `?${query}` : ''}`);
  };

  const currentCategoryName =
    selectedCategory === 'all'
      ? 'ทุกหมวดหมู่'
      : CATEGORIES.find((c) => c.id === selectedCategory)?.name || '';

  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full pb-28">
      {/* Page Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">📚</span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-cartoon text-amber-950">
              คลังคำศัพท์ภาษาอังกฤษ (Vocabulary Library)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-amber-900/80 font-semibold mt-1">
            สำรวจคำศัพท์ตามระดับความยาก ฟังสำเนียงเจ้าของภาษา และกดหัวใจบันทึกคำศัพท์ที่คุณชอบ
          </p>
        </div>

        {/* Search Input & Bookmarked Toggle */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-amber-800 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาคำศัพท์ / คำแปล..."
              className="w-full pl-9 pr-3 py-2 bg-white rounded-2xl border-2 border-amber-800 text-sm font-semibold text-amber-950 placeholder-amber-800/50 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-cartoon-sm"
            />
          </div>

          <button
            onClick={() => {
              soundManager.playPop();
              setOnlyBookmarked((prev) => !prev);
            }}
            className={`btn-chunky px-3 py-2 rounded-2xl border-2 font-cartoon text-xs font-bold flex items-center gap-1.5 shadow-cartoon-sm whitespace-nowrap ${
              onlyBookmarked
                ? 'bg-red-500 text-white border-amber-950 shadow-btn-red'
                : 'bg-white text-amber-900 border-amber-800 hover:bg-amber-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${onlyBookmarked ? 'fill-white' : 'text-red-500'}`} />
            <span>ที่บันทึกไว้</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. DIFFICULTY FILTER BARS (แถบตัวกรองระดับความยาก บนสุดของจอ) */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border-4 border-amber-900 shadow-cartoon mb-5">
        <div className="text-xs font-extrabold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>เลือกระดับความยาก (Difficulty Level)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {difficulties.map((diff) => {
            const isActive = difficulty === diff.id;
            return (
              <button
                key={diff.id}
                onClick={() => handleDifficultyChange(diff.id)}
                className={`btn-chunky py-2.5 px-3 rounded-2xl border-3 font-cartoon font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all relative cursor-pointer ${
                  isActive
                    ? `${diff.color} border-amber-950 shadow-cartoon -translate-y-0.5`
                    : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 shadow-cartoon-sm'
                }`}
              >
                <span>{diff.icon}</span>
                <span>{diff.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeDifficultyDot"
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-white"
                  >
                    <Check className="w-2.5 h-2.5 stroke-[4]" />
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. CATEGORY HORIZONTAL SCROLL (แถบแสดงหมวดหมู่เลื่อนซ้าย-ขวา)  */}
      {/* ============================================================ */}
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-extrabold text-amber-900 px-1">
          <span>เลือกหมวดหมู่คำศัพท์ (Category):</span>
          <span className="text-amber-800/70 font-semibold hidden sm:inline">👈 เลื่อนซ้าย-ขวาเพื่อเลือก 👉</span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin no-scrollbar">
          {/* "All" Category Pill */}
          <button
            onClick={() => handleCategoryChange('all')}
            className={`btn-chunky shrink-0 px-4 py-2.5 rounded-2xl border-3 font-cartoon font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-amber-400 text-amber-950 border-amber-950 shadow-cartoon -translate-y-0.5'
                : 'bg-white text-amber-900 border-amber-800 hover:bg-amber-50 shadow-cartoon-sm'
            }`}
          >
            <span className="text-lg">🌈</span>
            <span>ทุกหมวดหมู่</span>
            <span className="bg-amber-200/80 text-amber-950 px-2 py-0.5 rounded-full text-xs font-black">
              {VOCABULARY_LIST.length}
            </span>
          </button>

          {/* Category List */}
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = VOCABULARY_LIST.filter((w) => w.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`btn-chunky shrink-0 px-4 py-2.5 rounded-2xl border-3 font-cartoon font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-amber-950 border-amber-950 shadow-cartoon -translate-y-0.5'
                    : 'bg-white text-amber-900 border-amber-800 hover:bg-amber-50 shadow-cartoon-sm'
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span>{cat.name}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-black ${
                    isActive ? 'bg-white text-amber-950' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Words Count & Stats Indicator */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-amber-950 mb-3 px-1">
        <div>
          พบคำศัพท์ทั้งหมด{' '}
          <span className="text-red-600 font-cartoon font-black text-base">
            {filteredWords.length}
          </span>{' '}
          รายการ
        </div>
        {onlyBookmarked && (
          <span className="text-xs bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full border border-red-300">
            แสดงเฉพาะคำที่บันทึกหัวใจ ❤️
          </span>
        )}
      </div>

      {/* ============================================================ */}
      {/* 3. VOCABULARY CARD GRID (รายการการ์ดคำศัพท์บล็อกสี่เหลี่ยม)    */}
      {/* ============================================================ */}
      {filteredWords.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border-4 border-dashed border-amber-300 text-center flex flex-col items-center justify-center gap-3">
          <div className="text-5xl">🔍</div>
          <h3 className="text-xl font-cartoon font-bold text-amber-950">
            ไม่พบคำศัพท์ที่ตรงกับเงื่อนไข
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            ลองปรับเปลี่ยนระดับความยาก หรือล้างคำค้นหาเพื่อดูคำศัพท์อื่นๆ นะครับ
          </p>
          <button
            onClick={() => {
              setDifficulty('all');
              setSelectedCategory('all');
              setSearchQuery('');
              setOnlyBookmarked(false);
            }}
            className="btn-chunky mt-2 px-4 py-2 bg-amber-400 text-amber-950 font-cartoon font-bold text-xs rounded-xl border-2 border-amber-900 shadow-cartoon-sm"
          >
            รีเซ็ตตัวกรองทั้งหมด
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((item) => {
            const bookmarked = isBookmarked(item.id);
            const catInfo = CATEGORIES.find((c) => c.id === item.category);

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl p-4 sm:p-5 border-4 border-amber-900 shadow-cartoon flex flex-col justify-between group hover:-translate-y-1 transition-all relative overflow-hidden"
              >
                {/* Top Card Badges & Bookmark Button */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Part of Speech Badge */}
                    <span className="text-[11px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded-lg border border-amber-300">
                      {item.partOfSpeech}
                    </span>

                    {/* Category mini tag */}
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg border border-gray-200 flex items-center gap-1">
                      <span>{catInfo?.icon}</span>
                      <span>{catInfo?.name}</span>
                    </span>
                  </div>

                  {/* Bookmark Heart Button (ปุ่มรูปหัวใจสำหรับกดบันทึกคำศัพท์ที่ชอบ) */}
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => toggleBookmark(item.id)}
                    aria-label="บันทึกคำศัพท์"
                    className={`btn-chunky p-2 rounded-2xl border-2 transition-all cursor-pointer ${
                      bookmarked
                        ? 'bg-red-500 text-white border-red-800 shadow-btn-red'
                        : 'bg-white text-gray-400 border-amber-300 hover:text-red-500 shadow-cartoon-sm'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${bookmarked ? 'fill-white text-white' : ''}`}
                    />
                  </motion.button>
                </div>

                {/* Word & Audio Pronunciation Button */}
                <div className="my-3">
                  <div className="flex items-center gap-2">
                    {/* Bold Word (คำศัพท์ตัวหนา) */}
                    <h3 className="text-2xl font-black font-cartoon text-amber-950 group-hover:text-red-600 transition-colors">
                      {item.word}
                    </h3>

                    {/* Pronunciation Speaker Button */}
                    <button
                      onClick={(e) => handlePronounce(e, item.word)}
                      title="กดฟังเสียงอ่าน"
                      className="p-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4 text-amber-800" />
                    </button>
                  </div>

                  <div className="text-xs font-bold text-amber-800/70 mb-2">
                    {item.phonetic}
                  </div>

                  {/* Thai Meaning (คำแปลภาษาไทย) */}
                  <div className="text-base font-black font-cartoon text-emerald-800 bg-emerald-50 px-3 py-2 rounded-2xl border border-emerald-200">
                    {item.meaning}
                  </div>
                </div>

                {/* Example sentence */}
                <div className="pt-2.5 border-t border-amber-100 text-xs text-gray-600 italic">
                  &ldquo;{item.example}&rdquo;
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. PLAY CATEGORY BUTTON (ปุ่มทางลัดเข้าสู่เกม Floating Button) */}
      {/* ============================================================ */}
      <div className="fixed bottom-4 inset-x-0 flex justify-center z-40 px-4 pointer-events-none">
        <motion.button
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handlePlayCategoryQuiz}
          className="btn-chunky pointer-events-auto bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-cartoon text-base sm:text-lg font-black px-7 sm:px-10 py-4 rounded-3xl border-4 border-amber-950 shadow-btn-green flex items-center gap-3 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center">
            <Play className="w-5 h-5 fill-white" />
          </div>
          <span>เริ่มเล่นเกมในหมวดนี้! ({currentCategoryName})</span>
          <span className="text-xs bg-yellow-300 text-amber-950 font-black px-2 py-0.5 rounded-full border border-amber-800 hidden sm:inline">
            {filteredWords.length} ข้อ
          </span>
        </motion.button>
      </div>
    </div>
  );
}

export default function LibraryPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center p-8 text-amber-900 font-cartoon font-bold">
          กำลังเปิดคลังคำศัพท์ Burger Boy... 📖
        </div>
      }
    >
      <LibraryPageInner />
    </Suspense>
  );
}
