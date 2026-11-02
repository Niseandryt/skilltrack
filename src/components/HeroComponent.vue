<template>
  <!-- Sección principal (hero) con el título de la app y la frase motivacional -->
  <v-sheet class="hero mb-8" rounded="lg" elevation="4">
    <v-icon icon="mdi-chart-timeline-variant" size="56" class="mb-2"></v-icon>
    <h1 class="text-h3 font-weight-bold mb-2">SkillTrack</h1>
    <p class="text-h6 mb-6">Registra tus habilidades, cumple tus metas y mide tu progreso.</p>

    <!-- Tarjeta con la frase aleatoria obtenida de la API pública -->
    <v-card class="mx-auto frase-card" max-width="600" elevation="6">
      <v-card-text class="text-center pa-6">
        <!-- Mientras se carga la API se muestra un indicador de progreso -->
        <v-progress-circular v-if="cargando" indeterminate color="primary"></v-progress-circular>
        <div v-else>
          <v-icon icon="mdi-format-quote-open" color="accent" class="mb-2"></v-icon>
          <blockquote class="text-h6 font-italic mb-2">"{{ fraseActual.frase }}"</blockquote>
          <p class="text-subtitle-2 text-medium-emphasis mb-4">— {{ fraseActual.autor }}</p>
          <!-- Permite al usuario pedir otra frase aleatoria sin recargar -->
          <v-btn color="accent" variant="tonal" size="small" @click="elegirFraseAleatoria">
            <v-icon icon="mdi-refresh" start></v-icon>
            Nueva frase
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import axios from 'axios'

// API pública: archivo JSON con frases motivacionales en español
const URL_FRASES = 'https://raw.githubusercontent.com/dslo-dev/open-ToDo/main/public/frases_motivacionales.json'

// Frases de respaldo por si la API no está disponible (sin conexión, etc.)
const FRASES_RESPALDO = [
  { frase: 'El éxito es la suma de pequeños esfuerzos repetidos día tras día.', autor: 'Robert Collier' },
  { frase: 'La disciplina es el puente entre las metas y los logros.', autor: 'Jim Rohn' },
  { frase: 'No cuentes los días, haz que los días cuenten.', autor: 'Muhammad Ali' }
]

export default {
  name: 'HeroComponent',
  data() {
    return {
      frases: [],                              // Lista de frases descargadas de la API
      fraseActual: { frase: '', autor: '' },   // Frase que se está mostrando
      cargando: true                           // Controla el indicador de carga
    }
  },
  // Ciclo de vida: al montarse el componente se pide la lista de frases con axios
  mounted() {
    axios.get(URL_FRASES)
      .then(respuesta => {
        this.frases = respuesta.data
      })
      .catch(error => {
        console.error('No se pudieron cargar las frases de la API', error)
        this.frases = FRASES_RESPALDO
      })
      .finally(() => {
        // Haya éxito o error, se oculta la carga y se elige una frase
        this.cargando = false
        this.elegirFraseAleatoria()
      })
  },
  methods: {
    // Elige una frase al azar de la lista descargada
    elegirFraseAleatoria() {
      if (this.frases.length === 0) return
      const indice = Math.floor(Math.random() * this.frases.length)
      this.fraseActual = this.frases[indice]
    }
  }
}
</script>

<style scoped>
/* Fondo degradado del hero; funciona igual en tema claro y oscuro */
.hero {
  padding: 48px 24px;
  text-align: center;
  color: #ffffff;
  background: linear-gradient(135deg, #3f63c8 0%, #22b8a8 100%);
}
</style>
