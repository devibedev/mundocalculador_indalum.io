export interface Product {
  codigo: string;
  nombre: string;
  tipo: 'perfil' | 'herraje' | 'vidrio' | 'insumo';
  subtipo?: string;
  serie?: string;
  descripcion?: string;
  pagina?: number;
  imagen?: string;
}

export interface PriceData {
  unitPrice: number;
  type: 'unit' | 'meter';
  lastUpdated?: string;
}

export interface CartItem {
  id: string;
  codigo: string;
  nombre: string;
  tipo: string;
  cantidad: number;
  metros: number | null;
  esPorMetro: boolean;
  precioUnitario: number;
  total: number;
  kerfIncluded?: boolean;
}

export interface Project {
  id: number;
  nombre: string;
  fecha: string;
  items: CartItem[];
  total: number;
}

export interface AppNote {
  id: number;
  content: string;
  fecha: string;
}

export interface CalculationHistory {
  id: string;
  fecha: string;
  serie: string;
  config: string;
  width: number;
  height: number;
}

export const INITIAL_PRODUCTS: Product[] = [
  // --- SERIE 2500 (Básica Europea - Corte 45°) ---
  { codigo: "1677", nombre: "MARCO VENTANA", tipo: "perfil", serie: "2500", subtipo: "marco", descripcion: "Marco de ventana Serie 2500.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "1678", nombre: "HOJA VENTANA", tipo: "perfil", serie: "2500", subtipo: "hoja", descripcion: "Hoja de ventana Serie 2500.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "1693", nombre: "JUNQUILLO DUO 25MM", tipo: "perfil", serie: "2500", subtipo: "junquillo", descripcion: "Junquillo para Serie 2500.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "1695", nombre: "RIEL DOBLE 2500", tipo: "perfil", serie: "2500", subtipo: "riel", descripcion: "Riel doble para corrediza.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "1694", nombre: "RIEL TRIPLE", tipo: "perfil", serie: "2500", subtipo: "riel", descripcion: "Riel triple para corrediza.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "1699", nombre: "HOJA CORREDIZA 2500", tipo: "perfil", serie: "2500", subtipo: "hoja", descripcion: "Hoja para ventana corrediza.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "1612", nombre: "MOSQUITERO 2500", tipo: "perfil", serie: "2500", subtipo: "mosquitero", descripcion: "Perfil para mosquitero.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "1619", nombre: "ADAPTADOR TRASLAPE", tipo: "perfil", serie: "2500", subtipo: "traslape", descripcion: "Adaptador de traslape.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "1675", nombre: "MARCO CON MOSQUITERO", tipo: "perfil", serie: "2500", subtipo: "marco", descripcion: "Marco para ventana con espacio para mosquitero.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "1667", nombre: "JUNQUILLO REDONDO DUO", tipo: "perfil", serie: "2500", subtipo: "junquillo", descripcion: "Junquillo redondeado para doble acristalamiento.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "2057", nombre: "MOSQUITERO 2500", tipo: "perfil", serie: "2500", subtipo: "mosquitero", descripcion: "Perfil de mosquitero para marco 1675.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },

  // --- SERIE 2800 (Corrediza 90° - Básica) ---
  { codigo: "12150", nombre: "RIEL INFERIOR", tipo: "perfil", serie: "2800", subtipo: "riel", descripcion: "Riel inferior Serie 2800.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "12151", nombre: "RIEL SUPERIOR", tipo: "perfil", serie: "2800", subtipo: "riel", descripcion: "Riel superior Serie 2800.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "12152", nombre: "JAMBA 2800", tipo: "perfil", serie: "2800", subtipo: "jamba", descripcion: "Jamba lateral Serie 2800.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "12153", nombre: "ZOCLO 2800", tipo: "perfil", serie: "2800", subtipo: "zoclo", descripcion: "Zoclo de hoja Serie 2800.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "12154", nombre: "CERCO 2800", tipo: "perfil", serie: "2800", subtipo: "cerco", descripcion: "Cerco lateral Serie 2800.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "12155", nombre: "TRASLAPE 2800", tipo: "perfil", serie: "2800", subtipo: "traslape", descripcion: "Traslape Serie 2800.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },

  // --- SERIE 3500 ---
  { codigo: "2273", nombre: "CONTRAMARCO 3500", tipo: "perfil", serie: "3500", subtipo: "marco", descripcion: "Contramarco Serie 3500.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "2279", nombre: "ZOCLO RESIDENCIAL", tipo: "perfil", serie: "3500", subtipo: "zoclo", descripcion: "Zoclo para puerta residencial.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "2221", nombre: "JUNQUILLO REDONDO", tipo: "perfil", serie: "3500", subtipo: "junquillo", descripcion: "Junquillo redondeado.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },

  // --- SERIE 3800 / 3900 (Alto Desempeño 90°) ---
  { codigo: "12208", nombre: "JAMBA 3800/3900", tipo: "perfil", serie: "3800", subtipo: "jamba", descripcion: "Jamba lateral reforzada.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "12245", nombre: "ZOCLO Y CABEZAL P.", tipo: "perfil", serie: "3800", subtipo: "zoclo", descripcion: "Zoclo y cabezal de puerta.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "12290", nombre: "CERCO PUERTA", tipo: "perfil", serie: "3800", subtipo: "cerco", descripcion: "Cerco de puerta.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "12299", nombre: "TRASLAPE PUERTA", tipo: "perfil", serie: "3800", subtipo: "traslape", descripcion: "Traslape de puerta.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "12301", nombre: "GOTERÓN", tipo: "perfil", serie: "3800", subtipo: "goteron", descripcion: "Goterón de protección.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "12302", nombre: "RIEL DOBLE 3800", tipo: "perfil", serie: "3800", subtipo: "riel", descripcion: "Riel doble reforzado.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "12303", nombre: "RIEL DOBLE 3900", tipo: "perfil", serie: "3900", subtipo: "riel", descripcion: "Riel doble reforzado Serie 3900.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "12307", nombre: "ZOCLO Y CABEZAL 3900", tipo: "perfil", serie: "3900", subtipo: "zoclo", descripcion: "Zoclo y cabezal de puerta Serie 3900.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },

  // --- SERIE 4000 (Premium - Oscilobatiente / Corrediza) ---
  { codigo: "2314", nombre: "RIEL DOBLE 4000", tipo: "perfil", serie: "4000", subtipo: "riel", descripcion: "Riel doble Serie 4000.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "2297", nombre: "HOJA VENTANA 4000", tipo: "perfil", serie: "4000", subtipo: "hoja", descripcion: "Hoja de ventana Serie 4000.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "2276", nombre: "ADAP. TRASLAPE 4000", tipo: "perfil", serie: "4000", subtipo: "traslape", descripcion: "Adaptador de traslape 4000.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "2302", nombre: "MARCO 4000", tipo: "perfil", serie: "4000", subtipo: "marco", descripcion: "Marco perimetral Serie 4000.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "2301", nombre: "HOJA AP. EXT. 4000", tipo: "perfil", serie: "4000", subtipo: "hoja", descripcion: "Hoja apertura exterior 4000.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },

  // --- SERIE 4500 (Monumental) ---
  { codigo: "4041", nombre: "RIEL DOBLE 4500", tipo: "perfil", serie: "4500", subtipo: "riel", descripcion: "Riel doble Serie 4500.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "4056", nombre: "HOJA DUO 4500", tipo: "perfil", serie: "4500", subtipo: "hoja", descripcion: "Hoja para doble acristalamiento.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "4044", nombre: "ADAP. TRASLAPE 4500", tipo: "perfil", serie: "4500", subtipo: "traslape", descripcion: "Adaptador de traslape 4500.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },

  // --- REFUERZOS Y VARIOS ---
  { codigo: "2188", nombre: "TAPA REFUERZO", tipo: "perfil", subtipo: "tapa", descripcion: "Tapa de refuerzo estructural.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },
  { codigo: "2218", nombre: "PERFIL REFUERZO", tipo: "perfil", subtipo: "refuerzo", descripcion: "Perfil de refuerzo estructural.", imagen: "https://img.icons8.com/ios/100/161717/aluminum.png" },

  // --- COMPONENTES DE INTEGRACIÓN (BOM) ---
  { codigo: "EPDM-GASKET", nombre: "EMPAQUE DE EPDM", tipo: "insumo", subtipo: "empaque", descripcion: "Recomendado para Series 3900 y 4500 (Exposición climática).", imagen: "https://img.icons8.com/ios/100/161717/rubber.png" },
  { codigo: "PENS-100", nombre: "PENS SILICON 100", tipo: "insumo", subtipo: "sellador", descripcion: "Silicón arquitectónico para perímetros de Serie 4000.", imagen: "https://img.icons8.com/ios/100/161717/glue.png" },
  { codigo: "Q70-ANCHOR", nombre: "ANCLAJE QUÍMICO Q70", tipo: "insumo", subtipo: "anclaje", descripcion: "Fijación de marcos pesados Serie 4500 en concreto.", imagen: "https://img.icons8.com/ios/100/161717/bolt.png" },
  { codigo: "SKN-COOL-LITE", nombre: "SGG COOL LITE SKN", tipo: "vidrio", subtipo: "Saint-Gobain", descripcion: "Vidrio de altas prestaciones para ahorro energético (Series 3500/4000).", imagen: "https://img.icons8.com/ios/100/161717/glass.png" },

  // --- HERRAJES ---
  { codigo: "A-2501", nombre: "CARRETILLA 2500", tipo: "herraje", subtipo: "rodamiento", descripcion: "Rodamiento para serie 2500 corrediza.", imagen: "https://img.icons8.com/ios/100/161717/roller-skates.png" },
  { codigo: "A-5000", nombre: "CIERRE EMBUTIDO", tipo: "herraje", subtipo: "cierre", descripcion: "Cierre embutido para ventanas corredizas.", imagen: "https://img.icons8.com/ios/100/161717/lock.png" },
  { codigo: "A-2801", nombre: "CARRETILLA 2800", tipo: "herraje", subtipo: "rodamiento", descripcion: "Rodamiento reforzado para serie 2800.", imagen: "https://img.icons8.com/ios/100/161717/skating.png" },
  { codigo: "A-5001", nombre: "BROCHE EMBUTIDO 2800", tipo: "herraje", subtipo: "cierre", descripcion: "Broche de seguridad para serie 2800.", imagen: "https://img.icons8.com/ios/100/161717/privacy.png" },
  { codigo: "A-3801", nombre: "CARRETILLA 3800", tipo: "herraje", subtipo: "rodamiento", descripcion: "Rodamiento de alta capacidad para serie 3800.", imagen: "https://img.icons8.com/ios/100/161717/industrial-scales.png" },
  { codigo: "H-3501", nombre: "BISAGRA 3500", tipo: "herraje", subtipo: "bisagra", descripcion: "Bisagra de presión para serie 3500.", imagen: "https://img.icons8.com/ios/100/161717/hinge.png" },
  { codigo: "H-3502", nombre: "MANIJA 3500", tipo: "herraje", subtipo: "cierre", descripcion: "Manija o falleba para serie 3500.", imagen: "https://img.icons8.com/ios/100/161717/door-handle.png" },
  { codigo: "H-3503", nombre: "ESCUADRA TRACCIÓN", tipo: "herraje", subtipo: "escuadra", descripcion: "Escuadra estructural para cortes 45°.", imagen: "https://img.icons8.com/ios/100/161717/angle.png" },
  { codigo: "A-2507", nombre: "ESCUADRA ARMADO", tipo: "herraje", subtipo: "escuadra", descripcion: "Escuadra de armado para ventana 2500.", imagen: "https://img.icons8.com/ios/100/161717/angle.png" },
  { codigo: "A-2519", nombre: "CIERRE PRESIÓN", tipo: "herraje", subtipo: "cierre", descripcion: "Cierre de presión para ventana.", imagen: "https://img.icons8.com/ios/100/161717/lock.png" },
  { codigo: "A-2520", nombre: "COMPÁS PROYECCIÓN", tipo: "herraje", subtipo: "compas", descripcion: "Compás de proyección para ventana.", imagen: "https://img.icons8.com/ios/100/161717/compass.png" },
  { codigo: "A-5022", nombre: "TAPÓN CUBRE PIJA", tipo: "herraje", subtipo: "tapon", descripcion: "Tapón para cubrir pijas de fijación.", imagen: "https://img.icons8.com/ios/100/161717/circle.png" },
  { codigo: "A-5032", nombre: "CALZA VIDRIO", tipo: "herraje", subtipo: "calza", descripcion: "Calza para soporte de vidrio.", imagen: "https://img.icons8.com/ios/100/161717/rectangle.png" },
  { codigo: "A-5050", nombre: "EMPAQUE RESPALDO", tipo: "insumo", subtipo: "empaque", descripcion: "Empaque bi-extruido respaldo 8.5.", imagen: "https://img.icons8.com/ios/100/161717/rubber.png" },
  { codigo: "A-5051", nombre: "EMPAQUE DESCENT.", tipo: "insumo", subtipo: "empaque", descripcion: "Empaque bi-extruido descentrado 8.5.", imagen: "https://img.icons8.com/ios/100/161717/rubber.png" },
  { codigo: "A-5079", nombre: "PIJA FIJADORA", tipo: "insumo", subtipo: "tornillo", descripcion: "Pija fijadora de 10 x 2 pulgadas.", imagen: "https://img.icons8.com/ios/100/161717/screw.png" },
  { codigo: "A-5090", nombre: "TAQUETE 1/4", tipo: "insumo", subtipo: "anclaje", descripcion: "Taquete de plástico 1/4.", imagen: "https://img.icons8.com/ios/100/161717/bolt.png" },
  { codigo: "A-5091", nombre: "SELLADOR PER.", tipo: "insumo", subtipo: "sellador", descripcion: "Sellador perimetral arquitectónico.", imagen: "https://img.icons8.com/ios/100/161717/glue.png" },
  { codigo: "A-2512", nombre: "BISAGRA 2 PALAS", tipo: "herraje", subtipo: "bisagra", descripcion: "Bisagra de dos palas para ventana.", imagen: "https://img.icons8.com/ios/100/161717/hinge.png" },
  { codigo: "A-2521", nombre: "ROTO OPERADOR", tipo: "herraje", subtipo: "operador", descripcion: "Roto operador para ventana proyección.", imagen: "https://img.icons8.com/ios/100/161717/gears.png" },
  { codigo: "A-2525", nombre: "RETÉN MOSQUITERO", tipo: "herraje", subtipo: "reten", descripcion: "Retén para mosquitero fijo.", imagen: "https://img.icons8.com/ios/100/161717/hook.png" },
  { codigo: "A-5024", nombre: "ESCUADRA MOSQ.", tipo: "herraje", subtipo: "escuadra", descripcion: "Escuadra para mosquitero de lámina.", imagen: "https://img.icons8.com/ios/100/161717/angle.png" },
  { codigo: "A-5031", nombre: "TELA MOSQUITERO", tipo: "insumo", subtipo: "tela", descripcion: "Tela para mosquitero (por m2).", imagen: "https://img.icons8.com/ios/100/161717/grid.png" },
  { codigo: "A-5060", nombre: "COLA DE RATA", tipo: "insumo", subtipo: "empaque", descripcion: "Empaque cola de rata para mosquitero.", imagen: "https://img.icons8.com/ios/100/161717/rubber.png" }
];

export const INITIAL_PRICES: Record<string, PriceData> = {
  // Serie 2500
  "1677": { unitPrice: 380.00, type: "meter" },
  "1678": { unitPrice: 350.00, type: "meter" },
  "1693": { unitPrice: 90.00, type: "meter" },
  "1695": { unitPrice: 420.00, type: "meter" },
  "1694": { unitPrice: 580.00, type: "meter" },
  "1699": { unitPrice: 320.00, type: "meter" },
  "1612": { unitPrice: 180.00, type: "meter" },
  "1675": { unitPrice: 410.00, type: "meter" },
  "1667": { unitPrice: 95.00, type: "meter" },
  "2057": { unitPrice: 85.00, type: "meter" },

  // Serie 2800
  "12150": { unitPrice: 390.00, type: "meter" },
  "12151": { unitPrice: 390.00, type: "meter" },
  "12152": { unitPrice: 310.00, type: "meter" },

  // Serie 3500
  "2273": { unitPrice: 450.00, type: "meter" },
  "2279": { unitPrice: 520.00, type: "meter" },
  "2221": { unitPrice: 85.00, type: "meter" },

  // Serie 3800
  "12208": { unitPrice: 480.00, type: "meter" },
  "12245": { unitPrice: 560.00, type: "meter" },

  // Serie 3900
  "12303": { unitPrice: 650.00, type: "meter" },
  "12307": { unitPrice: 720.00, type: "meter" },

  // Serie 4000
  "2314": { unitPrice: 890.00, type: "meter" },
  "2297": { unitPrice: 680.00, type: "meter" },

  // Serie 4500
  "4041": { unitPrice: 1250.00, type: "meter" },
  "4056": { unitPrice: 980.00, type: "meter" },

  // Genéricos / Refuerzos
  "2188": { unitPrice: 45.00, type: "meter" },
  "2218": { unitPrice: 210.00, type: "meter" },

  // Insumos & Herrajes (Previous values or defaults)
  "EPDM-GASKET": { unitPrice: 18.50, type: "meter" },
  "PENS-100": { unitPrice: 145.00, type: "unit" },
  "Q70-ANCHOR": { unitPrice: 350.00, type: "unit" },
  "SKN-COOL-LITE": { unitPrice: 850.00, type: "meter" },
  "A-2501": { unitPrice: 65.00, type: "unit" },
  "A-5000": { unitPrice: 110.00, type: "unit" },
  "A-2801": { unitPrice: 85.00, type: "unit" },
  "A-3801": { unitPrice: 185.00, type: "unit" },
  "H-3501": { unitPrice: 95.00, type: "unit" },
  "H-3502": { unitPrice: 210.00, type: "unit" },
  "H-3503": { unitPrice: 25.00, type: "unit" },
  "A-2507": { unitPrice: 35.00, type: "unit" },
  "A-2519": { unitPrice: 140.00, type: "unit" },
  "A-2520": { unitPrice: 280.00, type: "unit" },
  "A-5022": { unitPrice: 2.50, type: "unit" },
  "A-5032": { unitPrice: 5.00, type: "unit" },
  "A-5050": { unitPrice: 12.00, type: "meter" },
  "A-5051": { unitPrice: 14.00, type: "meter" },
  "A-5079": { unitPrice: 3.50, type: "unit" },
  "A-5090": { unitPrice: 1.50, type: "unit" },
  "A-5091": { unitPrice: 120.00, type: "meter" },
  "A-2512": { unitPrice: 115.00, type: "unit" },
  "A-2521": { unitPrice: 850.00, type: "unit" },
  "A-2525": { unitPrice: 15.00, type: "unit" },
  "A-5024": { unitPrice: 18.00, type: "unit" },
  "A-5031": { unitPrice: 160.00, type: "unit" },
  "A-5060": { unitPrice: 8.00, type: "meter" }
};

