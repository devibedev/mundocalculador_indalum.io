// src/core/calculadora/CalculadoraEuro.ts
// Descripción: Calculadora específica para la línea Euro
// Versión: 2.0.0
// Autor: Hermes

import { CalculadoraBase } from './CalculadoraBase';
import { ProyectoItem } from '../../types';
import { LINEAS_CONFIG } from '../../config/lineas';
import { FORMULAS_EUROALUM } from '../../data/formulasEuroalum';
import { FormulaEngine } from './FormulaEngine';

export class CalculadoraEuro extends CalculadoraBase {
  constructor() {
    super(LINEAS_CONFIG.euro);
  }

  calcularPerfiles(item: ProyectoItem): Record<string, number> {
    if (item.serie && this.tieneFormulasExactas(item.serie, item.modelo)) {
      return this.calcularPerfilesExactos(item);
    }
    return this.calcularPerfilesGenericos(item);
  }

  private tieneFormulasExactas(serie: string, modelo: string): boolean {
    const serieData = FORMULAS_EUROALUM.find((s) => s.id === serie);
    return !!serieData && !!serieData.tipos[modelo];
  }

  private calcularPerfilesExactos(item: ProyectoItem): Record<string, number> {
    const { ancho, alto, modelo, serie, cantidad } = item;
    const serieData = FORMULAS_EUROALUM.find((s) => s.id === serie);
    if (!serieData) return this.calcularPerfilesGenericos(item);

    const formulas = serieData.tipos[modelo];
    if (!formulas) return this.calcularPerfilesGenericos(item);

    const resultado = FormulaEngine.calcularMetrosLineales(formulas, ancho, alto, cantidad);
    const salida: Record<string, number> = {};
    for (const r of Object.values(resultado)) {
      salida[r.clave] = Number(r.metros.toFixed(2));
    }
    return salida;
  }

  calcularPerfilesGenericos(item: ProyectoItem): Record<string, number> {
    const { ancho, alto, modelo, cantidad } = item;
    const w = ancho / 1000;
    const h = alto / 1000;
    const formulas = this.getFormulasPorTipo(modelo);

    const resultado: Record<string, number> = {};

    for (const [nombrePerfil, formula] of Object.entries(formulas)) {
      const metros = formula(w, h) * cantidad;
      const conDesperdicio = this.calcularDesperdicio(metros, this.config.desperdicio.perfiles);
      resultado[nombrePerfil] = Number(conDesperdicio.toFixed(2));
    }

    return resultado;
  }

  calcularVidrio(item: ProyectoItem): { tipo: string; area: number } {
    const { ancho, alto, modelo, cantidad } = item;
    const area = (ancho * alto) / 1000000;

    const factores: Record<string, number> = {
      corrediza: 0.95,
      abatible: 0.90,
      oscilobatiente: 0.88,
      fija: 0.98,
      puerta_corrediza: 0.92,
      puerta_abatible: 0.85,
    };

    const factor = factores[modelo] || 0.95;
    const areaUtil = area * factor * cantidad;

    const tiposVidrio = [
      { id: 'V-4', nombre: 'Vidrio 4mm', precio: 25, espesor: 4 },
      { id: 'V-6', nombre: 'Vidrio 6mm', precio: 32, espesor: 6 },
      { id: 'V-8', nombre: 'Vidrio 8mm', precio: 40, espesor: 8 },
      { id: 'V-10', nombre: 'Vidrio 10mm', precio: 48, espesor: 10 },
      { id: 'DV-4', nombre: 'Doble vidrio 4+4mm', precio: 55, espesor: 8 },
      { id: 'DV-6', nombre: 'Doble vidrio 6+6mm', precio: 68, espesor: 12 },
    ];

    let seleccionado = tiposVidrio[0];
    if (areaUtil > 3) seleccionado = tiposVidrio[1];
    if (areaUtil > 5) seleccionado = tiposVidrio[2];
    if (areaUtil > 8) seleccionado = tiposVidrio[3];
    if (areaUtil > 10) seleccionado = tiposVidrio[4];

    return {
      tipo: seleccionado.nombre,
      area: Number(areaUtil.toFixed(2)),
    };
  }

