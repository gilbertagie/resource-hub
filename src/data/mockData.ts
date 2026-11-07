export interface LearningMaterial {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  faculty: 'Engineering & CS' | 'Health & Medicine' | 'Business & Econ' | 'Natural Sciences' | 'Humanities & Law';
  format: 'PDF' | 'Video Guide' | 'Cheat Sheet' | 'Summary Notes' | 'Lab Report';
  fileSize: string;
  pagesOrDuration: string;
  upvotes: number;
  downloads: number;
  author: string;
  uploadedDate: string;
  description: string;
  keyTopics: string[];
  previewSnippet: string;
  flashcards?: { q: string; a: string }[];
}

export interface CampusEvent {
  id: string;
  title: string;
  category: 'Hackathon' | 'Career & Internship' | 'Academic Workshop' | 'Social & Cultural' | 'Guest Lecture';
  date: string;
  time: string;
  location: string;
  organizer: string;
  attendeesCount: number;
  capacity: number;
  isRsvpd?: boolean;
  description: string;
  highlights: string[];
  featured?: boolean;
}

export interface Scholarship {
  id: string;
  title: string;
  organization: string;
  amount: string;
  deadline: string;
  daysRemaining: number;
  targetFaculty: string;
  minGpa: number;
  studyLevel: 'Undergraduate' | 'Postgraduate' | 'All Degrees';
  requirements: string[];
  description: string;
  directUrl: string;
  isUrgent?: boolean;
}

export interface PastPaper {
  id: string;
  courseCode: string;
  courseName: string;
  year: number;
  semester: 'Semester 1' | 'Semester 2' | 'Summer Session';
  examType: 'Final Examination' | 'Mid-Term Exam' | 'Supplementary';
  faculty: string;
  hasMarkingScheme: boolean;
  difficultyRating: number; // 1 to 5
  studentRatingCount: number;
  totalQuestions: number;
  durationMinutes: number;
  sampleQuestions: { qNum: number; prompt: string; marks: number }[];
}

