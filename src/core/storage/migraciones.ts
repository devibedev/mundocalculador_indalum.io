// src/core/storage/migraciones.ts
// Descripción: Sistema de migración de datos
// Versión: 2.0.0
// Autor: Hermes

export interface Migracion {
  version: string;
  fecha: string;
  ejecutar: (datos: any) => any;
}

export class Migrador {
  private migraciones: Migracion[];

  constructor() {
    this.migraciones = [
      {
        version: '1.0.0',
        fecha: '2024-01-01',
        ejecutar: this.migrarV1aV2,
      },
      {
        version: '1.5.0',
        fecha: '2024-06-01',
        ejecutar: this.migrarV1_5aV2,
      },
      {
        version: '2.0.0',
        fecha: '2024-12-01',
        ejecutar: this.migrarV2aV3,
      },
    ];
  }

  ejecutarMigraciones(datos: any, versionOrigen: string): any {
    let currentData = { ...datos };
    let currentVersion = versionOrigen;

    for (const migracion of this.migraciones) {
      if (this.compararVersiones(currentVersion, migracion.version) < 0) {
        try {
          currentData = migracion.ejecutar(currentData);
          currentVersion = migracion.version;
          console.log(`Migrado a versión ${currentVersion}`);
        } catch (error) {
          console.error(`Error en migración a ${migracion.version}:`, error);
        }
      }
    }

    return currentData;
  }

  private compararVersiones(v1: string, v2: string): number {
    const a = v1.split('.').map(Number);
    const b = v2.split('.').map(Number);
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      const x = a[i] || 0;
      const y = b[i] || 0;
      if (x !== y) return x - y;
    }
    return 0;
  }

  private migrarV1aV2(datos: any): any {
    return {
      ...datos,
      linea: datos.linea || 'euro',
      version: '2.0.0',
      estado: datos.estado || 'borrador',
      items: Array.isArray(datos.items)
        ? datos.items.map((item: any) => ({
            ...item,
            modelo: item.modelo || 'corrediza',
            acabado: item.acabado || 'natural',
            perfiles: item.perfiles || this.calcularPerfilesLegacy(item),
          }))
        : [],
    };
  }

  private migrarV1_5aV2(datos: any): any {
    return {
      ...datos,
      lineas: datos.lineas || ['euro'],
      version: '2.0.0',
    };
  }

  private migrarV2aV3(datos: any): any {
    return datos;
  }

  private calcularPerfilesLegacy(item: any): Record<string, number> {
    const w = (item.ancho || 1000) / 1000;
    const h = (item.alto || 1000) / 1000;
    const cantidad = item.cantidad || 1;
    return {
      marco: 2 * (w + h) * cantidad,
      hoja: 2 * (w + h) * cantidad * 0.6,
      junquillo: 2 * (w + h) * cantidad * 0.8,
    };
  }
}
