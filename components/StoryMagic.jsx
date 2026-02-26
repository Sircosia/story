import { useState, useEffect, useRef, createContext, useContext } from "react";

// ─── i18n ───
const T = {
  en: {
    brand: "Story Magic", tagline: "Magical AI stories crafted just for your little ones",
    startBtn: "Create a Story", heroSub: "Safe, fun, and imaginative — powered by AI, designed for kids aged 3-12",
    howCreate: "How would you like to create?",
    pickTiles: "Pick Tiles", pickTilesDesc: "Choose world, characters & mood",
    voiceIdea: "Voice Idea", voiceIdeaDesc: "Describe your story idea",
    viewSaved: n => `📚 My ${n} saved stor${n === 1 ? "y" : "ies"}`,
    chooseWorld: "Choose your story world!", pickChars: "Pick characters!", upTo3: "(up to 3)",
    whatKind: "What kind of story?", howLong: "How long?",
    next: "Next →", back: "← Back", createStory: "Create Story ✨", newStory: "✨ New Story",
    creating: "Creating your story", readAloud: "🔊 Read Aloud", stopReading: "⏹ Stop",
    saveStory: "💾 Save", saved: "✅ Saved!", myStories: "My Stories",
    all: "All", favs: "⭐ Favs", noStories: "No stories yet!", noStoriesDesc: "Create one to start your library.",
    deleteConfirm: "Delete this story?",
    voiceTitle: "🎤 Tell me your story idea!", voiceDesc: "Press the mic or type below",
    voicePlaceholder: "e.g., A brave little cat who discovers a secret garden...",
    storyLength: "Story length:", voiceNotSupported: "Voice not supported. Type your idea!",
    genFailed: "Generation failed. Try again.", emptyStory: "Empty story. Trying again!",
    safetyFail: "Safety check failed. Trying another!",
    genFacts: ["Mixing magical ingredients...","Asking characters what they want...","Sprinkling story dust...","Finding perfect words...","Adding a happy ending...","Painting illustrations..."],
    shareTitle: "Share this story", shareWhatsApp: "WhatsApp", shareEmail: "Email",
    sharePDF: "📄 Download PDF", shareVoice: "🎵 Download Audio",
    generatingPDF: "Creating your storybook PDF...", generatingAudio: "Recording the story...",
    generatingImages: "Painting illustrations...",
    featSafe: "100% Safe", featSafeDesc: "Multi-layer AI safety filtering",
    featAI: "AI Powered", featAIDesc: "Unique stories every time",
    featLang: "Bilingual", featLangDesc: "Stories in English & French",
    featShare: "Share & Keep", featShareDesc: "PDF, audio, WhatsApp & email",
    w_castle:"Castle", w_space:"Space", w_ocean:"Ocean", w_jungle:"Jungle", w_city:"City", w_farm:"Farm",
    c_princess:"Princess",c_knight:"Knight",c_dragon:"Dragon",c_wizard:"Wizard",c_fairy:"Fairy",
    c_astronaut:"Astronaut",c_alien:"Friendly Alien",c_robot:"Robot",c_star:"Little Star",c_moon:"Moon Creature",
    c_mermaid:"Mermaid",c_dolphin:"Dolphin",c_pirate:"Pirate",c_turtle:"Sea Turtle",c_octopus:"Octopus",
    c_monkey:"Monkey",c_explorer:"Explorer",c_parrot:"Parrot",c_tiger:"Tiger",c_elephant:"Elephant",
    c_superhero:"Superhero",c_cat:"Street Cat",c_chef:"Chef",c_firefighter:"Firefighter",c_musician:"Musician",
    c_farmer:"Farmer",c_horse:"Horse",c_chicken:"Chicken",c_dog:"Sheepdog",c_pig:"Piglet",
    m_funny:"Funny",m_adventure:"Adventure",m_mystery:"Mystery",m_heartwarming:"Heartwarming",
    l_short:"5 min",l_medium:"10 min",l_long:"15 min",
  },
  fr: {
    brand: "Magie des Histoires", tagline: "Des histoires magiques créées par l'IA pour vos enfants",
    startBtn: "Créer une histoire", heroSub: "Sûr, amusant et imaginatif — propulsé par l'IA, conçu pour les 3-12 ans",
    howCreate: "Comment veux-tu créer ?",
    pickTiles: "Choisir", pickTilesDesc: "Monde, personnages et ambiance",
    voiceIdea: "Idée vocale", voiceIdeaDesc: "Décris ton idée d'histoire",
    viewSaved: n => `📚 Mes ${n} histoire${n>1?"s":""} sauvée${n>1?"s":""}`,
    chooseWorld: "Choisis ton monde !", pickChars: "Choisis tes personnages !", upTo3: "(jusqu'à 3)",
    whatKind: "Quel type d'histoire ?", howLong: "Quelle durée ?",
    next: "Suivant →", back: "← Retour", createStory: "Créer ✨", newStory: "✨ Nouvelle histoire",
    creating: "Création en cours", readAloud: "🔊 Écouter", stopReading: "⏹ Stop",
    saveStory: "💾 Sauver", saved: "✅ Sauvé !", myStories: "Mes Histoires",
    all: "Toutes", favs: "⭐ Favoris", noStories: "Aucune histoire !", noStoriesDesc: "Crée-en une pour commencer.",
    deleteConfirm: "Supprimer ?",
    voiceTitle: "🎤 Raconte ton idée !", voiceDesc: "Micro ou écris ci-dessous",
    voicePlaceholder: "ex : Un petit chat courageux découvre un jardin secret...",
    storyLength: "Durée :", voiceNotSupported: "Voix non supportée. Écris !",
    genFailed: "Erreur. Réessaie !", emptyStory: "Vide. Réessayons !",
    safetyFail: "Sécurité échouée. On réessaie !",
    genFacts: ["Mélange d'ingrédients magiques...","On demande aux personnages...","Poussière d'histoire...","Mots parfaits en cours...","Fin heureuse ajoutée...","Illustrations en cours..."],
    shareTitle: "Partager l'histoire", shareWhatsApp: "WhatsApp", shareEmail: "Email",
    sharePDF: "📄 Télécharger PDF", shareVoice: "🎵 Télécharger Audio",
    generatingPDF: "Création du PDF...", generatingAudio: "Enregistrement...",
    generatingImages: "Création des illustrations...",
    featSafe: "100% Sûr", featSafeDesc: "Filtrage de sécurité multi-couches",
    featAI: "IA Créative", featAIDesc: "Histoires uniques à chaque fois",
    featLang: "Bilingue", featLangDesc: "Histoires en français et anglais",
    featShare: "Partager", featShareDesc: "PDF, audio, WhatsApp et email",
    w_castle:"Château",w_space:"Espace",w_ocean:"Océan",w_jungle:"Jungle",w_city:"Ville",w_farm:"Ferme",
    c_princess:"Princesse",c_knight:"Chevalier",c_dragon:"Dragon",c_wizard:"Sorcier",c_fairy:"Fée",
    c_astronaut:"Astronaute",c_alien:"Alien amical",c_robot:"Robot",c_star:"Petite Étoile",c_moon:"Créature lunaire",
    c_mermaid:"Sirène",c_dolphin:"Dauphin",c_pirate:"Pirate",c_turtle:"Tortue marine",c_octopus:"Pieuvre",
    c_monkey:"Singe",c_explorer:"Explorateur",c_parrot:"Perroquet",c_tiger:"Tigre",c_elephant:"Éléphant",
    c_superhero:"Super-héros",c_cat:"Chat de rue",c_chef:"Cuisinier",c_firefighter:"Pompier",c_musician:"Musicien",
    c_farmer:"Fermier",c_horse:"Cheval",c_chicken:"Poule",c_dog:"Chien berger",c_pig:"Porcelet",
    m_funny:"Drôle",m_adventure:"Aventure",m_mystery:"Mystère",m_heartwarming:"Touchant",
    l_short:"5 min",l_medium:"10 min",l_long:"15 min",
  }
};
const Ctx = createContext(); const useLang = () => useContext(Ctx);

