export const OWNER = {
  name: "Nisadu Nimsitha",
  title: "Computer Science Undergraduate · Cloud, DevOps & Networking",
  university: "University of Sri Jayawardenepura",
  location: "Colombo, Sri Lanka",
  email: "nisadu2003@gmail.com",
  github: "https://github.com/nisa2003-ops",
  linkedin: "https://www.linkedin.com/in/nisadu-nimsitha-512a24348",
  bio: [
    "I’m a Computer Science undergraduate interested in cloud infrastructure, DevOps, networking, backend systems, and machine learning. I enjoy taking applications beyond development by containerizing and deploying them, building CI/CD pipelines, working with databases and networking, and testing how systems perform under realistic workloads.",
  ],
  resumeUrl: "/Nisadu_Nimsitha_CV.pdf"
};

export const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Education", id: "education" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Certifications", id: "certifications" },
  { label: "Contact", id: "contact" },
];

export const CAREER_JOURNEY = [
  {
    id: "sathsara-dahana",
    role: "Web Development Team Member",
    organization: "Sathsara Dahana 2026",
    subtitle: "Faculty of Applied Sciences · University of Sri Jayewardenepura",
    category: "university",
    categoryLabel: "University Leadership & Web Initiatives",
    categoryBadge: "🏛️ University Leadership & Web Initiatives",
    logo: "/sathsara-dahana-logo.png",
    period: "2026",
    link: "https://www.sathsaradahana.live/",
    description:
      "Contributed as a member of the web development team to build and launch the official web platform for Sathsara Dahana 2026 — the premier annual cultural concert organized by the Faculty of Applied Sciences, University of Sri Jayewardenepura.",
    highlights: [
      "Collaborated with the team to develop interactive features including the retro terminal bootloader (SATHSARA_DAHANA.EXE), dynamic canvas visuals, and themed storytelling sections.",
      "Assisted in developing the live selection results portal enabling audition candidates to verify outcomes across Dancing, Singing, and Instrumental categories.",
      "Helped implement real-time countdown timers, interactive timeline milestones, and a mobile-responsive UI for thousands of university visitors.",
    ],
    skills: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Canvas API",
      "UI/UX Design",
      "Web Development",
      "Team Collaboration",
    ],
  },
  {
    id: "startek",
    role: "Customer Care Executive",
    organization: "Startek",
    subtitle: "Global Customer Engagement & Business Services",
    category: "industry",
    categoryLabel: "Professional Experience",
    categoryBadge: "🏢 Professional Experience",
    logo: "/startek-logo.jpg",
    period: "Previous",
    description:
      "Supported enterprise customers with technical inquiries, active listening, and high-impact issue resolution under fast-paced service SLAs.",
    highlights: [
      "Delivered empathetic, structured troubleshooting and first-contact issue resolution under strict service level standards.",
      "Strengthened professional communication, active listening, and agile problem solving within cross-functional support teams.",
    ],
    skills: [
      "Customer Service",
      "Communication",
      "Problem Solving",
      "Active Listening",
      "Teamwork",
    ],
  },
];

export const LEADERSHIP = [
  {
    role: "Web Development Team Member",
    organization: "Sathsara Dahana 2026",
    subtitle: "Faculty of Applied Sciences · University of Sri Jayewardenepura",
    logo: "/sathsara-dahana-logo.png",
    period: "2026",
    link: "https://www.sathsaradahana.live/",
    description:
      "Contributed as a member of the web development team to build and launch the official web platform for Sathsara Dahana 2026 — the premier annual cultural concert organized by the Faculty of Applied Sciences, University of Sri Jayewardenepura.",
    highlights: [
      "Collaborated with the team to develop interactive features including the retro terminal bootloader (SATHSARA_DAHANA.EXE), dynamic canvas visuals, and themed storytelling sections.",
      "Assisted in developing the live selection results portal enabling audition candidates to verify outcomes across Dancing, Singing, and Instrumental categories.",
      "Helped implement real-time countdown timers, interactive timeline milestones, and a mobile-responsive UI for thousands of university visitors.",
    ],
    skills: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Canvas API",
      "UI/UX Design",
      "Web Development",
      "Team Collaboration",
    ],
  },
];

