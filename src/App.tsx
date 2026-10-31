import React, { useState, useMemo } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Award,
  Layers,
  Wrench,
  Truck,
  CheckCircle2,
  FileText,
  Calculator,
  Compass,
  Download,
  Copy,
  Check,
  X,
  Building2,
  ExternalLink,
  ChevronDown,
  Info,
  Calendar,
  Sparkles
} from 'lucide-react';

// High-fidelity industrial images
const IMAGES = {
  hero: '/src/assets/images/hero_asphalt_paving_1793371103389.jpg',
  landscaping: '/src/assets/images/project_commercial_landscaping_1793371118905.jpg',
  dumpTruck: '/src/assets/images/machinery_dump_truck_1793371138604.jpg',
  // Model-specific fleet machinery
  paverVogele1900: '/assets/aistudio/10_d18422e4.jpg',
  rollerDm13: '/assets/aistudio/7_f8be7bc2.png',
  rollerHammHd90: '/src/assets/images/hamm_hd90.jpg',
  rollerHammHd75: '/assets/aistudio/9_f597a277.jpg',
  rollerDm03: '/assets/aistudio/3_a772184e.jpg',
  backhoeJcb3cx: '/src/assets/images/machinery_backhoe_loader_1793433808258.jpg',
  excavatorSany155: '/assets/aistudio/4_3bf49799.jpg',
  excavatorLovol225: '/assets/aistudio/2_5f533f7d.jpg',
  truckActrosTral: '/assets/aistudio/1_93341aa1.jpg',
};

// Services Data
interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  lead: string;
  description: string;
  pricePerUnit: string;
  specs: { label: string; value: string }[];
  features: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: 'asphalt-roads',
    number: '01',
    title: 'Асфальтирование дорог и автомагистралей',
    category: 'Дорожное строительство',
    lead: 'Строительство и реконструкция дорожных артерий любого класса надежности по ГОСТ Р 58406.2-2020.',
    description: 'Полный комплекс работ: устройство оснований, распределение битумной эмульсии, укладка крупнозернистого и мелкозернистого асфальтобетона, устройство верхнего защитного слоя из ЩМА с контролем поперечных и продольных уклонов нивелировочными системами.',
    pricePerUnit: 'от 550 руб/м²',
    specs: [
      { label: 'Толщина слоя', value: 'от 4 до 12 см' },
      { label: 'Типы смесей', value: 'ЩМА-16, ЩМА-20, Тип А марка 1' },
      { label: 'Суточная производительность', value: 'до 3 500 м² / смена' },
      { label: 'Гарантийный период', value: 'Официальная гарантия по договору' },
    ],
    features: [
      'Укладка асфальтоукладчиками с лазерной системой нивелирования',
      'Собственный контроль коэффициента уплотнения',
      'Прямые поставки сертифицированной асфальтобетонной смеси',
      'Возможность работы в ночные смены без остановки движения',
    ],
  },
  {
    id: 'pothole-repair',
    number: '02',
    title: 'Капитальный ремонт покрытия',
    category: 'Восстановление полотна',
    lead: 'Ликвидация выбоин, трещин, колейности и просадок дорожного полотна картами от 10 м².',
    description: 'Технология бесшовного ремонта: фрезерование дефектных участков дорожной фрезой, продувка сжатым воздухом, битумная обработка граней шва и послойное виброуплотнение горячим асфальтом.',
    pricePerUnit: 'от 780 руб/м²',
    specs: [
      { label: 'Минимальная карта', value: 'от 10 м²' },
      { label: 'Глубина фрезерования', value: 'от 40 до 100 мм' },
      { label: 'Обработка стыков', value: 'Битумно-полимерная лента/мастика' },
      { label: 'Срок реализации', value: 'от 24 часов с момента заявки' },
    ],
    features: [
      'Ровный бесшовный переход между старым и новым покрытием',
      'Герметизация стыков полимерно-битумной эмульсией по ГОСТ',
      'Минимальные перекрытия полос движения',
    ],
  },
  {
    id: 'landscaping',
    number: '03',
    title: 'Комплексное благоустройство территорий',
    category: 'Инфраструктура и среда',
    lead: 'Асфальтирование и мощение территорий ЖК, ТРЦ, складских логистических парков и дворов.',
    description: 'Инженерное обустройство прилегающих территорий: установка бортового камня, укладка тротуарной плитки, устройство ливневой канализации, монтаж эко-парковок, пандусов и финальная разметка термопластиком.',
    pricePerUnit: 'от 1 100 руб/м²',
    specs: [
      { label: 'Материалы бортов', value: 'Бетонный и гранитный бортовой камень' },
      { label: 'Покрытия тротуаров', value: 'Вибропрессованная плитка 60-80 мм' },
      { label: 'Водоотвод', value: 'Ливнеприемные лотки с чугунными решетками' },
      { label: 'Разметка', value: 'Холодный пластик со световозвращающими шариками' },
    ],
    features: [
      'Грамотная разуклонка для предотвращения луж и застоя воды',
      'Зонирование стоянок, пешеходных дорожек и зон погрузки',
      'Установка дорожных знаков, искусственных неровностей (ИДН)',
      'Сдача объекта технадзору и профильным службам без замечаний',
    ],
  },
  {
    id: 'earthworks',
    number: '04',
    title: 'Земляные работы и устройство оснований',
    category: 'Нулевой цикл',
    lead: 'Разработка грунта в отметку, корыто под дорогу и послойная песчано-щебеночная подушка.',
    description: 'Фундамент надежной дороги: механизированная выемка грунта экскаваторами, вывоз на полигон с талонами, укладка дорожного геотекстиля Дорнит, устройство слоев из речного песка и гранитного щебня с проливкой и расклинцовкой.',
    pricePerUnit: 'от 320 руб/м³',
    specs: [
      { label: 'Коэффициент уплотнения', value: 'Kупл ≥ 0.98' },
      { label: 'Геосинтетика', value: 'Дорнит, геосетка СД-30' },
      { label: 'Фракции щебня', value: 'Щебень гранитный фр. 20-40, 40-70' },
      { label: 'Инструментальный контроль', value: 'Динамический плотномер ZORN' },
    ],
    features: [
      'Официальная утилизация грунта на лицензированных полигонах',
      'Защита от морозного пучения и просадки основания',
      'Послойное уплотнение грунтовыми катками массой 14 тонн',
    ],
  },
];

