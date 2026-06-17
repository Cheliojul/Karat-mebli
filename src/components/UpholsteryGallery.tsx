import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Flame, Compass, RefreshCw, Award, Trees } from 'lucide-react';
import { useLang } from '../i18n';

interface UpholsteryGalleryProps {
  onSelectMaterial?: (materialName: string) => void;
}

const FABRICS = [
  {
    id: 'slate-velvet',
    name: 'Королівський Вельвет (Slate)',
    sub: 'Преміальний бавовняний бархат',
    rubs: '120,000 циклів (Зносостійкість для HoReCa)',
    composition: '85% Натуральний бавовняний ворс, 15% Зміцнена армована нитка',
    weight: '520 г/м²',
    features: 'Гіпоалергенний, водовідштовхуюче просочення, стійкий до кігтів тварин',
    color: '#4B5563',
    desc: "Неймовірно м'який, глибокий матовий велюр з високим ворсом. Вибір номер один для залів ресторанів та преміальних апартаментів.",
  },
  {
    id: 'emerald-boucle',
    name: 'Карпатське Букле (Emerald)',
    sub: 'Текстурована вовняна нитка',
    rubs: '80,000 циклів (Посилений побутовий / комерційний)',
    composition: '60% Вовна карпатських овець, 30% Акрил, 10% Льон',
    weight: '680 г/м²',
    features: 'Чудова теплоізоляція, вогнестійкість EN 1021-1 (цигарковий тест)',
    color: '#14532D',
    desc: 'Рельєфне, затишне вовняне букле з винятковою тактильністю. Створює відчуття природного затишку та екологічності.',
  },
  {
    id: 'saddle-leather',
    name: 'Натуральна Шкіра (Saddle Brown)',
    sub: 'Шкіра хромового дублення воскової обробки',
    rubs: 'Висока міцність на розрив (Понад 350N)',
    composition: '100% Цільнозернова ялова шкіра українського походження',
    weight: 'Товщина 1.4 - 1.6 мм',
    features: 'Природна патина, дихаючий шар, захисне воскове фінішне покриття',
    color: '#7C2D12',
    desc: 'Преміальна натуральна шкіра, яка з роками стає лише затишнішою, набуваючи шляхетної патини. Призначена для кабінетів керівників та лаунж-зон.',
  },
  {
    id: 'terracotta-corduroy',
    name: 'Мануфактурний Вельвет (Terracotta)',
    sub: 'Фактурний бавовняний корд у широкий рубчик',
    rubs: '95,000 циклів (Важкий режим експлуатації)',
    composition: '100% Довговолокниста гребінна бавовна',
    weight: '440 г/м²',
    features: 'Дихаюча структура, стійкість кольору до УФ-випромінювання (Grade 5)',
    color: '#9A3412',
    desc: 'Класичний вельвет у великий виразний рубчик. Створює чудову графічність та ретро-акценти у лобі готелів та творчих просторах.',
  },
  {
    id: 'french-linen',
    name: 'Лляна Рогожка (Oatmeal)',
    sub: 'Автентична груба лляна пряжа',
    rubs: '50,000 циклів (Середній комерційний клас)',
    composition: '70% Натуральне лляне волокно, 30% Поліестер для пружності',
    weight: '390 г/м²',
    features: 'Максимальна екологічність, антистатичний ефект, легке очищення',
    color: '#E5E7EB',
    desc: 'Прохолодний, дихаючий грубий льон з красивим шаховим переплетенням ниток. Ідеальне рішення для літніх терас та скандинавських мінімалістичних офісів.',
  },
];

