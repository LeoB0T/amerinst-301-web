import React, { useState } from 'react';
import { DashboardTab, ScoutMember, DocumentItem } from '../types.ts';

interface DashboardProps {
  onLogout: () => void;
  onShowToast: (message: string, icon?: string) => void;
}

const INITIAL_SCOUTS: ScoutMember[] = [
  {
    id: 1,
    code: 'BOL-301-2022-89',
    name: 'Mateo Condori Villalba',
    initials: 'MC',
    age: 12,
    patrol: 'Cóndores',
    stage: 'Rumbo (2da Clase)',
    stageColor: 'text-[#00682e] bg-[#e7ffe5]',
    present: true,
  },
  {
    id: 2,
    code: 'BOL-301-2021-44',
    name: 'Luciana Mendoza Paz',
    initials: 'LM',
    age: 13,
    patrol: 'Águilas',
    stage: 'Travesía (Guía)',
    stageColor: 'text-[#00682e] bg-[#e7ffe5]',
    present: true,
  },
  {
    id: 3,
    code: 'BOL-301-2023-11',
    name: 'Gabriel Flores Arce',
    initials: 'GF',
    age: 11,
    patrol: 'Lobos',
    stage: 'Pistas (Novicio)',
    stageColor: 'text-[#5c403c] bg-[#eaedff]',
    present: false,
  },
  {
    id: 4,
    code: 'BOL-301-2020-03',
    name: 'Sofía Romero Quispe',
    initials: 'SR',
    age: 14,
    patrol: 'Pumas',
    stage: 'Senda (1ra Clase)',
    stageColor: 'text-[#00682e] bg-[#e7ffe5]',
    present: true,
  },
];

const INITIAL_DOCS: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Reglamento ASB.pdf',
    filename: 'Reglamento_ASB_Oficial.pdf',
    category: 'administrativo',
    categoryLabel: 'Administrativo',
    categoryColor: 'bg-[#ffdad6] text-[#410002]',
    description:
      'Estatuto y Normativa de la Asociación de Scouts de Bolivia. Régimen disciplinario, estructura nacional y código de ética.',
    size: '4.2 MB',
    rev: 'Rev. 2024',
    icon: 'picture_as_pdf',
  },
  {
    id: 'doc-2',
    title: 'Ficha Médica.docx',
    filename: 'Ficha_Medica_Campamento_2025.docx',
    category: 'salud',
    categoryLabel: 'Salud • Obligatorio',
    categoryColor: 'bg-[#e7ffe5] text-[#005323]',
    description:
      'Formulario obligatorio de salud y autorización parental 2025. Incluye vacunas, alergias, tipo de sangre y seguros.',
    size: '850 KB',
    rev: 'Plantilla Editable',
    icon: 'description',
  },
  {
    id: 'doc-3',
    title: 'Cartillas de Progresión.pdf',
    filename: 'Cartillas_Progresion_Tropa_2025.pdf',
    category: 'tecnico',
    categoryLabel: 'Técnico • Formación',
    categoryColor: 'bg-[#eaedff] text-[#131b2e]',
    description:
      'Guía oficial de etapas de adelanto: Pista, Senda, Rumbo y Travesía para la Tropa de Scouts. Criterios de evaluación técnica.',
    size: '6.1 MB',
    rev: 'Tropa Murray Dickson',
    icon: 'menu_book',
  },
];

