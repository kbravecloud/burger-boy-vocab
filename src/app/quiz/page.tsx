'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Heart,
  Trophy,
  RotateCcw,
  Home,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  HelpCircle,
  ShieldAlert,
} from 'lucide-react';
import { VOCABULARY_LIST, CATEGORIES } from '../../data/vocabulary';
import { VocabWord } from '../../types/vocab';
import { BurgerBoyCharacter } from '../../components/common/BurgerBoyCharacter';
import { useGame } from '../../context/GameContext';
import { soundManager, speakEnglishWord } from '../../utils/audio';

function QuizGameInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const difficultyParam = searchParams.get('difficulty');

  const { addPoints, incrementLearnedWords } = useGame();

  // Filter word list based on category & difficulty
  const [questions, setQuestions] = useState<VocabWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [modalType, setModalType] = useState<'correct' | 'wrong' | null>(null);
  const [gameState, setGameState] = useState<'playing' | 'gameover' | 'victory'>('playing');

  // Initialize questions
  useEffect(() => {
    let pool = [...VOCABULARY_LIST];
    if (categoryParam) {
      const filtered = pool.filter((w) => w.category === categoryParam);
      if (filtered.length > 0) pool = filtered;
    }
    if (difficultyParam) {
      const filtered = pool.filter((w) => w.difficulty === difficultyParam);
      if (filtered.length > 0) pool = filtered;
    }

    // Shuffle questions
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setLives(3);
    setGameState('playing');
    setModalType(null);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
  }, [categoryParam, difficultyParam]);

  // Current Question
  const currentQ: VocabWord | undefined = questions[currentIndex];

  // Shuffle options for the active question
  useEffect(() => {
    if (currentQ) {
      const opts = [...currentQ.options].sort(() => 0.5 - Math.random());
      setShuffledOptions(opts);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
      setModalType(null);

      // Automatically speak the word when new card appears
      speakEnglishWord(currentQ.word);
    }
  }, [currentIndex, currentQ]);

  // Handle selecting an answer
  const handleSelectOption = (option: string) => {
    if (isAnswerSubmitted || gameState !== 'playing' || !currentQ) return;

    setSelectedAnswer(option);
    setIsAnswerSubmitted(true);

    const isCorrect = option === currentQ.meaning;

    if (isCorrect) {
      soundManager.playCorrect();
      setScore((prev) => prev + 100);
      addPoints(100);
      incrementLearnedWords(1);
      setModalType('correct');

      // Trigger Confetti effect
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#F59E0B', '#10B981', '#EF4444', '#3B82F6'],
        });
      } catch {
        // ignore
      }
    } else {
      soundManager.playWrong();
      soundManager.playHeartBreak();
      const nextLives = lives - 1;
      setLives(nextLives);
      setModalType('wrong');

      if (nextLives <= 0) {
        setTimeout(() => {
          setGameState('gameover');
          setModalType(null);
        }, 1200);
      }
    }
  };

  // Next Question
  const handleNextQuestion = () => {
    soundManager.playPop();
    setModalType(null);

    if (currentIndex + 1 < questions.length && lives > 0) {
      setCurrentIndex((prev) => prev + 1);
    } else if (lives > 0) {
      // Victory!
      soundManager.playFanfare();
      setGameState('victory');
      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#FBBF24', '#34D399', '#F87171', '#60A5FA', '#A78BFA'],
        });
      } catch {
        // ignore
      }
    }
  };

  const handleRestart = () => {
    soundManager.playPop();
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setLives(3);
    setGameState('playing');
    setModalType(null);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
  };

  const handleSpeech = () => {
    if (currentQ) {
      soundManager.playPop();
      speakEnglishWord(currentQ.word);
    }
  };

  const currentCategory = CATEGORIES.find((c) => c.id === currentQ?.category);
  const progressPercent = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 bg-gradient-to-b from-amber-100 via-amber-50 to-orange-100 min-h-[calc(100vh-4.5rem)] relative overflow-hidden select-none">
      {/* Decorative Floating Background Elements */}
      <div className="absolute top-6 left-10 text-4xl opacity-20 pointer-events-none animate-float">
        🍔
      </div>
      <div className="absolute bottom-8 right-12 text-4xl opacity-20 pointer-events-none animate-wiggle">
        🍟
      </div>

      {/* MOBILE-GAME CONTAINER SHELL (Looks like a sleek mobile game on both desktop & mobile) */}
      <div className="w-full max-w-lg bg-white rounded-3xl border-4 border-amber-950 shadow-cartoon-xl flex flex-col overflow-hidden relative">
        {/* ============================================================ */}
        {/* 1) TOP STATUS BAR (แถบสถานะด้านบนสุด)                         */}
        {/* ============================================================ */}
        <div className="bg-amber-400 p-4 border-b-4 border-amber-800 flex flex-col gap-2.5">
          {/* Top Info Row: Category & Score & Lives */}
          <div className="flex items-center justify-between">
            {/* Category / Question count badge */}
            <div className="flex items-center gap-1.5 bg-amber-100/90 text-amber-950 px-3 py-1 rounded-xl border-2 border-amber-800 font-cartoon text-xs font-bold shadow-xs">
              <span>{currentCategory?.icon || '🎮'}</span>
              <span>
                ข้อที่ {currentIndex + 1} / {questions.length}
              </span>
            </div>

            {/* Current Score Counter (ตัวเลขคะแนนปัจจุบัน) */}
            <motion.div
              key={score}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1.5 bg-white text-amber-950 px-3 py-1 rounded-xl border-2 border-amber-800 font-cartoon font-black text-sm shadow-cartoon-sm"
            >
              <Trophy className="w-4 h-4 text-yellow-500 fill-yellow-400" />
              <span>{score} แต้ม</span>
            </motion.div>

            {/* 3 Red Animated Hearts (ไอคอนรูปหัวใจสีแดง 3 ดวง) */}
            <div className="flex items-center gap-1 bg-amber-950/20 px-2.5 py-1 rounded-xl border border-amber-950/40">
              {[1, 2, 3].map((heartIndex) => {
                const isAlive = heartIndex <= lives;
                return (
                  <motion.div
                    key={heartIndex}
                    animate={
                      isAlive
                        ? { scale: [1, 1.15, 1] }
                        : { scale: [1, 0.7, 0.8], opacity: 0.35 }
                    }
                    transition={{
                      repeat: isAlive ? Infinity : 0,
                      duration: 1.5,
                      delay: heartIndex * 0.2,
                    }}
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        isAlive
                          ? 'text-red-500 fill-red-500 drop-shadow-sm'
                          : 'text-gray-400 fill-gray-300'
                      }`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Animated Progress Bar (หลอดแถบความคืบหน้า) */}
          <div className="w-full h-3.5 bg-amber-200/90 rounded-full border-2 border-amber-800 overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* MAIN GAME VIEW */}
        {gameState === 'playing' && currentQ && (
          <div className="p-5 sm:p-6 flex flex-col gap-5">
            {/* ============================================================ */}
            {/* 2) CENTRAL LARGE FLASHCARD (การ์ดขนาดใหญ่ตรงกลางหน้าจอ)     */}
            {/* ============================================================ */}
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border-4 border-amber-800 shadow-cartoon flex flex-col items-center text-center relative"
            >
              {/* Part of Speech & Difficulty Tag */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-400">
                  {currentQ.partOfSpeech}
                </span>
                <span className="text-[11px] font-bold text-amber-800 bg-white px-2 py-0.5 rounded-full border border-amber-300">
                  {currentQ.difficulty === 'beginner'
                    ? '🟢 เริ่มต้น'
                    : currentQ.difficulty === 'intermediate'
                    ? '🟡 ปานกลาง'
                    : '🔴 ระดับสูง'}
                </span>
              </div>

              {/* Bold English Word + Pronounce Speaker Button */}
              <div className="flex items-center justify-center gap-3 my-2">
                <h2 className="text-3xl sm:text-4xl font-black font-cartoon text-amber-950 tracking-tight">
                  {currentQ.word}
                </h2>

                {/* Speaker Icon (ปุ่มไอคอนรูปสำโพงขนาดเล็กสำหรับกดฟังเสียงอ่าน) */}
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSpeech}
                  aria-label="ฟังเสียงอ่านคำศัพท์"
                  className="btn-chunky p-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 border-2 border-amber-900 shadow-cartoon-sm flex items-center justify-center cursor-pointer"
                >
                  <Volume2 className="w-5 h-5 text-amber-950" />
                </motion.button>
              </div>

              {/* Phonetic Pronunciation */}
              <div className="text-sm font-bold text-amber-800/80 mb-3">
                {currentQ.phonetic}
              </div>

              {/* Example Sentence Clue */}
              <div className="w-full bg-white/80 rounded-2xl p-3 border-2 border-dashed border-amber-300 text-xs sm:text-sm text-gray-700 italic">
                &ldquo;{currentQ.example}&rdquo;
              </div>

              <div className="mt-2 text-[11px] font-bold text-amber-900/60 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> เลือกความหมายภาษาไทยที่ถูกต้องด้านล่าง:
              </div>
            </motion.div>

            {/* ============================================================ */}
            {/* 3) 4 MULTIPLE-CHOICE BUTTONS (ปุ่มตัวเลือกคำตอบ 4 ตัวเลือก) */}
            {/* ============================================================ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {shuffledOptions.map((option, idx) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQ.meaning;

                let btnStyle = 'bg-white hover:bg-amber-50 text-amber-950 border-amber-900 shadow-cartoon-sm';
                let badgeStyle = 'bg-amber-200 text-amber-900 border-amber-400';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-400 text-emerald-950 border-emerald-900 shadow-btn-green';
                    badgeStyle = 'bg-emerald-200 text-emerald-900 border-emerald-500';
                  } else if (isSelected) {
                    btnStyle = 'bg-red-400 text-red-950 border-red-900 shadow-btn-red';
                    badgeStyle = 'bg-red-200 text-red-900 border-red-500';
                  } else {
                    btnStyle = 'bg-gray-100 text-gray-400 border-gray-300 opacity-60';
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={!isAnswerSubmitted ? { scale: 1.02 } : {}}
                    whileTap={!isAnswerSubmitted ? { scale: 0.98 } : {}}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(option)}
                    className={`btn-chunky p-3.5 rounded-2xl border-3 font-cartoon font-bold text-left text-sm sm:text-base flex items-center gap-3 transition-all cursor-pointer ${btnStyle}`}
                  >
                    {/* Choice Number Badge */}
                    <span
                      className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center text-xs font-black shrink-0 ${badgeStyle}`}
                    >
                      {idx + 1}
                    </span>
                    <span className="leading-snug flex-1">{option}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* GAME OVER STATE (เมื่อหัวใจหมด 3 ดวง)                         */}
        {/* ============================================================ */}
        {gameState === 'gameover' && (
          <div className="p-8 flex flex-col items-center text-center gap-5">
            <BurgerBoyCharacter mood="sad" size="lg" />
            <div className="flex flex-col">
              <span className="text-red-500 font-cartoon text-base font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
                <ShieldAlert className="w-5 h-5" /> พลังชีวิตหมดแล้ว!
              </span>
              <h3 className="text-3xl font-black font-cartoon text-amber-950 mt-1">
                อย่ายอมแพ้นะ Burger Master!
              </h3>
              <p className="text-sm text-gray-600 font-semibold mt-1 max-w-sm">
                ความผิดพลาดคือบันไดสู่ความเก่ง! ลองเล่นใหม่อีกครั้งเพื่อจดจำคำศัพท์ให้แม่นยำขึ้น
              </p>
            </div>

            <div className="bg-amber-100 rounded-2xl p-4 border-2 border-amber-300 w-full flex items-center justify-around">
              <div>
                <div className="text-xs text-amber-800 font-bold">คะแนนที่ได้</div>
                <div className="text-2xl font-black font-cartoon text-amber-950">{score} แต้ม</div>
              </div>
              <div className="w-px h-8 bg-amber-300" />
              <div>
                <div className="text-xs text-amber-800 font-bold">ข้อที่ตอบไป</div>
                <div className="text-2xl font-black font-cartoon text-amber-950">
                  {currentIndex} / {questions.length}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full">
              <button
                onClick={handleRestart}
                className="btn-chunky flex-1 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-cartoon font-bold text-base rounded-2xl border-3 border-amber-950 shadow-btn-green flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" /> เล่นใหม่อีกครั้ง
              </button>
              <button
                onClick={() => router.push('/')}
                className="btn-chunky px-4 py-3.5 bg-white hover:bg-amber-50 text-amber-950 font-cartoon font-bold text-base rounded-2xl border-3 border-amber-950 shadow-cartoon-sm flex items-center justify-center"
              >
                <Home className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VICTORY STATE (ตอบครบทุกข้อ)                                  */}
        {/* ============================================================ */}
        {gameState === 'victory' && (
          <div className="p-8 flex flex-col items-center text-center gap-5">
            <BurgerBoyCharacter mood="happy" size="lg" />

            <div className="flex flex-col">
              <span className="text-amber-600 font-cartoon text-base font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                <Sparkles className="w-5 h-5 text-yellow-500" /> ภารกิจสำเร็จ!
              </span>
              <h3 className="text-3xl font-black font-cartoon text-amber-950 mt-1">
                ยินดีด้วย! คุณคือยอดเชฟคำศัพท์ 👑
              </h3>
              <p className="text-sm text-gray-600 font-semibold mt-1 max-w-sm">
                เก่งกาจมาก! คุณตอบคำถามผ่านครบทุกข้อพร้อมรับ XP ไปแบบจุใจ
              </p>
            </div>

            {/* Stars Rating */}
            <div className="flex items-center gap-2 text-3xl">
              <span>⭐</span>
              <span className="scale-125">⭐</span>
              <span>⭐</span>
            </div>

            <div className="bg-amber-100 rounded-2xl p-4 border-2 border-amber-300 w-full flex items-center justify-around">
              <div>
                <div className="text-xs text-amber-800 font-bold">คะแนนรวม</div>
                <div className="text-2xl font-black font-cartoon text-emerald-600">{score} แต้ม</div>
              </div>
              <div className="w-px h-8 bg-amber-300" />
              <div>
                <div className="text-xs text-amber-800 font-bold">หัวใจคงเหลือ</div>
                <div className="text-2xl font-black font-cartoon text-red-500">{lives} / 3 ดวง</div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full">
              <button
                onClick={handleRestart}
                className="btn-chunky flex-1 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-cartoon font-bold text-base rounded-2xl border-3 border-amber-950 shadow-btn-green flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" /> เล่นอีกรอบ
              </button>
              <button
                onClick={() => router.push('/library')}
                className="btn-chunky px-5 py-3.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-cartoon font-bold text-base rounded-2xl border-3 border-amber-950 shadow-btn-yellow flex items-center justify-center"
              >
                ไปคลังคำศัพท์
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 4) MODAL OVERLAYS (ป๊อปอัปแจ้งเตือนโปร่งแสงเตรียมไว้ 2 แบบ)   */}
        {/* ============================================================ */}
        <AnimatePresence>
          {/* A. แบบตอบถูก (เน้นโทนสีเขียวอ่อน) */}
          {modalType === 'correct' && currentQ && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="absolute bottom-0 inset-x-0 bg-emerald-100/95 backdrop-blur-md p-5 border-t-4 border-emerald-500 shadow-2xl flex flex-col gap-3 z-30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center border-2 border-emerald-700 shadow-cartoon-sm shrink-0">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black font-cartoon text-emerald-900">
                      ถูกต้องนะคร้าบ! 🎉 (+100 XP)
                    </h4>
                    <p className="text-xs text-emerald-800 font-bold">
                      {currentQ.word} = {currentQ.meaning}
                    </p>
                  </div>
                </div>

                <BurgerBoyCharacter mood="happy" size="sm" className="hidden sm:inline-block" />
              </div>

              <button
                onClick={handleNextQuestion}
                className="btn-chunky w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-cartoon font-black text-lg rounded-2xl border-3 border-emerald-900 shadow-btn-green flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>คำถามถัดไป</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* B. แบบตอบผิด (เน้นโทนสีแดงอ่อน) */}
          {modalType === 'wrong' && currentQ && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="absolute bottom-0 inset-x-0 bg-red-100/95 backdrop-blur-md p-5 border-t-4 border-red-500 shadow-2xl flex flex-col gap-3 z-30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center border-2 border-red-700 shadow-cartoon-sm shrink-0">
                    <XCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black font-cartoon text-red-900">
                      ยังไม่ถูกต้องนะ! 💔 (-1 พลังชีวิต)
                    </h4>
                    <p className="text-xs text-red-800 font-bold">
                      คำตอบที่ถูกต้องคือ: <span className="underline">{currentQ.meaning}</span>
                    </p>
                  </div>
                </div>

                <BurgerBoyCharacter mood="sad" size="sm" className="hidden sm:inline-block" />
              </div>

              {lives > 0 ? (
                <button
                  onClick={handleNextQuestion}
                  className="btn-chunky w-full py-3.5 bg-red-500 hover:bg-red-600 text-white font-cartoon font-black text-lg rounded-2xl border-3 border-red-900 shadow-btn-red flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>เข้าใจแล้ว ลุยต่อ!</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center p-8 text-amber-900 font-cartoon font-bold">
          กำลังเตรียมห้องควิซ Burger Boy... 🍔
        </div>
      }
    >
      <QuizGameInner />
    </Suspense>
  );
}