export const INITIAL_MATERIALS: LearningMaterial[] = [
  {
    id: 'mat-1',
    title: 'Distributed Systems & Microservices Architecture Handout',
    courseCode: 'CS402',
    courseName: 'Distributed Computing Systems',
    faculty: 'Engineering & CS',
    format: 'Summary Notes',
    fileSize: '4.2 MB',
    pagesOrDuration: '38 pages',
    upvotes: 428,
    downloads: 1240,
    author: 'Prof. Marcus Vance & TAs',
    uploadedDate: 'Oct 28, 2026',
    description: 'Comprehensive synthesized guide covering CAP theorem, Paxos/Raft consensus algorithms, vector clocks, RPC mechanics, and Byzantine fault tolerance with architectural diagrams.',
    keyTopics: ['Consensus Protocols', 'CAP Theorem', 'Eventual Consistency', 'gRPC & Protobuf', 'Raft Leader Election'],
    previewSnippet: `1.1 System Models & Asynchronous Assumptions
In distributed computing, we model the system as a collection of independent nodes communicating solely via message passing across an unreliable network...
Key invariant: Under asynchronous network models with crash-stop failures, Fischer-Lynch-Paterson (FLP) impossibility dictates no deterministic consensus can guarantee safety & liveness simultaneously.`,
    flashcards: [
      { q: 'What does the CAP theorem state?', a: 'A distributed data store can simultaneously provide at most two of three guarantees: Consistency, Availability, and Partition Tolerance.' },
      { q: 'What is the primary role of a heartbeat in Raft consensus?', a: 'Heartbeats from the elected leader maintain authority and reset followers election timers to prevent unwarranted split-vote elections.' },
      { q: 'Define Byzantine Fault Tolerance.', a: 'The ability of a distributed cluster to function correctly even when certain nodes exhibit arbitrary or malicious behaviors, including transmitting conflicting information to peers.' }
    ]
  },
  {
    id: 'mat-2',
    title: 'Biochemistry: Metabolic Pathways & Enzymatic Kinetics Formula Sheet',
    courseCode: 'BCH210',
    courseName: 'Cellular Biochemistry',
    faculty: 'Health & Medicine',
    format: 'Cheat Sheet',
    fileSize: '1.8 MB',
    pagesOrDuration: '6 pages',
    upvotes: 592,
    downloads: 2100,
    author: 'Honors Pre-Med Society',
    uploadedDate: 'Nov 02, 2026',
    description: 'Ultra-high-yield review sheet mapping Glycolysis, the Citric Acid Cycle, Oxidative Phosphorylation, Michaelis-Menten kinetic derivations, and allosteric enzyme regulation.',
    keyTopics: ['Michaelis-Menten Equations', 'Lineweaver-Burk Plots', 'Krebs Cycle Steps', 'ATP Synthase Complex V'],
    previewSnippet: `Enzyme Kinetics Formulation:
V0 = (Vmax * [S]) / (Km + [S])
Where Km represents the substrate concentration at which velocity is half of maximal (Vmax/2).
Competitive Inhibition: Km increases, Vmax remains unchanged.
Non-Competitive Inhibition: Km unchanged, Vmax decreases.`,
    flashcards: [
      { q: 'How does a competitive inhibitor alter Km and Vmax?', a: 'Km increases (lower apparent affinity), while Vmax remains unchanged because high substrate concentration overcomes inhibition.' },
      { q: 'What is the net yield of ATP from one glucose molecule through aerobic respiration?', a: 'Approximately 30 to 32 ATP equivalents under standard eukaryotic mitochondrial transport.' }
    ]
  },
  {
    id: 'mat-3',
    title: 'Financial Valuation Modeling & Discounted Cash Flow (DCF) Guide',
    courseCode: 'FIN330',
    courseName: 'Corporate Valuation & Mergers',
    faculty: 'Business & Econ',
    format: 'PDF',
    fileSize: '8.5 MB',
    pagesOrDuration: '52 pages',
    upvotes: 310,
    downloads: 870,
    author: 'Student Investment Fund',
    uploadedDate: 'Oct 14, 2026',
    description: 'Practical handbook on financial modeling: WACC calculation, terminal growth vs exit multiple approaches, sensitivity tables, and comparable company analysis.',
    keyTopics: ['WACC Calculation', 'Terminal Value', 'Free Cash Flow to Firm (FCFF)', 'Sensitivity Matrices'],
    previewSnippet: `Unlevered Free Cash Flow (UFCF) Calculation:
EBIT * (1 - Tax Rate) + D&A - CapEx - Change in Net Working Capital (NWC).
Terminal Value = (UFCF_n * (1 + g)) / (WACC - g)`,
    flashcards: [
      { q: 'Why do we use Unlevered Beta when modeling comparable companies?', a: 'Unlevered beta isolates operational business risk by removing the distortion of capital structure and debt obligations.' }
    ]
  },
  {
    id: 'mat-4',
    title: 'Quantum Mechanics I: Wave Mechanics & Perturbation Theory',
    courseCode: 'PHY301',
    courseName: 'Modern Physics & Quantum States',
    faculty: 'Natural Sciences',
    format: 'Summary Notes',
    fileSize: '5.1 MB',
    pagesOrDuration: '44 pages',
    upvotes: 275,
    downloads: 640,
    author: 'Physics Undergraduate League',
    uploadedDate: 'Oct 20, 2026',
    description: 'Detailed derivations of the time-independent Schrödinger equation, particle in a 1D/3D box, quantum harmonic oscillator ladder operators, and hydrogen atom orbitals.',
    keyTopics: ['Bra-Ket Notation', 'Schrödinger Equation', 'Ladder Operators a & a†', 'Zeeman Effect'],
    previewSnippet: `Time-Independent Schrödinger Equation:
Ĥ |ψ⟩ = E |ψ⟩
Where the Hamiltonian operator Ĥ = (-ħ² / 2m) ∇² + V(r).
Boundary condition for infinite square well: ψ(0) = 0 and ψ(L) = 0 yields quantized energy levels En = (n² π² ħ²) / (2mL²).`,
    flashcards: [
      { q: 'What does the commutator [x, p] equal in canonical quantization?', a: 'i * ħ (where ħ is the reduced Planck constant).' }
    ]
  },
  {
    id: 'mat-5',
    title: 'Constitutional Law: Judicial Review & Separation of Powers',
    courseCode: 'LAW105',
    courseName: 'Foundations of Constitutional Law',
    faculty: 'Humanities & Law',
    format: 'Summary Notes',
    fileSize: '3.4 MB',
    pagesOrDuration: '30 pages',
    upvotes: 340,
    downloads: 915,
    author: 'Moot Court Honor Society',
    uploadedDate: 'Sep 30, 2026',
    description: 'Synthesis of landmark supreme jurisprudence, commerce clause scopes, executive discretion boundaries, and procedural due process frameworks.',
    keyTopics: ['Marbury Doctrine', 'Commerce Clause Jurisprudence', 'Strict Scrutiny Test', 'Nondelegation Doctrine'],
    previewSnippet: `Tiers of Judicial Scrutiny:
1. Strict Scrutiny: Compelling government interest, narrowly tailored, least restrictive means.
2. Intermediate Scrutiny: Important government objective, substantially related.
3. Rational Basis: Legitimate state interest, rationally related.`,
    flashcards: [
      { q: 'When is strict scrutiny invoked?', a: 'When a law infringes on a fundamental constitutional right or targets a suspect classification (such as race or national origin).' }
    ]
  },
  {
    id: 'mat-6',
    title: 'Full-Stack Web Architectures & React 19 State Patterns',
    courseCode: 'CS260',
    courseName: 'Modern Web Engineering',
    faculty: 'Engineering & CS',
    format: 'Cheat Sheet',
    fileSize: '2.1 MB',
    pagesOrDuration: '10 pages',
    upvotes: 680,
    downloads: 2450,
    author: 'DevClub Campus Chapter',
    uploadedDate: 'Nov 04, 2026',
    description: 'Modern reference for React 19 Actions, server components, optimistic mutations, Tailwind CSS v4 design systems, and TypeScript generics for frontend developers.',
    keyTopics: ['Server Actions', 'useOptimistic', 'Client Boundaries', 'Tailwind v4 Token Architecture'],
    previewSnippet: `React 19 Action Paradigm:
Async state transitions can be managed natively without boilerplate dispatchers:
const [isPending, startTransition] = useTransition();
startTransition(async () => { await mutateData(); });`,
    flashcards: [
      { q: 'What is the primary benefit of React Server Components?', a: 'They execute strictly on the server without shipping JavaScript runtime code to the browser bundle, drastically reducing initial load size.' }
    ]
  }
];

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'evt-1',
    title: 'Campus HackAI 2026: 36-Hour Open Innovation Hackathon',
    category: 'Hackathon',
    date: 'Nov 14 - 16, 2026',
    time: 'Starts Fri 6:00 PM',
    location: 'Engineering Innovation Atrium & Makerspace',
    organizer: 'AI Student Guild & Google Developer Student Club',
    attendeesCount: 384,
    capacity: 450,
    isRsvpd: true,
    featured: true,
    description: 'Join over 400 builders, designers, and students to build cutting-edge applications using Gemini 2.5/Flash, web tech, robotics, and cloud tools. Over $15,000 in grand prizes and sponsor bounties.',
    highlights: ['Free meals & 24/7 Red Bull / coffee station', 'Direct mentoring from Google & tech alumni', 'Hardware lab access (Raspberry Pi 5, VR headsets)']
  },
  {
    id: 'evt-2',
    title: 'Annual STEM & Tech Internship Career Expo',
    category: 'Career & Internship',
    date: 'Nov 18, 2026',
    time: '10:00 AM - 4:00 PM',
    location: 'University Grand Recreation Hall',
    organizer: 'University Career Center',
    attendeesCount: 1250,
    capacity: 2000,
    isRsvpd: false,
    featured: true,
    description: 'Connect with over 75 recruiting engineering, bio-tech, fintech, and research organizations seeking summer 2027 interns and graduating full-time seniors. Professional headshots provided free.',
    highlights: ['75+ verified recruiters', 'Free on-site LinkedIn headshot booth', 'Resume rapid-review stations']
  },
  {
    id: 'evt-3',
    title: 'Finals Revision Jam & Peer Tutoring Night',
    category: 'Academic Workshop',
    date: 'Nov 22, 2026',
    time: '5:00 PM - 11:00 PM',
    location: 'Central Library 3rd Floor Commons',
    organizer: 'Academic Success Center',
    attendeesCount: 180,
    capacity: 250,
    isRsvpd: false,
    featured: false,
    description: 'Drop-in tutoring for Calculus I-III, Organic Chemistry, Linear Algebra, and Intro CS. Whiteboards, practice test walkthroughs, and complimentary midnight pizza.',
    highlights: ['Peer tutors on standby for STEM & Econ', 'Quiet breakout study zones', 'Free coffee & midnight study snacks']
  },
  {
    id: 'evt-4',
    title: 'Quantum Computing Frontiers: Guest Lecture with Dr. Elena Rostova',
    category: 'Guest Lecture',
    date: 'Nov 25, 2026',
    time: '2:30 PM - 4:00 PM',
    location: 'Kresge Physics Auditorium (Hall A)',
    organizer: 'Department of Physics & Quantum Institute',
    attendeesCount: 210,
    capacity: 300,
    isRsvpd: false,
    featured: false,
    description: 'Dr. Rostova discusses error-mitigated NISQ systems and practical superconducting qubit algorithms in quantum chemistry. Q&A and networking session following the talk.',
    highlights: ['Live hardware demonstration', 'Open student Q&A', 'Undergraduate research opportunity sign-ups']
  },
  {
    id: 'evt-5',
    title: 'Autumn Campus Cultural Night & Food Market',
    category: 'Social & Cultural',
    date: 'Nov 28, 2026',
    time: '6:30 PM - 10:00 PM',
    location: 'Student Union Plaza & Amphitheater',
    organizer: 'International Student Association & Arts Union',
    attendeesCount: 620,
    capacity: 1000,
    isRsvpd: true,
    featured: false,
    description: 'Celebrate the diversity of our student body with over 25 cultural food stalls, musical and dance performances, and art showcases representing over 40 nationalities.',
    highlights: ['Cultural food sampling tokens', 'Live traditional & modern band sets', 'Interactive art installation']
  }
];

