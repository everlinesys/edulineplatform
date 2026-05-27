import { RotateCcw, WifiOff } from "lucide-react";

export default function InstituteErrorState({ loadBranding, isRetrying = false }) {
  return (
    <div className="min-h-screen w-screen bg-slate-50/50 flex flex-col items-center justify-center p-6 text-slate-800 antialiased">
      <div className="max-w-sm w-full text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* =========================================
            INLINE VECTOR GRAPHIC
           ========================================= */}
        <div className="relative w-44 h-44 mb-6 flex items-center justify-center">
          {/* Decorative background ambient blobs */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-200/40 to-slate-100/10 rounded-full blur-xl" />
          
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative z-10 drop-shadow-sm text-slate-400"
          >
            {/* Soft geometric grid pattern floor */}
            <path d="M40 150 H160 M60 165 H140" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
            
            {/* The Floating Server/Institute Block */}
            <rect x="55" y="50" width="90" height="85" rx="16" fill="white" stroke="currentColor" strokeWidth="3.5" />
            
            {/* Server Lines / Shelves */}
            <line x1="75" y1="75" x2="125" y2="75" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
            <line x1="75" y1="92" x2="110" y2="92" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
            <line x1="75" y1="109" x2="120" y2="109" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
            
            {/* Status indicators */}
            <circle cx="125" cy="92" r="3.5" fill="#ef4444" className="animate-pulse" />
          </svg>

          {/* Floating Absolute Alert Indicator Badge */}
          <div className="absolute bottom-6 right-6 bg-rose-50 border border-rose-200 p-2.5 rounded-2xl shadow-sm text-rose-500 transform translate-x-2 translate-y-2">
            <WifiOff className="w-5 h-5" />
          </div>
        </div>

        {/* =========================================
            TYPOGRAPHY & CONTENT
           ========================================= */}
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Unable to Connect
        </h2>
        
        <p className="mt-2 text-sm text-slate-200 leading-relaxed max-w-[280px] mx-auto">
          We can't reach the institute workspace right now. Check your internet connection or try again.
        </p>

        {/* =========================================
            INTERACTION ACTION BUTTON
           ========================================= */}
        <button
          onClick={loadBranding}
          disabled={isRetrying}
          className="mt-8 inline-flex items-center justify-center gap-2 w-full sm:w-auto min-w-[140px] px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-xs font-semibold tracking-wide shadow-sm transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isRetrying ? "animate-spin" : ""}`} />
          {isRetrying ? "Connecting..." : "Retry Connection"}
        </button>

      </div>
    </div>
  );
}