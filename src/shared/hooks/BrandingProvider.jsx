import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import themes from "../../config/themes.json";

import {
  BrandingContext,
} from "./brandingContext";

export default function BrandingProvider({
  children,
}) {
  const [branding, setBranding] =
    useState(null);

  /* =========================================
     LOAD BRANDING
  ========================================= */

  useEffect(() => {
    loadBranding();
  }, []);

  async function loadBranding() {
    try {
      const res = await axios.get(
        "/api/public/branding"
      );

      console.log(
        "✅ Branding loaded",
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
            "#f94430",

          accent:
            brand.colors
              ?.accent ||
            brand.accentColor ||
            "#22C55E",
        },
      };

      setBranding(
        finalBranding
      );
    } catch (err) {
      console.error(
        "❌ Branding load failed",
        err
      );

      // SAFE FALLBACK
      setBranding({
        siteName:
          "Eduline",

        tagline:
          "Learning Platform",

        theme:
          themes.darkBox ||
          {},

        colors: {
          primary:
            "#f94430",

          accent:
            "#22C55E",
        },
      });
    }
  }

  /* =========================================
     DYNAMIC META
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

    // OPEN GRAPH
    updateMetaProperty(
      "og:title",

      branding.metaTitle ||
      branding.siteName
    );

    updateMetaProperty(
      "og:description",

      branding.metaDescription ||
      branding.tagline
    );

    updateMetaProperty(
      "og:image",

      branding.logo ||
      branding.favicon
    );
  }, [branding]);

  /* =========================================
     LOADING
  ========================================= */

  if (!branding) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm font-medium">
        Loading...
      </div>
    );
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

function updateFavicon(url) {
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