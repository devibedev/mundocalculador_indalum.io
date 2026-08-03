// src/core/calculadora/FormulaEngine.ts
// Descripción: Motor de cálculo de fórmulas de corte
// Versión: 1.0.0
// Autor: Hermes

import { FormulaCorte } from '../../data/formulasEuroalum';

export class FormulaEngine {
  static evaluar(formula: string, H: number, V: number): number {
    let expresion = formula.replace(/H/g, H.toString()).replace(/V/g, V.toString());

    try {
      const fn = new Function(`return (${expresion});`);
      const resultado = fn();
      return Math.round((Number(resultado) || 0) * 100) / 100;
    } catch (error) {
      console.error(`Error evaluando fórmula "${formula}":`, error);
      return 0;
    }
  }

  static calcularCorte(formula: FormulaCorte, H: number, V: number): number {
    return this.evaluar(formula.formula, H, V);
  }

  static calcularMetrosLineales(
    formulas: FormulaCorte[],
    H: number,
    V: number,
    cantidad: number
  ): Record<string, { metros: number; piezas: number; clave: string; descripcion: string }> {
    const resultado: Record<string, any> = {};

    for (const f of formulas) {
      const longitud = this.calcularCorte(f, H, V);
      const total = longitud * f.cantidad * cantidad;

      if (!resultado[f.clave]) {
        resultado[f.clave] = {
          clave: f.clave,
          descripcion: f.descripcion,
          metros: 0,
          piezas: 0,
        };
      }

      resultado[f.clave].metros += total / 1000;
      resultado[f.clave].piezas += f.cantidad * cantidad;
    }

    return resultado;
  }
}
