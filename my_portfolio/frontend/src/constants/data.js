// ─────────────────────────────────────────
//  PORTFOLIO DATA  –  edit this file only
// ─────────────────────────────────────────

export const OWNER = {
  name: "Nisadu Nimsitha",
  title: "Undergraduate Student",
  university: "University of Sri Jayewardenepura",
  email: "nisadu2003@gmail.com",
  github: "https://github.com/nisa2003-ops",
  linkedin: "https://www.linkedin.com/in/nisadu-nimsitha-512a24348?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", // place your PDF in frontend/public/
  // avatarUrl: "/avatar.jpg", // uncomment when you have a photo
  bio: [
    "I'm a Computer Science student at the University of Sri Jayewardenepura, with a genuine passion for coding and technology. I love turning ideas into real, working software that people can actually use.",
    "From mobile apps to full-stack web experiences, I enjoy the entire process of building — designing the interface, writing the logic, and seeing it all come together. I'm always exploring new technologies and pushing my skills further.",
  ],
  stats: [
    { value: "4+", label: "Projects" },
    { value: "3+", label: "Tech Stacks" },
  ],
};

export const NAV_LINKS = ["About", "Education", "Projects", "Skills", "Contact"];

export const PROJECTS = [
  {
    id: "notes-summarizer",
    title: "AI Notes Summarizer",
    description:
      "Flutter app that captures notes via OCR (Google ML Kit) and summarises them with Gemini 2.5 Flash. Features dark-themed UI and PDF export.",
    tags: ["Flutter", "Gemini API", "Google ML Kit", "OCR"],
    color: "#c9a96e",
    status: "In Development",
    demo: null,
    github: "",
    mockupIcon: "📝",
    mockupBg: "linear-gradient(135deg,#1a1612,#2a2218,#1a1612)",
  },
  {
    id: "Airline Reservation System",
    title: "Airline Reservation System",
    description:
      "Java-based airline booking system with database integration.",
    tags: ["Java", "JavaFX", "JDBC", "Scene Builder"],
    color: "#8eafc2",
    status: "Completed",
    demo: null,
    github: "https://github.com/nisa2003-ops/AirlineReservationSystem",
    mockupIcon: "✈️",
    mockupBg: "linear-gradient(135deg,#111820,#1a2830,#111820)",
  },
  {
    id: "food_order",
    title: "Food Ordering System",
    description:
      "Full Java stack application for managing online food orders.",
    tags: ["Java", "Linked-List", "Merge Sort"],
    color: "#a8c5a0",
    status: "Completed",
    demo: null,
    github: "https://github.com/nisa2003-ops/SimpleFoodOrderingSystem",
    mockupIcon: "🍛",
    mockupBg: "linear-gradient(135deg,#101812,#182018,#101812)",
  },
  {
    id: "travel",
    title: "Travel Planner",
    description:
      "Lanka Travel Planner is an AI-powered trip planning tool that helps you explore Sri Lanka with personalized itineraries, interactive maps, and smart budget estimates.",
    tags: ["React", "Node", "Leaflet", "Gemini API"],
    color: "#c4a8c5",
    status: "Coming Soon",
    demo: null,
    github: "",
    mockupIcon: "⛰️",
    mockupBg: "linear-gradient(135deg,#180f18,#221522,#180f18)",
  },
  {
    id: "inventory",
    title: "Inventory Manager",
    description:
      "PHP-based inventory system with full CRUD, customer management, and FK-safe deletion. Hosted on XAMPP with a MySQL backend.",
    tags: ["PHP", "MySQL", "HTML", "JavsScript"],
    color: "#c5b8a8",
    status: "Completed",
    demo: null,
    github: "https://github.com/nisa2003-ops/Inventory-Management-System",
    mockupIcon: "📦",
    mockupBg: "linear-gradient(135deg,#181410,#241c14,#181410)",
  },
];

export const STATUS_COLORS = {
  Completed: "#a8c5a0",
  "In Development": "#c9a96e",
  "Coming Soon": "#8eafc2",
};

export const EDUCATION = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Sri Jayewardenepura",
    period: "2024 — Present",
    location: "Nugegoda, Sri Lanka",
    highlights: [
      "Database Design & ER Modelling",
      "Data Structures & Algorithms",
      "Software Engineering",
      "Web Technologies",
    ],
  },
  {
    degree: "G.C.E Advanced Level",
    institution: "Ananda College",
    period: "2020-2022",
    location: "Colombo 10",
    highlights: [
      "Mathematics - C",
      "Physics - C",
      "Chemistry - B",
    ],
  },
  {
    degree: "G.C.E Ordinary Level",
    institution: "St.Peter's College",
    period: "2014-2019",
    location: "Colombo 10",
    highlights: [
      "Obtained A pass for all 9 subjects",
    ],
  },
];

export const SKILL_GROUPS = [
  {
    category: "Mobile",
    icons: [
      { cls: "devicon-flutter-plain colored", label: "Flutter" },
      { cls: "devicon-dart-plain colored", label: "Dart" },
    ],
  },
  {
    category: "Frontend",
    icons: [
      { cls: "devicon-react-original colored", label: "React" },
      { cls: "devicon-javascript-plain colored", label: "JavaScript" },
      { cls: "devicon-html5-plain colored", label: "HTML5" },
      { cls: "devicon-css3-plain colored", label: "CSS3" },
      { cls: "devicon-vitejs-plain colored", label: "Vite" },
    ],
  },
  {
    category: "Backend",
    icons: [
      { cls: "devicon-php-plain colored", label: "PHP" },
      { cls: "devicon-python-plain colored", label: "Python" },
      { cls: "devicon-mysql-plain colored", label: "MySQL" },
      { cls: "devicon-java-plain colored", label: "Java" },
      { cls: "devicon-javafx-plain colored", label: "JavaFX" }
    ],
  },
  {
    category: "Tools",
    icons: [
      { cls: "devicon-git-plain colored", label: "Git" },
      { cls: "devicon-github-original", label: "GitHub" },
      { cls: "devicon-vscode-plain colored", label: "VS Code" },
      { cls: "devicon-figma-plain colored", label: "Figma" },
      { cls: "devicon-r-plain colored", label: "R" }
    ],
  },
];
