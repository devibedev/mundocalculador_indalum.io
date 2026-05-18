export interface CuttingListItem {
  codigo: string;
  descripcion: string;
  cantidad: number;
  longitud: number;
  angulo: string;
}

export interface CalculationResult {
  perfiles: CuttingListItem[];
  vidrio: {
    ancho: number;
    alto: number;
    area: number;
    peso: number;
  };
  herrajes: { descripcion: string; cantidad: number; referencia: string }[];
  alertas: string[];
}

export const KERF = 4; // mm
export const MAX_BAR = 6000; // mm
export const MAX_GLASS_W = 3600; // mm
export const MAX_GLASS_H = 2400; // mm

export function calcularDespiece(
  serie: string,
  config: string,
  width: number,
  height: number
): CalculationResult {
  const perfiles: CuttingListItem[] = [];
  const alertas: string[] = [];
  const res: CalculationResult = {
    perfiles: [],
    vidrio: { ancho: 0, alto: 0, area: 0, peso: 0 },
    herrajes: [],
    alertas: [],
  };

  if (!width || !height || isNaN(width) || isNaN(height)) return res;

  if (width <= 0 || height <= 0) {
    alertas.push("LAS DIMENSIONES DEBEN SER POSITIVAS");
    return { ...res, alertas };
  }

  // Validaciones Básicas
  if (width > MAX_BAR) alertas.push(`ANCHO ${width}mm EXCEDE LÍMITE DE 6000mm`);
  if (height > MAX_BAR) alertas.push(`ALTO ${height}mm EXCEDE LÍMITE DE 6000mm`);

  if (serie === "2800") {
    // Corrediza Serie 2800 (90°)
    perfiles.push({ codigo: "12150", descripcion: "Riel Inferior", cantidad: 1, longitud: width - 12, angulo: "90°/90°" });
    perfiles.push({ codigo: "12151", descripcion: "Riel Superior", cantidad: 1, longitud: width - 12, angulo: "90°/90°" });
    perfiles.push({ codigo: "12152", descripcion: "Jamba Lateral", cantidad: 2, longitud: height, angulo: "90°/90°" });
    
    if (config === "X-O") {
        perfiles.push({ codigo: "12153", descripcion: "Zoclo Hoja", cantidad: 4, longitud: (width - 45) / 2, angulo: "90°/90°" });
        perfiles.push({ codigo: "12154", descripcion: "Cerco Hoja", cantidad: 2, longitud: height - 44, angulo: "90°/90°" });
        perfiles.push({ codigo: "12155", descripcion: "Traslape", cantidad: 2, longitud: height - 44, angulo: "90°/90°" });
        
        res.vidrio.ancho = (width - 141) / 2;
        res.vidrio.alto = height - 130;

        res.herrajes.push({ descripcion: "Carretillas 2801", cantidad: 4, referencia: "A-2801" });
        res.herrajes.push({ descripcion: "Broche Embutido", cantidad: 2, referencia: "A-5001" });
    }
  } else if (serie === "2500") {
    if (config === "X-O") {
        // Corrediza Serie 2500
        perfiles.push({ codigo: "1695", descripcion: "Riel Doble", cantidad: 2, longitud: width, angulo: "45°/45°" });
        perfiles.push({ codigo: "1695", descripcion: "Riel Doble", cantidad: 2, longitud: height, angulo: "45°/45°" });
        perfiles.push({ codigo: "1699", descripcion: "Hoja", cantidad: 4, longitud: (width - 4) / 2, angulo: "45°/45°" });
        perfiles.push({ codigo: "1699", descripcion: "Hoja", cantidad: 4, longitud: height - 63, angulo: "45°/45°" });
        perfiles.push({ codigo: "1619", descripcion: "Adaptador Traslape", cantidad: 2, longitud: height - 65, angulo: "90°/90°" });
        
        res.vidrio.ancho = (width - 215) / 2;
        res.vidrio.alto = height - 170;

        res.herrajes.push({ descripcion: "Carretilla 2501", cantidad: 4, referencia: "A-2501" });
        res.herrajes.push({ descripcion: "Cierre Embutido", cantidad: 2, referencia: "A-5000" });
    } else if (config === "BATIENTE") {
        // Ventana batiente – apertura exterior (página 10)
        perfiles.push({ codigo: "1677", descripcion: "Marco Ventana", cantidad: 2, longitud: width, angulo: "45°/45°" });
        perfiles.push({ codigo: "1677", descripcion: "Marco Ventana", cantidad: 2, longitud: height, angulo: "45°/45°" });
        perfiles.push({ codigo: "1678", descripcion: "Hoja Ventana Ap. Ext.", cantidad: 2, longitud: width - 42, angulo: "45°/45°" });
        perfiles.push({ codigo: "1678", descripcion: "Hoja Ventana Ap. Ext.", cantidad: 2, longitud: height - 42, angulo: "45°/45°" });
        perfiles.push({ codigo: "1693", descripcion: "Junquillo Duo 25mm", cantidad: 2, longitud: width - 150, angulo: "90°/90°" });
        perfiles.push({ codigo: "1693", descripcion: "Junquillo Duo 25mm", cantidad: 2, longitud: height - 122, angulo: "90°/90°" });

        res.vidrio.ancho = width - 132;
        res.vidrio.alto = height - 132;

        res.herrajes.push({ descripcion: "Escuadra Armado Ventana", cantidad: 8, referencia: "A-2507" });
        res.herrajes.push({ descripcion: "Cierre de Presión", cantidad: 1, referencia: "A-2519" });
        res.herrajes.push({ descripcion: "Compás de Proyección", cantidad: 2, referencia: "A-2520" });
        res.herrajes.push({ descripcion: "Tapón Cubre Pija", cantidad: 6, referencia: "A-5022" });
        res.herrajes.push({ descripcion: "Calza para Vidrio", cantidad: 2, referencia: "A-5032" });
        res.herrajes.push({ descripcion: "Empaque Respaldo 8.5", cantidad: (2*width + 2*height)/1000, referencia: "A-5050" });
        res.herrajes.push({ descripcion: "Empaque Descentrado 8.5", cantidad: (4*width + 4*height)/1000, referencia: "A-5051" });
        res.herrajes.push({ descripcion: "Pija Fijadora 10x2", cantidad: 6, referencia: "A-5079" });
        res.herrajes.push({ descripcion: "Taquete 1/4", cantidad: 6, referencia: "A-5090" });
        res.herrajes.push({ descripcion: "Sellador Perimetral", cantidad: (4*width + 4*height)/1000, referencia: "A-5091" });
    } else if (config === "PROYECCION") {
        // Ventana de proyección con mosquitero fijo (página 13)
        perfiles.push({ codigo: "1675", descripcion: "Marco con Mosquitero", cantidad: 2, longitud: width, angulo: "45°/45°" });
        perfiles.push({ codigo: "1675", descripcion: "Marco con Mosquitero", cantidad: 2, longitud: height, angulo: "45°/45°" });
        perfiles.push({ codigo: "1678", descripcion: "Hoja Ventana Ap. Ext.", cantidad: 2, longitud: width - 42, angulo: "45°/45°" });
        perfiles.push({ codigo: "1678", descripcion: "Hoja Ventana Ap. Ext.", cantidad: 2, longitud: height - 42, angulo: "45°/45°" });
        perfiles.push({ codigo: "1667", descripcion: "Junquillo Redondo Duo", cantidad: 2, longitud: width - 114, angulo: "45°/45°" });
        perfiles.push({ codigo: "1667", descripcion: "Junquillo Redondo Duo", cantidad: 2, longitud: height - 114, angulo: "45°/45°" });
        perfiles.push({ codigo: "2057", descripcion: "Mosquitero", cantidad: 2, longitud: width - 82, angulo: "45°/45°" });
        perfiles.push({ codigo: "2057", descripcion: "Mosquitero", cantidad: 2, longitud: height - 82, angulo: "45°/45°" });

        res.vidrio.ancho = width - 132;
        res.vidrio.alto = height - 132;

        res.herrajes.push({ descripcion: "Escuadra Armado Ventana", cantidad: 8, referencia: "A-2507" });
        res.herrajes.push({ descripcion: "Bisagra Dos Palas", cantidad: 2, referencia: "A-2512" });
        res.herrajes.push({ descripcion: "Roto Operador", cantidad: 1, referencia: "A-2521" });
        res.herrajes.push({ descripcion: "Retén Mosquitero", cantidad: 6, referencia: "A-2525" });
        res.herrajes.push({ descripcion: "Tapón Cubre Pija", cantidad: 6, referencia: "A-5022" });
        res.herrajes.push({ descripcion: "Escuadra Mosquitero", cantidad: 4, referencia: "A-5024" });
        res.herrajes.push({ descripcion: "Tela Mosquitero", cantidad: (width * height) / 1000000, referencia: "A-5031" });
        res.herrajes.push({ descripcion: "Calza para Vidrio", cantidad: 2, referencia: "A-5032" });
        res.herrajes.push({ descripcion: "Empaque Respaldo 8.5", cantidad: (2*width + 2*height)/1000, referencia: "A-5050" });
        res.herrajes.push({ descripcion: "Empaque Descentrado 8.5", cantidad: (4*width + 4*height)/1000, referencia: "A-5051" });
        res.herrajes.push({ descripcion: "Empaque Cola de Rata", cantidad: (2*width + 2*height)/1000, referencia: "A-5060" });
        res.herrajes.push({ descripcion: "Pija Fijadora 10x2", cantidad: 6, referencia: "A-5079" });
        res.herrajes.push({ descripcion: "Taquete 1/4", cantidad: 6, referencia: "A-5090" });
        res.herrajes.push({ descripcion: "Sellador Perimetral", cantidad: (4*width + 4*height)/1000, referencia: "A-5091" });
    } else {
        // Fijo (Simplificado)
        perfiles.push({ codigo: "1677", descripcion: "Marco Ventana", cantidad: 2, longitud: width, angulo: "45°/45°" });
        perfiles.push({ codigo: "1677", descripcion: "Marco Ventana", cantidad: 2, longitud: height, angulo: "45°/45°" });
        res.vidrio.ancho = width - 132;
        res.vidrio.alto = height - 132;
    }
  } else if (serie === "3800") {
    // Serie 3800 Corrediza
    perfiles.push({ codigo: "12302", descripcion: "Riel Doble", cantidad: 2, longitud: width - 25, angulo: "90°/90°" });
    perfiles.push({ codigo: "12208", descripcion: "Jamba Lateral", cantidad: 2, longitud: height, angulo: "90°/90°" });
    perfiles.push({ codigo: "12245", descripcion: "Zoclo/Cabezal", cantidad: 4, longitud: (width - 93) / 2, angulo: "90°/90°" });
    perfiles.push({ codigo: "12290", descripcion: "Cerco Puerta", cantidad: 2, longitud: height - 68, angulo: "90°/90°" });
    perfiles.push({ codigo: "12299", descripcion: "Traslape Puerta", cantidad: 2, longitud: height - 68, angulo: "90°/90°" });

    res.vidrio.ancho = (width - 254) / 2;
    res.vidrio.alto = height - 228;

    res.herrajes.push({ descripcion: "Carretilla 3801", cantidad: 4, referencia: "A-3801" });
  } else if (serie === "4000") {
    // Serie 4000 Corrediza
    perfiles.push({ codigo: "2314", descripcion: "Riel Doble", cantidad: 2, longitud: width, angulo: "45°/45°" });
    perfiles.push({ codigo: "2314", descripcion: "Riel Doble", cantidad: 2, longitud: height, angulo: "45°/45°" });
    perfiles.push({ codigo: "2297", descripcion: "Hoja Ventana", cantidad: 4, longitud: (width + 2) / 2, angulo: "45°/45°" });
    perfiles.push({ codigo: "2297", descripcion: "Hoja Ventana", cantidad: 4, longitud: height - 62, angulo: "45°/45°" });
    perfiles.push({ codigo: "2276", descripcion: "Adaptador Traslape", cantidad: 2, longitud: height - 65, angulo: "90°/90°" });

    res.vidrio.ancho = (width - 206) / 2;
    res.vidrio.alto = height - 166;
  } else if (serie === "4500") {
    // Serie 4500 Corrediza
    perfiles.push({ codigo: "4041", descripcion: "Riel Doble", cantidad: 2, longitud: width, angulo: "45°/45°" });
    perfiles.push({ codigo: "4041", descripcion: "Riel Doble", cantidad: 2, longitud: height, angulo: "45°/45°" });
    perfiles.push({ codigo: "4056", descripcion: "Hoja DUO", cantidad: 4, longitud: (width + 4) / 2, angulo: "45°/45°" });
    perfiles.push({ codigo: "4056", descripcion: "Hoja DUO", cantidad: 4, longitud: height - 76, angulo: "45°/45°" });
    perfiles.push({ codigo: "4044", descripcion: "Adaptador Traslape", cantidad: 2, longitud: height - 78, angulo: "90°/90°" });

    res.vidrio.ancho = (width - 264) / 2;
    res.vidrio.alto = height - 210;
  } else if (serie === "3500") {
    // Serie 3500 - Abatibles / Batientes
    if (config === "BATIENTE" || config === "PUERTA") {
      // Marco perimetral
      perfiles.push({ codigo: "2273", descripcion: "Marco Perimetral", cantidad: 2, longitud: width, angulo: "45°/45°" });
      perfiles.push({ codigo: "2273", descripcion: "Marco Perimetral", cantidad: 2, longitud: height, angulo: "45°/45°" });
      
      // Hoja
      perfiles.push({ codigo: "2279", descripcion: "Hoja Puerta/Vna", cantidad: 2, longitud: width - 42, angulo: "45°/45°" });
      perfiles.push({ codigo: "2279", descripcion: "Hoja Puerta/Vna", cantidad: 2, longitud: height - 42, angulo: "45°/45°" });
      
      // Junquillo
      perfiles.push({ codigo: "2221", descripcion: "Junquillo", cantidad: 2, longitud: width - 110, angulo: "90°/90°" });
      perfiles.push({ codigo: "2221", descripcion: "Junquillo", cantidad: 2, longitud: height - 110, angulo: "90°/90°" });

      res.vidrio.ancho = width - 130;
      res.vidrio.alto = height - 130;

      res.herrajes.push({ descripcion: "Bisagra de Presión", cantidad: config === "PUERTA" ? 3 : 2, referencia: "H-3501" });
      res.herrajes.push({ descripcion: "Manija / Falleba", cantidad: 1, referencia: "H-3502" });
      res.herrajes.push({ descripcion: "Escuadra de Tracción", cantidad: 8, referencia: "H-3503" });
    } else {
        // Fijo Serie 3500
        perfiles.push({ codigo: "2273", descripcion: "Marco Fijo", cantidad: 2, longitud: width, angulo: "45°/45°" });
        perfiles.push({ codigo: "2273", descripcion: "Marco Fijo", cantidad: 2, longitud: height, angulo: "45°/45°" });
        perfiles.push({ codigo: "2221", descripcion: "Junquillo", cantidad: 2, longitud: width - 50, angulo: "90°/90°" });
        perfiles.push({ codigo: "2221", descripcion: "Junquillo", cantidad: 2, longitud: height - 50, angulo: "90°/90°" });
        
        res.vidrio.ancho = width - 65;
        res.vidrio.alto = height - 65;
        res.herrajes.push({ descripcion: "Escuadra de Tracción", cantidad: 4, referencia: "H-3503" });
    }
  }

  // Cálculo de Vidrio Global
  if (res.vidrio.ancho > 0 && res.vidrio.alto > 0) {
    res.vidrio.area = (res.vidrio.ancho * res.vidrio.alto) / 1000000;
    res.vidrio.peso = res.vidrio.area * 15; // Estimado 6mm
    
    if (res.vidrio.ancho > MAX_GLASS_W || res.vidrio.alto > MAX_GLASS_H) {
      alertas.push("RIESGO: Vidrio excede dimensiones seguras del vano");
    }
  }

  return { ...res, perfiles, alertas };
}