export const INITIAL_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'sch-1',
    title: 'Dean’s Excellence Merit Award in Engineering & CS',
    organization: 'Faculty of Engineering Alumni Endowment',
    amount: '$10,000 / year',
    deadline: 'Dec 05, 2026',
    daysRemaining: 28,
    targetFaculty: 'Engineering & CS',
    minGpa: 3.6,
    studyLevel: 'Undergraduate',
    requirements: ['Unofficial Academic Transcript', 'Resume / CV with projects', '750-word statement on technical impact', '1 Academic recommendation letter'],
    description: 'Awarded to sophomore or junior students demonstrating exceptional academic standing, undergraduate research contributions, or impactful open-source software and hardware leadership.',
    directUrl: 'https://scholarships.campus.edu/apply/deans-excellence-2026',
    isUrgent: false
  },
  {
    id: 'sch-2',
    title: 'Global Leaders & International Student Equity Grant',
    organization: 'International Education Trust Fund',
    amount: '$6,500 one-time',
    deadline: 'Nov 20, 2026',
    daysRemaining: 13,
    targetFaculty: 'All Faculties',
    minGpa: 3.0,
    studyLevel: 'All Degrees',
    requirements: ['Statement of financial context', 'Proof of active international student enrollment', 'Community engagement essay (500 words)'],
    description: 'Designed to offset tuition and cost-of-living expenses for international students exhibiting strong community involvement and leadership within student societies.',
    directUrl: 'https://scholarships.campus.edu/apply/global-equity-2026',
    isUrgent: true
  },
  {
    id: 'sch-3',
    title: 'Women in STEM Innovation Fellowship',
    organization: 'Tech For Tomorrow Foundation',
    amount: '$12,500 + Tech Mentorship',
    deadline: 'Dec 15, 2026',
    daysRemaining: 38,
    targetFaculty: 'Engineering, Physics, Math, CS',
    minGpa: 3.4,
    studyLevel: 'Undergraduate',
    requirements: ['Portfolio of code or research projects', 'Two references', '5-minute recorded video introduction or essay'],
    description: 'Supports female and non-binary students pursuing degrees in computer science, robotics, or mathematics. Includes direct pairing with a senior software architect mentor.',
    directUrl: 'https://scholarships.campus.edu/apply/women-in-stem-2026',
    isUrgent: false
  },
  {
    id: 'sch-4',
    title: 'Undergraduate Medical & Healthcare Research Fellowship',
    organization: 'Health Sciences Collaborative Foundation',
    amount: '$5,000 Summer Research Stipend',
    deadline: 'Nov 25, 2026',
    daysRemaining: 18,
    targetFaculty: 'Health & Medicine, Bio-Engineering',
    minGpa: 3.5,
    studyLevel: 'Undergraduate',
    requirements: ['Lab PI endorsement letter', '1,000-word proposed research hypothesis', 'Official grade transcript'],
    description: 'Provides direct financial support for students conducting wet-lab experiments or clinical epidemiological analysis under faculty supervision during academic breaks.',
    directUrl: 'https://scholarships.campus.edu/apply/med-research-stipend',
    isUrgent: true
  },
  {
    id: 'sch-5',
    title: 'Future Entrepreneurs & Economic Impact Bursary',
    organization: 'Kaufman Center for Venture Creation',
    amount: '$8,000 Seed Grant',
    deadline: 'Jan 10, 2027',
    daysRemaining: 64,
    targetFaculty: 'Business & Econ, Interdisciplinary',
    minGpa: 2.8,
    studyLevel: 'All Degrees',
    requirements: ['Executive summary pitch deck (10 slides)', 'Market validation evidence', 'Detailed budget expenditure forecast'],
    description: 'Funding non-dilutive capital to student founders building scalable technology, social enterprises, or sustainable products.',
    directUrl: 'https://scholarships.campus.edu/apply/venture-bursary-2027',
    isUrgent: false
  }
];

