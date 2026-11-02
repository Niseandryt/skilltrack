<template>
  <!-- Barra de progreso reutilizable: recibe un porcentaje (0-100) por props -->
  <div class="d-flex align-center ga-3">
    <v-progress-linear
      :model-value="progreso"
      :color="colorBarra"
      height="18"
      rounded
      striped
      class="flex-grow-1"
    >
      <!-- El porcentaje se muestra dentro de la barra -->
      <strong class="text-caption">{{ progreso }}%</strong>
    </v-progress-linear>
  </div>
</template>

<script>
export default {
  name: 'ProgressBarComponent',
  props: {
    // Porcentaje de avance de la habilidad (0 a 100)
    progreso: {
      type: Number,
      required: true
    }
  },
  computed: {
    // El color cambia según el avance: verde al completar, turquesa desde 50%
    colorBarra() {
      if (this.progreso === 100) return 'success'
      if (this.progreso >= 50) return 'accent'
      return 'primary'
    }
  }
}
</script>
