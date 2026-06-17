import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Building, ShieldAlert } from 'lucide-react';
import { useLang } from '../i18n';

interface ContactFormProps {
  selectedProductModel?: string;
  onClearProduct?: () => void;
}

export default function ContactForm({ selectedProductModel, onClearProduct }: ContactFormProps) {
  const { T } = useLang();
  const tc = T.contact;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [partnerType, setPartnerType] = useState('dealer');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inquiryId, setInquiryId] = useState('');

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedProductModel) {
      const isPrivate = partnerType === 'private';
      setMessage((prev) => {
        if (prev && !prev.startsWith('Вітаємо') && !prev.startsWith('Hello')) return prev;
        return isPrivate
          ? tc.msg_template_private?.replace('{model}', selectedProductModel) ?? prev
          : tc.msg_template_b2b?.replace('{model}', selectedProductModel) ?? prev;
      });
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedProductModel, partnerType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setInquiryId(`KM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleResetForm = () => {
    setName(''); setEmail(''); setPhone(''); setCompany(''); setMessage('');
    setPartnerType('dealer'); setIsSuccess(false);
    onClearProduct?.();
  };

  const isPrivate = partnerType === 'private';

  return (
    <section ref={sectionRef} id="contact-section" className="py-24 px-6 md:px-12 bg-[#1A1A1A] text-[#FAF9F6] scroll-mt-6 border-t border-white/5 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#8C7B6C] block mb-2">{tc.badge}</span>
          <h3 className="text-3xl md:text-4xl font-serif text-white tracking-tight">{tc.title}</h3>
          <p className="text-stone-400 mt-4 max-w-lg mx-auto text-sm leading-relaxed">{tc.subtitle}</p>
        </div>

        <AnimatePresence>
          {selectedProductModel && !isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#242424] border border-white/10 p-5 mb-10 flex justify-between items-center shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#8C7B6C]/10 flex items-center justify-center border border-[#8C7B6C]/20 text-[#8C7B6C]">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#8C7B6C]">{tc.selected_label}</span>
                  <p className="text-white text-sm font-medium">{tc.model_prefix} {selectedProductModel}</p>
                </div>
              </div>
              <button onClick={onClearProduct} className="text-stone-400 hover:text-white text-xs underline font-mono cursor-pointer">
                {tc.clear}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#222] border border-white/10 p-8 md:p-12 text-center shadow-2xl"
          >
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="font-mono text-[9px] text-[#8C7B6C] tracking-[0.25em] uppercase">{tc.success_badge}</span>
            <h4 className="text-2xl font-serif text-white mt-2 tracking-tight">{tc.success_title}</h4>
            <p className="text-stone-300 max-w-md mx-auto mt-4 text-xs leading-relaxed">
              {tc.id_label} <strong className="text-white font-mono">{inquiryId}</strong>. {isPrivate ? tc.success_msg_private : tc.success_msg_b2b}.
            </p>
            <div className="my-8 max-w-xs mx-auto p-4 bg-[#1A1A1A] border border-white/5 text-left space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-400">
                <span className="font-mono">{tc.id_label}</span>
                <span className="font-mono text-white font-bold">{inquiryId}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span className="font-mono">{tc.status_label}:</span>
                <span className="text-[#8C7B6C] font-semibold">{tc.status_value}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span className="font-mono">{tc.priority_label}</span>
                <span className="text-white">{isPrivate ? tc.priority_private : tc.priority_b2b}</span>
              </div>
            </div>
            <button
              onClick={handleResetForm}
              className="px-6 py-3 bg-[#FAF9F6] text-[#1A1A1A] hover:bg-white text-xs font-mono uppercase tracking-[0.15em] transition-colors cursor-pointer"
            >
              {tc.another}
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-[10px] text-stone-400 font-mono uppercase tracking-wider block mb-2">{tc.status_label}</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {tc.types.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPartnerType(item.id)}
                      className={`py-3 px-2 text-[11px] font-mono uppercase text-center border transition-all cursor-pointer ${
                        partnerType === item.id
                          ? 'bg-[#8C7B6C] border-[#8C7B6C] text-white font-medium'
                          : 'border-white/10 hover:border-[#8C7B6C]/40 text-stone-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {([
                { id: 'form-name', value: name, set: setName, label: tc.name, type: 'text', required: true },
                { id: 'form-company', value: company, set: setCompany, label: tc.company, type: 'text', required: false },
                { id: 'form-email', value: email, set: setEmail, label: isPrivate ? tc.email_private : tc.email_b2b, type: 'email', required: true },
                { id: 'form-phone', value: phone, set: setPhone, label: tc.phone, type: 'tel', required: true },
              ] as const).map((field) => (
                <div key={field.id} className="relative group">
                  <input
                    type={field.type}
                    required={field.required}
                    id={field.id}
                    value={field.value}
                    onChange={(e) => field.set(e.target.value)}
                    placeholder=" "
                    className="w-full bg-transparent border-b border-stone-700 py-3 px-1 text-sm text-stone-100 placeholder-transparent focus:outline-none focus:border-[#8C7B6C] transition-colors"
                  />
                  <label
                    htmlFor={field.id}
                    className="absolute left-1 top-3 text-[10px] text-stone-500 font-mono uppercase tracking-wider pointer-events-none origin-top-left transition-all duration-300 group-focus-within:-translate-y-5 group-focus-within:scale-75 group-focus-within:text-[#8C7B6C]"
                    style={{
                      transform: field.value ? 'translateY(-20px) scale(0.75)' : undefined,
                      color: field.value ? '#8C7B6C' : undefined,
                    }}
                  >
                    {field.label}
                  </label>
                </div>
              ))}

              <div className="relative group md:col-span-2">
                <textarea
                  rows={3}
                  id="form-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder=" "
                  className="w-full bg-transparent border-b border-stone-700 py-3 px-1 text-sm text-stone-100 placeholder-transparent focus:outline-none focus:border-[#8C7B6C] transition-colors resize-none"
                />
                <label
                  htmlFor="form-message"
                  className="absolute left-1 top-3 text-[10px] text-stone-500 font-mono uppercase tracking-wider pointer-events-none origin-top-left transition-all duration-300 group-focus-within:-translate-y-5 group-focus-within:scale-75 group-focus-within:text-[#8C7B6C]"
                  style={{
                    transform: message ? 'translateY(-20px) scale(0.75)' : undefined,
                    color: message ? '#8C7B6C' : undefined,
                  }}
                >
                  {tc.message}
                </label>
              </div>
            </div>

            <div className="text-stone-500 text-[10px] leading-relaxed font-mono uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{isPrivate ? tc.privacy_private : tc.privacy_b2b}</span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-10 py-3.5 bg-[#8C7B6C] hover:bg-[#a18f80] text-white font-mono uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{tc.submitting}</span>
                  </>
                ) : (
                  <>
                    <span>{isPrivate ? tc.submit_private : tc.submit_b2b}</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
