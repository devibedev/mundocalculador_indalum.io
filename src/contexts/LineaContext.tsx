// src/contexts/LineaContext.tsx
// Descripción: Contexto para gestionar la línea activa
// Versión: 2.0.0
// Autor: Hermes

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { LineaId } from '../types';
import { LINEAS_CONFIG } from '../config/lineas';
import { CalculadoraFactory } from '../core/calculadora/factory';

interface LineaContextType {
  lineaActual: LineaId;
  setLineaActual: (linea: LineaId) => void;
  cambiarLinea: (linea: LineaId) => Promise<void>;
  esActiva: (linea: LineaId) => boolean;
  getLineasActivas: () => Array<{
    id: LineaId;
    nombre: string;
    icono: string;
    color: string;
  }>;
  getLineaConfig: (lineaId?: LineaId) => (typeof LINEAS_CONFIG)[keyof typeof LINEAS_CONFIG] | undefined;
  progress: number;
}

const LineaContext = createContext<LineaContextType | null>(null);

interface LineaProviderProps {
  children: ReactNode;
  lineaInicial?: LineaId;
}

export const LineaProvider: React.FC<LineaProviderProps> = ({
  children,
  lineaInicial = 'euro',
}) => {
  const [lineaActual, setLineaActual] = useState<LineaId>(lineaInicial);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const stored = localStorage.getItem('indalum_linea_actual');
    if (stored && LINEAS_CONFIG[stored as LineaId]?.activo) {
      setLineaActual(stored as LineaId);
    }
  }, []);

  useEffect(() => {
    setProgress(CalculadoraFactory.getLineaProgress(lineaActual));
  }, [lineaActual]);

  const cambiarLinea = async (linea: LineaId): Promise<void> => {
    const config = LINEAS_CONFIG[linea];

    if (!config) {
      throw new Error(`Línea "${linea}" no existe`);
    }

    if (!config.activo) {
      const activas = Object.values(LINEAS_CONFIG)
        .filter((l) => l.activo)
        .map((l) => `${l.icono} ${l.nombre}`)
        .join(', ');
      throw new Error(`Línea "${linea}" no está disponible. Activas: ${activas}`);
    }

    try {
      CalculadoraFactory.crear(linea);
      setLineaActual(linea);
      localStorage.setItem('indalum_linea_actual', linea);
      console.log(`Línea cambiada a: ${config.icono} ${config.nombre}`);
    } catch (error) {
      console.error('Error al cambiar línea:', error);
      throw error;
    }
  };

  const esActiva = (lineaId: LineaId): boolean => CalculadoraFactory.isLineaActiva(lineaId);

  const getLineasActivas = () => CalculadoraFactory.getLineasActivas();

  const getLineaConfig = (lineaId?: LineaId) => {
    const id = lineaId || lineaActual;
    return LINEAS_CONFIG[id];
  };

  const value: LineaContextType = {
    lineaActual,
    setLineaActual,
    cambiarLinea,
    esActiva,
    getLineasActivas,
    getLineaConfig,
    progress,
  };

  return (
    <LineaContext.Provider value={value}>
      {children}
    </LineaContext.Provider>
  );
};

export const useLinea = (): LineaContextType => {
  const context = useContext(LineaContext);
  if (!context) {
    throw new Error('useLinea debe usarse dentro de un LineaProvider');
  }
  return context;
};

export const useLineaActual = (): LineaId => {
  const { lineaActual } = useLinea();
  return lineaActual;
};

export const useLineaConfig = () => {
  const { getLineaConfig, lineaActual } = useLinea();
  return getLineaConfig(lineaActual);
};
