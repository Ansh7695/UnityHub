"use client";

import React, { useState, useMemo } from "react";
import hackathonsData from "@/data/hackathonsData";
import { Search, Filter, Calendar, MapPin, Users, Globe, Sparkles, Plus, ExternalLink, Bookmark, CheckCircle, Trophy, Rocket, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HackathonsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedMode, setSelectedMode] = useState("All");
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [activeHackathon, setActiveHackathon] = useState<any | null>(null);
  const [showHostModal, setShowHostModal] = useState(false);
  const [hostFormData, setHostFormData] = useState({ name: "", topic: "AI", mode: "Online", date: "", prize: "" });
  const [submittedHost, setSubmittedHost] = useState(false);

  // Available topics for filtering
  const topics = ["All", "AI", "Blockchain", "Cloud Computing", "Hardware", "Data Science", "IoT", "Machine Learning", "Web Development"];

  // Filter hackathons
  const filteredHackathons = useMemo(() => {
    return hackathonsData.filter((h) => {
      const matchesSearch =
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (h.city && h.city.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTopic = selectedTopic === "All" || h.topic === selectedTopic;
      const matchesMode = selectedMode === "All" || (h.mode && h.mode.toLowerCase() === selectedMode.toLowerCase());

      return matchesSearch && matchesTopic && matchesMode;
    });
  }, [searchQuery, selectedTopic, selectedMode]);

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleHostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedHost(true);
    setTimeout(() => {
      setSubmittedHost(false);
      setShowHostModal(false);
      setHostFormData({ name: "", topic: "AI", mode: "Online", date: "", prize: "" });
    }, 2500);
  };

  // Image fallback map for high-quality unsplash images
  const getFallbackImage = (topic: string, id: number) => {
    const images: Record<string, string> = {
      AI: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      Blockchain: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
      "Cloud Computing": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      Hardware: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      "Data Science": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      IoT: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      "Machine Learning": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      "Web Development": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    };
    return images[topic] || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80";
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/10 via-purple-600/10 to-indigo-600/10 border border-border/60 p-8 sm:p-12 mb-10 shadow-2xl backdrop-blur-sm">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-4">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Global Hackathon Arena</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            Discover & Win National Hackathons
          </h1>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
            Team up with world-class engineers, build innovative prototypes, win prizes, and accelerate your tech career.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button
              onClick={() => setShowHostModal(true)}
              className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 shadow-lg text-primary-foreground"
            >
              <Plus className="w-4 h-4" />
              <span>Host a Hackathon</span>
            </Button>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Rocket className="w-4 h-4 text-purple-500" />
                <strong>10+</strong> Active Events
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-500" />
                <strong>2,400+</strong> Builders
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="space-y-4 mb-8">
        {/* Search Bar & Mode Toggle */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, technology, or city..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/60 border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground transition text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 bg-secondary/60 p-1 rounded-xl border border-border w-full sm:w-auto">
            {["All", "Online", "Offline"].map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedMode === mode
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Topic:
          </span>
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedTopic === t
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary/80 text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Hackathons */}
      {filteredHackathons.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl">
          <Trophy className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-foreground">No hackathons found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search criteria or topic filter.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setSelectedTopic("All");
              setSelectedMode("All");
            }}
            className="mt-4"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((h) => {
            const isBookmarked = bookmarkedIds.includes(h.id);
            const imageUrl = getFallbackImage(h.topic, h.id);

            return (
              <div
                key={h.id}
                onClick={() => setActiveHackathon(h)}
                className="group relative bg-card border border-border/70 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Image & Badges */}
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <img
                    src={imageUrl}
                    alt={h.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Mode Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-background/80 backdrop-blur-md border border-border/60 text-foreground shadow-sm">
                    {h.mode || "Hybrid"}
                  </span>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => toggleBookmark(h.id, e)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-md border border-border/60 text-foreground hover:bg-background transition shadow-sm"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                  </button>

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/90 text-white mb-1.5 inline-block">
                      {h.topic}
                    </span>
                    <h3 className="text-xl font-bold text-white leading-tight line-clamp-1">
                      {h.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                    {h.description}
                  </p>

                  <div className="space-y-2 text-xs text-foreground/80">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{h.date}</span>
                    </div>

                    {h.city && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 text-purple-500" />
                        <span>{h.city}</span>
                      </div>
                    )}

                    {h.teamSize && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Team Size: {h.teamSize} builders</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary flex items-center gap-1">
                      View Details
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <a
                      href={h.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition"
                    >
                      Register
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {activeHackathon && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveHackathon(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-secondary text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  {activeHackathon.topic}
                </span>
                <h2 className="text-2xl font-bold text-foreground mt-1">{activeHackathon.name}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{activeHackathon.date} • {activeHackathon.mode}</p>
              </div>
            </div>

            <p className="text-sm text-foreground/90 leading-relaxed bg-secondary/40 p-4 rounded-2xl border border-border/50">
              {activeHackathon.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-secondary/50 border border-border/40 space-y-1">
                <span className="text-muted-foreground">Location / City</span>
                <p className="font-semibold text-foreground">{activeHackathon.city || activeHackathon.location || "Online"}</p>
              </div>
              <div className="p-3 rounded-xl bg-secondary/50 border border-border/40 space-y-1">
                <span className="text-muted-foreground">Recommended Team Size</span>
                <p className="font-semibold text-foreground">{activeHackathon.teamSize || "3-5 Members"}</p>
              </div>
              <div className="p-3 rounded-xl bg-secondary/50 border border-border/40 space-y-1">
                <span className="text-muted-foreground">Registration Deadline</span>
                <p className="font-semibold text-foreground">{activeHackathon.registrationDeadline || "Open Now"}</p>
              </div>
              <div className="p-3 rounded-xl bg-secondary/50 border border-border/40 space-y-1">
                <span className="text-muted-foreground">Platform / Hub</span>
                <p className="font-semibold text-foreground">Unity Hub Verified</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
              <Button variant="outline" onClick={() => setActiveHackathon(null)}>
                Close
              </Button>
              <a
                href={activeHackathon.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-primary-foreground font-semibold text-sm shadow-md hover:opacity-90 transition"
              >
                <span>Proceed to Official Registration</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Host Hackathon Modal */}
      {showHostModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setShowHostModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-secondary text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-foreground">Host a Hackathon</h2>
              <p className="text-xs text-muted-foreground mt-1">Submit your hackathon to Unity Hub developer network.</p>
            </div>

            {submittedHost ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-lg font-semibold text-foreground">Hackathon Submitted!</h3>
                <p className="text-xs text-muted-foreground">Our team will review and publish your listing within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleHostSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-foreground mb-1">Event Title</label>
                  <input
                    type="text"
                    required
                    value={hostFormData.name}
                    onChange={(e) => setHostFormData({ ...hostFormData, name: e.target.value })}
                    placeholder="e.g. AI Innovators 2026"
                    className="w-full px-3.5 py-2 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-foreground mb-1">Topic</label>
                    <select
                      value={hostFormData.topic}
                      onChange={(e) => setHostFormData({ ...hostFormData, topic: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-foreground focus:outline-none"
                    >
                      {topics.filter((t) => t !== "All").map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-foreground mb-1">Mode</label>
                    <select
                      value={hostFormData.mode}
                      onChange={(e) => setHostFormData({ ...hostFormData, mode: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-foreground focus:outline-none"
                    >
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-foreground mb-1">Date Range</label>
                  <input
                    type="text"
                    required
                    value={hostFormData.date}
                    onChange={(e) => setHostFormData({ ...hostFormData, date: e.target.value })}
                    placeholder="e.g. October 15-18, 2026"
                    className="w-full px-3.5 py-2 rounded-xl bg-secondary border border-border text-foreground focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowHostModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-primary to-purple-600">
                    Submit Event
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
