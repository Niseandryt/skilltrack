<template>
  <!-- v-app es el contenedor raíz obligatorio de Vuetify -->
  <v-app>
    <!-- Barra de navegación superior con los enlaces a cada vista -->
    <v-app-bar color="primary" elevation="2">
      <v-app-bar-title class="d-flex align-center">
        <v-icon icon="mdi-chart-timeline-variant" class="mr-2"></v-icon>
        <span class="font-weight-bold">SkillTrack</span>
      </v-app-bar-title>
      <template v-slot:append>
        <!-- Enlaces con texto, visibles solo en pantallas medianas y grandes -->
        <v-btn
          v-for="enlace in enlaces"
          :key="enlace.ruta"
          :to="enlace.ruta"
          variant="text"
          class="d-none d-sm-inline-flex"
        >
          <v-icon :icon="enlace.icono" start></v-icon>
          {{ enlace.texto }}
        </v-btn>
        <!-- Enlaces solo con icono, visibles en pantallas pequeñas (móvil) -->
        <v-btn
          v-for="enlace in enlaces"
          :key="enlace.ruta + '-movil'"
          :to="enlace.ruta"
          variant="text"
          icon
          class="d-inline-flex d-sm-none"
        >
          <v-icon :icon="enlace.icono"></v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <!-- Contenido principal: router-view renderiza aquí la vista activa -->
    <v-main>
      <v-container class="py-6" style="max-width: 900px;">
        <router-view />
      </v-container>
    </v-main>

    <!-- Pie de página fijo -->
    <v-footer class="justify-center text-body-2 text-medium-emphasis" app>
      SkillTrack — Organiza tus habilidades y metas
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // Enlaces de navegación que se dibujan en la barra superior
      enlaces: [
        { ruta: '/home', texto: 'Inicio', icono: 'mdi-home-outline' },
        { ruta: '/dashboard', texto: 'Panel', icono: 'mdi-view-dashboard-outline' },
        { ruta: '/perfil', texto: 'Perfil', icono: 'mdi-account-circle-outline' },
        { ruta: '/configuracion', texto: 'Configuración', icono: 'mdi-cog-outline' }
      ]
    }
  },
  computed: {
    // Tema actual, leído desde el store de Vuex
    tema() {
      return this.$store.getters.obtenerTema
    }
  },
  watch: {
    tema: {
      // immediate: true aplica el tema guardado en cuanto carga la app
      immediate: true,
      handler(nuevoTema) {
        // Cambia el tema global de Vuetify ('light' o 'dark')
        this.$vuetify.theme.change(nuevoTema)
      }
    }
  }
}
</script>
