import React, { useState } from 'react';
import { BranchInfo } from '../types.ts';
import { BranchModal } from './BranchModal.tsx';

interface LandingPageProps {
  onOpenLoginModal: () => void;
  onShowToast: (message: string, icon?: string) => void;
}

const BRANCHES: BranchInfo[] = [
  {
    id: 'manada',
    name: 'Lobatos',
    title: 'Manada (Lobatos y Lobeznas)',
    age: '7 a 10 Años',
    motto: 'Siempre Mejor',
    description:
      'Desarrollo de carácter, empatía y convivencia a través del marco simbólico del Libro de las Tierras Vírgenes y el juego cooperativo dinámico.',
    longDescription:
      'En la Manada, los niños y niñas experimentan el crecimiento mediante la mitología de la selva descrita por Rudyard Kipling. Desarrollan la autoconfianza, el respeto a los mayores (Viejos Lobos: Akela, Baloo, Bagheera) y aprenden a compartir mediante juegos activos y pequeñas tareas grupales.',
    colorBorder: 'bg-amber-500',
    colorBg: 'bg-amber-600',
    colorText: 'text-amber-800',
    icon: 'pets',
  },
  {
    id: 'tropa',
    name: 'Exploradores',
    title: 'Tropa Scout Murray Dickson',
    age: '11 a 14 Años',
    motto: 'Siempre Listos',
    description:
      'El corazón del método scout: sistema de patrullas, cabuyería, campamentos rústicos, cocina de marcha, rastreo y liderazgo juvenil práctico.',
    longDescription:
      'La Tropa es el núcleo clásico del escultismo boliviano. Se estructura en Patrullas autónomas lideradas por un Guía Scout. Los miembros aprenden pionerismo, armado de refugios, nudos y amarres, cocina de campamento, rastreo, señales de socorro y primeros auxilios en entornos de montaña y campo abierto.',
    colorBorder: 'bg-[#2563eb]',
    colorBg: 'bg-[#2563eb]',
    colorText: 'text-[#1d4ed8]',
    icon: 'hiking',
  },
  {
    id: 'pioneros',
    name: 'Pioneros',
    title: 'Unidad de Pioneros',
    age: '15 a 17 Años',
    motto: 'Servir y Construir',
    description:
      'Expediciones de alta montaña, proyectos comunitarios autogestionados, desafíos de supervivencia y afirmación de ideales cívicos.',
    longDescription:
      'Los Pioneros afrontan desafíos técnicos y de liderazgo superiores. Diseñan y ejecutan sus propias empresas de campamento, realizan travesías en la Cordillera Real, ascensiones, y diseñan proyectos de impacto social comunitario en los barrios de La Paz.',
    colorBorder: 'bg-[#dc2626]',
    colorBg: 'bg-[#dc2626]',
    colorText: 'text-[#b70011]',
    icon: 'terrain',
  },
  {
    id: 'rovers',
    name: 'Comunidad Rovers',
    title: 'Clan / Comunidad Rover',
    age: '18 a 21 Años',
    motto: 'Servir',
    description:
      'Autonomía adulta, ciudadanía responsable, ejecución de proyectos sociales en La Paz y vocación activa de servicio a la humanidad.',
    longDescription:
      'La etapa final de la formación scout juvenil. Los Rovers forjan su propio Proyecto Personal de Vida. Viven la hermandad mundial de la horquilla rover, ejecutando acciones de voluntariado de gran escala y preparándose para ser ciudadanos éticos e íntegros en la sociedad boliviana.',
    colorBorder: 'bg-[#16a34a]',
    colorBg: 'bg-[#16a34a]',
    colorText: 'text-[#15803d]',
    icon: 'navigation',
  },
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenLoginModal,
  onShowToast,
}) => {
  const [selectedBranch, setSelectedBranch] = useState<BranchInfo | null>(null);
  const [activeAgendaFilter, setActiveAgendaFilter] = useState<'todos' | 'camp' | 'serv'>('todos');
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    edad: '',
    rama: 'tropa',
    tutor: '',
    telefono: '',
  });

  const handleAddToCart = (productName: string, price: number) => {
    setCartCount((prev) => prev + 1);
    setCartTotal((prev) => prev + price);
    onShowToast(`Se agregó '${productName}' al economato (Bs. ${price.toFixed(2)})`, 'shopping_cart');
  };

  const handleConfirmAttendance = (eventName: string) => {
    onShowToast(`¡Asistencia confirmada para: ${eventName}!`, 'verified');
  };

  const handleSyncCalendar = () => {
    onShowToast('Reuniones sabatinas sincronizadas con tu calendario Google', 'sync');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast(
      `¡Solicitud para ${formData.nombres || 'el aspirante'} recibida! La Jefatura de Grupo te contactará en 24h.`,
      'check_circle'
    );
    setFormData({
      nombres: '',
      apellidos: '',
      edad: '',
      rama: 'tropa',
      tutor: '',
      telefono: '',
    });
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col selection:bg-[#dc2626] selection:text-white">
      {/* HEADER NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-b border-[#eaedff]">
        <div className="h-16 max-w-[1280px] mx-auto px-4 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('inicio')}
            className="flex items-center gap-2 cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-[#b70011] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <span className="material-symbols-outlined text-[20px]">military_tech</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#dc2626] font-headline-lg text-lg lg:text-xl tracking-tight uppercase font-extrabold">
                Amerinst 301
              </span>
              <span className="hidden sm:inline-block font-label-sm text-[11px] px-2 py-0.5 rounded bg-[#e2e7ff] text-[#5c403c] font-bold uppercase tracking-wider">
                1912
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-[#dc2626] font-semibold text-sm hover:opacity-80 transition-opacity"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('historia')}
              className="text-[#5c403c] hover:text-[#131b2e] font-medium text-sm transition-colors"
            >
              Historia
            </button>
            <button
              onClick={() => scrollToSection('ramas')}
              className="text-[#5c403c] hover:text-[#131b2e] font-medium text-sm transition-colors"
            >
              Ramas
            </button>
            <button
              onClick={() => scrollToSection('agenda')}
              className="text-[#5c403c] hover:text-[#131b2e] font-medium text-sm transition-colors"
            >
              Agenda
            </button>
            <button
              onClick={() => scrollToSection('tienda')}
              className="text-[#5c403c] hover:text-[#131b2e] font-medium text-sm transition-colors"
            >
              Tienda
            </button>
          </nav>

          {/* Action Button & Avatar */}
          <div className="flex items-center gap-3">
            {/* Critical requirement: Red "Acceso Dirigentes" button opens login modal */}
            <button
              onClick={onOpenLoginModal}
              className="bg-[#dc2626] hover:bg-[#b70011] active:bg-[#991b1b] text-white font-semibold text-sm px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">badge</span>
              <span>Acceso Dirigentes</span>
            </button>

            <button
              onClick={onOpenLoginModal}
              className="w-9 h-9 rounded-full bg-[#b70011] hover:bg-[#991b1b] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              title="Panel de Jefatura"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#131b2e] hover:bg-[#f2f3ff]"
              type="button"
              aria-label="Abrir menú"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#eaedff] px-4 py-3 flex flex-col gap-2.5 animate-in slide-in-from-top-2">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#f2f3ff] font-semibold text-[#dc2626]"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('historia')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#f2f3ff] text-[#5c403c]"
            >
              Historia
            </button>
            <button
              onClick={() => scrollToSection('ramas')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#f2f3ff] text-[#5c403c]"
            >
              Ramas
            </button>
            <button
              onClick={() => scrollToSection('agenda')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#f2f3ff] text-[#5c403c]"
            >
              Agenda
            </button>
            <button
              onClick={() => scrollToSection('tienda')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#f2f3ff] text-[#5c403c]"
            >
              Tienda
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLoginModal();
              }}
              className="text-left py-2 px-3 rounded-lg bg-[#f2f3ff] text-[#b70011] font-semibold flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">badge</span>
              Acceso Dirigentes
            </button>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full pt-16 flex-1">
        {/* HERO SECTION */}
        <section
          id="inicio"
          className="relative w-full bg-gradient-to-b from-[#b70011] via-[#dc2626] to-[#b02d29] overflow-hidden text-white py-12 lg:py-24"
        >
          {/* Subtle Topographic Ambient Texture Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
            <svg
              className="w-full h-full object-cover"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  height="120"
                  id="contour-pattern"
                  patternUnits="userSpaceOnUse"
                  width="120"
                >
                  <path
                    d="M0,40 Q30,10 60,40 T120,40 M0,80 Q30,50 60,80 T120,80 M0,120 Q30,90 60,120 T120,120"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                </pattern>
              </defs>
              <rect fill="url(#contour-pattern)" height="100%" width="100%" />
            </svg>
          </div>

          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ff665c] rounded-full opacity-20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#ffb4ab] rounded-full opacity-10 blur-3xl pointer-events-none" />

          <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              {/* Commemorative Badge */}
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 shadow-sm border border-white/20">
                <span className="material-symbols-outlined text-[#95f8a7] text-[18px]">
                  verified
                </span>
                <span className="font-label-sm text-xs uppercase tracking-wider text-white font-bold">
                  113 Años de Historia (1912 - 2025) • El Grupo Scout más antiguo de Bolivia
                </span>
              </div>

              {/* Main Title */}
              <h1 className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-white leading-tight font-extrabold tracking-tight mb-4">
                113 Años de Historia: El Grupo Scout más antiguo de Bolivia
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-white/90 max-w-2xl mb-8 leading-relaxed">
                Desde 1912 en La Paz, formando Mente, Alma y Cuerpo a través de la aventura, la disciplina cívica y la hermandad fraterna ininterrumpida.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => scrollToSection('unete')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#dc2626] font-semibold text-sm px-6 py-3 rounded-lg shadow-md hover:bg-[#f2f3ff] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">explore</span>
                  <span>Únete a la Aventura</span>
                </button>
                <button
                  onClick={() => scrollToSection('agenda')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all border border-white/25 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                  <span>Conoce nuestras actividades</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-12 pt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <div className="font-headline-lg text-3xl lg:text-4xl font-bold text-white">
                  +113
                </div>
                <div className="font-label-sm text-xs uppercase tracking-wider text-white/80 mt-1">
                  Años de Legado
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <div className="font-headline-lg text-3xl lg:text-4xl font-bold text-white">
                  4
                </div>
                <div className="font-label-sm text-xs uppercase tracking-wider text-white/80 mt-1">
                  Ramas Activas
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <div className="font-headline-lg text-3xl lg:text-4xl font-bold text-white">
                  3,650m
                </div>
                <div className="font-label-sm text-xs uppercase tracking-wider text-white/80 mt-1">
                  La Paz, Bolivia
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <div className="font-headline-lg text-3xl lg:text-4xl font-bold text-white">
                  +5,000
                </div>
                <div className="font-label-sm text-xs uppercase tracking-wider text-white/80 mt-1">
                  Scouts Formados
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NUESTRA HISTORIA */}
        <section id="historia" className="w-full bg-white text-[#131b2e] py-16 border-b border-[#eaedff]">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 bg-[#e2e7ff] text-[#b70011] font-label-sm text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-2 font-bold">
                <span className="material-symbols-outlined text-[16px]">history_edu</span>
                Pioneros en Bolivia • Desde 1912
              </div>
              <h2 className="font-headline-xl text-2xl lg:text-3xl text-[#b70011] font-bold">
                Nuestra Historia y Legado Centenario
              </h2>
              <p className="text-base text-[#5c403c] mt-2">
                El Instituto Americano de Sopocachi vio florecer la primera semilla del escultismo boliviano, cultivando valores de lealtad, carácter y patriotismo durante más de un siglo.
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col gap-5">
                <div className="bg-[#f2f3ff] p-6 rounded-xl border border-[#e2e7ff] shadow-sm">
                  <h3 className="font-headline-md text-xl text-[#b70011] mb-2 font-bold">
                    Cuna del Escultismo en los Andes
                  </h3>
                  <p className="text-sm text-[#5c403c] leading-relaxed">
                    Fundado formalmente en <strong className="text-[#131b2e]">1912</strong> al amparo del prestigioso Instituto Americano (Amerinst) en La Paz, el Grupo Scout Amerinst 301 es reconocido unánimemente como el grupo fundador del movimiento en el país y uno de los más insignes de Sudamérica. Inspirado por la visión de Baden-Powell y los ideales educativos metodistas de inclusión, forjó a generaciones de jóvenes en el amor a la naturaleza y el servicio voluntario.
                  </p>
                  <p className="text-sm text-[#5c403c] leading-relaxed mt-3">
                    Desde las marchas por el nevado Huayna Potosí hasta la labor de apoyo cívico en momentos cruciales de la patria boliviana, nuestra pañoleta roja y blanca representa compromiso indeclinable, pureza de intenciones y espíritu indomable.
                  </p>
                </div>

                {/* Scout Law Quote */}
                <div className="bg-[#eaedff] p-6 rounded-xl relative overflow-hidden border border-[#dae2fd]">
                  <span className="material-symbols-outlined text-[#b70011]/15 text-[80px] absolute -right-2 -bottom-4 pointer-events-none">
                    format_quote
                  </span>
                  <p className="font-headline-sm text-base lg:text-lg text-[#131b2e] italic relative z-10 leading-snug">
                    "El Scout cifra su honor en ser digno de confianza y en hacer una buena acción a alguien cada día."
                  </p>
                  <span className="font-label-md text-xs text-[#b70011] block mt-2 uppercase tracking-wider relative z-10 font-bold">
                    — Ley y Promesa Scout Amerinst 301
                  </span>
                </div>
              </div>

              {/* Photo Box */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="relative rounded-xl overflow-hidden shadow-md h-80 bg-[#e2e7ff] border border-[#eaedff]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Archivo Histórico Amerinst 301 en La Paz Bolivia"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH_ooFgJNB5P0UVHUbvdizQwVxiVsNc7ZFk6mP-J3QFFWs578FZOlGq2P8zTjZbdK9dNIfcgMrlikGUQ2vXWJ15S-9BcLNh7ELpciD71LkXViEBcKDI0XzblKtyh0lu5KCTayScnb3PQARHVrf6B17-vgLQhYY5Y1u9NeUqnIGPedXihfQRQbDe1t12LScqSYUMnmlzXv84ZLgnXjkTEABPOTNF65cWnHUV6qmgTl3bhH3XxbiEDM"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#283044]/90 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white font-label-md text-xs font-semibold">
                      Archivo Histórico Amerinst 301 • La Paz, 1912
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Milestones */}
            <div className="mt-14 pt-8 border-t border-[#eaedff]">
              <h3 className="font-headline-md text-xl text-[#b70011] text-center mb-6 font-bold">
                Hitos Históricos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#f2f3ff] p-5 rounded-xl border border-[#e2e7ff] shadow-sm flex flex-col">
                  <span className="font-headline-lg text-2xl font-bold text-[#b70011] mb-1">
                    1912
                  </span>
                  <span className="font-headline-sm text-sm text-[#131b2e] font-semibold mb-1">
                    Fundación Histórica
                  </span>
                  <p className="text-xs text-[#5c403c]">
                    Se constituye la primera patrulla en los predios del Instituto Americano de La Paz.
                  </p>
                </div>
                <div className="bg-[#f2f3ff] p-5 rounded-xl border border-[#e2e7ff] shadow-sm flex flex-col">
                  <span className="font-headline-lg text-2xl font-bold text-[#b70011] mb-1">
                    1945
                  </span>
                  <span className="font-headline-sm text-sm text-[#131b2e] font-semibold mb-1">
                    Crecimiento Nacional
                  </span>
                  <p className="text-xs text-[#5c403c]">
                    Consolidación del Sistema de Patrullas y primeros campamentos masivos en los Yungas.
                  </p>
                </div>
                <div className="bg-[#f2f3ff] p-5 rounded-xl border border-[#e2e7ff] shadow-sm flex flex-col">
                  <span className="font-headline-lg text-2xl font-bold text-[#b70011] mb-1">
                    1980
                  </span>
                  <span className="font-headline-sm text-sm text-[#131b2e] font-semibold mb-1">
                    Nuevas Generaciones
                  </span>
                  <p className="text-xs text-[#5c403c]">
                    Modernización de programas educativos integrando a Lobatos, Exploradores y Rovers.
                  </p>
                </div>
                <div className="bg-[#f2f3ff] p-5 rounded-xl border border-[#e2e7ff] shadow-sm flex flex-col">
                  <span className="font-headline-lg text-2xl font-bold text-[#b70011] mb-1">
                    2025
                  </span>
                  <span className="font-headline-sm text-sm text-[#131b2e] font-semibold mb-1">
                    Centenario Vigente
                  </span>
                  <p className="text-xs text-[#5c403c]">
                    Más de un siglo formando la juventud boliviana con excelencia cívica y espíritu de servicio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NUESTRAS RAMAS */}
        <section id="ramas" className="w-full bg-[#f2f3ff] py-16 border-b border-[#eaedff]">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 bg-[#e2e7ff] text-[#b70011] font-label-sm text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-2 font-bold">
                <span className="material-symbols-outlined text-[16px]">groups</span>
                Estructura Educativa Progresiva
              </div>
              <h2 className="font-headline-xl text-2xl lg:text-3xl text-[#b70011] font-bold">
                Nuestras Ramas y Unidades
              </h2>
              <p className="text-base text-[#5c403c] mt-2">
                Acompañamos cada etapa del desarrollo infantil y juvenil a través del juego, la vida en la naturaleza, el sistema de patrullas y proyectos de alto impacto cívico.
              </p>
            </div>

            {/* 4 Cards Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BRANCHES.map((branch) => (
                <div
                  key={branch.id}
                  className="bg-white rounded-xl shadow-sm border border-[#eaedff] overflow-hidden flex flex-col hover:shadow-md transition-all group"
                >
                  <div className={`h-2 w-full ${branch.colorBorder}`} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#f2f3ff] text-[#131b2e] border border-[#e2e7ff]">
                        {branch.age}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-full ${branch.colorBg} text-white flex items-center justify-center shadow-sm`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {branch.icon}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-headline-md text-xl text-[#131b2e] font-bold">
                      {branch.name}
                    </h3>
                    <span className={`text-xs ${branch.colorText} italic font-semibold mt-1`}>
                      Lema: "{branch.motto}"
                    </span>

                    <p className="text-sm text-[#5c403c] mt-3 flex-1 leading-relaxed">
                      {branch.description}
                    </p>

                    <div className="mt-5 pt-3 border-t border-[#eaedff]">
                      <button
                        type="button"
                        onClick={() => setSelectedBranch(branch)}
                        className="w-full py-2 bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Más información</span>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AGENDA DE ACTIVIDADES */}
        <section id="agenda" className="w-full bg-[#eaedff] py-16 border-b border-[#dae2fd]">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 bg-white text-[#b70011] font-label-sm text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-2 font-bold shadow-sm">
                <span className="material-symbols-outlined text-[16px]">event_note</span>
                Ciclo de Campamentos y Sábados Scouts
              </div>
              <h2 className="font-headline-xl text-2xl lg:text-3xl text-[#b70011] font-bold">
                Agenda de Actividades y Calendario Scout
              </h2>
              <p className="text-base text-[#5c403c] mt-2">
                Planificación oficial del primer semestre 2025 para todas las ramas y eventos institucionales en La Paz.
              </p>

              {/* Filtros Rápidos */}
              <div className="flex items-center gap-2 mt-5 flex-wrap justify-center">
                <button
                  type="button"
                  onClick={() => setActiveAgendaFilter('todos')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeAgendaFilter === 'todos'
                      ? 'bg-[#b70011] text-white shadow-sm'
                      : 'bg-white text-[#5c403c] hover:text-[#131b2e] border border-[#e2e7ff]'
                  }`}
                >
                  Todos los Eventos
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAgendaFilter('camp')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeAgendaFilter === 'camp'
                      ? 'bg-[#b70011] text-white shadow-sm'
                      : 'bg-white text-[#5c403c] hover:text-[#131b2e] border border-[#e2e7ff]'
                  }`}
                >
                  Campamentos
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAgendaFilter('serv')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeAgendaFilter === 'serv'
                      ? 'bg-[#b70011] text-white shadow-sm'
                      : 'bg-white text-[#5c403c] hover:text-[#131b2e] border border-[#e2e7ff]'
                  }`}
                >
                  Servicio Social
                </button>
              </div>
            </div>

            {/* Events List */}
            <div className="flex flex-col gap-4 max-w-4xl mx-auto">
              {/* Evento 1 */}
              {(activeAgendaFilter === 'todos' || activeAgendaFilter === 'camp') && (
                <div className="bg-white p-5 rounded-xl shadow-sm border border-[#e2e7ff] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#b70011] text-white px-4 py-3 rounded-lg text-center flex flex-col justify-center min-w-[110px] shrink-0">
                      <span className="font-headline-md text-2xl font-extrabold leading-none">
                        15
                      </span>
                      <span className="font-label-sm text-[10px] uppercase tracking-wider mt-1">
                        MARZO 2025
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-block bg-[#ffdad6] text-[#b70011] font-label-sm text-xs px-2 py-0.5 rounded font-bold">
                          Todas las Ramas
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-[#5c403c]">
                          <span className="material-symbols-outlined text-[16px] text-[#dc2626]">
                            location_on
                          </span>
                          Valle de las Ánimas, La Paz
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-base text-[#131b2e] font-bold mt-1">
                        Gran Campamento de Apertura de Grupo
                      </h3>
                      <p className="text-xs text-[#5c403c] mt-1 leading-relaxed">
                        Encuentro de todas las unidades para inaugurar el ciclo scout 2025 con fogata conmemorativa, investiduras y juegos de campo abierto.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center md:flex-col justify-end shrink-0">
                    <button
                      type="button"
                      onClick={() => handleConfirmAttendance('Gran Campamento de Apertura')}
                      className="bg-[#b70011] hover:bg-[#b02d29] text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer"
                    >
                      Confirmar Asistencia
                    </button>
                  </div>
                </div>
              )}

              {/* Evento 2 */}
              {(activeAgendaFilter === 'todos' || activeAgendaFilter === 'serv') && (
                <div className="bg-white p-5 rounded-xl shadow-sm border border-[#e2e7ff] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#b70011] text-white px-4 py-3 rounded-lg text-center flex flex-col justify-center min-w-[110px] shrink-0">
                      <span className="font-headline-md text-2xl font-extrabold leading-none">
                        29
                      </span>
                      <span className="font-label-sm text-[10px] uppercase tracking-wider mt-1">
                        MARZO 2025
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-block bg-[#95f8a7] text-[#005323] font-label-sm text-xs px-2 py-0.5 rounded font-bold">
                          Pioneros & Rovers
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-[#5c403c]">
                          <span className="material-symbols-outlined text-[16px] text-[#dc2626]">
                            location_on
                          </span>
                          Bosquecillo de Pura Pura, La Paz
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-base text-[#131b2e] font-bold mt-1">
                        Jornada de Servicio Comunitario y Reforestación
                      </h3>
                      <p className="text-xs text-[#5c403c] mt-1 leading-relaxed">
                        Acción ecológica de impacto ambiental liderada en beneficio de la comunidad paceña con plantación de especies nativas y limpieza forestal.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center md:flex-col justify-end shrink-0">
                    <button
                      type="button"
                      onClick={() => handleConfirmAttendance('Jornada de Reforestación')}
                      className="bg-[#b70011] hover:bg-[#b02d29] text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer"
                    >
                      Confirmar Asistencia
                    </button>
                  </div>
                </div>
              )}

              {/* Evento 3 */}
              {(activeAgendaFilter === 'todos' || activeAgendaFilter === 'camp') && (
                <div className="bg-white p-5 rounded-xl shadow-sm border border-[#e2e7ff] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#b70011] text-white px-3 py-3 rounded-lg text-center flex flex-col justify-center min-w-[110px] shrink-0">
                      <span className="font-headline-sm text-sm font-extrabold leading-tight">
                        CADA SÁBADO
                      </span>
                      <span className="font-label-sm text-[10px] uppercase tracking-wider mt-0.5">
                        14:30 - 18:00
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-block bg-[#e2e7ff] text-[#131b2e] font-label-sm text-xs px-2 py-0.5 rounded font-bold">
                          Actividad Semanal
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-[#5c403c]">
                          <span className="material-symbols-outlined text-[16px] text-[#dc2626]">
                            location_on
                          </span>
                          Patio del Instituto Americano, Sopocachi
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-base text-[#131b2e] font-bold mt-1">
                        Reunión Tradicional de Sábado
                      </h3>
                      <p className="text-xs text-[#5c403c] mt-1 leading-relaxed">
                        Formación protocolar, juegos de patrulla, preparación técnica de campismo, adelantos de progresión y ceremonias scouts semanales.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center md:flex-col justify-end shrink-0">
                    <button
                      type="button"
                      onClick={handleSyncCalendar}
                      className="bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] font-semibold text-xs px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 border border-[#e2e7ff] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">sync</span>
                      <span>Sincronizar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* TIENDA SCOUT */}
        <section id="tienda" className="w-full bg-white py-16 border-b border-[#eaedff]">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 bg-[#e2e7ff] text-[#b70011] font-label-sm text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-2 font-bold">
                <span className="material-symbols-outlined text-[16px]">storefront</span>
                Economato Oficial Amerinst 301
              </div>
              <h2 className="font-headline-xl text-2xl lg:text-3xl text-[#b70011] font-bold">
                Tienda Scout Amerinst 301
              </h2>
              <p className="text-base text-[#5c403c] mt-2">
                Adquiere equipo reglamentario, insignias oficiales, pañoletas e indumentaria certificada de nuestro grupo centenario.
              </p>

              {/* Floating Cart Indicator */}
              <div className="mt-4 inline-flex items-center gap-2 bg-[#f2f3ff] px-4 py-2 rounded-full border border-[#e2e7ff] shadow-sm">
                <span className="material-symbols-outlined text-[#dc2626] text-[20px]">
                  shopping_bag
                </span>
                <span className="text-xs font-semibold text-[#131b2e]">Carrito actual:</span>
                <span className="bg-[#b70011] text-white font-bold text-xs px-2.5 py-0.5 rounded-full">
                  {cartCount} artículo{cartCount !== 1 ? 's' : ''}
                </span>
                <span className="text-xs font-bold text-[#b70011]">
                  Bs. {cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Producto 1 */}
              <div className="bg-white rounded-xl shadow-sm border border-[#eaedff] overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                <div className="h-56 bg-[#f2f3ff] relative flex items-center justify-center p-3 overflow-hidden">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    alt="Pañoleta Oficial Roja y Blanca Amerinst 301"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUNqjC1ETzXOZEhyMavXG-bsZOnqWecznPICh1cXmoK_Z3Sh_okj1Dn1YNWSO1C7sudsSz9BemqUDgCgeB45yuo2ZW4N0RfEZRrOtYdZdbTFaYJ6BLn7VniSKSqJWL0oyQg8gIMmvGmgd0-l7c8fo0eknan7w_-Ib3EENkPRx6bMt4nltGeqF0UTf6X_hIEF_Y5b_X0psMvLZqTDqZxV1HPLybVO0FEE08WsqHE0pZuCwlLi5Wwbw"
                  />
                  <span className="absolute top-3 left-3 bg-[#b70011] text-white font-label-sm text-[11px] px-2 py-0.5 rounded shadow-sm font-bold uppercase">
                    Oficial
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-headline-sm text-base text-[#131b2e] font-bold">
                    Pañoleta Oficial Roja y Blanca Amerinst
                  </h3>
                  <p className="text-xs text-[#5c403c] mt-1.5 flex-1 leading-relaxed">
                    Confección reglamentaria de alta durabilidad con ribete blanco tradicional y escudo bordado en la punta posterior.
                  </p>
                  <div className="flex items-center justify-between mt-5 pt-3 border-t border-[#eaedff]">
                    <span className="font-headline-md text-lg font-bold text-[#b70011]">
                      Bs. 45.00
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddToCart('Pañoleta Oficial Roja y Blanca', 45)}
                      className="bg-[#b70011] hover:bg-[#b02d29] text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        add_shopping_cart
                      </span>
                      <span>Añadir al Carrito</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Producto 2 */}
              <div className="bg-white rounded-xl shadow-sm border border-[#eaedff] overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                <div className="h-56 bg-[#f2f3ff] relative flex items-center justify-center p-3 overflow-hidden">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    alt="Insignia 113 Años Conmemorativa Amerinst"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC9AsUf5XEnBNqaufpjT7aZ_CKj5qFsDL43CrVCsIgtFupuX3d0wtbuQfIXQFXkf1QQ37-ivHovDg7_fusL7utCkcBK3cdNj8LBJqn3wgK2AffQs2OFAd9u-sVlEDP8RuP1RMJuuu9p9kD6OUDo0y3EqdpvahjBjsEmPJDF9TSytws5E9MdqM3kkifZmBjRBSfDaCTVC4VYOv4024TKIqnEyZ1i38Gas1DnitfbDlp9QT0VzCHoJo"
                  />
                  <span className="absolute top-3 left-3 bg-[#b02d29] text-white font-label-sm text-[11px] px-2 py-0.5 rounded shadow-sm font-bold uppercase">
                    Edición Limitada
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-headline-sm text-base text-[#131b2e] font-bold">
                    Insignia 113 Años Conmemorativa
                  </h3>
                  <p className="text-xs text-[#5c403c] mt-1.5 flex-1 leading-relaxed">
                    Bordado dorado en alta definición con hilo reforzado para uniforme oficial de gala o campamento.
                  </p>
                  <div className="flex items-center justify-between mt-5 pt-3 border-t border-[#eaedff]">
                    <span className="font-headline-md text-lg font-bold text-[#b70011]">
                      Bs. 25.00
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddToCart('Insignia 113 Años Conmemorativa', 25)}
                      className="bg-[#b70011] hover:bg-[#b02d29] text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        add_shopping_cart
                      </span>
                      <span>Añadir al Carrito</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Producto 3 */}
              <div className="bg-white rounded-xl shadow-sm border border-[#eaedff] overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                <div className="h-56 bg-[#f2f3ff] relative flex items-center justify-center p-3 overflow-hidden">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    alt="Manual de Progresión y Pionerismo Scout"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3GYQvE1kE0rJJnniy3SYQkutgK1V9chgd2OhmFX70u9b_Kp_XJnTIUc5p2Ee_fVS69eZzEwcLWf4ongVnZ68GjrbgawMBD5Rjf0ITU3lIOYRWCqSq0i7x-Au-WElCMZCe3T2TWIb9uttH5CpfWX6yWbz3YbY805tVnQTkTWuyE39k_wPunpBMBkOEohXBGwXlz2X0jK8bjy-E9eVuP9WS8fZqzNgHeYBSK5D0uv8jkFXCWhKaBE4"
                  />
                  <span className="absolute top-3 left-3 bg-[#00682e] text-white font-label-sm text-[11px] px-2 py-0.5 rounded shadow-sm font-bold uppercase">
                    Formación
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-headline-sm text-base text-[#131b2e] font-bold">
                    Manual de Progresión y Pionerismo
                  </h3>
                  <p className="text-xs text-[#5c403c] mt-1.5 flex-1 leading-relaxed">
                    Guía técnica completa ilustrada: nudos y amarres, campismo andino, pistas y señales, primeros auxilios y orientación estelar.
                  </p>
                  <div className="flex items-center justify-between mt-5 pt-3 border-t border-[#eaedff]">
                    <span className="font-headline-md text-lg font-bold text-[#b70011]">
                      Bs. 35.00
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddToCart('Manual de Progresión y Pionerismo', 35)}
                      className="bg-[#b70011] hover:bg-[#b02d29] text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        add_shopping_cart
                      </span>
                      <span>Añadir al Carrito</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN FORMULARIO ÚNETE */}
        <section id="unete" className="w-full bg-[#e2e7ff] py-16">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-[#eaedff]">
              <div className="lg:col-span-5 bg-gradient-to-br from-[#b70011] to-[#b02d29] p-8 text-white flex flex-col justify-between">
                <div>
                  <span className="font-label-sm text-xs uppercase tracking-wider text-[#95f8a7] font-bold">
                    Inscripciones Abiertas 2025
                  </span>
                  <h3 className="font-headline-xl text-2xl lg:text-3xl font-bold mt-2 text-white leading-tight">
                    Comienza tu Camino en el Escultismo
                  </h3>
                  <p className="text-sm text-white/90 mt-4 leading-relaxed">
                    Aceptamos inscripciones desde los 7 hasta los 21 años. Únete a una hermandad que desafía los límites y deja una huella indeleble en la sociedad.
                  </p>
                </div>
                <div className="flex flex-col gap-3 mt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                    </div>
                    <span className="text-sm">Instructores capacitados y certificados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">shield</span>
                    </div>
                    <span className="text-sm">Protocolo integral de protección de la juventud</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">nature_people</span>
                    </div>
                    <span className="text-sm">Campamentos en los valles y cordilleras de Bolivia</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 p-8 bg-white">
                <h4 className="font-headline-md text-xl text-[#131b2e] font-bold mb-1">
                  Ficha de Preinscripción
                </h4>
                <p className="text-sm text-[#5c403c] mb-6">
                  Llena los datos del aspirante o scout y la jefatura se comunicará para la sesión introductoria.
                </p>

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#131b2e]">
                        Nombres del Aspirante
                      </label>
                      <input
                        className="w-full h-10 px-3 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-sm border border-[#e2e7ff] focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:bg-white"
                        placeholder="ej. Matías Alejandro"
                        required
                        type="text"
                        value={formData.nombres}
                        onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#131b2e]">
                        Apellidos
                      </label>
                      <input
                        className="w-full h-10 px-3 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-sm border border-[#e2e7ff] focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:bg-white"
                        placeholder="ej. Condori Mendoza"
                        required
                        type="text"
                        value={formData.apellidos}
                        onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#131b2e]">
                        Edad y Fecha de Nacimiento
                      </label>
                      <input
                        className="w-full h-10 px-3 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-sm border border-[#e2e7ff] focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:bg-white"
                        placeholder="ej. 12 años (15/05/2012)"
                        required
                        type="text"
                        value={formData.edad}
                        onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#131b2e]">
                        Rama de Interés
                      </label>
                      <select
                        className="w-full h-10 px-3 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-sm border border-[#e2e7ff] focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:bg-white"
                        value={formData.rama}
                        onChange={(e) => setFormData({ ...formData, rama: e.target.value })}
                      >
                        <option value="manada">Manada (7 - 10 años)</option>
                        <option value="tropa">Tropa Murray Dickson (11 - 14 años)</option>
                        <option value="pioneros">Pioneros (15 - 17 años)</option>
                        <option value="rovers">Rovers (18 - 21 años)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#131b2e]">
                        Nombre de Padre/Tutor
                      </label>
                      <input
                        className="w-full h-10 px-3 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-sm border border-[#e2e7ff] focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:bg-white"
                        placeholder="ej. Laura Mendoza"
                        required
                        type="text"
                        value={formData.tutor}
                        onChange={(e) => setFormData({ ...formData, tutor: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#131b2e]">
                        Teléfono / WhatsApp de Contacto
                      </label>
                      <input
                        className="w-full h-10 px-3 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-sm border border-[#e2e7ff] focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:bg-white"
                        placeholder="ej. +591 70612345"
                        required
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      />
                    </div>
                  </div>

                  <button
                    className="w-full h-12 bg-[#dc2626] hover:bg-[#b70011] text-white font-semibold text-sm rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 mt-2 cursor-pointer"
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-[20px]">send</span>
                    <span>Enviar Solicitud de Inscripción</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#dc2626] text-[#fff6f5] border-t border-[#b70011]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-headline-sm text-base text-white uppercase font-bold">
              Grupo Scout Amerinst 301
            </h3>
            <p className="text-xs text-white/90 leading-relaxed">
              Sede Institucional en el Instituto Americano, La Paz, Bolivia. Más de un siglo forjando líderes, carácter cívico y compromiso comunitario.
            </p>
            <div className="flex flex-col gap-1 mt-2 text-xs text-white/80">
              <span>Av. 20 de Octubre & Calle Landaeta, La Paz</span>
              <span>contacto@scoutsamerinst301.bo</span>
              <span>Reuniones sabatinas: 14:30 - 18:00</span>
            </div>
            <div className="mt-3">
              <button
                type="button"
                onClick={onOpenLoginModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span>Acceso Jefatura</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-headline-sm text-base text-white uppercase font-bold">
              Preguntas y Recursos
            </h3>
            <ul className="flex flex-col gap-1.5 text-xs text-white/90">
              <li>
                <button
                  onClick={() => onShowToast('Abriendo sección de Preguntas Frecuentes', 'help')}
                  className="hover:underline text-left"
                >
                  Preguntas Frecuentes (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('unete')}
                  className="hover:underline text-left"
                >
                  Inscripciones y Requisitos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onShowToast('Fichas Médicas de Campo disponibles para descarga', 'description')}
                  className="hover:underline text-left"
                >
                  Fichas Médicas de Campo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onShowToast('Enlace oficial: Asociación de Scouts de Bolivia (ASB)', 'public')}
                  className="hover:underline text-left"
                >
                  Asociación de Scouts de Bolivia
                </button>
              </li>
              <li>
                <button
                  onClick={() => onShowToast('Estatutos y Código de Honor vigentes', 'gavel')}
                  className="hover:underline text-left"
                >
                  Estatutos y Código de Honor
                </button>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-headline-sm text-base text-white uppercase font-bold">
              Tradición y Comunidad
            </h3>
            <p className="text-xs text-white/90 leading-relaxed">
              113 años de tradición centenaria ininterrumpida (1912 - Presente). Síguenos en nuestros canales oficiales para avisos y crónicas de patrulla.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <button
                type="button"
                onClick={() => onShowToast('Canal oficial web de crónicas y noticias scouts', 'public')}
                className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors text-white"
                aria-label="Sitio web"
              >
                <span className="material-symbols-outlined text-[18px]">public</span>
              </button>
              <button
                type="button"
                onClick={() => onShowToast('Galería fotográfica conmemorativa Amerinst 301', 'photo_library')}
                className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors text-white"
                aria-label="Galería"
              >
                <span className="material-symbols-outlined text-[18px]">photo_library</span>
              </button>
              <button
                type="button"
                onClick={() => onShowToast('Correo de contacto oficial: contacto@scoutsamerinst301.bo', 'mail')}
                className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors text-white"
                aria-label="Correo"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </button>
            </div>
            <p className="text-[11px] text-white/75 mt-3">
              © 1912 - 2025 Grupo Scout Amerinst 301. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING QUICK ACCESS BUTTON FOR DIRECTORS */}
      <button
        onClick={onOpenLoginModal}
        title="Abrir Acceso Dirigentes"
        type="button"
        className="fixed bottom-6 left-6 z-30 bg-white/95 backdrop-blur-md text-[#b70011] border border-[#e2e7ff] text-xs font-bold px-3.5 py-2.5 rounded-full shadow-lg flex items-center gap-2 hover:bg-white hover:shadow-xl transition-all cursor-pointer"
      >
        <span className="material-symbols-outlined text-[18px] text-[#dc2626]">badge</span>
        <span>Acceso Jefatura</span>
      </button>

      {/* MODAL DE DETALLE DE RAMA */}
      <BranchModal
        branch={selectedBranch}
        onClose={() => setSelectedBranch(null)}
        onSelectForSignup={(branchId) => {
          setFormData((prev) => ({ ...prev, rama: branchId }));
          scrollToSection('unete');
        }}
      />
    </div>
  );
};
