/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LearningMaterial, 
  CampusEvent, 
  Scholarship, 
  PastPaper, 
  INITIAL_MATERIALS, 
  INITIAL_EVENTS, 
  INITIAL_SCHOLARSHIPS, 
  INITIAL_PAST_PAPERS 
} from './data/mockData';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { MaterialsSection } from './components/MaterialsSection';
import { EventsSection } from './components/EventsSection';
import { ScholarshipsSection } from './components/ScholarshipsSection';
import { PastPapersSection } from './components/PastPapersSection';
import { GpaCalculator } from './components/GpaCalculator';
import { MaterialModal } from './components/MaterialModal';
import { PaperModal } from './components/PaperModal';
import { BookmarksModal } from './components/BookmarksModal';
import { UploadModal } from './components/UploadModal';
import { PromptArchitectModal } from './components/PromptArchitectModal';
import { CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'materials' | 'events' | 'scholarships' | 'past-papers' | 'gpa'>('materials');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Primary dataset state
  const [materials, setMaterials] = useState<LearningMaterial[]>(INITIAL_MATERIALS);
  const [events, setEvents] = useState<CampusEvent[]>(INITIAL_EVENTS);
  const [scholarships, setScholarships] = useState<Scholarship[]>(INITIAL_SCHOLARSHIPS);
  const [pastPapers, setPastPapers] = useState<PastPaper[]>(INITIAL_PAST_PAPERS);

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => new Set(['mat-1', 'sch-2']));

  // Modal states
  const [activePreviewMaterial, setActivePreviewMaterial] = useState<LearningMaterial | null>(null);
  const [activePreviewPaper, setActivePreviewPaper] = useState<PastPaper | null>(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isPromptArchitectOpen, setIsPromptArchitectOpen] = useState<boolean>(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Global keyboard shortcut to open prompt architect or search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsPromptArchitectOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleToggleBookmark = (id: string, type: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Item removed from bookmarks');
      } else {
        next.add(id);
        showToast('Saved to your bookmarks');
      }
      return next;
    });
  };

  const handleUpvote = (matId: string) => {
    setMaterials(prev => prev.map(m => {
      if (m.id === matId) {
        return { ...m, upvotes: m.upvotes + 1 };
      }
      return m;
    }));
    showToast('Upvoted! Thank you for supporting peer study materials.');
  };

  const handleDownloadMaterial = (matId: string) => {
    setMaterials(prev => prev.map(m => {
      if (m.id === matId) {
        return { ...m, downloads: m.downloads + 1 };
      }
      return m;
    }));
    showToast('Download started! Handout saved to device.');
  };

  const handleDownloadPaper = (paperId: string) => {
    showToast('Downloading verified exam paper PDF and solution rubric.');
  };

  const handleToggleRsvp = (eventId: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        const nextState = !e.isRsvpd;
        showToast(nextState ? `RSVP confirmed for ${e.title}!` : 'RSVP cancelled.');
        return {
          ...e,
          isRsvpd: nextState,
          attendeesCount: nextState ? e.attendeesCount + 1 : Math.max(0, e.attendeesCount - 1)
        };
      }
      return e;
    }));
  };

  const handleAddMaterial = (newMat: LearningMaterial) => {
    setMaterials([newMat, ...materials]);
    showToast('New study resource published successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        setIsDark={setIsDark}
        bookmarksCount={bookmarkedIds.size}
        openBookmarks={() => setIsBookmarksOpen(true)}
        openPromptArchitect={() => setIsPromptArchitectOpen(true)}
        openUploadModal={() => setIsUploadOpen(true)}
      />

      {/* Hero Banner with Search & Stats */}
      <HeroBanner
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openPromptArchitect={() => setIsPromptArchitectOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
        {activeTab === 'materials' && (
          <MaterialsSection
            materials={materials}
            searchQuery={searchQuery}
            bookmarkedIds={bookmarkedIds}
            toggleBookmark={handleToggleBookmark}
            openPreviewModal={(mat) => setActivePreviewMaterial(mat)}
            onDownload={handleDownloadMaterial}
            onUpvote={handleUpvote}
          />
        )}

        {activeTab === 'events' && (
          <EventsSection
            events={events}
            searchQuery={searchQuery}
            onToggleRsvp={handleToggleRsvp}
            openPromptArchitect={() => setIsPromptArchitectOpen(true)}
          />
        )}

        {activeTab === 'scholarships' && (
          <ScholarshipsSection
            scholarships={scholarships}
            searchQuery={searchQuery}
            bookmarkedIds={bookmarkedIds}
            toggleBookmark={handleToggleBookmark}
            openPromptArchitect={() => setIsPromptArchitectOpen(true)}
          />
        )}

        {activeTab === 'past-papers' && (
          <PastPapersSection
            papers={pastPapers}
            searchQuery={searchQuery}
            onDownloadPaper={handleDownloadPaper}
            openPaperModal={(p) => setActivePreviewPaper(p)}
          />
        )}

        {activeTab === 'gpa' && (
          <GpaCalculator />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-slate-700 dark:text-slate-200">CampusHub</span>
            <span aria-hidden="true">·</span>
            <span>University Student Academic Commons</span>
            <span aria-hidden="true">·</span>
            <span>Open Access Repository</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPromptArchitectOpen(true)}
              className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prompt Architect</span>
            </button>
            <button
              onClick={() => setActiveTab('gpa')}
              className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              GPA Calculator
            </button>
            <button
              onClick={() => setActiveTab('past-papers')}
              className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              Past Exam Papers
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <MaterialModal
        material={activePreviewMaterial}
        onClose={() => setActivePreviewMaterial(null)}
        isBookmarked={activePreviewMaterial ? bookmarkedIds.has(activePreviewMaterial.id) : false}
        onToggleBookmark={() => {
          if (activePreviewMaterial) {
            handleToggleBookmark(activePreviewMaterial.id, 'material');
          }
        }}
        onUpvote={() => {
          if (activePreviewMaterial) {
            handleUpvote(activePreviewMaterial.id);
          }
        }}
        onDownload={() => {
          if (activePreviewMaterial) {
            handleDownloadMaterial(activePreviewMaterial.id);
          }
        }}
      />

      <PaperModal
        paper={activePreviewPaper}
        onClose={() => setActivePreviewPaper(null)}
        onDownload={() => {
          if (activePreviewPaper) {
            handleDownloadPaper(activePreviewPaper.id);
          }
        }}
      />

      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        materials={materials}
        scholarships={scholarships}
        bookmarkedIds={bookmarkedIds}
        toggleBookmark={handleToggleBookmark}
        openPreviewModal={(mat) => setActivePreviewMaterial(mat)}
      />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddMaterial={handleAddMaterial}
      />

      <PromptArchitectModal
        isOpen={isPromptArchitectOpen}
        onClose={() => setIsPromptArchitectOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl text-xs font-medium animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
