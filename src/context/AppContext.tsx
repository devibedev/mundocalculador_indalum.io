import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, PriceData, CartItem, Project, AppNote, INITIAL_PRODUCTS, INITIAL_PRICES, CalculationHistory } from '../data/initialData';
import { calcularDespiece, CalculationResult } from '../lib/calculationLogic';
import { auth, db, googleProvider, handleFirestoreError, OperationType, testConnection } from '../lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  deleteDoc, 
  updateDoc, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';

interface AppContextType {
  products: Product[];
  prices: Record<string, PriceData>;
  cart: CartItem[];
  projects: Project[];
  notes: AppNote[];
  history: CalculationHistory[];
  darkMode: boolean;
  user: User | null;
  authLoading: boolean;
  isAuthEnabled: boolean;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
  toggleDarkMode: () => void;
  updatePrice: (codigo: string, unitPrice: number, type: 'unit' | 'meter') => void;
  addToCart: (item: Partial<CartItem>) => void;
  removeFromCart: (id: string) => void;
  saveProject: (nombre: string) => void;
  loadProject: (project: Project) => void;
  addNote: (content: string) => void;
  deleteNote: (id: number | string) => void;
  performDespiece: (serie: string, config: string, w: number, h: number) => CalculationResult;
  saveToHistory: (serie: string, config: string, w: number, h: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prices, setPrices] = useState<Record<string, PriceData>>(INITIAL_PRICES);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [notes, setNotes] = useState<AppNote[]>([]);
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // PERSISTENCE KEYS
  const STORAGE_KEYS = {
    PRICES: 'mundocanceles_prices',
    PROJECTS: 'mundocanceles_projects',
    NOTES: 'mundocanceles_notes',
    HISTORY: 'mundocanceles_history',
    CART: 'mundocanceles_cart'
  };