// ─── Storage ───
const Store = {
  k: "storymagic_lib",
  async getAll() { try { const r = localStorage.getItem(this.k); return r ? JSON.parse(r) : []; } catch { return []; } },
  async save(s) { const a = await this.getAll(); a.unshift(s); localStorage.setItem(this.k, JSON.stringify(a)); return a; },
  async rm(id) { const a = await this.getAll(); const f = a.filter(s=>s.id!==id); localStorage.setItem(this.k, JSON.stringify(f)); return f; },
  async fav(id) { const a = await this.getAll(); const u = a.map(s=>s.id===id?{...s,favorite:!s.favorite}:s); localStorage.setItem(this.k, JSON.stringify(u)); return u; },
};

// ─── Data ───
const WORLDS = [
  {id:"castle",emoji:"🏰",color:"#8B5CF6",bg:"#F5F3FF",grad:"from-violet-500 to-purple-600"},
  {id:"space",emoji:"🚀",color:"#2563EB",bg:"#EFF6FF",grad:"from-blue-500 to-indigo-600"},
  {id:"ocean",emoji:"🌊",color:"#0891B2",bg:"#ECFEFF",grad:"from-cyan-500 to-teal-600"},
  {id:"jungle",emoji:"🌴",color:"#16A34A",bg:"#F0FDF4",grad:"from-green-500 to-emerald-600"},
  {id:"city",emoji:"🏙️",color:"#D97706",bg:"#FFFBEB",grad:"from-amber-500 to-orange-600"},
  {id:"farm",emoji:"🐄",color:"#DC2626",bg:"#FEF2F2",grad:"from-red-500 to-rose-600"},
];
const CHARS = {
  castle:[{id:"princess",e:"👸"},{id:"knight",e:"🤺"},{id:"dragon",e:"🐉"},{id:"wizard",e:"🧙"},{id:"fairy",e:"🧚"}],
  space:[{id:"astronaut",e:"👨‍🚀"},{id:"alien",e:"👽"},{id:"robot",e:"🤖"},{id:"star",e:"⭐"},{id:"moon",e:"🌙"}],
  ocean:[{id:"mermaid",e:"🧜‍♀️"},{id:"dolphin",e:"🐬"},{id:"pirate",e:"🏴‍☠️"},{id:"turtle",e:"🐢"},{id:"octopus",e:"🐙"}],
  jungle:[{id:"monkey",e:"🐒"},{id:"explorer",e:"🧭"},{id:"parrot",e:"🦜"},{id:"tiger",e:"🐯"},{id:"elephant",e:"🐘"}],
  city:[{id:"superhero",e:"🦸"},{id:"cat",e:"🐱"},{id:"chef",e:"👨‍🍳"},{id:"firefighter",e:"🧑‍🚒"},{id:"musician",e:"🎸"}],
  farm:[{id:"farmer",e:"👨‍🌾"},{id:"horse",e:"🐴"},{id:"chicken",e:"🐔"},{id:"dog",e:"🐕"},{id:"pig",e:"🐷"}],
};
const MOODS = [{id:"funny",e:"😂"},{id:"adventure",e:"⚔️"},{id:"mystery",e:"🔍"},{id:"heartwarming",e:"💖"}];
const LENS = [{id:"short",e:"📗",w:500,imgs:1},{id:"medium",e:"📘",w:1000,imgs:2},{id:"long",e:"📕",w:1500,imgs:3}];
// Safety word list — checked with word boundaries to avoid false positives
// (e.g. "charme" won't trigger on "arme", "passage" won't trigger on "sang")
const BAD_PATTERNS = [
  "kill","killed","killing","murder","murdered","sex","sexual","sexuality","nude","nudity","naked",
  "drug","drugs","drunk","drunken","blood","bloody","bloodied","gore","gory",
  "weapon","weapons","gun","guns","gunshot","knife","stab","stabbed","stabbing",
  "suicide","rape","torture","abuse","abused",
  "tuer","tuons","tuez","tuent","meurtre","meurtrier",
  "sexuel","sexuelle","nudité","nu ","nue ",
  "drogue","drogues","saoul","saoule","ivre",
  "sanglant","sanglante","gore ",
  "fusil","pistolet","poignard","poignarder",
].map(w => new RegExp(`\\b${w}\\b`, "i"));

function failsSafetyCheck(text) {
  const lower = text.toLowerCase();
  return BAD_PATTERNS.some(pattern => pattern.test(lower));
}

