import React, { useState } from 'react';
import { X, Upload, CheckCircle2, FileText } from 'lucide-react';
import { LearningMaterial } from '../data/mockData';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMaterial: (mat: LearningMaterial) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onAddMaterial
}) => {
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [faculty, setFaculty] = useState<LearningMaterial['faculty']>('Engineering & CS');
  const [format, setFormat] = useState<LearningMaterial['format']>('Summary Notes');
  const [description, setDescription] = useState('');
  const [notesSnippet, setNotesSnippet] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !courseCode) return;

    const newMaterial: LearningMaterial = {
      id: `user-${Date.now()}`,
      title,
      courseCode: courseCode.toUpperCase().trim(),
      courseName: courseName || 'University Course',
      faculty,
      format,
      fileSize: '2.4 MB',
      pagesOrDuration: '14 pages',
      upvotes: 1,
      downloads: 0,
      author: 'You (Student Contributor)',
      uploadedDate: 'Just now',
      description: description || 'Peer-contributed study materials and summary notes.',
      keyTopics: ['Student Notes', 'Exam Preparation', 'Key Derivations'],
      previewSnippet: notesSnippet || `Section 1: Core Concepts & Principles\nContributed summary notes for ${courseCode} covering primary lecture takeaways and problem solving methodologies.`
    };

    onAddMaterial(newMaterial);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-xl max-h-[90vh] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Contribute Student Study Material
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Material Published!</h4>
              <p className="text-slate-500">Your notes are now live in the student library repository.</p>
            </div>
          ) : (
            <>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Title / Subject Description *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Operating Systems Concurrency & Semaphores Study Guide"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    placeholder="e.g. CS240"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Course Name
                  </label>
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="e.g. Operating Systems"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Faculty Department
                  </label>
                  <select
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Engineering & CS">Engineering &amp; CS</option>
                    <option value="Health & Medicine">Health &amp; Medicine</option>
                    <option value="Business & Econ">Business &amp; Econ</option>
                    <option value="Natural Sciences">Natural Sciences</option>
                    <option value="Humanities & Law">Humanities &amp; Law</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Summary Notes">Summary Notes</option>
                    <option value="Cheat Sheet">Cheat Sheet</option>
                    <option value="PDF">PDF Handout</option>
                    <option value="Lab Report">Lab Report</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Brief Overview / Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Key topics and chapters included..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Study Excerpt / Notes Text
                </label>
                <textarea
                  rows={4}
                  value={notesSnippet}
                  onChange={(e) => setNotesSnippet(e.target.value)}
                  placeholder="Paste key formulas, notes summary, or derivations..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
                >
                  Publish Resource
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
