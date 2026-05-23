import { useEffect, useState } from "react";

import api from "../../shared/api";

import {
  useBranding,
} from "../../shared/hooks/BrandingContext";

export default function AdminSettings() {
  const brand =
    useBranding();

  const primary =
    brand?.colors?.primary ||
    "#111827";

  const [saving, setSaving] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  const [form, setForm] =
    useState({
      siteName: "",
      tagline: "",

      metaTitle: "",
      metaDescription: "",

      logo: "",
      favicon: "",

      primaryColor: "",
      accentColor: "",

      heroTitle: "",
      heroSubtitle: "",
      heroImage: "",

      previewTitle: "",
      previewHighlight: "",
      previewDescription: "",

      email: "",
      phone: "",
      whatsapp: "",
      address: "",
    });

  /* =========================================
     LOAD
  ========================================= */

  useEffect(() => {
    if (!brand) return;

    setForm({
      siteName:
        brand.siteName || "",

      tagline:
        brand.tagline || "",

      metaTitle:
        brand.metaTitle || "",

      metaDescription:
        brand.metaDescription ||
        "",

      logo:
        brand.logo || "",

      favicon:
        brand.favicon || "",

      primaryColor:
        brand.colors?.primary ||
        "",

      accentColor:
        brand.colors?.accent ||
        "",

      heroTitle:
        brand.hero?.title ||
        "",

      heroSubtitle:
        brand.hero
          ?.subtitle || "",

      heroImage:
        brand.hero?.image ||
        "",

      previewTitle:
        brand.preview
          ?.title || "",

      previewHighlight:
        brand.preview
          ?.highlight || "",

      previewDescription:
        brand.preview
          ?.description || "",

      email:
        brand.contact
          ?.email || "",

      phone:
        brand.contact
          ?.phone || "",

      whatsapp:
        brand.contact
          ?.whatsapp || "",

      address:
        brand.contact
          ?.address || "",
    });
  }, [brand]);

  /* =========================================
     CHANGE
  ========================================= */

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });
  }

  /* =========================================
     SAVE
  ========================================= */

  async function saveSettings() {
    try {
      setSaving(true);

      const payload = {
        siteName:
          form.siteName,

        tagline:
          form.tagline,

        metaTitle:
          form.metaTitle,

        metaDescription:
          form.metaDescription,

        logo: form.logo,

        favicon:
          form.favicon,

        colors: {
          primary:
            form.primaryColor,

          accent:
            form.accentColor,
        },

        hero: {
          title:
            form.heroTitle,

          subtitle:
            form.heroSubtitle,

          image:
            form.heroImage,
        },

        preview: {
          title:
            form.previewTitle,

          highlight:
            form.previewHighlight,

          description:
            form.previewDescription,
        },

        contact: {
          email:
            form.email,

          phone:
            form.phone,

          whatsapp:
            form.whatsapp,

          address:
            form.address,
        },
      };

      await api.put(
        "/adminSettings/settings",
        payload
      );

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (err) {
      console.error(err);

      alert(
        "Failed to save settings"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">

      {/* HEADER */}
      <div>

        <h1 className="text-3xl font-bold">
          Institute Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Configure your
          institute branding,
          metadata, hero
          section, and
          contact details.
        </p>
      </div>

      {/* GENERAL */}
      <Section title="General Information">

        <Input
          label="Institute Name"
          name="siteName"
          value={
            form.siteName
          }
          onChange={
            handleChange
          }
        />

        <Input
          label="Tagline"
          name="tagline"
          value={
            form.tagline
          }
          onChange={
            handleChange
          }
        />

        <Input
          label="Logo URL"
          name="logo"
          value={form.logo}
          onChange={
            handleChange
          }
        />

        <Input
          label="Favicon URL"
          name="favicon"
          value={
            form.favicon
          }
          onChange={
            handleChange
          }
        />
      </Section>

      {/* SEO */}
      <Section title="SEO Metadata">

        <Input
          label="Meta Title"
          name="metaTitle"
          value={
            form.metaTitle
          }
          onChange={
            handleChange
          }
        />

        <Textarea
          label="Meta Description"
          name="metaDescription"
          value={
            form.metaDescription
          }
          onChange={
            handleChange
          }
        />
      </Section>

      {/* COLORS */}
      <Section title="Brand Colors">

        <Input
          label="Primary Color"
          name="primaryColor"
          value={
            form.primaryColor
          }
          onChange={
            handleChange
          }
        />

        <Input
          label="Accent Color"
          name="accentColor"
          value={
            form.accentColor
          }
          onChange={
            handleChange
          }
        />
      </Section>

      {/* HERO */}
      <Section title="Hero Section">

        <Input
          label="Hero Title"
          name="heroTitle"
          value={
            form.heroTitle
          }
          onChange={
            handleChange
          }
        />

        <Textarea
          label="Hero Subtitle"
          name="heroSubtitle"
          value={
            form.heroSubtitle
          }
          onChange={
            handleChange
          }
        />

        <Input
          label="Hero Image"
          name="heroImage"
          value={
            form.heroImage
          }
          onChange={
            handleChange
          }
        />
      </Section>

      {/* PREVIEW */}
      <Section title="Preview Section">

        <Input
          label="Preview Title"
          name="previewTitle"
          value={
            form.previewTitle
          }
          onChange={
            handleChange
          }
        />

        <Input
          label="Preview Highlight"
          name="previewHighlight"
          value={
            form.previewHighlight
          }
          onChange={
            handleChange
          }
        />

        <Textarea
          label="Preview Description"
          name="previewDescription"
          value={
            form.previewDescription
          }
          onChange={
            handleChange
          }
        />
      </Section>

      {/* CONTACT */}
      <Section title="Contact Information">

        <Input
          label="Email"
          name="email"
          value={
            form.email
          }
          onChange={
            handleChange
          }
        />

        <Input
          label="Phone"
          name="phone"
          value={
            form.phone
          }
          onChange={
            handleChange
          }
        />

        <Input
          label="WhatsApp"
          name="whatsapp"
          value={
            form.whatsapp
          }
          onChange={
            handleChange
          }
        />

        <Textarea
          label="Address"
          name="address"
          value={
            form.address
          }
          onChange={
            handleChange
          }
        />
      </Section>

      {/* SAVE */}
      <div className="flex items-center gap-4">

        <button
          onClick={
            saveSettings
          }
          disabled={saving}
          className="px-6 py-3 rounded-xl text-white font-semibold"
          style={{
            background:
              primary,
          }}
        >
          {saving
            ? "Saving..."
            : "Save Settings"}
        </button>

        {saved && (
          <div className="text-green-600 text-sm font-medium">
            Settings saved
            successfully.
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================
   COMPONENTS
========================================= */

function Section({
  title,
  children,
}) {
  return (
    <div className="bg-white border rounded-2xl p-6 space-y-5">

      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      {children}
    </div>
  );
}

function Input({
  label,
  ...props
}) {
  return (
    <div className="space-y-2">

      <label className="text-sm font-medium">
        {label}
      </label>

      <input
        {...props}
        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Textarea({
  label,
  ...props
}) {
  return (
    <div className="space-y-2">

      <label className="text-sm font-medium">
        {label}
      </label>

      <textarea
        {...props}
        rows={5}
        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}