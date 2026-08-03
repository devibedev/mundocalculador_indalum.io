// src/core/calculadora/CalculadoraBase.ts
// Clase base abstracta para cálculo de materiales y presupuesto por línea.
// Versión: 1.0.0

import { Proyecto, ProyectoItem, Producto, Presupuesto, ListaMaterial } from '../../types';

export abstract class CalculadoraBase {
  protected config: any;
  protected catalogo: Record<string, Producto> | null = null;
  protected proyecto: Proyecto;

  constructor(config: any) {
    this.config = config;
    this.proyecto = {
      id: '',
      nombre: '',
      linea: 'euro',
      fecha: new Date().toISOString().split('T')[0],
      cliente: { nombre: '' },
      items: [],
      descuento: 0,
      iva: config?.precios?.iva ?? 21,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estado: 'borrador',
    };
  }

  // Métodos abstractos
  abstract calcularPerfiles(item: ProyectoItem): Record<string, number>;
  abstract calcularVidrio(item: ProyectoItem): { tipo: string; area: number };
  abstract calcularAccesorios(item: ProyectoItem): Array<{ id: string; cantidad: number }>;

  // Utilidades comunes
  calcularDesperdicio(metros: number, porcentaje: number): number {
    return metros * (1 + porcentaje / 100);
  }

  calcularPesoTotal(perfiles: Record<string, number>): number {
    if (!this.catalogo) return 0;
    let pesoTotal = 0;
    for (const [id, metros] of Object.entries(perfiles)) {
      const producto = this.catalogo[id];
      if (producto?.peso) {
        pesoTotal += producto.peso * metros;
      }
    }
    return pesoTotal;
  }

  generarListaMaterial(items: ProyectoItem[]): ListaMaterial {
    const perfiles: ListaMaterial['perfiles'] = [];
    const vidrios: ListaMaterial['vidrios'] = [];
    const accesorios: ListaMaterial['accesorios'] = [];

    for (const item of items) {
      const perfilesItem = this.calcularPerfiles(item);
      for (const [id, metros] of Object.entries(perfilesItem)) {
        const prod = this.catalogo?.[id];
        const metrosFinal = this.calcularDesperdicio(metros, this.config?.desperdicio?.perfiles ?? 0);
        const precioUnitario = prod?.precio ?? 0;
        const peso = prod?.peso ?? 0;
        perfiles.push({
          id,
          nombre: prod?.nombre ?? id,
          metros: Number(metrosFinal.toFixed(2)),
          precio: Number(precioUnitario.toFixed(2)),
          peso: Number(peso.toFixed(2)),
          total: Number((metrosFinal * precioUnitario).toFixed(2)),
        });
      }

      const vidrioItem = this.calcularVidrio(item);
      if (vidrioItem) {
        const prod = Object.values(this.catalogo || {}).find(
          (p) => p.categoria === 'vidrio' && p.nombre === vidrioItem.tipo
        );
        const areaFinal = vidrioItem.area * (1 + (this.config?.desperdicio?.vidrio ?? 0) / 100);
        vidrios.push({
          id: prod?.id ?? vidrioItem.tipo,
          nombre: vidrioItem.tipo,
          area: Number(areaFinal.toFixed(2)),
          precio: prod?.precio ?? 0,
          total: Number((areaFinal * (prod?.precio ?? 0)).toFixed(2)),
        });
      }

      for (const acc of this.calcularAccesorios(item)) {
        const prod = this.catalogo?.[acc.id];
        accesorios.push({
          id: acc.id,
          nombre: prod?.nombre ?? acc.id,
          cantidad: acc.cantidad,
          precio: prod?.precio ?? 0,
          total: Number((acc.cantidad * (prod?.precio ?? 0)).toFixed(2)),
        });
      }
    }

    const totalMaterial = [
      ...perfiles,
      ...vidrios,
      ...accesorios,
    ].reduce((sum, item) => sum + item.total, 0);

    return {
      perfiles: this.agruparLista(perfiles),
      vidrios: this.agruparLista(vidrios),
      accesorios: this.agruparLista(accesorios),
      totalMaterial: Number(totalMaterial.toFixed(2)),
    };
  }

  private agruparLista<T extends { id: string; total: number }>(lista: T[]): T[] {
    const mapa = new Map<string, T>();
    for (const item of lista) {
      const existente = mapa.get(item.id);
      if (existente) {
        const actualizado = { ...existente };
        if ('metros' in actualizado && 'metros' in item) {
          (actualizado as any).metros = Number(((actualizado as any).metros + (item as any).metros).toFixed(2));
        }
        if ('area' in actualizado && 'area' in item) {
          (actualizado as any).area = Number(((actualizado as any).area + (item as any).area).toFixed(2));
        }
        if ('cantidad' in actualizado && 'cantidad' in item) {
          (actualizado as any).cantidad = (actualizado as any).cantidad + (item as any).cantidad;
        }
        actualizado.total = Number((actualizado.total + item.total).toFixed(2));
        mapa.set(item.id, actualizado);
      } else {
        mapa.set(item.id, { ...item });
      }
    }
    return Array.from(mapa.values());
  }

  calcularPresupuesto(lista?: ListaMaterial): Presupuesto {
    const listaFinal = lista ?? this.generarListaMaterial(this.proyecto.items);
    const subtotal = listaFinal.totalMaterial;
    const descuentoValor = subtotal * ((this.proyecto.descuento || 0) / 100);
    const base = subtotal - descuentoValor;
    const iva = base * ((this.config?.precios?.iva ?? 21) / 100);
    const total = base + iva;

    return {
      lista: listaFinal,
      subtotal: Number(subtotal.toFixed(2)),
      descuento: Number(descuentoValor.toFixed(2)),
      base: Number(base.toFixed(2)),
      iva: Number(iva.toFixed(2)),
      total: Number(total.toFixed(2)),
      moneda: this.config?.precios?.moneda ?? '€',
    };
  }

  setCatalogo(catalogo: Record<string, Producto>) {
    this.catalogo = catalogo;
  }

  setProyecto(proyecto: Partial<Proyecto>) {
    this.proyecto = {
      ...this.proyecto,
      ...proyecto,
      updatedAt: new Date().toISOString(),
    };
  }

  getProyecto(): Proyecto {
    return this.proyecto;
  }
}
