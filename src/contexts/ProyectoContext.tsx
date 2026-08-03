// src/contexts/ProyectoContext.tsx
// Descripción: Contexto para gestionar proyectos
// Versión: 2.0.0
// Autor: Hermes

import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import { Proyecto, ProyectoResumen, ProyectoFormData, ProyectoItem } from '../types';
import { useLinea } from './LineaContext';
import { CalculadoraFactory } from '../core/calculadora/factory';
import { StorageManager } from '../core/storage/StorageManager';
import { ExportadorPDF } from '../core/exportadores/ExportadorPDF';
import { ExportadorExcel } from '../core/exportadores/ExportadorExcel';
import { generarId, getCurrentDate } from '../utils/helpers';

interface ProyectoContextType {
  proyectos: Proyecto[];
  proyectoActual: Proyecto | null;
  cargando: boolean;
  error: string | null;

  crearProyecto: (data: ProyectoFormData) => Promise<Proyecto>;
  cargarProyecto: (id: string) => Promise<Proyecto | null>;
  actualizarProyecto: (id: string, data: Partial<Proyecto>) => Promise<Proyecto>;
  eliminarProyecto: (id: string) => Promise<void>;

  agregarItem: (item: ProyectoItem) => Promise<void>;
  actualizarItem: (id: string, item: ProyectoItem) => Promise<void>;
  eliminarItem: (id: string) => Promise<void>;

  recalcularPresupuesto: () => Promise<void>;

  seleccionarProyecto: (id: string) => void;
  limpiarSeleccion: () => void;
  // Resumen
  obtenerResumen: (id: string) => ProyectoResumen | null;

  exportarPDF: (id: string, options?: any) => Promise<void>;
  exportarExcel: (id: string) => Promise<void>;
}

const ProyectoContext = createContext<ProyectoContextType | null>(null);

const storage = new StorageManager();