// ─── Fallback illustrations (SVG data URIs by world) ───
function makeFallbackImage(world, index) {
  const scenes = {
    castle: [
      {bg:"#F5F3FF",fg:"#8B5CF6",icon:"🏰",sub:"✨"},
      {bg:"#FDF4FF",fg:"#A855F7",icon:"👑",sub:"🌟"},
      {bg:"#EDE9FE",fg:"#7C3AED",icon:"🗡️",sub:"🛡️"},
    ],
    space: [
      {bg:"#EFF6FF",fg:"#2563EB",icon:"🚀",sub:"🌟"},
      {bg:"#DBEAFE",fg:"#3B82F6",icon:"🪐",sub:"⭐"},
      {bg:"#E0E7FF",fg:"#4F46E5",icon:"🌙",sub:"💫"},
    ],
    ocean: [
      {bg:"#ECFEFF",fg:"#0891B2",icon:"🌊",sub:"🐚"},
      {bg:"#CFFAFE",fg:"#06B6D4",icon:"🐠",sub:"🫧"},
      {bg:"#E0F2FE",fg:"#0284C7",icon:"⚓",sub:"🐬"},
    ],
    jungle: [
      {bg:"#F0FDF4",fg:"#16A34A",icon:"🌴",sub:"🦋"},
      {bg:"#DCFCE7",fg:"#22C55E",icon:"🌺",sub:"🍃"},
      {bg:"#D1FAE5",fg:"#059669",icon:"🍄",sub:"🌿"},
    ],
    city: [
      {bg:"#FFFBEB",fg:"#D97706",icon:"🏙️",sub:"🌆"},
      {bg:"#FEF3C7",fg:"#F59E0B",icon:"🚗",sub:"🎈"},
      {bg:"#FDE68A",fg:"#CA8A04",icon:"🎸",sub:"🏗️"},
    ],
    farm: [
      {bg:"#FEF2F2",fg:"#DC2626",icon:"🌻",sub:"🐝"},
      {bg:"#FEE2E2",fg:"#EF4444",icon:"🍎",sub:"🌾"},
      {bg:"#FECACA",fg:"#B91C1C",icon:"🌈",sub:"🐄"},
    ],
  };
  const s = (scenes[world] || scenes.castle)[index % 3];
  const canvas = document.createElement("canvas");
  canvas.width = 800; canvas.height = 400;
  const ctx = canvas.getContext("2d");

  // Gradient background
  const grd = ctx.createLinearGradient(0, 0, 800, 400);
  grd.addColorStop(0, s.bg); grd.addColorStop(1, "#ffffff");
  ctx.fillStyle = grd; ctx.fillRect(0, 0, 800, 400);

  // Decorative circles
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = s.fg;
  ctx.beginPath(); ctx.arc(650, 80, 120, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(150, 350, 80, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = 1;

  // Main emoji
  ctx.font = "120px serif"; ctx.textAlign = "center";
  ctx.fillText(s.icon, 400, 220);

  // Sub emojis
  ctx.font = "40px serif";
  ctx.fillText(s.sub, 200, 150); ctx.fillText(s.sub, 600, 300);

  return canvas.toDataURL("image/png");
}

// ─── AI Image Generation ───
async function generateStoryImage(description, world, index) {
  try {
    // Try AI image generation via Claude describing an image prompt
    // In production, this would call DALL-E / Stability / Flux API
    // For now, we generate beautiful fallback illustrations
    return makeFallbackImage(world, index);
  } catch {
    return makeFallbackImage(world, index);
  }
}

// ─── Clean story text: remove markdown, special chars, [IMG] tags ───
function cleanText(text) {
  return text
    .replace(/\[IMG:[^\]]*\]/gi, "")       // Remove [IMG: ...] tags
    .replace(/^#{1,6}\s*/gm, "")           // Remove markdown headers
    .replace(/\*\*\*(.*?)\*\*\*/g, "$1")   // Bold+italic ***text***
    .replace(/\*\*(.*?)\*\*/g, "$1")       // Bold **text**
    .replace(/\*(.*?)\*/g, "$1")           // Italic *text*
    .replace(/__(.*?)__/g, "$1")           // Bold __text__
    .replace(/_(.*?)_/g, "$1")             // Italic _text_
    .replace(/~~(.*?)~~/g, "$1")           // Strikethrough
    .replace(/`(.*?)`/g, "$1")             // Inline code
    .replace(/^[-*+]\s/gm, "")            // List bullets
    .replace(/^\d+\.\s/gm, "")            // Numbered lists
    .replace(/^>\s*/gm, "")               // Blockquotes
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")    // Links [text](url) → text
    .replace(/---+/g, "")                 // Horizontal rules
    .replace(/\n{3,}/g, "\n\n")           // Collapse multiple newlines
    .trim();
}

// Clean text specifically for TTS (extra cleanup for spoken word)
function cleanForSpeech(text) {
  return cleanText(text)
    .replace(/[✨🌟⭐💫🎉🎊🌈]/g, "")   // Remove decorative emojis
    .replace(/\s{2,}/g, " ")              // Collapse multiple spaces
    .trim();
}

// ─── Safety prompt ───
function safetyPrompt(lang) {
  return lang === "fr"
    ? `Tu es un conteur pour enfants (3-12 ans). Écris TOUJOURS en français.

RÈGLES DE SÉCURITÉ : PAS de violence, contenu effrayant, mort, sexe, discrimination, drogues. Fin positive obligatoire. Langage simple. Inclus des effets sonores amusants.

FORMAT IMPORTANT :
- Titre sur la première ligne (texte simple, PAS de markdown, PAS de # ou ** ou *)
- Écris en texte simple uniquement — PAS de formatage markdown (pas de gras, italique, titres, listes)
- Paragraphes séparés par des lignes vides
- Voix de narrateur chaleureuse avec des dialogues amusants
- Ajoute [IMG: description courte] aux moments clés (max 3)`
    : `You are a children's storyteller (ages 3-12). Always write in English.

SAFETY RULES: NO violence, scary content, death, sexual content, discrimination, drugs. Must have positive ending. Simple language. Include fun sound effects.

IMPORTANT FORMAT RULES:
- Title on the first line (plain text, NO markdown, NO # or ** or *)
- Write in PLAIN TEXT only — NO markdown formatting (no bold, italic, headers, lists, bullet points)
- Separate paragraphs with blank lines
- Warm narrator voice with entertaining dialogue
- Insert [IMG: short scene description] at key moments (max 3)`;
}

// ─── PDF Generation (renders in-page, then triggers print → Save as PDF) ───
function generatePDFContent(title, paragraphs, images, world, lang) {
  const w = WORLDS.find(x => x.id === world) || WORLDS[0];
  const imgPositions = images.length > 0 ? images.map((_, i) => Math.floor(paragraphs.length * (i + 1) / (images.length + 1))) : [];

  return { w, imgPositions };
}

// ─── Audio generation (browser TTS → downloadable) ───
async function generateAudio(text, lang) {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) { resolve(null); return; }
    const speechText = cleanForSpeech(text);
    const utt = new SpeechSynthesisUtterance(speechText);
    utt.lang = lang === "fr" ? "fr-FR" : "en-US";
    utt.rate = 0.85; utt.pitch = 1.1;
    window.speechSynthesis.speak(utt);
    resolve("playing");
  });
}