export const EXPERIENCE = [
  {
    role: "Customer Care Executive",
    company: "Startek",
    logo: "/startek-logo.jpg",
    description:
      "Supported customers with their inquiries, provided clear solutions, and helped deliver a positive service experience.",
    skills: [
      "Customer Service",
      "Communication",
      "Problem Solving",
      "Active Listening",
      "Teamwork",
    ],
  },
];

export const PROJECTS = [
  {
    id: "lanka-microjob",
    title: "Lanka MicroJob",
    description:
      "A microservices-based job marketplace built with Spring Boot and React, containerized with Docker and deployed on AWS EC2 using Kubernetes (k3s), Amazon ECR, CodePipeline, CodeBuild, and Amazon RDS PostgreSQL.",
    contribution:
      "Built the React experience and Spring Boot microservices for role-based access, job matching, applications, placements, notifications and approvals.",
    tags: ["Spring Boot", "React", "Docker", "Kubernetes", "AWS", "PostgreSQL", "k6"],
    moreTags: ["EC2", "k3s", "Amazon ECR", "CodePipeline", "CodeBuild", "Amazon RDS", "Jenkins"],
    architecture: ["Vercel", "Elastic IP", "AWS EC2", "k3s Kubernetes", "API Gateway", "Spring Boot Microservices", "Amazon RDS PostgreSQL"],
    pipeline: ["GitHub", "AWS CodePipeline", "AWS CodeBuild", "Amazon ECR", "EC2 / k3s"],
    color: "#d4a84f",
    status: "Completed",
    demo: "https://lanka-microjob.vercel.app/",
    github: "https://github.com/nisa2003-ops/Lanka-Microjob-V1",
    caseStudy: "https://medium.com/@nisadu2003/from-docker-compose-to-kubernetes-on-aws-deploying-lanka-microjob-with-ci-cd-rds-and-load-6bfe6eea0be4",
    mockupIcon: "💼",
    mockupBg: "linear-gradient(135deg,#1a1612,#2a2218,#1a1612)",
  },
  {
    id: "cloudops",
    title: "CloudOps - Automated Cloud Deployment & Reliability Platform",
    description:
        "A cloud deployment, observability, and Site Reliability Engineering (SRE) platform featuring automated infrastructure provisioning, zero-secret CI/CD, and real-time telemetry.",
    contribution:
        "Engineered modular Terraform IaC for AWS VPC/IAM/EC2/ECR, zero-trust GitHub Actions CI/CD with OIDC federation & Trivy security scanning, custom Prometheus RED telemetry, Grafana dashboards, and automated rollback runbooks.",
    tags: [
      "AWS",
      "Terraform",
      "Docker",
      "Prometheus",
      "Grafana",
      "GitHub Actions",
      "FastAPI",
      "Python",
    ],
    color: "#38bdf8",
    status: "In progress",
    demo: null,
    github: "",
    mockupIcon: "☁️",
    mockupBg: "linear-gradient(135deg,#0b1528,#13284c,#0b1528)",
  },
  {
    id: "dengue",
    title: "Dengue Outbreak Risk Classifier",
    description:
      "A machine learning system that predicts dengue outbreak risk using historical case and weather data.",
    contribution:
      "Developing the automated training, MLflow experiment tracking, FastAPI serving, CI/CD and model monitoring workflow.",
    tags: ["Python", "Scikit-learn", "MLflow", "FastAPI"],
    color: "#a8c5b0",
    status: "Completed",
    demo: null,
    github: "https://github.com/nisa2003-ops/Dengue-Risk-MLOps-1",
    mockupIcon: "🦟",
    mockupBg: "linear-gradient(135deg,#0d1812,#14251a,#0d1812)",
  },
  {
    id: "Airline Reservation System",
    title: "Airline Reservation System",
    description:
      "A desktop system for searching flights and managing airline reservations.",
    contribution:
      "Built the application workflow and database integration with Java, JavaFX and JDBC.",
    tags: ["Java", "JavaFX", "JDBC", "Scene Builder"],
    color: "#8eafc2",
    status: "Completed",
    demo: null,
    github: "https://github.com/nisa2003-ops/AirlineReservationSystem",
    mockupIcon: "✈️",
    mockupBg: "linear-gradient(135deg,#111820,#1a2830,#111820)",
  },
  {
    id: "travel",
    title: "Travel Planner",
    description:
      "An AI-powered trip planner for personalized Sri Lankan itineraries, maps and budget estimates.",
    contribution:
      "Built the React planning experience with Node, Leaflet maps and Gemini-powered recommendations.",
    tags: ["React", "Node", "Leaflet", "Gemini API"],
    color: "#c4a8c5",
    status: "Completed",
    demo: null,
    github: "https://github.com/nisa2003-ops/Lanka-Travel-Planner",
    mockupIcon: "⛰️",
    mockupBg: "linear-gradient(135deg,#180f18,#221522,#180f18)",
  },
  {
    id: "inventory",
    title: "Inventory Manager",
    description:
      "A web-based inventory system for managing stock records and customer data.",
    contribution:
      "Built the PHP and MySQL CRUD workflows, customer management and foreign-key-safe deletion.",
    tags: ["PHP", "MySQL", "HTML", "JavaScript"],
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
  "In Progress": "#c9a96e",
  "In Development": "#c9a96e",
  "Coming Soon": "#8eafc2",
};

export const EDUCATION = [
  {
    degree: "BSc(Hons) in Computer Science",
    institution: "University of Sri Jayawardenepura",
    logo: "/education/usj-logo.png",
    logoAlt: "University of Sri Jayewardenepura emblem",
    period: "2024 — Present",
    location: "Nugegoda, Sri Lanka",
    highlights: [
        "Computer Security",
        "Service Oriented Computing",
        "Machine Learning",
        "Data Structures & Algorithms",
        "Data Analysis",
        "Inference Statistics",
        "Regression Analysis",
        "Object Oriented Programming",
        "Database Design & ER Modelling",
    ],
  },
  {
    degree: "G.C.E Advanced Level",
    institution: "Ananda College",
    logo: "/education/ananda-college-logo.png",
    logoAlt: "Ananda College emblem",
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
    logo: "/education/st-peters-college-full-logo.png",
    logoAlt: "St. Peter's College emblem",
    logoStyle: "portrait",
    period: "2014-2019",
    location: "Colombo 04",
    highlights: [
      "Obtained A pass for all 9 subjects",
    ],
  },
];

export const CERTIFICATIONS = [
  {
    id: "cert-1",
    title: "AWS Academy Graduate - Cloud Security Foundations",
    platform: "Amazon Web Services (AWS)",
    date: "July 2026",
    credentialUrl: "https://www.credly.com/badges/0837b3eb-49ed-4e86-a210-a1973df227e6/public_url",
    logo: "/certifications/aws.svg",
    logoAlt: "Amazon Web Services logo",
    logoBackground: "#ffffff",
    color: "#8eafc2",
  },
  {
    id: "cert-2",
    title: "AWS Academy Graduate - Cloud Foundations",
    platform: "Amazon Web Services (AWS)",
    date: "May 2026",
    credentialUrl: "https://www.credly.com/badges/acd4df5d-898e-49c9-8609-7b883f855d70/linked_in_profile",
    logo: "/certifications/aws.svg",
    logoAlt: "Amazon Web Services logo",
    logoBackground: "#ffffff",
    color: "#c9a96e",
  },
  {
    id: "cert-3",
    title: "AWS Academy Graduate - Microservices and CI/CD Pipeline Builder",
    platform: "Amazon Web Services (AWS)",
    date: "August 2026",
    credentialUrl: "https://www.credly.com/badges/3508f16c-bc97-4ca3-98d1-a0808731e073/public_url",
    logo: "/certifications/aws.svg",
    logoAlt: "Amazon Web Services logo",
    logoBackground: "#ffffff",
    color: "#c9a96e",
  },
  {
    id: "cert-4",
    title: "AWS Academy Graduate - Cloud Security Builder",
    platform: "Amazon Web Services (AWS)",
    date: "September 2026",
    credentialUrl: "https://www.credly.com/badges/69c7a723-5514-4544-b8e3-d28712da6f91/public_url",
    logo: "/certifications/aws.svg",
    logoAlt: "Amazon Web Services logo",
    logoBackground: "#ffffff",
    color: "#c9a96e",
  },
  {
    id: "cert-5",
    title: "Introduction to Packet Tracer",
    platform: "Cisco Networking Academy",
    date: "September 2026",
    credentialUrl: "https://www.credly.com/badges/2d0be4e4-a562-4b2a-a779-1f2313a7a4e9/public_url",
    logo: "/certifications/cisco.svg",
    logoAlt: "Cisco logo",
    logoBackground: "#ffffff",
    color: "#c9a96e",
  },

  {
    id: "cert-6",
    title: "YouTube Labs - Kubernetes Crash Course",
    platform: "KodeKloud",
    date: "May 2026",
    credentialUrl: "https://learn.kodekloud.com/certificate/8a90819f-6656-4cc5-ba1a-1e0103bd7e66",
    logo: "/certifications/kodekloud.svg",
    logoAlt: "KodeKloud logo",
    logoBackground: "#111827",
    color: "#8eafc2",
  },
  {
    id: "cert-7",
    title: "Crash Course: Linux For Absolute Beginners",
    platform: "KodeKloud",
    date: "May 2026",
    credentialUrl: "https://learn.kodekloud.com/certificate/16b70d88-49fa-45b6-87ff-315738e5ee4b",
    logo: "/certifications/kodekloud.svg",
    logoAlt: "KodeKloud logo",
    logoBackground: "#111827",
    color: "#a8c5a0",
  },
];

export const SKILL_GROUPS = [
  {
    category: "Cloud & DevOps",
    icons: [
      { cls: "devicon-amazonwebservices-plain-wordmark colored", label: "AWS" },
      { cls: "devicon-docker-plain colored", label: "Docker" },
      { cls: "devicon-kubernetes-plain colored", label: "Kubernetes" },
      { cls: "devicon-linux-plain colored", label: "Linux" },
      { cls: "devicon-jenkins-plain colored", label: "Jenkins" },
      { cls: "devicon-sonarqube-plain colored", label: "SonarQube" },
      { cls: "devicon-nginx-plain colored", label: "Nginx" },
    ],
  },
  {
    category: "Backend",
    icons: [
      { cls: "devicon-spring-plain colored", label: "Spring Boot" },
      { cls: "devicon-fastapi-plain colored", label: "FastAPI" },
      { cls: "devicon-php-plain colored", label: "PHP" },
      { cls: "devicon-javafx-plain colored", label: "JavaFX" },
    ],
  },
  {
    category: "Databases",
    icons: [
      { cls: "devicon-postgresql-plain colored", label: "PostgreSQL" },
      { cls: "devicon-mysql-plain colored", label: "MySQL" },
      { cls: "devicon-mongodb-plain colored", label: "MongoDB" },
      { cls: "devicon-supabase-plain colored", label: "Supabase" },
    ],
  },
  {
    category: "Machine Learning & AI",
    icons: [
      { cls: "devicon-scikitlearn-plain colored", label: "Scikit-learn" },
      { cls: "devicon-pandas-plain colored", label: "Pandas" },
      { cls: "devicon-numpy-plain colored", label: "NumPy" },
      { cls: "devicon-fastapi-plain colored", label: "FastAPI" },
      { cls: "devicon-python-plain colored", label: "XGBoost" },
      { cls: "devicon-python-plain colored", label: "MLflow" },
    ],
  },
  {
    category: "Frontend",
    icons: [
      { cls: "devicon-react-original colored", label: "React" },
      { cls: "devicon-html5-plain colored", label: "HTML5" },
      { cls: "devicon-css3-plain colored", label: "CSS3" },
      { cls: "devicon-vitejs-plain colored", label: "Vite" },
    ],
  },
  {
    category: "Languages",
    icons: [
      { cls: "devicon-python-plain colored", label: "Python" },
      { cls: "devicon-java-plain colored", label: "Java" },
      { cls: "devicon-javascript-plain colored", label: "JavaScript" },
      { cls: "devicon-php-plain colored", label: "PHP" },
      { cls: "devicon-r-plain colored", label: "R" },
    ],
  },
  {
    category: "Tools",
    icons: [
      { cls: "devicon-git-plain colored", label: "Git" },
      { cls: "devicon-github-original", label: "GitHub" },
      { cls: "devicon-intellij-plain colored", label: "IntelliJ IDEA" },
      { cls: "devicon-postman-plain colored", label: "Postman" },
      { cls: "devicon-figma-plain colored", label: "Figma" },
    ],
  },
];
