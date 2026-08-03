// src/config/lineas.ts
// Configuración de líneas de producto: Euro, Tradicional, Industrial.
// Versión: 1.0.0

import { LineaConfig } from '../types';

export const LINEAS_CONFIG: Record<string, LineaConfig> = {
  euro: {
    id: 'euro',
    nombre: 'Euro',
    descripcion: 'Serie premium - Perfiles europeos',
    icono: '🏗️',
    color: '#1a365d',
    activo: true,
    version: '2.0',
    desperdicio: { perfiles: 10, vidrio: 5, accesorios: 0 },
    precios: {
      moneda: '€',
      iva: 21,
      descuentos: { '10+': 5, '50+': 10, '100+': 15 },
    },
    caracteristicas: {
      tipos: ['corrediza', 'abatible', 'oscilobatiente', 'fija'],
      acabados: ['anodizado', 'pintado', 'natural'],
      medidasMax: { ancho: 3000, alto: 3000 },
    },
  },
  tradicional: {
    id: 'tradicional',
    nombre: 'Tradicional',
    descripcion: 'Línea clásica - Relación calidad-precio',
    icono: '🛠️',
    color: '#2d3748',
    activo: false,
    version: '1.0',
    desperdicio: { perfiles: 12, vidrio: 8, accesorios: 0 },
    precios: {
      moneda: '€',
      iva: 21,
      descuentos: { '10+': 3, '50+': 8, '100+': 12 },
    },
    caracteristicas: {
      tipos: ['corrediza', 'abatible', 'fija'],
      acabados: ['pintado', 'natural'],
      medidasMax: { ancho: 2500, alto: 2500 },
    },
  },
  industrial: {
    id: 'industrial',
    nombre: 'Industrial',
    descripcion: 'Línea pesada para uso industrial',
    icono: '🏭',
    color: '#1f2937',
    activo: false,
    version: '0.1',
    desperdicio: { perfiles: 14, vidrio: 10, accesorios: 2 },
    precios: {
      moneda: '€',
      iva: 21,
      descuentos: { '10+': 4, '50+': 9, '100+': 14 },
    },
    caracteristicas: {
      tipos: ['corrediza', 'abatible', 'fija'],
      acabados: ['pintado', 'natural'],
      medidasMax: { ancho: 4000, alto: 4000 },
    },
  },
};

export type LineaId = keyof typeof LINEAS_CONFIG;