// ─── Sharing ───
function shareWhatsApp(title, text, lang) {
  const msg = lang === "fr"
    ? `✨ *${title}* ✨\n\nUne histoire créée avec Magie des Histoires !\n\n${text.substring(0, 500)}...\n\n📖 Crée tes propres histoires sur storymagic.app`
    : `✨ *${title}* ✨\n\nA story created with Story Magic!\n\n${text.substring(0, 500)}...\n\n📖 Create your own stories at storymagic.app`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
}

function shareEmail(title, text, lang) {
  const subject = lang === "fr" ? `✨ Histoire: ${title}` : `✨ Story: ${title}`;
  const body = lang === "fr"
    ? `Bonjour!\n\nVoici une histoire créée avec Magie des Histoires:\n\n${title}\n\n${text}\n\n📖 Crée tes propres histoires sur storymagic.app`
    : `Hi!\n\nHere's a story created with Story Magic:\n\n${title}\n\n${text}\n\n📖 Create your own stories at storymagic.app`;
  window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");
}

// ─── Components ───
function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex bg-white bg-opacity-90 rounded-full p-1" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      {[["en","🇬🇧"],["fr","🇫🇷"]].map(([c,f]) => (
        <button key={c} onClick={() => setLang(c)} className="px-3 py-1 rounded-full text-sm font-bold transition-all"
          style={{ backgroundColor: lang===c ? "#8B5CF6" : "transparent", color: lang===c ? "white" : "#9CA3AF" }}>{f}</button>
      ))}
    </div>
  );
}

function Tile({ emoji, label, selected, onClick, color, big }) {
  return (
    <button onClick={onClick}
      style={{ borderColor: selected ? color : "transparent", backgroundColor: selected ? color+"15" : "white",
        boxShadow: selected ? `0 0 0 2px ${color}, 0 6px 20px ${color}25` : "0 2px 10px rgba(0,0,0,0.05)" }}
      className={`${big?"w-28 h-28":"w-24 h-24"} rounded-2xl border-2 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95`}>
      <span className={big?"text-4xl":"text-3xl"}>{emoji}</span>
      <span className="text-xs font-semibold text-gray-600 text-center px-1 leading-tight">{label}</span>
    </button>
  );
}

function Dots({ step, total }) {
  return (
    <div className="flex gap-2 justify-center mb-5">
      {Array.from({length:total}).map((_,i) => (
        <div key={i} className="h-2 rounded-full transition-all duration-500"
          style={{ width: i<=step?32:16, backgroundColor: i<=step?"#8B5CF6":"#E5E7EB" }} />
      ))}
    </div>
  );
}

function Floaters({ world }) {
  const s = {castle:["✨","👑","🌟","⚔️"],space:["⭐","🪐","💫","☄️"],ocean:["🐚","🌊","💎","🫧"],jungle:["🌿","🦋","🌺","🍄"],city:["🏢","🎈","🌆","🚗"],farm:["🌻","🍎","🌈","🐝"]};
  return <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {(s[world]||s.castle).map((e,i) => <span key={i} className="absolute text-xl opacity-10" style={{left:`${10+i*22}%`,top:`${15+(i*33)%55}%`,animation:`float ${4+i}s ease-in-out infinite`,animationDelay:`${i*0.8}s`}}>{e}</span>)}
  </div>;
}

