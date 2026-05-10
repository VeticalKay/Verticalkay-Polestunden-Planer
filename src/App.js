import { useState } from "react";

// ── CURRICULUM ──────────────────────────────────────────────────────────────
function buildCurriculum(level) {
  const base = `DEIN KONZEPT – WICHTIGE REGELN:
- Jede Einheit: Warm-Up + Wiederholung + 6 Pflicht-Bausteine (Spin, Trick, Figur, Move, Tänzerisches Element, Boden)
- Warm-Up: Seq.1 Mobilisierung, Seq.2 Cardio/Kraft, Seq.3 Pre-Stretch (max. 8 Sek.), Seq.4 Pole-Vorbereitung
- Figuren 2–3x pro Seite, erst OHNE Musik, dann MIT Musik
- Von bekannten zu neuen Figuren – niemals zu schnell steigern
- Gesundheitsorientierter Kraftaufbau
- Uhrzeiten: 6:00 Uhr (hinter Pole), 9:00/15:00 Uhr (seitlich), 12:00 Uhr (vor Pole)
- WH = Wiederholung, OST = One Side Turn

LEVEL-REGEL: Du darfst AUSSCHLIESSLICH Figuren aus den unten angegebenen Levels verwenden.`;

  const l10 = `\nVERFÜGBARE FIGUREN – NUR DIESE VERWENDEN:
Level 1.0 Static Pole: Basic Walk, Position I+II, Plié, Hip Circle, Body Wave Up, Passé, Body Touch, Pencil Turn/Pirouette, Fan Kick Floor, Fan Kick Pole, Knee Sit, Pull Up (Basic Grip), Heel Sit, Basic Spin, Front Hook Stand, Back Hook, Knee Change, Basic Climb (1x), Prayer Slide Passé, Play Leg + OST, Pole Seat Beginner, Lean Back Beginner, Lean Back Single Grip, Headstand Prep.+Hips+Play Leg, Headstand+Candle, Chair Spin Front, Chair Spin+Back Hook, Arch Back, Basic Side Slide, Pin Up Kick, Tic Toc, Hoover, Knee Bridge
Level 1.0 Spinning Pole: Basic Spin Spinning, Back Hook Spinning, Front Hook Spin, Fireman Spin, Mermaid Spin, Side Spin Front/Dizzy Lizzy, Basic Climb Spinning, Chair Spin Spinning, Push Turn, Ballerina Stand, Clock Work, Trucker Girl
Griffarten Level 1.0: Basic Grip/True Grip, Reverse Grip, Safety/Push Grip`;

  const l11 = `\nLevel 1.1 neue Figuren (zusätzlich zu 1.0): Basic Spin Back, Chair Spin Back (Reverse Grip), Diamond Spin, Fireman Spin Static, Tuck Spin, Belly Slide, Broken Crucifix Boden+Air, Wrap Around, Lady Seat/Knee Hook Pose, Seat Arm Pit Hold, Basic Invert Open Leg, Lean Back Double Grip, Sunwheel Pose/Stag Pose, Ballerina Pose, Roundabout Pole, Stag Floor, Shoulder Roll, Side Slide, Side Slide Kick
Neue Griffart L1.1: Armpit Hold, Twisted Grip, Reverse Split Grip`;

  const l20 = `\nLevel 2.0 neue Figuren (zusätzlich zu 1.0+1.1): Fireman Spin Up, Aerial Plié Spin, Sunwheel Spin Front+Back, Attitude Spin, Power Climb (2x), Hook Hold Ext. Leg, Chair Hold Ext. Leg Air, Diagonal Slide, Broken Seat, Stargazer Prep. Safety, Cross Knee Release Safety, Basic Invert Roll Down, Handstand Invert, Inverted Crucifix Release, Handstand Butterfly/Scorpion, Inverted V/Chopper/Helicopter
Neue Griffart L2: Stronghold`;

  const l30 = `\nLevel 3.0 neue Figuren (zusätzlich zu 1.0+1.1+2.0): Corkscrew Prep., Corkscrew, Tinkerbell Spin, Drama Queen Seat, Martini Seat Floor, Swan Seat, Stargazer (ohne Safety), Cross Knee Release+Handstand, Drama Queen Drop Prep., Invert Play Leg, Invert Ext. Leg, Superman Slide, Outside/Inside Leg Hang Prep., Straddle Pose Push Grip
Neue Griffart L3: Cup Grip`;

  let c = base + l10;
  if (level === "1.1") c += l11;
  if (level === "2.0") c += l11 + l20;
  if (level === "3.0") c += l11 + l20 + l30;
  return c;
}

