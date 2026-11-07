import React, { useState, useMemo } from 'react';
import { PastPaper } from '../data/mockData';
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  CheckCircle, 
  HelpCircle, 
  Star, 
  Clock, 
  Filter 
} from 'lucide-react';

interface PastPapersSectionProps {
  papers: PastPaper[];
  searchQuery: string;
  onDownloadPaper: (paperId: string) => void;
  openPaperModal: (paper: PastPaper) => void;
}

export const PastPapersSection: React.FC<PastPapersSectionProps> = ({
  papers,
  searchQuery,
  onDownloadPaper,
  openPaperModal
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedExamType, setSelectedExamType] = useState<string>('All');
  const [onlyWithSolutions, setOnlyWithSolutions] = useState<boolean>(false);

  const years = ['All', '2024', '2023', '2022'];
  const examTypes = ['All', 'Final Examination', 'Mid-Term Exam'];

  const filteredPapers = useMemo(() => {
    return papers.filter(p => {
      const matchesYear = selectedYear === 'All' || p.year.toString() === selectedYear;
      const matchesExamType = selectedExamType === 'All' || p.examType === selectedExamType;
      const matchesSolutions = !onlyWithSolutions || p.hasMarkingScheme;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = !query ||
        p.courseCode.toLowerCase().includes(query) ||
        p.courseName.toLowerCase().includes(query) ||
        p.faculty.toLowerCase().includes(query);

      return matchesYear && matchesExamType && matchesSolutions && matchesQuery;
    });
  }, [papers, selectedYear, selectedExamType, onlyWithSolutions, searchQuery]);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Past Examination Papers &amp; Marking Schemes
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Search official archive exams, evaluate question difficulty, and study verified professor solutions.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Showing {filteredPapers.length} papers in database
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-500 dark:text-slate-400 shrink-0">Year:</span>
          {years.map(yr => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                selectedYear === yr
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {yr}
            </button>
          ))}

          <span className="text-slate-300 dark:text-slate-700 mx-1">|</span>

          <span className="font-semibold text-slate-500 dark:text-slate-400 shrink-0">Type:</span>
          {examTypes.map(t => (
            <button
              key={t}
              onClick={() => setSelectedExamType(t)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedExamType === t
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={onlyWithSolutions}
              onChange={(e) => setOnlyWithSolutions(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Verified Solutions Only</span>
          </label>
        </div>
      </div>

      {/* Papers Table View */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Course &amp; Title</th>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Exam Type</th>
                <th className="py-3 px-4">Duration &amp; Qs</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Solutions</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPapers.map(paper => (
                <tr 
                  key={paper.id} 
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {paper.courseCode}
                    </div>
                    <div className="text-xs text-slate-900 dark:text-white font-medium max-w-xs truncate">
                      {paper.courseName}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {paper.faculty}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-xs text-slate-600 dark:text-slate-300 tabular-nums">
                    <div>{paper.year}</div>
                    <div className="text-[11px] text-slate-400">{paper.semester}</div>
                  </td>

                  <td className="py-3.5 px-4 text-xs font-medium text-slate-700 dark:text-slate-300">
                    {paper.examType}
                  </td>

                  <td className="py-3.5 px-4 text-xs font-mono text-slate-600 dark:text-slate-400 tabular-nums">
                    <div>{paper.durationMinutes} mins</div>
                    <div className="text-[11px] text-slate-400">{paper.totalQuestions} questions</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-mono text-xs">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-bold tabular-nums text-slate-800 dark:text-slate-200">
                        {paper.difficultyRating.toFixed(1)}
                      </span>
                      <span className="text-[11px] text-slate-400">/5</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {paper.studentRatingCount} reviews
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    {paper.hasMarkingScheme ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Included</span>
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">
                        Questions Only
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openPaperModal(paper)}
                        className="px-2.5 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-lg transition-colors flex items-center gap-1"
                        title="View sample questions"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>

                      <button
                        onClick={() => onDownloadPaper(paper.id)}
                        className="p-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Download exam PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
