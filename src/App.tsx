import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, Check, ChevronDown,
  ArrowRight, MapPin,
  Layers, Package, Users, Landmark,
  MessageCircle, Send, Phone,
} from 'lucide-react';
import UpholsteryGallery from './components/UpholsteryGallery';
import ContactForm from './components/ContactForm';
import ImagePlaceholder from './components/ImagePlaceholder';
import { useLang } from './i18n';

export default function App() {
  const { lang, setLang, T } = useLang();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProductModel, setSelectedProductModel] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectProduct = (modelName: string) => {
    setSelectedProductModel(modelName);
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleClearProduct = () => setSelectedProductModel(undefined);

  const b2bIcons = [
    <Layers className="w-5 h-5 text-[#8C7B6C]" />,
    <Users className="w-5 h-5 text-[#8C7B6C]" />,
    <Landmark className="w-5 h-5 text-[#8C7B6C]" />,
    <Package className="w-5 h-5 text-[#8C7B6C]" />,
  ];

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans text-[#1A1A1A] relative selection:bg-[#1A1A1A] selection:text-[#FAF9F6] overflow-x-hidden">


      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#1A1A1A]/10 py-4 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#606A57] flex items-center justify-center font-bold text-white text-[11px] tracking-tight">
              KM
            </div>
            <span className="font-bold text-xs tracking-[0.25em] text-[#1A1A1A] uppercase ml-0.5">KARAT</span>
          </a>

          <div className="hidden md:flex items-center gap-9 text-[13px] text-[#1A1A1A]">
            {(['catalog-section', 'production-section', 'reviews-section', 'contact-section'] as const).map((id, i) => {
              const labels = [T.nav.catalog, T.nav.production, T.nav.reviews, T.nav.contacts];
              return (
                <button key={id} onClick={() => scrollTo(id)} className="hover:text-[#8C7B6C] transition-colors cursor-pointer">
                  {labels[i]}
                </button>
              );
            })}
            <button
              onClick={() => setLang(lang === 'ua' ? 'en' : 'ua')}
              className="border border-stone-300 rounded-full px-4 py-1.5 text-xs text-[#1A1A1A] hover:bg-stone-100 transition-colors flex items-center gap-1"
            >
              <span>{lang.toUpperCase()}</span>
              <ChevronDown className="w-3 h-3 text-stone-500" />
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#1A1A1A] hover:text-[#8C7B6C] p-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#FAF9F6] border-b border-[#1A1A1A]/10 overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4 text-sm text-[#1A1A1A]/90 border-t border-[#1A1A1A]/5">
                {(['catalog-section', 'production-section', 'reviews-section', 'contact-section'] as const).map((id, i) => {
                  const labels = [T.nav.catalog, T.nav.production, T.nav.reviews, T.nav.contacts];
                  return (
                    <button key={id} onClick={() => scrollTo(id)} className="text-left py-1 hover:text-[#8C7B6C] font-medium">
                      {labels[i]}
                    </button>
                  );
                })}
                <button
                  onClick={() => setLang(lang === 'ua' ? 'en' : 'ua')}
                  className="self-start text-xs bg-stone-200 border border-stone-300 rounded-full px-3.5 py-1 text-stone-700 font-semibold uppercase"
                >
                  {lang.toUpperCase()} ▾
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>


      <header className="relative w-full min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#FAF9F6] text-[#1A1A1A]">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute inset-x-0 top-1/4 h-px bg-[#1A1A1A]/5" />
          <div className="absolute inset-x-0 bottom-1/4 h-px bg-[#1A1A1A]/5" />
          <div className="absolute inset-y-0 left-1/4 w-px bg-[#1A1A1A]/5" />
          <div className="absolute inset-y-0 right-1/4 w-px bg-[#1A1A1A]/5" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#8C7B6C] bg-[#8C7B6C]/5 px-3 py-1.5 border border-[#8C7B6C]/20 mb-6">
              {T.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[54px] font-serif text-[#1A1A1A] leading-[1.1] tracking-tight">
              {T.hero.title}
            </h1>
            <p className="text-stone-600 mt-6 text-sm md:text-base leading-relaxed max-w-lg">
              {T.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8 w-full sm:w-auto">
              <a
                href="https://wa.me/380000000000"
                target="_blank"
                rel="noreferrer"
                className="bg-[#ab583c] hover:bg-[#944a30] text-white font-medium px-6 py-3.5 transition-all text-xs flex items-center justify-center gap-2 rounded-lg shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{T.hero.cta_messenger}</span>
              </a>
              <button
                onClick={() => scrollTo('catalog-section')}
                className="border border-stone-300 hover:border-[#1A1A1A] text-[#1A1A1A] px-10 py-3.5 text-xs font-medium bg-white text-center rounded-lg transition-all cursor-pointer"
              >
                {T.hero.cta_catalog}
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-[#1A1A1A]/10 pt-8 w-full text-stone-500 text-[11px]">
              {[T.hero.feat1, T.hero.feat2, T.hero.feat3].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <span className="text-[#8C7B6C] font-semibold">✓</span>
                  <p className="font-medium">{f}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 xl:col-span-7">
            <div className="bg-[#FAF9F6]/50 p-6 md:p-10 rounded-[20px] border border-stone-200/80 shadow-lg">
              <div className="relative rounded-xl overflow-hidden shadow-md aspect-[16/10]">
                <ImagePlaceholder className="absolute inset-0" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-medium text-stone-800 shadow-sm">
                  {T.hero.card_badge}
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between w-full">
                <div className="w-3 h-1.5 border-l border-b border-stone-400" />
                <div className="flex-grow border-b border-dashed border-stone-300 mx-1" />
                <span className="px-3 text-xs font-semibold text-stone-600 tracking-wider font-mono">2600 × 1570 мм</span>
                <div className="flex-grow border-b border-dashed border-stone-300 mx-1" />
                <div className="w-3 h-1.5 border-r border-b border-stone-400" />
              </div>
            </div>
          </div>
        </div>
      </header>


      <section id="catalog-section" className="py-24 px-6 md:px-12 bg-white scroll-mt-6 border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#8C7B6C] block mb-2">{T.catalog.badge}</span>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] tracking-tight">{T.catalog.title}</h2>
              <p className="text-stone-600 mt-2 max-w-xl text-sm leading-relaxed">{T.catalog.subtitle}</p>
            </div>
            <button
              onClick={() => scrollTo('gallery-section')}
              className="text-xs font-mono uppercase tracking-wider text-[#8C7B6C] hover:text-[#1A1A1A] underline flex items-center gap-1.5 self-center md:self-auto cursor-pointer"
            >
              <span>{T.catalog.link_fabrics}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {T.catalog.models.map((item, index) => (
              <div
                key={index}
                className="group border border-stone-200 bg-[#FAF9F6] p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-stone-300"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-white border border-stone-100">
                    <ImagePlaceholder className="absolute inset-0" />
                    <span className="absolute top-3 left-3 bg-[#1A1A1A] text-white text-[9px] font-mono uppercase tracking-widest px-2.5 py-1">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A]">{item.name}</h3>
                  <span className="text-[11px] text-[#8C7B6C] font-mono uppercase tracking-wider block mt-1">{item.type}</span>
                  <div className="mt-4 pt-4 border-t border-stone-200/60 space-y-2 text-xs text-stone-600">
                    <div className="flex justify-between">
                      <span className="font-mono text-stone-400">{T.catalog.dim_label}</span>
                      <span className="font-mono text-[#1A1A1A] font-semibold">{item.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono text-stone-400">{T.catalog.frame_label}</span>
                      <span className="text-right text-[#1A1A1A] max-w-[150px] truncate">{item.frame}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono text-stone-400">{T.catalog.use_label}</span>
                      <span className="text-right text-[#1A1A1A] max-w-[150px] truncate">{item.bestFor}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-200/60">
                  <button
                    onClick={() => handleSelectProduct(item.name)}
                    className="w-full py-2.5 bg-[#1A1A1A] hover:bg-[#8C7B6C] text-white font-mono uppercase text-[10px] tracking-widest transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{T.catalog.cta_price}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="b2b-section" className="py-24 px-6 md:px-12 bg-[#FAF9F6] scroll-mt-6 border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#8C7B6C] block mb-2">{T.b2b.badge}</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] tracking-tight">{T.b2b.title}</h2>
            <p className="text-stone-600 mt-3 max-w-xl mx-auto text-sm leading-relaxed">{T.b2b.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {T.b2b.benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white border border-stone-200 p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                <div>
                  <div className="w-10 h-10 bg-[#8C7B6C]/10 flex items-center justify-center border border-[#8C7B6C]/20 mb-6 text-[#8C7B6C]">
                    {b2bIcons[idx]}
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A] mb-3">{benefit.title}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{benefit.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[10px] font-mono text-[#8C7B6C] uppercase tracking-wider font-semibold">
                  <span>{T.b2b.contract}</span>
                  <span>{T.b2b.quality}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <UpholsteryGallery onSelectMaterial={(name) => handleSelectProduct(`${T.gallery.textile_std}: ${name}`)} />


      <section id="production-section" className="py-24 px-6 md:px-12 bg-white text-[#1A1A1A] scroll-mt-6 border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#8C7B6C] block">{T.production.badge}</span>
              <h3 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] tracking-tight leading-tight">{T.production.title}</h3>
              <div className="text-sm text-stone-700 leading-relaxed space-y-4">
                <p>{T.production.text1}</p>
                <p>{T.production.text2}</p>
              </div>
              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#FAF9F6] border border-stone-200 flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#8C7B6C] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">{T.production.metric1_title}</h5>
                    <p className="text-[11px] text-stone-500 font-mono mt-0.5">{T.production.metric1_sub}</p>
                  </div>
                </div>
                <div className="p-4 bg-[#FAF9F6] border border-stone-200 flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#8C7B6C] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">{T.production.metric2_title}</h5>
                    <p className="text-[11px] text-stone-500 font-mono mt-0.5">{T.production.metric2_sub}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-none overflow-hidden aspect-[4/3] bg-white border border-stone-200 p-2.5 shadow-md">
              <ImagePlaceholder className="w-full h-full" />
              <div className="absolute top-5 right-5 bg-white/95 text-stone-800 font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border border-stone-200 shadow-sm">
                {T.production.img_label}
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="reviews-section" className="py-24 px-6 md:px-12 bg-[#FAF9F6] border-t border-stone-200 scroll-mt-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#8C7B6C] block mb-2">{T.reviews.badge}</span>
            <h2 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] tracking-tight">{T.reviews.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {T.reviews.items.map((review, idx) => (
              <div key={idx} className="bg-white border border-stone-200 p-6 flex flex-col justify-between shadow-sm">
                <p className="text-xs text-stone-600 leading-relaxed italic">"{review.text}"</p>
                <div className="mt-6 pt-4 border-t border-stone-100">
                  <h5 className="text-xs font-bold text-[#1A1A1A]">{review.author}</h5>
                  <span className="text-[10px] text-stone-400 font-mono block mt-0.5">{review.org}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <ContactForm selectedProductModel={selectedProductModel} onClearProduct={handleClearProduct} />


      <footer className="bg-[#1A1A1A] text-[#CCCCCC] border-t border-white/5 py-16 px-6 md:px-12 font-mono text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#525e4c] text-white font-bold font-sans text-xs flex items-center justify-center">КМ</div>
              <span className="font-sans font-bold text-white tracking-[0.2em] uppercase text-xs">Karat Mebli</span>
            </div>
            <p className="text-[11px] text-[#A0A0A0] leading-normal max-w-xs pr-4">{T.footer.tagline}</p>
          </div>

          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-4">{T.footer.hub_title}</h5>
            <ul className="space-y-2 text-[#A0A0A0] text-[11px]">
              <li className="flex gap-2 items-start">
                <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0 mt-0.5" />
                <span style={{ whiteSpace: 'pre-line' }}>{T.footer.address}</span>
              </li>
              <li>{T.footer.hours}</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-4">{T.footer.cert_title}</h5>
            <ul className="space-y-1.5 text-[#A0A0A0] text-[11px]">
              {T.footer.certs.map((c) => <li key={c}>• {c}</li>)}
            </ul>
          </div>

          <div>
            <h5 className="text-[#FAF9F6] text-xs font-bold uppercase tracking-[0.2em] mb-4">{T.footer.warranty_title}</h5>
            <p className="text-[11px] text-[#A0A0A0] leading-relaxed mb-3">{T.footer.warranty_text}</p>
            <span className="text-[10px] bg-neutral-900 border border-white/10 text-stone-300 font-semibold px-2 py-1 uppercase tracking-[0.15em]">
              {T.footer.warranty_badge}
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-stone-500">
          <div>Karat Mebli © {new Date().getFullYear()} ⎯ {lang === 'ua' ? 'Харківська меблева фабрика. Всі права захищено.' : 'Kharkiv Furniture Factory. All rights reserved.'}</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-300 transition-colors">{T.footer.privacy}</a>
            <a href="#" className="hover:text-stone-300 transition-colors">{T.footer.offer}</a>
            <a href="#" className="hover:text-stone-300 transition-colors">{T.footer.eco}</a>
          </div>
        </div>
      </footer>


      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a
          href="https://wa.me/380000000000"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-[#25D366] hover:scale-110 active:scale-95 text-white flex items-center justify-center shadow-lg transition-all rounded-full"
          title={T.social.whatsapp}
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        <a
          href="https://t.me/placeholder"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-[#0088cc] hover:scale-110 active:scale-95 text-white flex items-center justify-center shadow-lg transition-all rounded-full"
          title={T.social.telegram}
        >
          <Send className="w-5 h-5" />
        </a>
        <a
          href="viber://chat?number=380000000000"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-[#7344af] hover:scale-110 active:scale-95 text-white flex items-center justify-center shadow-lg transition-all rounded-full"
          title={T.social.viber}
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
