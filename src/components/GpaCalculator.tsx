import React, { useState } from 'react';
import { Calculator, Plus, Trash2, RotateCcw, Target, Award } from 'lucide-react';

interface CourseEntry {
  id: string;
  courseName: string;
  credits: number;
  grade: string;
}

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D': 1.0,
  'F': 0.0,
};

export const GpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState<CourseEntry[]>([
    { id: '1', courseName: 'CS402 Distributed Systems', credits: 4, grade: 'A' },
    { id: '2', courseName: 'MATH205 Multivariable Calculus', credits: 4, grade: 'B+' },
    { id: '3', courseName: 'BCH210 Cellular Biochemistry', credits: 3, grade: 'A-' },
    { id: '4', courseName: 'FIN330 Corporate Valuation', credits: 3, grade: 'A' },
  ]);

  const [priorCredits, setPriorCredits] = useState<number>(45);
  const [priorGpa, setPriorGpa] = useState<number>(3.62);
  const [targetGpa, setTargetGpa] = useState<number>(3.75);

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now().toString(), courseName: `Course ${courses.length + 1}`, credits: 3, grade: 'A' }
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof CourseEntry, value: any) => {
    setCourses(courses.map(c => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const resetAll = () => {
    setCourses([
      { id: '1', courseName: 'Course 1', credits: 3, grade: 'A' },
      { id: '2', courseName: 'Course 2', credits: 3, grade: 'B+' },
    ]);
  };

  // Calculations
  const semesterTotalCredits = courses.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);
  const semesterQualityPoints = courses.reduce((sum, c) => {
    const pts = GRADE_POINTS[c.grade] ?? 0;
    return sum + (pts * (Number(c.credits) || 0));
  }, 0);

  const semesterGpa = semesterTotalCredits > 0 ? (semesterQualityPoints / semesterTotalCredits) : 0;

  // Cumulative
  const cumulativeCredits = priorCredits + semesterTotalCredits;
  const cumulativePoints = (priorCredits * priorGpa) + semesterQualityPoints;
  const cumulativeGpa = cumulativeCredits > 0 ? (cumulativePoints / cumulativeCredits) : 0;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            GPA Calculator &amp; Honors Target Planner
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Simulate current semester performance and calculate what grades you need to meet scholarship or Dean's List cutoffs.
          </p>
        </div>

        <button
          onClick={resetAll}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Course List</span>
        </button>
      </div>

      {/* KPI Tally Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Semester GPA
          </div>
          <div className="text-3xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
            {semesterGpa.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            {semesterTotalCredits} active credits this term
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Projected Cumulative GPA
          </div>
          <div className="text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
            {cumulativeGpa.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            {cumulativeCredits} total credit units
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Academic Standing</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-bold font-display text-slate-900 dark:text-white mt-2">
            {cumulativeGpa >= 3.75 ? "Summa Cum Laude / Dean's List" : cumulativeGpa >= 3.5 ? "Magna Cum Laude" : cumulativeGpa >= 3.0 ? "Good Academic Standing" : "Review Advising"}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {cumulativeGpa >= 3.5 ? "Eligible for all merit scholarships" : "Meet with academic advisor for boost"}
          </div>
        </div>
      </div>

      {/* Main Calculation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Course List (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-base text-slate-900 dark:text-white">
              Current Semester Modules
            </h3>
            <button
              onClick={addCourse}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Module</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {courses.map((course, idx) => (
              <div
                key={course.id}
                className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60"
              >
                <span className="font-mono text-xs text-slate-400 w-5">
                  #{idx + 1}
                </span>

                <input
                  type="text"
                  value={course.courseName}
                  onChange={(e) => updateCourse(course.id, 'courseName', e.target.value)}
                  placeholder="e.g. CS301 Algorithms"
                  className="flex-1 bg-transparent border-none text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-0"
                />

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs text-slate-500">Credits:</span>
                  <select
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', Number(e.target.value))}
                    className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-2 py-1 text-xs font-mono text-slate-900 dark:text-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} cr</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs text-slate-500">Grade:</span>
                  <select
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-2 py-1 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400"
                  >
                    {Object.keys(GRADE_POINTS).map(grd => (
                      <option key={grd} value={grd}>{grd} ({GRADE_POINTS[grd].toFixed(1)})</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => removeCourse(course.id)}
                  disabled={courses.length <= 1}
                  className="p-1 text-slate-400 hover:text-rose-500 disabled:opacity-30 transition-colors"
                  title="Remove course"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Prior History & Target Projection (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
          <h3 className="font-semibold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Target &amp; History</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">
                Completed Credits (Prior Semesters):
              </label>
              <input
                type="number"
                min="0"
                value={priorCredits}
                onChange={(e) => setPriorCredits(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">
                Prior Cumulative GPA:
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="4.0"
                value={priorGpa}
                onChange={(e) => setPriorGpa(Math.min(4.0, Math.max(0, Number(e.target.value))))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-slate-600 dark:text-slate-400 mb-1">
                Target Graduation GPA:
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="4.0"
                value={targetGpa}
                onChange={(e) => setTargetGpa(Math.min(4.0, Math.max(0, Number(e.target.value))))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono font-bold text-indigo-600 dark:text-indigo-400"
              />
            </div>

            <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-lg border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
              <div className="font-semibold text-indigo-700 dark:text-indigo-300">
                Academic Advisor Insight:
              </div>
              <p>
                {cumulativeGpa >= targetGpa
                  ? `On track! Your projected GPA of ${cumulativeGpa.toFixed(2)} exceeds your ${targetGpa.toFixed(2)} target.`
                  : `To reach your ${targetGpa.toFixed(2)} target, aim for an average semester GPA of ${(targetGpa + 0.15).toFixed(2)} across your next 2 terms.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
