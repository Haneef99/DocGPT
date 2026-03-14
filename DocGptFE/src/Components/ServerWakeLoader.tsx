import { useEffect, useState } from "react";
import "./ServerWakeLoader.css";

const messages = [
  "Waking up the server...",
  "Stretching its digital limbs...",
  "Brewing a fresh pot of RAM...",
  "Polishing the pixels for you...",
  "Almost there, hang tight!",
  "Loading your documents...",
];

const ServerWakeLoader = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 300);
    }, 2800);
    return () => clearInterval(cycle);
  }, []);

  return (
    <div className="swl-backdrop">
      <div className="swl-grid" aria-hidden="true" />

      <div className="swl-scene" aria-hidden="true">
        <div className="swl-ring swl-ring--a" />
        <div className="swl-ring swl-ring--b" />
        <div className="swl-ring swl-ring--c" />

        <div className="swl-orb">
          <div className="swl-orb-pulse" />
          <div className="swl-orb-pulse swl-orb-pulse--2" />
          <svg className="swl-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="6" width="32" height="9" rx="2" fill="none" stroke="#1a1a1a" strokeWidth="1.4"/>
            <rect x="4" y="18" width="32" height="9" rx="2" fill="none" stroke="#1a1a1a" strokeWidth="1.4"/>
            <circle cx="31.5" cy="10.5" r="1.8" fill="#22c55e"/>
            <circle cx="31.5" cy="22.5" r="1.8" fill="#22c55e" className="swl-blink"/>
            <line x1="8" y1="10.5" x2="24" y2="10.5" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round" opacity="0.2"/>
            <line x1="8" y1="22.5" x2="24" y2="22.5" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round" opacity="0.2"/>
            <rect x="8" y="29.5" width="24" height="4" rx="1.5" fill="none" stroke="#1a1a1a" strokeWidth="1" opacity="0.25"/>
          </svg>
        </div>

        {[
          { deg: "0deg", green: false, delay: "0s" },
          { deg: "90deg", green: true, delay: "0.4s" },
          { deg: "180deg", green: false, delay: "0.8s" },
          { deg: "270deg", green: true, delay: "1.2s" },
        ].map((dot, i) => (
          <div
            key={i}
            className={`swl-orbit-dot ${dot.green ? "swl-orbit-dot--green" : "swl-orbit-dot--black"}`}
            style={{ "--d": dot.deg, animationDelay: dot.delay } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="swl-text-block">
        <p className="swl-label">System status</p>
        <p className={`swl-message ${visible ? "swl-msg-in" : "swl-msg-out"}`}>
          {messages[msgIndex]}
        </p>
        <div className="swl-bar">
          <div className="swl-bar-fill" />
        </div>
      </div>
    </div>
  );
};

export default ServerWakeLoader;