const WOODS = [
  {
    id: 'charred-oak',
    name: 'Обпалений Дуб (Yakusugi Oak)',
    sub: "Карпатський білий дуб глибокого випалу",
    density: '720 кг/м³ (Екстремальна твердість)',
    treatment: "Випалювання відкритим полум'ям, ручне брашування металевими щітками, захисний віск",
    origin: 'Екологічні лісництва Львівщини',
    color: '#1C1917',
    desc: 'Культова японська технологія термічної обробки Shou Sugi Ban. Деревина набуває унікальної текстури з вираженим рельєфом річних кілець та захистом від будь-якої вологи.',
  },
  {
    id: 'classic-walnut',
    name: 'Королівський Горіх (Walnut)',
    sub: 'Природна тепла шляхетна деревина',
    density: '640 кг/м³',
    treatment: 'Шліфування дрібним абразивом, покриття натуральною лляною олією у три шари',
    origin: 'Подільські лісові масиви',
    color: '#44403C',
    desc: 'Класичний горіх з неперевершеним природним малюнком волокон. Випромінює тепло, затишок та високий статус. Поверхня ідеально гладка та тепла.',
  },
  {
    id: 'natural-ash',
    name: 'Світлий Ясен (Golden Ash)',
    sub: 'Твердий масив ясена з великою текстурою',
    density: '690 кг/м³',
    treatment: 'Матовий екологічний лак на водній основі, збереження оригінального відтінку',
    origin: 'Лісові господарства Харківщини',
    color: '#E7E5E4',
    desc: 'Ясен славиться своєю гнучкістю, стійкістю до тріщин та виразною жовтувато-золотою текстурою. Чудово пасує до яскравих сучасних офісів.',
  },
];