export const ProyectoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { lineaActual } = useLinea();
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [proyectoActual, setProyectoActual] = useState<Proyecto | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarProyectos();
  }, []);

  const cargarProyectos = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const lista = await storage.getProyectos();
      setProyectos(lista);
    } catch (err) {
      setError('Error al cargar proyectos');
      console.error(err);
    } finally {
      setCargando(false);
    }
  }, []);

  const crearProyecto = useCallback(async (data: ProyectoFormData): Promise<Proyecto> => {
    setCargando(true);
    setError(null);
    try {
      const nuevoProyecto: Proyecto = {
        ...data,
        id: generarId('PROJ'),
        createdAt: getCurrentDate(),
        updatedAt: getCurrentDate(),
        estado: 'borrador',
      };

      await storage.guardarProyecto(nuevoProyecto);
      setProyectos((prev) => [...prev, nuevoProyecto]);
      setProyectoActual(nuevoProyecto);
      return nuevoProyecto;
    } catch (err) {
      setError('Error al crear proyecto');
      console.error(err);
      throw err;
    } finally {
      setCargando(false);
    }
  }, []);

  const cargarProyecto = useCallback(async (id: string): Promise<Proyecto | null> => {
    setCargando(true);
    setError(null);
    try {
      const proyecto = await storage.cargarProyecto(id);
      if (proyecto) {
        setProyectoActual(proyecto);
        return proyecto;
      }
      return null;
    } catch (err) {
      setError('Error al cargar proyecto');
      console.error(err);
      return null;
    } finally {
      setCargando(false);
    }
  }, []);

  const actualizarProyecto = useCallback(async (id: string, data: Partial<Proyecto>): Promise<Proyecto> => {
    setCargando(true);
    setError(null);
    try {
      const proyecto = await storage.cargarProyecto(id);
      if (!proyecto) throw new Error('Proyecto no encontrado');

      const actualizado: Proyecto = {
        ...proyecto,
        ...data,
        updatedAt: getCurrentDate(),
      };

      await storage.guardarProyecto(actualizado);
      setProyectos((prev) => prev.map((p) => (p.id === id ? actualizado : p)));
      if (proyectoActual?.id === id) {
        setProyectoActual(actualizado);
      }

      return actualizado;
    } catch (err) {
      setError('Error al actualizar proyecto');
      console.error(err);
      throw err;
    } finally {
      setCargando(false);
    }
  }, [proyectoActual]);

  const eliminarProyecto = useCallback(async (id: string): Promise<void> => {
    setCargando(true);
    setError(null);
    try {
      await storage.eliminarProyecto(id);
      setProyectos((prev) => prev.filter((p) => p.id !== id));
      if (proyectoActual?.id === id) {
        setProyectoActual(null);
      }
    } catch (err) {
      setError('Error al eliminar proyecto');
      console.error(err);
      throw err;
    } finally {
      setCargando(false);
    }
  }, [proyectoActual]);

  const agregarItem = useCallback(async (item: ProyectoItem): Promise<void> => {
    if (!proyectoActual) {
      throw new Error('No hay proyecto seleccionado');
    }

    const itemConId = { ...item, id: generarId('ITEM') };
    const actualizado = {
      ...proyectoActual,
      items: [...proyectoActual.items, itemConId],
      updatedAt: getCurrentDate(),
    };

    await storage.guardarProyecto(actualizado);
    setProyectoActual(actualizado);
    setProyectos((prev) => prev.map((p) => (p.id === actualizado.id ? actualizado : p)));
    await recalcularPresupuesto();
  }, [proyectoActual]);

  const actualizarItem = useCallback(async (id: string, item: ProyectoItem): Promise<void> => {
    if (!proyectoActual) {
      throw new Error('No hay proyecto seleccionado');
    }

    const itemsActualizados = proyectoActual.items.map((i) =>
      i.id === id ? { ...item, id } : i
    );
    const actualizado = {
      ...proyectoActual,
      items: itemsActualizados,
      updatedAt: getCurrentDate(),
    };

    await storage.guardarProyecto(actualizado);
    setProyectoActual(actualizado);
    setProyectos((prev) => prev.map((p) => (p.id === actualizado.id ? actualizado : p)));
    await recalcularPresupuesto();
  }, [proyectoActual]);

  const eliminarItem = useCallback(async (id: string): Promise<void> => {
    if (!proyectoActual) {
      throw new Error('No hay proyecto seleccionado');
    }

    const itemsActualizados = proyectoActual.items.filter((i) => i.id !== id);
    const actualizado = {
      ...proyectoActual,
      items: itemsActualizados,
      updatedAt: getCurrentDate(),
    };

    await storage.guardarProyecto(actualizado);
    setProyectoActual(actualizado);
    setProyectos((prev) => prev.map((p) => (p.id === actualizado.id ? actualizado : p)));
    await recalcularPresupuesto();
  }, [proyectoActual]);

  const recalcularPresupuesto = useCallback(async (): Promise<void> => {
    if (!proyectoActual) return;

    try {
      setCargando(true);
      const calculadora = CalculadoraFactory.crear(lineaActual);

      const catalogo = await storage.getCatalogo(lineaActual);
      calculadora.catalogo = catalogo ?? {};

      calculadora.setProyecto({
        items: proyectoActual.items,
        cliente: proyectoActual.cliente,
        descuento: proyectoActual.descuento,
        iva: proyectoActual.iva,
      });

      const presupuesto = calculadora.calcularPresupuesto();

      const actualizado = {
        ...proyectoActual,
        presupuesto,
        updatedAt: getCurrentDate(),
      };

      await storage.guardarProyecto(actualizado);
      setProyectoActual(actualizado);
      setProyectos((prev) => prev.map((p) => (p.id === actualizado.id ? actualizado : p)));
    } catch (err) {
      setError('Error al recalcular presupuesto');
      console.error(err);
    } finally {
      setCargando(false);
    }
  }, [proyectoActual, lineaActual]);

  const seleccionarProyecto = useCallback((id: string) => {
    const proyecto = proyectos.find((p) => p.id === id);
    if (proyecto) setProyectoActual(proyecto);
  }, [proyectos]);

  const limpiarSeleccion = useCallback(() => {
    setProyectoActual(null);
  }, []);

  const obtenerResumen = useCallback((id: string): ProyectoResumen | null => {
    const proyecto = proyectos.find((p) => p.id === id);
    if (!proyecto) return null;

    return {
      id: proyecto.id,
      nombre: proyecto.nombre,
      linea: proyecto.linea,
      fecha: proyecto.fecha,
      cliente: proyecto.cliente.nombre,
      totalItems: proyecto.items.length,
      totalPresupuesto: proyecto.presupuesto?.total ?? 0,
      estado: proyecto.estado,
    };
  }, [proyectos]);

  const exportarPDF = useCallback(async (id: string, options?: any): Promise<void> => {
    const proyecto = await storage.cargarProyecto(id);
    if (!proyecto?.presupuesto) {
      throw new Error('Proyecto o presupuesto no encontrado');
    }

    const exportador = new ExportadorPDF(options);
    const nombre = `presupuesto_${proyecto.nombre}_${proyecto.id}`.replace(/\s+/g, '_');
    await exportador.descargar(nombre);
  }, []);

  const exportarExcel = useCallback(async (id: string): Promise<void> => {
    const proyecto = await storage.cargarProyecto(id);
    if (!proyecto?.presupuesto) {
      throw new Error('Proyecto o presupuesto no encontrado');
    }

    const exportador = new ExportadorExcel();
    const workbook = exportador.generarExcel(proyecto, proyecto.presupuesto);
    const nombre = `lista_${proyecto.nombre}_${proyecto.id}`.replace(/\s+/g, '_');
    exportador.descargar(workbook, nombre);
  }, []);

  const value: ProyectoContextType = {
    proyectos,
    proyectoActual,
    cargando,
    error,
    crearProyecto,
    cargarProyecto,
    actualizarProyecto,
    eliminarProyecto,
    agregarItem,
    actualizarItem,
    eliminarItem,
    recalcularPresupuesto,
    seleccionarProyecto,
    limpiarSeleccion,
    obtenerResumen,
    exportarPDF,
    exportarExcel,
  };

  return (
    <ProyectoContext.Provider value={value}>
      {children}
    </ProyectoContext.Provider>
  );
};

export const useProyecto = (): ProyectoContextType => {
  const context = useContext(ProyectoContext);
  if (!context) {
    throw new Error('useProyecto debe usarse dentro de un ProyectoProvider');
  }
  return context;
};

export const useProyectoActual = (): Proyecto | null => {
  const { proyectoActual } = useProyecto();
  return proyectoActual;
};

export const usePresupuesto = () => {
  const { proyectoActual, cargando } = useProyecto();
  return {
    presupuesto: proyectoActual?.presupuesto ?? null,
    cargando,
    items: proyectoActual?.items ?? [],
  };
};
