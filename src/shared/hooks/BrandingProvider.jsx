import {
  useEffect,
  useState,
} from "react";

import api from "../../shared/api";

import themes from "../../config/themes.json";

import {
  BrandingContext,
} from "./BrandingContext";

import FullPageLoader from "../../public/pages/FullPageLoader";
import InstituteErrorState from "../../public/pages/InstituteErrorState";

export default function BrandingProvider({
  children,
}) {

  const [branding, setBranding] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  /* =========================================
     LOAD BRANDING
  ========================================= */

  useEffect(() => {
    loadBranding();
  }, []);

  async function loadBranding() {

    try {

      setLoading(true);

      setError(false);

      console.log(
        "🌐 HOST:",
        window.location.hostname
      );

      /* =========================================
         LOAD FROM API
      ========================================= */

      const res =
        await api.get(
          "/public/branding"
        );

      console.log(
        "✅ BRANDING RESPONSE:",
        res.data
      );

      const brand =
        res.data?.branding || {};

      const theme =
        themes[
          brand.theme ||
            "darkBox"
        ] || {};

      const finalBranding = {
        ...brand,

        theme,

        colors: {
          primary:
            brand.colors
              ?.primary ||
            brand.primaryColor ||
            "#30a5f9",

          accent:
            brand.colors
              ?.accent ||
            brand.accentColor ||
            "#ffffff",
        },
      };

      console.log(
        "🎨 FINAL BRANDING:",
        finalBranding
      );

      /* =========================================
         CACHE
      ========================================= */

      localStorage.setItem(
        "branding-cache",

        JSON.stringify(
          finalBranding
        )
      );

      setBranding(
        finalBranding
      );

    } catch (err) {

      console.error(
        "❌ BRANDING LOAD FAILED:",
        err
      );

      setError(true);

      /* =========================================
         TRY CACHE
      ========================================= */

      try {

        const cached =
          localStorage.getItem(
            "branding-cache"
          );

        if (cached) {

          const parsed =
            JSON.parse(
              cached
            );

          setBranding(
            parsed
          );

          console.log(
            "⚡ USING CACHED BRANDING"
          );
        }

      } catch (cacheErr) {

        console.error(
          "CACHE ERROR:",
          cacheErr
        );
      }

    } finally {

      setLoading(false);
    }
  }

  /* =========================================
     META TAGS
  ========================================= */

  useEffect(() => {

    if (!branding) return;

    // TITLE
    document.title =
      branding.metaTitle ||
      branding.siteName ||
      "Eduline";

    // DESCRIPTION
    updateMetaTag(
      "description",

      branding.metaDescription ||
        branding.tagline ||
        "Learning Platform"
    );

    // FAVICON
    updateFavicon(
      branding.favicon ||
        branding.logo ||
        "/favicon.ico"
    );

    // OG TITLE
    updateMetaProperty(
      "og:title",

      branding.metaTitle ||
        branding.siteName
    );

    // OG DESCRIPTION
    updateMetaProperty(
      "og:description",

      branding.metaDescription ||
        branding.tagline
    );

    // OG IMAGE
    updateMetaProperty(
      "og:image",

      branding.logo ||
        branding.favicon
    );

  }, [branding]);

  /* =========================================
     LOADING SCREEN
  ========================================= */

  if (
    loading &&
    !branding
  ) {
    return (
      <FullPageLoader />
    );
  }

  /* =========================================
     ERROR STATE
  ========================================= */

  if (
    error &&
    !branding
  ) {
    return (<InstituteErrorState loadBranding={loadBranding} />)
  }

  /* =========================================
     PROVIDER
  ========================================= */

  return (
    <BrandingContext.Provider
      value={branding}
    >
      {children}
    </BrandingContext.Provider>
  );
}

/* =========================================
   HELPERS
========================================= */

function updateMetaTag(
  name,
  content
) {

  if (!content) return;

  let element =
    document.querySelector(
      `meta[name="${name}"]`
    );

  if (!element) {

    element =
      document.createElement(
        "meta"
      );

    element.setAttribute(
      "name",
      name
    );

    document.head.appendChild(
      element
    );
  }

  element.setAttribute(
    "content",
    content
  );
}

function updateMetaProperty(
  property,
  content
) {

  if (!content) return;

  let element =
    document.querySelector(
      `meta[property="${property}"]`
    );

  if (!element) {

    element =
      document.createElement(
        "meta"
      );

    element.setAttribute(
      "property",
      property
    );

    document.head.appendChild(
      element
    );
  }

  element.setAttribute(
    "content",
    content
  );
}

function updateFavicon(
  url
) {

  if (!url) return;

  let link =
    document.querySelector(
      "link[rel*='icon']"
    );

  if (!link) {

    link =
      document.createElement(
        "link"
      );

    link.rel = "icon";

    document.head.appendChild(
      link
    );
  }

  link.href = url;
}