function buildSystemPrompt(level) {
  return `Du bist Katarina Tolkmit von VerticalKay Education und planst Poledance-Unterrichtseinheiten.

${buildCurriculum(level)}

STUNDENAUFBAU: Warm-Up 20 Min → 6 Pflicht-Bausteine (Spin, Trick, Figur, Move, Tänzerisches Element, Boden) + Wiederholung + Kombination 50 Min → Cool Down 5 Min.
PÄDAGOGIK: Indirekte Kommunikation ("Wir..."), nie Einzelne vorführen. Regression für Schwächere, Progression für Stärkere.
ANATOMIE: Latissimus bei JEDEM Spin aktivieren. Presspoints NIE auf Gelenke. Beide Seiten trainieren.

WICHTIG: Jede Variation MUSS alle 6 Bausteine enthalten. Kein Baustein darf fehlen.

AUSGABE-FORMAT: Antworte NUR mit einem JSON-Array mit genau 3 Objekten. Kein Text davor oder danach. Kein Markdown. Nur reines JSON.

Jedes Objekt hat folgende Struktur:
{
  "option": 1,
  "optionLabel": "Kurzer Titel (2-3 Wörter)",
  "optionBeschreibung": "Ein Satz Beschreibung des Fokus",
  "warmup": [
    { "seq": "Mobilisierung", "inhalt": "..." },
    { "seq": "Cardio / Kraft", "inhalt": "..." },
    { "seq": "Pre-Stretch", "inhalt": "..." },
    { "seq": "Pole-Vorbereitung", "inhalt": "..." }
  ],
  "wiederholung": ["Figur1", "Figur2", "Figur3", "Figur4"],
  "spin": { "name": "...", "griff": "...", "uhrzeit": "...", "hinweis": "..." },
  "trick": { "name": "...", "griff": "...", "uhrzeit": "...", "hinweis": "..." },
  "figur": { "name": "...", "griff": "...", "uhrzeit": "...", "hinweis": "..." },
  "move": { "name": "...", "griff": "...", "uhrzeit": "...", "hinweis": "..." },
  "tanz": { "name": "...", "griff": "...", "uhrzeit": "...", "hinweis": "..." },
  "boden": { "name": "...", "griff": "–", "uhrzeit": "–", "hinweis": "..." },
  "kombi": "Figur1 → Figur2 → Figur3 — Beschreibung",
  "didaktik": "...",
  "anatomie": "...",
  "gesundheitsTipp": "..."
}`;
}

function buildUserPrompt({ level, pole, duration, freq, group, unit, types, injuries, injOther, goal, focus }) {
  return `Erstelle 3 verschiedene Unterrichtsvarianten für:
- Level: ${level}
- Pole-Modus: ${pole}
- Einheitsdauer: ${duration}
- Frequenz: ${freq}
- Teilnehmeranzahl: ${group}
- Einheit Nr.: ${unit} von 10
- Unterrichtsinhalt: ${types.join(", ")}
- Verletzungen/Einschränkungen: ${[...injuries, injOther].filter(Boolean).join(", ") || "keine"}
- Trainingsziel: ${goal || "nicht angegeben"}
- Besondere Wünsche: ${focus || "keine"}

Die 3 Varianten sollen sich deutlich voneinander unterscheiden (z.B. Fokus Technik vs. Flow vs. Aufbau).
Verwende NUR Figuren aus Level ${level} (und darunter).
Antworte NUR mit dem JSON-Array.`;
}

// ── STYLES ──────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,400;1,700&family=Jost:wght@200;300;400;500&display=swap');

