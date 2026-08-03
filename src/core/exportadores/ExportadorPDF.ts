// src/core/exportadores/ExportadorPDF.ts
// Descripción: Generador de presupuesto PDF profesional
// Versión: 2.0.0
// Autor: Hermes

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Presupuesto, Proyecto } from '../../types';

export class ExportadorPDF {
  private doc: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number;

  constructor() {
    this.doc = new jsPDF();
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.margin = 14;
  }

  async exportar(proyecto: Proyecto, presupuesto: Presupuesto): Promise<void> {
    this.doc = new jsPDF();
    this.agregarEncabezado(proyecto);
    this.agregarDatosProyecto(proyecto);
    this.agregarTablaMateriales(presupuesto);
    this.agregarTotales(presupuesto);
    this.agregarPie();
    this.doc.save(`Presupuesto_${proyecto.nombre || 'Proyecto'}_${proyecto.fecha}.pdf`);
  }

  private agregarEncabezado(proyecto: Proyecto): void {
    this.doc.setFontSize(20);
    this.doc.setTextColor(22, 23, 23);
    this.doc.text('MUNDOCANCELES', this.margin, 20);
    this.doc.setFontSize(12);
    this.doc.setTextColor(100);
    this.doc.text('Sistema de Ingeniería Indalum', this.margin, 28);
    this.doc.setDrawColor(22, 23, 23);
    this.doc.setLineWidth(0.5);
    this.doc.line(this.margin, 32, this.pageWidth - this.margin, 32);
  }

  private agregarDatosProyecto(proyecto: Proyecto): void {
    let y = 40;
    this.doc.setFontSize(11);
    this.doc.setTextColor(22, 23, 23);
    this.doc.text(`Proyecto: ${proyecto.nombre || 'Sin nombre'}`, this.margin, y);
    y += 6;
    this.doc.setFontSize(9);
    this.doc.setTextColor(100);
    this.doc.text(`Cliente: ${proyecto.cliente.nombre || 'Sin cliente'}`, this.margin, y);
    y += 5;
    this.doc.text(`Fecha: ${proyecto.fecha}`, this.margin, y);
    y += 5;
    this.doc.text(`Línea: ${proyecto.linea.toUpperCase()}`, this.margin, y);
    y += 8;
  }

  private agregarTablaMateriales(presupuesto: Presupuesto): void {
    const body: any[] = [];

    for (const p of presupuesto.lista.perfiles) {
      body.push([p.nombre, `${p.metros.toFixed(2)} m`, `${p.precio.toFixed(2)} €`, `${p.total.toFixed(2)} €`]);
    }
    for (const v of presupuesto.lista.vidrios) {
      body.push([v.nombre, `${v.area.toFixed(2)} m²`, `${v.precio.toFixed(2)} €`, `${v.total.toFixed(2)} €`]);
    }
    for (const a of presupuesto.lista.accesorios) {
      body.push([a.nombre, `${a.cantidad} und`, `${a.precio.toFixed(2)} €`, `${a.total.toFixed(2)} €`]);
    }

    autoTable(this.doc, {
      startY: 68,
      head: [['Concepto', 'Cantidad', 'Precio unitario', 'Total']],
      body,
      theme: 'striped',
      headStyles: { fillColor: [22, 23, 23], textColor: [255, 255, 255], fontSize: 9 },
      styles: { fontSize: 8, font: 'helvetica' },
      columnStyles: {
        0: { cellWidth: 70 },
        1: { cellWidth: 25, halign: 'center' },
        2: { cellWidth: 30, halign: 'right' },
        3: { cellWidth: 30, halign: 'right' },
      },
    });
  }

  private agregarTotales(presupuesto: Presupuesto): void {
    const finalY = (this.doc as any).lastAutoTable?.finalY ?? 120;
    const y = finalY + 12;

    this.doc.setFontSize(11);
    this.doc.setTextColor(22, 23, 23);
    this.doc.text(`Subtotal: ${presupuesto.subtotal.toFixed(2)} €`, this.pageWidth - this.margin, y, { align: 'right' });
    this.doc.text(`Descuento: ${presupuesto.descuento.toFixed(2)} €`, this.pageWidth - this.margin, y + 6, { align: 'right' });
    this.doc.text(`Base: ${presupuesto.base.toFixed(2)} €`, this.pageWidth - this.margin, y + 12, { align: 'right' });
    this.doc.text(`IVA (${presupuesto.moneda}): ${presupuesto.iva.toFixed(2)} €`, this.pageWidth - this.margin, y + 18, { align: 'right' });
    this.doc.setFontSize(13);
    this.doc.text(`TOTAL: ${presupuesto.total.toFixed(2)} €`, this.pageWidth - this.margin, y + 26, { align: 'right' });
  }

  private agregarPie(): void {
    const finalY = (this.doc as any).lastAutoTable?.finalY ?? 150;
    const y = finalY + 45;
    this.doc.setFontSize(8);
    this.doc.setTextColor(150);
    this.doc.text('* Este documento es una estimación técnica generada por MundoCanceles.', this.margin, y);
    this.doc.text('  Los precios y despieces deben ser validados físicamente.', this.margin, y + 5);
  }
}
