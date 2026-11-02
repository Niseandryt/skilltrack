<template>
  <!-- Tarjeta pequeña de estadística: icono, valor grande y título descriptivo -->
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
    // Texto descriptivo de la estadística (ej. "Habilidades totales")
    titulo: {
      type: String,
      required: true
    },
    // Valor a mostrar; puede ser número o texto (ej. 5 o "3 / 10")
    valor: {
      type: [String, Number],
      required: true
    },
    // Icono de Material Design Icons
    icono: {
      type: String,
      default: 'mdi-chart-box-outline'
    },
    // Color del tema de Vuetify para el icono
    color: {
      type: String,
      default: 'primary'
    }
  }
}
</script>
