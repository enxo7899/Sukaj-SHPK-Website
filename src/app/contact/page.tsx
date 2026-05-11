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

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="site-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 tracking-wider mb-6">
            {t("contact.eyebrow")}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            {t("contact.headline")}
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-6">
                {t("nav.contact")}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{t("contact.addressLabel")}</p>
                    <p className="text-sm text-slate-400">{company.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{t("contact.phoneLabel")}</p>
                    <a href="tel:+355123456789" className="text-sm text-slate-400 hover:text-white transition-colors">
                      +355 123 456 789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{t("contact.emailLabel")}</p>
                    <a href="mailto:info@sukaj.al" className="text-sm text-slate-400 hover:text-white transition-colors">
                      info@sukaj.al
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{t("contact.hoursLabel")}</p>
                    <p className="text-sm text-slate-400">{t("contact.hoursValue")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-700/10 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">
                {t("contact.technicalSupport")}
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                {t("contact.technicalSupportDesc")}
              </p>
              <a
                href="mailto:engineering@sukaj.al"
                className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                engineering@sukaj.al
              </a>
            </div>
          </motion.div>

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
                className="h-full flex flex-col items-center justify-center p-12 rounded-xl bg-white/5 border border-white/10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t("contact.formSuccess")}
                </h3>
                <p className="text-slate-400 mb-6">
                  {t("contact.subtitle")}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {t("contact.formSubmit")}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-6">
                  {t("contact.formSubmit")}
                </h3>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">
                      {t("contact.formName")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">
                      {t("contact.formEmail")}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">
                      {t("contact.formCompany")}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">
                      {t("contact.formProject")}
                    </label>
                    <select
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    >
                      <option value="" className="bg-slate-900">—</option>
                      <option value="civil" className="bg-slate-900">{t("categories.civilName")}</option>
                      <option value="agri" className="bg-slate-900">{t("categories.agriName")}</option>
                      <option value="industrial" className="bg-slate-900">{t("categories.industrialName")}</option>
                      <option value="other" className="bg-slate-900">{t("catalog.matOther")}</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    {t("contact.formMessage")}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-cyan-700/30"
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
