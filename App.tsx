import React, { useState, useEffect } from 'react';
import { ALL_PEOPLE, Person, MatchMap } from './types';
import { generateMatches } from './services/matchingService';
import Snowfall from './components/Snowfall';

// Icons
const TreeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mb-1 text-green-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
  </svg>
);

const SantaHatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <g transform="rotate(-10 50 50)">
       {/* Red Body */}
      <path d="M15 85 Q 50 -10 85 85 Z" fill="#DC2626" />
      <path d="M50 10 Q 70 30 85 85" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
      
      {/* White Brim */}
      <path d="M10 85 C 10 75, 90 75, 90 85 C 90 95, 10 95, 10 85" fill="white" filter="url(#glow)" />
      
      {/* White Ball */}
      <circle cx="50" cy="5" r="8" fill="white" filter="url(#glow)" />
    </g>
  </svg>
);

// --- Sub-components defined outside App to prevent re-renders ---

const IntroView = ({ onStart }: { onStart: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in text-center p-6">
    <div className="text-6xl mb-6 animate-bounce">🎄</div>
    <h1 className="text-5xl festive-font text-red-500 mb-4 drop-shadow-md">BauDobos Exchange 2025</h1>
    <p className="text-lg text-gray-300 mb-8 max-w-md font-serif leading-relaxed">
      Welcome to the 2025 BauDobos family exchange. The tradition continues!
      <br/><br/>
      We've consulted the star charts and prepared the definitive list. Whether it’s a rare artifact, a nostalgic deep-cut, or something delightfully unexplainable, get ready for some pure, chaotic giving.
    </p>
    <button 
      onClick={onStart}
      className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg transform transition hover:scale-105 active:scale-95 text-xl font-serif"
    >
      Open the List
    </button>
  </div>
);

const PrankView = ({ onFix }: { onFix: () => void }) => (
  <div className="w-full max-w-lg mx-auto p-4 animate-fade-in">
    <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 border-2 border-green-500/30 shadow-2xl relative overflow-hidden">
      
      <div className="text-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-3xl festive-font text-green-400 mb-2">The Official List</h2>
        <p className="text-gray-400 text-sm italic font-serif">
          Checked twice.
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {ALL_PEOPLE.map((giver) => (
          <div key={giver} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition group">
             <div className="flex items-center gap-3">
               <span className={`w-2 h-2 rounded-full ${giver === 'Joel' ? 'bg-amber-500' : 'bg-green-500'}`}></span>
               <div className="flex flex-col">
                 <span className="text-lg font-semibold text-gray-200">
                    {giver}
                    {giver === 'Joel' && <span className="text-[9px] text-amber-500 ml-2 border border-amber-900/50 bg-amber-900/20 rounded px-1 uppercase tracking-tighter font-bold">WARNING: LAME</span>}
                 </span>
               </div>
             </div>
             
             <div className="flex items-center gap-2">
               <span className="text-gray-500 text-xs sm:text-sm italic">
                  is giving a gift to
               </span>
               <span className="text-lg font-bold text-red-400 bg-red-900/30 px-3 py-1 rounded border border-red-500/20">
                 Danny
               </span>
             </div>
          </div>
        ))}
      </div>

      <div className="text-center animate-pulse">
         <button 
           onClick={onFix}
           className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-extrabold text-lg rounded-lg shadow-lg transform transition hover:scale-[1.02] active:scale-95 border-b-4 border-yellow-700 font-serif"
         >
           Wait, that looks wrong...
         </button>
      </div>
    </div>
  </div>
);

const GlitchView = ({ onFix }: { onFix: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center animate-fade-in font-serif">
    <h2 className="text-4xl festive-font text-red-500 mb-4">Hiccup Detected!</h2>
    <div className="text-gray-200 mb-8 max-w-sm bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
      <p className="mb-4 text-xl">Whoops.</p>
      <p className="mb-4 leading-relaxed">
        It looks like the system was compromised, everyone was assigned to give Danny a gift.
      </p>
      <p className="text-sm text-gray-400 italic">
        (Or it may have been Joel messing up the settings.)
      </p>
    </div>
    <button 
      onClick={onFix}
      className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white text-lg rounded-full font-bold shadow-lg transition-transform hover:scale-105"
    >
      Unscramble the Matches
    </button>
  </div>
);

interface RealViewProps {
  currentUser: Person | null;
  matches: MatchMap | null;
  onUserSelect: (p: Person) => void;
  onBack: () => void;
  isRevealed: boolean;
  onReveal: () => void;
}

const RealView: React.FC<RealViewProps> = ({ 
  currentUser, matches, onUserSelect, onBack, 
  isRevealed, onReveal 
}) => {
  if (!currentUser) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4 animate-fade-in">
        <h2 className="text-4xl festive-font text-center mb-2 text-green-400 drop-shadow-lg">Identify Yourself</h2>
        <div className="bg-red-900/30 border border-red-500/50 p-4 rounded-lg mb-8 text-center">
            <p className="text-lg text-red-200 font-bold uppercase tracking-wide animate-pulse">
                ⚠️ Select YOUR OWN name ⚠️
            </p>
            <p className="text-xs text-red-300/80 mt-1 font-mono">
                Do not click who you want to give to. Click who you ARE.
            </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {ALL_PEOPLE.map(person => (
            <button
              key={person}
              onClick={() => onUserSelect(person)}
              className={`p-6 bg-slate-800/80 backdrop-blur-sm border-2 ${person === 'Joel' ? 'border-amber-700/30' : 'border-green-500/30'} rounded-xl hover:bg-slate-700/80 transition text-lg font-bold text-gray-200 flex flex-col items-center justify-center gap-1 group relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {person}
              {person === 'Joel' && <span className="text-[10px] text-amber-500/70 uppercase tracking-widest font-normal font-mono">Don't ruin this</span>}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const recipient = matches ? matches[currentUser] : "Error";

  return (
    <div className="w-full max-w-lg mx-auto p-4 animate-fade-in">
      <button 
        onClick={onBack}
        className="hidden mb-6 flex items-center text-gray-500 hover:text-white transition font-mono text-xs uppercase"
      >
        ← Return to Name Select
      </button>

      <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-8 rounded-3xl border border-white/10 shadow-2xl text-center relative overflow-visible">
        
        <h3 className="text-xl text-green-200 mb-4 font-serif">Welcome, {currentUser}.</h3>
        <p className="text-xs text-gray-600 mb-4">No spouses or duplicates, just algorithms.</p>
        
        {/* Magic Reveal Section */}
        <div className="relative min-h-[350px] flex justify-center items-end mb-8">
            <style>{`
              @keyframes weird-appear {
                0% { 
                  opacity: 0; 
                  transform: translateY(100px) scale(0) rotate(720deg); 
                  filter: blur(10px) hue-rotate(90deg);
                }
                60% {
                   transform: translateY(-40px) scale(1.2) rotate(-10deg);
                   filter: blur(0px) hue-rotate(0deg);
                }
                80% {
                   transform: translateY(-20px) scale(0.9) rotate(5deg);
                }
                100% { 
                  opacity: 1; 
                  transform: translateY(-30px) scale(1) rotate(0deg); 
                }
              }
              @keyframes floaty {
                0%, 100% { transform: translateY(0px) rotate(1deg); }
                50% { transform: translateY(-10px) rotate(-1deg); }
              }
              .weird-reveal {
                animation: weird-appear 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
              }
              .floaty-hover {
                animation: floaty 4s ease-in-out infinite;
              }
            `}</style>

            {/* The Match Card Container */}
            <div className={`absolute bottom-28 z-30 transition-all duration-500 ${isRevealed ? 'block' : 'hidden'}`}>
                <div className="weird-reveal">
                    <div className="floaty-hover">
                        <div className="text-sm text-yellow-300 font-bold uppercase tracking-widest mb-3 drop-shadow-md text-center animate-pulse">
                            You are gifting to...
                        </div>
                        <div className="relative group">
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
                            
                            {/* Card Content */}
                            <div className="relative bg-gradient-to-b from-red-700 to-red-900 text-white px-10 py-8 rounded-2xl shadow-2xl border-4 border-yellow-500/50 flex flex-col items-center">
                                <span className="text-6xl festive-font font-bold drop-shadow-lg filter">{recipient}</span>
                                
                                {/* Decor */}
                                <div className="absolute -top-3 -right-3 text-3xl animate-spin-slow">✨</div>
                                <div className="absolute -bottom-3 -left-3 text-3xl animate-bounce">🎁</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* The Hat Button */}
             <button 
              onClick={onReveal}
              disabled={isRevealed}
              className={`z-20 transition-all duration-500 relative ${isRevealed ? 'translate-y-10 scale-95 brightness-50 cursor-default grayscale' : 'hover:scale-105 cursor-pointer hover:-rotate-3'}`}
            >
               <SantaHatIcon className={`w-64 h-64 drop-shadow-2xl transition-transform duration-300 ${isRevealed ? 'scale-y-75' : 'animate-bounce-slow'}`} />
               
               {/* Click prompt */}
               {!isRevealed && (
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-white/90 backdrop-blur text-red-600 font-bold px-6 py-2 rounded-full shadow-lg whitespace-nowrap animate-pulse border-2 border-red-100 transform hover:scale-110 transition">
                        Tap for Magic!
                    </div>
                 </div>
               )}
            </button>

            {/* Confetti/Sparkles behind hat when revealed */}
             {isRevealed && (
                 <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
                     <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-[ping_1s_ease-out_infinite]"></div>
                     <div className="absolute top-1/3 left-1/3 text-yellow-300 text-xl animate-[bounce_2s_infinite]">⭐</div>
                     <div className="absolute top-1/3 right-1/3 text-white text-lg animate-[pulse_1.5s_infinite]">❄️</div>
                 </div>
             )}
        </div>

        {/* Footer Text - Only shows after reveal */}
        <div className={`transition-all duration-700 delay-500 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 invisible'}`}>
          <div className="mt-8 text-xs text-gray-500 font-mono">
             Initiating dopamine release sequence...<br/>
             Note: {currentUser === 'Joel' ? "You know the drill, Joel. Keep it secret." : "Loose lips sink ships."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [matches, setMatches] = useState<MatchMap | null>(null);
  const [isDebugMode, setIsDebugMode] = useState(false);
  
  // Stages: 'intro' -> 'prank' -> 'glitch' -> 'real'
  const [stage, setStage] = useState<'intro' | 'prank' | 'glitch' | 'real'>('intro');
  
  const [currentUser, setCurrentUser] = useState<Person | null>(null);
  const [pendingConfirmation, setPendingConfirmation] = useState<Person | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Initialize matches
  useEffect(() => {
    setMatches(generateMatches());
  }, []);

  // Handlers
  const handleStart = () => {
    setStage('prank');
  };

  const handleFixGlitch = () => {
    setStage('real');
    setCurrentUser(null);
    setIsRevealed(false);
  };

  const handleUserSelect = (person: Person) => {
    setPendingConfirmation(person);
  };

  const confirmIdentity = () => {
    if (pendingConfirmation) {
      setCurrentUser(pendingConfirmation);
      setPendingConfirmation(null);
      setIsRevealed(false);
    }
  };

  const cancelIdentity = () => {
    setPendingConfirmation(null);
  };

  const refreshMatches = () => {
    // For debug mode: pass a random seed to see different combinations
    setMatches(generateMatches(Date.now()));
  };

  // Render Helpers
  const renderDebugPanel = () => {
    if (!matches) return null;
    return (
      <div className="fixed bottom-4 right-4 p-4 bg-black/90 border border-red-500 rounded-lg text-xs font-mono z-50 max-w-xs shadow-xl">
        <h3 className="text-red-400 font-bold mb-2 flex justify-between items-center">
          DEBUG MODE 
          <button onClick={refreshMatches} className="ml-2 bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 border border-gray-600">
            Reshuffle
          </button>
        </h3>
        <ul className="space-y-1">
          {ALL_PEOPLE.map(p => (
            <li key={p} className="flex justify-between">
              <span className="text-gray-300">{p}</span>
              <span className="text-gray-500">→</span>
              <span className="text-green-300">{matches[p]}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 pt-2 border-t border-gray-700 text-gray-500">
          Seed: {isDebugMode ? 'Random' : 'Fixed'}
        </div>
      </div>
    );
  };

  const ConfirmationModal = () => {
    if (!pendingConfirmation) return null;
    
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 animate-fade-in backdrop-blur-sm">
        <div className="bg-slate-800 border-2 border-red-500 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl shadow-red-900/30 transform scale-100 transition-all">
          <div className="text-5xl mb-4 animate-bounce">🎅</div>
          <h3 className="text-2xl festive-font text-white mb-2">Wait a minute...</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Are you really <span className="text-red-400 font-bold text-lg">{pendingConfirmation}</span>?
            <br/><br/>
            {pendingConfirmation === 'Joel' ? (
              <span className="block bg-amber-900/30 border border-amber-700/50 rounded p-2 text-sm text-amber-500 animate-pulse">
                ⚠️ <b>Warning:</b> Historical data suggests a risk of lame gifts. Please prove us wrong.
              </span>
            ) : (
              <span className="text-xs italic text-gray-500 block border-t border-gray-700 pt-4 mt-2">
                Santa is watching. Don't be naughty.
              </span>
            )}
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={cancelIdentity}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition"
            >
              No, go back
            </button>
            <button 
              onClick={confirmIdentity}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition shadow-lg ring-2 ring-red-900 ring-offset-2 ring-offset-slate-800"
            >
              Yes, I'm {pendingConfirmation}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-red-500 selection:text-white relative">
      <Snowfall />
      
      {/* Header */}
      <header className="fixed top-0 w-full p-4 z-10 flex justify-between items-center bg-gradient-to-b from-slate-900/90 to-transparent">
        <div className="text-xl festive-font text-red-500 flex items-center gap-2">
          <TreeIcon /> BauDobos Exchange 2025
        </div>
        {/* Debug button hidden for live */}
      </header>

      {/* Main Content Area */}
      <main className="pt-24 pb-12 relative z-10 container mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
        {stage === 'intro' && <IntroView onStart={handleStart} />}
        {stage === 'prank' && <PrankView onFix={() => setStage('glitch')} />}
        {stage === 'glitch' && <GlitchView onFix={handleFixGlitch} />}
        {stage === 'real' && (
          <RealView 
            currentUser={currentUser}
            matches={matches}
            onUserSelect={handleUserSelect}
            onBack={() => setCurrentUser(null)}
            isRevealed={isRevealed}
            onReveal={() => setIsRevealed(true)}
          />
        )}
      </main>
      
      {/* Modals and Overlays */}
      <ConfirmationModal />
      {isDebugMode && renderDebugPanel()}
    </div>
  );
}