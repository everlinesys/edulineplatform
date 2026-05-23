import { MdWhatsapp } from "react-icons/md";
import { useBranding } from "../../shared/hooks/BrandingContext";
import { useState } from "react";

export default function Hero() {
  const brandData = useBranding();

  // FIX OLD STRUCTURE
  const brand =
    brandData?.default || brandData || {};

  console.log("Brand in Hero", brand);

  const [open, setOpen] = useState(true);

  const hero = brand.hero || {};

  const theme = brand.theme || {};

  const colors = brand.colors || {
    primary: "#f94430",
    accent: "#22C55E",
  };

  const initials =
    brand.name
      ?.replace(/[^A-Za-z ]/g, "")
      .split(" ")
      .filter(Boolean)
      .map((w) =>
        w[0].toUpperCase()
      )
      .slice(0, 2) || ["A", "U"];

  const whatsappNumber =
    brand.contact?.whatsapp;

  const openWhatsApp = () => {
    const text = `Hello ${brand.siteName}, I want to know more about your courses.`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <section
      className={`${theme.layout?.container || ""
        } relative overflow-hidden`}
    >
      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center p-8 md:p-16">

        {/* LEFT */}
        <div className="space-y-6 text-center md:text-left">

          {/* Mobile Image */}
          <div className="relative md:hidden block group">

            {hero?.image ? (
              <img
                src={hero.image}
                alt={brand.siteName}
                className={`relative z-10 ${theme.shape?.radius || ""
                  } object-cover aspect-[4/2] w-full`}
              />
            ) : (
              <div
                className={`relative z-10 ${theme.layout?.panel || ""
                  } aspect-[4/3] w-full flex items-center justify-center`}
              >
                <div className="text-white/10 font-black text-8xl uppercase -rotate-12">
                  Learn
                </div>
              </div>
            )}
          </div>

          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 ${theme.layout?.panel || ""
              } ${theme.shape?.radius || ""}`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{
                  backgroundColor:
                    colors.primary,
                }}
              />

              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{
                  backgroundColor:
                    colors.accent,
                }}
              />
            </span>

            <span
              className={`text-[10px] uppercase tracking-widest ${theme.text?.label || ""
                }`}
            >
              Live Learning Portal
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
            {hero?.title ||
              "Welcome to eLearn"}
          </h1>

          {/* Subtitle */}
          <p
            className={`${theme.text?.body || ""
              } opacity-80 max-w-lg text-xl`}
          >
            {hero?.subtitle ||
              "Practical courses for real growth."}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">

            <a
              href="#courses"
              className={`group inline-flex items-center justify-center px-8 py-4 font-black text-sm tracking-wide transition-all duration-300 active:scale-95 ${theme.button?.primary || ""
                } ${theme.shape?.radius || ""
                }`}
              style={{
                background:
                  colors.primary,
                color: colors.accent,
              }}
            >
              Browse Courses
            </a>

            <div className="pl-2 text-xs font-bold opacity-70 uppercase tracking-tighter">
              {brand.students || "500+"}
              {" "}Students
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative hidden md:block group">

          {hero?.image ? (
            <img
              src={hero.image}
              alt="Learning"
              className={`relative z-10 ${theme.shape?.radius || ""
                } object-cover aspect-[4/2.5] w-full`}
            />
          ) : (
            <div
              className={`relative z-10 ${theme.layout?.panel || ""
                } aspect-[4/3] w-full flex items-center justify-center`}
            >
              <div className="text-white/10 font-black text-8xl uppercase -rotate-12">
                Learn
              </div>
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp */}
      {whatsappNumber && (
        <div className="fixed bottom-6 right-6 z-50">

          {open && (
            <div className="w-72 rounded-2xl shadow-2xl overflow-hidden mb-3 bg-white">

              <div className="px-4 py-3 text-white font-bold bg-emerald-600 flex justify-between items-center">
                {brand.siteName} Support

                <button
                  onClick={() =>
                    setOpen(false)
                  }
                >
                  ✕
                </button>
              </div>

              <div className="p-4 text-sm text-gray-700">
                Welcome to{" "}
                <b>{brand.siteName}</b>
              </div>

              <div className="p-3">
                <button
                  onClick={
                    openWhatsApp
                  }
                  className="w-full py-3 text-white font-semibold rounded-full bg-emerald-600"
                >
                  <MdWhatsapp
                    className="inline mr-2"
                    size={20}
                  />

                  Chat on WhatsApp
                </button>
              </div>
            </div>
          )}

          {!open && (
            <button
              onClick={() =>
                setOpen(true)
              }
              className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl bg-emerald-600"
            >
              <MdWhatsapp size={28} />
            </button>
          )}
        </div>
      )}
    </section>
  );
}