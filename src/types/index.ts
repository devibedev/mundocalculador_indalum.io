// src/types/index.ts

export type LineaId = 'euro' | 'tradicional' | 'industrial';

export interface LineaConfig {
  id: LineaId;
  nombre: string;
  descripcion: string;
  icono: string;
  color: string;
  activo: boolean;
  version: string;
  desperdicio: {
    perfiles: number;
    vidrio: number;
    accesorios: number;
  };
  precios: {
    moneda: string;
    iva: number;
    descuentos: Record<string, number>;
  };
  caracteristicas: {
    tipos: string[];
    acabados: string[];
    medidasMax: { ancho: number; alto: number };
  };
}

export interface Producto {
  id: string;
  codigo: string;
  nombre: string;
  categoria: 'perfil' | 'vidrio' | 'accesorio' | 'herraje';
  subcategoria: string;
  linea: LineaId;
  precio: number;
  peso?: number;
  unidad: 'm' | 'und' | 'm2';
  acabado?: string;
  imagen?: string;
  especificaciones?: Record<string, any>;
  stock?: number;
}

export interface ProyectoItem {
  id: string;
  tipo: 'ventana' | 'puerta' | 'panel';
  serie?: string;
  ancho: number;
  alto: number;
  cantidad: number;
  modelo: string;
  acabado: string;
  perfiles?: Record<string, number>;
  vidrio?: {
    tipo: string;
    area: number;
  };
  accesorios?: Array<{ id: string; cantidad: number }>;
}

export interface Cliente {
  nombre: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  nif?: string;
}

export interface Proyecto {
  id: string;
  nombre: string;
  linea: LineaId;
  fecha: string;
  cliente: Cliente;
  items: ProyectoItem[];
  descuento: number;
  iva: number;
  notas?: string;
  createdAt: string;
  updatedAt: string;
  estado: 'borrador' | 'en_proceso' | 'finalizado' | 'enviado';
}

export interface ProyectoResumen {
  id: string;
  nombre: string;
  linea: string;
  fecha: string;
  cliente: string;
  totalItems: number;
  totalPresupuesto: number;
  estado: string;
}

export type ProyectoFormData = Omit<Proyecto, 'id' | 'createdAt' | 'updatedAt'>;

export interface ListaMaterial {
  perfiles: Array<{
    id: string;
    nombre: string;
    metros: number;
    precio: number;
    peso: number;
    total: number;
  }>;
  vidrios: Array<{
    id: string;
    nombre: string;
    area: number;
    precio: number;
    total: number;
  }>;
  accesorios: Array<{
    id: string;
    nombre: string;
    cantidad: number;
    precio: number;
    total: number;
  }>;
  totalMaterial: number;
}

export interface Presupuesto {
  lista: ListaMaterial;
  subtotal: number;
  descuento: number;
  base: number;
  iva: number;
  total: number;
  moneda: string;
}
