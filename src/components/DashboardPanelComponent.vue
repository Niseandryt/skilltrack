<template>
  <div>
    <!-- Fila de tarjetas con las estadísticas generales (StatCard) -->
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <stat-card-component
          titulo="Habilidades totales"
          :valor="totalHabilidades"
          icono="mdi-star-circle-outline"
          color="primary"
        ></stat-card-component>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <stat-card-component
          titulo="Habilidades completadas"
          :valor="habilidadesCompletadas"
          icono="mdi-trophy-outline"
          color="success"
        ></stat-card-component>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <stat-card-component
          titulo="Metas completadas"
          :valor="metasCompletadas + ' / ' + totalMetas"
          icono="mdi-flag-checkered"
          color="accent"
        ></stat-card-component>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <stat-card-component
          titulo="Progreso promedio"
          :valor="progresoPromedio + '%'"
          icono="mdi-chart-donut"
          color="secondary"
        ></stat-card-component>
      </v-col>
    </v-row>

    <!-- Resumen detallado: una barra de progreso por cada habilidad -->
    <v-card elevation="3" class="mt-6">
      <v-card-title class="d-flex align-center">
        <v-icon icon="mdi-view-list-outline" class="mr-2" color="primary"></v-icon>
        Resumen por habilidad
      </v-card-title>
      <v-card-text v-if="habilidades.length > 0">
        <div v-for="habilidad in habilidades" :key="habilidad.id" class="mb-4">
          <div class="d-flex justify-space-between mb-1">
            <span class="font-weight-medium">{{ habilidad.nombre }}</span>
            <span class="text-body-2 text-medium-emphasis">
              {{ habilidad.metas.filter(m => m.completada).length }} / {{ habilidad.metas.length }} metas
            </span>
          </div>
          <progress-bar-component :progreso="progresoDe(habilidad)"></progress-bar-component>
        </div>
      </v-card-text>
      <!-- Aviso cuando todavía no hay habilidades registradas -->
      <v-card-text v-else>
        <v-alert type="info" variant="tonal" icon="mdi-information-outline">
          Todavía no hay habilidades registradas. Agrega una desde la página de inicio.
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import StatCardComponent from './StatCardComponent.vue'
import ProgressBarComponent from './ProgressBarComponent.vue'

export default {
  name: 'DashboardPanelComponent',
  components: {
    StatCardComponent,
    ProgressBarComponent
  },
  computed: {
    // Todas las estadísticas se leen de los getters del store de Vuex,
    // así se actualizan solas cuando cambian los datos
    habilidades() {
      return this.$store.getters.obtenerHabilidades
    },
    totalHabilidades() {
      return this.$store.getters.totalHabilidades
    },
    habilidadesCompletadas() {
      return this.$store.getters.habilidadesCompletadas
    },
    totalMetas() {
      return this.$store.getters.totalMetas
    },
    metasCompletadas() {
      return this.$store.getters.metasCompletadas
    },
    progresoPromedio() {
      return this.$store.getters.progresoPromedio
    }
  },
  methods: {
    // Usa el getter con parámetro del store para calcular el progreso de una habilidad
    progresoDe(habilidad) {
      return this.$store.getters.progresoHabilidad(habilidad)
    }
  }
}
</script>
