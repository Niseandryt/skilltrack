<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">
      <v-icon icon="mdi-view-dashboard-outline" class="mr-2" color="primary"></v-icon>
      Panel de progreso
    </h1>
    <!-- Panel con las tarjetas de estadísticas y el resumen por habilidad -->
    <dashboard-panel-component></dashboard-panel-component>
  </div>
</template>

<script>
import DashboardPanelComponent from '../components/DashboardPanelComponent.vue'

export default {
  name: 'DashboardView',
  components: {
    DashboardPanelComponent
  }
}
</script>
