<template>
  <div class="d-flex align-center ga-3">
    <v-progress-linear
      :model-value="progreso"
      :color="colorBarra"
      height="18"
      rounded
      striped
      class="flex-grow-1"
    >
      <strong class="text-caption">{{ progreso }}%</strong>
    </v-progress-linear>
  </div>
</template>

<script>
export default {
  name: 'ProgressBarComponent',
  props: {
    progreso: {
      type: Number,
      required: true
    }
  },
  computed: {
    colorBarra() {
      if (this.progreso === 100) return 'success'
      if (this.progreso >= 50) return 'accent'
      return 'primary'
    }
  }
}
</script>
