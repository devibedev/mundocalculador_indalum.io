// src/components/proyecto/ProyectoSelector.tsx
// Descripción: Selector de proyectos existentes
// Versión: 2.0.0
// Autor: Hermes

import React, { useState } from 'react';
import { useProyecto } from '../../contexts/ProyectoContext';

export const ProyectoSelector: React.FC = () => {
  const { proyectos, proyectoActual, cargarProyecto, seleccionarProyecto, limpiarSeleccion } = useProyecto();
  const [mostrarNuevo, setMostrarNuevo] = useState(false);

  const handleSeleccionar = async (id: string) => {
    await cargarProyecto(id);
    seleccionarProyecto(id);
  };

  const handleLimpiar = () => {
    limpiarSeleccion();
  };

  if (proyectos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg mb-2">📭 No hay proyectos</p>
        <p className="text-sm">Crea un nuevo proyecto para comenzar</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-700">
          Proyectos ({proyectos.length})
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setMostrarNuevo(!mostrarNuevo)}
            className="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary/90"
          >
            + Nuevo
          </button>
          {proyectoActual && (
            <button
              onClick={handleLimpiar}
              className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {mostrarNuevo && (
        <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 mb-4">
          <p className="text-sm text-gray-600 mb-2">Crear nuevo proyecto...</p>
          <button
            onClick={() => setMostrarNuevo(false)}
            className="px-3 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cerrar
          </button>
        </div>
      )}

      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {proyectos.map((proyecto) => (
          <div
            key={proyecto.id}
            onClick={() => handleSeleccionar(proyecto.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              proyectoActual?.id === proyecto.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-gray-200 hover:border-primary/30 hover:shadow-sm'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">
                  {proyecto.nombre || 'Sin nombre'}
                </h4>
                <p className="text-xs text-gray-600">
                  👤 {proyecto.cliente.nombre || 'Sin cliente'}
                </p>
                <div className="flex gap-3 mt-2 text-xs text-gray-500">
                  <span>📅 {proyecto.fecha}</span>
                  <span>📦 {proyecto.items.length} items</span>
                  <span className="capitalize">📊 {proyecto.estado.replace('_', ' ')}</span>
                </div>
              </div>
              {proyecto.presupuesto && (
                <div className="text-right ml-4">
                  <p className="text-sm font-bold text-green-700">
                    €{proyecto.presupuesto.total.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
