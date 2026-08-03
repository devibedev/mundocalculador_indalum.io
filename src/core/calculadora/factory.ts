// src/core/calculadora/factory.ts
// Descripción: Factory para crear calculadoras según la línea
// Versión: 2.0.0
// Autor: Hermes

import { CalculadoraBase } from './CalculadoraBase';
import { CalculadoraEuro } from './CalculadoraEuro';
import { CalculadoraTradicional } from './CalculadoraTradicional';
import { LineaId } from '../../types';
import { LINEAS_CONFIG } from '../../config/lineas';

export class CalculadoraFactory {
  static crear(lineaId: LineaId): CalculadoraBase {
    const config = LINEAS_CONFIG[lineaId];

    if (!config) {
      throw new Error(`Línea "${lineaId}" no encontrada`);
    }

    if (!config.activo) {
      const activas = Object.values(LINEAS_CONFIG)
        .filter((l) => l.activo)
        .map((l) => l.id)
        .join(', ');
      throw new Error(
        `Línea "${lineaId}" no está activa. Activas: ${activas}`
      );
    }

    switch (lineaId) {
      case 'euro':
        return new CalculadoraEuro();
      case 'tradicional':
        // TODO: activar cuando corresponda
        throw new Error('Línea Tradicional en preparación');
      case 'industrial':
        throw new Error('Línea Industrial en desarrollo');
      default:
        throw new Error(`Línea "${lineaId}" no implementada`);
    }
  }

  static getLineasActivas() {
    return Object.values(LINEAS_CONFIG)
      .filter((linea) => linea.activo)
      .map((linea) => ({
        id: linea.id,
        nombre: linea.nombre,
        icono: linea.icono,
        color: linea.color,
      }));
  }

  static isLineaActiva(lineaId: LineaId): boolean {
    return LINEAS_CONFIG[lineaId]?.activo || false;
  }

  static getLineaProgress(lineaId: LineaId): number {
    const progress: Record<LineaId, number> = {
      euro: 100,
      tradicional: 60,
      industrial: 10,
    };
    return progress[lineaId] || 0;
  }
}
