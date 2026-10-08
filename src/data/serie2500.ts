// src/data/serie2500.ts
import { ConfiguracionSerie } from '../types/indalum';

// Precios de referencia (Mock). En producción, esto vendría de tu backend o contexto de precios.
const PRECIOS_PERFILES = {
  '1677': 45.50, // Marco Ventana
  '1680': 38.20, // Hoja Ventana Ap. Int.
  '1668': 12.10, // Junquillo Redondo
};

const PRECIOS_HERRAJES = {
  'A-2507': 15.00, 'A-2512': 85.00, 'A-2519': 120.00,
  'A-5020': 8.50, 'A-5022': 2.00, 'A-5032': 5.00,
  'A-5050': 3.50, 'A-5051': 4.20, 'A-5079': 1.50,
  'A-5090': 1.20, 'A-5091': 2.80, // A-5091 es ML
};

// SVGs esquemáticos (Paths simplificados para el ejemplo)
const SVG_MARCO = "M10,10 L40,10 L40,40 L10,40 Z"; 
const SVG_HOJA = "M15,15 L35,15 L35,35 L15,35 Z";
const SVG_JUNQUILLO = "M20,20 L30,20 L30,25 L20,25 Z";

export const ventanaBatienteInterior2500: ConfiguracionSerie = {
  id: '2500-VBI',
  nombre: 'Ventana Batiente Apertura Interior',
  paginaCatalogo: 9,
  notasGenerales: [
    "SE RECOMIENDA QUE EL JUNQUILLO SE ENSAMBLE EN LA HOJA ANTES DE CORTARLA."
  ],
  formulasCorte: [
    {
      perfil: { clave: '1677', descripcion: 'Marco Ventana', svgPath: SVG_MARCO, precioPorMetro: PRECIOS_PERFILES['1677'] },
      cantidad: 2, tipoCorte: '45°', formula: 'H'
    },
    {
      perfil: { clave: '1677', descripcion: 'Marco Ventana', svgPath: SVG_MARCO, precioPorMetro: PRECIOS_PERFILES['1677'] },
      cantidad: 2, tipoCorte: '45°', formula: 'V'
    },
    {
      perfil: { clave: '1680', descripcion: 'Hoja Ventana Ap. Int.', svgPath: SVG_HOJA, precioPorMetro: PRECIOS_PERFILES['1680'] },
      cantidad: 2, tipoCorte: '45°', formula: 'H-42'
    },
    {
      perfil: { clave: '1680', descripcion: 'Hoja Ventana Ap. Int.', svgPath: SVG_HOJA, precioPorMetro: PRECIOS_PERFILES['1680'] },
      cantidad: 2, tipoCorte: '45°', formula: 'V-42'
    },
    {
      perfil: { clave: '1668', descripcion: 'Junquillo Redondo', svgPath: SVG_JUNQUILLO, precioPorMetro: PRECIOS_PERFILES['1668'] },
      cantidad: 2, tipoCorte: '45°', formula: 'H-114', nota: 'Ensamblar en hoja antes de cortar'
    },
    {
      perfil: { clave: '1668', descripcion: 'Junquillo Redondo', svgPath: SVG_JUNQUILLO, precioPorMetro: PRECIOS_PERFILES['1668'] },
      cantidad: 2, tipoCorte: '45°', formula: 'V-114', nota: 'Ensamblar en hoja antes de cortar'
    }
  ],
  herrajes: [
    { clave: 'A-2507', descripcion: 'Escuadra de armado ventana', formulaCantidad: '8', unidad: 'PZ', precioUnitario: PRECIOS_HERRAJES['A-2507'] },
    { clave: 'A-2512', descripcion: 'Bisagra dos palas', formulaCantidad: '2', unidad: 'PZ', precioUnitario: PRECIOS_HERRAJES['A-2512'] },
    { clave: 'A-2519', descripcion: 'Cierre de presión', formulaCantidad: '1', unidad: 'PZ', precioUnitario: PRECIOS_HERRAJES['A-2519'] },
    { clave: 'A-5020', descripcion: 'Tapa dren', formulaCantidad: '2', unidad: 'PZ', precioUnitario: PRECIOS_HERRAJES['A-5020'] },
    { clave: 'A-5022', descripcion: 'Tapón cubre pija', formulaCantidad: '6', unidad: 'PZ', precioUnitario: PRECIOS_HERRAJES['A-5022'] },
    { clave: 'A-5032', descripcion: 'Calza para vidrio', formulaCantidad: '2', unidad: 'PZ', precioUnitario: PRECIOS_HERRAJES['A-5032'] },
    { clave: 'A-5050', descripcion: 'Empaque bi-extruido respaldo 8.5', formulaCantidad: '2H+2V', unidad: 'PZ', precioUnitario: PRECIOS_HERRAJES['A-5050'] },
    { clave: 'A-5051', descripcion: 'Empaque bi-extruido descent. 8.5', formulaCantidad: '4H+4V', unidad: 'PZ', precioUnitario: PRECIOS_HERRAJES['A-5051'] },
    { clave: 'A-5079', descripcion: 'Pija fijadora de 10"x2"', formulaCantidad: '6', unidad: 'PZ', precioUnitario: PRECIOS_HERRAJES['A-5079'] },
    { clave: 'A-5090', descripcion: 'Taquete de 1/4"', formulaCantidad: '6', unidad: 'PZ', precioUnitario: PRECIOS_HERRAJES['A-5090'] },
    { clave: 'A-5091', descripcion: 'Sellador perimetral', formulaCantidad: '4H+4V', unidad: 'ML', precioUnitario: PRECIOS_HERRAJES['A-5091'] }
  ],
  vidrio: {
    descripcion: 'Vidrio Claro',
    espesor: '6mm',
    formulaAncho: 'H-127',
    formulaAlto: 'V-127',
    precioPorM2: 450.00
  }
};

export const catalogo2500 = [ventanaBatienteInterior2500];
// Aquí agregarás: ventanaBatienteExterior2500, ventanaCorrediza2500, etc.