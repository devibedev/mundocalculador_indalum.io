// src/types/indalum.ts

export type TipoCorte = '45°' | '90°' | '45°-90°';
export type UnidadMedida = 'PZ' | 'ML' | 'M2';

export interface Perfil {
  clave: string;
  descripcion: string;
  svgPath: string; // Ruta del SVG o path inline para la ilustración
  precioPorMetro: number;
}

export interface FormulaCorte {
  perfil: Perfil;
  cantidad: number;
  tipoCorte: TipoCorte;
  formula: string; // Ej: "H-42", "V", "(H-4)/2"
  nota?: string;
}

export interface Herraje {
  clave: string;
  descripcion: string;
  formulaCantidad: string; // Ej: "8", "2H+2V"
  unidad: UnidadMedida;
  precioUnitario: number;
  svgPath?: string;
}

export interface Vidrio {
  descripcion: string;
  espesor: string;
  formulaAncho: string; // Ej: "H-127"
  formulaAlto: string;  // Ej: "V-127"
  precioPorM2: number;
}

export interface ConfiguracionSerie {
  id: string;
  nombre: string;
  paginaCatalogo: number;
  formulasCorte: FormulaCorte[];
  herrajes: Herraje[];
  vidrio: Vidrio;
  notasGenerales: string[];
}

export interface ResultadoCalculo {
  configuracion: ConfiguracionSerie;
  vano: { ancho: number; alto: number };
  piezasCorte: {
    clave: string;
    descripcion: string;
    cantidad: number;
    medidaCorte: number; // En mm
    tipoCorte: TipoCorte;
    nota?: string;
    costoTotal: number;
  }[];
  herrajesCalculados: {
    clave: string;
    descripcion: string;
    cantidad: number; // Cantidad final resuelta
    unidad: UnidadMedida;
    costoTotal: number;
  }[];
  vidrioCalculado: {
    ancho: number;
    alto: number;
    areaM2: number;
    costoTotal: number;
  };
  costoTotalEstimado: number;
}