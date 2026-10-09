// src/components/Calculadora2500.tsx

import React, { useState } from 'react';
import { catalogo2500 } from '../data/serie2500';
import { calcularDespiece } from '../utils/motorParametrico';
import { ResultadoCalculo } from '../types/indalum';
import { Plus, Calculator } from 'lucide-react';

interface Calculadora2500Props {
  onAddToCart?: (items: any[]) => void;
}

export default function Calculadora2500({ onAddToCart }: Calculadora2500Props) {
  const [ancho, setAncho] = useState<number>(1000);
  const [alto, setAlto] = useState<number>(1200);
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);

  const handleCalcular = () => {
    if (ancho < 300 || alto < 300) {
      alert("Las medidas mínimas son 300x300 mm");
      return;
    }
    const config = catalogo2500[0];
    setResultado(calcularDespiece(config, ancho, alto));
  };

  const handleAgregarAlCarrito = () => {
    if (!resultado || !onAddToCart) return;

    const items = [
      // Perfiles
      ...resultado.piezasCorte.map(p => ({
        codigo: p.clave,
        nombre: p.descripcion,
        cantidad: p.cantidad,
        metros: p.medidaCorte / 1000,
        esPorMetro: true,
        precioUnitario: p.cantidad > 0 ? p.costoTotal / p.cantidad : 0,
        total: p.costoTotal
      })),
      // Herrajes
      ...resultado.herrajesCalculados.map(h => ({
        codigo: h.clave,
        nombre: h.descripcion,
        cantidad: h.cantidad,
        esPorMetro: false,
        precioUnitario: h.cantidad > 0 ? h.costoTotal / h.cantidad : 0,
        total: h.costoTotal
      })),
      // Vidrio
      {
        codigo: 'VIDRIO-6MM',
        nombre: `Vidrio 6mm ${resultado.vidrioCalculado.ancho}x${resultado.vidrioCalculado.alto}`,
        cantidad: 1,
        esPorMetro: false,
        precioUnitario: resultado.vidrioCalculado.costoTotal,
        total: resultado.vidrioCalculado.costoTotal
      }
    ];

    onAddToCart(items);
    alert(`✅ ${items.length} items agregados al carrito`);
  };

  return (
    <div className="sketch-border p-6 bg-white space-y-6">
      <div className="flex items-center gap-2 border-b border-primary pb-2">
        <Calculator size={18} />
        <h2 className="font-bold text-sm uppercase tracking-widest">
          Calculadora Serie 2500 - Euroalum
        </h2>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4 bg-primary/5 p-4 border border-primary/10">
        <div>
          <label className="text-[9px] font-bold uppercase block mb-1 opacity-60">Ancho (mm)</label>
          <input
            type="number"
            value={ancho}
            onChange={(e) => setAncho(Number(e.target.value))}
            className="sketch-input w-full py-1.5 text-sm font-mono text-center"
          />
        </div>
        <div>
          <label className="text-[9px] font-bold uppercase block mb-1 opacity-60">Alto (mm)</label>
          <input
            type="number"
            value={alto}
            onChange={(e) => setAlto(Number(e.target.value))}
            className="sketch-input w-full py-1.5 text-sm font-mono text-center"
          />
        </div>
      </div>

      <button
        onClick={handleCalcular}
        className="sketch-btn w-full bg-primary text-white flex items-center justify-center gap-2 py-3"
      >
        <Calculator size={18} />
        <span className="tracking-widest text-xs">CALCULAR DESPIECE</span>
      </button>

      {/* Resultados */}
      {resultado && (
        <div className="space-y-4">
          {/* Notas */}
          {resultado.configuracion.notasGenerales.length > 0 && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-3">
              <p className="text-amber-800 text-[10px] font-bold uppercase">⚠️ Notas:</p>
              <ul className="list-disc list-inside text-amber-700 text-[10px] mt-1">
                {resultado.configuracion.notasGenerales.map((nota, i) => (
                  <li key={i}>{nota}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Perfiles */}
          <div className="space-y-2">
            <div className="text-[9px] font-bold opacity-40 uppercase tracking-widest">
              // PERFILES DE ALUMINIO
            </div>
            {resultado.piezasCorte.map((p, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 bg-white/50 border border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-700 rounded flex items-center justify-center shrink-0 border border-primary/20">
                    <svg viewBox="0 0 50 50" className="w-8 h-8 text-blue-800 dark:text-blue-400 fill-current stroke-current stroke-1">
                      <path d={p.svgPath || (p.descripcion.includes('Marco') ? "M10,10 L40,10 L40,40 L10,40 Z" :
                               p.descripcion.includes('Hoja') ? "M15,15 L35,15 L35,35 L15,35 Z" :
                               "M20,20 L30,20 L30,25 L20,25 Z")} />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-[11px]">{p.clave}</div>
                    <div className="text-[9px] opacity-60">{p.descripcion}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{p.medidaCorte} mm</div>
                  <div className="text-[9px] opacity-60">{p.cantidad} pzs</div>
                  <div className="text-[10px] text-green-600 font-semibold">${p.costoTotal.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Herrajes */}
          <div className="space-y-2">
            <div className="text-[9px] font-bold opacity-40 uppercase tracking-widest">
              // HERRAJES
            </div>
            {resultado.herrajesCalculados.slice(0, 5).map((h, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 bg-white/50 border border-primary/10 text-[10px]">
                <span>{h.descripcion}</span>
                <div className="text-right">
                  <div className="font-bold">{h.cantidad} {h.unidad}</div>
                  <div className="text-green-600">${h.costoTotal.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Vidrio */}
          <div className="bg-blue-50 border border-blue-200 p-3">
            <div className="text-[10px] font-bold text-blue-800 uppercase">Vidrio</div>
            <div className="text-sm font-mono">
              {resultado.vidrioCalculado.ancho} x {resultado.vidrioCalculado.alto} mm
            </div>
            <div className="text-xs text-blue-600 mt-1">
              Área: {resultado.vidrioCalculado.areaM2.toFixed(2)} m² | ${resultado.vidrioCalculado.costoTotal.toFixed(2)}
            </div>
          </div>

          {/* Total y botón agregar */}
          <div className="pt-4 border-t-2 border-primary">
            <div className="flex justify-between items-center mb-4">
              <div className="text-[10px] font-bold uppercase opacity-60">COSTO TOTAL</div>
              <div className="text-2xl font-bold font-mono">${resultado.costoTotalEstimado.toFixed(2)}</div>
            </div>
            <button
              onClick={handleAgregarAlCarrito}
              className="sketch-btn w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 py-3"
            >
              <Plus size={18} />
              <span className="tracking-widest text-xs">AGREGAR TODO AL CARRITO</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
