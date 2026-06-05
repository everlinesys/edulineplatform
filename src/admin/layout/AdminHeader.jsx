import { useState, useEffect, useRef } from "react";
import {
  MdPerson,
  MdLogout,
  MdMenu,
  MdSettings,
  MdRocketLaunch,
} from "react-icons/md";

import { useNavigate } from "react-router-dom";
import {
  getUser,
  logout,
} from "../../shared/auth";

import { useBranding } from "../../shared/hooks/BrandingContext";

export default function AdminHeader({
  onMenuClick,
}) {
  const brand =
    useBranding();

  const navigate =
    useNavigate();

  const user =
    getUser();

  const [open, setOpen] =
    useState(false);

  const dropdownRef =
    useRef(null);

  /* =========================================
     CLOSE ON OUTSIDE CLICK
  ========================================= */

  useEffect(() => {
    function handleClickOutside(
      event
    ) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =========================================
     LOGOUT
  ========================================= */

  const handleLogout =
    () => {
      logout();
      navigate("/login");
    };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6 shadow-sm">

      {/* =========================================
          LEFT
      ========================================= */}

      <div className="flex items-center gap-3">

        {/* MOBILE MENU */}

        <button
          onClick={
            onMenuClick
          }
          className="md:hidden p-2 transition"
          style={{
            background:
              brand.colors
                .accent,
            borderRadius: 8,
            color:
              brand.colors
                .primary,
          }}
        >
          <MdMenu
            size={24}
          />
        </button>

        <h1
          className="font-semibold text-gray-800"
          style={{
            fontSize: 20,
          }}
        >
          {/* {(
            brand.siteName ||
            "ELearn"
          ).toUpperCase()}{" "} */}
         ACADEMY ADMIN
        </h1>

      </div>

      {/* =========================================
          RIGHT
      ========================================= */}

      <div
        ref={dropdownRef}
        className="relative"
      >

        <button
          onClick={() =>
            setOpen(
              !open
            )
          }
          className="flex items-center gap-2 px-3 py-2 transition"
          style={{
            background:
              brand.colors
                .accent,

            borderRadius: 8,

            color:
              brand.colors
                .primary,
          }}
        >
          <MdPerson
            size={20}
          />

          <span className="hidden sm:block text-sm font-medium">
            {user?.name ||
              "Admin"}
          </span>
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-52 bg-white border rounded-xl shadow-xl overflow-hidden z-50">

            {/* PROFILE */}

            <button
              onClick={() => {
                navigate(
                  "/admin/settings"
                );

                setOpen(
                  false
                );
              }}
              className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
            >
              <MdSettings
                size={18}
              />

              Profile
            </button>

            {/* EDULINE */}

            <button
              onClick={() => {
                navigate(
                  "/admin/eduline"
                );

                setOpen(
                  false
                );
              }}
              className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
            >
              <MdRocketLaunch
                size={18}
              />

              Eduline
            </button>

            <div className="border-t" />

            {/* LOGOUT */}

            <button
              onClick={() => {
                setOpen(
                  false
                );

                handleLogout();
              }}
              className="w-full px-4 py-3 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-3"
            >
              <MdLogout
                size={18}
              />

              Logout
            </button>

          </div>
        )}

      </div>

    </header>
  );
}