// Machinery Catalog Data
// Machinery Catalog Data
interface MachineryItem {
  id: string;
  name: string;
  category: 'pavers' | 'rollers' | 'excavators' | 'transport';
  categoryLabel: string;
  image: string;
  ratePerHour?: string;
  priceLabel?: string;
  ratePerShift: string;
  status: string;
  specs: { label: string; value: string }[];
  highlight: string;
}

const MACHINERY: MachineryItem[] = [
  {
    id: 'vogele-1900-2',
    name: 'Асфальтоукладчик Vögele Super 1900-2',
    category: 'pavers',
    categoryLabel: 'Асфальтоукладчики',
    image: IMAGES.paverVogele1900,
    ratePerHour: '10 500 руб / час',
    ratePerShift: '84 000 руб / смена (8 ч)',
    status: 'В наличии в парке',
    specs: [
      { label: 'Ширина укладки', value: 'от 3 до 6 м' },
      { label: 'Эксплуатационная масса', value: '19.1 т' },
      { label: 'Год выпуска', value: '2010 г.' },
      { label: 'Производительность', value: 'до 900 т/час' },
    ],
    highlight: 'Высокоточная электронная система нивелирования ErgoPlus',
  },
  {
    id: 'dm-13-vd',
    name: 'Дорожный каток DM 13-VD',
    category: 'rollers',
    categoryLabel: 'Катки',
    image: IMAGES.rollerDm13,
    ratePerHour: '4 000 руб / час',
    ratePerShift: '32 000 руб / смена (8 ч)',
    status: 'В наличии в парке',
    specs: [
      { label: 'Эксплуатационная масса', value: '12.5 т' },
      { label: 'Год выпуска', value: '2014 г.' },
      { label: 'Ширина вальца', value: '1 700 мм' },
      { label: 'Тип привода', value: 'Гидростатический' },
    ],
    highlight: 'Тяжелый двухвальцовый вибрационный каток для щебня и асфальта',
  },
  {
    id: 'hamm-hd90k',
    name: 'Комбинированный каток Hamm HD 90K',
    category: 'rollers',
    categoryLabel: 'Катки',
    image: IMAGES.rollerHammHd90,
    ratePerHour: '3 750 руб / час',
    ratePerShift: '30 000 руб / смена (8 ч)',
    status: 'В наличии в парке',
    specs: [
      { label: 'Эксплуатационная масса', value: '8.8 т' },
      { label: 'Год выпуска', value: '2008 г.' },
      { label: 'Ширина вальца', value: '1 680 мм' },
      { label: 'Конструкция', value: 'Гладкий валец + пневмоколеса' },
    ],
    highlight: 'Комбинированное уплотнение: гладкое вальцевание и пневмоколеса',
  },
  {
    id: 'hamm-hd75',
    name: 'Дорожный каток Hamm HD 75',
    category: 'rollers',
    categoryLabel: 'Катки',
    image: IMAGES.rollerHammHd75,
    ratePerHour: '3 750 руб / час',
    ratePerShift: '30 000 руб / смена (8 ч)',
    status: 'В наличии в парке',
    specs: [
      { label: 'Эксплуатационная масса', value: '7.2 т' },
      { label: 'Год выпуска', value: '2014 г.' },
      { label: 'Ширина вальца', value: '1 500 мм' },
      { label: 'Тип вальцов', value: 'Два гладких вибровальца' },
    ],
    highlight: 'Чистовое финишное уплотнение слоев асфальтобетона',
  },
  {
    id: 'dm-03',
    name: 'Малый дорожный каток DM 03 (ДМ03)',
    category: 'rollers',
    categoryLabel: 'Катки',
    image: IMAGES.rollerDm03,
    ratePerHour: '2 500 руб / час',
    ratePerShift: '20 000 руб / смена (8 ч)',
    status: 'В наличии в парке',
    specs: [
      { label: 'Эксплуатационная масса', value: '2.65 т' },
      { label: 'Год выпуска', value: '2014 г.' },
      { label: 'Ширина вальца', value: '1 200 мм' },
      { label: 'Тип вальцов', value: 'Два гладких вибровальца' },
    ],
    highlight: 'Компактная работа на тротуарах, парковках и примыканиях',
  },
  {
    id: 'jcb-3cx',
    name: 'Экскаватор-погрузчик JCB 3CX (3CXS14M2NM)',
    category: 'excavators',
    categoryLabel: 'Экскаваторы',
    image: IMAGES.backhoeJcb3cx,
    ratePerHour: '3 500 руб / час',
    ratePerShift: '28 000 руб / смена (8 ч)',
    status: 'В наличии в парке',
    specs: [
      { label: 'Эксплуатационная масса', value: '12.8 т · 2020 г.' },
      { label: 'Ковши в комплекте', value: 'Землеройный 60 см, узкий 30 см, планировочный 1.2 м' },
      { label: 'Доп. оборудование', value: 'Гидромолот 981 Дж' },
      { label: 'С гидромолотом', value: '4 375 руб/ч (35 000 руб/смена)' },
    ],
    highlight: 'Землеройный ковш 60 см, узкий 30 см, планировочный 1.2 м, гидромолот',
  },
  {
    id: 'sany-sy155w',
    name: 'Колесный экскаватор SANY SY155W',
    category: 'excavators',
    categoryLabel: 'Экскаваторы',
    image: IMAGES.excavatorSany155,
    ratePerHour: '3 125 руб / час',
    ratePerShift: '25 000 руб / смена (8 ч)',
    status: 'В наличии в парке',
    specs: [
      { label: 'Эксплуатационная масса', value: '14.0 т' },
      { label: 'Объем ковша', value: '0.8 м³' },
      { label: 'Год выпуска', value: '2022 г.' },
      { label: 'Оснащение', value: 'Аутригеры + бульдозерный отвал' },
    ],
    highlight: 'Мобильный колесный экскаватор с объемом ковша 0.8 м³',
  },
  {
    id: 'lovol-fr225',
    name: 'Гусеничный экскаватор LOVOL FR225 E2',
    category: 'excavators',
    categoryLabel: 'Экскаваторы',
    image: IMAGES.excavatorLovol225,
    ratePerHour: '3 000 руб / час',
    ratePerShift: '24 000 руб / смена (8 ч)',
    status: 'В наличии в парке',
    specs: [
      { label: 'Эксплуатационная масса', value: '23.0 т' },
      { label: 'Объем ковша', value: '1.1 м³' },
      { label: 'Год выпуска', value: '2023 г.' },
      { label: 'Глубина копания', value: 'до 6 700 мм' },
    ],
    highlight: 'Выемка тяжелого грунта, разработка корыта, ковш 1.1 м³',
  },
  {
    id: 'tral-9-15',
    name: 'Тягач Mercedes-Benz Actros с низкорамным тралом (9–15 м)',
    category: 'transport',
    categoryLabel: 'Тралы',
    image: IMAGES.truckActrosTral,
    priceLabel: 'Стоимость перевозки:',
    ratePerShift: 'от 20 000 руб / рейс',
    status: 'В наличии в парке',
    specs: [
      { label: 'Тягач', value: 'Mercedes-Benz Actros Heavy Duty' },
      { label: 'Длина платформы', value: 'от 9 до 15 метров' },
      { label: 'Грузоподъемность', value: 'до 45 тонн' },
      { label: 'По городу (габарит)', value: '20 000 руб' },
      { label: 'По городу (негабарит)', value: '35 000 руб (укладчик)' },
    ],
    highlight: 'Седельный тягач Mercedes-Benz Actros с низкорамным тралом-тяжеловозом для перевозки спецтехники',
  },
];

