import { Link, NavLink } from "react-router-dom";
import { getUser } from "../../shared/auth";
import { useBranding } from "../../shared/hooks/BrandingContext";

export default function PublicHeader() {
  const user = getUser();

  const brandData = useBranding();

  // FIX OLD STRUCTURE
  const brand =
    brandData?.default || brandData || {};

  console.log("HEADER BRAND", brand);

  // THEME IS ALREADY PROCESSED
  const theme = brandData?.theme || {};

  const colors = brandData?.colors || {
    primary: "#1e3a8a",
    accent: "#ffffff",
  };

  return (
    <header
      className="shadow-sm md:px-16"
      style={{
        backgroundColor:
          colors.accent,

        color:
          colors.primary,
      }}
    >
      <div className="max-w-7xl mx-auto px-3 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          {brand.logo ? (
            <img
              src={brand.logo}
              alt={
                brand.siteName
              }
              className="h-12 w-auto object-contain"
            />
          ) : (
            <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center text-sm font-bold">
              {brand.siteName?.charAt(
                0
              ) || "E"}
            </div>
          )}
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">

          <NavLink
            to="/courses"
            className="hover:opacity-80 transition"
          >
            Courses
          </NavLink>

          <NavLink
            to="/contact"
            className="hover:opacity-80 transition"
          >
            Contact
          </NavLink>

          <NavLink
            to="/aboutus"
            className="hover:opacity-80 transition"
          >
            About Us
          </NavLink>
        </nav>

        {/* AUTH */}
        <div className="flex items-center gap-4 text-sm">

          {!user && (
            <>
              <Link
                to="/login"
                className="hover:opacity-80"
              >
                Login
              </Link>

              <Link
                to="/register"
                className={`${theme.button?.primary || " "
                  } px-4 py-2 ${theme.shape?.buttonRadius || "rounded-xl"
                  } rounded-xl text-sm font-semibold`}
                style={{
                  background:
                    colors.primary,

                  color:
                    colors.accent,
                }}
              >
                Register
              </Link>
            </>
          )}

          {user?.role ===
            "student" && (
              <Link
                to="/student"
                className={`${theme.button?.secondary || ""
                  } px-4 py-2 ${theme.shape?.buttonRadius || "rounded-xl"
                  }`}
              >
                Dashboard
              </Link>
            )}

          {user?.role ===
            "ADMIN" && (
              <Link
                to="/admin"
                className={`${theme.button?.secondary || ""
                  } px-4 py-2 ${theme.shape?.buttonRadius || "rounded-xl"
                  }`}
              >
                Admin Panel
              </Link>
            )}
        </div>
      </div>
    </header>
  );
}