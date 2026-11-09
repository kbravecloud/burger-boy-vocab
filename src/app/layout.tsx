import type { Metadata } from 'next';
import './globals.css';
import { GameProvider } from '../context/GameContext';
import { Navbar } from '../components/common/Navbar';

export const metadata: Metadata = {
  title: 'Burger Boy Vocab - เว็บแอปฝึกคำศัพท์เกมิฟิเคชัน',
  description: 'เรียนรู้คำศัพท์ภาษาอังกฤษผ่านเกมตอบคำถามสุดมันส์ พร้อม Digital Flashcards และ Interactive Dictionary',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="antialiased flex flex-col min-h-screen bg-amber-50">
        <GameProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
        </GameProvider>
      </body>
    </html>
  );
}
