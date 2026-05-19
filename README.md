# Indalum Tool - MundoCanceles PRO

Herramienta técnica para la fabricación de aluminio y sistemas de cancelería. Calcula despieces, gestiona cotizaciones y consulta catálogos de perfiles y herrajes.

## 🚀 Características
- **Catálogo Técnico**: Consulta de perfiles, herrajes y vidrios.
- **Calculadora de Despiece**: Genera cortes precisos basados en medidas de vano.
- **Gestión de Precios**: Personaliza los costos de materiales.
- **Exportación en PDF**: Genera reportes listos para taller o cliente.
- **Modo Offline/Local**: Los datos se guardan en el navegador si no hay conexión a Firebase.

---

## 🛠️ Desarrollo Local

Para correr este proyecto en tu computadora:

1. **Requisitos**: Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).
2. **Instalación**:
   ```bash
   npm install
   ```
3. **Ejecución**:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`.

---

## 📦 Despliegue en GitHub Pages

Esta aplicación está lista para ser desplegada en **GitHub Pages**.

### Opción 1: Despliegue Manual
1. Construye el proyecto:
   ```bash
   npm run build
   ```
2. Sube el contenido de la carpeta `dist` a tu rama de `gh-pages` o simplemente a la carpeta de publicación de GitHub.

### Opción 2: GitHub Actions (Automatizado)
Para que se despliegue solo cada vez que hagas `push`, crea un archivo en `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    env:
      FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true # Recomendado para evitar avisos de obsolescencia
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install and Build
        run: |
          npm install
          npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
```

---

## 🔥 Configuración de Firebase (Opcional)

Si deseas habilitar la sincronización en la nube y autenticación:

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
2. Copia las credenciales de tu "Aplicación Web".
3. Pégalas en el archivo `firebase-applet-config.json` en la raíz del proyecto.
4. Asegúrate de habilitar **Google Authentication** y una base de datos **Firestore**.

Si no configuras Firebase, la aplicación funcionará perfectamente usando el `localStorage` del navegador para guardar tus precios y notas.

---

## 📝 Notas del Desarrollador
- La aplicación usa **Vite** para un desarrollo ultra rápido.
- El diseño es **Mobile-First**, optimizado para usarse en el taller desde un celular.
- Los estilos están basados en **Tailwind CSS**.