export const INITIAL_PAST_PAPERS: PastPaper[] = [
  {
    id: 'pp-1',
    courseCode: 'CS301',
    courseName: 'Algorithms & Computational Complexity',
    year: 2024,
    semester: 'Semester 1',
    examType: 'Final Examination',
    faculty: 'Engineering & CS',
    hasMarkingScheme: true,
    difficultyRating: 4.2,
    studentRatingCount: 88,
    totalQuestions: 6,
    durationMinutes: 180,
    sampleQuestions: [
      { qNum: 1, prompt: 'Prove by reduction that the Independent Set problem is NP-complete given that 3-SAT is NP-complete.', marks: 15 },
      { qNum: 2, prompt: 'Formulate an optimal O(V + E log V) algorithm to find the shortest path in a directed graph with at most k negative edges.', marks: 20 },
      { qNum: 3, prompt: 'Derive the amortized time complexity of a Fibonacci heap during an extract-min operation using the potential method.', marks: 15 }
    ]
  },
  {
    id: 'pp-2',
    courseCode: 'MATH205',
    courseName: 'Multivariable Calculus & Vector Fields',
    year: 2024,
    semester: 'Semester 2',
    examType: 'Final Examination',
    faculty: 'Natural Sciences',
    hasMarkingScheme: true,
    difficultyRating: 3.9,
    studentRatingCount: 114,
    totalQuestions: 5,
    durationMinutes: 150,
    sampleQuestions: [
      { qNum: 1, prompt: 'Evaluate the surface integral ∬_S F · dS using the Divergence Theorem, where F(x, y, z) = (x³ + sin y)i + (y³ + cos z)j + (z³ + x)k across the unit sphere.', marks: 20 },
      { qNum: 2, prompt: 'Apply Stokes Theorem to calculate the circulation of vector field F around the boundary curve C.', marks: 20 }
    ]
  },
  {
    id: 'pp-3',
    courseCode: 'ECON102',
    courseName: 'Principles of Macroeconomics',
    year: 2023,
    semester: 'Semester 1',
    examType: 'Mid-Term Exam',
    faculty: 'Business & Econ',
    hasMarkingScheme: true,
    difficultyRating: 2.7,
    studentRatingCount: 160,
    totalQuestions: 25,
    durationMinutes: 90,
    sampleQuestions: [
      { qNum: 1, prompt: 'Using the IS-LM framework, illustrate the short-run and medium-run impact of a contractionary monetary policy on equilibrium output and real interest rates.', marks: 15 },
      { qNum: 2, prompt: 'Explain the difference between CPI inflation and the GDP deflator during an oil price shock.', marks: 10 }
    ]
  },
  {
    id: 'pp-4',
    courseCode: 'BIO201',
    courseName: 'Genetics, Molecular Biology & Genomics',
    year: 2023,
    semester: 'Semester 2',
    examType: 'Final Examination',
    faculty: 'Health & Medicine',
    hasMarkingScheme: false,
    difficultyRating: 4.5,
    studentRatingCount: 72,
    totalQuestions: 8,
    durationMinutes: 180,
    sampleQuestions: [
      { qNum: 1, prompt: 'Describe the molecular mechanism of CRISPR-Cas9 directed DNA double-strand breaks and compare NHEJ versus HDR repair pathways.', marks: 15 },
      { qNum: 2, prompt: 'Analyze a pedigree chart exhibiting an autosomal dominant condition with incomplete penetrance (calculate probability of offspring manifestation).', marks: 18 }
    ]
  },
  {
    id: 'pp-5',
    courseCode: 'CS101',
    courseName: 'Introduction to Computer Science & Python',
    year: 2024,
    semester: 'Semester 1',
    examType: 'Mid-Term Exam',
    faculty: 'Engineering & CS',
    hasMarkingScheme: true,
    difficultyRating: 2.1,
    studentRatingCount: 230,
    totalQuestions: 5,
    durationMinutes: 75,
    sampleQuestions: [
      { qNum: 1, prompt: 'Write a recursive Python function to compute the edit distance (Levenshtein distance) between two strings with memoization.', marks: 20 },
      { qNum: 2, prompt: 'Analyze the worst-case and average-case time complexities of Quicksort with random pivot selection.', marks: 15 }
    ]
  }
];

