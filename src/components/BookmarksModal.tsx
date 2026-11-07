import React from 'react';
import { 
  X, 
  Trash2, 
  BookOpen, 
  Award, 
  ExternalLink, 
  Bookmark 
} from 'lucide-react';
import { LearningMaterial, Scholarship } from '../data/mockData';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  materials: LearningMaterial[];
  scholarships: Scholarship[];
  bookmarkedIds: Set<string>;
  toggleBookmark: (id: string, type: string) => void;
  openPreviewModal: (mat: LearningMaterial) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  materials,
  scholarships,
  bookmarkedIds,
  toggleBookmark,
  openPreviewModal
}) => {
  if (!isOpen) return null;

  const savedMaterials = materials.filter(m => bookmarkedIds.has(m.id));
  const savedScholarships = scholarships.filter(s => bookmarkedIds.has(s.id));
  const totalCount = savedMaterials.length + savedScholarships.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[85vh] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              My Saved Resources ({totalCount})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {totalCount === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Bookmark className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">No saved items yet</p>
              <p className="text-xs text-slate-400 mt-1">Bookmark lecture notes and scholarships to review them quickly anytime.</p>
            </div>
          ) : (
            <>
              {savedMaterials.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Saved Study Materials ({savedMaterials.length})</span>
                  </h4>

                  <div className="space-y-2">
                    {savedMaterials.map(mat => (
                      <div
                        key={mat.id}
                        className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            {mat.courseCode} · {mat.format}
                          </div>
                          <div className="font-medium text-slate-900 dark:text-white mt-0.5">
                            {mat.title}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { onClose(); openPreviewModal(mat); }}
                            className="px-2.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded transition-colors"
                          >
                            Read
                          </button>
                          <button
                            onClick={() => toggleBookmark(mat.id, 'material')}
                            className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                            title="Remove bookmark"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {savedScholarships.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>Saved Scholarships ({savedScholarships.length})</span>
                  </h4>

                  <div className="space-y-2">
                    {savedScholarships.map(sch => (
                      <div
                        key={sch.id}
                        className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            {sch.amount} · Deadline: {sch.deadline}
                          </div>
                          <div className="font-medium text-slate-900 dark:text-white mt-0.5">
                            {sch.title}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={sch.directUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-indigo-600 hover:text-indigo-700 transition-colors"
                            title="Open application"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => toggleBookmark(sch.id, 'scholarship')}
                            className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                            title="Remove bookmark"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
