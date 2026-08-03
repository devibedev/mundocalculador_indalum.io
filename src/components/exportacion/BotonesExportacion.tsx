// src/components/exportacion/BotonesExportacion.tsx
// Descripción: Botones de exportación PDF/Excel
// Versión: 2.0.0
// Autor: Hermes

import React, { useState } from 'react';
import { useProyecto } from '../../contexts/ProyectoContext';
import { useLinea } from '../../contexts/LineaContext';
import { ExportadorPDF } from '../../core/exportadores/ExportadorPDF';
import { ExportadorExcel } from '../../core/exportadores/ExportadorExcel';

export const BotonesExportacion: React.FC = () => {
  const { proyectoActual, exportarPDF, exportarExcel } = useProyecto();
  const { lineaActual } = useLinea();
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [tipoMensaje, setTipoMensaje] = useState<'success' | 'error'>('success');

  const showMensaje = (msg: string, tipo: 'success' | 'error') => {
    setMensaje(msg);
    setTipoMensaje(tipo);
    setTimeout(() => setMensaje(null), 4000);
  };

  const handleExportPDF = async () => {
    if (!proyectoActual || !proyectoActual.presupuesto) {
      showMensaje('❌ No hay proyecto o presupuesto para exportar', 'error');
      return;
    }

    setLoadingPDF(true);
    try {
      await exportarPDF(proyectoActual.id);
      showMensaje('✅ PDF generado correctamente', 'success');
    } catch (error) {
      console.error('Error exportando PDF:', error);
      showMensaje('❌ Error al generar el PDF', 'error');
    } finally {
      setLoadingPDF(false);
    }
  };

  const handleExportExcel = async () => {
    if (!proyectoActual || !proyectoActual.presupuesto) {
      showMensaje('❌ No hay proyecto o presupuesto para exportar', 'error');
      return;
    }

    setLoadingExcel(true);
    try {
      await exportarExcel(proyectoActual.id);
      showMensaje('✅ Excel generado correctamente', 'success');
    } catch (error) {
      console.error('Error exportando Excel:', error);
      showMensaje('❌ Error al generar el Excel', 'error');
    } finally {
      setLoadingExcel(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-3">
        <button
          onClick={handleExportPDF}
          disabled={!proyectoActual || loadingPDF}
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors`}
        >
          {loadingPDF ? (
            <>
              <span className="animate-spin">⏳</span>
              <span>Generando PDF...</span>
            </>
          ) : (
            <>
              <span>📄</span>
              <span>Exportar PDF</span>
            </>
          )}
        </button>
        <button
          onClick={handleExportExcel}
          disabled={!proyectoActual || loadingExcel}
          className={`px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors`}
        >
          {loadingExcel ? (
            <>
              <span className="animate-spin">⏳</span>
              <span>Generando Excel...</span>
            </>
          ) : (
            <>
              <span>📊</span>
              <span>Exportar Excel</span>
            </>
          )}
        </button>
      </div>

      {mensaje && (
        <div
          className={`p-3 rounded-lg text-sm font-medium ${
            tipoMensaje === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {mensaje}
        </div>
      )}
    </div>
  );
};
