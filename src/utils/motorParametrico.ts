// src/utils/motorParametrico.ts
import { ConfiguracionSerie, ResultadoCalculo } from '../types/indalum';

/**
 * Evalúa fórmulas matemáticas simples de forma segura.
 * Ej: "H-42" con H=1000 -> 958
 */
function evaluarMatematica(formula: string, H: number, V: number): number {
  // Reemplazamos H y V por sus valores numéricos
  let expr = formula.replace(/H/g, `(${H})`).replace(/V/g, `(${V})`);
  
  try {
    // Evaluamos la expresión. En un entorno de producción estricto, 
    // se recomienda usar una librería como 'mathjs' en lugar de Function.
    const resultado = Function('"use strict"; return (' + expr + ')')();
    return Math.round(resultado); // Redondeamos a milímetros enteros
  } catch (error) {
    console.error(`Error evaluando fórmula: ${formula}`, error);
    return 0;
  }
}

/**
 * Motor principal de cálculo
 */
export function calcularDespiece(
  config: ConfiguracionSerie, 
  anchoVano: number, 
  altoVano: number
): ResultadoCalculo {
  const H = anchoVano;
  const V = altoVano;
  let costoTotal = 0;

  // 1. Calcular Piezas de Corte
  const piezasCorte = config.formulasCorte.map(fc => {
    const medidaCorte = evaluarMatematica(fc.formula, H, V);
    // El precio es por metro lineal, así que convertimos mm a metros
    const metrosTotales = (medidaCorte * fc.cantidad) / 1000;
    const costo = metrosTotales * fc.perfil.precioPorMetro;
    costoTotal += costo;

    return {
      clave: fc.perfil.clave,
      descripcion: fc.perfil.descripcion,
      cantidad: fc.cantidad,
      medidaCorte,
      tipoCorte: fc.tipoCorte,
      nota: fc.nota,
      costoTotal: parseFloat(costo.toFixed(2))
    };
  });

  // 2. Calcular Herrajes
  const herrajesCalculados = config.herrajes.map(h => {
    let cantidadFinal = 0;
    
    // Si la fórmula contiene H o V, es una fórmula lineal (ej: 2H+2V)
    if (h.formulaCantidad.includes('H') || h.formulaCantidad.includes('V')) {
      // Para ML o PZ basados en perímetro, usamos H y V en METROS
      const H_m = H / 1000;
      const V_m = V / 1000;
      cantidadFinal = evaluarMatematica(h.formulaCantidad, H_m, V_m);
      
      // Redondeo inteligente: si es PZ, redondea hacia arriba. Si es ML, 2 decimales.
      cantidadFinal = h.unidad === 'PZ' ? Math.ceil(cantidadFinal) : Math.round(cantidadFinal * 100) / 100;
    } else {
      // Es una cantidad fija (ej: "8")
      cantidadFinal = parseInt(h.formulaCantidad, 10);
    }

    const costo = cantidadFinal * h.precioUnitario;
    costoTotal += costo;

    return {
      clave: h.clave,
      descripcion: h.descripcion,
      cantidad: cantidadFinal,
      unidad: h.unidad,
      costoTotal: parseFloat(costo.toFixed(2))
    };
  });

  // 3. Calcular Vidrio
  const vidrioAncho = evaluarMatematica(config.vidrio.formulaAncho, H, V);
  const vidrioAlto = evaluarMatematica(config.vidrio.formulaAlto, H, V);
  const areaM2 = (vidrioAncho * vidrioAlto) / 1000000; // mm² a m²
  const costoVidrio = areaM2 * config.vidrio.precioPorM2;
  costoTotal += costoVidrio;

  return {
    configuracion: config,
    vano: { ancho: H, alto: V },
    piezasCorte,
    herrajesCalculados,
    vidrioCalculado: {
      ancho: vidrioAncho,
      alto: vidrioAlto,
      areaM2: parseFloat(areaM2.toFixed(3)),
      costoTotal: parseFloat(costoVidrio.toFixed(2))
    },
    costoTotalEstimado: parseFloat(costoTotal.toFixed(2))
  };
}