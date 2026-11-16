import { ServiceItem } from "@/types";

export const servicesData: ServiceItem[] = [
  {
    id: "web-development",
    title: "Web Development",
    explanation: "Responsive, modern websites and web applications engineered with clean code, lightning-fast rendering speeds, and accessible semantic structures.",
    deliverables: [
      "Mobile-first, responsive layouts tested across all viewports",
      "Interactive component architecture using React & Next.js",
      "Semantic HTML & technical SEO compliance for high search visibility",
      "Cross-browser compatibility & Core Web Vitals optimization"
    ],
    technologies: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "HTML5/CSS3"],
    icon: "Globe"
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design & Implementation",
    explanation: "Thoughtful interfaces, design systems, and user-centered digital experiences that make complex tools feel effortless and intuitive.",
    deliverables: [
      "Pixel-perfect translation of wireframes and design files into code",
      "Custom design systems with reusable tokens (colors, typography, spacing)",
      "Accessible micro-interactions and smooth UI transitions",
      "User journey mapping and friction-reducing navigation patterns"
    ],
    technologies: ["Figma to Code", "CSS Variables", "Interaction Design", "Motion UX"],
    icon: "Layout"
  },
  {
    id: "fullstack-applications",
    title: "Full-Stack Applications",
    explanation: "End-to-end web applications combining dynamic frontend interfaces with secure, relational backend architectures and persistent data storage.",
    deliverables: [
      "Modular REST API architecture with clear endpoint contracts",
      "Secure user authentication (bcryptjs password hashing & sessions)",
      "Database connection pooling and CRUD operations",
      "Edge-ready deployment workflows on Vercel and cloud platforms"
    ],
    technologies: ["React 19", "Node.js", "Express.js", "PostgreSQL", "Supabase"],
    icon: "Layers"
  },
  {
    id: "python-development",
    title: "Python Development & Automation",
    explanation: "Practical Python applications, scripts, and automation workflows that eliminate repetitive manual tasks and process data reliably.",
    deliverables: [
      "Automated file parsers (CSV, JSON, Excel) and data ingestion scripts",
      "Database batch syncing and routine scheduled scripts",
      "Algorithmic problem-solving and structured CLI utilities",
      "API integrations and custom backend webhook handlers"
    ],
    technologies: ["Python 3", "SQL Automation", "Data Cleaning", "Scripting"],
    icon: "Terminal"
  },
  {
    id: "database-integration",
    title: "Database Integration & Modeling",
    explanation: "SQL-based application data management and integration, ensuring relational integrity, secure queries, and scalable storage.",
    deliverables: [
      "Relational schema design (Users, Orders, Products, Catalogs)",
      "Parameterized queries preventing SQL injection vulnerabilities",
      "Foreign key constraints and transactional integrity",
      "Cloud database provisioning and migration setup (Supabase / PostgreSQL)"
    ],
    technologies: ["PostgreSQL", "Supabase", "SQL", "MySQL"],
    icon: "Database"
  },
  {
    id: "data-visualization",
    title: "Data Visualization & Dashboards",
    explanation: "Clear, visual interfaces that transform raw metrics and data streams into actionable, visually structured dashboards.",
    deliverables: [
      "Comparative metric tables and interactive data grids",
      "Specification matrix layouts and visual product breakdowns",
      "Statistical chart representations using Python/Matplotlib and web tools",
      "Performance and telemetry analytics presentation"
    ],
    technologies: ["Pandas", "Matplotlib", "React Data Grids", "CSS Charts"],
    icon: "BarChart2"
  }
];
