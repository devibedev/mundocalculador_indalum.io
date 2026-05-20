/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Factory as FactoryIcon, 
  BookOpen, 
  Calculator, 
  DollarSign, 
  StickyNote, 
  Search as SearchIcon, 
  Trash2, 
  Plus, 
  Save as SaveIcon, 
  Download, 
  X,
  ChevronRight,
  ChevronDown,
  ClipboardList,
  AlertTriangle,
  Square,
  Printer,
  History,
  Moon,
  Sun,
  User as UserIcon,
  LogOut,
  Info,
  Package,
  Boxes,
  PlusCircle,
  CloudCheck
} from 'lucide-react';

import { AppProvider, useApp } from './context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

type ViewType = 'catalog' | 'calculator' | 'materials' | 'prices' | 'notes';

const AuthButton = () => {
  const { user, signIn, logout, authLoading, isAuthEnabled } = useApp();

  if (!isAuthEnabled) return null;

  if (authLoading) return <div className="h-8 w-8 animate-pulse bg-primary/10 rounded-full" />;

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <button 
          onClick={logout}
          className="flex items-center gap-2 px-2 py-1 border border-primary/20 rounded hover:bg-primary/5 transition-colors"
          title="Cerrar Sesión"
        >
          {user.photoURL ? (
            <img src={user.photoURL} alt="User" className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
          ) : (
            <UserIcon size={14} />
          )}
          <span className="text-[10px] font-bold uppercase hidden xs:block">{user.displayName?.split(' ')[0]}</span>
          <LogOut size={12} className="opacity-40" />
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={signIn}
      className="sketch-btn px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase flex items-center gap-2"
    >
      <UserIcon size={14} /> Acceder
    </button>
  );
};

