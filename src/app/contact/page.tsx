"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { company } from "@/lib/data";
import { useTranslation } from "@/lib/i18n/context";

export default function ContactPage() {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    project: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-500/40";
  const inputStyle = {
    backgroundColor: "var(--site-surface)",
    border: "1px solid var(--site-border)",
    color: "var(--site-text)",
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 bg-[var(--site-bg)]">
      <div className="site-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span
            className="inline-block px-4 py-2 rounded-full text-xs font-mono tracking-wider mb-6"
            style={{ backgroundColor: "var(--site-surface-strong)", border: "1px solid var(--site-border)", color: "var(--site-text-soft)" }}
          >
            {t("contact.eyebrow")}
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            style={{ color: "var(--site-text)" }}
          >
            {t("contact.headline")}
          </h1>
          <p className="mt-2 text-lg max-w-2xl mx-auto" style={{ color: "var(--site-text-muted)" }}>
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left column — info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Contact details card */}
            <div
              className="p-6 rounded-xl"
              style={{ backgroundColor: "var(--site-surface-strong)", border: "1px solid var(--site-border)" }}
            >
              <h3 className="text-lg font-bold mb-6" style={{ color: "var(--site-text)" }}>
                {t("nav.contact")}
              </h3>

              <div className="space-y-5">
                {[
                  { Icon: MapPin, label: t("contact.addressLabel"), value: company.location, href: undefined },
                  { Icon: Phone, label: t("contact.phoneLabel"), value: "+355 123 456 789", href: "tel:+355123456789" },
                  { Icon: Mail, label: t("contact.emailLabel"), value: "info@sukaj.al", href: "mailto:info@sukaj.al" },
                  { Icon: Clock, label: t("contact.hoursLabel"), value: t("contact.hoursValue"), href: undefined },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "var(--site-surface)", border: "1px solid var(--site-border)" }}
                    >
                      <Icon className="w-5 h-5 text-cyan-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5" style={{ color: "var(--site-text)" }}>{label}</p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm transition-colors hover:text-cyan-500"
                          style={{ color: "var(--site-text-muted)" }}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm" style={{ color: "var(--site-text-muted)" }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical support card */}
            <div
              className="p-6 rounded-xl"
              style={{ backgroundColor: "var(--site-surface-strong)", border: "1px solid var(--site-border)" }}
            >
              <h3 className="text-lg font-bold mb-2" style={{ color: "var(--site-text)" }}>
                {t("contact.technicalSupport")}
              </h3>
              <p className="text-sm mb-4" style={{ color: "var(--site-text-muted)" }}>
                {t("contact.technicalSupportDesc")}
              </p>
              <a
                href="mailto:engineering@sukaj.al"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-500 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                engineering@sukaj.al
              </a>
            </div>
          </motion.div>

          {/* Right column — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center p-12 rounded-xl text-center"
                style={{ backgroundColor: "var(--site-surface-strong)", border: "1px solid var(--site-border)" }}
              >
                <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--site-text)" }}>
                  {t("contact.formSuccess")}
                </h3>
                <p className="mb-6" style={{ color: "var(--site-text-muted)" }}>
                  {t("contact.subtitle")}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors font-semibold"
                >
                  {t("contact.formSubmit")}
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 rounded-xl"
                style={{ backgroundColor: "var(--site-surface-strong)", border: "1px solid var(--site-border)" }}
              >
                <h3 className="text-lg font-bold mb-6" style={{ color: "var(--site-text)" }}>
                  {t("contact.formSubmit")}
                </h3>

                <div className="grid md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--site-text-muted)" }}>
                      {t("contact.formName")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--site-text-muted)" }}>
                      {t("contact.formEmail")}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--site-text-muted)" }}>
                      {t("contact.formCompany")}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--site-text-muted)" }}>
                      {t("contact.formProject")}
                    </label>
                    <select
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                      className={inputClass}
                      style={inputStyle}
                    >
                      <option value="">—</option>
                      <option value="civil">{t("categories.civilName")}</option>
                      <option value="agri">{t("categories.agriName")}</option>
                      <option value="industrial">{t("categories.industrialName")}</option>
                      <option value="other">{t("catalog.matOther")}</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--site-text-muted)" }}>
                    {t("contact.formMessage")}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-cyan-700/20"
                >
                  <Send className="w-5 h-5" />
                  {t("contact.formSubmit")}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
