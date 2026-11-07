import React, { useState } from 'react';
import { LearningMaterial } from '../data/mockData';
import { 
  X, 
  Download, 
  ThumbsUp, 
  Bookmark, 
  Share2, 
  BookOpen, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

interface MaterialModalProps {
  material: LearningMaterial | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onUpvote: () => void;
  onDownload: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({
  material,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onUpvote,
  onDownload,
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'flashcards'>('notes');
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  if (!material) return null;

  const flashcards = material.flashcards || [];
  const currentCard = flashcards[flashcardIndex];

  const handleNextCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{material.courseCode}</span>
              <span aria-hidden="true">·</span>
              <span>{material.courseName}</span>
              <span aria-hidden="true">·</span>
              <span>{material.format}</span>
            </div>
            <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white mt-0.5">
              {material.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-4 px-6 pt-3 border-b border-slate-100 dark:border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('notes')}
            className={`pb-2.5 font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'notes'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Study Notes &amp; Derivations</span>
          </button>

          {flashcards.length > 0 && (
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`pb-2.5 font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'flashcards'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Interactive Flashcards ({flashcards.length})</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'notes' && (
            <div className="space-y-6">
              {/* Summary metadata strip */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="space-y-0.5">
                  <div className="text-slate-500 dark:text-slate-400">Author &amp; Attribution:</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">{material.author}</div>
                </div>

                <div className="space-y-0.5 font-mono">
                  <div className="text-slate-500 dark:text-slate-400">Uploaded Date:</div>
                  <div className="text-slate-700 dark:text-slate-300">{material.uploadedDate}</div>
                </div>

                <div className="space-y-0.5 font-mono">
                  <div className="text-slate-500 dark:text-slate-400">Pages / Length:</div>
                  <div className="text-slate-700 dark:text-slate-300">{material.pagesOrDuration} ({material.fileSize})</div>
                </div>
              </div>

              {/* Core Topics Covered */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Key Concepts &amp; Exam Objectives:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {material.keyTopics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Text Extract */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Synthesized Study Excerpt:
                </h4>
                <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs whitespace-pre-wrap leading-relaxed border border-slate-800">
                  {material.previewSnippet}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'flashcards' && flashcards.length > 0 && currentCard && (
            <div className="space-y-6 flex flex-col items-center">
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Card {flashcardIndex + 1} of {flashcards.length}
              </div>

              {/* Interactive Flip Card */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full max-w-lg min-h-[220px] p-8 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/50 to-white dark:from-slate-800 dark:to-slate-900 shadow-md flex flex-col justify-between cursor-pointer hover:border-indigo-400 transition-all select-none"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                  {isFlipped ? 'Answer (Click to flip back)' : 'Question (Click card to reveal answer)'}
                </div>

                <div className="text-base sm:text-lg font-medium text-slate-900 dark:text-white my-4 leading-relaxed">
                  {isFlipped ? currentCard.a : currentCard.q}
                </div>

                <div className="text-xs text-slate-400 font-mono flex items-center justify-between">
                  <span>Spacebar or Click flips card</span>
                  <RotateCw className="w-4 h-4" />
                </div>
              </div>

              {/* Card Nav Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevCard}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  {isFlipped ? 'Show Question' : 'Reveal Answer'}
                </button>

                <button
                  onClick={handleNextCard}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onUpvote}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:text-indigo-600 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 transition-colors"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span className="font-mono tabular-nums">{material.upvotes} Upvotes</span>
            </button>

            <button
              onClick={onToggleBookmark}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 border-amber-300 dark:border-amber-800'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>
          </div>

          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Download Handout ({material.fileSize})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
