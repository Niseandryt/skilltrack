<template>
  <v-card elevation="3" class="text-center pa-4" height="100%">
    <v-icon :icon="icono" :color="color" size="40" class="mb-2"></v-icon>
    <p class="text-h4 font-weight-bold mb-1">{{ valor }}</p>
    <p class="text-body-2 text-medium-emphasis mb-0">{{ titulo }}</p>
  </v-card>
</template>

<script>
export default {
  name: 'StatCardComponent',
  props: {
    titulo: {
      type: String,
      required: true
    },
    valor: {
      type: [String, Number],
      required: true
    },
    icono: {
      type: String,
      default: 'mdi-chart-box-outline'
    },
    color: {
      type: String,
      default: 'primary'
    }
  }
}
</script>