export default function UpholsteryGallery({ onSelectMaterial }: UpholsteryGalleryProps) {
  const { T } = useLang();
  const tg = T.gallery;

  const [activeTab, setActiveTab] = useState<'fabrics' | 'woods'>('fabrics');
  const [selectedItem, setSelectedItem] = useState<string>('slate-velvet');

  const selectedFabric = FABRICS.find((f) => f.id === selectedItem);
  const selectedWood = WOODS.find((w) => w.id === selectedItem);

  const handleTabChange = (tab: 'fabrics' | 'woods') => {
    setActiveTab(tab);
    setSelectedItem(tab === 'fabrics' ? 'slate-velvet' : 'charred-oak');
  };

  return (
    <section id="gallery-section" className="py-24 px-6 md:px-12 bg-[#FAF9F6] text-[#1A1A1A] border-t border-[#1A1A1A]/10 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#8C7B6C]">{tg.badge}</span>
              <h3 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mt-2 tracking-tight">{tg.title}</h3>
              <p className="text-stone-600 mt-3 max-w-xl text-sm leading-relaxed">{tg.subtitle}</p>
            </div>
            <div className="flex bg-[#1A1A1A]/5 p-1 border border-[#1A1A1A]/10 self-start md:self-auto">
              {(['fabrics', 'woods'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-5 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-stone-600 hover:text-[#1A1A1A]'
                  }`}
                >
                  {tab === 'fabrics' ? tg.tab_fabrics : tg.tab_woods}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono text-[#8C7B6C] uppercase tracking-[0.2em] block mb-2">{tg.select_label}</span>
            <div className="space-y-3">
              {activeTab === 'fabrics'
                ? FABRICS.map((fabric) => (
                    <div
                      key={fabric.id}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setSelectedItem(fabric.id)}
                      onClick={() => setSelectedItem(fabric.id)}
                      className={`w-full text-left p-4 border transition-all flex items-center justify-between cursor-pointer ${
                        selectedItem === fabric.id ? 'bg-white border-[#1A1A1A] shadow-md' : 'bg-transparent border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="w-8 h-8 rounded-full border border-stone-300 flex-shrink-0" style={{ backgroundColor: fabric.color }} />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">{fabric.name}</span>
                          <span className="text-[10px] text-stone-500 font-mono mt-0.5">{fabric.sub}</span>
                        </div>
                      </div>
                      {onSelectMaterial && (
                        <button
                          onClick={(e) => { e.stopPropagation(); onSelectMaterial(fabric.name); }}
                          className="text-[9px] font-mono uppercase px-2 py-1 border border-stone-300 hover:bg-[#1A1A1A] hover:text-white transition-colors"
                        >
                          {tg.ask_price}
                        </button>
                      )}
                    </div>
                  ))
                : WOODS.map((wood) => (
                    <button
                      key={wood.id}
                      onClick={() => setSelectedItem(wood.id)}
                      className={`w-full text-left p-4 border transition-all flex items-center justify-between cursor-pointer ${
                        selectedItem === wood.id ? 'bg-white border-[#1A1A1A] shadow-md' : 'bg-transparent border-stone-200 hover:border-[#1A1A1A]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="w-8 h-8 border border-stone-300 flex-shrink-0" style={{ backgroundColor: wood.color }} />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">{wood.name}</span>
                          <span className="text-[10px] text-stone-500 font-mono mt-0.5">{wood.sub}</span>
                        </div>
                      </div>
                    </button>
                  ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-stone-200 p-8 shadow-xl">
            <AnimatePresence mode="wait">
              {activeTab === 'fabrics' && selectedFabric ? (
                <motion.div
                  key={selectedFabric.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex items-start justify-between border-b border-stone-100 pb-4">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider bg-[#8C7B6C]/10 text-[#8C7B6C] px-2.5 py-1">{tg.textile_std}</span>
                      <h4 className="text-xl font-serif text-[#1A1A1A] mt-2">{selectedFabric.name}</h4>
                      <p className="text-xs text-stone-500 mt-0.5">{selectedFabric.sub}</p>
                    </div>
                    <div className="w-12 h-12 border border-stone-200" style={{ backgroundColor: selectedFabric.color }} />
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed italic">"{selectedFabric.desc}"</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {[
                      { icon: <RefreshCw className="w-3.5 h-3.5" />, label: tg.rubs_label, value: selectedFabric.rubs },
                      { icon: <Compass className="w-3.5 h-3.5" />, label: tg.comp_label, value: selectedFabric.composition },
                      { icon: <Award className="w-3.5 h-3.5" />, label: tg.weight_label, value: selectedFabric.weight },
                      { icon: <Flame className="w-3.5 h-3.5" />, label: tg.feat_label, value: selectedFabric.features },
                    ].map(({ icon, label, value }) => (
                      <div key={label} className="p-4 bg-stone-50 border border-stone-100">
                        <div className="flex items-center gap-1.5 text-[#8C7B6C] mb-1">
                          {icon}
                          <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">{label}</span>
                        </div>
                        <span className="text-xs text-[#1A1A1A] font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-stone-100 pt-5 flex justify-between items-center text-[10px] font-mono text-stone-400">
                    <span>{tg.cert}</span>
                    <span className="text-[#8C7B6C] font-semibold">{tg.high_load}</span>
                  </div>
                </motion.div>
              ) : activeTab === 'woods' && selectedWood ? (
                <motion.div
                  key={selectedWood.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex items-start justify-between border-b border-stone-100 pb-4">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider bg-stone-100 text-stone-600 px-2.5 py-1">{tg.wood_std}</span>
                      <h4 className="text-xl font-serif text-[#1A1A1A] mt-2">{selectedWood.name}</h4>
                      <p className="text-xs text-stone-500 mt-0.5">{selectedWood.sub}</p>
                    </div>
                    <div className="w-12 h-12 border border-stone-200" style={{ backgroundColor: selectedWood.color }} />
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed italic">"{selectedWood.desc}"</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-stone-50 border border-stone-100">
                      <div className="flex items-center gap-1.5 text-[#8C7B6C] mb-1">
                        <Trees className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">{tg.origin_label}</span>
                      </div>
                      <span className="text-xs text-[#1A1A1A] font-semibold">{selectedWood.origin}</span>
                    </div>
                    <div className="p-4 bg-stone-50 border border-stone-100">
                      <div className="flex items-center gap-1.5 text-[#8C7B6C] mb-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">{tg.treat_label}</span>
                      </div>
                      <span className="text-xs text-[#1A1A1A] font-semibold leading-normal">{selectedWood.treatment}</span>
                    </div>
                    <div className="p-4 bg-stone-50 border border-stone-100 md:col-span-2">
                      <div className="flex items-center gap-1.5 text-[#8C7B6C] mb-1">
                        <Award className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">{tg.dens_label}</span>
                      </div>
                      <span className="text-xs text-[#1A1A1A] font-semibold">{selectedWood.density}</span>
                    </div>
                  </div>
                  <div className="border-t border-stone-100 pt-5 flex justify-between items-center text-[10px] font-mono text-stone-400">
                    <span>{tg.forest_std}</span>
                    <span className="text-green-700 font-semibold uppercase">{tg.fsc}</span>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
