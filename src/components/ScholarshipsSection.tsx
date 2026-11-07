import React, { useState, useMemo } from 'react';
import { Scholarship } from '../data/mockData';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Bookmark, 
  AlertCircle,
  FileCheck,
  DollarSign,
  GraduationCap
} from 'lucide-react';

interface ScholarshipsSectionProps {
  scholarships: Scholarship[];
  searchQuery: string;
  bookmarkedIds: Set<string>;
  toggleBookmark: (id: string, type: 'material' | 'event' | 'scholarship' | 'paper') => void;
  openPromptArchitect: () => void;
}

export const ScholarshipsSection: React.FC<ScholarshipsSectionProps> = ({
  scholarships,
  searchQuery,
  bookmarkedIds,
  toggleBookmark,
  openPromptArchitect
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [gpaThreshold, setGpaThreshold] = useState<number>(0);
  const [activeChecklistId, setActiveChecklistId] = useState<string | null>(null);

  const filteredScholarships = useMemo(() => {
    return scholarships.filter(s => {
      const matchesLevel = selectedLevel === 'All' || s.studyLevel === selectedLevel || s.studyLevel === 'All Degrees';
      const matchesGpa = gpaThreshold === 0 || s.minGpa <= gpaThreshold;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = !query ||
        s.title.toLowerCase().includes(query) ||
        s.organization.toLowerCase().includes(query) ||
        s.targetFaculty.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query);

      return matchesLevel && matchesGpa && matchesQuery;
    });
  }, [scholarships, selectedLevel, gpaThreshold, searchQuery]);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Scholarships &amp; Financial Aid
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Browse verified institutional bursaries, STEM research grants, and private foundation fellowships.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Showing {filteredScholarships.length} scholarships
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Study Level Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500 dark:text-slate-400 shrink-0">Level:</span>
          {['All', 'Undergraduate', 'Postgraduate'].map(level => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedLevel === level
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* GPA Quick Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500 dark:text-slate-400 shrink-0">My Current GPA:</span>
          <select
            value={gpaThreshold}
            onChange={(e) => setGpaThreshold(Number(e.target.value))}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value={0}>Show All (No GPA Cutoff)</option>
            <option value={3.0}>Show eligible for GPA 3.0+</option>
            <option value={3.5}>Show eligible for GPA 3.5+</option>
            <option value={3.8}>Show eligible for GPA 3.8+</option>
          </select>
        </div>
      </div>

      {/* Scholarships Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredScholarships.map(sch => {
          const isBookmarked = bookmarkedIds.has(sch.id);
          const isChecklistOpen = activeChecklistId === sch.id;

          return (
            <div
              key={sch.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all p-5 sm:p-6 flex flex-col justify-between group shadow-xs hover:shadow-md"
            >
              <div>
                {/* Meta header kicker */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">{sch.targetFaculty}</span>
                    <span aria-hidden="true">·</span>
                    <span>Min GPA {sch.minGpa.toFixed(1)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {sch.daysRemaining <= 14 ? (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 font-mono">
                        <Clock className="w-3 h-3" />
                        <span>CLOSING IN {sch.daysRemaining} DAYS</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-400">
                        Deadline: {sch.deadline}
                      </span>
                    )}

                    <button
                      onClick={() => toggleBookmark(sch.id, 'scholarship')}
                      className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                        isBookmarked ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={isBookmarked ? 'Remove saved scholarship' : 'Save scholarship'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Amount Highlight */}
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mb-1">
                  {sch.amount}
                </div>

                {/* Title & Organization */}
                <h3 className="font-display font-semibold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                  {sch.title}
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Administered by {sch.organization}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  {sch.description}
                </p>

                {/* Requirements Toggle Drawer */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setActiveChecklistId(isChecklistOpen ? null : sch.id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>{isChecklistOpen ? 'Hide' : 'View'} Application Requirements ({sch.requirements.length})</span>
                  </button>

                  {isChecklistOpen && (
                    <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg space-y-1.5 text-xs text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                      <div className="font-semibold text-slate-700 dark:text-slate-200 mb-1 text-[11px] uppercase tracking-wider">
                        Required Documentation:
                      </div>
                      {sch.requirements.map((req, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500 dark:text-slate-400">
                  {sch.studyLevel}
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={sch.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-xs"
                  >
                    <span>Apply on Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
