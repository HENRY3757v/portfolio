import { IdentityState } from "@/types";

export const identityStates: IdentityState[] = [
  {
    id: "developer",
    stateNumber: "01",
    roleName: "WEB DEVELOPER",
    headline: "THE DEVELOPER",
    supportingLine: "Engineering seamless digital experiences.",
    accentColor: "#3B82F6", // Electric blue
    glowColor: "rgba(59, 130, 246, 0.4)",
    badge: "Full-Stack & React",
    visualType: "code",
    codeSnippet: `// ShopEase Dynamic Cart Hook
export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const syncWithSupabase = async (order: OrderPayload) => {
    return await api.post('/api/orders', order);
  };
  return { items, syncWithSupabase };
};`,
    visualTokens: ["React 19", "Tailwind CSS v4", "Next.js App Router", "TypeScript", "REST APIs"]
  },
  {
    id: "designer",
    stateNumber: "02",
    roleName: "UI/UX DESIGNER",
    headline: "THE DESIGNER",
    supportingLine: "Making technology feel human.",
    accentColor: "#8B5CF6", // Violet
    glowColor: "rgba(139, 92, 246, 0.4)",
    badge: "Interface & Motion",
    visualType: "wireframe",
    codeSnippet: `/* Modern Glassmorphic Design System */
.editorial-card {
  background: rgba(17, 19, 24, 0.85);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5);
}`,
    visualTokens: ["Visual Hierarchy", "Micro-Interactions", "Design Systems", "Figma to Code", "Accessibility (a11y)"]
  },
  {
    id: "builder",
    stateNumber: "03",
    roleName: "PYTHON DEVELOPER",
    headline: "THE BUILDER",
    supportingLine: "Turning logic into practical solutions.",
    accentColor: "#10B981", // Emerald green
    glowColor: "rgba(16, 185, 129, 0.4)",
    badge: "Automation & Backend",
    visualType: "workflow",
    codeSnippet: `# Automated Data Ingestion & SQL Pool
def batch_sync_catalog(dataset_path: str):
    with db_pool.get_connection() as conn:
        records = parse_source(dataset_path)
        conn.executemany("INSERT INTO products VALUES (%s)", records)
    return {"status": "synced", "count": len(records)}`,
    visualTokens: ["Python 3", "SQL Query Optimization", "Relational Modeling", "ETL Pipelines", "Automation"]
  },
  {
    id: "explorer",
    stateNumber: "04",
    roleName: "DATA & AI EXPLORER",
    headline: "THE EXPLORER",
    supportingLine: "Discovering patterns. Building smarter systems.",
    accentColor: "#F97316", // Orange
    glowColor: "rgba(249, 115, 22, 0.4)",
    badge: "AI & Emerging Tech",
    visualType: "analytics",
    codeSnippet: `# Vector Similarity & Discovery Concept
import pandas as pd
def calculate_recommendations(user_profile, catalog_vectors):
    scores = cosine_similarity(user_profile, catalog_vectors)
    return catalog_vectors.iloc[scores.argsort()[-5:]]`,
    visualTokens: ["Data Analytics", "Pandas & Numpy", "Machine Learning Concepts", "Algorithmic Logic", "Data Models"]
  },
  {
    id: "creator",
    stateNumber: "05",
    roleName: "CREATIVE TECHNOLOGIST",
    headline: "THE CREATOR",
    supportingLine: "Where imagination meets engineering.",
    accentColor: "#06B6D4", // Cyan
    glowColor: "rgba(6, 182, 212, 0.4)",
    badge: "Creative Coding & Identity",
    visualType: "creative",
    codeSnippet: `// Real-Time B&W to Color Transformation
const revealColorRatio = (clientX - bounds.left) / bounds.width;
portraitMask.style.clipPath = \`inset(0 0 0 \${revealColorRatio * 100}%)\`;
emitIdentityEvent(identityStates[activeIndex]);`,
    visualTokens: ["Interactive Physics", "Cinematic Shaders", "Scroll Sequences", "Creative Canvas", "Digital Brand"]
  }
];