  calcularAccesorios(item: ProyectoItem): Array<{ id: string; cantidad: number }> {
    const { modelo, cantidad } = item;

    const accesoriosBase: Record<string, Array<{ id: string; cantidad: number }>> = {
      corrediza: [
        { id: 'ESC-01', cantidad: 4 },
        { id: 'TOR-01', cantidad: 8 },
        { id: 'SELL-01', cantidad: 2 },
      ],
      abatible: [
        { id: 'BIS-01', cantidad: 2 },
        { id: 'MAN-01', cantidad: 1 },
        { id: 'TOR-01', cantidad: 6 },
        { id: 'SELL-01', cantidad: 2 },
      ],
      oscilobatiente: [
        { id: 'BIS-01', cantidad: 3 },
        { id: 'MAN-01', cantidad: 1 },
        { id: 'MEC-01', cantidad: 1 },
        { id: 'TOR-01', cantidad: 10 },
        { id: 'SELL-01', cantidad: 3 },
      ],
      fija: [
        { id: 'ESC-01', cantidad: 2 },
        { id: 'TOR-01', cantidad: 4 },
        { id: 'SELL-01', cantidad: 1 },
      ],
      puerta_corrediza: [
        { id: 'ESC-01', cantidad: 4 },
        { id: 'TOR-01', cantidad: 10 },
        { id: 'SELL-01', cantidad: 3 },
        { id: 'CER-01', cantidad: 1 },
      ],
      puerta_abatible: [
        { id: 'BIS-01', cantidad: 3 },
        { id: 'MAN-01', cantidad: 1 },
        { id: 'TOR-01', cantidad: 8 },
        { id: 'SELL-01', cantidad: 2 },
        { id: 'CER-01', cantidad: 1 },
      ],
    };

    const accesorios = accesoriosBase[modelo] || accesoriosBase.corrediza;
    return accesorios.map((a) => ({
      id: a.id,
      cantidad: a.cantidad * cantidad,
    }));
  }

  private getFormulasPorTipo(
    tipo: string
  ): Record<string, (w: number, h: number) => number> {
    const formulasBase = {
      corrediza: {
        marco: (w: number, h: number) => 2 * (w + h),
        hoja: (w: number, h: number) => 2 * (w + h),
        junquillo: (w: number, h: number) => 2 * (w + h),
        guia: (w: number, h: number) => w + 0.1,
        carril: (w: number, h: number) => w * 2 + 0.2,
      },
      abatible: {
        marco: (w: number, h: number) => 2 * (w + h),
        hoja: (w: number, h: number) => 2 * (w + h) * 0.6,
        junquillo: (w: number, h: number) => 2 * (w + h) * 0.8,
        bisagra: (w: number, h: number) => w * 0.2,
        manilla: (w: number, h: number) => 1,
      },
      oscilobatiente: {
        marco: (w: number, h: number) => 2 * (w + h) * 1.1,
        hoja: (w: number, h: number) => 2 * (w + h) * 0.7,
        junquillo: (w: number, h: number) => 2 * (w + h) * 0.9,
        bisagra: (w: number, h: number) => w * 0.3,
        manilla: (w: number, h: number) => 1.2,
        mecanismo: (w: number, h: number) => w * 0.1,
      },
      fija: {
        marco: (w: number, h: number) => 2 * (w + h),
        junquillo: (w: number, h: number) => 2 * (w + h),
        refuerzo: (w: number, h: number) => w * 0.5,
      },
      puerta_corrediza: {
        marco: (w: number, h: number) => 2 * (w + h) * 1.2,
        hoja: (w: number, h: number) => 2 * (w + h) * 0.8,
        junquillo: (w: number, h: number) => 2 * (w + h) * 0.5,
        guia: (w: number, h: number) => w + 0.2,
        cerradura: (w: number, h: number) => 1,
      },
      puerta_abatible: {
        marco: (w: number, h: number) => 2 * (w + h) * 1.3,
        hoja: (w: number, h: number) => 2 * (w + h) * 0.9,
        junquillo: (w: number, h: number) => 2 * (w + h) * 0.6,
        bisagra: (w: number, h: number) => w * 0.2,
        cerradura: (w: number, h: number) => 1,
      },
    };

    return formulasBase[tipo] || formulasBase.corrediza;
  }
}

