"use client";

import React, { useState, useMemo } from "react";
import { projectsData, Project } from "@/data/projectsData";
import { Search, Code2, Users, Star, ExternalLink, Github, Filter, Plus, CheckCircle, Sparkles, X, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  const [projectsList, setProjectsList] = useState<Project[]>(projectsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [joinRole, setJoinRole] = useState("");
  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    tagline: "",
    description: "",
    category: "AI/ML" as Project["category"],
    tags: "",
    lookingFor: "",
    githubUrl: "",
    demoUrl: "",
  });
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  const categories = ["All", "AI/ML", "Web3", "Full Stack", "Mobile", "Cloud"];

  const filteredProjects = useMemo(() => {
    return projectsList.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === "All" || p.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [projectsList, searchQuery, selectedCategory]);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinSubmitted(true);
    setTimeout(() => {
      setJoinSubmitted(false);
      setSelectedProject(null);
      setJoinRole("");
    }, 2000);
  };

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;

    const createdProj: Project = {
      id: `proj-${Date.now()}`,
      title: newProject.title,
      tagline: newProject.tagline || "Innovative software project on Unity Hub.",
      description: newProject.description || "Building software with open source collaborators.",
      tags: newProject.tags ? newProject.tags.split(",").map((t) => t.trim()) : ["React", "TypeScript"],
      lookingFor: newProject.lookingFor ? newProject.lookingFor.split(",").map((l) => l.trim()) : ["Frontend Developer"],
      membersCount: 1,
      maxMembers: 5,
      author: "You (Developer)",
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80",
      stars: 1,
      githubUrl: newProject.githubUrl || "https://github.com",
      demoUrl: newProject.demoUrl || "https://demo.app",
      status: "Recruiting",
      category: newProject.category,
    };

    setProjectsList([createdProj, ...projectsList]);
    setPublishedSuccess(true);
    setTimeout(() => {
      setPublishedSuccess(false);
      setShowPublishModal(false);
      setNewProject({
        title: "",
        tagline: "",
        description: "",
        category: "AI/ML",
        tags: "",
        lookingFor: "",
        githubUrl: "",
        demoUrl: "",
      });
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/10 via-purple-600/10 to-indigo-600/10 border border-border/60 p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
            <Users className="w-3.5 h-3.5" />
            <span>Developer Matching & Project Showcase</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Collaborate on Cutting-Edge Developer Projects
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Find active open-source projects, join hackathon teams, showcase your portfolio, and build with engineers worldwide.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Button
              onClick={() => setShowPublishModal(true)}
              className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 shadow-lg text-primary-foreground"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Your Project</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name, stack (e.g. React, Rust, AI)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/70 border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground transition text-sm"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary/70 text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-card border border-border/70 rounded-3xl p-6 hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {project.category}
                </span>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    {project.stars}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                    project.status === "Recruiting" ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-400"
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg text-[11px] bg-secondary/80 text-foreground font-mono">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Looking for Roles */}
              <div className="p-3 rounded-2xl bg-secondary/40 border border-border/40 space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase flex items-center gap-1">
                  <UserPlus className="w-3 h-3 text-primary" /> Looking for Teammates:
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {project.lookingFor.map((role) => (
                    <span key={role} className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Details & Join Action */}
            <div className="pt-4 border-t border-border/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={project.authorAvatar}
                  alt={project.author}
                  className="w-7 h-7 rounded-full object-cover border border-border"
                />
                <span className="text-xs text-muted-foreground font-medium">{project.author}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition"
                >
                  <Github className="w-4 h-4" />
                </a>
                <Button
                  onClick={() => setSelectedProject(project)}
                  size="sm"
                  className="gap-1 text-xs font-semibold bg-gradient-to-r from-primary to-purple-600"
                >
                  <span>Apply / Join</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Join Request Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-secondary text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-primary/10 text-primary">
                Team Application
              </span>
              <h2 className="text-2xl font-bold text-foreground mt-1">Join {selectedProject.title}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{selectedProject.tagline}</p>
            </div>

            {joinSubmitted ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-lg font-semibold text-foreground">Application Sent!</h3>
                <p className="text-xs text-muted-foreground">
                  The project maintainer ({selectedProject.author}) will review your request.
                </p>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-foreground mb-1">Select Role You wish to apply for</label>
                  <select
                    value={joinRole}
                    onChange={(e) => setJoinRole(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-foreground focus:outline-none"
                  >
                    <option value="">-- Choose Role --</option>
                    {selectedProject.lookingFor.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-foreground mb-1">Introduction & Relevant Skills</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Briefly state your portfolio links, GitHub, or background..."
                    className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-foreground focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setSelectedProject(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-primary to-purple-600">
                    Send Application
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Publish Project Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setShowPublishModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-secondary text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-foreground">Publish Project Showcase</h2>
              <p className="text-xs text-muted-foreground mt-1">List your software project to recruit teammates and receive stars.</p>
            </div>

            {publishedSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-lg font-semibold text-foreground">Project Published!</h3>
                <p className="text-xs text-muted-foreground">Your project is now live on the Unity Hub Developer Network.</p>
              </div>
            ) : (
              <form onSubmit={handlePublishSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-foreground mb-1">Project Name</label>
                  <input
                    type="text"
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="e.g. QuantumDB"
                    className="w-full px-3.5 py-2 rounded-xl bg-secondary border border-border text-foreground focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-foreground mb-1">Category</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-foreground focus:outline-none"
                    >
                      {categories.filter((c) => c !== "All").map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-foreground mb-1">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={newProject.tags}
                      onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                      placeholder="React, Rust, FastAPI"
                      className="w-full px-3.5 py-2 rounded-xl bg-secondary border border-border text-foreground focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-foreground mb-1">Tagline</label>
                  <input
                    type="text"
                    value={newProject.tagline}
                    onChange={(e) => setNewProject({ ...newProject, tagline: e.target.value })}
                    placeholder="A brief 1-line summary..."
                    className="w-full px-3.5 py-2 rounded-xl bg-secondary border border-border text-foreground focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-foreground mb-1">Roles Needed (comma separated)</label>
                  <input
                    type="text"
                    value={newProject.lookingFor}
                    onChange={(e) => setNewProject({ ...newProject, lookingFor: e.target.value })}
                    placeholder="Frontend Engineer, UI/UX Designer"
                    className="w-full px-3.5 py-2 rounded-xl bg-secondary border border-border text-foreground focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setShowPublishModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-primary to-purple-600">
                    Publish Showcase
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