.vk-root {
  background: linear-gradient(145deg, #1a0020 0%, #2d0045 40%, #1a001a 100%);
  min-height: 100vh; font-family: 'Jost', sans-serif;
  color: #f5eaf0; padding: 0 1rem 4rem;
  position: relative; overflow-x: hidden;
}
.vk-root::before {
  content: ''; position: fixed; inset: 0;
  background: radial-gradient(ellipse at 30% 20%, rgba(180,0,135,0.18) 0%, transparent 55%),
              radial-gradient(ellipse at 70% 80%, rgba(100,0,80,0.22) 0%, transparent 55%);
  pointer-events: none; z-index: 0;
}
.vk-root > * { position: relative; z-index: 1; }

.vk-header { text-align: center; padding: 2.5rem 1rem 1.5rem; }
.vk-badge {
  display: inline-flex; align-items: center; gap: 7px;
  background: rgba(180,0,135,0.15); border: 1px solid rgba(180,0,135,0.4);
  border-radius: 20px; padding: 5px 14px; font-size: 0.72rem;
  letter-spacing: 0.15em; text-transform: uppercase; color: #e070c8; margin-bottom: 1rem;
}
.vk-dot { width: 6px; height: 6px; background: #b40087; border-radius: 50%; animation: pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
.vk-h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700; line-height: 1.15; color: #f5eaf0;
}
.vk-h1 em { font-style: italic; color: #e070c8; }
.vk-subtitle { margin-top: 0.6rem; font-size: 0.85rem; color: #c4a8bb; font-weight: 300; letter-spacing: 0.05em; }

.vk-form {
  max-width: 720px; margin: 2rem auto 0;
  background: rgba(60,0,35,0.72); backdrop-filter: blur(12px);
  border: 1px solid rgba(180,0,135,0.35); border-radius: 20px; padding: 2rem 1.8rem;
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
}
.vk-section-label {
  font-size: 0.7rem; font-weight: 500; letter-spacing: 0.18em;
  text-transform: uppercase; color: #c4a8bb; margin-bottom: 0.7rem;
}
.level-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; margin-bottom: 1.6rem; }
.level-btn {
  background: rgba(60,0,35,0.6); border: 1.5px solid rgba(180,0,135,0.3);
  border-radius: 12px; color: #c4a8bb; font-family: 'Jost', sans-serif;
  font-size: 0.82rem; padding: 0.75rem 0.5rem; cursor: pointer;
  transition: all 0.2s; text-align: center; line-height: 1.3;
}
.level-btn.active { background: rgba(180,0,135,0.25); border-color: #b40087; color: #f5eaf0; box-shadow: 0 0 16px rgba(180,0,135,0.3); }
.level-btn:hover:not(.active) { border-color: rgba(180,0,135,0.6); color: #e0c8d8; }
.level-sub { font-size: 9px; opacity: 0.6; letter-spacing: 0.1em; display: block; margin-top: 2px; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.fg-full { grid-column: 1 / -1; }
.fg-label { font-size: 0.72rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #e0c4d8; margin-bottom: 6px; display: block; }
.vk-select, .vk-input, .vk-textarea {
  background: rgba(40,0,25,0.6); border: 1px solid rgba(180,0,135,0.3);
  border-radius: 10px; padding: 0.65rem 0.9rem;
  font-family: 'Jost', sans-serif; font-size: 0.88rem; color: #f5eaf0;
  width: 100%; appearance: none; outline: none; transition: border-color 0.2s;
  box-sizing: border-box;
}
.vk-select:focus, .vk-input:focus, .vk-textarea:focus { border-color: #b40087; box-shadow: 0 0 0 3px rgba(180,0,135,0.18); }
.vk-input::placeholder, .vk-textarea::placeholder { color: rgba(255,255,255,0.28); }
.vk-textarea { resize: vertical; min-height: 76px; line-height: 1.5; }
.vk-num-input { text-align: center; }

.toggle-row { display: flex; gap: 8px; flex-wrap: wrap; }
.toggle-btn {
  background: rgba(40,0,25,0.6); border: 1px solid rgba(180,0,135,0.3);
  border-radius: 20px; padding: 0.4rem 1rem; font-family: 'Jost', sans-serif;
  font-size: 0.82rem; color: #c4a8bb; cursor: pointer; transition: all 0.2s;
}
.toggle-btn.active { background: rgba(180,0,135,0.2); border-color: #b40087; color: #f0d0e8; }

.chips-row { display: flex; flex-wrap: wrap; gap: 7px; }
.chip {
  background: rgba(40,0,25,0.6); border: 1px solid rgba(180,0,135,0.25);
  border-radius: 20px; padding: 0.3rem 0.85rem; font-size: 0.8rem;
  color: #c4a8bb; cursor: pointer; transition: all 0.18s; user-select: none;
}
.chip.active { background: rgba(180,0,135,0.2); border-color: #b40087; color: #f0d0e8; }
.chip:hover:not(.active) { border-color: rgba(180,0,135,0.5); }

.gen-btn {
  margin-top: 1.6rem; width: 100%;
  background: linear-gradient(135deg, #b40087, #7a005a);
  border: none; border-radius: 12px; padding: 1rem;
  font-family: 'Jost', sans-serif; font-size: 0.98rem; font-weight: 500;
  color: #fff; letter-spacing: 0.06em; cursor: pointer; transition: all 0.25s;
}
.gen-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(180,0,135,0.4); }
.gen-btn:disabled { opacity: 0.55; cursor: not-allowed; }

.vk-status {
  margin-top: 1rem; text-align: center; font-size: 0.88rem;
  color: #c4a8bb; display: flex; align-items: center; justify-content: center; gap: 8px;
}
.vk-spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(180,0,135,0.3); border-top-color: #b40087;
  border-radius: 50%; animation: vk-spin 0.8s linear infinite; flex-shrink: 0;
}
@keyframes vk-spin { to { transform: rotate(360deg); } }

.error-box {
  margin-top: 1rem; background: rgba(180,0,0,0.15); border: 1px solid rgba(255,80,80,0.3);
  border-radius: 10px; padding: 0.8rem 1rem; font-size: 0.84rem; color: #ffaaaa; text-align: center;
}

.results-wrap { max-width: 720px; margin: 2.5rem auto 0; }
.results-header { text-align: center; margin-bottom: 1.8rem; }
.results-h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.4rem, 3vw, 1.9rem); font-weight: 700; color: #f5eaf0; }
.results-meta { margin-top: 0.4rem; font-size: 0.8rem; color: #c4a8bb; }

.option-tabs { display: flex; gap: 8px; margin-bottom: 1.2rem; flex-wrap: wrap; }
.option-tab {
  flex: 1; min-width: 120px; padding: 0.7rem 0.8rem;
  border-radius: 12px; cursor: pointer; transition: all 0.2s;
  font-family: 'Jost', sans-serif; text-align: center; line-height: 1.3; border: none;
}
.option-tab-num { font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 3px; }
.option-tab-title { font-size: 0.88rem; font-weight: 500; }
.option-tab-desc { font-size: 0.72rem; opacity: 0.7; margin-top: 3px; font-style: italic; }

.unit-card {
  background: rgba(130,0,70,0.3); border: 1px solid rgba(180,0,135,0.3);
  border-radius: 16px; overflow: hidden;
  animation: vk-up 0.4s ease forwards; opacity: 0;
}
@keyframes vk-up { to { opacity:1; } }

.unit-header {
  display: flex; align-items: center; gap: 1rem; padding: 1rem 1.3rem;
  background: linear-gradient(135deg, rgba(100,0,55,0.7), rgba(180,0,135,0.1));
  border-bottom: 1px solid rgba(180,0,135,0.2);
}
.unit-num {
  width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
  background: rgba(180,0,135,0.25); border: 1.5px solid rgba(180,0,135,0.5);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: #e8a0c8;
}
.unit-title-wrap { flex: 1; }
.unit-title { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 600; color: #f5eaf0; }
.unit-meta { margin-top: 4px; font-size: 0.75rem; color: #c4a8bb; font-style: italic; }
.unit-body { padding: 1.2rem 1.3rem; }

.section-block { margin-bottom: 1.1rem; }
.section-block:last-child { margin-bottom: 0; }
.section-label {
  font-size: 0.68rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase;
  color: #b40087; margin-bottom: 0.5rem;
}
.section-content { font-size: 0.88rem; color: #e0c8d8; line-height: 1.6; }
.warmup-seq { margin-bottom: 0.55rem; }
.warmup-seq-title { font-size: 0.78rem; font-weight: 500; color: #e070c8; margin-bottom: 2px; }

.figure-pill {
  display: inline-block; background: rgba(180,0,135,0.15);
  border: 1px solid rgba(180,0,135,0.3); border-radius: 14px;
  padding: 3px 10px; font-size: 0.78rem; color: #e8c0dc; margin: 3px 4px 3px 0;
}

.bausteine-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.baustein-card {
  background: rgba(40,0,25,0.5); border: 1px solid rgba(180,0,135,0.2);
  border-radius: 12px; padding: 0.8rem 1rem;
}
.baustein-icon-label {
  display: flex; align-items: center; gap: 6px;
  font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: #b40087; margin-bottom: 5px; font-weight: 500;
}
.baustein-name { font-size: 0.9rem; font-weight: 500; color: #f5eaf0; margin-bottom: 3px; }
.baustein-meta { font-size: 0.75rem; color: #e070c8; margin-bottom: 4px; }
.baustein-hinweis { font-size: 0.82rem; color: #c4a8bb; line-height: 1.5; }

.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.info-item { background: rgba(40,0,25,0.4); border-radius: 10px; padding: 0.7rem 0.9rem; border: 1px solid rgba(180,0,135,0.15); }
.info-item-label { font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: #b40087; margin-bottom: 4px; }
.info-item-value { font-size: 0.84rem; color: #e0c8d8; line-height: 1.5; }

.health-box {
  background: rgba(0,80,40,0.2); border: 1px solid rgba(0,180,80,0.25);
  border-radius: 10px; padding: 0.65rem 1rem; font-size: 0.84rem; color: #a0e8b0;
}

.vk-reset {
  display: block; margin: 1.8rem auto 0;
  background: transparent; border: 1px solid rgba(180,0,135,0.35);
  border-radius: 10px; padding: 0.65rem 2rem; font-family: 'Jost', sans-serif;
  font-size: 0.88rem; color: #c4a8bb; cursor: pointer; transition: all 0.2s;
}
.vk-reset:hover { background: rgba(180,0,135,0.1); border-color: #b40087; color: #f5eaf0; }

@media (max-width: 580px) {
  .level-grid { grid-template-columns: repeat(2,1fr); }
  .form-grid { grid-template-columns: 1fr; }
  .fg-full { grid-column: 1; }
  .bausteine-grid { grid-template-columns: 1fr; }
  .info-grid { grid-template-columns: 1fr; }
}
`;

const BAUSTEINE = [
  { key: "spin",  icon: "🌀", label: "Spin" },
  { key: "trick", icon: "🎯", label: "Trick" },
  { key: "figur", icon: "⭐", label: "Figur" },
  { key: "move",  icon: "➡️", label: "Move" },
  { key: "tanz",  icon: "💃", label: "Tänzerisches Element" },
  { key: "boden", icon: "🔻", label: "Boden" },
];

export default function VerticalKayPlaner() {
  const [level, setLevel] = useState("1.0");
  const [pole, setPole] = useState("Static Pole");
  const [duration, setDuration] = useState("90 Minuten");
  const [freq, setFreq] = useState("1x pro Woche");
  const [group, setGroup] = useState("8");
  const [types, setTypes] = useState(["Technik"]);
  const [injuries, setInjuries] = useState([]);
  const [goal, setGoal] = useState("");
  const [injOther, setInjOther] = useState("");
  const [focus, setFocus] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("1");

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [options, setOptions] = useState([]);
  const [planMeta, setPlanMeta] = useState(null);
  const [activeOption, setActiveOption] = useState(0);

  const toggleType = (v) => setTypes(t => t.includes(v) ? t.filter(x => x !== v) : [...t, v]);
  const toggleInj = (v) => setInjuries(t => t.includes(v) ? t.filter(x => x !== v) : [...t, v]);

  async function generate() {
    setOptions([]); setActiveOption(0); setErrorMsg(""); setLoading(true);
    setStatusMsg("Unterrichtsplan wird generiert…");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: buildSystemPrompt(level),
          userPrompt: buildUserPrompt({ level, pole, duration, freq, group, unit: selectedUnit, types, injuries, injOther, goal, focus })
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fehler beim Generieren");

      const raw = data.result.trim();
      const parsed = JSON.parse(raw);
      setOptions(parsed);
      setPlanMeta({ level, pole, duration, freq, group, unit: selectedUnit });
    } catch (err) {
      setErrorMsg("Fehler: " + err.message + " — Bitte nochmal versuchen.");
    } finally {
      setStatusMsg(""); setLoading(false);
    }
  }

  function reset() {
    setOptions([]); setStatusMsg(""); setErrorMsg(""); setPlanMeta(null);
    setGoal(""); setFocus(""); setInjOther(""); setActiveOption(0);
  }

  const activeOpt = options[activeOption];

  return (
    <>
      <style>{css}</style>
      <div className="vk-root">
        <header className="vk-header">
          <div className="vk-badge"><span className="vk-dot" />Trainer-Planer · VerticalKay Education</div>
          <h1 className="vk-h1">Poledance Basic Trainer<br /><em>Unterrichtsplaner</em></h1>
          <p className="vk-subtitle">Level 1.0 · 1.1 · 2.0 · 3.0 · nach dem VerticalKay-Konzept</p>
        </header>

        <div className="vk-form">
          <div className="vk-section-label">Level der Gruppe</div>
          <div className="level-grid">
            {[["1.0","Pre Basic"],["1.1","Basic"],["2.0","Beginner"],["3.0","Intermediate"]].map(([l, sub]) => (
              <button key={l} className={`level-btn${level === l ? " active" : ""}`} onClick={() => setLevel(l)}>
                Level {l}<span className="level-sub">{sub}</span>
              </button>
            ))}
          </div>

          <div className="form-grid">
            <div>
              <label className="fg-label">Einheitsdauer</label>
              <select className="vk-select" value={duration} onChange={e => setDuration(e.target.value)}>
                <option>60 Minuten</option>
                <option>75 Minuten</option>
                <option>90 Minuten</option>
                <option>120 Minuten</option>
              </select>
            </div>
            <div>
              <label className="fg-label">Frequenz / Woche</label>
              <select className="vk-select" value={freq} onChange={e => setFreq(e.target.value)}>
                <option>1x pro Woche</option>
                <option>2x pro Woche</option>
                <option>3x pro Woche</option>
              </select>
            </div>
            <div>
              <label className="fg-label">Teilnehmeranzahl</label>
              <input className="vk-input vk-num-input" type="number" min="1" max="20" value={group} onChange={e => setGroup(e.target.value)} />
            </div>
            <div>
              <label className="fg-label">Einheit auswählen</label>
              <select className="vk-select" value={selectedUnit} onChange={e => setSelectedUnit(e.target.value)}>
                {Array.from({length: 10}, (_, i) => i + 1).map(n => (
                  <option key={n} value={String(n)}>Einheit {n}</option>
                ))}
              </select>
            </div>

            <div className="fg-full">
              <label className="fg-label">Pole-Modus</label>
              <div className="toggle-row">
                {["Static Pole","Spinning Pole","Beide Modi"].map(p => (
                  <button key={p} className={`toggle-btn${pole === p ? " active" : ""}`} onClick={() => setPole(p)}>{p}</button>
                ))}
              </div>
            </div>

            <div className="fg-full">
              <label className="fg-label">Was wird unterrichtet?</label>
              <div className="chips-row">
                {["Technik","Kombinationen","Choreografie","Kraft & Conditioning","Aufbau / Progression","Praxis"].map(v => (
                  <div key={v} className={`chip${types.includes(v) ? " active" : ""}`} onClick={() => toggleType(v)}>{v}</div>
                ))}
              </div>
            </div>

            <div className="fg-full">
              <label className="fg-label">Trainingsziel dieser Einheit</label>
              <input className="vk-input" placeholder="z.B. Erste Spins sicher üben, Flow verbessern…" value={goal} onChange={e => setGoal(e.target.value)} />
            </div>

            <div className="fg-full">
              <label className="fg-label">Verletzungen / Einschränkungen</label>
              <div className="chips-row" style={{marginBottom:"10px"}}>
                {["Schulter","Knie","Handgelenk","Rücken","Hüfte","Schwangerschaft"].map(v => (
                  <div key={v} className={`chip${injuries.includes(v) ? " active" : ""}`} onClick={() => toggleInj(v)}>{v}</div>
                ))}
              </div>
              <input className="vk-input" placeholder="Weitere Verletzungen / Hinweise…" value={injOther} onChange={e => setInjOther(e.target.value)} />
            </div>

            <div className="fg-full">
              <label className="fg-label">Besondere Wünsche / Notizen</label>
              <textarea className="vk-textarea" placeholder="z.B. Gruppe ist schüchtern beim Boden-Flow, mehr Choreografie gewünscht…" value={focus} onChange={e => setFocus(e.target.value)} />
            </div>
          </div>

          <button className="gen-btn" disabled={loading} onClick={generate}>
            {loading ? "Wird generiert…" : `✦ 3 Varianten für Einheit ${selectedUnit} generieren`}
          </button>
          {loading && <div className="vk-status"><span className="vk-spinner" />{statusMsg}</div>}
          {errorMsg && <div className="error-box">{errorMsg}</div>}
        </div>

        {options.length > 0 && (
          <div className="results-wrap">
            <div className="results-header">
              <h2 className="results-h2">Einheit {planMeta?.unit} · 3 Varianten</h2>
              {planMeta && <p className="results-meta">Level {planMeta.level} · {planMeta.pole} · {planMeta.duration} · {planMeta.freq} · {planMeta.group} TN</p>}
            </div>

            <div className="option-tabs">
              {options.map((opt, i) => (
                <button key={i} className="option-tab" onClick={() => setActiveOption(i)}
                  style={{
                    background: activeOption === i ? "rgba(180,0,135,0.3)" : "rgba(40,0,25,0.5)",
                    border: activeOption === i ? "1.5px solid #b40087" : "1px solid rgba(180,0,135,0.25)",
                    color: activeOption === i ? "#f5eaf0" : "#c4a8bb",
                    boxShadow: activeOption === i ? "0 0 16px rgba(180,0,135,0.25)" : "none"
                  }}>
                  <div className="option-tab-num" style={{color: activeOption === i ? "#e070c8" : "#a080a0"}}>Variante {opt.option}</div>
                  <div className="option-tab-title">{opt.optionLabel}</div>
                  {opt.optionBeschreibung && <div className="option-tab-desc">{opt.optionBeschreibung}</div>}
                </button>
              ))}
            </div>

            {activeOpt && (
              <div className="unit-card">
                <div className="unit-header">
                  <div className="unit-num">{activeOpt.option}</div>
                  <div className="unit-title-wrap">
                    <div className="unit-title">{activeOpt.optionLabel}</div>
                    <div className="unit-meta">{activeOpt.optionBeschreibung}</div>
                  </div>
                </div>
                <div className="unit-body">

                  {activeOpt.warmup?.length > 0 && (
                    <div className="section-block">
                      <div className="section-label">🔥 Warm-Up Sequenzen</div>
                      {activeOpt.warmup.map((s, j) => (
                        <div key={j} className="warmup-seq">
                          <div className="warmup-seq-title">{s.seq}</div>
                          <div className="section-content">{s.inhalt}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeOpt.wiederholung?.length > 0 && (
                    <div className="section-block">
                      <div className="section-label">🔄 Wiederholung bekannter Figuren</div>
                      <div>{activeOpt.wiederholung.map((f, j) => <span key={j} className="figure-pill">{f}</span>)}</div>
                    </div>
                  )}

                  <div className="section-block">
                    <div className="section-label">✦ Die 6 Bausteine dieser Einheit</div>
                    <div className="bausteine-grid">
                      {BAUSTEINE.map(({ key, icon, label }) => {
                        const b = activeOpt[key];
                        if (!b) return null;
                        return (
                          <div key={key} className="baustein-card">
                            <div className="baustein-icon-label">{icon} {label}</div>
                            <div className="baustein-name">{b.name}</div>
                            {(b.griff || b.uhrzeit) && (
                              <div className="baustein-meta">
                                {b.griff && b.griff !== "–" && <span>{b.griff}</span>}
                                {b.griff && b.griff !== "–" && b.uhrzeit && b.uhrzeit !== "–" && " · "}
                                {b.uhrzeit && b.uhrzeit !== "–" && <span>{b.uhrzeit}</span>}
                              </div>
                            )}
                            <div className="baustein-hinweis">{b.hinweis}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {activeOpt.kombi && (
                    <div className="section-block">
                      <div className="section-label">🔗 Kombination</div>
                      <div className="section-content">{activeOpt.kombi}</div>
                    </div>
                  )}

                  <div className="section-block">
                    <div className="info-grid">
                      {activeOpt.didaktik && (
                        <div className="info-item">
                          <div className="info-item-label">Didaktik-Tipp</div>
                          <div className="info-item-value">{activeOpt.didaktik}</div>
                        </div>
                      )}
                      {activeOpt.anatomie && (
                        <div className="info-item">
                          <div className="info-item-label">Anatomie</div>
                          <div className="info-item-value">{activeOpt.anatomie}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {activeOpt.gesundheitsTipp && (
                    <div className="section-block">
                      <div className="health-box">💚 {activeOpt.gesundheitsTipp}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button className="vk-reset" onClick={reset}>↺ Neue Einheit planen</button>
          </div>
        )}
      </div>
    </>
  );
}
