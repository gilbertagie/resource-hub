import React from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Bookmark, 
  Sun, 
  Moon, 
  PlusCircle,
  FileCode2
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'materials' | 'events' | 'scholarships' | 'past-papers' | 'gpa';
  setActiveTab: (tab: 'materials' | 'events' | 'scholarships' | 'past-papers' | 'gpa') => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  bookmarksCount: number;
  openBookmarks: () => void;
  openPromptArchitect: () => void;
  openUploadModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  setIsDark,
  bookmarksCount,
  openBookmarks,
  openPromptArchitect,
  openUploadModal,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm">
            <GraduationCap className="w-5 h-5" />
          </div>
          <button 
            onClick={() => setActiveTab('materials')} 
            className="text-left group cursor-pointer focus-visible:outline-none"
          >
            <span className="font-display font-bold text-lg md:text-xl text-slate-900 dark:text-white tracking-tight block">
              CampusHub
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('materials')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'materials'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Learning Materials
            {activeTab === 'materials' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'events'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Campus Events
            {activeTab === 'events' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('scholarships')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'scholarships'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Scholarships &amp; Aid
            {activeTab === 'scholarships' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('past-papers')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'past-papers'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Past Exam Papers
            {activeTab === 'past-papers' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('gpa')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'gpa'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            GPA Calculator
            {activeTab === 'gpa' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: Actions & Master Prompt Architect */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={openPromptArchitect}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors whitespace-nowrap"
            title="View & generate senior developer Google AI Studio prompts"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline">AI Studio Prompt</span>
            <span className="sm:hidden">Prompt</span>
          </button>

          <button
            onClick={openUploadModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Contribute</span>
          </button>

          <button
            onClick={openBookmarks}
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="View saved bookmarks"
            aria-label="View saved bookmarks"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-[10px] font-bold text-white flex items-center justify-center font-mono">
                {bookmarksCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDark ? "Switch to light theme" : "Switch to dark theme"}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>

      {/* Mobile Subnav Strip */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 no-scrollbar">
        {[
          { key: 'materials', label: 'Materials' },
          { key: 'events', label: 'Events' },
          { key: 'scholarships', label: 'Scholarships' },
          { key: 'past-papers', label: 'Past Papers' },
          { key: 'gpa', label: 'GPA Planner' },
        ].map(item => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key as any)}
            className={`px-3 py-1 text-xs rounded-md whitespace-nowrap font-medium transition-colors ${
              activeTab === item.key
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
