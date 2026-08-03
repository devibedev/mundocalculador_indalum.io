// src/core/exportadores/ExportadorExcel.ts
// Descripción: Generador de listas de materiales en Excel
// Versión: 2.0.0
// Autor: Hermes
// Dependencias: xlsx

import * as XLSX from 'xlsx';
import { Presupuesto, Proyecto } from '../../types';
import { formatCurrency } from '../../utils/helpers';

export class ExportadorExcel {
  generarExcel(proyecto: Proyecto, presupuesto: Presupuesto): XLSX.WorkBook {
    const workbook = XLSX.utils.book_new();

    const resumenSheet = XLSX.utils.aoa_to_sheet(this.generarResumenData(proyecto, presupuesto));
    this.ajustarColumnas(resumenSheet);
    XLSX.utils.book_append_sheet(workbook, resumenSheet, 'Resumen');

    const perfilesSheet = XLSX.utils.aoa_to_sheet(this.generarPerfilesData(presupuesto));
    this.ajustarColumnas(perfilesSheet);
    XLSX.utils.book_append_sheet(workbook, perfilesSheet, 'Perfiles');

    const vidriosSheet = XLSX.utils.aoa_to_sheet(this.generarVidriosData(presupuesto));
    this.ajustarColumnas(vidriosSheet);
    XLSX.utils.book_append_sheet(workbook, vidriosSheet, 'Vidrios');

    const accesoriosSheet = XLSX.utils.aoa_to_sheet(this.generarAccesoriosData(presupuesto));
    this.ajustarColumnas(accesoriosSheet);
    XLSX.utils.book_append_sheet(workbook, accesoriosSheet, 'Accesorios');

    const itemsSheet = XLSX.utils.aoa_to_sheet(this.generarItemsData(proyecto));
    this.ajustarColumnas(itemsSheet);
    XLSX.utils.book_append_sheet(workbook, itemsSheet, 'Items');

    return workbook;
  }

  private generarResumenData(proyecto: Proyecto, presupuesto: Presupuesto): any[][] {
    const { subtotal, descuento, base, iva, total, moneda } = presupuesto;
    return [
      ['RESUMEN DEL PRESUPUESTO'],
      [''],
      ['Proyecto:', proyecto.nombre],
      ['Cliente:', proyecto.cliente.nombre],
      ['Fecha:', proyecto.fecha],
      ['Línea:', proyecto.linea],
      ['Estado:', proyecto.estado],
      [''],
      ['TOTALES'],
      ['Subtotal:', formatCurrency(subtotal, moneda)],
      ['Descuento:', `- ${formatCurrency(descuento, moneda)}`],
      ['Base:', formatCurrency(base, moneda)],
      [`IVA (${presupuesto.iva}%):`, formatCurrency(iva, moneda)],
      ['TOTAL:', formatCurrency(total, moneda)],
      [''],
      ['RESUMEN DE MATERIALES'],
      ['Perfiles:', `${presupuesto.lista.perfiles.length} tipos`],
      ['Vidrios:', `${presupuesto.lista.vidrios.length} tipos`],
      ['Accesorios:', `${presupuesto.lista.accesorios.length} tipos`],
      ['Total items:', `${proyecto.items.length} elementos`],
    ];
  }

  private generarPerfilesData(presupuesto: Presupuesto): any[][] {
    const headers = ['Código', 'Perfil', 'Metros', 'Precio/m', 'Total', 'Peso (kg)'];
    const data: any[][] = [headers];
    for (const p of presupuesto.lista.perfiles) {
      data.push([p.id, p.nombre, p.metros.toFixed(2), p.precio.toFixed(2), p.total.toFixed(2), (p.peso * p.metros).toFixed(2)]);
    }
    const totalMetros = presupuesto.lista.perfiles.reduce((sum, p) => sum + p.metros, 0);
    const totalPeso = presupuesto.lista.perfiles.reduce((sum, p) => sum + (p.peso * p.metros), 0);
    data.push([]);
    data.push(['TOTALES', '', totalMetros.toFixed(2), '', presupuesto.lista.perfiles.reduce((sum, p) => sum + p.total, 0).toFixed(2), totalPeso.toFixed(2)]);
    return data;
  }

  private generarVidriosData(presupuesto: Presupuesto): any[][] {
    const headers = ['Código', 'Vidrio', 'Área (m²)', 'Precio/m²', 'Total'];
    const data: any[][] = [headers];
    for (const v of presupuesto.lista.vidrios) {
      data.push([v.id, v.nombre, v.area.toFixed(2), v.precio.toFixed(2), v.total.toFixed(2)]);
    }
    if (presupuesto.lista.vidrios.length > 0) {
      data.push([]);
      data.push(['TOTALES', '', presupuesto.lista.vidrios.reduce((sum, v) => sum + v.area, 0).toFixed(2), '', presupuesto.lista.vidrios.reduce((sum, v) => sum + v.total, 0).toFixed(2)]);
    }
    return data;
  }

  private generarAccesoriosData(presupuesto: Presupuesto): any[][] {
    const headers = ['Código', 'Accesorio', 'Cantidad', 'Precio/ud', 'Total'];
    const data: any[][] = [headers];
    for (const a of presupuesto.lista.accesorios) {
      data.push([a.id, a.nombre, a.cantidad, a.precio.toFixed(2), a.total.toFixed(2)]);
    }
    if (presupuesto.lista.accesorios.length > 0) {
      data.push([]);
      data.push(['TOTALES', '', presupuesto.lista.accesorios.reduce((sum, a) => sum + a.cantidad, 0), '', presupuesto.lista.accesorios.reduce((sum, a) => sum + a.total, 0).toFixed(2)]);
    }
    return data;
  }

  private generarItemsData(proyecto: Proyecto): any[][] {
    const headers = ['ID', 'Tipo', 'Modelo', 'Ancho (mm)', 'Alto (mm)', 'Cantidad', 'Acabado'];
    const data: any[][] = [headers];
    for (const item of proyecto.items) {
      data.push([item.id, item.tipo, item.modelo, item.ancho, item.alto, item.cantidad, item.acabado]);
    }
    return data;
  }

  private ajustarColumnas(sheet: XLSX.WorkSheet): void {
    sheet['!cols'] = [
      { wch: 15 }, { wch: 30 }, { wch: 12 }, { wch: 12 }, { wch: 15 }, { wch: 12 }
    ];
  }

  descargar(workbook: XLSX.WorkBook, nombre: string = 'lista_materiales'): void {
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${nombre}.xlsx`;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
