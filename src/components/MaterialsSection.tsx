import React, { useState, useMemo } from 'react';
import { 
  LearningMaterial 
} from '../data/mockData';
import { 
  FileText, 
  ThumbsUp, 
  Download, 
  Bookmark, 
  ExternalLink, 
  BookOpen, 
  Filter,
  CheckCircle2
} from 'lucide-react';

interface MaterialsSectionProps {
  materials: LearningMaterial[];
  searchQuery: string;
  bookmarkedIds: Set<string>;
  toggleBookmark: (id: string, type: 'material' | 'event' | 'scholarship' | 'paper') => void;
  openPreviewModal: (mat: LearningMaterial) => void;
  onDownload: (matId: string) => void;
  onUpvote: (matId: string) => void;
}

export const MaterialsSection: React.FC<MaterialsSectionProps> = ({
  materials,
  searchQuery,
  bookmarkedIds,
  toggleBookmark,
  openPreviewModal,
  onDownload,
  onUpvote
}) => {
  const [selectedFaculty, setSelectedFaculty] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');

  const faculties = ['All', 'Engineering & CS', 'Health & Medicine', 'Business & Econ', 'Natural Sciences', 'Humanities & Law'];
  const formats = ['All', 'Summary Notes', 'Cheat Sheet', 'PDF', 'Lab Report'];

  const filteredMaterials = useMemo(() => {
    return materials.filter(m => {
      const matchesFaculty = selectedFaculty === 'All' || m.faculty === selectedFaculty;
      const matchesFormat = selectedFormat === 'All' || m.format === selectedFormat;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = !query || 
        m.title.toLowerCase().includes(query) ||
        m.courseCode.toLowerCase().includes(query) ||
        m.courseName.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query) ||
        m.keyTopics.some(t => t.toLowerCase().includes(query));

      return matchesFaculty && matchesFormat && matchesQuery;
    });
  }, [materials, selectedFaculty, selectedFormat, searchQuery]);

  return (
    <section className="space-y-6">
      {/* Section Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Learning Materials &amp; Study Guides
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Curated student notes, high-yield cheat sheets, and verified exam revision guides.
          </p>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          Showing {filteredMaterials.length} of {materials.length} resources
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
        {/* Faculty Segmented Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Faculty:</span>
          </span>
          {faculties.map(faculty => (
            <button
              key={faculty}
              onClick={() => setSelectedFaculty(faculty)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedFaculty === faculty
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {faculty}
            </button>
          ))}
        </div>

        {/* Format Selector Pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="font-medium text-slate-500 dark:text-slate-400 shrink-0">
            Format:
          </span>
          <div className="flex flex-wrap gap-1">
            {formats.map(fmt => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  selectedFormat === fmt
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      {filteredMaterials.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <FileText className="w-10 h-10 mx-auto text-slate-400 mb-3" />
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">No materials matched your filter</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
            Try adjusting your faculty selection or search keywords to find the notes you need.
          </p>
          <button
            onClick={() => { setSelectedFaculty('All'); setSelectedFormat('All'); }}
            className="mt-4 px-4 py-2 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMaterials.map(mat => {
            const isBookmarked = bookmarkedIds.has(mat.id);

            return (
              <div
                key={mat.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all p-5 flex flex-col justify-between group shadow-xs hover:shadow-md"
              >
                <div>
                  {/* Clean unboxed metadata kicker */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2.5">
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{mat.courseCode}</span>
                      <span aria-hidden="true">·</span>
                      <span>{mat.faculty}</span>
                    </div>

                    <button
                      onClick={() => toggleBookmark(mat.id, 'material')}
                      className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                        isBookmarked ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark this note'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-base text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {mat.title}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {mat.courseName}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                    {mat.description}
                  </p>

                  {/* Key Topics unboxed tag row */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-medium text-slate-400">Topics:</span>
                    {mat.keyTopics.slice(0, 3).map((topic, i) => (
                      <span key={topic} className="hover:text-slate-700 dark:hover:text-slate-200">
                        {topic}{i < Math.min(mat.keyTopics.length - 1, 2) ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer specs & Actions */}
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-mono text-slate-500 dark:text-slate-400">
                    <span>{mat.format}</span>
                    <span aria-hidden="true">/</span>
                    <span>{mat.pagesOrDuration}</span>
                    <span aria-hidden="true">/</span>
                    <span>{mat.fileSize}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onUpvote(mat.id)}
                      className="flex items-center gap-1 px-2 py-1 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                      title="Helpful resource"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span className="font-mono text-[11px] tabular-nums">{mat.upvotes}</span>
                    </button>

                    <button
                      onClick={() => openPreviewModal(mat)}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded transition-colors"
                      title="Read preview and flashcards"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read</span>
                    </button>

                    <button
                      onClick={() => onDownload(mat.id)}
                      className="p-1.5 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 rounded transition-colors"
                      title={`Download file (${mat.downloads} downloads)`}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
