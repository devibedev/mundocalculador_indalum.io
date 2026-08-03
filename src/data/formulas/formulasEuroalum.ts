// src/data/formulas/formulasEuroalum.ts
// Descripción: Fórmulas de corte exactas del catálogo Euroalum®
// Versión: 1.0.0

export interface FormulaCorte {
  clave: string;
  descripcion: string;
  cantidad: number;
  angulo: string;
  formula: string;
  tipo: 'marco' | 'hoja' | 'junquillo' | 'mosquitero' | 'riel' | 'adaptador' | 'otros';
}

export interface SerieFormulas {
  id: string;
  nombre: string;
  tipos: Record<string, FormulaCorte[]>;
}

export const FORMULAS_EUROALUM: SerieFormulas[] = [
  {
    id: '2500',
    nombre: 'Serie 2500',
    tipos: {
      batiente_interior: [
        { clave: '1677', descripcion: 'MARCO VENTANA', cantidad: 2, angulo: '45°', formula: 'H', tipo: 'marco' },
        { clave: '1677', descripcion: 'MARCO VENTANA', cantidad: 2, angulo: '45°', formula: 'V', tipo: 'marco' },
        { clave: '1680', descripcion: 'HOJA VENTANA AP. INT.', cantidad: 2, angulo: '45°', formula: 'H - 42', tipo: 'hoja' },
        { clave: '1680', descripcion: 'HOJA VENTANA AP. INT.', cantidad: 3, angulo: '45°', formula: 'V - 42', tipo: 'hoja' },
        { clave: '1668', descripcion: 'JUNQUILLO REDONDO', cantidad: 2, angulo: '45°', formula: 'H - 114', tipo: 'junquillo' },
        { clave: '1668', descripcion: 'JUNQUILLO REDONDO', cantidad: 2, angulo: '45°', formula: 'V - 114', tipo: 'junquillo' }
      ],
      batiente_exterior: [
        { clave: '1677', descripcion: 'MARCO VENTANA', cantidad: 2, angulo: '45°', formula: 'H', tipo: 'marco' },
        { clave: '1677', descripcion: 'MARCO VENTANA', cantidad: 2, angulo: '45°', formula: 'V', tipo: 'marco' },
        { clave: '1678', descripcion: 'HOJA VENTANA AP. EXT.', cantidad: 2, angulo: '45°', formula: 'H - 42', tipo: 'hoja' },
        { clave: '1678', descripcion: 'HOJA VENTANA AP. EXT.', cantidad: 2, angulo: '45°', formula: 'V - 42', tipo: 'hoja' },
        { clave: '1693', descripcion: 'JUNQUILLO DUO 25MM', cantidad: 2, angulo: '90°', formula: 'H - 150', tipo: 'junquillo' },
        { clave: '1693', descripcion: 'JUNQUILLO DUO 25MM', cantidad: 2, angulo: '90°', formula: 'V - 122', tipo: 'junquillo' }
      ],
      proyeccion: [
        { clave: '1695', descripcion: 'MARCO PROYECCIÓN', cantidad: 2, angulo: '45°', formula: 'H', tipo: 'marco' },
        { clave: '1695', descripcion: 'MARCO PROYECCIÓN', cantidad: 2, angulo: '45°', formula: 'V', tipo: 'marco' },
        { clave: '1696', descripcion: 'HOJA PROYECCIÓN', cantidad: 2, angulo: '45°', formula: 'H - 38', tipo: 'hoja' },
        { clave: '1696', descripcion: 'HOJA PROYECCIÓN', cantidad: 3, angulo: '45°', formula: 'V - 38', tipo: 'hoja' },
        { clave: '1668', descripcion: 'JUNQUILLO REDONDO', cantidad: 2, angulo: '45°', formula: 'H - 114', tipo: 'junquillo' },
        { clave: '1668', descripcion: 'JUNQUILLO REDONDO', cantidad: 2, angulo: '45°', formula: 'V - 114', tipo: 'junquillo' }
      ],
      proyeccion_mosquitero: [
        { clave: '1695', descripcion: 'MARCO PROYECCIÓN', cantidad: 2, angulo: '45°', formula: 'H', tipo: 'marco' },
        { clave: '1695', descripcion: 'MARCO PROYECCIÓN', cantidad: 2, angulo: '45°', formula: 'V', tipo: 'marco' },
        { clave: '1696', descripcion: 'HOJA PROYECCIÓN', cantidad: 2, angulo: '45°', formula: 'H - 38', tipo: 'hoja' },
        { clave: '1696', descripcion: 'HOJA PROYECCIÓN', cantidad: 3, angulo: '45°', formula: 'V - 38', tipo: 'hoja' },
        { clave: '1668', descripcion: 'JUNQUILLO REDONDO', cantidad: 2, angulo: '45°', formula: 'H - 114', tipo: 'junquillo' },
        { clave: '1668', descripcion: 'JUNQUILLO REDONDO', cantidad: 2, angulo: '45°', formula: 'V - 114', tipo: 'junquillo' },
        { clave: 'MOS-2500', descripcion: 'MOSQUITERO 2500', cantidad: 1, angulo: '45°', formula: 'H + 20', tipo: 'mosquitero' },
        { clave: 'MOS-2500', descripcion: 'MOSQUITERO 2500', cantidad: 1, angulo: '45°', formula: 'V + 20', tipo: 'mosquitero' }
      ],
      corrediza_doble: [
        { clave: '1695', descripcion: 'RIEL DOBLE', cantidad: 2, angulo: '45°', formula: 'H', tipo: 'riel' },
        { clave: '1695', descripcion: 'RIEL DOBLE', cantidad: 2, angulo: '45°', formula: 'V', tipo: 'riel' },
        { clave: '1699', descripcion: 'HOJA', cantidad: 4, angulo: '45°', formula: '(H - 4) / 2', tipo: 'hoja' },
        { clave: '1699', descripcion: 'HOJA', cantidad: 4, angulo: '45°', formula: 'V - 63', tipo: 'hoja' },
        { clave: '1619', descripcion: 'ADAPTADOR TRASLAPE', cantidad: 2, angulo: '90°', formula: 'V - 65', tipo: 'adaptador' }
      ],
      corrediza_doble_mosquitero: [
        { clave: '1695', descripcion: 'RIEL DOBLE', cantidad: 2, angulo: '45°', formula: 'H', tipo: 'riel' },
        { clave: '1695', descripcion: 'RIEL DOBLE', cantidad: 2, angulo: '45°', formula: 'V', tipo: 'riel' },
        { clave: '1699', descripcion: 'HOJA', cantidad: 4, angulo: '45°', formula: '(H - 4) / 2', tipo: 'hoja' },
        { clave: '1699', descripcion: 'HOJA', cantidad: 4, angulo: '45°', formula: 'V - 63', tipo: 'hoja' },
        { clave: '1619', descripcion: 'ADAPTADOR TRASLAPE', cantidad: 2, angulo: '90°', formula: 'V - 65', tipo: 'adaptador' },
        { clave: 'MOS-2500', descripcion: 'MOSQUITERO 2500', cantidad: 2, angulo: '45°', formula: '(H / 2) + 20', tipo: 'mosquitero' },
        { clave: 'MOS-2500', descripcion: 'MOSQUITERO 2500', cantidad: 2, angulo: '45°', formula: 'V + 20', tipo: 'mosquitero' }
      ]
    }
  },
  {
    id: '2800',
    nombre: 'Serie 2800',
    tipos: {
      ventana_doble_corrediza: [
        { clave: '12150', descripcion: 'RIEL INFERIOR', cantidad: 1, angulo: '90°', formula: 'H - 12', tipo: 'riel' },
        { clave: '12151', descripcion: 'RIEL SUPERIOR', cantidad: 1, angulo: '90°', formula: 'H - 12', tipo: 'riel' },
        { clave: '12152', descripcion: 'JAMBA', cantidad: 2, angulo: '90°', formula: 'V', tipo: 'marco' },
        { clave: '12153', descripcion: 'ZOCLO', cantidad: 4, angulo: '90°', formula: '(H - 45) / 2', tipo: 'marco' },
        { clave: '12154', descripcion: 'CERCO', cantidad: 2, angulo: '90°', formula: 'V - 44', tipo: 'hoja' },
        { clave: '12155', descripcion: 'TRASLAPE', cantidad: 2, angulo: '90°', formula: 'V - 44', tipo: 'hoja' }
      ],
      corrediza_doble_mosquitero: [
        { clave: '12150', descripcion: 'RIEL INFERIOR', cantidad: 1, angulo: '90°', formula: 'H - 12', tipo: 'riel' },
        { clave: '12151', descripcion: 'RIEL SUPERIOR', cantidad: 1, angulo: '90°', formula: 'H - 12', tipo: 'riel' },
        { clave: '12152', descripcion: 'JAMBA', cantidad: 2, angulo: '90°', formula: 'V', tipo: 'marco' },
        { clave: '12153', descripcion: 'ZOCLO', cantidad: 4, angulo: '90°', formula: '(H - 45) / 2', tipo: 'marco' },
        { clave: '12154', descripcion: 'CERCO', cantidad: 2, angulo: '90°', formula: 'V - 44', tipo: 'hoja' },
        { clave: '12155', descripcion: 'TRASLAPE', cantidad: 2, angulo: '90°', formula: 'V - 44', tipo: 'hoja' },
        { clave: 'MOS-2800', descripcion: 'MOSQUITERO 2800', cantidad: 2, angulo: '90°', formula: '(H + 10) / 2', tipo: 'mosquitero' },
        { clave: 'MOS-2800', descripcion: 'MOSQUITERO 2800', cantidad: 2, angulo: '90°', formula: 'V - 30', tipo: 'mosquitero' }
      ]
    }
  },
  {
    id: '3800',
    nombre: 'Serie 3800',
    tipos: {
      ventana_corrediza: [
        { clave: '12263', descripcion: 'RIEL DOBLE', cantidad: 2, angulo: '90°', formula: 'H - 25', tipo: 'riel' },
        { clave: '12208', descripcion: 'JAMBA', cantidad: 2, angulo: '90°', formula: 'V', tipo: 'marco' },
        { clave: '12241', descripcion: 'ZOCLO Y CABEZAL VENT.DUO', cantidad: 4, angulo: '90°', formula: '(H - 102) / 2', tipo: 'marco' },
        { clave: '12289', descripcion: 'CERCO VENTANA DUO', cantidad: 2, angulo: '90°', formula: 'V - 68', tipo: 'hoja' },
        { clave: '12298', descripcion: 'TRASLAPE VENTANA DUO', cantidad: 2, angulo: '90°', formula: 'V - 68', tipo: 'hoja' },
        { clave: '12271', descripcion: 'CABEZAL MOSQUITERO', cantidad: 1, angulo: '90°', formula: 'H', tipo: 'mosquitero' },
        { clave: '12272', descripcion: 'GUIA P/MOSQUITERO', cantidad: 1, angulo: '45°', formula: 'H', tipo: 'mosquitero' },
        { clave: '12272', descripcion: 'GUIA P/MOSQUITERO', cantidad: 2, angulo: '45°-90°', formula: 'V - 55', tipo: 'mosquitero' },
        { clave: '2138', descripcion: 'MOSQUITERO', cantidad: 2, angulo: '45°', formula: '(H + 35) / 2', tipo: 'mosquitero' },
        { clave: '2138', descripcion: 'MOSQUITERO', cantidad: 2, angulo: '45°', formula: 'V - 52', tipo: 'mosquitero' }
      ],
      puerta_corrediza: [
        { clave: '12302', descripcion: 'RIEL DOBLE', cantidad: 2, angulo: '90°', formula: 'H - 25', tipo: 'riel' },
        { clave: '12208', descripcion: 'JAMBA', cantidad: 2, angulo: '90°', formula: 'V', tipo: 'marco' },
        { clave: '12245', descripcion: 'ZOCLO Y CABEZAL P.', cantidad: 4, angulo: '90°', formula: '(H - 93) / 2', tipo: 'marco' },
        { clave: '12290', descripcion: 'CERCO PUERTA', cantidad: 2, angulo: '90°', formula: 'V - 68', tipo: 'hoja' },
        { clave: '12299', descripcion: 'TRASLAPE PUERTA', cantidad: 2, angulo: '90°', formula: 'H - 68', tipo: 'hoja' },
        { clave: '12301', descripcion: 'GOTERÓN', cantidad: 1, angulo: '90°', formula: 'H', tipo: 'otros' }
      ]
    }
  },
  {
    id: '3900',
    nombre: 'Serie 3900',
    tipos: {
      puerta_corrediza_ventana: [
        { clave: '2314', descripcion: 'RIEL DOBLE', cantidad: 2, angulo: '45°', formula: 'H', tipo: 'riel' },
        { clave: '2314', descripcion: 'RIEL DOBLE', cantidad: 2, angulo: '45°', formula: 'V', tipo: 'riel' },
        { clave: '2297', descripcion: 'HOJA VENTANA', cantidad: 4, angulo: '45°', formula: '(H + 2) / 2', tipo: 'hoja' },
        { clave: '2297', descripcion: 'HOJA VENTANA', cantidad: 4, angulo: '45°', formula: 'V - 62', tipo: 'hoja' },
        { clave: '2276', descripcion: 'ADAP. TRASLAPE', cantidad: 2, angulo: '90°', formula: 'V - 65', tipo: 'adaptador' }
      ],
      puerta_corrediza_puerta: [
        { clave: '2314', descripcion: 'RIEL DOBLE', cantidad: 2, angulo: '45°', formula: 'H', tipo: 'riel' },
        { clave: '2314', descripcion: 'RIEL DOBLE', cantidad: 2, angulo: '45°', formula: 'V', tipo: 'riel' },
        { clave: '2319', descripcion: 'HOJA PUERTA DUO', cantidad: 4, angulo: '45°', formula: '(H + 22) / 2', tipo: 'hoja' },
        { clave: '2319', descripcion: 'HOJA PUERTA DUO', cantidad: 4, angulo: '45°', formula: 'V - 62', tipo: 'hoja' },
        { clave: '2344', descripcion: 'ADAP. TRASLAPE PUERTA', cantidad: 2, angulo: '90°', formula: 'V - 65', tipo: 'adaptador' }
      ]
    }
  },
  {
    id: '4000',
    nombre: 'Serie 4000',
    tipos: {
      oscilobatiente: [
        { clave: '2302', descripcion: 'MARCO', cantidad: 2, angulo: '45°', formula: 'H', tipo: 'marco' },
        { clave: '2302', descripcion: 'MARCO', cantidad: 2, angulo: '45°', formula: 'V', tipo: 'marco' },
        { clave: '2301', descripcion: 'HOJA VENTANA AP. EXT.', cantidad: 2, angulo: '45°', formula: 'H - 66', tipo: 'hoja' },
        { clave: '2301', descripcion: 'HOJA VENTANA AP. EXT.', cantidad: 2, angulo: '45°', formula: 'V - 66', tipo: 'hoja' },
        { clave: '2349', descripcion: 'JUNQUILLO REDONDO DUO', cantidad: 2, angulo: '45°', formula: 'H - 156', tipo: 'junquillo' },
        { clave: '2349', descripcion: 'JUNQUILLO REDONDO DUO', cantidad: 2, angulo: '45°', formula: 'V - 156', tipo: 'junquillo' },
        { clave: '2059', descripcion: 'MOSQUITERO', cantidad: 2, angulo: '45°', formula: 'H - 98', tipo: 'mosquitero' },
        { clave: '2059', descripcion: 'MOSQUITERO', cantidad: 2, angulo: '45°', formula: 'V - 98', tipo: 'mosquitero' },
        { clave: '2219', descripcion: 'PLETINA', cantidad: 1, angulo: '90°', formula: 'Según Herraje', tipo: 'otros' },
        { clave: '2219', descripcion: 'PLETINA', cantidad: 2, angulo: '90°', formula: 'Según Herraje', tipo: 'otros' }
      ],
      ventana_batiente: [
        { clave: '2302', descripcion: 'MARCO', cantidad: 2, angulo: '45°', formula: 'H', tipo: 'marco' },
        { clave: '2302', descripcion: 'MARCO', cantidad: 2, angulo: '45°', formula: 'V', tipo: 'marco' },
        { clave: '2334', descripcion: 'HOJA VENTANA AP. EXT.', cantidad: 2, angulo: '45°', formula: 'H - 66', tipo: 'hoja' },
        { clave: '2334', descripcion: 'HOJA VENTANA AP. EXT.', cantidad: 2, angulo: '45°', formula: 'V - 66', tipo: 'hoja' },
        { clave: '2349', descripcion: 'JUNQUILLO REDONDO DUO', cantidad: 2, angulo: '45°', formula: 'H - 156', tipo: 'junquillo' },
        { clave: '2349', descripcion: 'JUNQUILLO REDONDO DUO', cantidad: 2, angulo: '45°', formula: 'V - 156', tipo: 'junquillo' }
      ]
    }
  },
  {
    id: '4500',
    nombre: 'Serie 4500',
    tipos: {
      puerta_corrediza: [
        { clave: '4041', descripcion: 'RIEL DOBLE', cantidad: 2, angulo: '45°', formula: 'H', tipo: 'riel' },
        { clave: '4041', descripcion: 'RIEL DOBLE', cantidad: 2, angulo: '45°', formula: 'V', tipo: 'riel' },
        { clave: '4056', descripcion: 'HOJA DUO', cantidad: 4, angulo: '45°', formula: '(H + 4) / 2', tipo: 'hoja' },
        { clave: '4056', descripcion: 'HOJA DUO', cantidad: 4, angulo: '45°', formula: 'V - 76', tipo: 'hoja' },
        { clave: '4044', descripcion: 'ADAP. TRASLAPE', cantidad: 2, angulo: '90°', formula: 'V - 78', tipo: 'adaptador' }
      ]
    }
  }
];