// Project Cases Data
interface ProjectCase {
  id: string;
  name: string;
  location: string;
  category: string;
  duration: string;
  scope: string;
  details: string[];
  metrics: { value: string; label: string }[];
}

const PROJECTS: ProjectCase[] = [
  {
    id: 'project-1',
    name: 'Логистический комплекс «Северный терминал»',
    location: 'Московская обл., Солнечногорский р-н',
    category: 'Промышленное асфальтирование',
    duration: '18 рабочих дней',
    scope: 'Устройство подъездных путей, маневровых площадок для еврофур и паркинга легкового транспорта под нагрузки 11.5 т/ось.',
    details: [
      'Выемка непригодного грунта и подготовка корыта: 34 000 м³',
      'Укладка геотекстиля Дорнит 350 г/м² с перекрытием полотен',
      'Основание из гранитного щебня фр. 40-70 (20 см) и 20-40 (10 см)',
      'Два слоя асфальтобетона (крупнозернистый 8 см + ЩМА-20 5 см)',
      'Установка 3 800 п.м. магистрального бордюра БР 100.30.18',
    ],
    metrics: [
      { value: '28 500 м²', label: 'Площадь асфальтирования' },
      { value: '11.5 т/ось', label: 'Расчетная осевая нагрузка' },
      { value: '5 лет', label: 'Гарантия по контракту' },
    ],
  },
  {
    id: 'project-2',
    name: 'Реконструкция транспортной развязки',
    location: 'г. Москва, Юго-Восточный сектор',
    category: 'Городские магистрали',
    duration: '22 календарных дня',
    scope: 'Капитальный ремонт дорожного полотна методом сплошного фрезерования с заменой верхнего слоя на износостойкий ЩМА-20.',
    details: [
      'Фрезерование старого асфальта фрезами Wirtgen W200i на глубину 6 см',
      'Заливка трещин и швов битумно-полимерной мастикой Брит',
      'Укладка асфальтоукладчиками Vögele синхронно на ширину 11.5 метров',
      'Ночной график работ с 23:00 до 06:00 без дневных заторов',
    ],
    metrics: [
      { value: '42 000 м²', label: 'Объем фрезерования и укладки' },
      { value: '0 замечаний', label: 'Технадзор заказчика принял без штрафов' },
      { value: 'Kупл 0.99', label: 'Коэффициент уплотнения вырубок' },
    ],
  },
  {
    id: 'project-3',
    name: 'Жилой квартал «Парковые резиденции»',
    location: 'г. Москва, Северо-Западный округ',
    category: 'Благоустройство ЖК',
    duration: '30 рабочих дней',
    scope: 'Комплексное благоустройство придомовых проездов, гостевых парковок, пешеходных бульваров и площадок отдыха.',
    details: [
      'Укладка мелкозернистого плотного асфальта типа Б марки 1: 14 200 м²',
      'Мощение гранитной и вибропрессованной тротуарной брусчаткой: 5 600 м²',
      'Устройство системы поверхностного водоотвода с щелевыми лотками',
      'Нанесение разметки парковочных мест долговечным холодным пластиком',
    ],
    metrics: [
      { value: '19 800 м²', label: 'Общая площадь благоустройства' },
      { value: '2 400 п.м.', label: 'Установлено бортовых камней' },
      { value: '100%', label: 'Сдано технадзору' },
    ],
  },
];

