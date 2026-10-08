// src/components/Calculadora2500.tsx
import React, { useState } from 'react';
import { catalogo2500 } from '../data/serie2500';
import { calcularDespiece } from '../utils/motorParametrico';
import { ResultadoCalculo } from '../types/indalum';

export default function Calculadora2500() {
  const [ancho, setAncho] = useState<number>(1000);
  const [alto, setAlto] = useState<number>(1200);
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);

  const handleCalcular = () => {
    if (ancho < 300 || alto < 300) {
      alert("Las medidas mínimas son 300x300 mm");
      return;
    }
    const config = catalogo2500.find(c => c.id === '2500-VBI')!;
    setResultado(calcularDespiece(config, ancho, alto));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
        📐 Calculadora Indalum Serie 2500
      </h2>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Ancho de Vano (mm)</label>
          <input type="number" value={ancho} onChange={(e) => setAncho(Number(e.target.value))}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Alto de Vano (mm)</label>
          <input type="number" value={alto} onChange={(e) => setAlto(Number(e.target.value))}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex items-end">
          <button onClick={handleCalcular}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md transition-colors">
            Calcular Despiece
          </button>
        </div>
      </div>

      {/* Resultados */}
      {resultado && (
        <div className="space-y-6">
          {/* Notas del catálogo */}
          {resultado.configuracion.notasGenerales.length > 0 && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
              <p className="text-amber-800 font-semibold">⚠️ Notas de Ensamble:</p>
              <ul className="list-disc list-inside text-amber-700 text-sm mt-1">
                {resultado.configuracion.notasGenerales.map((nota, i) => (
                  <li key={i}>{nota}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tabla de Perfiles con SVG */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <h3 className="bg-gray-100 px-4 py-3 font-bold text-gray-800 border-b">Perfiles de Aluminio</h3>
            <div className="divide-y divide-gray-200">
              {resultado.piezasCorte.map((pieza, idx) => (
                <div key={idx} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  {/* Ilustración SVG del perfil */}
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center flex-shrink-0 border border-gray-300">
                    <svg viewBox="0 0 50 50" className="w-12 h-12 text-blue-800 fill-current">
                      <path d={pieza.descripcion.includes('Marco') ? "M10,10 L40,10 L40,40 L10,40 Z" : 
                               pieza.descripcion.includes('Hoja') ? "M15,15 L35,15 L35,35 L15,35 Z" : 
                               "M20,20 L30,20 L30,25 L20,25 Z"} />
                    </svg>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-blue-700 text-lg">{pieza.clave}</span>
                      <span className="text-gray-700">{pieza.descripcion}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Corte: <span className="font-semibold text-gray-800">{pieza.tipoCorte}</span> | 
                      Fórmula: <span className="font-mono bg-gray-200 px-1 rounded text-xs">{/* Buscar fórmula original */}</span>
                    </div>
                    {pieza.nota && (
                      <div className="text-xs text-red-600 font-medium mt-1">⚠️ {pieza.nota}</div>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{pieza.medidaCorte} <span className="text-sm font-normal text-gray-500">mm</span></div>
                    <div className="text-sm text-gray-500">{pieza.cantidad} pzs</div>
                    <div className="text-xs text-green-600 font-semibold mt-1">${pieza.costoTotal.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen de Costos */}
          <div className="bg-blue-900 text-white p-6 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold">Costo Total Estimado de Materiales</h4>
              <p className="text-blue-200 text-sm">Incluye perfiles, herrajes y vidrio (sin mano de obra)</p>
            </div>
            <div className="text-4xl font-bold">
              ${resultado.costoTotalEstimado.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}