import React from 'react';
import { Search, BookOpen, Calendar, Award, FileText, ArrowRight } from 'lucide-react';

interface HeroBannerProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  setActiveTab: (tab: 'materials' | 'events' | 'scholarships' | 'past-papers' | 'gpa') => void;
  openPromptArchitect: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  setSearchQuery,
  setActiveTab,
  openPromptArchitect
}) => {
  return (
    <div className="relative border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading, Subtitle & Global Search */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
              <span>University Academic Commons</span>
              <span aria-hidden="true">·</span>
              <span>All-In-One Student Portal</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Your central hub for academic excellence &amp; campus life.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Access peer-verified lecture notes, track financial scholarships, discover upcoming campus hackathons &amp; career fairs, and practice with past examination papers.
            </p>

            {/* Global Search Bar */}
            <div className="relative max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses (e.g. CS402, BIO201), scholarships, events, or keywords..."
                  className="w-full pl-12 pr-28 py-3.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                />
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 px-2 py-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  >
                    Clear
                  </button>
                ) : (
                  <div className="absolute right-3 hidden sm:flex items-center gap-1 text-[11px] text-slate-400 font-mono bg-white dark:bg-slate-700 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-600">
                    <span>Press / to search</span>
                  </div>
                )}
              </div>
            </div>

            {/* Fast Action Quick Jumpers */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-medium text-slate-500">Quick explore:</span>
              <button
                onClick={() => { setSearchQuery('CS'); setActiveTab('materials'); }}
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
              >
                Computer Science
              </button>
              <button
                onClick={() => { setSearchQuery('Scholarship'); setActiveTab('scholarships'); }}
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
              >
                STEM Fellowships
              </button>
              <button
                onClick={() => { setSearchQuery('Final Examination'); setActiveTab('past-papers'); }}
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
              >
                2024 Exam Papers
              </button>
              <button
                onClick={() => { setSearchQuery('Hackathon'); setActiveTab('events'); }}
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
              >
                HackAI 2026
              </button>
            </div>
          </div>

          {/* Right Column: High-Fidelity Campus Asset + Quick Stats Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg group">
              <img
                src="/src/assets/images/campus_library_hub_1794041284635.jpg"
                alt="University Modern Academic Library & Study Commons"
                className="w-full h-64 sm:h-80 object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="text-xs font-semibold tracking-wider uppercase text-indigo-300">
                  Campus Knowledge Commons
                </div>
                <h3 className="font-display font-bold text-lg text-white mt-1">
                  Connect, Study &amp; Excel Together
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                  Peer-contributed study repositories reviewed by departmental tutors and course faculty.
                </p>
                <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-slate-200">
                  <span>Open 24/7 Study Hall Access</span>
                  <button
                    onClick={openPromptArchitect}
                    className="flex items-center gap-1 text-indigo-300 hover:text-white font-medium transition-colors"
                  >
                    <span>View AI Prompt Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Stat Strip */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <button
            onClick={() => setActiveTab('materials')}
            className="text-left p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 transition-colors"
          >
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Study Materials</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
              2,450+
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Verified lecture notes &amp; cheat sheets
            </div>
          </button>

          <button
            onClick={() => setActiveTab('scholarships')}
            className="text-left p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 transition-colors"
          >
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Scholarships &amp; Aid</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
              $240,000+
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              45 active opportunities closing soon
            </div>
          </button>

          <button
            onClick={() => setActiveTab('past-papers')}
            className="text-left p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 transition-colors"
          >
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
              <FileText className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Past Exam Papers</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
              185 Papers
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              With solutions &amp; difficulty ratings
            </div>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className="text-left p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 transition-colors"
          >
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Campus Events</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
              12 Upcoming
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Hackathons, career fairs &amp; guest talks
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
