// src/core/calculadora/CalculadoraTradicional.ts
// Descripción: Calculadora específica para la línea Tradicional
// Versión: 2.0.0
// Autor: Hermes

import { CalculadoraBase } from './CalculadoraBase';
import { ProyectoItem } from '../../types';
import { LINEAS_CONFIG } from '../../config/lineas';
import { FORMULAS_TRADICIONALES, ACCESORIOS_TRADICIONALES } from '../../data/formulas/formulasTradicionales';
import { FormulaEngine } from './FormulaEngine';

export class CalculadoraTradicional extends CalculadoraBase {
  constructor() {
    super(LINEAS_CONFIG.tradicional);
  }

  calcularPerfiles(item: ProyectoItem): Record<string, number> {
    const serie = item.serie || 'tradicional_generica';
    const tipo = item.modelo;

    const serieData = FORMULAS_TRADICIONALES.find((s) => s.id === serie);
    const formulas = serieData?.tipos[tipo];

    if (formulas) {
      const resultado = FormulaEngine.calcularMetrosLineales(formulas, item.ancho, item.alto, item.cantidad);
      const salida: Record<string, number> = {};
      for (const r of Object.values(resultado)) {
        salida[r.clave] = Number(r.metros.toFixed(2));
      }
      return salida;
    }

    return this.calcularPerfilesEconomicos(item);
  }

  calcularVidrio(item: ProyectoItem): { tipo: string; area: number } {
    const { ancho, alto, cantidad } = item;
    const area = (ancho * alto) / 1000000;
    const factor = 0.92;
    const areaUtil = area * factor * cantidad;

    return {
      tipo: 'Vidrio 4mm Económico',
      area: Number(areaUtil.toFixed(2)),
    };
  }

  calcularAccesorios(item: ProyectoItem): Array<{ id: string; cantidad: number }> {
    const accesorios = ACCESORIOS_TRADICIONALES[item.modelo] || ACCESORIOS_TRADICIONALES.corrediza;
    return accesorios.map((a) => ({
      id: a.id,
      descripcion: a.descripcion,
      cantidad: a.cantidad * item.cantidad,
    }));
  }

  private calcularPerfilesEconomicos(item: ProyectoItem): Record<string, number> {
    const { ancho, alto, modelo, cantidad } = item;
    const w = ancho / 1000;
    const h = alto / 1000;
    const formulas = this.getFormulasEconomicas(modelo);

    const resultado: Record<string, number> = {};

    for (const [nombrePerfil, formula] of Object.entries(formulas)) {
      const metros = formula(w, h) * cantidad;
      const conDesperdicio = this.calcularDesperdicio(metros, this.config.desperdicio.perfiles);
      resultado[nombrePerfil] = Number(conDesperdicio.toFixed(2));
    }

    return resultado;
  }

  private getFormulasEconomicas(
    tipo: string
  ): Record<string, (w: number, h: number) => number> {
    const formulas = {
      corrediza: {
        marco: (w: number, h: number) => 2 * (w + h) * 0.85,
        hoja: (w: number, h: number) => 2 * (w + h) * 0.85,
        junquillo: (w: number, h: number) => 2 * (w + h) * 0.6,
        guia: (w: number, h: number) => w * 0.8,
      },
      abatible: {
        marco: (w: number, h: number) => 2 * (w + h) * 0.85,
        hoja: (w: number, h: number) => 2 * (w + h) * 0.5,
        junquillo: (w: number, h: number) => 2 * (w + h) * 0.6,
        bisagra: (w: number, h: number) => w * 0.15,
      },
      fija: {
        marco: (w: number, h: number) => 2 * (w + h) * 0.85,
        junquillo: (w: number, h: number) => 2 * (w + h) * 0.6,
      },
      puerta_batiente_1750: {
        marco: (w: number, h: number) => 2 * (w + h) * 1.05,
        hoja: (w: number, h: number) => 2 * (w + h) * 0.7,
        junquillo: (w: number, h: number) => 2 * (w + h) * 0.55,
      },
    };

    return formulas[tipo] || formulas.corrediza;
  }
}