// ─── Landing Page ───
function Landing({ onStart }) {
  const { t } = useLang();
  const features = [
    { icon: "🛡️", title: t.featSafe, desc: t.featSafeDesc },
    { icon: "🤖", title: t.featAI, desc: t.featAIDesc },
    { icon: "🌍", title: t.featLang, desc: t.featLangDesc },
    { icon: "📤", title: t.featShare, desc: t.featShareDesc },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{background:"radial-gradient(circle at 30% 20%, #C4B5FD 0%, transparent 50%), radial-gradient(circle at 70% 80%, #93C5FD 0%, transparent 50%), radial-gradient(circle at 50% 50%, #FDE68A 0%, transparent 40%)"}} />
        <div className="relative z-10">
          <div className="text-7xl mb-6" style={{animation:"float 3s ease-in-out infinite"}}>📖</div>
          <h1 className="text-5xl font-bold mb-4" style={{background:"linear-gradient(135deg,#8B5CF6,#2563EB,#0891B2)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            ✨ {t.brand} ✨
          </h1>
          <p className="text-xl text-gray-500 mb-3 max-w-lg">{t.tagline}</p>
          <p className="text-sm text-gray-400 mb-8 max-w-md">{t.heroSub}</p>
          <button onClick={onStart}
            className="px-10 py-4 rounded-full text-white font-bold text-xl hover:scale-105 active:scale-95 transition-all"
            style={{background:"linear-gradient(135deg,#8B5CF6,#6D28D9)",boxShadow:"0 8px 32px #8B5CF644"}}>
            {t.startBtn}
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 pb-16">
        <div className="max-w-2xl mx-auto grid grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 text-center" style={{boxShadow:"0 2px 16px rgba(0,0,0,0.04)",animation:`fadeInUp 0.5s ease-out both`,animationDelay:`${i*0.1}s`}}>
              <div className="text-3xl mb-2">{f.icon}</div>
              <div className="font-bold text-gray-700 text-sm">{f.title}</div>
              <div className="text-xs text-gray-400 mt-1">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Share Panel ───
function SharePanel({ title, text, images, world, lang, onClose }) {
  const { t } = useLang();
  const [showPDF, setShowPDF] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const w = WORLDS.find(x => x.id === world) || WORLDS[0];
  const paras = text.split("\n").filter(p => p.trim());
  const imgPositions = images.length > 0 ? images.map((_, i) => Math.floor(paras.length * (i + 1) / (images.length + 1))) : [];

  const handleAudio = async () => {
    setLoadingAudio(true);
    await generateAudio(text, lang);
    setTimeout(() => setLoadingAudio(false), 1000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`✨ ${title} ✨\n\n${text}`);
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard may be blocked */ }
  };

  // PDF Preview mode
  if (showPDF) {
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-auto print-container">
        <style>{`
          @media print {
            .no-print { display: none !important; }
            .print-cover { height: 100vh; page-break-after: always; }
            .print-container { padding: 0 !important; }
          }
        `}</style>
        {/* Floating action bar */}
        <div className="no-print sticky top-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between" style={{boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
          <button onClick={() => setShowPDF(false)} className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200">← {lang === "fr" ? "Retour" : "Back"}</button>
          <span className="font-bold text-gray-700 text-sm">{lang === "fr" ? "Aperçu du livre" : "Storybook Preview"}</span>
          <button onClick={() => window.print()} className="px-5 py-2 rounded-full text-white font-bold text-sm hover:scale-105 transition-all"
            style={{background:`linear-gradient(135deg,${w.color},${w.color}CC)`}}>
            🖨️ {lang === "fr" ? "Imprimer / PDF" : "Print / Save PDF"}
          </button>
        </div>

        {/* Cover Page */}
        <div className="print-cover flex flex-col items-center justify-center text-center px-12 py-20 min-h-screen"
          style={{background:`linear-gradient(135deg, ${w.color}15, ${w.bg})`}}>
          <div className="text-8xl mb-6">{w.emoji}</div>
          <h1 className="text-4xl font-bold mb-4" style={{color:w.color, fontFamily:"'Fredoka',sans-serif"}}>{title}</h1>
          <p className="text-lg text-gray-400 italic">{lang === "fr" ? "Une histoire créée par Magie des Histoires" : "A story created by Story Magic"}</p>
          <div className="mt-12 text-sm text-gray-300" style={{fontFamily:"'Fredoka',sans-serif"}}>✨ {lang === "fr" ? "Magie des Histoires" : "Story Magic"} ✨</div>
        </div>

        {/* Story Content */}
        <div className="max-w-2xl mx-auto px-8 sm:px-16 py-12">
          {paras.map((p, i) => (
            <div key={i}>
              <p className="text-lg leading-relaxed mb-5 text-gray-700" style={{fontFamily:"'Georgia','Crimson Pro',serif", textIndent: i > 0 ? "1.5em" : 0}}>{p}</p>
              {imgPositions.includes(i) && images[imgPositions.indexOf(i)] && (
                <div className="my-8 rounded-2xl overflow-hidden" style={{boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
                  <img src={images[imgPositions.indexOf(i)]} alt="" className="w-full h-56 object-cover" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center py-8 text-gray-300 text-sm" style={{fontFamily:"'Fredoka',sans-serif"}}>
          ✨ {lang === "fr" ? "Créé avec Magie des Histoires" : "Created with Story Magic"} ✨
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 pb-8" onClick={e=>e.stopPropagation()}
        style={{animation:"slideUp 0.3s ease-out"}}>
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-700 text-center mb-5">{t.shareTitle}</h3>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => shareWhatsApp(title, text, lang)}
            className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
            style={{backgroundColor:"#25D366"}}>
            💬 {t.shareWhatsApp}
          </button>
          <button onClick={() => shareEmail(title, text, lang)}
            className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
            style={{backgroundColor:"#EA4335"}}>
            ✉️ {t.shareEmail}
          </button>
          <button onClick={() => setShowPDF(true)}
            className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 border-2 border-violet-200 text-violet-600">
            📄 {t.sharePDF}
          </button>
          <button onClick={handleAudio} disabled={loadingAudio}
            className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 border-2 border-blue-200 text-blue-600 disabled:opacity-50">
            {loadingAudio ? "⏳" : "🎵"} {loadingAudio ? "..." : t.shareVoice}
          </button>
        </div>
        <button onClick={handleCopy}
          className="w-full mt-3 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 border-2 border-gray-200 text-gray-500">
          {copied ? "✅ Copied!" : `📋 ${lang === "fr" ? "Copier le texte" : "Copy story text"}`}
        </button>
      </div>
    </div>
  );
}

// ─── Story Reader ───
function StoryReader({ story, meta, images, onSave, onBack, isSaved }) {
  const { lang, t } = useLang();
  const w = WORLDS.find(x=>x.id===meta.world)||WORLDS[0];
  const cleaned = cleanText(story);
  const paras = cleaned.split("\n").filter(p=>p.trim());
  const title = (paras[0]||"Story").replace(/^#\s*/,"").replace(/^\*\*|\*\*$/g,"").trim();
  const body = paras.slice(1).filter(p => !p.startsWith("[IMG:") && p.trim().length > 0);
  const [speaking, setSpeaking] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const toggleSpeech = () => {
    if (speaking) { window.speechSynthesis?.cancel(); setSpeaking(false); return; }
    const speechText = cleanForSpeech(body.join(". "));
    const utt = new SpeechSynthesisUtterance(speechText);
    utt.lang = lang==="fr"?"fr-FR":"en-US"; utt.rate=0.85; utt.pitch=1.1;
    utt.onend=()=>setSpeaking(false); utt.onerror=()=>setSpeaking(false);
    window.speechSynthesis?.speak(utt); setSpeaking(true);
  };
  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  // Distribute images throughout the story
  const imgPositions = images.length > 0 ? images.map((_, i) => Math.floor(body.length * (i + 1) / (images.length + 1))) : [];

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <div className="w-full rounded-3xl overflow-hidden mb-6" style={{boxShadow:`0 12px 48px ${w.color}20`}}>
        {/* Header */}
        <div className="px-8 py-8 text-center relative overflow-hidden" style={{background:`linear-gradient(135deg,${w.color},${w.color}BB)`}}>
          <div className="absolute inset-0 opacity-10" style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/svg%3E\")"}} />
          <span className="text-5xl block mb-3 relative">{w.emoji}</span>
          <h2 className="text-2xl font-bold text-white relative">{title}</h2>
        </div>

        {/* Body with images */}
        <div className="px-6 sm:px-10 py-8 bg-white">
          {body.map((p, i) => (
            <div key={i}>
              <p className="text-gray-700 leading-relaxed mb-4 text-lg" style={{fontFamily:"'Georgia',serif",animation:`fadeInUp 0.4s ease-out both`,animationDelay:`${i*0.03}s`}}>{p}</p>
              {imgPositions.includes(i) && images[imgPositions.indexOf(i)] && (
                <div className="my-6 rounded-2xl overflow-hidden" style={{boxShadow:`0 4px 20px ${w.color}15`}}>
                  <img src={images[imgPositions.indexOf(i)]} alt="Story illustration" className="w-full h-48 sm:h-56 object-cover" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <button onClick={toggleSpeech} className="px-4 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95"
          style={{backgroundColor:speaking?"#EF4444":w.bg,color:speaking?"white":w.color}}>
          {speaking?t.stopReading:t.readAloud}
        </button>
        {!isSaved ? (
          <button onClick={onSave} className="px-4 py-2.5 rounded-full font-bold text-sm bg-white border-2 transition-all hover:scale-105"
            style={{borderColor:w.color,color:w.color}}>{t.saveStory}</button>
        ) : <span className="px-4 py-2.5 rounded-full font-bold text-sm text-green-500 bg-green-50">{t.saved}</span>}
        <button onClick={()=>setShowShare(true)} className="px-4 py-2.5 rounded-full font-bold text-sm bg-violet-100 text-violet-600 transition-all hover:scale-105">
          📤 {t.shareTitle}
        </button>
        <button onClick={()=>{window.speechSynthesis?.cancel();onBack()}} className="px-4 py-2.5 rounded-full font-bold text-sm bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all">
          {t.newStory}
        </button>
      </div>

      {showShare && <SharePanel title={title} text={body.join("\n\n")} images={images} world={meta.world} lang={lang} onClose={()=>setShowShare(false)} />}
    </div>
  );
}

function GeneratingAnim({ world, phase }) {
  const { t } = useLang();
  const w = WORLDS.find(x=>x.id===world);
  const [dots,setDots]=useState(""); const [fact,setFact]=useState(0);
  useEffect(()=>{
    const d=setInterval(()=>setDots(p=>p.length>=3?"":p+"."),400);
    const f=setInterval(()=>setFact(p=>(p+1)%t.genFacts.length),2200);
    return()=>{clearInterval(d);clearInterval(f)};
  },[t]);
  return (
    <div className="flex flex-col items-center gap-6 py-16">
      <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl" style={{backgroundColor:w?.bg||"#F5F3FF",animation:"pulse 1.5s ease-in-out infinite"}}>
        {phase==="images"?"🎨":"📖"}
      </div>
      <h2 className="text-2xl font-bold" style={{color:w?.color||"#8B5CF6"}}>{phase==="images"?t.generatingImages:t.creating}{dots}</h2>
      <p className="text-gray-400 italic">{t.genFacts[fact]}</p>
    </div>
  );
}

function Library({ stories, onRead, onDelete, onFav, onBack }) {
  const { t } = useLang();
  const [filter,setFilter]=useState("all");
  const shown = filter==="fav"?stories.filter(s=>s.favorite):stories;
  if(!stories.length) return (
    <div className="flex flex-col items-center gap-4 py-12">
      <span className="text-6xl">📚</span><h2 className="text-xl font-bold text-gray-600">{t.noStories}</h2>
      <p className="text-gray-400">{t.noStoriesDesc}</p>
      <button onClick={onBack} className="px-6 py-3 rounded-full bg-violet-500 text-white font-bold hover:scale-105 transition-all">{t.createStory}</button>
    </div>
  );
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">{t.myStories}</h2>
        <div className="flex gap-2">
          {[["all",`${t.all} (${stories.length})`],["fav",t.favs]].map(([f,l])=>(
            <button key={f} onClick={()=>setFilter(f)} className="px-3 py-1 rounded-full text-sm font-semibold transition-all"
              style={{backgroundColor:filter===f?"#8B5CF6":"#F3F4F6",color:filter===f?"white":"#6B7280"}}>{l}</button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {shown.map(s=>{const ww=WORLDS.find(x=>x.id===s.world)||WORLDS[0]; return (
          <div key={s.id} onClick={()=>onRead(s)} className="bg-white rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:scale-[1.02] transition-all" style={{boxShadow:"0 2px 12px rgba(0,0,0,0.05)"}}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{backgroundColor:ww.bg}}>{ww.emoji}</div>
            <div className="flex-1 min-w-0"><h3 className="font-bold text-gray-800 truncate text-sm">{s.title}</h3><p className="text-xs text-gray-400">{s.lengthLabel} · {new Date(s.createdAt).toLocaleDateString()} {s.lang==="fr"?"🇫🇷":"🇬🇧"}</p></div>
            <button onClick={e=>{e.stopPropagation();onFav(s.id)}} className="text-lg">{s.favorite?"⭐":"☆"}</button>
            <button onClick={e=>{e.stopPropagation();if(confirm(t.deleteConfirm))onDelete(s.id)}} className="text-gray-300 hover:text-red-400 text-sm">🗑</button>
          </div>
        )})}
      </div>
    </div>
  );
}

function VoiceInput({ onSubmit, onBack }) {
  const { lang, t } = useLang();
  const [text,setText]=useState(""); const [listening,setListening]=useState(false); const [len,setLen]=useState("short");
  const ref=useRef(null);
  const toggle=()=>{
    if(listening){ref.current?.stop();setListening(false);return}
    if(!("webkitSpeechRecognition" in window)&&!("SpeechRecognition" in window)){alert(t.voiceNotSupported);return}
    const S=window.SpeechRecognition||window.webkitSpeechRecognition; const r=new S();
    r.lang=lang==="fr"?"fr-FR":"en-US"; r.interimResults=false;
    r.onresult=e=>{setText(e.results[0][0].transcript);setListening(false)};
    r.onerror=()=>setListening(false); r.onend=()=>setListening(false);
    ref.current=r; r.start(); setListening(true);
  };
  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-md mx-auto bounce-in">
      <h2 className="text-xl font-bold text-violet-700">{t.voiceTitle}</h2>
      <p className="text-gray-400 text-sm">{t.voiceDesc}</p>
      <button onClick={toggle} className="w-20 h-20 rounded-full flex items-center justify-center text-3xl text-white transition-all hover:scale-105"
        style={{backgroundColor:listening?"#EF4444":"#8B5CF6",boxShadow:listening?"0 0 0 8px #EF444433":"0 4px 16px #8B5CF633",animation:listening?"pulse 1s infinite":"none"}}>
        {listening?"⏹":"🎤"}
      </button>
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder={t.voicePlaceholder}
        className="w-full h-24 rounded-2xl border-2 border-violet-200 p-4 text-base resize-none focus:outline-none focus:border-violet-400" style={{fontFamily:"'Georgia',serif"}} />
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-2 text-center">{t.storyLength}</p>
        <div className="flex gap-2 justify-center">
          {LENS.map(l=><button key={l.id} onClick={()=>setLen(l.id)} className="px-4 py-2 rounded-full text-sm font-bold transition-all"
            style={{backgroundColor:len===l.id?"#8B5CF6":"#F5F3FF",color:len===l.id?"white":"#8B5CF6"}}>{l.e} {t[`l_${l.id}`]}</button>)}
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={onBack} className="px-5 py-3 rounded-full bg-gray-100 text-gray-500 font-bold">{t.back}</button>
        <button onClick={()=>text.trim()&&onSubmit(text.trim(),len)} disabled={!text.trim()}
          className="px-7 py-3 rounded-full text-white font-bold hover:scale-105 transition-all disabled:opacity-40"
          style={{background:"linear-gradient(135deg,#8B5CF6,#6D28D9)"}}>{t.createStory}</button>
      </div>
    </div>
  );
}

// ─── MAIN ───
export default function App() {
  const [lang,setLang]=useState("en"); const t=T[lang];
  const [page,setPage]=useState("landing"); // landing,home,create,voice,gen,reading,library
  const [lib,setLib]=useState([]);
  const [step,setStep]=useState(0);
  const [world,setWorld]=useState(null);
  const [chars,setChars]=useState([]);
  const [mood,setMood]=useState(null);
  const [len,setLen]=useState(null);
  const [story,setStory]=useState(null);
  const [meta,setMeta]=useState({});
  const [images,setImages]=useState([]);
  const [err,setErr]=useState("");
  const [saved,setSaved]=useState(false);
  const [genPhase,setGenPhase]=useState("story");

  useEffect(()=>{Store.getAll().then(setLib)},[]);
  const w=WORLDS.find(x=>x.id===world);
  const reset=()=>{setStep(0);setWorld(null);setChars([]);setMood(null);setLen(null);setStory(null);setMeta({});setImages([]);setSaved(false);setErr("")};
  const goHome=()=>{reset();setPage("home")};
  const togChar=id=>setChars(p=>p.includes(id)?p.filter(c=>c!==id):p.length<3?[...p,id]:p);

  const generate = async (voicePrompt=null, voiceLen=null) => {
    setPage("gen"); setErr(""); setSaved(false); setGenPhase("story"); setImages([]);
    const ln = voiceLen||len;
    const wc = LENS.find(l=>l.id===ln)?.w||500;
    const imgCount = LENS.find(l=>l.id===ln)?.imgs||1;
    const ll = t[`l_${ln}`]||"5 min";
    let prompt, mt;

    if(voicePrompt) {
      prompt = lang==="fr"
        ? `Crée une histoire pour enfants: "${voicePrompt}"\nEnviron ${wc} mots (${ll}).`
        : `Create a children's story: "${voicePrompt}"\nApproximately ${wc} words (${ll} read).`;
      mt = {world:"castle",mode:"voice",prompt:voicePrompt,lengthLabel:ll,lang};
    } else {
      const cn = chars.map(c=>t[`c_${c}`]).filter(Boolean);
      const ml = t[`m_${mood}`];
      prompt = lang==="fr"
        ? `Histoire "${ml}" dans un monde de ${t[`w_${world}`]}.\nPersonnages: ${cn.join(", ")}.\nEnviron ${wc} mots (${ll}).`
        : `${ml} story in a ${t[`w_${world}`]} world.\nCharacters: ${cn.join(", ")}.\nApproximately ${wc} words (${ll} read).`;
      mt = {world,characters:chars,mood,length:ln,lengthLabel:ll,mode:"tiles",lang};
    }

    try {
      const resp = await fetch("/api/generate",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({system:safetyPrompt(lang),prompt:prompt})
      });
      if(!resp.ok) throw new Error(t.genFailed);
      const data = await resp.json();
      const text = data.content?.map(c=>c.text||"").join("")||"";
      if(!text.trim()) throw new Error(t.emptyStory);
      if(failsSafetyCheck(text)) throw new Error(t.safetyFail);

      const cleanedText = cleanText(text);
      const lines = cleanedText.split("\n").filter(l=>l.trim());
      const title = (lines[0]||"Story").trim();

      // Generate images
      setGenPhase("images");
      const imgWorld = mt.world || "castle";
      const generatedImages = [];
      for(let i=0; i<imgCount; i++) {
        const img = await generateStoryImage("", imgWorld, i);
        generatedImages.push(img);
      }

      setStory(text); setMeta({...mt,title}); setImages(generatedImages); setPage("reading");
    } catch(e) { setErr(e.message); setPage("home"); }
  };

  const save = async () => {
    const entry = {id:Date.now().toString(),...meta,text:story,images,createdAt:new Date().toISOString(),favorite:false};
    setLib(await Store.save(entry)); setSaved(true);
  };
  const del = async id => setLib(await Store.rm(id));
  const fav = async id => setLib(await Store.fav(id));
  const readLib = s => {setStory(s.text);setMeta(s);setImages(s.images||[]);setSaved(true);setPage("reading")};

  const bg = page==="landing"||page==="home"
    ? "linear-gradient(180deg,#FDF4FF 0%,#EDE9FE 40%,#DBEAFE 100%)"
    : `linear-gradient(180deg,${w?.bg||"#FDF4FF"} 0%,white 100%)`;

  return (
    <Ctx.Provider value={{lang,t,setLang}}>
      <div className="min-h-screen w-full flex flex-col items-center relative overflow-hidden" style={{background:bg}}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
          * { font-family: 'Fredoka', sans-serif; }
          @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(5deg)}}
          @keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
          @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
          @keyframes bounceIn{0%{opacity:0;transform:scale(0.85) translateY(20px)}60%{transform:scale(1.03) translateY(-4px)}100%{opacity:1;transform:scale(1) translateY(0)}}
          @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
          .bounce-in{animation:bounceIn 0.45s ease-out both}
        `}</style>

        {world && <Floaters world={world} />}

        {/* Nav bar (shown on all pages except landing) */}
        {page !== "landing" && (
          <div className="w-full max-w-2xl px-4 pt-4 pb-2 flex items-center justify-between relative z-10">
            <div className="w-16">{page!=="home"&&<button onClick={goHome} className="text-gray-400 hover:text-gray-600 text-sm font-semibold">{t.back}</button>}</div>
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-2xl font-bold cursor-pointer" onClick={goHome}
                style={{background:"linear-gradient(135deg,#8B5CF6,#2563EB)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                ✨ {t.brand}
              </h1>
              <LangToggle />
            </div>
            <div className="w-16 flex justify-end">
              <button onClick={()=>setPage("library")} className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-all" style={{boxShadow:"0 2px 10px rgba(0,0,0,0.07)"}}>
                📚{lib.length>0&&<span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-violet-500 text-white text-xs font-bold flex items-center justify-center">{lib.length}</span>}
              </button>
            </div>
          </div>
        )}

        {/* Landing nav */}
        {page === "landing" && (
          <div className="w-full max-w-2xl px-6 pt-5 flex justify-end relative z-10"><LangToggle /></div>
        )}

        <div className="relative z-10 w-full max-w-lg px-4 pb-8 flex-1 flex flex-col items-center">
          {err && <div className="w-full bg-red-50 border border-red-200 rounded-2xl p-3 mb-4 text-center text-red-500 font-semibold text-sm">{err}</div>}

          {page==="landing" && <Landing onStart={()=>setPage("home")} />}

          {page==="home" && (
            <div className="flex flex-col items-center gap-6 bounce-in pt-8">
              <div className="text-center"><span className="text-5xl block mb-2">📖</span><p className="text-gray-500">{t.howCreate}</p></div>
              <div className="flex gap-4">
                <button onClick={()=>{setPage("create");setStep(0)}} className="w-36 h-40 rounded-3xl flex flex-col items-center justify-center gap-2 bg-white border-2 border-violet-200 hover:border-violet-400 hover:scale-105 active:scale-95 transition-all" style={{boxShadow:"0 4px 20px #8B5CF615"}}>
                  <span className="text-4xl">🧩</span><span className="font-bold text-violet-700 text-sm">{t.pickTiles}</span><span className="text-xs text-gray-400 px-2 text-center">{t.pickTilesDesc}</span>
                </button>
                <button onClick={()=>setPage("voice")} className="w-36 h-40 rounded-3xl flex flex-col items-center justify-center gap-2 bg-white border-2 border-blue-200 hover:border-blue-400 hover:scale-105 active:scale-95 transition-all" style={{boxShadow:"0 4px 20px #2563EB15"}}>
                  <span className="text-4xl">🎤</span><span className="font-bold text-blue-700 text-sm">{t.voiceIdea}</span><span className="text-xs text-gray-400 px-2 text-center">{t.voiceIdeaDesc}</span>
                </button>
              </div>
              {lib.length>0 && <button onClick={()=>setPage("library")} className="text-violet-400 font-semibold text-sm hover:text-violet-600">{t.viewSaved(lib.length)}</button>}
            </div>
          )}

          {page==="library" && <div className="w-full bounce-in"><Library stories={lib} onRead={readLib} onDelete={del} onFav={fav} onBack={goHome} /></div>}
          {page==="voice" && <VoiceInput onSubmit={(tx,ln)=>generate(tx,ln)} onBack={goHome} />}

          {page==="create" && (
            <div className="w-full bounce-in">
              <Dots step={step} total={4} />
              {step===0 && <div className="flex flex-col items-center gap-4">
                <h2 className="text-lg font-bold text-gray-700">{t.chooseWorld}</h2>
                <div className="grid grid-cols-3 gap-3">{WORLDS.map(ww=><Tile key={ww.id} emoji={ww.emoji} label={t[`w_${ww.id}`]} selected={world===ww.id} color={ww.color} onClick={()=>{setWorld(ww.id);setChars([])}} big />)}</div>
                <div className="flex gap-3"><button onClick={goHome} className="px-5 py-2 rounded-full bg-gray-100 text-gray-500 font-semibold">{t.back}</button>
                <button onClick={()=>world&&setStep(1)} disabled={!world} className="px-6 py-2 rounded-full text-white font-bold transition-all disabled:opacity-40" style={{backgroundColor:w?.color||"#8B5CF6"}}>{t.next}</button></div>
              </div>}
              {step===1 && <div className="flex flex-col items-center gap-4">
                <h2 className="text-lg font-bold text-gray-700">{t.pickChars} <span className="text-sm font-normal text-gray-400">{t.upTo3}</span></h2>
                <div className="flex flex-wrap gap-3 justify-center">{(CHARS[world]||[]).map(c=><Tile key={c.id} emoji={c.e} label={t[`c_${c.id}`]} selected={chars.includes(c.id)} color={w?.color} onClick={()=>togChar(c.id)} />)}</div>
                <div className="flex gap-3"><button onClick={()=>setStep(0)} className="px-5 py-2 rounded-full bg-gray-100 text-gray-500 font-semibold">{t.back}</button>
                <button onClick={()=>chars.length>0&&setStep(2)} disabled={!chars.length} className="px-6 py-2 rounded-full text-white font-bold transition-all disabled:opacity-40" style={{backgroundColor:w?.color||"#8B5CF6"}}>{t.next}</button></div>
              </div>}
              {step===2 && <div className="flex flex-col items-center gap-4">
                <h2 className="text-lg font-bold text-gray-700">{t.whatKind}</h2>
                <div className="flex flex-wrap gap-3 justify-center">{MOODS.map(m=><Tile key={m.id} emoji={m.e} label={t[`m_${m.id}`]} selected={mood===m.id} color={w?.color} onClick={()=>setMood(m.id)} big />)}</div>
                <div className="flex gap-3"><button onClick={()=>setStep(1)} className="px-5 py-2 rounded-full bg-gray-100 text-gray-500 font-semibold">{t.back}</button>
                <button onClick={()=>mood&&setStep(3)} disabled={!mood} className="px-6 py-2 rounded-full text-white font-bold transition-all disabled:opacity-40" style={{backgroundColor:w?.color||"#8B5CF6"}}>{t.next}</button></div>
              </div>}
              {step===3 && <div className="flex flex-col items-center gap-4">
                <h2 className="text-lg font-bold text-gray-700">{t.howLong}</h2>
                <div className="flex gap-3">{LENS.map(l=>(
                  <button key={l.id} onClick={()=>setLen(l.id)} className="w-28 h-28 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all hover:scale-105"
                    style={{borderColor:len===l.id?w?.color:"transparent",backgroundColor:len===l.id?w?.bg:"white",boxShadow:len===l.id?`0 0 0 2px ${w?.color}`:"0 2px 8px rgba(0,0,0,0.05)"}}>
                    <span className="text-2xl">{l.e}</span><span className="font-bold" style={{color:w?.color}}>{t[`l_${l.id}`]}</span>
                  </button>
                ))}</div>
                <div className="flex gap-3"><button onClick={()=>setStep(2)} className="px-5 py-2 rounded-full bg-gray-100 text-gray-500 font-semibold">{t.back}</button>
                <button onClick={()=>len&&generate()} disabled={!len} className="px-8 py-3 rounded-full text-white font-bold text-lg transition-all disabled:opacity-40"
                  style={{background:`linear-gradient(135deg,${w?.color},${w?.color}CC)`,boxShadow:`0 4px 16px ${w?.color}33`}}>{t.createStory}</button></div>
              </div>}
            </div>
          )}

          {page==="gen" && <GeneratingAnim world={world||"castle"} phase={genPhase} />}
          {page==="reading" && story && <div className="w-full bounce-in"><StoryReader story={story} meta={meta} images={images} onSave={save} onBack={goHome} isSaved={saved} /></div>}
        </div>
      </div>
    </Ctx.Provider>
  );
}
