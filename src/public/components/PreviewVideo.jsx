import { useBranding } from "../../shared/hooks/BrandingContext";
import VideoPlayer from "../../shared/video/VideoPlayer";

export default function PreviewVideo() {
  const brand = useBranding();

  // SAFE FALLBACKS
  const preview = brand?.preview || {};

  const theme = brand?.theme || {};

  const colors = brand?.colors || {
    primary: "#f94430",
    accent: "#22C55E",
  };

  const hero = brand?.hero || {};

  const videoId =
    preview?.bunnyVideoId ||
    hero?.bunnyVideoId;

  const poster = hero?.image;

  return (
    <section className="relative overflow-hidden bg-white text-black md:px-16">

      <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">

        {/* VIDEO */}
        <div className="w-full">

          {videoId ? (
            <VideoPlayer
              videoId={videoId}
              poster={poster}
            />
          ) : (
            <img
              src="/prv.avif"
              className="w-full md:w-[50vw] object-cover"
              alt="Preview"
            />
          )}

        </div>

        {/* TEXT */}
        <div className="p-6 md:p-10 lg:p-14 space-y-6 md:space-y-8">

          <h2
            className={`text-2xl md:text-3xl font-bold ${theme.text?.heading || ""
              }`}
          >
            {preview?.title ||
              "Experience Learning"}

            {" "}

            <span
              style={{
                color:
                  colors.primary,
              }}
            >
              {preview?.highlight ||
                "With Us"}
            </span>
          </h2>

          <p
            className={`text-sm md:text-base ${theme.text?.body || ""
              }`}
          >
            {preview?.description ||
              "Practical learning experience designed for modern students."}
          </p>

        </div>

      </div>
    </section>
  );
}