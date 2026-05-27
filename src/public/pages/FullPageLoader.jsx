import { BookOpen, GraduationCap, Layers, User } from "lucide-react";

export default function FullPageLoader() {
  return (
    <div className="min-h-screen w-screen bg-slate-50/50 flex flex-col font-sans antialiased text-slate-800">
      
      {/* =========================================
          LMS NAVIGATION TOP-BAR SKELETON
         ========================================= */}
      <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          {/* Mock Brand Logo roundel */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-200 animate-pulse flex items-center justify-center text-slate-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="h-4 w-28 bg-slate-200 rounded-lg animate-pulse" />
          </div>
          
          {/* Desktop Top Menu Links */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="h-3 w-16 bg-slate-100 rounded-md animate-pulse" />
            <div className="h-3 w-20 bg-slate-100 rounded-md animate-pulse" />
            <div className="h-3 w-14 bg-slate-100 rounded-md animate-pulse" />
          </nav>
        </div>

        {/* Right side Profile circle indicator */}
        <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse flex items-center justify-center text-slate-400">
          <User className="w-4 h-4" />
        </div>
      </header>

      {/* =========================================
          MAIN CORE CONTENT WORKSPACE GRID
         ========================================= */}
      <div className="flex-1 max-w-7xl w-full mx-auto grid lg:grid-cols-[260px_1fr] gap-8 p-4 md:p-8 items-start">
        
        {/* SIDEBAR SIDEBAR MODULE LAYOUT OUTLINE */}
        <aside className="hidden lg:block bg-white border border-slate-200/60 rounded-2xl p-5 space-y-6">
          <div className="space-y-2">
            <div className="h-3 w-20 bg-slate-200 rounded-md animate-pulse" />
            <div className="h-2 w-32 bg-slate-100 rounded-md animate-pulse" />
          </div>
          
          <div className="space-y-3 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl border border-slate-50">
                <div className="w-8 h-8 rounded-lg bg-slate-100 animate-pulse flex items-center justify-center text-slate-300">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="h-2.5 w-3/4 bg-slate-200 rounded animate-pulse" />
                  <div className="h-2 w-1/2 bg-slate-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* LMS LESSON FRAME WORKSPACE CONTAINER */}
        <main className="space-y-8 w-full">
          
          {/* PRIMARY MAIN HERO BLOCK: FEATURED COURSE WINDOW */}
          <section className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm grid md:grid-cols-[1fr_240px] xl:grid-cols-[1fr_320px] gap-8 items-center relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              {/* Badge indicator skeleton */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100/80 rounded-md animate-pulse">
                <BookOpen className="w-3.5 h-3.5 text-slate-300" />
                <div className="h-2 w-16 bg-slate-200 rounded" />
              </div>

              {/* Title Header text groups */}
              <div className="space-y-2.5">
                <div className="h-7 w-full sm:w-5/6 bg-slate-200 rounded-xl animate-pulse" />
                <div className="h-7 w-2/3 bg-slate-200 rounded-xl animate-pulse" />
              </div>

              {/* Multi-line Description blocks */}
              <div className="space-y-2 pt-2">
                <div className="h-3.5 w-full bg-slate-100 rounded-md animate-pulse" />
                <div className="h-3.5 w-full bg-slate-100 rounded-md animate-pulse" />
                <div className="h-3.5 w-4/5 bg-slate-100 rounded-md animate-pulse" />
              </div>

              {/* CTA Action button skeleton placeholder */}
              <div className="pt-4">
                <div className="h-10 w-36 bg-slate-200 rounded-xl animate-pulse shadow-sm" />
              </div>
            </div>

            {/* Immersive Mock Up Course Media Graphic Frame */}
            <div className="h-48 md:h-56 bg-slate-100/70 rounded-2xl border border-slate-200/30 animate-pulse relative flex items-center justify-center">
              <svg className="w-12 h-12 text-slate-200/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </section>

          {/* LOWER SECTION: ITEM SEGMENTS LIST (e.g. CURRICULUM CHAPTERS) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
              <div className="h-4 w-36 bg-slate-200 rounded-md animate-pulse" />
              <div className="h-3 w-16 bg-slate-100 rounded-md animate-pulse" />
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="bg-white border border-slate-200/60 rounded-2xl p-4 space-y-4 shadow-sm"
                >
                  {/* Thumbnail display mockup frame */}
                  <div className="aspect-video w-full bg-slate-100 rounded-xl animate-pulse relative overflow-hidden" />
                  
                  {/* Text meta parameters metadata */}
                  <div className="space-y-2">
                    <div className="h-3 w-5/6 bg-slate-200 rounded animate-pulse" />
                    <div className="h-2 w-1/2 bg-slate-100 rounded animate-pulse" />
                  </div>

                  <div className="pt-2 border-t border-slate-50 flex justify-between items-center">
                    <div className="h-3 w-12 bg-slate-100 rounded animate-pulse" />
                    <div className="h-2 w-16 bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}