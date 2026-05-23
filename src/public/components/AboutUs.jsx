import { useBranding } from "../../shared/hooks/BrandingContext";

export default function AboutUs() {
  const brand = useBranding();

  const about =
    brand?.about || {};

  const colors =
    brand?.colors || {
      primary: "#1e3a8a",
    };

  return (
    <div className="bg-white text-gray-800">

      {/* HERO */}
      <div className="relative h-[60vh] flex items-center justify-center text-center">

        <img
          src={
            about?.hero?.image ||
            "/hero.jpg"
          }
          alt="About"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-white px-6">

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {about?.hero?.title}
          </h1>

          <p className="max-w-2xl mx-auto text-lg opacity-90">
            {about?.hero?.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* INTRO */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <img
            src={
              about?.intro?.image
            }
            alt="about"
            className="rounded-2xl shadow-lg"
          />

          <div>

            <h2
              className="text-3xl font-bold mb-4"
              style={{
                color:
                  colors.primary,
              }}
            >
              {
                about?.intro
                  ?.title
              }
            </h2>

            {about?.intro?.description?.map(
              (text, i) => (
                <p
                  key={i}
                  className="mb-4"
                >
                  {text}
                </p>
              )
            )}
          </div>
        </div>

        {/* OBJECTIVES */}
        <div className="mt-20">

          <h2
            className="text-3xl font-bold text-center mb-10"
            style={{
              color:
                colors.primary,
            }}
          >
            {
              about
                ?.objectives
                ?.title
            }
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {about?.objectives?.items?.map(
              (item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border hover:shadow-lg transition"
                >
                  <p className="font-medium">
                    {item}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* PROGRAMS */}
        <div className="mt-20 grid md:grid-cols-2 gap-10 items-center">

          <div>

            <h2
              className="text-3xl font-bold mb-4"
              style={{
                color:
                  colors.primary,
              }}
            >
              {
                about
                  ?.programs
                  ?.title
              }
            </h2>

            <ul className="space-y-3">

              {about?.programs?.items?.map(
                (item, i) => (
                  <li key={i}>
                    • {item}
                  </li>
                )
              )}
            </ul>
          </div>

          <img
            src={
              about?.programs
                ?.image
            }
            alt="programs"
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* VALUES */}
        <div className="mt-20">

          <h2
            className="text-3xl font-bold text-center mb-10"
            style={{
              color:
                colors.primary,
            }}
          >
            {
              about?.values
                ?.title
            }
          </h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">

            {about?.values?.items?.map(
              (val, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                >
                  <h3 className="font-semibold">
                    {val}
                  </h3>
                </div>
              )
            )}
          </div>
        </div>

        {/* QUALITY */}
        <div className="mt-20 grid md:grid-cols-2 gap-10 items-center">

          <img
            src={
              about?.quality
                ?.image
            }
            alt="quality"
            className="rounded-2xl shadow-lg"
          />

          <div>

            <h2
              className="text-3xl font-bold mb-4"
              style={{
                color:
                  colors.primary,
              }}
            >
              {
                about?.quality
                  ?.title
              }
            </h2>

            {about?.quality?.description?.map(
              (text, i) => (
                <p
                  key={i}
                  className="mb-3"
                >
                  {text}
                </p>
              )
            )}
          </div>
        </div>

        {/* COMMITMENT */}
        <div className="mt-20 text-center max-w-3xl mx-auto">

          <h2
            className="text-3xl font-bold mb-4"
            style={{
              color:
                colors.primary,
            }}
          >
            {
              about
                ?.commitment
                ?.title
            }
          </h2>

          <p>
            {
              about
                ?.commitment
                ?.description
            }
          </p>
        </div>
      </div>
    </div>
  );
}