// src/core/storage/StorageManager.ts
// Descripción: Gestor de almacenamiento con versionado
// Versión: 2.0.0
// Autor: Hermes

import { Proyecto, LineaId } from '../../types';
import { LINEAS_CONFIG } from '../../config/lineas';
import { Migrador } from './migraciones';

export class StorageManager {
  private version: string;
  private prefix: string;
  private migrador: Migrador;

  constructor() {
    this.version = '2.0.0';
    this.prefix = 'indalum_';
    this.migrador = new Migrador();
  }

  async guardarProyecto(proyecto: Proyecto): Promise<void> {
    try {
      const key = `${this.prefix}proyecto_${proyecto.id}`;
      const data = {
        ...proyecto,
        version: this.version,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(data));
      await this.actualizarIndice(proyecto.id);
    } catch (error) {
      console.error('Error guardando proyecto:', error);
      throw new Error('No se pudo guardar el proyecto');
    }
  }

  async cargarProyecto(id: string): Promise<Proyecto | null> {
    try {
      const key = `${this.prefix}proyecto_${id}`;
      const data = localStorage.getItem(key);
      if (!data) return null;

      const proyecto = JSON.parse(data);
      if (proyecto.version !== this.version) {
        return this.migrador.ejecutarMigraciones(proyecto, proyecto.version);
      }
      return proyecto;
    } catch (error) {
      console.error('Error cargando proyecto:', error);
      return null;
    }
  }

  async eliminarProyecto(id: string): Promise<void> {
    try {
      const key = `${this.prefix}proyecto_${id}`;
      localStorage.removeItem(key);
      await this.eliminarDelIndice(id);
    } catch (error) {
      console.error('Error eliminando proyecto:', error);
      throw new Error('No se pudo eliminar el proyecto');
    }
  }

  async getProyectos(): Promise<Proyecto[]> {
    try {
      const indices = this.getIndice();
      const proyectos: Proyecto[] = [];

      for (const id of indices) {
        const proyecto = await this.cargarProyecto(id);
        if (proyecto) proyectos.push(proyecto);
      }

      return proyectos.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      console.error('Error obteniendo proyectos:', error);
      return [];
    }
  }

  async guardarCatalogo(lineaId: LineaId, catalogo: any): Promise<void> {
    try {
      const key = `${this.prefix}catalogo_${lineaId}`;
      localStorage.setItem(key, JSON.stringify(catalogo));
    } catch (error) {
      console.error('Error guardando catálogo:', error);
    }
  }

  async getCatalogo(lineaId: LineaId): Promise<any> {
    try {
      const key = `${this.prefix}catalogo_${lineaId}`;
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  async limpiarTodosLosDatos(): Promise<void> {
    try {
      const keys = Object.keys(localStorage);
      for (const key of keys) {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error('Error limpiando datos:', error);
    }
  }

  private async actualizarIndice(id: string): Promise<void> {
    const indices = this.getIndice();
    if (!indices.includes(id)) {
      indices.push(id);
      localStorage.setItem(`${this.prefix}indice`, JSON.stringify(indices));
    }
  }

  private async eliminarDelIndice(id: string): Promise<void> {
    const indices = this.getIndice();
    const filtrado = indices.filter((item) => item !== id);
    localStorage.setItem(`${this.prefix}indice`, JSON.stringify(filtrado));
  }

  private getIndice(): string[] {
    try {
      const data = localStorage.getItem(`${this.prefix}indice`);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
}
