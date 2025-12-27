# Invitación Virtual de Boda - Rosa & Hernán

Invitación virtual elegante para el casamiento de Rosa y Hernán con diseño en tonos pasteles rosa y blanco.

## Características

- ✨ Diseño elegante con tonos pasteles rosa y blanco
- 💍 Anillos de comprometidos animados
- 📅 Fecha, día y hora editables
- 📍 Integración con Google Maps para mostrar la ubicación
- 🌸 Decoración con flores blancas (jazmines) en los costados
- 📸 Espacio para foto de los novios
- 📱 Diseño responsivo (adaptado para móviles)

## Instrucciones de uso

### 1. Agregar foto de los novios

Coloca una foto de Rosa y Hernán en la carpeta `images/` con el nombre `novios.jpg`.

Si no agregas la foto, se mostrará una imagen placeholder.

### 2. Configurar Google Maps (Opcional pero recomendado)

Para que el mapa funcione correctamente:

1. Obtén una API Key de Google Maps:
   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un nuevo proyecto o selecciona uno existente
   - Habilita la API de "Maps JavaScript API"
   - Crea credenciales (API Key)

2. Reemplaza `YOUR_API_KEY` en el archivo `index.html` (línea 100):
   ```html
   <script async defer src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY_AQUI&callback=initMap" onerror="handleMapError()"></script>
   ```

**Nota:** Si no configuras el API Key, se mostrará un mapa alternativo con un enlace a Google Maps.

### 3. Personalizar información

Puedes editar directamente la información en el archivo HTML o hacer clic en los textos para editarlos:

- **Fecha:** Haz clic en el texto de la fecha para cambiarla
- **Hora:** Haz clic en el texto de la hora para cambiarla
- **Ubicación:** Haz clic en el texto de la ubicación para cambiarla

### 4. Abrir la invitación

Simplemente abre el archivo `index.html` en tu navegador web.

## Estructura de archivos

```
invitaciones virtuales/
├── index.html          # Archivo principal HTML
├── css/
│   └── styles.css      # Estilos CSS
├── js/
│   └── script.js       # JavaScript para interactividad y mapa
├── images/
│   └── novios.jpg      # Foto de los novios (agregar aquí)
└── README.md           # Este archivo
```

## Personalización adicional

### Cambiar colores

Puedes modificar los colores en el archivo `css/styles.css`, en la sección `:root`:

```css
:root {
    --rosa-pastel: #FFB6D0;
    --rosa-suave: #FFCCE5;
    --rosa-claro: #FFE5F0;
    /* ... más colores ... */
}
```

### Cambiar fuentes

Las fuentes utilizadas son:
- **Dancing Script:** Para títulos principales y nombres
- **Playfair Display:** Para subtítulos y encabezados
- **Poppins:** Para texto general

Puedes cambiarlas en el `<head>` del archivo HTML.

## Notas

- La invitación funciona sin conexión a internet (excepto para el mapa si usas Google Maps)
- El diseño es completamente responsivo y se adapta a diferentes tamaños de pantalla
- Las flores en los costados tienen animación suave para un efecto elegante

## Soporte

Para cualquier pregunta o personalización adicional, revisa los archivos de código. Todo está comentado para facilitar la comprensión.

¡Feliz boda a Rosa y Hernán! 💕