const Layout: React.FC<{ children: React.ReactNode, currentView: ViewType, setView: (v: ViewType) => void }> = ({ children, currentView, setView }) => {
  const { darkMode, toggleDarkMode, lastDraftSave, error, setError } = useApp();

  return (
    <div className="min-h-screen pb-24 flex flex-col items-center">
      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full bg-red-600 text-white text-[10px] font-bold uppercase py-2 px-6 flex justify-between items-center z-[100]"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle size={14} />
              <span>ERROR DEL SISTEMA: {error}</span>
            </div>
            <button onClick={() => setError(null)} className="hover:opacity-70">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <header className="w-full sticky top-0 bg-surface border-b border-primary z-50 py-3 px-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <img 
            src="https://artifact.mural.co/v2/image-c0e86b4f-8b2b-4b2b-8b2b-8b2b8b2b8b2b.png" 
            alt="MundoCanceles Logo" 
            className="h-10 w-auto filter dark:invert dark:brightness-200"
          />
          <div className="flex flex-col hidden xs:flex">
            <h1 className="font-black text-lg tracking-tighter leading-none uppercase flex items-baseline gap-1">
              MUNDOCANCELES <span className="text-[10px] opacity-40 font-mono font-bold tracking-normal italic">PRO</span>
            </h1>
            <span className="text-[8px] font-bold opacity-30 leading-none uppercase">Cancelería de cristal templado</span>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <AuthButton />
          <button 
            onClick={toggleDarkMode}
            className="p-2 border border-primary/20 rounded-full hover:bg-primary/5 transition-colors"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="text-[10px] font-mono border border-primary px-1 opacity-50 hidden sm:block">V1.3.00</div>
        </div>
      </header>

      {/* Auto-save bit */}
      <AnimatePresence>
        {lastDraftSave && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            key={lastDraftSave}
            className="fixed top-20 right-4 z-[60] pointer-events-none"
          >
            <div className="bg-primary/10 backdrop-blur-sm border border-primary/20 px-2 py-1 rounded text-[8px] font-bold uppercase flex items-center gap-1.5 text-primary/60">
              <CloudCheck size={10} /> Borrador guardado {new Date(lastDraftSave).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full max-w-lg px-4 pt-6 flex-1">
        {children}
      </main>

      {/* Technical Ruler Decor */}
      <div className="fixed bottom-20 w-full max-w-lg h-4 border-t border-primary/20 flex items-end justify-between px-2 pointer-events-none opacity-20 hidden md:flex overflow-hidden">
        {Array.from({ length: 41 }).map((_, i) => (
          <div key={i} className={`w-px bg-primary ${i % 10 === 0 ? 'h-full' : i % 5 === 0 ? 'h-2/3' : 'h-1/3'}`} />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed bottom-0 w-full max-w-lg bg-surface border-t border-primary z-50 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center p-2">
          <NavButton active={currentView === 'catalog'} icon={<BookOpen />} label="Catálogo" onClick={() => setView('catalog')} />
          <NavButton active={currentView === 'calculator'} icon={<Calculator />} label="Cálculo" onClick={() => setView('calculator')} />
          <NavButton active={currentView === 'materials'} icon={<Package />} label="Mat." onClick={() => setView('materials')} />
          <NavButton active={currentView === 'prices'} icon={<DollarSign />} label="Precios" onClick={() => setView('prices')} />
          <NavButton active={currentView === 'notes'} icon={<StickyNote />} label="Notas" onClick={() => setView('notes')} />
        </div>
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean, icon: React.ReactNode, label: string, onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${active ? 'bg-primary text-white scale-110' : 'text-primary opacity-60'}`}
  >
    {React.cloneElement(icon as React.ReactElement, { size: 20 })}
    <span className="text-[9px] uppercase font-bold mt-1 tracking-widest">{label}</span>
  </button>
);

const CatalogView = () => {
  const { products, prices, addToCart } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'perfil' | 'herraje' | 'vidrio' | 'insumo'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = products.filter(p => 
    (filter === 'all' || p.tipo === filter) &&
    (p.codigo.toLowerCase().includes(search.toLowerCase()) || p.nombre.toLowerCase().includes(search.toLowerCase()) || p.serie?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Hero / Brand Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="sketch-border p-6 bg-white dark:bg-zinc-900 overflow-hidden relative border-double border-4"
      >
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-4">
            <img 
              src="https://artifact.mural.co/v2/image-c0e86b4f-8b2b-4b2b-8b2b-8b2b8b2b8b2b.png" 
              alt="MundoCanceles Logo" 
              className="h-16 w-auto filter dark:invert dark:brightness-200"
            />
            <div className="text-[9px] font-bold opacity-40 uppercase tracking-[0.3em] font-mono">// MUNDOCANCELES SISTEMAS</div>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter leading-none flex items-baseline gap-2 mt-4">
            INGENIERÍA <span className="text-sm not-italic opacity-60 font-mono underline decoration-primary decoration-4 lowercase">indalum</span>
          </h1>
          <p className="text-[10px] font-mono leading-tight opacity-60 max-w-[280px] uppercase">
            Plataforma de alta precisión para especificación de perfiles, despieces y herrajes arquitectónicos.
          </p>
        </div>
        
        {/* Abstract Background SVG Decor */}
        <div className="absolute right-0 bottom-0 top-0 w-2/3 opacity-[0.05] pointer-events-none overflow-hidden translate-x-12">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-primary">
            <rect x="5" y="5" width="90" height="90" fill="none" strokeWidth="0.8" />
            <line x1="5" y1="50" x2="95" y2="50" strokeWidth="0.3" strokeDasharray="3,3" />
            <line x1="50" y1="5" x2="50" y2="95" strokeWidth="0.3" strokeDasharray="3,3" />
            <path d="M5,5 L95,95 M95,5 L5,95" strokeWidth="0.2" />
            <circle cx="50" cy="50" r="40" fill="none" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="2" fill="currentColor" />
          </svg>
        </div>

        {/* Info Badge */}
        <div className="absolute top-4 right-4 text-[8px] font-bold opacity-40 flex flex-col items-end">
          <span>DWG REVISION v.1.04</span>
          <span>STAMPED: 18.05.2026</span>
        </div>
      </motion.div>

      <div className="sketch-border p-4 bg-white/50 space-y-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
          <input 
            type="text" 
            placeholder="[ BUSCAR CÓDIGO/NOMBRE/SERIE ]"
            className="sketch-input w-full pl-10 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {(['all', 'perfil', 'herraje', 'vidrio', 'insumo'] as const).map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[10px] px-3 py-1 font-bold whitespace-nowrap border border-primary uppercase ${filter === f ? 'bg-primary text-white' : 'bg-transparent'}`}
            >
              {f === 'all' ? 'Todos' : f === 'insumo' ? 'Insumos' : f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map(p => {
          const price = prices[p.codigo]?.unitPrice || 0;
          const isExpanded = expanded === p.codigo;
          
          return (
            <motion.div 
              layout
              key={p.codigo} 
              onClick={() => setExpanded(isExpanded ? null : p.codigo)}
              whileHover={!isExpanded ? { y: -2, x: 2 } : {}}
              className={`sketch-border p-4 bg-white/70 cursor-pointer overflow-hidden transition-all duration-300 group hover:shadow-[4px_4px_0px_rgba(22,23,23,0.1)] ${isExpanded ? 'ring-2 ring-primary bg-white' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg font-mono underline">{p.codigo}</h3>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="opacity-20 group-hover:opacity-100"
                    >
                      <ChevronDown size={14} />
                    </motion.div>
                  </div>
                  <p className="text-[10px] opacity-60 uppercase">{p.nombre}</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <div className="text-[10px] font-bold border border-primary px-1 mb-1">PÁG {p.pagina}</div>
                  {isExpanded && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-sm font-bold bg-primary text-white px-1 mt-1"
                    >
                      {price > 0 ? `$${price.toFixed(2)}` : 'S/P'}
                    </motion.div>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-primary/10 flex flex-col gap-4"
                  >
                    <div className="bg-amber-50 dark:bg-amber-900/10 p-2 border border-amber-200 dark:border-amber-900/30 rounded text-[9px] font-bold text-amber-800 dark:text-amber-200 uppercase tracking-tighter">
                      ESTIMACIÓN DE EJEMPLO: Los precios mostrados (Calculados por pieza de 6m + IVA) son ilustrativos y no representan valores comerciales vigentes.
                    </div>
                    <div className="flex gap-4">
                      {p.imagen && (
                        <div className="w-24 h-24 bg-primary/5 p-2 flex items-center justify-center shrink-0 border border-primary/5">
                          <img 
                            src={p.imagen} 
                            alt={p.nombre}
                            className="max-w-full max-h-full object-contain mix-blend-multiply"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <div className="flex-1 space-y-2 uppercase">
                        <div className="text-[10px] font-bold opacity-40">// DETALLES TÉCNICOS</div>
                        {p.serie && (
                          <div>
                            <span className="text-[9px] font-bold block opacity-60 tracking-tighter">SERIE</span>
                            <span className="text-xs font-mono font-bold">{p.serie}</span>
                          </div>
                        )}
                        {p.subtipo && (
                          <div>
                            <span className="text-[9px] font-bold block opacity-60 tracking-tighter">TIPO DE PIEZA</span>
                            <span className="text-xs font-mono">{p.subtipo}</span>
                          </div>
                        )}
                        {p.descripcion && (
                          <div className="normal-case">
                            <span className="text-[9px] font-bold block opacity-60 uppercase tracking-tighter">DESCRIPCIÓN</span>
                            <p className="text-[11px] font-mono leading-tight">{p.descripcion}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-[9px] font-bold block opacity-60 tracking-tighter">CATEGORÍA</span>
                          <span className="text-xs font-mono">{p.tipo}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({ codigo: p.codigo, cantidad: 1 });
                        }}
                        className="sketch-btn flex-1 bg-primary text-white text-[10px] py-2 flex items-center justify-center gap-2"
                      >
                        <Plus size={14} /> AGREGAR A LISTA
                      </button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="sketch-btn flex-1 bg-white text-primary text-[10px] py-2 flex items-center justify-center gap-2"
                      >
                        PLANO TÉCNICO
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
        {filtered.length === 0 && <div className="text-center py-10 opacity-40 text-xs uppercase italic tracking-widest">// Sin resultados</div>}
      </div>
    </div>
  );
};

const CalculatorView = () => {
  const { products, addToCart, cart, removeFromCart, saveProject, projects, loadProject, performDespiece, history, saveToHistory, setError } = useApp();
  const [serie, setSerie] = useState('');
  const [config, setConfig] = useState('X-O');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [selloAgua, setSelloAgua] = useState('');
  const [projName, setProjName] = useState('');
  const [inputErrors, setInputErrors] = useState<{width?: string, height?: string, serie?: string, selloAgua?: string}>({});
  
  // Hardware specific state
  const [selectedHerraje, setSelectedHerraje] = useState('');
  const [herrajeCant, setHerrajeCant] = useState('1');
  
  const validateInput = (name: 'width' | 'height' | 'serie' | 'selloAgua', value: string, currentWidth?: string, currentHeight?: string) => {
    if (name === 'serie') {
      if (!value) {
        setInputErrors(prev => ({ ...prev, serie: 'DEBE SELECCIONAR UNA SERIE' }));
      } else {
        setInputErrors(prev => {
          const next = { ...prev };
          delete next.serie;
          return next;
        });
      }
      return;
    }

    const num = parseFloat(value);
    if (value && (isNaN(num) || num <= 0)) {
      setInputErrors(prev => ({ ...prev, [name]: 'DEBE SER MAYOR A 0' }));
      return;
    }

    // Cross-field validation for Sello de Agua
    if (name === 'selloAgua' || name === 'width' || name === 'height') {
      const w = parseFloat(name === 'width' ? value : (currentWidth || width));
      const h = parseFloat(name === 'height' ? value : (currentHeight || height));
      const s = parseFloat(name === 'selloAgua' ? value : selloAgua);

      if (!isNaN(s) && !isNaN(w) && !isNaN(h)) {
        if (s >= w || s >= h) {
          setInputErrors(prev => ({ ...prev, selloAgua: 'DEBE SER MENOR A DIMENSIONES' }));
        } else {
          setInputErrors(prev => {
            const next = { ...prev };
            delete next.selloAgua;
            return next;
          });
        }
      }
    }

    if (name !== 'selloAgua' || (num > 0 && num < parseFloat(width) && num < parseFloat(height))) {
      setInputErrors(prev => {
        const next = { ...prev };
        if (name !== 'selloAgua') delete next[name];
        return next;
      });
    }
  };

  const handleSerieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSerie(val);
    validateInput('serie', val);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setWidth(val);
    validateInput('width', val, val, height);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHeight(val);
    validateInput('height', val, width, val);
  };

  const handleSelloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSelloAgua(val);
    validateInput('selloAgua', val);
  };

  const despiece = performDespiece(serie, config, parseFloat(width), parseFloat(height));

  const handleAddFull = () => {
    if (!width || !height) return;
    
    // Save to calculation history
    saveToHistory(serie, config, parseFloat(width), parseFloat(height));

    // Add main items to cart
    despiece.perfiles.forEach(p => {
      addToCart({
        codigo: p.codigo,
        nombre: p.descripcion,
        cantidad: p.cantidad,
        metros: p.longitud / 1000,
        esPorMetro: true,
        total: 0 // Will be recalculated or set by price
      });
    });

    despiece.herrajes.forEach(h => {
      addToCart({
        codigo: h.referencia,
        nombre: h.descripcion,
        cantidad: h.cantidad
      });
    });

    setWidth('');
    setHeight('');
    setSelloAgua('');
  };

  const reuseHistory = (entry: any) => {
    setSerie(entry.serie);
    setConfig(entry.config);
    setWidth(entry.width.toString());
    setHeight(entry.height.toString());
    setInputErrors({});
  };

  const total = cart.reduce((acc, curr) => acc + curr.total, 0);

  const exportToPDF = async () => {
    if (cart.length === 0) return;

    try {
      const [{ jsPDF }, { default: autoTable }] = await Promise.all([
        import('jspdf'),
        import('jspdf-autotable')
      ]);

      const doc = new jsPDF();
    const date = new Date().toLocaleDateString();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(22, 23, 23); // Primary color
    doc.text('MUNDOCANCELES PRO', 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Sistema de Ingeniería Indalum', 14, 28);
    doc.text(`Fecha: ${date}`, 14, 34);
    if (projName) {
      doc.text(`Proyecto: ${projName.toUpperCase()}`, 14, 40);
    }

    // Horizontal line
    doc.setDrawColor(22, 23, 23);
    doc.setLineWidth(0.5);
    doc.line(14, 45, 196, 45);

    // Table
    const tableData = cart.map(item => [
      item.codigo,
      item.nombre,
      item.cantidad,
      item.esPorMetro ? `${item.metros}m` : 'Pza',
      `$${item.precioUnitario.toFixed(2)}`,
      `$${item.total.toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: 50,
      head: [['Código', 'Descripción', 'Cant.', 'Unidad', 'P. Unitario', 'Total']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [22, 23, 23], textColor: [255, 255, 255] },
      styles: { fontSize: 8, font: 'helvetica' },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 15, halign: 'center' },
        3: { cellWidth: 15, halign: 'center' },
        4: { cellWidth: 25, halign: 'right' },
        5: { cellWidth: 25, halign: 'right' }
      }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;

    // Total
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`TOTAL ESTIMADO: $${total.toFixed(2)}`, 196, finalY, { align: 'right' });

    // Footer note
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(150);
    doc.text('* Este documento es una estimación técnica generada por MundoCanceles PRO.', 14, finalY + 15);
    doc.text('  Los precios y despieces deben ser validados físicamente.', 14, finalY + 20);

    doc.save(`Presupuesto_${projName || 'MundoCanceles'}_${date.replace(/\//g, '-')}.pdf`);
    } catch (err) {
      console.error("PDF Export failed:", err);
      setError("Error al generar el PDF. Intente de nuevo.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="print:hidden">
        <div className="sketch-border p-5 bg-white space-y-6 relative overflow-hidden">
          {/* Tech Decor for Calculator */}
          <div className="absolute top-0 right-0 p-4 opacity-[0.1] -rotate-12 translate-x-4">
            <Calculator size={80} />
          </div>

          <div className="relative z-10">
            <h2 className="font-bold text-sm border-b border-primary pb-1 inline-block uppercase tracking-widest">// CÁLCULO TÉCNICO (MundoCanceles)</h2>
            <p className="text-[9px] opacity-40 font-mono mt-1 px-1 bg-primary/5">SISTEMA DINÁMICO DE DESCUENTOS Y DESPIECE ARQUITECTÓNICO</p>
          </div>
          
          {despiece.alertas.length > 0 && (
            <div className="space-y-1">
              {despiece.alertas.map((a, i) => (
                <div key={i} className="bg-red-50 text-red-600 p-2 text-[10px] font-bold border border-red-200 uppercase flex items-center gap-2">
                  <AlertTriangle size={12} /> {a}
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6 p-4 bg-primary/5 border border-primary/10 relative">
              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-[8px] font-black opacity-30 font-mono">01</span>
                  <h3 className="text-[8px] font-black opacity-40 uppercase tracking-[0.2em]">CONFIGURACIÓN</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-[9px] font-bold uppercase block mb-1 opacity-60">Serie de Perfil</label>
                    <select 
                      className={`sketch-input w-full py-1.5 text-xs ${inputErrors.serie ? 'border-red-500' : ''}`} 
                      value={serie} 
                      onChange={handleSerieChange}
                    >
                      <option value="">-- SELECCIONE --</option>
                      <option value="2500">Euroalum 2500</option>
                      <option value="2800">Euroalum 2800</option>
                      <option value="3500">Euroalum 3500</option>
                      <option value="3800">Euroalum 3800</option>
                      <option value="4000">Euroalum 4000</option>
                      <option value="4500">Euroalum 4500</option>
                    </select>
                    {inputErrors.serie && <span className="text-[8px] text-red-600 font-bold block mt-1">{inputErrors.serie}</span>}
                  </div>
                  <div>
                    <label className="text-[9px] font-bold uppercase block mb-1 opacity-60">Operación</label>
                    <select className="sketch-input w-full py-1.5 text-xs" value={config} onChange={e => setConfig(e.target.value)}>
                      <option value="X-O">Corrediza X-O</option>
                      <option value="FIX">Fija</option>
                      <option value="BATIENTE">Ventana Batiente / Abatible</option>
                      <option value="PROYECCION">Ventana Proyección c/ Mosq.</option>
                      <option value="PUERTA">Puerta Comercial</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-[8px] font-black opacity-30 font-mono">02</span>
                  <h3 className="text-[8px] font-black opacity-40 uppercase tracking-[0.2em]">ESPECIFICACIONES</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-[9px] font-bold uppercase block mb-1 opacity-60">Ancho (mm)</label>
                    <input 
                      type="number" 
                      className={`sketch-input w-full py-1.5 text-sm font-mono text-center ${inputErrors.width ? 'border-red-500' : ''}`} 
                      placeholder="WIDTH" 
                      value={width} 
                      onChange={handleWidthChange} 
                    />
                    {inputErrors.width && <span className="text-[8px] text-red-600 font-bold block mt-1">{inputErrors.width}</span>}
                  </div>
                  <div>
                    <label className="text-[9px] font-bold uppercase block mb-1 opacity-60">Alto (mm)</label>
                    <input 
                      type="number" 
                      className={`sketch-input w-full py-1.5 text-sm font-mono text-center ${inputErrors.height ? 'border-red-500' : ''}`} 
                      placeholder="HEIGHT" 
                      value={height} 
                      onChange={handleHeightChange} 
                    />
                    {inputErrors.height && <span className="text-[8px] text-red-600 font-bold block mt-1">{inputErrors.height}</span>}
                  </div>
                  <div>
                    <label className="text-[9px] font-bold uppercase block mb-1 opacity-60">Sello de Agua (mm)</label>
                    <input 
                      type="number" 
                      className={`sketch-input w-full py-1.5 text-sm font-mono text-center ${inputErrors.selloAgua ? 'border-red-500' : ''}`} 
                      placeholder="SELLO" 
                      value={selloAgua} 
                      onChange={handleSelloChange} 
                    />
                    {inputErrors.selloAgua && <span className="text-[8px] text-red-600 font-bold block mt-1">{inputErrors.selloAgua}</span>}
                  </div>
                </div>
              </div>
            </div>

            <button 
              disabled={despiece.alertas.length > 0 || !width || !height || !serie || Object.keys(inputErrors).length > 0}
              onClick={handleAddFull}
              className={`sketch-btn w-full bg-primary text-white flex items-center justify-center gap-3 py-3 ${despiece.alertas.length > 0 || !serie || Object.keys(inputErrors).length > 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary/90'}`}
            >
              <Calculator size={18} /> 
              <span className="tracking-widest">GENERAR INGENIERÍA Y AGREGAR</span>
            </button>
          </div>
        </div>

        {width && height && !Object.keys(inputErrors).length && (
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="sketch-border p-6 bg-white overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-4 border-b border-primary/10 pb-2">
                <Square size={14} className="opacity-40" />
                <h3 className="text-[10px] font-black uppercase tracking-widest">Vista Previa Estructural</h3>
              </div>
              
              <div className="flex items-center justify-center min-h-[300px] relative bg-primary/5 border border-primary/5 py-8">
                <div className="absolute inset-0 blueprint-grid opacity-[0.05]" />
                <div className="relative border-2 border-primary/40 flex items-center justify-center bg-white/50" style={{ 
                  width: Math.min(240, parseFloat(width) / 8), 
                  height: Math.min(240, parseFloat(height) / 8),
                  aspectRatio: `${width}/${height}` 
                }}>
                  {config === 'X-O' && (
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 border-r border-primary/20 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full border border-primary/20" />
                        <span className="text-[8px] absolute top-2 left-2 opacity-30 font-bold">X</span>
                      </div>
                      <div className="w-1/2 flex items-center justify-center">
                        <span className="text-[8px] absolute top-2 right-2 opacity-30 font-bold">O</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute -top-6 left-0 right-0 text-center text-[10px] font-mono font-bold text-primary">
                    {width}mm
                  </div>
                  <div className="absolute -left-12 top-0 bottom-0 flex items-center justify-center text-[10px] font-mono font-bold [writing-mode:vertical-rl] rotate-180 text-primary">
                    {height}mm
                  </div>
                </div>
              </div>
            </motion.div>

            {despiece.perfiles.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="sketch-border p-4 bg-white/80 space-y-3"
              >
                <div className="text-[9px] font-bold opacity-40 border-b border-primary/10 pb-1 uppercase tracking-widest">// DESGLOSE DE CORTES ESTIMADOS</div>
                <div className="grid grid-cols-1 gap-1">
                  {despiece.perfiles.map((p, i) => (
                    <div key={i} className="flex justify-between text-[10px] font-mono p-1 hover:bg-primary/5">
                      <span className="opacity-60">{p.descripcion}</span>
                      <span className="font-bold">{p.cantidad}pz x {p.longitud.toFixed(0)}mm</span>
                    </div>
                  ))}
                  <div className="pt-2 mt-2 border-t border-primary/10 flex justify-between text-[10px] font-bold text-primary">
                    <span className="uppercase tracking-tighter">ÁREA VIDRIO (APROX)</span>
                    <span className="font-mono">{despiece.vidrio.ancho.toFixed(0)} x {despiece.vidrio.alto.toFixed(0)} mm</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Manual Hardware Section - Separated */}
        <div className="sketch-border p-5 bg-zinc-50 dark:bg-white/5 space-y-4">
          <div className="flex items-center gap-2 border-b border-primary/10 pb-2">
            <Plus size={14} className="opacity-40" />
            <h3 className="text-[10px] font-black uppercase tracking-widest">Adición de Herraje Manual</h3>
          </div>
          
          <div className="grid grid-cols-5 gap-3 items-end">
            <div className="col-span-3">
              <label className="text-[9px] font-bold uppercase block mb-1 opacity-60">Seleccionar Herraje</label>
              <select 
                className="sketch-input w-full py-1.5 text-xs bg-white dark:bg-black/20" 
                value={selectedHerraje} 
                onChange={e => setSelectedHerraje(e.target.value)}
              >
                <option value="">-- BUSCAR HERRAJE --</option>
                {products.filter(p => p.tipo === 'herraje').map(p => (
                  <option key={p.codigo} value={p.codigo}>{p.codigo} - {p.nombre}</option>
                ))}
              </select>
            </div>
            <div className="col-span-1">
              <label className="text-[9px] font-bold uppercase block mb-1 opacity-60">Cant.</label>
              <input 
                type="number" 
                className="sketch-input w-full py-1.5 text-center text-xs bg-white dark:bg-black/20" 
                min="1" 
                value={herrajeCant} 
                onChange={e => setHerrajeCant(e.target.value)} 
              />
            </div>
            <div className="col-span-1">
              <button 
                disabled={!selectedHerraje}
                onClick={() => {
                  addToCart({ codigo: selectedHerraje, cantidad: parseInt(herrajeCant) || 1 });
                  setSelectedHerraje('');
                  setHerrajeCant('1');
                }}
                className={`sketch-btn w-full py-1.5 bg-primary text-white flex items-center justify-center ${!selectedHerraje ? 'opacity-30' : 'hover:scale-[1.02]'}`}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
          <p className="text-[8px] opacity-40 italic mt-1 font-mono uppercase tracking-tighter">
            * Use esta sección para agregar elementos adicionales que no forman parte del despiece automático.
          </p>
        </div>


        {/* CÁLCULO HISTORY SECTION */}
        <div className="sketch-border p-4 bg-white/40 space-y-3 mt-4">
          <div className="flex items-center gap-2 border-b border-primary/10 pb-1">
            <History size={14} className="opacity-40" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest">Últimos Cálculos</h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {history.map(entry => (
              <div 
                key={entry.id} 
                onClick={() => reuseHistory(entry)}
                className="shrink-0 w-32 p-2 bg-white border border-primary/20 sketch-border cursor-pointer hover:bg-primary/5 transition-colors"
              >
                <div className="text-[8px] font-bold opacity-30">{new Date(entry.fecha).toLocaleDateString()}</div>
                <div className="text-[9px] font-bold truncate">SERIE {entry.serie}</div>
                <div className="text-[9px] font-mono">{entry.width}x{entry.height}</div>
                <div className="text-[7px] uppercase mt-1 opacity-60">REUTILIZAR</div>
              </div>
            ))}
            {history.length === 0 && <div className="text-[9px] opacity-30 italic py-2">Sin historial de cálculos</div>}
          </div>
        </div>
      </div>

      <div className="sketch-border p-5 bg-white space-y-4 shadow-lg">
        <h2 className="font-bold text-sm border-b border-primary pb-1 inline-block uppercase tracking-widest">// DESPIECE ACTUAL</h2>
        <div className="space-y-3 min-h-[100px]">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center border-b border-black/5 pb-2">
              <div className="text-[11px] leading-tight uppercase font-mono">
                <span className="font-bold">{item.codigo}</span> - {item.nombre}<br/>
                <span className="opacity-50 lowercase text-[9px]">
                  {item.esPorMetro ? (
                    <>
                      {item.cantidad}pz x {item.metros}m {item.kerfIncluded && <span className="font-bold text-primary italic">+4mm kerf</span>}
                    </>
                  ) : `${item.cantidad}pz`} @ ${item.precioUnitario.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-xs">${item.total.toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)} className="text-primary opacity-50 hover:opacity-100">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <div className="text-center py-12 space-y-4">
              <div className="flex justify-center opacity-10">
                <ClipboardList size={64} strokeWidth={1} />
              </div>
              <div className="text-[10px] font-mono italic opacity-30 uppercase tracking-widest">
                // ESPERANDO DATOS DE INGENIERÍA<br/>
                SIN ELEMENTOS PARA PROCESAR
              </div>
              <div className="flex justify-center gap-1 opacity-10">
                <div className="w-1 h-1 bg-primary rounded-full" />
                <div className="w-1 h-1 bg-primary rounded-full" />
                <div className="w-1 h-1 bg-primary rounded-full" />
              </div>
            </div>
          )}
        </div>
        
        <div className="pt-4 border-t-2 border-primary flex justify-between items-end">
          <div className="text-[10px] font-bold uppercase opacity-60">TOTAL ESTIMADO</div>
          <div className="text-3xl font-bold font-mono tracking-tighter">${total.toFixed(2)}</div>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <input 
            type="text" 
            placeholder="NOMBRE DEL PROYECTO" 
            className="sketch-input w-full text-xs"
            value={projName}
            onChange={(e) => setProjName(e.target.value)}
          />
          <div className="flex gap-2">
            <button 
              disabled={cart.length === 0 || !projName}
              onClick={() => { saveProject(projName); setProjName(''); }}
              className={`sketch-btn flex-1 flex items-center justify-center gap-2 ${cart.length === 0 || !projName ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              <SaveIcon size={18} /> GUARDAR
            </button>
            <button 
              disabled={cart.length === 0}
              onClick={exportToPDF}
              className={`sketch-btn flex-1 bg-white border-2 border-primary text-primary flex items-center justify-center gap-2 ${cart.length === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              <Download size={18} /> EXPORTAR PDF
            </button>
          </div>
        </div>
      </div>

      <div className="sketch-border p-5 bg-white/30 space-y-4">
        <h2 className="font-bold text-sm border-b border-primary pb-1 inline-block uppercase tracking-widest">// HISTORIAL</h2>
        <div className="space-y-3">
          {projects.map(p => (
            <div key={p.id} className="p-3 border border-primary/20 bg-white/50 flex justify-between items-center">
              <div className="text-[10px] uppercase font-mono">
                <div className="font-bold">{p.nombre}</div>
                <div className="opacity-50">{new Date(p.fecha).toLocaleDateString()}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-xs">${p.total.toFixed(2)}</span>
                <button onClick={() => loadProject(p)} className="p-1 border border-primary hover:bg-primary hover:text-white">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <div className="text-center py-4 opacity-30 text-[10px] italic tracking-widest">// SIN ARCHIVOS</div>}
        </div>
      </div>
    </div>
  );
};

const MaterialsView = () => {
  const { cart, products, prices, addToCart, removeFromCart, setError } = useApp();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [manualQty, setManualQty] = useState('1');
  const [search, setSearch] = useState('');

  const total = cart.reduce((acc, curr) => acc + curr.total, 0);

  const exportMaterialsPDF = async () => {
    if (cart.length === 0) return;

    try {
      const [{ jsPDF }, { default: autoTable }] = await Promise.all([
        import('jspdf'),
        import('jspdf-autotable')
      ]);

      const doc = new jsPDF();
    const date = new Date().toLocaleDateString();
    
    doc.setFontSize(20);
    doc.text('LISTADO DE MATERIALES - BOM', 14, 20);
    doc.setFontSize(10);
    doc.text(`Fecha: ${date}`, 14, 28);
    doc.line(14, 32, 196, 32);

    const tableData = cart.map(item => [
      item.codigo,
      item.nombre,
      item.cantidad,
      item.esPorMetro ? `${item.metros}m` : 'Pza',
      `$${item.total.toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: 40,
      head: [['Código', 'Descripción', 'Cant.', 'Unidad', 'Importe']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [22, 23, 23] },
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`COSTO TOTAL ESTIMADO: $${total.toFixed(2)}`, 196, finalY, { align: 'right' });

    doc.save(`Materiales_${date}.pdf`);
    } catch (err) {
      console.error("BOM Export failed:", err);
      setError("Error al generar el listado de materiales.");
    }
  };

  const filteredProducts = products.filter(p => 
    p.codigo.toLowerCase().includes(search.toLowerCase()) || 
    p.nombre.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 5);

  return (
    <div className="space-y-6 pb-20">
      <div className="sketch-border p-5 bg-white space-y-4">
        <div className="flex justify-between items-center border-b border-primary pb-2">
          <h2 className="font-bold text-sm uppercase tracking-widest flex items-center gap-2">
            <Package size={18} /> Detalle de Materiales
          </h2>
          <button 
            disabled={cart.length === 0}
            onClick={exportMaterialsPDF}
            className={`p-2 border border-primary/20 rounded hover:bg-primary/5 transition-all ${cart.length === 0 ? 'opacity-20' : ''}`}
            title="Exportar Materiales"
          >
            <Download size={18} />
          </button>
        </div>

        {/* Manual Add Form */}
        <div className="bg-primary/5 p-4 sketch-border space-y-3">
          <div className="text-[10px] font-bold uppercase opacity-60 flex items-center gap-2">
            <PlusCircle size={14} /> Agregar Material Manualmente
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-8 relative">
              <input 
                type="text" 
                placeholder="BUSCAR CÓDIGO/NOMBRE..." 
                className="sketch-input w-full text-xs pr-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <div className="absolute top-full left-0 w-full bg-white border border-primary/20 shadow-xl z-10">
                  {filteredProducts.map(p => (
                    <div 
                      key={p.codigo}
                      className="p-2 text-[10px] hover:bg-primary/5 cursor-pointer border-b border-black/5 last:border-0 truncate"
                      onClick={() => {
                        setSelectedProduct(p.codigo);
                        setSearch(p.codigo + " - " + p.nombre);
                      }}
                    >
                      <span className="font-bold">{p.codigo}</span> - {p.nombre}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col-span-2">
              <input 
                type="number" 
                className="sketch-input w-full text-xs text-center" 
                value={manualQty}
                onChange={e => setManualQty(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <button 
                onClick={() => {
                  const p = products.find(prod => search.startsWith(prod.codigo));
                  if (p) {
                    addToCart({ codigo: p.codigo, cantidad: parseFloat(manualQty) || 1 });
                    setSearch('');
                    setManualQty('1');
                  }
                }}
                className="sketch-btn w-full h-full bg-primary text-white flex items-center justify-center"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-3 pt-2">
          {cart.length === 0 ? (
            <div className="text-center py-12 opacity-30 text-[10px] italic uppercase tracking-widest font-mono">
              [ Carrito vacío ]
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-center p-3 border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="font-mono text-[11px] uppercase">
                  <div className="font-black flex items-center gap-2">
                    {item.tipo === 'perfil' ? <Boxes size={12} className="opacity-40" /> : <Package size={12} className="opacity-40" />}
                    {item.codigo}
                  </div>
                  <div className="opacity-60 text-[9px]">{item.nombre}</div>
                  <div className="text-[9px] mt-1">
                    <span className="bg-primary/10 px-1 font-bold">{item.cantidad} {item.esPorMetro ? 'MTS' : 'PZ'}</span>
                    <span className="mx-2 opacity-30">|</span>
                    <span className="opacity-60">${item.precioUnitario.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-[10px] font-bold tracking-tighter">${item.total.toFixed(2)}</div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-primary/40 hover:text-primary transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="pt-6 border-t-2 border-primary flex justify-between items-center">
            <div className="font-mono">
              <div className="text-[8px] font-bold opacity-40 uppercase tracking-widest italic">Inversión Estimada</div>
              <div className="text-xl font-black">${total.toFixed(2)}</div>
            </div>
            <button 
              onClick={exportMaterialsPDF}
              className="sketch-btn px-4 bg-primary text-white text-[10px] font-bold flex items-center gap-2"
            >
              <Download size={16} /> TODO EL BOM
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-primary/5 text-[9px] uppercase border-l-4 border-primary italic">
        * Esta vista permite gestionar el inventario final y agregar herrajes o insumos faltantes de forma manual.
      </div>
    </div>
  );
};

const PricesView = () => {
  const { products, prices, updatePrice, setError } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'perfil' | 'herraje' | 'vidrio' | 'insumo'>('all');

  const filtered = products.filter(p => 
    (filter === 'all' || p.tipo === filter) &&
    (p.codigo.toLowerCase().includes(search.toLowerCase()) || 
     p.nombre.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="sketch-border p-4 bg-white/50 space-y-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
          <input 
            type="text" 
            placeholder="[ BUSCAR POR CÓDIGO O NOMBRE ]"
            className="sketch-input w-full pl-10 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {(['all', 'perfil', 'herraje', 'vidrio', 'insumo'] as const).map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[9px] px-3 py-1 font-bold whitespace-nowrap border border-primary uppercase ${filter === f ? 'bg-primary text-white' : 'bg-transparent'}`}
            >
              {f === 'all' ? 'Todos' : f === 'insumo' ? 'Insumos' : f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {filtered.map(p => {
          const info = prices[p.codigo] || { unitPrice: 0, type: 'unit' };
          return (
            <div key={p.codigo} className="sketch-border p-4 bg-white flex flex-col gap-3">
              <div className="flex justify-between items-start uppercase">
                <div className="font-mono">
                  <h3 className="font-bold text-sm tracking-tighter">{p.codigo}</h3>
                  <p className="text-[9px] opacity-40">{p.nombre}</p>
                </div>
                {info.lastUpdated && <div className="text-[8px] opacity-30">ACT: {new Date(info.lastUpdated).toLocaleDateString()}</div>}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold">$</span>
                  <input 
                    type="number" 
                    min="0"
                    step="0.01"
                    className="sketch-input w-full pl-6 py-1 text-sm font-mono"
                    defaultValue={info.unitPrice || ''}
                    onBlur={(e) => {
                      const val = parseFloat(e.target.value);
                      if (val < 0) {
                        setError("El precio no puede ser negativo");
                        e.target.value = info.unitPrice.toString();
                        return;
                      }
                      updatePrice(p.codigo, val || 0, info.type);
                    }}
                  />
                </div>
                <select 
                  className="sketch-input py-1 text-[10px] font-bold"
                  value={info.type}
                  onChange={(e) => updatePrice(p.codigo, info.unitPrice, e.target.value as 'unit' | 'meter')}
                >
                  <option value="unit">PZ</option>
                  <option value="meter">MT</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-amber-50 dark:bg-amber-900/10 p-4 border border-amber-200 dark:border-amber-900/30 rounded text-[10px] space-y-2 uppercase">
        <p className="font-black text-amber-800 dark:text-amber-200 opacity-60 flex items-center gap-2">
          <Info size={14} /> AVISO IMPORTANTE SOBRE PRECIOS
        </p>
        <p className="font-mono opacity-60 leading-tight">
          Los precios listados son <span className="underline decoration-primary decoration-2 font-bold">ESTIMACIONES DE EJEMPLO</span> basadas en valores promedio (Pesos Mexicanos + IVA por pieza de 6 metros). 
          No son valores reales ni vinculantes. La plataforma sincroniza estas bases con su cuenta, pero deben ser validadas con un distribuidor oficial.
        </p>
      </div>
      <div className="p-4 bg-primary/5 text-[9px] uppercase border-l-4 border-primary italic">
        * Los precios se sincronizan automáticamente con su cuenta de Google.
      </div>
    </div>
  );
};

const NotesView = () => {
  const { notes, addNote, deleteNote } = useApp();
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (!content.trim()) return;
    addNote(content);
    setContent('');
  };

  return (
    <div className="space-y-6">
      <div className="sketch-border p-5 bg-white/50 space-y-4">
        <h2 className="font-bold text-sm border-b border-primary pb-1 inline-block uppercase tracking-widest">// NUEVA NOTA</h2>
        <textarea 
          className="sketch-input w-full h-32 text-sm resize-none" 
          placeholder="Escriba dimensiones, recordatorios o notas de armado..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button 
          onClick={handleSave}
          className="sketch-btn w-full bg-primary text-white flex items-center justify-center gap-2"
        >
          <StickyNote size={18} /> GUARDAR NOTA
        </button>
      </div>

      <div className="space-y-4">
        {notes.map(n => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={n.id} 
            className="sketch-border p-4 bg-white relative group"
          >
            <div className="flex justify-between border-b border-primary/10 pb-2 mb-3">
              <span className="text-[9px] font-bold opacity-30 font-mono italic">{new Date(n.fecha).toLocaleString()}</span>
              <button onClick={() => deleteNote(n.id)} className="text-primary opacity-20 hover:opacity-100 transition-opacity">
                <Trash2 size={12} />
              </button>
            </div>
            <p className="text-xs leading-relaxed font-mono whitespace-pre-wrap">{n.content}</p>
          </motion.div>
        ))}
        {notes.length === 0 && <div className="text-center py-10 opacity-30 text-[10px] tracking-[0.2em] uppercase italic">// No hay documentos</div>}
      </div>
    </div>
  );
};

const MainApp = () => {
  const [view, setView] = useState<ViewType>('catalog');

  // Register Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('SW registered: ', registration);
        }).catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
      });
    }
  }, []);

  return (
    <Layout currentView={view} setView={setView}>
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="animate-view"
        >
          {view === 'catalog' && <CatalogView />}
          {view === 'calculator' && <CalculatorView />}
          {view === 'materials' && <MaterialsView />}
          {view === 'prices' && <PricesView />}
          {view === 'notes' && <NotesView />}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
