
import React from "react";

const blobsConfig = [
  { className: "bg-brand-purple/60", style: { top: "12%", left: "10%", width: 340, height: 340, filter: "blur(120px)", opacity: 0.6, zIndex: 1 }},
  { className: "bg-brand-orange/70", style: { top: "60%", left: "5%", width: 320, height: 320, filter: "blur(100px)", opacity: 0.7, zIndex: 1 }},
  { className: "bg-brand-purple/55", style: { top: "25%", left: "65%", width: 380, height: 380, filter: "blur(110px)", opacity: 0.55, zIndex: 1 }},
  { className: "bg-brand-orange/60", style: { top: "70%", left: "70%", width: 250, height: 250, filter: "blur(85px)", opacity: 0.6, zIndex: 1 }},
  { className: "bg-brand-darkBlue/48", style: { top: "40%", left: "40%", width: 300, height: 280, filter: "blur(90px)", opacity: 0.48, zIndex: 1 }},
];

const AuroraBackground: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none -z-10 w-full h-full overflow-hidden">
    {blobsConfig.map((b, i) => (
      <span
        key={i}
        className={`absolute rounded-full animate-aurora-move ${b.className}`}
        style={{
          ...b.style,
          animationDelay: `${i * 2}s`,
        }}
      ></span>
    ))}
    <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/70 opacity-80" style={{zIndex:2}} />
  </div>
);

export default AuroraBackground;
