"use client";

import React, { useState, useEffect, useRef } from "react";
import { Video, Mic, MicOff, VideoOff, Users, Sparkles, Copy, Check, Play, ShieldCheck, PhoneOff, Monitor, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

export default function VideoMeetingsPage() {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);

  const [roomName, setRoomName] = useState("UnityHub-Global-Room");
  const [displayName, setDisplayName] = useState("Developer Builder");
  const [startMuted, setStartMuted] = useState(true);
  const [inMeeting, setInMeeting] = useState(false);
  const [loadingJitsi, setLoadingJitsi] = useState(false);
  const [copied, setCopied] = useState(false);
  const [jitsiApi, setJitsiApi] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const publicRooms = [
    { name: "UnityHub-AI-Brainstorm", topic: "AI & Machine Learning Prototype Sync", members: 4, active: true },
    { name: "UnityHub-Web3-Audit", topic: "Smart Contract Peer Code Review", members: 2, active: true },
    { name: "UnityHub-FullStack-Lounge", topic: "Open Source Team Matching & Q&A", members: 6, active: true },
  ];

  const generateRandomRoom = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setRoomName(`UnityHub-DevSync-${randomCode}`);
  };

  const copyRoomLink = () => {
    navigator.clipboard.writeText(window.location.origin + `/meetings?room=${roomName}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const joinMeeting = () => {
    if (!roomName.trim()) return;
    setInMeeting(true);
    setLoadingJitsi(true);
  };

  const leaveMeeting = () => {
    if (jitsiApi) {
      jitsiApi.dispose();
      setJitsiApi(null);
    }
    setInMeeting(false);
    initializedRef.current = false;
  };

  useEffect(() => {
    if (!inMeeting) return;

    const loadJitsiScript = () => {
      if (!window.JitsiMeetExternalAPI) {
        const script = document.createElement("script");
        script.src = "https://meet.jit.si/external_api.js";
        script.async = true;
        script.onload = () => {
          setLoadingJitsi(false);
          initJitsiInstance();
        };
        script.onerror = () => {
          setLoadingJitsi(false);
          setError("Failed to load video infrastructure script.");
        };
        document.body.appendChild(script);
      } else {
        setLoadingJitsi(false);
        initJitsiInstance();
      }
    };

    const initJitsiInstance = () => {
      if (!jitsiContainerRef.current) return;
      try {
        const domain = "meet.jit.si";
        const options = {
          roomName: roomName.replace(/\s+/g, "-"),
          parentNode: jitsiContainerRef.current,
          configOverwrite: {
            enableWelcomePage: false,
            startWithAudioMuted: startMuted,
            startWithVideoMuted: startMuted,
            theme: "dark",
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_BRAND_WATERMARK: false,
            DEFAULT_BACKGROUND: "#0c0a09",
          },
          userInfo: {
            displayName: displayName || "Developer Builder",
          },
        };

        const api = new window.JitsiMeetExternalAPI(domain, options);
        setJitsiApi(api);
      } catch (err) {
        console.error("Error creating Jitsi meeting:", err);
        setError("Unable to launch video container.");
      }
    };

    loadJitsiScript();

    return () => {
      if (jitsiApi) {
        jitsiApi.dispose();
      }
    };
  }, [inMeeting]);

  return (
    <main className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-rose-500/15 p-6 sm:p-8 rounded-3xl border border-orange-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-500 mb-3">
            <Video className="w-3.5 h-3.5" />
            <span>High-Speed WebRTC Video Workspace</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Developer Video Rooms & Pair Programming
          </h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
            Instant 3D spatial & HD video conferencing for hackathon team syncs, architectural reviews, and remote pair coding.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={generateRandomRoom} variant="outline" size="sm" className="gap-1.5 text-xs">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>Random Room Code</span>
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      {!inMeeting ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Join / Create Form */}
          <div className="lg:col-span-1 bg-card border border-border/70 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
                <Monitor className="w-5 h-5 text-orange-500" />
                <span>Launch / Join Room</span>
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-foreground mb-1.5">Room ID / Channel Name</label>
                  <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Enter room name..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-secondary/80 border border-border text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                  />
                </div>

                <div>
                  <label className="block font-medium text-foreground mb-1.5">Your Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Sarah Connor (Full Stack)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-secondary/80 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/40 border border-border/40">
                  <span className="font-medium text-foreground">Start Audio/Video Muted</span>
                  <button
                    onClick={() => setStartMuted(!startMuted)}
                    className={`p-2 rounded-lg transition ${
                      startMuted ? "bg-orange-500 text-white" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {startMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border/60">
              <Button
                onClick={joinMeeting}
                className="w-full py-6 text-sm font-semibold gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:opacity-90 shadow-lg shadow-orange-500/20 text-white border-0"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Enter Video Workspace</span>
              </Button>

              <button
                onClick={copyRoomLink}
                className="w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground py-2"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Room Link Copied!" : "Copy Shareable Room Link"}</span>
              </button>
            </div>
          </div>

          {/* Active Public Sync Rooms */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
              <Users className="w-5 h-5 text-amber-500" />
              <span>Active Hackathon Sync Rooms</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {publicRooms.map((room) => (
                <div
                  key={room.name}
                  className="bg-card border border-border/70 rounded-2xl p-5 hover:border-orange-500/50 transition-all flex flex-col justify-between space-y-4 group shadow-md"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Live Channel
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {room.members} active
                      </span>
                    </div>

                    <h3 className="font-bold text-foreground text-base group-hover:text-orange-500 transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{room.topic}</p>
                  </div>

                  <Button
                    onClick={() => {
                      setRoomName(room.name);
                      setInMeeting(true);
                      setLoadingJitsi(true);
                    }}
                    variant="secondary"
                    size="sm"
                    className="w-full gap-1.5 text-xs font-medium"
                  >
                    <Video className="w-3.5 h-3.5 text-orange-500" />
                    <span>Join Sync Room</span>
                  </Button>
                </div>
              ))}
            </div>

            {/* Platform Features Banner */}
            <div className="p-6 rounded-2xl bg-secondary/40 border border-border/50 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <ShieldCheck className="w-6 h-6 text-orange-500 mx-auto" />
                <h4 className="text-xs font-bold text-foreground">Encrypted WebRTC</h4>
                <p className="text-[11px] text-muted-foreground">Peer-to-peer media streaming security.</p>
              </div>
              <div className="space-y-1">
                <Monitor className="w-6 h-6 text-amber-500 mx-auto" />
                <h4 className="text-xs font-bold text-foreground">Screen Share & Code</h4>
                <p className="text-[11px] text-muted-foreground">4K screen sharing for code debugging.</p>
              </div>
              <div className="space-y-1">
                <Users className="w-6 h-6 text-rose-500 mx-auto" />
                <h4 className="text-xs font-bold text-foreground">Unlimited Builders</h4>
                <p className="text-[11px] text-muted-foreground">Up to 50 active video participants per room.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Embedded Active Jitsi Room */
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-border/80 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm">{roomName}</h3>
                <p className="text-xs text-muted-foreground">Connected as: {displayName}</p>
              </div>
            </div>

            <Button
              onClick={leaveMeeting}
              variant="destructive"
              size="sm"
              className="gap-2 font-semibold text-xs"
            >
              <PhoneOff className="w-4 h-4" />
              <span>Leave Room</span>
            </Button>
          </div>

          {loadingJitsi && (
            <div className="h-[65vh] w-full rounded-2xl bg-secondary/50 border border-border flex flex-col items-center justify-center space-y-3">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-muted-foreground">Connecting to WebRTC media server...</p>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs">
              {error}
            </div>
          )}

          <div
            ref={jitsiContainerRef}
            className="w-full h-[70vh] rounded-3xl overflow-hidden border border-border shadow-2xl bg-black"
          />
        </div>
      )}
    </main>
  );
}
