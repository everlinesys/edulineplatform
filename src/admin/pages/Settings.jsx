import { useEffect, useState } from "react";
import {
  Upload,
  Save,
  Image as ImageIcon,
  Palette,
  Globe,
  Phone,
  Sparkles,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import api from "../../shared/api";
import { useBranding } from "../../shared/hooks/BrandingContext";

export default function AdminSettings() {
  const brand = useBranding();
  const primary = brand?.colors?.primary || "#2563eb";

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("branding");

  const [form, setForm] = useState({
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

  useEffect(() => {
    if (!brand) return;
    setForm({
      siteName: brand.siteName || "",
      tagline: brand.tagline || "",
      metaTitle: brand.metaTitle || "",
      metaDescription: brand.metaDescription || "",
      logo: brand.logo || "",
      favicon: brand.favicon || "",
      primaryColor: brand.colors?.primary || "#2563eb",
      accentColor: brand.colors?.accent || "#ffffff",
      heroTitle: brand.hero?.title || "",
      heroSubtitle: brand.hero?.subtitle || "",
      heroImage: brand.hero?.image || "",
      previewTitle: brand.preview?.title || "",
      previewHighlight: brand.preview?.highlight || "",
      previewDescription: brand.preview?.description || "",
      email: brand.contact?.email || "",
      phone: brand.contact?.phone || "",
      whatsapp: brand.contact?.whatsapp || "",
      address: brand.contact?.address || "",
    });
  }, [brand]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function uploadImage(file, field) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.post("/uploads/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((prev) => ({ ...prev, [field]: res.data.url }));
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    }
  }

  async function saveSettings() {
    try {
      setSaving(true);
      const payload = {
        siteName: form.siteName,
        tagline: form.tagline,
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
        logo: form.logo,
        favicon: form.favicon,
        colors: { primary: form.primaryColor, accent: form.accentColor },
        hero: { title: form.heroTitle, subtitle: form.heroSubtitle, image: form.heroImage },
        preview: { title: form.previewTitle, highlight: form.previewHighlight, description: form.previewDescription },
        contact: { email: form.email, phone: form.phone, whatsapp: form.whatsapp, address: form.address },
      };

      await api.put("/adminSettings/settings", payload);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[280px_1fr] gap-8 items-start">
        
        {/* SIDEBAR */}
        <aside className="bg-white rounded-2xl border border-slate-200/80 p-5 lg:sticky lg:top-8 shadow-sm">
          <div className="px-2 py-1">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Website Engine</h1>
            <p className="text-xs text-slate-500 mt-1">Configure workspace and branding</p>
          </div>

          <nav className="mt-6 space-y-1">
            <SidebarButton
              active={activeTab === "branding"}
              onClick={() => setActiveTab("branding")}
              icon={<Palette className="w-4 h-4" />}
              label="Branding & Identity"
              brandColor={primary}
            />
            <SidebarButton
              active={activeTab === "hero"}
              onClick={() => setActiveTab("hero")}
              icon={<ImageIcon className="w-4 h-4" />}
              label="Hero Section"
              brandColor={primary}
            />
            <SidebarButton
              active={activeTab === "seo"}
              onClick={() => setActiveTab("seo")}
              icon={<Globe className="w-4 h-4" />}
              label="SEO Metadata"
              brandColor={primary}
            />
            <SidebarButton
              active={activeTab === "contact"}
              onClick={() => setActiveTab("contact")}
              icon={<Phone className="w-4 h-4" />}
              label="Contact Details"
              brandColor={primary}
            />
          </nav>

          <hr className="my-5 border-slate-100" />

          <button
            className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-60 disabled:pointer-events-none"
            style={{ background: primary }}
            onClick={saveSettings}
            disabled={saving}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving Changes..." : "Save Configuration"}
          </button>

          {saved && (
            <div className="mt-3 flex items-center gap-2 justify-center text-emerald-600 bg-emerald-50 rounded-lg p-2.5 text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Changes saved successfully
            </div>
          )}
        </aside>

        {/* MAIN PANEL CONTENT */}
        <main className="space-y-8">
          {activeTab === "branding" && (
            <Section title="Identity & Theme" description="Set up core visual identifiers and legal nomenclature.">
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Institute Name" name="siteName" value={form.siteName} onChange={handleChange} placeholder="e.g. Acme Tech Institute" />
                <Input label="Slogan / Tagline" name="tagline" value={form.tagline} onChange={handleChange} placeholder="Learning for the future" />
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-2">
                <ImagePicker label="Main Corporate Logo" value={form.logo} onUpload={(file) => uploadImage(file, "logo")} aspect="landscape" />
                <ImagePicker label="Favicon (Browser Icon)" value={form.favicon} onUpload={(file) => uploadImage(file, "favicon")} aspect="square" />
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-2">
                <ColorPicker label="Primary Palette Color" name="primaryColor" value={form.primaryColor} onChange={handleChange} />
                <ColorPicker label="Accent Brand Color" name="accentColor" value={form.accentColor} onChange={handleChange} />
              </div>
            </Section>
          )}

          {activeTab === "hero" && (
            <Section title="Hero Display" description="This is the top-most introduction window banner visitors see first.">
              <Input label="Catchy Hero Headline" name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Welcome to Premium Education Hub" />
              <Textarea label="Subtext / Descriptive Paragraph" name="heroSubtitle" value={form.heroSubtitle} onChange={handleChange} placeholder="Provide a brief context here explaining your services..." />
              <ImagePicker label="Hero Banner Image Background" value={form.heroImage} onUpload={(file) => uploadImage(file, "heroImage")} aspect="banner" />
            </Section>
          )}

          {activeTab === "seo" && (
            <Section title="Search Optimization" description="Help your business rank properly across index crawlers.">
              <Input label="Global SEO Title Page" name="metaTitle" value={form.metaTitle} onChange={handleChange} placeholder="Acme Institute | Best Technical Courses Online" />
              <Textarea label="Snippet Meta Description" name="metaDescription" value={form.metaDescription} onChange={handleChange} placeholder="Provide descriptive context within 160 characters..." />
            </Section>
          )}

          {activeTab === "contact" && (
            <Section title="Contact Entry points" description="Manage communication records shown transparently on the footer interface.">
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Official Email Support" type="email" name="email" value={form.email} onChange={handleChange} placeholder="support@domain.com" />
                <Input label="Direct Line Phone" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
              </div>
              <Input label="WhatsApp Direct Business API Link" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="https://wa.me/..." />
              <Textarea label="Physical Headquarters Address" name="address" value={form.address} onChange={handleChange} placeholder="Street Name, Suite/Room, City, Country" rows={3} />
            </Section>
          )}

          {/* DYNAMIC DESIGN PREVIEW WINDOW */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="bg-slate-900 px-4 py-2 flex items-center gap-1.5 border-b border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
              <span className="text-[10px] text-slate-500 font-mono ml-4 select-none tracking-wider">LIVE DESKTOP SANDBOX PREVIEW</span>
            </div>

            <div className="min-h-72 relative flex flex-col justify-between transition-colors duration-300" style={{ backgroundColor: form.primaryColor || '#0f172a' }}>
              {form.heroImage && (
                <img src={form.heroImage} alt="Preview Background" className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay pointer-events-none" />
              )}

              {/* Navigation Header bar Simulator */}
              <div className="relative z-10 w-full px-6 py-4 flex items-center justify-between border-b border-white/10 backdrop-blur-sm bg-black/5">
                <div className="flex items-center gap-2.5">
                  {form.logo ? (
                    <img src={form.logo} alt="Site Logo" className="w-8 h-8 rounded-lg object-cover bg-white ring-1 ring-black/5" />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white"><Sparkles className="w-4 h-4" /></div>
                  )}
                  <div>
                    <h4 className="font-bold text-xs text-white tracking-wide">{form.siteName || "Workspace Title"}</h4>
                    <p className="text-[10px] text-white/60 line-clamp-1">{form.tagline || "Tagline Context"}</p>
                  </div>
                </div>
                <div className="flex gap-4 text-[11px] text-white/80 font-medium">
                  <span className="opacity-60">Home</span>
                  <span className="opacity-60">Courses</span>
                  <span className="opacity-60">About</span>
                </div>
              </div>

              {/* Central Copy Core Hero Hero */}
              <div className="relative z-10 px-8 py-12 text-white flex-1 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight max-w-xl transition-all">
                  {form.heroTitle || "Insert compelling visual title standard"}
                </h2>
                <p className="mt-2.5 max-w-lg text-xs text-white/70 line-clamp-2 leading-relaxed">
                  {form.heroSubtitle || "Your subtitle text placeholder description will dynamically populate this sub-section layer frame."}
                </p>
                <div className="mt-5">
                  <button
                    className="px-5 py-2.5 rounded-lg text-xs font-semibold shadow-sm hover:brightness-95 active:scale-95 transition-all"
                    style={{ backgroundColor: form.accentColor || '#ffffff', color: form.primaryColor || '#0f172a' }}
                  >
                    Explore Courses
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================
   COMPONENTS
========================================= */

function Section({ title, description, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 space-y-6 shadow-sm animate-in fade-in duration-200">
      <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-slate-400" />
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h2>
        </div>
        {description && <p className="text-xs text-slate-500">{description}</p>}
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function SidebarButton({ active, label, icon, onClick, brandColor }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
        active 
          ? "bg-slate-900 text-white shadow-sm" 
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
      }`}
      style={active ? { backgroundColor: brandColor } : {}}
    >
      <span className={active ? "text-white" : "text-slate-400"}>{icon}</span>
      {label}
    </button>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="space-y-1.5 w-full">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">{label}</label>
      <div className="focus-within:ring-2 focus-within:ring-slate-900/10 rounded-xl transition-all">
        <input
          {...props}
          className="w-full text-sm border border-slate-200 bg-slate-50/30 rounded-xl px-3.5 py-2.5 outline-none focus:border-slate-400 focus:bg-white placeholder-slate-400 transition-colors"
        />
      </div>
    </div>
  );
}

function Textarea({ label, rows = 4, ...props }) {
  return (
    <div className="space-y-1.5 w-full">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">{label}</label>
      <div className="focus-within:ring-2 focus-within:ring-slate-900/10 rounded-xl transition-all">
        <textarea
          {...props}
          rows={rows}
          className="w-full text-sm border border-slate-200 bg-slate-50/30 rounded-xl px-3.5 py-2.5 outline-none focus:border-slate-400 focus:bg-white placeholder-slate-400 transition-colors resize-none"
        />
      </div>
    </div>
  );
}

function ColorPicker({ label, name, value, onChange }) {
  return (
    <div className="space-y-1.5 w-full">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">{label}</label>
      <div className="flex items-center gap-2 border border-slate-200 bg-slate-50/30 rounded-xl p-1.5 focus-within:border-slate-400 focus-within:bg-white transition-all">
        <div className="relative w-10 h-9 rounded-lg overflow-hidden border border-slate-200 shadow-inner flex-shrink-0">
          <input
            type="color"
            name={name}
            value={value || "#ffffff"}
            onChange={onChange}
            className="absolute inset-[-6px] w-[200%] h-[200%] cursor-pointer border-0 p-0"
          />
        </div>
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder="#FFFFFF"
          maxLength={7}
          className="flex-1 bg-transparent text-sm font-mono font-medium outline-none px-2 uppercase text-slate-700"
        />
      </div>
    </div>
  );
}

function ImagePicker({ label, value, onUpload, aspect = "landscape" }) {
  const dimensions = {
    square: "w-16 h-16 rounded-xl",
    landscape: "w-24 h-16 rounded-xl",
    banner: "w-full h-32 rounded-xl",
  }[aspect];

  return (
    <div className="space-y-2 w-full">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">{label}</label>
      <div className="flex items-center gap-4 p-4 border border-slate-200 bg-slate-50/20 rounded-xl">
        <div className={`${dimensions} bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner`}>
          {value ? (
            <img src={value} alt="Preview asset" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-5 h-5 text-slate-400" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-500 truncate mb-2">{value ? "Asset linked successfully" : "No image selected yet"}</p>
          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer shadow-sm active:scale-[0.98] transition-all">
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            Choose File
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                if(e.target.files?.[0]) onUpload(e.target.files[0]);
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}