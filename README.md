# SkillTrack

Aplicación visual para gestionar habilidades y metas. Proyecto final de la materia **Uso de Frameworks** (Vue 3 + Vuex + Vue Router + Vuetify).

## Funcionalidades

- **Inicio**: formulario para registrar habilidades y, dentro de cada tarjeta, formulario para agregar metas (subtareas). La barra de progreso se llena automáticamente según las metas completadas. CRUD completo de habilidades y metas.
- **Panel**: tarjetas de estadísticas (StatCard) dentro de un panel (DashboardPanel): total de habilidades, habilidades completadas, metas completadas y progreso promedio, más un resumen por habilidad.
- **Perfil**: personalización básica con nombre, foto de perfil (URL) y meta principal.
- **Configuración**: cambio de tema claro/oscuro, exportación de datos a JSON y zona peligrosa para eliminar todos los datos.
- **Frases motivacionales**: el componente Hero consume una API pública con `axios` y muestra una frase aleatoria en español.
- **Persistencia**: todos los datos se guardan en `localStorage` como JSON.

## Project setup
```
npm install
```


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