export const MASTER_PROMPT_BLUEPRINT = `You are a Senior Full-Stack Software Engineer (15+ years experience) and Principal UI/UX Designer.
Your task is to build a modern, high-performance, full-featured "Campus Student Resource Hub" web application designed for university and college students.

### 1. CORE PURPOSE & PERSONA
The platform empowers students to excel academically, stay connected to campus life, secure financial aid, and prepare for examinations through four primary pillars:
1. Learning Materials & Notes Repository (Organized by faculty, course, format with preview, flashcards, and downloads)
2. Campus Events & Happenings (Hackathons, career fairs, workshops, club meetups with RSVP and reminders)
3. Scholarships & Financial Aid Portal (Deadlines countdown, eligibility matcher, requirements checklist, application guidance)
4. Past Examination Papers & Marking Schemes (Indexed by academic year, course code, semester, with sample questions and difficulty ratings)

### 2. UI/UX DESIGN SYSTEM & QUALITY BAR
- Visual Direction: Sophisticated academic portal aesthetic (clean off-white or slate background, clear hierarchy, high legibility).
- Typography: Characterful modern display font (e.g. Outfit, Plus Jakarta Sans) paired with a clean body sans and monospace for course codes and metrics.
- Anti-Slop Discipline:
  * No generic pills or badge sandwiches. Render metadata as clean, unboxed text separated by subtle dots (·).
  * No fake metrics or mechanical code prefixes like "// 01 ARCHITECTURE".
  * 60-30-10 color rule: 60% neutral background, 30% structural surfaces/cards, 10% high-intent focal accents (e.g. indigo/royal blue for primary actions).
  * Tabular numbers (tabular-nums) for dates, ratings, and course codes.
  * Dark and Light theme support with seamless transitions and zero contrast defects.

### 3. TECHNICAL SPECIFICATIONS & ARCHITECTURE
- Framework: React 19 + TypeScript + Vite + Tailwind CSS v4.
- Icons: Lucide React (used strictly for functional affordances).
- Animation: Smooth transitions with motion/react or CSS transitions (settling <= 200ms).
- State Architecture:
  * Reactive filtering, search, and faculty/category segmentation.
  * Local persistence for bookmarked resources, RSVPed events, and GPA calculations.
  * Interactive previews: In-app modal viewer for reading notes, flashcard study modes, and question paper inspectors.
- Extensibility:
  * Upload/Contribute modal for students to share their lecture notes or past papers.
  * GPA Calculator and semester credit target planner.
  * AI Study Guide / Prompt Generator for custom study roadmaps.

### 4. DATA MODEL SCHEMA (FIRESTORE / RELATIONAL)
- resources: { id, title, courseCode, courseName, faculty, format, fileSize, pages, upvotes, downloads, author, keyTopics, previewSnippet, flashcards }
- events: { id, title, category, date, time, location, organizer, attendeesCount, capacity, isRsvpd, highlights, description }
- scholarships: { id, title, organization, amount, deadline, daysRemaining, targetFaculty, minGpa, requirements, description, directUrl }
- past_papers: { id, courseCode, courseName, year, semester, examType, faculty, hasMarkingScheme, difficultyRating, sampleQuestions }

Build this application completely, end-to-end, with responsive desktop and mobile views, instant client-side interactivity, and realistic, rich academic data.`;