export default function App() {
  // Mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Machinery filter state
  const [activeMachineryTab, setActiveMachineryTab] = useState<'all' | 'pavers' | 'rollers' | 'excavators' | 'transport'>('all');

  // Selected machinery modal
  const [selectedMachineForRental, setSelectedMachineForRental] = useState<MachineryItem | null>(null);
  const [rentalPhone, setRentalPhone] = useState('');
  const [rentalComment, setRentalComment] = useState('');
  const [rentalSuccess, setRentalSuccess] = useState(false);

  // Quick Quote modal
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteDesc, setQuoteDesc] = useState('');
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  // Export HTML modal state
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Filtered Machinery
  const filteredMachinery = useMemo(() => {
    if (activeMachineryTab === 'all') return MACHINERY;
    return MACHINERY.filter(m => m.category === activeMachineryTab);
  }, [activeMachineryTab]);

  const handleRentalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rentalPhone || rentalPhone.length < 7) return;
    setRentalSuccess(true);
    setTimeout(() => {
      setRentalSuccess(false);
      setSelectedMachineForRental(null);
      setRentalPhone('');
      setRentalComment('');
    }, 2000);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quotePhone || quotePhone.length < 7) return;
    setQuoteSuccess(true);
    setTimeout(() => {
      setQuoteSuccess(false);
      setQuoteModalOpen(false);
      setQuoteName('');
      setQuotePhone('');
      setQuoteDesc('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#111316] text-neutral-100 flex flex-col font-['Manrope',sans-serif]">
      {/* ----------------- TOP BAR (Brand Header) ----------------- */}
      <header className="sticky top-0 z-40 bg-[#111316]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Brand Wordmark: НПП Р-Индустрия */}
          <a
            href="#"
            className="text-lg sm:text-xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded bg-[#FACC15] text-neutral-950 flex items-center justify-center font-black text-sm shadow-sm">
              Р
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold tracking-wider text-base sm:text-lg">
                НПП <span className="text-[#FACC15]">Р-ИНДУСТРИЯ</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-normal tracking-tight mt-0.5">
                Дорожно-строительная компания
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
            <a href="#services" className="hover:text-[#FACC15] transition-colors whitespace-nowrap shrink-0">
              Услуги
            </a>
            <a href="#machinery" className="hover:text-[#FACC15] transition-colors whitespace-nowrap shrink-0">
              Парк техники
            </a>
            <a href="#portfolio" className="hover:text-[#FACC15] transition-colors whitespace-nowrap shrink-0">
              Объекты
            </a>
            <a href="#contacts" className="hover:text-[#FACC15] transition-colors whitespace-nowrap shrink-0">
              Контакты
            </a>
          </nav>

          {/* Primary Action + Dispatcher Contacts */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden lg:flex flex-col items-end text-right leading-tight">
              <a
                href="tel:+79006504411"
                className="group flex flex-col items-end"
              >
                <span className="text-[11px] text-neutral-400 font-medium">Диспетчер / Бухгалтерия:</span>
                <span className="text-sm font-bold text-white group-hover:text-[#FACC15] transition-colors font-mono">
                  +7 900 650-44-11
                </span>
              </a>
              <a
                href="mailto:npp.r-industry@yandex.ru"
                className="text-[11px] text-neutral-300 hover:text-[#FACC15] transition-colors font-mono mt-0.5 flex items-center gap-1"
              >
                <Mail className="w-3 h-3 text-[#FACC15]" />
                <span>npp.r-industry@yandex.ru</span>
              </a>
            </div>

            <button
              onClick={() => setQuoteModalOpen(true)}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-neutral-950 bg-[#FACC15] hover:bg-[#eab308] active:scale-98 rounded transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              Заказать расчет
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-white/10 mt-3 flex flex-col gap-3 text-sm">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-neutral-200 hover:text-[#FACC15]"
            >
              Услуги
            </a>
            <a
              href="#machinery"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-neutral-200 hover:text-[#FACC15]"
            >
              Парк спецтехники
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-neutral-200 hover:text-[#FACC15]"
            >
              Объекты и кейсы
            </a>
            <a
              href="#contacts"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-neutral-200 hover:text-[#FACC15]"
            >
              Контакты
            </a>
            <div className="pt-2 border-t border-white/10 text-xs text-neutral-400">
              Диспетчер / Бухгалтерия:{' '}
              <a href="tel:+79006504411" className="text-white font-bold block mt-1 font-mono text-sm">
                +7 900 650-44-11
              </a>
              <a href="mailto:npp.r-industry@yandex.ru" className="text-neutral-300 hover:text-[#FACC15] block mt-1 font-mono text-xs">
                npp.r-industry@yandex.ru
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative overflow-hidden border-b border-white/10">
        {/* Background Image with Dark Industrial Gradients */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.hero}
            alt="Асфальтирование дорог НПП Р-Индустрия"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f11] via-[#0d0f11]/85 to-[#0d0f11]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111316] via-transparent to-[#0d0f11]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-16 lg:pb-24">
          <div className="max-w-3xl">
            {/* Editorial Kicker */}
            <div className="text-xs uppercase tracking-wider font-semibold text-[#FACC15] mb-4 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#FACC15] inline-block"></span>
              <span>Дорожное строительство и аренда спецтехники</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6 [text-wrap:balance]">
              Асфальтирование дорог и комплексное благоустройство территорий
            </h1>

            {/* Concrete Value Proposition */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8 max-w-2xl">
              Собственный парк техники, большой опыт в строительстве дорог
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <button
                onClick={() => {
                  const el = document.getElementById('lead-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-[#FACC15] hover:bg-[#eab308] text-neutral-950 font-bold text-sm rounded flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[#FACC15]/20 cursor-pointer"
              >
                <span>Заказать расчет сметы</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#machinery"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm rounded flex items-center justify-center gap-2 transition-all"
              >
                <Truck className="w-4 h-4 text-[#FACC15]" />
                <span>Смотреть парк техники</span>
              </a>
            </div>

            {/* Trust highlights inline */}
            <div className="flex items-center gap-6 text-xs text-neutral-400 flex-wrap">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FACC15]" />
                <span>Выезд инженера и замер — бесплатно</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FACC15]" />
                <span>Фиксированная смета без скрытых доплат</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-KPI Row Strip */}
        <div className="relative z-10 bg-[#0d0f11]/90 border-t border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              <div className="pt-2 lg:pt-0 lg:px-4 first:pl-0">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  16 лет
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  Опыт на объектах инфраструктуры региона
                </div>
              </div>

              <div className="pt-2 lg:pt-0 lg:px-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#FACC15] font-mono tabular-nums">
                  1 450 000+ м²
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  Асфальтобетонного полотна уложено по ГОСТ
                </div>
              </div>

              <div className="pt-2 lg:pt-0 lg:px-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-mono tabular-nums">
                  9 ед. техники
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  Собственной спецтехники в парке
                </div>
              </div>

              <div className="pt-2 lg:pt-0 lg:px-4 flex flex-col justify-center">
                <div className="text-base sm:text-lg font-bold text-white leading-snug">
                  Официальная гарантия на покрытия по договору
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 1: SERVICES (Услуги) ----------------- */}
      <section id="services" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-14 max-w-2xl">
          <div className="text-xs uppercase tracking-wider font-semibold text-[#FACC15] mb-2">
            01. Направления деятельности
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-4 [text-wrap:balance]">
            Профессиональные дорожно-строительные услуги
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Выполняем полный спектр дорожных работ от нулевого цикла до нанесения дорожной разметки. Работаем с частными заказчиками, генподрядчиками и муниципальными структурами.
          </p>
        </div>

        {/* Minimalist Grid of Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group relative bg-[#171a1e] border border-white/10 hover:border-[#FACC15]/60 rounded-lg p-6 sm:p-8 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-black/40"
            >
              <div>
                {/* Header row with category */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
                  <span className="text-xs font-mono font-bold text-[#FACC15] tracking-wider">
                    {service.number}. {service.category}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#FACC15] transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('contacts');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-[#FACC15] hover:bg-[#eab308] text-neutral-950 font-bold text-xs rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Заказать расчет</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------- SECTION 2: MACHINERY FLEET (Парк техники / Аренда) ----------------- */}
      <section id="machinery" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#FACC15] mb-2">
              02. Собственный автопарк
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              Аренда современной строительной спецтехники
            </h2>
            <p className="text-sm text-neutral-400">
              Вся техника находится в собственности компании НПП Р-Индустрия, заправлена и подается на объект с опытными машинистами высшей квалификации.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#181b20] rounded-lg border border-white/10 flex-wrap">
            {[
              { id: 'all', label: 'Вся техника (9 ед.)' },
              { id: 'pavers', label: 'Асфальтоукладчики' },
              { id: 'rollers', label: 'Катки' },
              { id: 'excavators', label: 'Экскаваторы' },
              { id: 'transport', label: 'Тралы' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMachineryTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                  activeMachineryTab === tab.id
                    ? 'bg-[#FACC15] text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Machinery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMachinery.map((item) => (
            <div
              key={item.id}
              className="bg-[#171a1e] border border-white/10 hover:border-neutral-500 rounded-lg overflow-hidden flex flex-col justify-between transition-all group"
            >
              <div>
                {/* Image Frame with Aspect Ratio 4:3 */}
                <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#111316]/90 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-mono text-neutral-200 border border-white/10">
                    {item.categoryLabel}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded text-[11px] font-medium">
                    {item.status}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    {item.name}
                  </h3>

                  <div className="text-xs text-[#FACC15] font-medium mb-4 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{item.highlight}</span>
                  </div>

                  {/* Specs Table */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-[#0f1113] rounded border border-white/5 text-[11px] mb-4">
                    {item.specs.map((s, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-neutral-500">{s.label}</span>
                        <span className="font-semibold text-neutral-200 font-mono tabular-nums">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price and Action */}
              <div className="p-5 pt-0">
                <div className="flex items-center justify-between pt-3 border-t border-white/10 gap-3">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase font-semibold text-neutral-400">
                      {item.ratePerHour ? 'Стоимость в час:' : (item.priceLabel || 'Стоимость перевозки:')}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#FACC15] font-mono tabular-nums leading-tight truncate">
                      {item.ratePerHour || item.ratePerShift}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono mt-0.5 truncate">
                      {item.ratePerHour ? item.ratePerShift : 'город: 20 000 руб (габарит) / 35 000 руб'}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedMachineForRental(item)}
                    className="px-3.5 py-2 bg-[#FACC15] hover:bg-[#eab308] text-neutral-950 font-bold text-xs rounded transition-colors cursor-pointer shrink-0"
                  >
                    Арендовать
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Machinery Rental Conditions Strip */}
        <div className="mt-10 p-6 bg-[#16181c] border-2 border-red-600 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-300 shadow-lg shadow-red-950/30">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded bg-[#FACC15]/10 text-[#FACC15] flex items-center justify-center shrink-0 mt-0.5">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white mb-1">Условия аренды спецтехники (100% аванс):</div>
              <div className="text-neutral-400 leading-relaxed">
                Вся техника находится в собственности компании. Цены в час и за смену (8 часов) указаны с НДС. Доставка негабаритной техники (асфальтоукладчик) — 35 000 руб., габаритной техники — 20 000 руб. в пределах города. Доставка по Ленинградской области рассчитывается отдельно.
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('contacts');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded whitespace-nowrap cursor-pointer transition-colors"
          >
            Запросить коммерческое предложение
          </button>
        </div>
      </section>

      {/* ----------------- SECTION 3: CASES & EXPERIENCE (Опыт / Портфолио) ----------------- */}
      <section id="portfolio" className="py-20 bg-[#16181c] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#FACC15] mb-2">
              03. Опыт и завершенные объекты
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Портфолио выполненных дорожных объектов
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              За последние 16 лет компания НПП Р-Индустрия успешно ввела в эксплуатацию более 450 объектов дорожной, промышленной и складской инфраструктуры.
            </p>
          </div>

          {/* Marquee Showcase Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
            {/* Visual Showcase Card with Video */}
            <div className="lg:col-span-7 relative rounded-lg overflow-hidden border border-white/10 bg-black min-h-[360px] flex items-center justify-center shadow-2xl">
              <video
                src="/assets/aistudio/19172339223051_ff715d38.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover min-h-[360px] max-h-[500px] rounded-lg"
              >
                Ваш браузер не поддерживает воспроизведение видео.
              </video>
            </div>

            {/* List of Case Studies */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              {PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#1a1d22] border border-white/10 hover:border-[#FACC15]/40 rounded-lg p-5 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span className="text-[#FACC15] font-semibold">{project.category}</span>
                    <span className="font-mono">{project.duration}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5">{project.name}</h4>
                  <p className="text-xs text-neutral-300 mb-3">{project.scope}</p>

                  <div className="flex items-center gap-4 text-xs font-mono text-neutral-300 pt-3 border-t border-white/5">
                    {project.metrics.map((m, idx) => (
                      <div key={idx}>
                        <span className="font-bold text-white">{m.value}</span>{' '}
                        <span className="text-neutral-500 text-[11px]">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quality Assurance & Certificates Banner */}
          <div className="bg-[#0f1113] border border-white/10 rounded-lg p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-[#FACC15] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Собственная лаборатория контроля
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Контрольный отбор кернов на каждом объекте. Проверка на водонасыщение, плотность и сдвигоустойчивость по ГОСТ.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-[#FACC15] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Членство в СРО и допуски
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Официальный допуск к строительству, реконструкции и капитальному ремонту дорог с фондом возмещения вреда до 500 млн руб.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#FACC15] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Прямые поставки асфальтобетона
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Отсутствие посредников гарантирует строгое соблюдение температурного режима смеси при укладке (не ниже +120°C).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 4: DIRECT CONTACTS (Прямые контакты) ----------------- */}
      <section id="contacts" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div id="lead-form" className="max-w-3xl mb-10">
          <div className="text-xs uppercase tracking-wider font-semibold text-[#FACC15] mb-2">
            04. Связь и сотрудничество
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Прямые контакты НПП Р-Индустрия
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Свяжитесь напрямую с диспетчерской службой, главным механиком или бухгалтерией для заказа дорожных работ, аренды спецтехники или отправки проектно-сметной документации.
          </p>
        </div>

        {/* Full-Width Stretched Direct Contacts */}
        <div className="w-full bg-[#171a1e] border border-white/10 rounded-xl p-6 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-3 pb-6 border-b border-white/10 mb-8">
            <div className="w-10 h-10 rounded-lg bg-[#FACC15]/10 text-[#FACC15] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                ООО «НПП «Р-Индустрия»
              </h3>
              <p className="text-xs text-neutral-400">
                Официальные прямые контакты дорожно-строительной компании · ИНН 7842321463 · ОГРН 1057812480582
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Col 1: Dispatcher & Accounting */}
            <div className="bg-[#0f1113] border border-white/5 rounded-lg p-5 flex flex-col justify-between hover:border-[#FACC15]/40 transition-colors">
              <div>
                <div className="w-9 h-9 rounded bg-[#FACC15]/10 text-[#FACC15] flex items-center justify-center mb-3">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold mb-4">
                  Диспетчер и бухгалтерия
                </div>
              </div>
              <div>
                <a
                  href="tel:+79006504411"
                  className="text-lg font-bold text-white hover:text-[#FACC15] font-mono tracking-tight transition-colors block"
                >
                  +7 900 650-44-11
                </a>
                <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-800 text-neutral-300 border border-white/10">
                  Единый номер связи
                </span>
              </div>
            </div>

            {/* Col 2: Chief Mechanic */}
            <div className="bg-[#0f1113] border border-white/5 rounded-lg p-5 flex flex-col justify-between hover:border-[#FACC15]/40 transition-colors">
              <div>
                <div className="w-9 h-9 rounded bg-[#FACC15]/10 text-[#FACC15] flex items-center justify-center mb-3">
                  <Wrench className="w-4 h-4" />
                </div>
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                  Главный механик
                </div>
                <p className="text-xs text-neutral-400 mb-4">
                  Технические вопросы по парку спецтехники и эксплуатация
                </p>
              </div>
              <div>
                <a
                  href="tel:+79006504488"
                  className="text-lg font-bold text-white hover:text-[#FACC15] font-mono tracking-tight transition-colors block"
                >
                  +7 900 650-44-88
                </a>
                <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-800 text-neutral-300 border border-white/10">
                  Парк спецтехники
                </span>
              </div>
            </div>

            {/* Col 3: Email */}
            <div className="bg-[#0f1113] border border-white/5 rounded-lg p-5 flex flex-col justify-between hover:border-[#FACC15]/40 transition-colors">
              <div>
                <div className="w-9 h-9 rounded bg-[#FACC15]/10 text-[#FACC15] flex items-center justify-center mb-3">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                  Электронная почта
                </div>
                <p className="text-xs text-neutral-400 mb-4">
                  Для направления ТЗ, ведомостей объемов и договоров
                </p>
              </div>
              <div>
                <a
                  href="mailto:npp.r-industry@yandex.ru"
                  className="text-sm sm:text-base font-bold text-white hover:text-[#FACC15] font-mono transition-colors block break-all"
                >
                  npp.r-industry@yandex.ru
                </a>
                <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-800 text-neutral-300 border border-white/10">
                  Официальный e-mail
                </span>
              </div>
            </div>

            {/* Col 4: Addresses */}
            <div className="bg-[#0f1113] border border-white/5 rounded-lg p-5 flex flex-col justify-between hover:border-[#FACC15]/40 transition-colors">
              <div>
                <div className="w-9 h-9 rounded bg-[#FACC15]/10 text-[#FACC15] flex items-center justify-center mb-3">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                  Адреса в Санкт-Петербурге
                </div>
                <p className="text-xs text-neutral-400 mb-3">
                  Офис и производственная база
                </p>
              </div>
              <div className="space-y-3 text-xs pt-2 border-t border-white/5">
                <div>
                  <span className="text-[11px] text-neutral-400 block mb-0.5">Юридический адрес:</span>
                  <span className="font-semibold text-white leading-snug block">
                    ул. Коли Томчака, д. 28А, каб. 212
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-neutral-400 block mb-0.5">База спецтехники:</span>
                  <span className="font-semibold text-white leading-snug block">
                    Домостроительная ул., д. 12
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- FOOTER ----------------- */}
      <footer className="mt-auto bg-[#0a0c0e] border-t border-white/10 py-12 px-4 sm:px-8 text-neutral-400 text-xs">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
            {/* Col 1: Wordmark & Requisites */}
            <div className="space-y-3">
              <div className="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#FACC15] text-neutral-950 flex items-center justify-center font-black text-xs">
                  Р
                </div>
                <span>НПП Р-ИНДУСТРИЯ</span>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                Дорожно-строительная компания полного технологического цикла: асфальтирование по ГОСТ, комплексное благоустройство и аренда спецтехники.
              </p>
              <div className="font-mono text-[11px] text-neutral-500">
                ИНН 7842321463 · ОГРН 1057812480582
              </div>
            </div>

            {/* Col 2: Services Navigation */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Услуги компании</div>
              <ul className="space-y-2">
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Асфальтирование дорог и шоссе
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Ямочный ремонт полотна
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Благоустройство территорий
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Земляные работы и основания
                  </a>
                </li>
                <li>
                  <a href="#lead-form" className="hover:text-white transition-colors">
                    Онлайн-заявка на расчет
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Machinery Fleet */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Парк техники</div>
              <ul className="space-y-2">
                <li>
                  <a href="#machinery" className="hover:text-white transition-colors">
                    Асфальтоукладчики Vögele Super 1900-2
                  </a>
                </li>
                <li>
                  <a href="#machinery" className="hover:text-white transition-colors">
                    Катки Hamm (HD 90K, HD 75) и DM (13-VD, 03)
                  </a>
                </li>
                <li>
                  <a href="#machinery" className="hover:text-white transition-colors">
                    Экскаваторы LOVOL FR225 E2 и SANY SY155W
                  </a>
                </li>
                <li>
                  <a href="#machinery" className="hover:text-white transition-colors">
                    Экскаваторы-погрузчики JCB 3CX
                  </a>
                </li>
                <li>
                  <a href="#machinery" className="hover:text-white transition-colors">
                    Низкорамные тралы 9–15 м
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Quick Contact */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Контакты</div>
              <div className="space-y-2">
                <div>
                  <span className="text-neutral-500 block">Диспетчер / Бухгалтерия:</span>
                  <a href="tel:+79006504411" className="text-white font-mono font-bold hover:text-[#FACC15]">
                    +7 900 650-44-11
                  </a>
                </div>
                <div>
                  <span className="text-neutral-500 block">Главный механик:</span>
                  <a href="tel:+79006504488" className="text-white font-mono font-bold hover:text-[#FACC15]">
                    +7 900 650-44-88
                  </a>
                </div>
                <div>
                  <span className="text-neutral-500 block">Почта для ТЗ:</span>
                  <a href="mailto:npp.r-industry@yandex.ru" className="text-white font-mono hover:text-[#FACC15]">
                    npp.r-industry@yandex.ru
                  </a>
                </div>
                <div>
                  <span className="text-neutral-500 block">Юридический адрес:</span>
                  <span className="text-neutral-300">
                    г. Санкт-Петербург, ул. Коли Томчака, д. 28А, каб. 212
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
            <div>
              © 2026 ООО «НПП «Р-Индустрия». Все права защищены.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-neutral-300">
                Политика конфиденциальности
              </a>
              <button
                onClick={() => setExportModalOpen(true)}
                className="hover:text-[#FACC15] text-neutral-400 cursor-pointer"
              >
                Экспорт автономного HTML
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ----------------- MODAL: Machinery Rental Request ----------------- */}
      {selectedMachineForRental && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#171a1e] border border-white/15 rounded-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedMachineForRental(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono font-bold text-[#FACC15] mb-1">Заказ спецтехники</div>
            <h3 className="text-xl font-bold text-white mb-3">{selectedMachineForRental.name}</h3>

            <div className="aspect-[16/9] rounded overflow-hidden mb-4 bg-neutral-900">
              <img
                src={selectedMachineForRental.image}
                alt={selectedMachineForRental.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2 mb-4 text-xs">
              {selectedMachineForRental.ratePerHour ? (
                <>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-neutral-400">Стоимость в час:</span>
                    <span className="font-bold text-[#FACC15] font-mono text-sm">{selectedMachineForRental.ratePerHour}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-neutral-400">Стоимость за смену (8 ч с НДС):</span>
                    <span className="font-bold text-white font-mono">{selectedMachineForRental.ratePerShift}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-neutral-400">Стоимость перевозки:</span>
                  <span className="font-bold text-[#FACC15] font-mono text-sm">{selectedMachineForRental.ratePerShift}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">Условия оплаты:</span>
                <span className="text-neutral-200 font-medium">100% аванс (с НДС)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">Собственность техники:</span>
                <span className="text-emerald-400 font-semibold">В собственности Арендодателя</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">Доставка тралом по городу:</span>
                <span className="text-white font-mono">
                  {selectedMachineForRental.id === 'vogele-1900-2' ? '35 000 руб (негабарит)' : '20 000 руб (габарит)'}
                </span>
              </div>
            </div>

            {rentalSuccess ? (
              <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded text-center text-emerald-300 text-sm">
                Запрос на бронь успешно отправлен! Диспетчер свяжется с вами в течение 10 минут.
              </div>
            ) : (
              <form onSubmit={handleRentalSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Ваш номер телефона:</label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                    value={rentalPhone}
                    onChange={(e) => setRentalPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0f1113] border border-white/20 rounded text-sm text-white focus:outline-none focus:border-[#FACC15] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Количество смен / адрес объекта:</label>
                  <input
                    type="text"
                    placeholder="Например, 3 смены, объект на Варшавском шоссе"
                    value={rentalComment}
                    onChange={(e) => setRentalComment(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0f1113] border border-white/20 rounded text-sm text-white focus:outline-none focus:border-[#FACC15]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#FACC15] hover:bg-[#eab308] text-neutral-950 font-bold text-xs rounded transition-colors mt-2 cursor-pointer"
                >
                  Подтвердить бронь техники
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ----------------- MODAL: Quick Quote Request ----------------- */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#171a1e] border border-white/15 rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setQuoteModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono font-bold text-[#FACC15] mb-1">Экспресс-заявка</div>
            <h3 className="text-xl font-bold text-white mb-2">Заказать расчет сметы</h3>
            <p className="text-xs text-neutral-300 mb-4">
              Оставьте телефон, и инженер НПП Р-Индустрия рассчитает точную стоимость асфальтирования или аренды.
            </p>

            {quoteSuccess ? (
              <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded text-center text-emerald-300 text-sm">
                Спасибо! Ваш запрос передан ведущему инженеру. Звоним в течение 15 минут.
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Ваше имя:</label>
                  <input
                    type="text"
                    placeholder="Иван"
                    value={quoteName}
                    onChange={(e) => setQuoteName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0f1113] border border-white/20 rounded text-sm text-white focus:outline-none focus:border-[#FACC15]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Телефон для связи <span className="text-rose-400">*</span>:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                    value={quotePhone}
                    onChange={(e) => setQuotePhone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0f1113] border border-white/20 rounded text-sm text-white focus:outline-none focus:border-[#FACC15] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Что требуется сделать:</label>
                  <input
                    type="text"
                    placeholder="Асфальтирование стоянки 800 м²"
                    value={quoteDesc}
                    onChange={(e) => setQuoteDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0f1113] border border-white/20 rounded text-sm text-white focus:outline-none focus:border-[#FACC15]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#FACC15] hover:bg-[#eab308] text-neutral-950 font-bold text-xs rounded transition-colors mt-2 cursor-pointer"
                >
                  Отправить заявку
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ----------------- MODAL: Standalone HTML Code Export ----------------- */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#171a1e] border border-white/20 rounded-lg max-w-2xl w-full p-6 relative flex flex-col max-h-[85vh]">
            <button
              onClick={() => setExportModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono font-bold text-[#FACC15] mb-1">
              Автономный HTML-код сайта
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              НПП Р-Индустрия — Автономный файл
            </h3>
            <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
              Единый автономный файл HTML со встроенными стилями Tailwind CSS и интерактивным кодом, готовый для хостинга или прямого открытия.
            </p>

            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => {
                  fetch('/standalone.html')
                    .then((res) => res.text())
                    .then((text) => {
                      navigator.clipboard.writeText(text);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2500);
                    })
                    .catch(() => {
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2500);
                    });
                }}
                className="px-4 py-2 bg-[#FACC15] hover:bg-[#eab308] text-neutral-950 font-bold text-xs rounded flex items-center gap-2 cursor-pointer transition-colors"
              >
                {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Скопировано в буфер!' : 'Скопировать весь HTML-код'}</span>
              </button>

              <a
                href="/standalone.html"
                download="r-industria.html"
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs rounded flex items-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Скачать r-industria.html</span>
              </a>
            </div>

            <div className="flex-1 overflow-auto bg-[#0b0d0f] p-4 rounded border border-white/10 font-mono text-[11px] text-neutral-300">
              <pre className="whitespace-pre-wrap select-all">
{`<!DOCTYPE html>
<html lang="ru" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>НПП Р-Индустрия — Асфальтирование дорог, благоустройство и аренда спецтехники</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<!-- Полный автономный код сайта доступен в файле /standalone.html -->
</html>`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
