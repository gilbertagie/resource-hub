import React from 'react';
import { PastPaper } from '../data/mockData';
import { 
  X, 
  Download, 
  Star, 
  Clock, 
  FileCheck, 
  HelpCircle,
  Award
} from 'lucide-react';

interface PaperModalProps {
  paper: PastPaper | null;
  onClose: () => void;
  onDownload: () => void;
}

export const PaperModal: React.FC<PaperModalProps> = ({
  paper,
  onClose,
  onDownload
}) => {
  if (!paper) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{paper.courseCode}</span>
              <span aria-hidden="true">·</span>
              <span>{paper.year} {paper.semester}</span>
              <span aria-hidden="true">·</span>
              <span>{paper.examType}</span>
            </div>
            <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white mt-0.5">
              {paper.courseName}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Paper Metadata Strip */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs">
            <div>
              <div className="text-slate-500 dark:text-slate-400">Duration:</div>
              <div className="font-mono font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                {paper.durationMinutes} minutes
              </div>
            </div>

            <div>
              <div className="text-slate-500 dark:text-slate-400">Total Questions:</div>
              <div className="font-mono font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                {paper.totalQuestions} questions
              </div>
            </div>

            <div>
              <div className="text-slate-500 dark:text-slate-400">Difficulty Rating:</div>
              <div className="flex items-center gap-1 font-mono font-bold text-amber-500 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span>{paper.difficultyRating.toFixed(1)} / 5</span>
              </div>
            </div>

            <div>
              <div className="text-slate-500 dark:text-slate-400">Marking Scheme:</div>
              <div className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {paper.hasMarkingScheme ? 'Full Solutions Included' : 'Questions Only'}
              </div>
            </div>
          </div>

          {/* Sample Questions Showcase */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center justify-between">
              <span>Representative Examination Questions:</span>
              <span className="font-mono text-[11px] text-slate-400">Faculty Verified</span>
            </h4>

            <div className="space-y-3">
              {paper.sampleQuestions.map((q) => (
                <div
                  key={q.qNum}
                  className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      Question {q.qNum}
                    </span>
                    <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold">
                      [{q.marks} Marks]
                    </span>
                  </div>

                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans text-sm">
                    {q.prompt}
                  </p>

                  {paper.hasMarkingScheme && (
                    <div className="pt-2 border-t border-slate-200/40 dark:border-slate-700/40 flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono">
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Model rubric &amp; step-by-step proofs verified by Course Lead</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            Official University Examination Archive Repository
          </span>

          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-5 py-2 font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Download Exam Paper &amp; Rubric</span>
          </button>
        </div>
      </div>
    </div>
  );
};