export const Dashboard: React.FC<DashboardProps> = ({
  onLogout,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [selectedBranch, setSelectedBranch] = useState<'manada' | 'tropa' | 'pioneros' | 'rovers'>('tropa');
  const [scouts, setScouts] = useState<ScoutMember[]>(INITIAL_SCOUTS);
  const [docsCategory, setDocsCategory] = useState<'todos' | 'administrativo' | 'tecnico' | 'salud'>('todos');
  const [searchDocQuery, setSearchDocQuery] = useState<string>('');

  // Attendance statistics
  const totalScouts = scouts.length;
  const presentScouts = scouts.filter((s) => s.present).length;
  const attendancePct = Math.round((presentScouts / totalScouts) * 100);

  const toggleAttendance = (id: number) => {
    setScouts((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextState = !s.present;
          onShowToast(
            `${s.name}: ${nextState ? 'Marcado como Presente' : 'Marcado como Ausente'}`,
            nextState ? 'check_circle' : 'cancel'
          );
          return { ...s, present: nextState };
        }
        return s;
      })
    );
  };

  const handleSaveAttendance = () => {
    onShowToast(
      `Asistencia guardada: ${presentScouts} de ${totalScouts} scouts presentes (${attendancePct}%).`,
      'verified'
    );
  };

  const handleExportAttendance = () => {
    onShowToast('Exportando nómina de asistencia en formato Excel/CSV...', 'download');
  };

  const handleDownloadDoc = (title: string) => {
    onShowToast(`Descargando archivo: ${title}`, 'download');
  };

  const filteredDocs = INITIAL_DOCS.filter((doc) => {
    const matchCat = docsCategory === 'todos' || doc.category === docsCategory;
    const matchSearch =
      !searchDocQuery ||
      doc.title.toLowerCase().includes(searchDocQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchDocQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const selectTab = (tab: DashboardTab) => {
    setActiveTab(tab);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      {/* SIDEBAR (Desktop Fixed & Mobile Drawer) */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-r border-[#eaedff] z-50 flex flex-col justify-between transition-transform duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Brand header */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-[#eaedff]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#b70011] flex items-center justify-center text-white font-bold text-base shadow-sm">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-sm text-[#131b2e] leading-tight font-bold tracking-tight">
                  Amerinst 301
                </span>
                <span className="text-[11px] text-[#5c403c]">La Paz • Fund. 1912</span>
              </div>
            </div>
            <span className="bg-[#b70011] text-white font-label-sm text-[10px] px-2 py-0.5 rounded uppercase font-bold">
              Jefatura
            </span>
          </div>

          {/* Navigation */}
          <div className="px-3 pt-5">
            <span className="px-3 font-label-sm text-[11px] uppercase tracking-wider text-[#5c403c] font-bold">
              Navegación Principal
            </span>
            <nav className="mt-2 flex flex-col gap-1">
              <button
                type="button"
                onClick={() => selectTab('dashboard')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-[#b70011] text-white shadow-sm'
                    : 'text-[#5c403c] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">space_dashboard</span>
                <span>Dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => selectTab('unidades')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'unidades'
                    ? 'bg-[#b70011] text-white shadow-sm'
                    : 'text-[#5c403c] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">diversity_3</span>
                <span>Gestión de Unidades</span>
              </button>

              <button
                type="button"
                onClick={() => selectTab('microprogramas')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'microprogramas'
                    ? 'bg-[#b70011] text-white shadow-sm'
                    : 'text-[#5c403c] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">event_available</span>
                <span>Microprogramas</span>
              </button>

              <button
                type="button"
                onClick={() => selectTab('biblioteca')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'biblioteca'
                    ? 'bg-[#b70011] text-white shadow-sm'
                    : 'text-[#5c403c] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">local_library</span>
                <span>Biblioteca Digital</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Sidebar Footer with Logout Requirement */}
        <div className="p-4 bg-[#f2f3ff] border-t border-[#eaedff]">
          <div className="flex items-center gap-2.5 mb-3 px-1">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1a8340] ring-2 ring-[#e7ffe5] animate-pulse" />
            <div className="flex flex-col">
              <span className="text-xs text-[#131b2e] font-bold">Dirigente Activo</span>
              <span className="text-[11px] text-[#5c403c]">Sesión verificada</span>
            </div>
          </div>

          {/* CRITICAL REQUIREMENT: Cerrar Sesión button changes currentView back to 'landing' */}
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-white text-[#5c403c] text-xs font-semibold hover:bg-[#ffdad6] hover:text-[#ba1a1a] transition-all border border-[#e2e7ff] shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#283044]/60 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT WRAPPER */}
      <div className="lg:pl-64 flex-1 flex flex-col">
        {/* TOPBAR */}
        <header className="sticky top-0 h-16 bg-white border-b border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-30 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#131b2e] hover:bg-[#f2f3ff]"
              aria-label="Abrir navegación lateral"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-[#5c403c]">
              <span className="material-symbols-outlined text-[18px] text-[#dc2626]">shield</span>
              <span className="hidden sm:inline">Panel Institucional</span>
              <span className="text-[#916f6b]">/</span>
              <span className="font-bold text-[#131b2e]">Jefatura de Grupo</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1.5 text-[#5c403c] text-xs bg-[#f2f3ff] px-3 py-1.5 rounded-lg border border-[#e2e7ff]">
              <span className="material-symbols-outlined text-[16px] text-[#b70011]">
                calendar_today
              </span>
              <span>Sábado de Actividades • 14:30 BOT</span>
            </div>

            <button
              type="button"
              onClick={() => onShowToast('Tienes 2 avisos de Jefatura pendientes de revisión', 'notifications')}
              className="relative p-2 rounded-lg hover:bg-[#f2f3ff] text-[#5c403c] transition-colors cursor-pointer"
              aria-label="Notificaciones"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#dc2626]" />
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-[#eaedff]">
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-xs text-[#131b2e] font-bold">Scouter Alejandro</span>
                <span className="text-[11px] text-[#5c403c]">Jefe de Tropa</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#b70011] text-white flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN BODY AREA */}
        <main className="p-4 lg:p-8 flex-1 max-w-7xl mx-auto w-full flex flex-col gap-6">
          {/* Subheader Banner Institucional */}
          <div className="bg-white rounded-xl shadow-sm border border-[#eaedff] p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 rounded-xl bg-[#b70011] flex items-center justify-center text-white shadow-md shrink-0">
                <span className="material-symbols-outlined text-[30px]">military_tech</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-headline-md text-lg lg:text-xl text-[#131b2e] font-bold">
                    Grupo Scout Amerinst 301
                  </span>
                  <span className="bg-[#1a8340] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Centenario • Fund. 1912
                  </span>
                  <span className="bg-[#e2e7ff] text-[#131b2e] text-[10px] font-bold px-2 py-0.5 rounded">
                    Distrito La Paz
                  </span>
                </div>
                <p className="text-xs text-[#5c403c] mt-1">
                  Panel Central de Mandos • Ciclo Operativo Anual 2025 • Asociación de Scouts de Bolivia
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-stretch lg:self-auto justify-end">
              <div className="bg-[#f2f3ff] px-3.5 py-2 rounded-lg flex items-center gap-2.5 border border-[#e2e7ff]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#dc2626] animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#5c403c] font-bold">
                    Unidad Activa
                  </span>
                  <span className="text-xs text-[#131b2e] font-bold">Tropa Murray Dickson</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onShowToast('Generando ficha para impresión...', 'print');
                  window.print();
                }}
                className="px-3.5 py-2 rounded-lg bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                title="Imprimir reporte actual"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                <span className="hidden sm:inline">Imprimir Ficha</span>
              </button>
            </div>
          </div>

          {/* Secondary Tab Bar */}
          <div className="bg-white p-1.5 rounded-xl shadow-sm border border-[#eaedff] flex items-center overflow-x-auto gap-1">
            <button
              type="button"
              onClick={() => selectTab('dashboard')}
              className={`flex-1 min-w-[150px] py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#b70011] text-white shadow-sm'
                  : 'text-[#5c403c] hover:bg-[#f2f3ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">space_dashboard</span>
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => selectTab('unidades')}
              className={`flex-1 min-w-[150px] py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'unidades'
                  ? 'bg-[#b70011] text-white shadow-sm'
                  : 'text-[#5c403c] hover:bg-[#f2f3ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">diversity_3</span>
              <span>Gestión de Unidades</span>
            </button>

            <button
              type="button"
              onClick={() => selectTab('microprogramas')}
              className={`flex-1 min-w-[150px] py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'microprogramas'
                  ? 'bg-[#b70011] text-white shadow-sm'
                  : 'text-[#5c403c] hover:bg-[#f2f3ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">event_available</span>
              <span>Microprogramas</span>
            </button>

            <button
              type="button"
              onClick={() => selectTab('biblioteca')}
              className={`flex-1 min-w-[150px] py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'biblioteca'
                  ? 'bg-[#b70011] text-white shadow-sm'
                  : 'text-[#5c403c] hover:bg-[#f2f3ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">local_library</span>
              <span>Biblioteca Digital</span>
            </button>
          </div>

          {/* ========================================================= */}
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-150">
              {/* Tarjeta de Bienvenida */}
              <div className="bg-white rounded-xl shadow-sm border border-[#eaedff] p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="flex flex-col gap-2 z-10 max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#410002] text-xs font-bold w-fit">
                    <span className="material-symbols-outlined text-[15px] text-[#dc2626]">
                      verified
                    </span>
                    <span>Siempre Listo • Sede Central La Paz</span>
                  </div>

                  <h2 className="font-headline-lg text-2xl lg:text-3xl text-[#131b2e] font-extrabold tracking-tight">
                    Bienvenido, Scouter Alejandro • Ciclo 2025
                  </h2>

                  <p className="text-sm text-[#5c403c] leading-relaxed">
                    La Jefatura reporta un 94% de cumplimiento del plan formativo trimestral. Tienes 4 patrullas activas preparándose para el Gran Campamento de Semana Santa en Sorata.
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => selectTab('microprogramas')}
                      className="px-4 py-2 rounded-lg bg-[#b70011] text-white text-xs font-semibold hover:bg-[#dc2626] transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                      <span>Ver Plan de Sábado</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => selectTab('unidades')}
                      className="px-4 py-2 rounded-lg bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">fact_check</span>
                      <span>Tomar Lista Rápida</span>
                    </button>
                  </div>
                </div>

                <div className="relative w-full md:w-64 h-36 rounded-lg overflow-hidden shrink-0 shadow-inner flex items-center justify-center bg-[#eaedff]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Patrullas en formación matutina"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtd1CpYqkMvLVj8Dy00yzDqX7rFSqkQlC9fBQVyQOt7vbzJRATD1M0NwND0o6FaINLLyFflTx7U6K7yrSrzLB1i5T05EOoEKewgtHUlnHa8UBK23HJ4HTvLg3nvR8K-_NdhaeWjJYFqLWwV3cx1v4kDDXfciqhF9LuqjdQLIoM4dV9-G_fgsk4FvkeMcvXr_7iarZrQpeMVQe210sLwD3RiHrzkuIbf_O6_nz-fYOEC4UkW2VXn5s"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-white text-[11px] font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                      Patrullas en formación matutina
                    </span>
                  </div>
                </div>
              </div>

              {/* Métricas Principales (Stats Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stat 1: Censo */}
                <div className="bg-white rounded-xl shadow-sm border border-[#eaedff] p-5 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider text-[#5c403c] font-bold">
                        Censo Institucional
                      </span>
                      <span className="font-headline-xl text-3xl font-black text-[#131b2e] mt-1">
                        85
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-[#e2e7ff] text-[#b70011] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[26px]">group</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 bg-[#f2f3ff] p-3 rounded-lg flex flex-col gap-2 border border-[#eaedff]">
                    <div className="flex items-center justify-between text-[#00682e] text-xs font-semibold">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">trending_up</span>
                        +6 este mes
                      </span>
                      <span className="text-[#5c403c] font-normal">Meta Q1: 90 scouts</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-center text-xs pt-1">
                      <div className="bg-white rounded py-1 border border-[#eaedff]">
                        <span className="text-[#5c403c] block text-[10px]">Manada</span>
                        <strong className="text-[#131b2e]">24</strong>
                      </div>
                      <div className="bg-white rounded py-1 border border-[#eaedff]">
                        <span className="text-[#5c403c] block text-[10px]">Tropa</span>
                        <strong className="text-[#00682e]">32</strong>
                      </div>
                      <div className="bg-white rounded py-1 border border-[#eaedff]">
                        <span className="text-[#5c403c] block text-[10px]">Pioneros</span>
                        <strong className="text-[#b70011]">18</strong>
                      </div>
                      <div className="bg-white rounded py-1 border border-[#eaedff]">
                        <span className="text-[#5c403c] block text-[10px]">Rovers</span>
                        <strong className="text-[#b02d29]">11</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stat 2: Próxima Actividad */}
                <div className="bg-white rounded-xl shadow-sm border border-[#eaedff] p-5 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider text-[#5c403c] font-bold">
                        Próxima Convocatoria
                      </span>
                      <span className="font-headline-sm text-base font-bold text-[#131b2e] mt-1">
                        Sábado 15:00 BOT
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-[#1a8340] text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-[26px]">hiking</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 flex flex-col gap-2">
                    <div className="flex items-start gap-2 bg-[#f2f3ff] p-2.5 rounded-lg border border-[#eaedff]">
                      <span className="material-symbols-outlined text-[#dc2626] text-[18px] shrink-0 mt-0.5">
                        location_on
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs text-[#131b2e] font-semibold">
                          Parque Urbano Central (Bosquecillo)
                        </span>
                        <span className="text-[11px] text-[#5c403c]">
                          Reunión ordinaria de campo y pase de pistas
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#5c403c] px-1">
                      <span>Uniforme completo reglamentario</span>
                      <span className="text-[#00682e] font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        Confirmado
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stat 3: Circulares */}
                <div className="bg-white rounded-xl shadow-sm border border-[#eaedff] p-5 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider text-[#5c403c] font-bold">
                        Circulares Oficiales
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-headline-xl text-3xl font-black text-[#131b2e]">
                          2
                        </span>
                        <span className="text-xs text-[#b70011] font-semibold">
                          Pendientes de firma
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-[#e2e7ff] text-[#b70011] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[26px]">mark_email_unread</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 flex flex-col gap-1.5">
                    <div className="bg-[#f2f3ff] p-2 rounded-lg flex items-center justify-between text-[#131b2e] text-xs border border-[#eaedff]">
                      <span className="truncate">Fichas Médicas de Campamento 2025</span>
                      <span className="bg-[#b70011] text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                        Nuevo
                      </span>
                    </div>
                    <div className="bg-[#f2f3ff] p-2 rounded-lg flex items-center justify-between text-[#131b2e] text-xs border border-[#eaedff]">
                      <span className="truncate">Circular Distrital ASB N° 04/2025</span>
                      <span className="text-[#5c403c] text-[11px]">Ayer</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => selectTab('biblioteca')}
                      className="text-[#b70011] text-xs font-semibold hover:underline text-left mt-1 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Abrir Archivo Institucional</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bitácora & Rendimiento Técnico */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Timeline */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-[#eaedff] p-6 flex flex-col">
                  <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#b70011] text-[22px]">
                        history
                      </span>
                      <h3 className="font-headline-sm text-base text-[#131b2e] font-bold">
                        Bitácora de Jefatura y Novedades
                      </h3>
                    </div>
                    <span className="text-xs text-[#5c403c]">Últimas 72 horas</span>
                  </div>

                  <div className="flex flex-col gap-3 mt-4">
                    <div className="flex items-start gap-3 bg-[#f2f3ff]/60 p-3 rounded-lg border border-[#eaedff]">
                      <div className="w-8 h-8 rounded-full bg-[#00682e] text-white flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px]">verified_user</span>
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#131b2e]">
                            Aprobación de Promesa Scout
                          </span>
                          <span className="text-[11px] text-[#5c403c]">Hoy, 10:15</span>
                        </div>
                        <p className="text-xs text-[#5c403c] mt-0.5">
                          El Scouter Alejandro convalidó la investidura de 2 aspirantes de la Patrulla Cóndores para el próximo Consejo.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-[#f2f3ff]/60 p-3 rounded-lg border border-[#eaedff]">
                      <div className="w-8 h-8 rounded-full bg-[#b70011] text-white flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px]">edit_calendar</span>
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#131b2e]">
                            Microprograma de Sábado Cargado
                          </span>
                          <span className="text-[11px] text-[#5c403c]">Ayer, 18:40</span>
                        </div>
                        <p className="text-xs text-[#5c403c] mt-0.5">
                          Se programó la sesión práctica de orientación y cabuyería en el Bosquecillo del PUC para 32 scouts.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-[#f2f3ff]/60 p-3 rounded-lg border border-[#eaedff]">
                      <div className="w-8 h-8 rounded-full bg-[#e2e7ff] text-[#131b2e] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#131b2e]">
                            Revisión de Almacén de Campismo
                          </span>
                          <span className="text-[11px] text-[#5c403c]">19 Mar, 16:00</span>
                        </div>
                        <p className="text-xs text-[#5c403c] mt-0.5">
                          Inventario de 12 carpas canadienses, 4 hachas de mano y botiquín de primeros auxilios verificado y sellado.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progresión de Rama */}
                <div className="bg-white rounded-xl shadow-sm border border-[#eaedff] p-6 flex flex-col justify-between">
                  <div className="flex flex-col gap-1 pb-3 border-b border-[#eaedff]">
                    <span className="text-[11px] uppercase tracking-wider text-[#5c403c] font-bold">
                      Rendimiento Técnico
                    </span>
                    <h3 className="font-headline-sm text-base text-[#131b2e] font-bold">
                      Etapas de Progresión
                    </h3>
                    <p className="text-xs text-[#5c403c]">Avance global en Tropa Murray Dickson</p>
                  </div>

                  <div className="flex flex-col gap-3.5 my-4">
                    <div>
                      <div className="flex justify-between text-xs text-[#131b2e] mb-1">
                        <span>Pistas (Integración)</span>
                        <span className="font-bold">12 scouts (38%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#eaedff] overflow-hidden">
                        <div className="h-full bg-[#00682e] rounded-full" style={{ width: '38%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-[#131b2e] mb-1">
                        <span>Senda (Técnicas Básicas)</span>
                        <span className="font-bold">10 scouts (31%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#eaedff] overflow-hidden">
                        <div className="h-full bg-[#b70011] rounded-full" style={{ width: '31%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-[#131b2e] mb-1">
                        <span>Rumbo (Especialidades)</span>
                        <span className="font-bold">6 scouts (19%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#eaedff] overflow-hidden">
                        <div className="h-full bg-[#b02d29] rounded-full" style={{ width: '19%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-[#131b2e] mb-1">
                        <span>Travesía (Liderazgo)</span>
                        <span className="font-bold">4 scouts (12%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#eaedff] overflow-hidden">
                        <div
                          className="h-full bg-[#1a8340] rounded-full"
                          style={{ width: '12%' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 bg-[#f2f3ff] p-3 rounded-lg flex items-center justify-between text-[#131b2e] text-xs border border-[#eaedff]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="material-symbols-outlined text-[16px] text-[#00682e]">
                        military_tech
                      </span>
                      Cordón Scout de la Patria:
                    </span>
                    <span className="font-bold text-[#b70011]">1 candidato</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: GESTIÓN DE UNIDADES */}
          {/* ========================================================= */}
          {activeTab === 'unidades' && (
            <div className="bg-white rounded-xl shadow-sm border border-[#eaedff] p-6 flex flex-col gap-6 animate-in fade-in duration-150">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#eaedff] pb-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00682e] text-[24px]">
                      diversity_3
                    </span>
                    <h2 className="font-headline-md text-xl text-[#131b2e] font-extrabold">
                      Registro de Unidades y Control de Asistencia
                    </h2>
                  </div>
                  <p className="text-xs text-[#5c403c] mt-1">
                    Control nominal por ramas scout. Pase de lista oficial de la sesión ordinaria de sábado.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-lg bg-[#f2f3ff] text-xs text-[#131b2e] font-bold flex items-center gap-2 border border-[#eaedff]">
                    <span className="material-symbols-outlined text-[#00682e] text-[18px]">
                      how_to_reg
                    </span>
                    <span>
                      {presentScouts} de {totalScouts} Presentes • {attendancePct}% Asistencia
                    </span>
                  </span>
                </div>
              </div>

              {/* Selector de Ramas */}
              <div className="flex items-center gap-2 flex-wrap bg-[#f2f3ff] p-2 rounded-xl border border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBranch('manada');
                    onShowToast('Cambiando a registro de MANADA', 'pets');
                  }}
                  className={`px-3.5 py-2 rounded-lg flex items-center gap-2 text-xs transition-all cursor-pointer ${
                    selectedBranch === 'manada'
                      ? 'bg-white text-[#131b2e] font-bold shadow-sm ring-1 ring-amber-500'
                      : 'text-[#5c403c] hover:bg-white'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>🟡 Manada (Lobatos)</span>
                  <span className="text-[10px] bg-[#eaedff] px-1.5 py-0.5 rounded text-[#5c403c]">
                    24
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedBranch('tropa');
                    onShowToast('Mostrando registro activo de TROPA MURRAY DICKSON', 'hiking');
                  }}
                  className={`px-3.5 py-2 rounded-lg flex items-center gap-2 text-xs transition-all cursor-pointer ${
                    selectedBranch === 'tropa'
                      ? 'bg-white text-[#131b2e] font-bold shadow-sm ring-1 ring-[#00682e]'
                      : 'text-[#5c403c] hover:bg-white'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00682e]" />
                  <span>🟢 Tropa Murray Dickson</span>
                  <span className="text-[10px] bg-[#00682e] text-white px-1.5 py-0.5 rounded font-bold">
                    32
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedBranch('pioneros');
                    onShowToast('Cambiando a registro de PIONEROS', 'terrain');
                  }}
                  className={`px-3.5 py-2 rounded-lg flex items-center gap-2 text-xs transition-all cursor-pointer ${
                    selectedBranch === 'pioneros'
                      ? 'bg-white text-[#131b2e] font-bold shadow-sm ring-1 ring-[#b70011]'
                      : 'text-[#5c403c] hover:bg-white'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#b70011]" />
                  <span>🔴 Pioneros</span>
                  <span className="text-[10px] bg-[#eaedff] px-1.5 py-0.5 rounded text-[#5c403c]">
                    18
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedBranch('rovers');
                    onShowToast('Cambiando a registro de COMUNIDAD ROVER', 'navigation');
                  }}
                  className={`px-3.5 py-2 rounded-lg flex items-center gap-2 text-xs transition-all cursor-pointer ${
                    selectedBranch === 'rovers'
                      ? 'bg-white text-[#131b2e] font-bold shadow-sm ring-1 ring-[#831843]'
                      : 'text-[#5c403c] hover:bg-white'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#831843]" />
                  <span>🍷 Comunidad Rover</span>
                  <span className="text-[10px] bg-[#eaedff] px-1.5 py-0.5 rounded text-[#5c403c]">
                    11
                  </span>
                </button>
              </div>

              {/* Banner de Unidad */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#f2f3ff] text-xs border border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00682e]" />
                  <span className="font-bold text-[#131b2e]">
                    Mostrando nómina de: Tropa Murray Dickson (Edades 11 a 15 años)
                  </span>
                </div>
                <div className="text-[#5c403c] hidden sm:block">
                  Patrullas: Cóndores, Águilas, Lobos, Pumas
                </div>
              </div>

              {/* Tabla de Asistencia */}
              <div className="overflow-x-auto rounded-lg border border-[#eaedff]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f2f3ff] text-[#131b2e] text-[11px] uppercase tracking-wider font-bold">
                      <th className="py-3 px-4">Scout / Miembro</th>
                      <th className="py-3 px-4">Edad</th>
                      <th className="py-3 px-4">Patrulla</th>
                      <th className="py-3 px-4">Etapa Progresión</th>
                      <th className="py-3 px-4">Estado Asistencia</th>
                      <th className="py-3 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eaedff] text-xs">
                    {scouts.map((scout) => (
                      <tr key={scout.id} className="hover:bg-[#f2f3ff]/40 transition-colors">
                        <td className="py-3.5 px-4 flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#e2e7ff] text-[#131b2e] flex items-center justify-center font-bold text-xs">
                            {scout.initials}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-[#131b2e]">{scout.name}</span>
                            <span className="text-[11px] text-[#5c403c]">ID: {scout.code}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-[#131b2e]">{scout.age} años</td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#eaedff] text-xs text-[#131b2e] font-semibold">
                            <span className="material-symbols-outlined text-[14px] text-[#00682e]">
                              shield
                            </span>
                            {scout.patrol}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded ${scout.stageColor}`}
                          >
                            {scout.stage}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            type="button"
                            onClick={() => toggleAttendance(scout.id)}
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                              scout.present
                                ? 'bg-[#e7ffe5] text-[#005323] border border-[#79db8d]'
                                : 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ffb4ab]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              {scout.present ? 'check_circle' : 'cancel'}
                            </span>
                            <span>{scout.present ? 'Presente' : 'Ausente'}</span>
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              onShowToast(`Abriendo ficha individual de ${scout.name}`, 'badge')
                            }
                            className="p-1.5 rounded-lg hover:bg-[#eaedff] text-[#5c403c] transition-colors"
                            title="Ver ficha del scout"
                          >
                            <span className="material-symbols-outlined text-[18px]">badge</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Acciones Inferiores */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#f2f3ff] p-4 rounded-xl border border-[#eaedff]">
                <div className="flex items-center gap-2 text-[#5c403c] text-xs">
                  <span className="material-symbols-outlined text-[18px] text-[#00682e]">save</span>
                  <span>Los cambios de asistencia se guardan y sincronizan en la nube institucional.</span>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={handleExportAttendance}
                    className="px-4 py-2 rounded-lg bg-white hover:bg-[#eaedff] text-[#131b2e] text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#e2e7ff] shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span>Exportar Nómina</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveAttendance}
                    className="px-4 py-2 rounded-lg bg-[#b70011] text-white text-xs font-semibold hover:bg-[#dc2626] transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">done_all</span>
                    <span>Registrar Asistencia del Sábado</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: MICROPROGRAMAS */}
          {/* ========================================================= */}
          {activeTab === 'microprogramas' && (
            <div className="bg-white rounded-xl shadow-sm border border-[#eaedff] p-6 flex flex-col gap-6 animate-in fade-in duration-150">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#eaedff] pb-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="material-symbols-outlined text-[#b70011] text-[24px]">
                      event_available
                    </span>
                    <h2 className="font-headline-md text-xl text-[#131b2e] font-extrabold">
                      Planificación de Actividades: Sábado 22 de Marzo, 2025
                    </h2>
                    <span className="bg-[#1a8340] text-white text-[10px] px-2 py-0.5 rounded font-bold">
                      Estado: Aprobado
                    </span>
                  </div>
                  <p className="text-xs text-[#5c403c] mt-1">
                    Microprograma Oficial N° 08-2025 • Rama Tropa Scout Amerinst 301 • Lugar: Bosquecillo PUC
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() =>
                      onShowToast('Modo de edición activado para el Microprograma N° 08-2025', 'edit')
                    }
                    className="px-3.5 py-2 rounded-lg bg-[#b70011] text-white text-xs font-semibold hover:bg-[#dc2626] transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    <span>Editar Microprograma</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onShowToast('Descargando Microprograma Sábado 22 de Marzo (PDF)...', 'picture_as_pdf')
                    }
                    className="px-3.5 py-2 rounded-lg bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                    <span>Descargar en PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onShowToast('Microprograma verificado y firmado con sello de Jefatura Amerinst 301', 'verified')
                    }
                    className="px-3.5 py-2 rounded-lg bg-[#00682e] text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Aprobar por Jefatura</span>
                  </button>
                </div>
              </div>

              {/* Tema del Día & Objetivo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#f2f3ff] p-4 rounded-xl border border-[#eaedff] flex flex-col gap-1">
                  <span className="text-[11px] uppercase tracking-wider text-[#b70011] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">flag</span>
                    Tema del Día
                  </span>
                  <p className="font-headline-sm text-sm text-[#131b2e] font-bold mt-1">
                    "Técnicas de Campismo, Nudos y Pistas de Rastreo en Altura"
                  </p>
                  <span className="text-xs text-[#5c403c] mt-1">
                    Énfasis en destreza manual al aire libre, seguridad en senderos y observación andina.
                  </span>
                </div>

                <div className="bg-[#f2f3ff] p-4 rounded-xl border border-[#eaedff] flex flex-col gap-1">
                  <span className="text-[11px] uppercase tracking-wider text-[#00682e] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">target</span>
                    Objetivo Formativo
                  </span>
                  <p className="text-xs font-bold text-[#131b2e] mt-1">
                    "Reforzar el trabajo en equipo por patrullas y consolidar la progresión técnica en amarres y orientación con brújula."
                  </p>
                  <span className="text-xs text-[#5c403c] mt-1">
                    Evaluación para pase a segunda etapa de adelanto scout para 8 aspirantes.
                  </span>
                </div>
              </div>

              {/* Cronograma Horario */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline-sm text-sm text-[#131b2e] font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#b70011] text-[18px]">
                      schedule
                    </span>
                    Cronograma de Actividades por Horario
                  </h3>
                  <span className="text-xs text-[#5c403c]">Duración total: 3 Horas</span>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="bg-[#f2f3ff]/70 p-3.5 rounded-lg border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-[#e2e7ff] text-xs font-bold text-[#131b2e] whitespace-nowrap">
                        15:00 - 15:15
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#131b2e]">
                          Formación de Grupo, Izamiento del Pabellón Nacional y Oración Scout
                        </span>
                        <span className="text-[11px] text-[#5c403c]">
                          Lugar: Explanada de banderas • A cargo de Scouter de Servicio
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] bg-white text-[#5c403c] px-2.5 py-0.5 rounded-full border border-[#e2e7ff] w-fit">
                      15 min • Todo el Grupo
                    </span>
                  </div>

                  <div className="bg-[#f2f3ff]/70 p-3.5 rounded-lg border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-[#e2e7ff] text-xs font-bold text-[#131b2e] whitespace-nowrap">
                        15:15 - 15:45
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#131b2e]">
                          Inspección de Patrullas, Revisión de Bordones y Gritos de Patrulla
                        </span>
                        <span className="text-[11px] text-[#5c403c]">
                          Puntualidad, presentación del pañuelo Amerinst y espíritu de rincón
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] bg-[#e7ffe5] text-[#005323] px-2.5 py-0.5 rounded-full font-bold w-fit">
                      30 min • Guías de Patrulla
                    </span>
                  </div>

                  <div className="bg-[#f2f3ff]/70 p-3.5 rounded-lg border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-[#e2e7ff] text-xs font-bold text-[#131b2e] whitespace-nowrap">
                        15:45 - 16:30
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#131b2e]">
                          Gran Juego de Rastreo y Pistas naturales en el Bosquecillo
                        </span>
                        <span className="text-[11px] text-[#5c403c]">
                          Uso de signos de pista de madera, yeso natural y lectura de azimut
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] bg-[#ffdad6] text-[#410002] px-2.5 py-0.5 rounded-full font-bold w-fit">
                      45 min • Juego Amplio
                    </span>
                  </div>

                  <div className="bg-[#f2f3ff]/70 p-3.5 rounded-lg border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-[#e2e7ff] text-xs font-bold text-[#131b2e] whitespace-nowrap">
                        16:30 - 17:15
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#131b2e]">
                          Taller Práctico de Cabuyería: Nudos de anclaje y puente mono
                        </span>
                        <span className="text-[11px] text-[#5c403c]">
                          Amarre cuadrado, diagonal y ballestrinque doble con piolas de cáñamo
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] bg-[#eaedff] text-[#131b2e] px-2.5 py-0.5 rounded-full font-bold w-fit">
                      45 min • Técnica
                    </span>
                  </div>

                  <div className="bg-[#f2f3ff]/70 p-3.5 rounded-lg border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-[#e2e7ff] text-xs font-bold text-[#131b2e] whitespace-nowrap">
                        17:15 - 17:45
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#131b2e]">
                          Consejo de la Roca / Charla de 5 minutos del Scouter
                        </span>
                        <span className="text-[11px] text-[#5c403c]">
                          Tema: "La Ley Scout en el colegio y en la familia" • Evaluación del día
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] bg-white text-[#5c403c] px-2.5 py-0.5 rounded-full border border-[#e2e7ff] w-fit">
                      30 min • Reflexión
                    </span>
                  </div>

                  <div className="bg-[#f2f3ff]/70 p-3.5 rounded-lg border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-[#e2e7ff] text-xs font-bold text-[#131b2e] whitespace-nowrap">
                        17:45 - 18:00
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#131b2e]">
                          Arriamiento, Canción de Despedida y Círculo de Hermandad
                        </span>
                        <span className="text-[11px] text-[#5c403c]">
                          Arriamiento del pabellón boliviano y bandera scout 301 • Desconcentración
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] bg-white text-[#5c403c] px-2.5 py-0.5 rounded-full border border-[#e2e7ff] w-fit">
                      15 min • Cierre
                    </span>
                  </div>
                </div>
              </div>

              {/* Materiales Requeridos */}
              <div className="bg-[#f2f3ff] p-4 rounded-xl border border-[#eaedff] flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-wider text-[#5c403c] font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">handyman</span>
                  Materiales Requeridos para Intendencia
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 text-xs text-[#131b2e]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00682e] text-[16px]">
                      check_box
                    </span>
                    <span>12 piolas de cáñamo de 5 metros</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00682e] text-[16px]">
                      check_box
                    </span>
                    <span>4 brújulas de campo tipo Silva</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00682e] text-[16px]">
                      check_box
                    </span>
                    <span>1 Botiquín de urgencias de campamento</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: BIBLIOTECA DIGITAL */}
          {/* ========================================================= */}
          {activeTab === 'biblioteca' && (
            <div className="bg-white rounded-xl shadow-sm border border-[#eaedff] p-6 flex flex-col gap-6 animate-in fade-in duration-150">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#eaedff] pb-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#b70011] text-[24px]">
                      folder_shared
                    </span>
                    <h2 className="font-headline-md text-xl text-[#131b2e] font-extrabold">
                      Documentación Oficial, Reglamentos y Formatos
                    </h2>
                  </div>
                  <p className="text-xs text-[#5c403c] mt-1">
                    Repositorio normativo digital del Grupo Scout Amerinst 301 • Documentos vigentes 2025
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onShowToast('Abrir explorador para cargar nueva acta o circular oficial...', 'upload')
                  }
                  className="px-4 py-2 rounded-lg bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] text-xs font-semibold flex items-center gap-1.5 transition-colors self-start md:self-auto cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">upload_file</span>
                  <span>Subir Documento</span>
                </button>
              </div>

              {/* Buscador & Categorías */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#5c403c] text-[18px]">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchDocQuery}
                    onChange={(e) => setSearchDocQuery(e.target.value)}
                    placeholder="Buscar por título o código..."
                    className="w-full pl-9 pr-3 py-2 bg-[#f2f3ff] rounded-lg text-xs text-[#131b2e] border border-[#e2e7ff] placeholder-[#5c403c] focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:bg-white"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setDocsCategory('todos')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      docsCategory === 'todos'
                        ? 'bg-[#b70011] text-white shadow-sm'
                        : 'bg-[#f2f3ff] text-[#5c403c] hover:bg-[#eaedff]'
                    }`}
                  >
                    Todos ({INITIAL_DOCS.length})
                  </button>

                  <button
                    type="button"
                    onClick={() => setDocsCategory('administrativo')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      docsCategory === 'administrativo'
                        ? 'bg-[#b70011] text-white shadow-sm'
                        : 'bg-[#f2f3ff] text-[#5c403c] hover:bg-[#eaedff]'
                    }`}
                  >
                    Administrativo
                  </button>

                  <button
                    type="button"
                    onClick={() => setDocsCategory('tecnico')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      docsCategory === 'tecnico'
                        ? 'bg-[#b70011] text-white shadow-sm'
                        : 'bg-[#f2f3ff] text-[#5c403c] hover:bg-[#eaedff]'
                    }`}
                  >
                    Técnico
                  </button>

                  <button
                    type="button"
                    onClick={() => setDocsCategory('salud')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      docsCategory === 'salud'
                        ? 'bg-[#b70011] text-white shadow-sm'
                        : 'bg-[#f2f3ff] text-[#5c403c] hover:bg-[#eaedff]'
                    }`}
                  >
                    Salud
                  </button>
                </div>
              </div>

              {/* Grid de Documentos */}
              {filteredDocs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-white p-5 rounded-xl border border-[#eaedff] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 rounded-lg bg-[#e2e7ff] text-[#b70011] flex items-center justify-center">
                            <span className="material-symbols-outlined text-[28px]">
                              {doc.icon}
                            </span>
                          </div>
                          <span className="bg-[#f2f3ff] text-[#5c403c] text-xs px-2 py-0.5 rounded font-medium border border-[#eaedff]">
                            {doc.size}
                          </span>
                        </div>

                        <h3 className="font-headline-sm text-sm text-[#131b2e] font-bold mt-2">
                          {doc.title}
                        </h3>

                        <p className="text-xs text-[#5c403c] leading-relaxed">
                          {doc.description}
                        </p>

                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[11px] px-2 py-0.5 rounded font-semibold ${doc.categoryColor}`}>
                            {doc.categoryLabel}
                          </span>
                          <span className="text-[#5c403c] text-[11px]">{doc.rev}</span>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 bg-[#f2f3ff] p-2.5 rounded-lg flex items-center justify-between border border-[#eaedff]">
                        <span className="text-[11px] text-[#5c403c] truncate">
                          Oficial • Sede La Paz
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDownloadDoc(doc.title)}
                          className="w-8 h-8 rounded-full bg-[#b70011] hover:bg-[#dc2626] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer shrink-0"
                          title="Descargar documento"
                        >
                          <span className="material-symbols-outlined text-[18px]">download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-[#f2f3ff] rounded-xl border border-[#eaedff]">
                  <span className="material-symbols-outlined text-[#5c403c] text-[48px]">
                    search_off
                  </span>
                  <p className="font-headline-sm text-sm text-[#131b2e] mt-2 font-bold">
                    No se encontraron documentos
                  </p>
                  <p className="text-xs text-[#5c403c]">
                    Intenta buscar con otra palabra clave o limpia el filtro de categoría.
                  </p>
                </div>
              )}

              {/* Archivo Histórico Box */}
              <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e2e7ff] flex items-center justify-center text-[#b70011]">
                    <span className="material-symbols-outlined">inventory</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#131b2e]">
                      Archivo Histórico Amerinst 1912 - 2025
                    </span>
                    <span className="text-xs text-[#5c403c]">
                      113 años de tradición ininterrumpida custodiados en el Colegio Americano de La Paz.
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#5c403c] bg-white px-3 py-1 rounded shadow-sm border border-[#eaedff]">
                  Total en archivo: 48 volúmenes
                </span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
