import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  X, 
  Terminal, 
  Layers, 
  Cpu, 
  Palette, 
  Database,
  Code2
} from 'lucide-react';
import { MASTER_PROMPT_BLUEPRINT } from '../data/mockData';

interface PromptArchitectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromptArchitectModal: React.FC<PromptArchitectModalProps> = ({
  isOpen,
  onClose
}) => {
  const [campusName, setCampusName] = useState<string>('CampusHub University Portal');
  const [techStack, setTechStack] = useState<string>('React 19 + TypeScript + Vite + Tailwind CSS v4');
  const [backendType, setBackendType] = useState<string>('Firebase Firestore + Client Authentication');
  const [includeAiStudyTutor, setIncludeAiStudyTutor] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'master' | 'custom' | 'schema'>('master');

  if (!isOpen) return null;

  const generatedCustomPrompt = `Act as a Senior Principal Full-Stack Software Engineer (15+ years experience) and Lead UI/UX Designer.
You are building "${campusName}", a high-performance student academic resource platform built on ${techStack} with ${backendType}.

### 1. CORE PILLARS & FUNCTIONAL SCOPE
Build an end-to-end, production-grade student hub with the following four core modules:
1. Learning Materials & Notes Repository:
   - Categorized by faculties (Engineering, Medicine, Business, Sciences, Humanities) and course codes (e.g., CS402, BCH210).
   - Format filters: Lecture Notes, Cheat Sheets, Summaries, Video Guides, Lab Manuals.
   - Interactive in-app study modal with markdown/summary preview, flashcards, upvotes, and simulated downloads.
2. Campus Events & Happenings Feed:
   - Calendar & card views of Hackathons, Career & Internship Fairs, Academic Workshops, Guest Lectures, and Cultural Nights.
   - Interactive RSVP with live capacity progress bars and "My RSVPs" view.
   - Venue, date, time, and speaker metadata.
3. Scholarship & Financial Aid Tracker:
   - Opportunities with deadline countdowns, award amounts ($5K - $15K), and eligibility checkers (GPA thresholds & faculty).
   - Interactive application requirements checklist drawer.
4. Past Examination Papers & Marking Schemes:
   - Archives searchable by Academic Year (2020-2024), Semester, and Course Code.
   - Verified solution indicator, difficulty rating breakdown, and question preview modal.
${includeAiStudyTutor ? `5. Gemini AI Study Assistant & Syllabus Explainer:
   - Flashcard generator and personalized revision roadmap generator using @google/genai.` : ''}
6. GPA Calculator & Honors Projection Tool:
   - Interactive course credit grade simulator with cumulative GPA projections.

### 2. UI/UX CONSTITUTION (ANTI-SLOP & PRODUCTION STANDARDS)
- Typography: Use Google Fonts 'Plus Jakarta Sans' for clean, readable body copy paired with 'Outfit' for distinctive display headlines, and 'JetBrains Mono' for course codes, dates, and tabular numbers (tabular-nums).
- Zero-Pill Rule: Never enclose static metadata (tags, dates, counts, course codes) in colored pill boxes or badge sandwiches. Render metadata as clean unboxed text separated by subtle middots (·) or slashes (/).
- 60-30-10 Color Discipline: 60% neutral canvas (clean slate-50/white or slate-950), 30% structural surfaces (cards, hairline dividers), and 10% high-intent focal accents (Indigo/Azure).
- Dual Theme: Native Light and Dark mode with @custom-variant dark in Tailwind v4 and zero contrast defects.
- Top Bar Contract: Zone 1 (Wordmark), Zone 2 (4-5 single-line nav links), Zone 3 (Primary action + Theme toggle).

### 3. DATA SCHEMA & SEED DATA
Seed the application with realistic university data:
- 6+ real-world courses (Distributed Systems, Biochemistry, Multivariable Calculus, Corporate Valuation, Constitutional Law).
- 5+ campus events with dates, times, and organizers.
- 5+ high-value scholarships with deadlines.
- 5+ past papers with sample questions and marks allocations.

Build the complete application now without placeholders or broken mock buttons.`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Google AI Studio Prompt Architect &amp; Blueprint
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Senior Full-Stack Engineer &amp; UI/UX Designer prompt templates ready to copy.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
          <button
            onClick={() => setActiveTab('master')}
            className={`pb-2.5 font-medium border-b-2 transition-colors ${
              activeTab === 'master'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Senior Engineer Master Prompt (Standard)
          </button>

          <button
            onClick={() => setActiveTab('custom')}
            className={`pb-2.5 font-medium border-b-2 transition-colors ${
              activeTab === 'custom'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Interactive Prompt Builder
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`pb-2.5 font-medium border-b-2 transition-colors ${
              activeTab === 'schema'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Data Schema &amp; Architecture
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'master' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Optimized for Google AI Studio (Gemini 2.5 / 3.8 Flash &amp; Pro)
                </span>
                <button
                  onClick={() => copyToClipboard(MASTER_PROMPT_BLUEPRINT)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Master Prompt'}</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-900 text-slate-100 dark:bg-slate-950 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 whitespace-pre-wrap selection:bg-indigo-600">
                {MASTER_PROMPT_BLUEPRINT}
              </pre>
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="space-y-5">
              {/* Configuration Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Portal Name / Institution:
                  </label>
                  <input
                    type="text"
                    value={campusName}
                    onChange={(e) => setCampusName(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Target Tech Stack:
                  </label>
                  <select
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="React 19 + TypeScript + Vite + Tailwind CSS v4">React 19 + TypeScript + Vite + Tailwind v4 (Recommended)</option>
                    <option value="Next.js 15 (App Router) + Tailwind CSS + TypeScript">Next.js 15 (App Router) + Tailwind CSS</option>
                    <option value="React SPA + Express Node.js Server + Tailwind">Full-Stack React + Express Backend</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Database &amp; Persistence:
                  </label>
                  <select
                    value={backendType}
                    onChange={(e) => setBackendType(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Firebase Firestore + Client Authentication">Firebase Firestore + Google Auth</option>
                    <option value="Cloud SQL PostgreSQL + Drizzle ORM">Cloud SQL PostgreSQL + Drizzle ORM</option>
                    <option value="Client State + LocalStorage Offline Persistence">Client State + LocalStorage (Zero setup)</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 pt-4">
                    <input
                      type="checkbox"
                      checked={includeAiStudyTutor}
                      onChange={(e) => setIncludeAiStudyTutor(e.target.checked)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Include Gemini AI Study Assistant feature</span>
                  </label>
                </div>
              </div>

              {/* Live Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Generated Customized Prompt:
                  </span>
                  <button
                    onClick={() => copyToClipboard(generatedCustomPrompt)}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Customized Prompt'}</span>
                  </button>
                </div>

                <pre className="p-4 bg-slate-900 text-slate-100 dark:bg-slate-950 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 whitespace-pre-wrap max-h-72">
                  {generatedCustomPrompt}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4 text-xs">
              <p className="text-slate-600 dark:text-slate-300">
                To achieve seamless data consistency between features, use this normalized schema across Firestore or PostgreSQL:
              </p>

              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono overflow-x-auto leading-relaxed border border-slate-800">
{`// 1. Learning Materials Table / Collection
materials {
  id: string;              // Primary key
  title: string;           // e.g. "Distributed Systems Handout"
  courseCode: string;      // e.g. "CS402"
  courseName: string;      // e.g. "Distributed Computing Systems"
  faculty: string;         // 'Engineering' | 'Health' | 'Business' | 'Sciences'
  format: string;          // 'PDF' | 'Cheat Sheet' | 'Summary Notes'
  fileSize: string;        // '4.2 MB'
  pagesOrDuration: string; // '38 pages'
  upvotes: number;         // 428
  downloads: number;       // 1240
  author: string;          // Student group or Professor
  keyTopics: string[];     // ['Consensus', 'CAP Theorem', 'Raft']
  previewSnippet: string;  // Markdown / plain text notes
  flashcards?: { q: string, a: string }[];
}

// 2. Campus Events Table / Collection
events {
  id: string;              // Primary key
  title: string;           // "Campus HackAI 2026"
  category: string;        // 'Hackathon' | 'Career' | 'Workshop'
  date: string;            // "Nov 14 - 16, 2026"
  time: string;            // "6:00 PM"
  location: string;        // "Engineering Atrium"
  organizer: string;       // "AI Student Guild"
  attendeesCount: number;  // 384
  capacity: number;        // 450
  highlights: string[];    // Bullet highlights
}

// 3. Scholarships Table / Collection
scholarships {
  id: string;              // Primary key
  title: string;           // "Dean's Excellence Merit Award"
  organization: string;    // "Faculty Endowment"
  amount: string;          // "$10,000 / year"
  deadline: string;        // "Dec 05, 2026"
  daysRemaining: number;   // 28
  targetFaculty: string;   // "Engineering & CS"
  minGpa: number;          // 3.6
  studyLevel: string;      // "Undergraduate"
  requirements: string[];  // ['Transcript', 'Resume', 'Essay']
  directUrl: string;       // Application URL
}

// 4. Past Exam Papers Table / Collection
past_papers {
  id: string;              // Primary key
  courseCode: string;      // "CS301"
  courseName: string;      // "Algorithms & Complexity"
  year: number;            // 2024
  semester: string;        // "Semester 1"
  examType: string;        // "Final Examination"
  hasMarkingScheme: boolean;
  difficultyRating: number;// 4.2 out of 5
  sampleQuestions: { qNum: number, prompt: string, marks: number }[];
}`}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            Click 'Copy' and paste directly into Google AI Studio to regenerate or expand!
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-medium rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
