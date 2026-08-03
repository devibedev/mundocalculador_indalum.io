// src/utils/helpers.ts
// Descripción: Funciones auxiliares
// Versión: 2.0.0

export const generarId = (prefix: string = 'ID'): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  const sequence = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${timestamp}-${random}${sequence}`.toUpperCase();
};

export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const formatCurrency = (amount: number, currency: string = '€'): string => {
  return `${currency} ${amount.toFixed(2)}`;
};

export const roundToTwo = (num: number): number => {
  return Math.round(num * 100) / 100;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const isEmpty = (obj: any): boolean => {
  return (
    obj === null ||
    obj === undefined ||
    (typeof obj === 'object' && Object.keys(obj).length === 0) ||
    (typeof obj === 'string' && obj.trim() === '')
  );
};
