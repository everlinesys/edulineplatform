import { MdWhatsapp } from "react-icons/md";
import { useBranding } from "../../shared/hooks/BrandingContext";
import { useState } from "react";

export default function Hero() {
  const brandData = useBranding();

  const brand = brandData?.default || brandData || {};
  const hero = brand.hero || {};
  const colors = brand.colors || {
    primary: "#10b981",
    accent: "#ffffff",
  };

  const [open, setOpen] = useState(true);
  const whatsappNumber = brand.contact?.whatsapp;

  const openWhatsApp = () => {
    const text = `Hello ${brand.siteName}, I want to know more about your courses.`;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <>
      <section className="relative overflow-hidden bg-white">
        {/* Background Grid & Decorative Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle Grid Overlay */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#b2d7b9_1px,transparent_1px),linear-gradient(to_bottom,#b2d7b9_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-70"
          />
          {/* Radial Gradient to fade the grid out slightly at the edges */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,white_90%)]" />

          {/* Soft blur accent circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-slate-100 rounded-full blur-3xl opacity-50" />
        </div>

        {/* Main Content Container (Enforced 16px horizontal padding) */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-14">
          <div className="grid lg:grid-cols-2 gap-8 items-center">

            {/* LEFT COLUMN */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm text-xs font-medium text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {brand.students > 0 ? brand.students : "100+"} Students Learning
              </div>

              <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900">
                {hero.title || "Learn Skills That Move Your Career Forward"}
              </h1>

              <p className="mt-3 text-base text-slate-600 max-w-lg leading-relaxed">
                {hero.subtitle ||
                  "Practical courses, expert guidance, and a learning experience designed to help you achieve real results."}
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href="#courses"
                  className="px-6 py-3 rounded-xl font-semibold text-white text-sm text-center transition hover:opacity-90 active:scale-95 shadow-sm"
                  style={{ backgroundColor: colors.primary }}
                >
                  Explore Courses
                </a>

                {whatsappNumber && (
                  <button
                    onClick={openWhatsApp}
                    className="px-6 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition active:scale-95"
                  >
                    <MdWhatsapp size={18} className="text-emerald-600" />
                    WhatsApp
                  </button>
                )}
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-2 mt-8 pt-6 border-t border-slate-200/60 max-w-sm">
                <div>
                  <div className="text-2xl font-black text-slate-900">
                    {brand.students > 0 ? brand.students : "100+"}
                  </div>
                  <div className="text-xs text-slate-500">Students</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">
                    {brand.courses > 0 ? brand.courses : "2+"}
                  </div>
                  <div className="text-xs text-slate-500">Courses</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">4.9★</div>
                  <div className="text-xs text-slate-500">Rating</div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="relative lg:mt-0 mt-6 max-w-md mx-auto lg:max-w-none w-full">
              <div className="overflow-hidden rounded-2xl border border-slate-100 bg-transparent ">
                {hero.image ? (
                  <img
                    src={hero.image}
                    alt={brand.siteName}
                    className="w-full aspect-[4/4] object-cover"
                  />
                ) : (
                  <div className="aspect-[4/3] flex items-center justify-center bg-slate-50">
                    <span className="text-5xl font-black text-slate-200">
                      {brand.siteName?.charAt(0) || "E"}
                    </span>
                  </div>
                )}
              </div>

              {/* Compact Floating Card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-slate-100 p-3 hidden sm:block">
                <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Trusted By
                </div>
                <div className="text-lg font-black text-slate-900 leading-tight">
                  {brand.students > 0 ? brand.students : "100+"}
                </div>
                <div className="text-xs text-slate-500">Active Learners</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WhatsApp Widget */}
      {whatsappNumber && (
        <div className="fixed bottom-5 right-5 z-50">

          {open ? (
            <div className="w-80 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">

              {/* Header */}
              <div className="bg-emerald-600 px-4 py-4 text-white">

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                      {brand.siteName?.charAt(0)}
                    </div>

                    <div>
                      <div className="font-semibold text-sm">
                        {brand.siteName}
                      </div>

                      <div className="text-[11px] text-emerald-100 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-300"></span>
                        Typically replies within minutes
                      </div>
                    </div>

                  </div>

                  <button
                    onClick={() => setOpen(false)}
                    className="text-white/80 hover:text-white"
                  >
                    ✕
                  </button>

                </div>

              </div>

              {/* Chat Area */}
              <div className="bg-slate-50 p-4">

                <div className="bg-white rounded-2xl rounded-tl-md p-3 shadow-sm max-w-[90%]">

                  <div className="text-xs text-slate-700 leading-relaxed">
                    👋 Welcome to <strong>{brand.siteName}</strong>.
                    <br />
                    Need help choosing a course, understanding fees,
                    or finding the right learning path?
                    Our team is here to help.
                  </div>

                  <div className="text-[10px] text-slate-400 mt-2">
                    Just now
                  </div>

                </div>

              </div>

              {/* CTA */}
              <div className="p-4 border-t border-slate-100">

                <button
                  onClick={openWhatsApp}
                  className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-2 transition"
                >
                  <MdWhatsapp size={20} />
                  Start WhatsApp Chat
                </button>

                <p className="text-center text-[11px] text-slate-400 mt-2">
                  Powered by {brand.siteName}
                </p>

              </div>

            </div>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="relative w-14 h-14 rounded-full bg-emerald-600 text-white shadow-2xl flex items-center justify-center hover:scale-105 transition"
            >

              <span className="absolute inset-0 rounded-full bg-emerald-600 animate-ping opacity-20"></span>

              <MdWhatsapp
                size={28}
                className="relative z-10"
              />

            </button>
          )}

        </div>
      )}
    </>
  );
}