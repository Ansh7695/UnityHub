export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  lookingFor: string[];
  membersCount: number;
  maxMembers: number;
  author: string;
  authorAvatar: string;
  stars: number;
  githubUrl: string;
  demoUrl: string;
  status: "Recruiting" | "In Development" | "Completed";
  category: "AI/ML" | "Web3" | "Full Stack" | "Mobile" | "Cloud";
}

export const projectsData: Project[] = [
  {
    id: "proj-1",
    title: "NeuroDev AI",
    tagline: "Autonomous AI pair-programmer for real-time code refactoring and security auditing.",
    description: "NeuroDev AI connects to your IDE to analyze AST trees in real-time, catching memory leaks and proposing micro-optimizations using tailored LLMs.",
    tags: ["React", "TypeScript", "Python", "FastAPI", "OpenAI"],
    lookingFor: ["Frontend Engineer", "DevOps Engineer"],
    membersCount: 3,
    maxMembers: 5,
    author: "Alex Rivers",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
    stars: 142,
    githubUrl: "https://github.com/example/neurodev-ai",
    demoUrl: "https://neurodev-ai.demo.app",
    status: "Recruiting",
    category: "AI/ML",
  },
  {
    id: "proj-2",
    title: "ChainGuard Vault",
    tagline: "Decentralized multi-signature asset treasury with automated smart contract audits.",
    description: "Built for DAO treasuries and Web3 teams to execute multi-sig transactions with built-in zero-knowledge proof verification.",
    tags: ["Solidity", "Next.js", "Ethers.js", "Tailwind CSS", "Rust"],
    lookingFor: ["Smart Contract Auditor", "UI/UX Designer"],
    membersCount: 4,
    maxMembers: 6,
    author: "Elena Rostova",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    stars: 98,
    githubUrl: "https://github.com/example/chainguard-vault",
    demoUrl: "https://chainguard.demo.app",
    status: "Recruiting",
    category: "Web3",
  },
  {
    id: "proj-3",
    title: "EcoPulse IoT",
    tagline: "Real-time municipal environmental sensor dashboard & predictive climate analytics.",
    description: "Grid monitor that aggregates real-time air quality, humidity, and energy consumption metrics across urban Smart Cities.",
    tags: ["Node.js", "React", "MongoDB", "MQTT", "Chart.js"],
    lookingFor: ["Backend Engineer (Node.js)", "Data Scientist"],
    membersCount: 2,
    maxMembers: 4,
    author: "Devon Chen",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
    stars: 76,
    githubUrl: "https://github.com/example/ecopulse-iot",
    demoUrl: "https://ecopulse.demo.app",
    status: "In Development",
    category: "Full Stack",
  },
  {
    id: "proj-4",
    title: "SyncMeet 3D",
    tagline: "Immersive spatial audio & 3D whiteboard video rooms for remote engineering syncs.",
    description: "Transform virtual meetings into productive architectural whiteboard sessions with WebGL, WebRTC, and Jitsi integration.",
    tags: ["Three.js", "React", "WebRTC", "Tailwind CSS", "Express"],
    lookingFor: ["3D WebGL Developer", "Product Manager"],
    membersCount: 3,
    maxMembers: 5,
    author: "Sophia Martinez",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
    stars: 215,
    githubUrl: "https://github.com/example/syncmeet-3d",
    demoUrl: "https://syncmeet.demo.app",
    status: "Recruiting",
    category: "Full Stack",
  },
];
