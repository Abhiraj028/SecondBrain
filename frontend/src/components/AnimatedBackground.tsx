const orbs = [
  "absolute -top-40 -left-40 w-[800px] h-[800px] bg-gradient-to-br from-violet-500 to-purple-700 rounded-full mix-blend-screen blur-3xl opacity-30 animate-mesh-1",
  "absolute top-1/2 -right-40 w-[700px] h-[700px] bg-gradient-to-br from-cyan-500 to-blue-700 rounded-full mix-blend-screen blur-3xl opacity-30 animate-mesh-2",
  "absolute -bottom-40 left-1/4 w-[750px] h-[750px] bg-gradient-to-br from-fuchsia-500 to-pink-700 rounded-full mix-blend-screen blur-3xl opacity-30 animate-mesh-3",
  "absolute top-1/4 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500 to-purple-700 rounded-full mix-blend-screen blur-3xl opacity-20 animate-mesh-4"
];

const particles = [
  { pos: "top-[10%] left-[15%]", size: "w-1 h-1", color: "bg-white", anim: "animate-particle-1" },
  { pos: "top-[25%] left-[80%]", size: "w-1.5 h-1.5", color: "bg-cyan-300", anim: "animate-particle-2" },
  { pos: "top-[45%] left-[5%]", size: "w-1 h-1", color: "bg-purple-300", anim: "animate-particle-3" },
  { pos: "top-[60%] left-[90%]", size: "w-2 h-2", color: "bg-fuchsia-300", anim: "animate-particle-4" },
  { pos: "top-[75%] left-[25%]", size: "w-1 h-1", color: "bg-blue-300", anim: "animate-particle-1" },
  { pos: "top-[15%] left-[60%]", size: "w-1.5 h-1.5", color: "bg-violet-300", anim: "animate-particle-3" },
  { pos: "top-[85%] left-[70%]", size: "w-1 h-1", color: "bg-pink-300", anim: "animate-particle-2" },
  { pos: "top-[40%] left-[40%]", size: "w-1 h-1", color: "bg-cyan-400", anim: "animate-particle-4" },
  { pos: "top-[55%] left-[65%]", size: "w-1.5 h-1.5", color: "bg-indigo-300", anim: "animate-particle-1" },
  { pos: "top-[30%] left-[92%]", size: "w-1 h-1", color: "bg-purple-400", anim: "animate-particle-3" }
];

const lines = [
  "absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-line-1",
  "absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-line-2",
  "absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent animate-line-3"
];

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {orbs.map((cls, i) => <div key={i} className={cls} />)}
      {particles.map((p, i) => <div key={i} className={`absolute ${p.pos} ${p.size} ${p.color} rounded-full ${p.anim}`} />)}
      {lines.map((cls, i) => <div key={i} className={cls} />)}
      <div className="absolute inset-0 opacity-[0.015]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E")'}} />
    </div>
  );
}
