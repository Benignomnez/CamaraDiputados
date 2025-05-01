# Galería de Remodelación - Hastial

## Estructura de Archivos de Imágenes

Este proyecto utiliza una estructura organizada para almacenar y mostrar imágenes de antes y después de la remodelación de diferentes áreas del Departamento de Compras y Contrataciones de la Cámara de Diputados.

### Organización de Carpetas

```
/imagenes
  /recepcion
    - principal_antes.jpg     (Vista principal - antes)
    - principal_despues.jpg   (Vista principal - después)
    - mostrador_antes.jpg     (Vista del mostrador - antes)
    - mostrador_despues.jpg   (Vista del mostrador - después)
    - area_de_espera_antes.jpg
    - area_de_espera_despues.jpg
    - entrada_antes.jpg
    - entrada_despues.jpg
    - detalles_antes.jpg
    - detalles_despues.jpg
    - thumbnail.jpg           (Miniatura para el selector de zona)
    - vista_principal_thumbnail.jpg  (Miniatura para el selector de par)
    - mostrador_thumbnail.jpg
    - area_de_espera_thumbnail.jpg
    - entrada_thumbnail.jpg
    - detalles_thumbnail.jpg
  /oficinas
    - principal_antes.jpg
    - principal_despues.jpg
    - estaciones_de_trabajo_antes.jpg
    - estaciones_de_trabajo_despues.jpg
    ...
  /cocina
    ...
  /archivo
    ...
  /pasillo
    ...
  /sala_reuniones
    ...
```

### Convención de Nombres

Para que las imágenes se carguen correctamente, deben seguir esta convención de nombres:

1. **Imágenes Principales de Cada Zona**:
   - `principal_antes.jpg` - Imagen "antes" principal de la zona
   - `principal_despues.jpg` - Imagen "después" principal de la zona
   - `thumbnail.jpg` - Miniatura que aparece en el selector de zonas

2. **Imágenes Específicas dentro de Cada Zona**:
   - Para cada vista adicional, usar el nombre exacto que aparece en el selector, pero en minúsculas y con guiones bajos en lugar de espacios.
   - Ejemplo: "Área de Espera" se convierte en `area_de_espera_antes.jpg` y `area_de_espera_despues.jpg`
   - También incluir una versión `area_de_espera_thumbnail.jpg` para la miniatura

### Para Agregar Nuevas Imágenes

1. **Añadir una Nueva Zona**:
   - Crear una carpeta con el ID de la zona dentro de `/imagenes`
   - Añadir las imágenes `principal_antes.jpg`, `principal_despues.jpg` y `thumbnail.jpg`
   - Modificar el HTML para incluir la nueva zona en los botones y contenido
   - Añadir el ID de la zona al array `zones` en la función `initializeZoneImages()`

2. **Añadir Nuevos Pares de Imágenes a una Zona Existente**:
   - Subir las imágenes siguiendo la convención de nombres
   - Añadir un nuevo botón de vista en el HTML con el nombre descriptivo
   - El sistema cargará automáticamente las imágenes correspondientes

### Tamaños Recomendados

- Imágenes principales: 800x600px o proporción similar
- Miniaturas: 150x100px o proporción similar
- Todas las imágenes deben tener la misma resolución para una mejor experiencia de comparación 