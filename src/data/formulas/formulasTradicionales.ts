// src/data/formulas/formulasTradicionales.ts
// Descripción: Fórmulas de corte para línea tradicional y puertas batientes
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

export const FORMULAS_TRADICIONALES: SerieFormulas[] = [
  {
    id: 'tradicional_generica',
    nombre: 'Línea Tradicional',
    tipos: {
      corrediza: [
        { clave: 'T-1558', descripcion: 'Cerco Traslape', cantidad: 2, angulo: '90°', formula: 'H', tipo: 'marco' },
        { clave: 'T-1558', descripcion: 'Cerco Traslape', cantidad: 2, angulo: '90°', formula: 'V', tipo: 'marco' },
        { clave: 'T-1588', descripcion: 'Riel', cantidad: 2, angulo: '90°', formula: 'H - 18', tipo: 'riel' },
        { clave: 'T-1583', descripcion: 'Jamba con base', cantidad: 2, angulo: '90°', formula: 'V - 16', tipo: 'marco' },
        { clave: 'T-1504', descripcion: 'Junquillo', cantidad: 2, angulo: '90°', formula: 'H - 28', tipo: 'junquillo' }
      ],
      abatible: [
        { clave: 'T-1558', descripcion: 'Cerco Traslape', cantidad: 2, angulo: '90°', formula: 'H', tipo: 'marco' },
        { clave: 'T-1558', descripcion: 'Cerco Traslape', cantidad: 2, angulo: '90°', formula: 'V', tipo: 'marco' },
        { clave: 'T-1548', descripcion: 'Jaladera', cantidad: 1, angulo: '90°', formula: 'H - 12', tipo: 'otros' },
        { clave: 'T-5115', descripcion: 'Junquillo', cantidad: 2, angulo: '90°', formula: 'H - 32', tipo: 'junquillo' }
      ],
      fija: [
        { clave: 'T-1558', descripcion: 'Cerco Traslape', cantidad: 2, angulo: '90°', formula: 'H', tipo: 'marco' },
        { clave: 'T-1558', descripcion: 'Cerco Traslape', cantidad: 2, angulo: '90°', formula: 'V', tipo: 'marco' },
        { clave: 'T-3306', descripcion: 'Junquillo duo', cantidad: 2, angulo: '90°', formula: 'H - 26', tipo: 'junquillo' }
      ],
      puerta_batiente_1750: [
        { clave: '4042', descripcion: 'Sardinel 3"', cantidad: 2, angulo: '90°', formula: 'H', tipo: 'marco' },
        { clave: '4043', descripcion: 'Sardinel 4"', cantidad: 2, angulo: '90°', formula: 'V', tipo: 'marco' },
        { clave: '4081', descripcion: 'Sardinel 6"', cantidad: 1, angulo: '90°', formula: 'H - 24', tipo: 'marco' },
        { clave: '4105', descripcion: 'Batiente', cantidad: 2, angulo: '90°', formula: 'V - 42', tipo: 'hoja' },
        { clave: '5115', descripcion: 'Batiente', cantidad: 2, angulo: '90°', formula: 'H - 42', tipo: 'hoja' },
        { clave: '6370', descripcion: 'Junquillo', cantidad: 2, angulo: '90°', formula: 'H - 84', tipo: 'junquillo' },
        { clave: '6371', descripcion: 'Junquillo', cantidad: 2, angulo: '90°', formula: 'V - 84', tipo: 'junquillo' }
      ]
    }
  }
];

export const ACCESORIOS_TRADICIONALES: Record<string, Array<{ id: string; descripcion: string; cantidad: number }>> = {
  corrediza: [
    { id: 'T-ESC', descripcion: 'Escuadra tradicional', cantidad: 4 },
    { id: 'T-TOR', descripcion: 'Tornillo tradicional', cantidad: 6 },
    { id: 'T-SELL', descripcion: 'Sello tradicional', cantidad: 2 }
  ],
  abatible: [
    { id: 'T-BIS', descripcion: 'Bisagra tradicional', cantidad: 2 },
    { id: 'T-MAN', descripcion: 'Manilla tradicional', cantidad: 1 },
    { id: 'T-TOR', descripcion: 'Tornillo tradicional', cantidad: 5 }
  ],
  fija: [
    { id: 'T-ESC', descripcion: 'Escuadra tradicional', cantidad: 2 },
    { id: 'T-TOR', descripcion: 'Tornillo tradicional', cantidad: 3 }
  ],
  puerta_batiente_1750: [
    { id: '36370', descripcion: 'Pivote descentrado', cantidad: 2 },
    { id: '59187', descripcion: 'Calza cristal', cantidad: 4 },
    { id: '29207', descripcion: 'Cabezal', cantidad: 1 },
    { id: '7014', descripcion: 'Felpa', cantidad: 4 }
  ]
};
