export interface Skill {
  id: string;
  label: string;
  category: string;
}

export const SKILLS: Skill[] = [
  // Programming Languages
  { id: "javascript", label: "JavaScript", category: "Programming Languages" },
  { id: "typescript", label: "TypeScript", category: "Programming Languages" },
  { id: "python", label: "Python", category: "Programming Languages" },
  { id: "java", label: "Java", category: "Programming Languages" },
  { id: "csharp", label: "C#", category: "Programming Languages" },
  { id: "cpp", label: "C++", category: "Programming Languages" },
  { id: "go", label: "Go", category: "Programming Languages" },
  { id: "rust", label: "Rust", category: "Programming Languages" },
  { id: "swift", label: "Swift", category: "Programming Languages" },
  { id: "kotlin", label: "Kotlin", category: "Programming Languages" },
  { id: "php", label: "PHP", category: "Programming Languages" },
  { id: "ruby", label: "Ruby", category: "Programming Languages" },

  // Frontend
  { id: "react", label: "React", category: "Frontend" },
  { id: "nextjs", label: "Next.js", category: "Frontend" },
  { id: "vuejs", label: "Vue.js", category: "Frontend" },
  { id: "angular", label: "Angular", category: "Frontend" },
  { id: "svelte", label: "Svelte", category: "Frontend" },
  { id: "tailwindcss", label: "Tailwind CSS", category: "Frontend" },
  { id: "html", label: "HTML", category: "Frontend" },
  { id: "css", label: "CSS", category: "Frontend" },

  // Backend
  { id: "nodejs", label: "Node.js", category: "Backend" },
  { id: "express", label: "Express", category: "Backend" },
  { id: "nestjs", label: "NestJS", category: "Backend" },
  { id: "django", label: "Django", category: "Backend" },
  { id: "fastapi", label: "FastAPI", category: "Backend" },
  { id: "spring", label: "Spring Boot", category: "Backend" },
  { id: "graphql", label: "GraphQL", category: "Backend" },
  { id: "rest", label: "REST APIs", category: "Backend" },

  // Databases
  { id: "postgresql", label: "PostgreSQL", category: "Databases" },
  { id: "mysql", label: "MySQL", category: "Databases" },
  { id: "mongodb", label: "MongoDB", category: "Databases" },
  { id: "redis", label: "Redis", category: "Databases" },
  { id: "sqlite", label: "SQLite", category: "Databases" },
  { id: "prisma", label: "Prisma", category: "Databases" },

  // Cloud & DevOps
  { id: "aws", label: "AWS", category: "Cloud & DevOps" },
  { id: "gcp", label: "Google Cloud", category: "Cloud & DevOps" },
  { id: "azure", label: "Azure", category: "Cloud & DevOps" },
  { id: "docker", label: "Docker", category: "Cloud & DevOps" },
  { id: "kubernetes", label: "Kubernetes", category: "Cloud & DevOps" },
  { id: "cicd", label: "CI/CD", category: "Cloud & DevOps" },
  { id: "terraform", label: "Terraform", category: "Cloud & DevOps" },

  // Mobile
  { id: "reactnative", label: "React Native", category: "Mobile" },
  { id: "flutter", label: "Flutter", category: "Mobile" },
  { id: "ios", label: "iOS Development", category: "Mobile" },
  { id: "android", label: "Android Development", category: "Mobile" },

  // AI & Data
  { id: "machinelearning", label: "Machine Learning", category: "AI & Data" },
  { id: "deeplearning", label: "Deep Learning", category: "AI & Data" },
  { id: "datascience", label: "Data Science", category: "AI & Data" },
  { id: "tensorflow", label: "TensorFlow", category: "AI & Data" },
  { id: "pytorch", label: "PyTorch", category: "AI & Data" },
  { id: "langchain", label: "LangChain", category: "AI & Data" },

  // Design & Product
  { id: "uiux", label: "UI/UX Design", category: "Design & Product" },
  { id: "figma", label: "Figma", category: "Design & Product" },
  {
    id: "productmanagement",
    label: "Product Management",
    category: "Design & Product",
  },
  { id: "systemdesign", label: "System Design", category: "Design & Product" },

  // Soft Skills
  { id: "leadership", label: "Leadership", category: "Soft Skills" },
  { id: "communication", label: "Communication", category: "Soft Skills" },
  { id: "agile", label: "Agile / Scrum", category: "Soft Skills" },
  { id: "codereviews", label: "Code Reviews", category: "Soft Skills" },
  { id: "mentoring", label: "Mentoring", category: "Soft Skills" },
  {
    id: "technicalwriting",
    label: "Technical Writing",
    category: "Soft Skills",
  },
];

export const SKILLS_BY_CATEGORY = SKILLS.reduce<Record<string, Skill[]>>(
  (acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  },
  {},
);