  // Initial connection test
  useEffect(() => {
    testConnection();
    
    // Load local data as initial state
    const savedPrices = localStorage.getItem(STORAGE_KEYS.PRICES);
    if (savedPrices) setPrices(JSON.parse(savedPrices));
    
    const savedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    
    const savedNotes = localStorage.getItem(STORAGE_KEYS.NOTES);
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    
    const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedTheme = localStorage.getItem('mundocanceles_theme');
    if (savedTheme === 'dark') setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mundocanceles_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mundocanceles_theme', 'light');
    }
  }, [darkMode]);

  // Auth State
  useEffect(() => {
    if (!auth) {
      setAuthLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Save to localStorage when things change and NO USER
  useEffect(() => {
    if (!user) {
      localStorage.setItem(STORAGE_KEYS.PRICES, JSON.stringify(prices));
    }
  }, [prices, user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    }
  }, [projects, user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    }
  }, [notes, user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    }
  }, [history, user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    }
  }, [cart, user]);

  // Firebase Real-time Sync
  useEffect(() => {
    if (!user || !db) {
      // If we logout or no DB, we already have initial state or local state
      return;
    }

    const userId = user.uid;

    // Listen to Prices
    const unsubPrices = onSnapshot(collection(db, 'users', userId, 'prices'), (snapshot) => {
      const overrides: Record<string, PriceData> = {};
      snapshot.forEach(doc => {
        overrides[doc.id] = doc.data() as PriceData;
      });
      setPrices({ ...INITIAL_PRICES, ...overrides });
    }, (err) => handleFirestoreError(err, OperationType.LIST, `users/${userId}/prices`));

    // Listen to Projects
    const unsubProjects = onSnapshot(query(collection(db, 'users', userId, 'projects'), orderBy('fecha', 'desc')), (snapshot) => {
      const projs: Project[] = [];
      snapshot.forEach(doc => {
        projs.push({ id: doc.id as any, ...doc.data() } as Project);
      });
      setProjects(projs);
    }, (err) => handleFirestoreError(err, OperationType.LIST, `users/${userId}/projects`));

    // Listen to Cart
    const unsubCart = onSnapshot(collection(db, 'users', userId, 'cart'), (snapshot) => {
      const items: CartItem[] = [];
      snapshot.forEach(doc => {
        items.push({ id: doc.id, ...doc.data() } as CartItem);
      });
      setCart(items);
    }, (err) => handleFirestoreError(err, OperationType.LIST, `users/${userId}/cart`));

    // Listen to Notes
    const unsubNotes = onSnapshot(query(collection(db, 'users', userId, 'notes'), orderBy('fecha', 'desc')), (snapshot) => {
      const ns: AppNote[] = [];
      snapshot.forEach(doc => {
        ns.push({ id: doc.id as any, ...doc.data() } as AppNote);
      });
      setNotes(ns);
    }, (err) => handleFirestoreError(err, OperationType.LIST, `users/${userId}/notes`));

    // Listen to History
    const unsubHistory = onSnapshot(query(collection(db, 'users', userId, 'history'), orderBy('fecha', 'desc'), limit(50)), (snapshot) => {
      const hist: CalculationHistory[] = [];
      snapshot.forEach(doc => {
        hist.push({ id: doc.id, ...doc.data() } as CalculationHistory);
      });
      setHistory(hist);
    }, (err) => handleFirestoreError(err, OperationType.LIST, `users/${userId}/history`));

    return () => {
      unsubPrices();
      unsubProjects();
      unsubCart();
      unsubNotes();
      unsubHistory();
    };
  }, [user]);

  const signIn = async () => {
    if (!auth) {
      console.warn("Auth is not configured");
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const logout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updatePrice = async (codigo: string, unitPrice: number, type: 'unit' | 'meter') => {
    const data: PriceData = {
      unitPrice: Math.max(0, unitPrice),
      type,
      lastUpdated: new Date().toISOString()
    };
    
    if (!user) {
      setPrices(prev => ({ ...prev, [codigo]: data }));
      return;
    }

    try {
      await setDoc(doc(db, 'users', user.uid, 'prices', codigo), data);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/prices/${codigo}`);
    }
  };

  const addToCart = async (item: Partial<CartItem>) => {
    const product = INITIAL_PRODUCTS.find(p => p.codigo === item.codigo);
    const priceInfo = prices[item.codigo || ''] || { unitPrice: 0, type: 'unit' };

    const isHerraje = product?.tipo === 'herraje' || item.tipo === 'herraje' || item.codigo === 'HARDWARE';
    const esPorMetro = !isHerraje && !!item.esPorMetro;

    const newItem: Partial<CartItem> = {
      codigo: item.codigo || 'N/A',
      nombre: item.nombre || product?.nombre || 'Producto',
      tipo: product?.tipo || (item.tipo as any) || 'especial',
      cantidad: item.cantidad || 1,
      metros: isHerraje ? null : (item.metros || null),
      esPorMetro: esPorMetro,
      precioUnitario: item.precioUnitario !== undefined ? item.precioUnitario : priceInfo.unitPrice,
      total: 0,
      kerfIncluded: esPorMetro
    };

    if (item.total !== undefined) {
      newItem.total = item.total;
    } else {
      if (newItem.esPorMetro && newItem.metros) {
        const metrosConKerf = newItem.metros + 0.004;
        newItem.total = (metrosConKerf * (newItem.cantidad || 1)) * (newItem.precioUnitario || 0);
      } else {
        newItem.total = (newItem.cantidad || 1) * (newItem.precioUnitario || 0);
      }
    }

    if (!user) {
      setCart(prev => [...prev, { ...newItem, id: Date.now().toString() + Math.random() } as CartItem]);
      return;
    }

    try {
      const newId = Date.now().toString() + Math.random().toString(36).substring(7);
      await setDoc(doc(db, 'users', user.uid, 'cart', newId), newItem);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/cart`);
    }
  };

  const performDespiece = (serie: string, config: string, w: number, h: number) => {
    return calcularDespiece(serie, config, w, h);
  };

  const removeFromCart = async (id: string) => {
    if (!user) {
      setCart(prev => prev.filter(item => item.id !== id));
      return;
    }

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'cart', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `users/${user.uid}/cart/${id}`);
    }
  };

  const saveProject = async (nombre: string) => {
    if (cart.length === 0) return;
    const projectTotal = cart.reduce((acc, curr) => acc + curr.total, 0);
    const projectData = {
      nombre,
      fecha: new Date().toISOString(),
      items: [...cart],
      total: projectTotal
    };

    if (!user) {
      setProjects(prev => [{ ...projectData, id: Date.now() } as Project, ...prev]);
      setCart([]);
      return;
    }

    try {
      const projectId = Date.now().toString();
      await setDoc(doc(db, 'users', user.uid, 'projects', projectId), projectData);
      // Clear cart in Firebase
      for (const item of cart) {
        await deleteDoc(doc(db, 'users', user.uid, 'cart', item.id));
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/projects`);
    }
  };

  const loadProject = async (project: Project) => {
    if (!user) {
      setCart([...project.items]);
      return;
    }
    // Adds to cart in Firebase
    for (const item of project.items) {
      await addToCart(item);
    }
  };

  const addNote = async (content: string) => {
    const noteData = {
      content,
      fecha: new Date().toISOString()
    };

    if (!user) {
      setNotes(prev => [{ ...noteData, id: Date.now() } as AppNote, ...prev]);
      return;
    }

    try {
      const noteId = Date.now().toString();
      await setDoc(doc(db, 'users', user.uid, 'notes', noteId), noteData);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/notes`);
    }
  };

  const deleteNote = async (id: number | string) => {
    if (!user) {
      setNotes(prev => prev.filter(n => n.id !== id));
      return;
    }

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'notes', id.toString()));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `users/${user.uid}/notes/${id}`);
    }
  };

  const saveToHistory = async (serie: string, config: string, w: number, h: number) => {
    const historyData = {
      fecha: new Date().toISOString(),
      serie,
      config,
      width: w,
      height: h
    };

    if (!user) {
      setHistory(prev => [{ ...historyData, id: Date.now().toString() } as CalculationHistory, ...prev].slice(0, 50));
      return;
    }

    try {
      const historyId = Date.now().toString();
      await setDoc(doc(db, 'users', user.uid, 'history', historyId), historyData);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/history`);
    }
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <AppContext.Provider value={{
      products: INITIAL_PRODUCTS,
      prices,
      cart,
      projects,
      notes,
      history,
      darkMode,
      user,
      authLoading,
      signIn,
      logout,
      toggleDarkMode,
      isAuthEnabled: !!auth,
      updatePrice,
      addToCart,
      removeFromCart,
      saveProject,
      loadProject,
      addNote,
      deleteNote,
      performDespiece,
      saveToHistory
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
