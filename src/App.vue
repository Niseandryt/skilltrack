<template>
  <v-app>
    <v-app-bar color="primary" elevation="2">
      <v-app-bar-title class="d-flex align-center">
        <v-icon icon="mdi-chart-timeline-variant" class="mr-2"></v-icon>
        <span class="font-weight-bold">SkillTrack</span>
      </v-app-bar-title>
      <template v-slot:append>
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

    <v-main>
      <v-container class="py-6" style="max-width: 900px;">
        <router-view />
      </v-container>
    </v-main>

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
      enlaces: [
        { ruta: '/home', texto: 'Inicio', icono: 'mdi-home-outline' },
        { ruta: '/dashboard', texto: 'Panel', icono: 'mdi-view-dashboard-outline' },
        { ruta: '/perfil', texto: 'Perfil', icono: 'mdi-account-circle-outline' },
        { ruta: '/configuracion', texto: 'Configuración', icono: 'mdi-cog-outline' }
      ]
    }
  },
  computed: {
    tema() {
      return this.$store.getters.obtenerTema
    }
  },
  watch: {
    tema: {
      immediate: true,
      handler(nuevoTema) {
        this.$vuetify.theme.change(nuevoTema)
      }
    }
  }
}
</script>
