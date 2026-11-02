<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">
      <v-icon icon="mdi-cog-outline" class="mr-2" color="primary"></v-icon>
      Configuración
    </h1>

    <!-- Sección de apariencia: interruptor para cambiar entre tema claro y oscuro -->
    <v-card elevation="3" class="mb-6">
      <v-card-title class="d-flex align-center">
        <v-icon icon="mdi-palette-outline" class="mr-2" color="primary"></v-icon>
        Apariencia
      </v-card-title>
      <v-card-text>
        <v-switch
          :model-value="temaOscuro"
          @update:model-value="cambiarTema"
          label="Tema oscuro"
          color="primary"
          prepend-icon="mdi-weather-night"
          inset
          hide-details
        ></v-switch>
      </v-card-text>
    </v-card>

    <!-- Sección de datos: exporta toda la información a un archivo JSON -->
    <v-card elevation="3" class="mb-6">
      <v-card-title class="d-flex align-center">
        <v-icon icon="mdi-database-export-outline" class="mr-2" color="primary"></v-icon>
        Mis datos
      </v-card-title>
      <v-card-text>
        <p class="text-body-2 text-medium-emphasis mb-4">
          Descarga toda tu información (habilidades, metas y perfil) en un archivo JSON.
        </p>
        <v-btn color="primary" @click="exportarDatos">
          <v-icon icon="mdi-download" start></v-icon>
          Exportar información
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- Zona peligrosa: acción irreversible para borrar todos los datos -->
    <v-card elevation="3" class="zona-peligrosa">
      <v-card-title class="d-flex align-center text-error">
        <v-icon icon="mdi-alert-octagon-outline" class="mr-2" color="error"></v-icon>
        Zona peligrosa
      </v-card-title>
      <v-card-text>
        <p class="text-body-2 text-medium-emphasis mb-4">
          Esta acción eliminará permanentemente todas tus habilidades, metas y tu perfil. No se puede deshacer.
        </p>
        <v-btn color="error" variant="outlined" @click="dialogoBorrado = true">
          <v-icon icon="mdi-delete-forever" start></v-icon>
          Eliminar todos los datos
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- Diálogo de confirmación antes de borrar los datos -->
    <v-dialog v-model="dialogoBorrado" max-width="450">
      <v-card>
        <v-card-title class="text-error">
          <v-icon icon="mdi-alert" start></v-icon>
          ¿Eliminar todos los datos?
        </v-card-title>
        <v-card-text>
          Perderás todas tus habilidades, metas y la personalización de tu perfil. Esta acción no se puede deshacer.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="dialogoBorrado = false">Cancelar</v-btn>
          <v-btn color="error" @click="confirmarBorrado">Sí, eliminar todo</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Aviso temporal que confirma que los datos fueron eliminados -->
    <v-snackbar v-model="avisoBorrado" color="error" timeout="2500">
      <v-icon icon="mdi-delete-forever" start></v-icon>
      Todos los datos fueron eliminados
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'ConfiguracionView',
  data() {
    return {
      dialogoBorrado: false,  // Controla si el diálogo de confirmación está abierto
      avisoBorrado: false     // Controla el aviso de "datos eliminados"
    }
  },
  computed: {
    // true si el tema guardado en el store es el oscuro
    temaOscuro() {
      return this.$store.getters.obtenerTema === 'dark'
    }
  },
  methods: {
    // Guarda el tema elegido en el store; App.vue lo aplica en Vuetify
    cambiarTema(esOscuro) {
      this.$store.dispatch('establecerTema', esOscuro ? 'dark' : 'light')
    },
    // Genera un archivo JSON con todos los datos y lo descarga en el navegador
    exportarDatos() {
      const datos = {
        habilidades: this.$store.getters.obtenerHabilidades,
        perfil: this.$store.getters.obtenerPerfil,
        tema: this.$store.getters.obtenerTema
      }
      const contenido = JSON.stringify(datos, null, 2)
      const archivo = new Blob([contenido], { type: 'application/json' })
      // Se crea un enlace temporal invisible para forzar la descarga
      const enlace = document.createElement('a')
      enlace.href = URL.createObjectURL(archivo)
      enlace.download = 'skilltrack-datos.json'
      enlace.click()
      URL.revokeObjectURL(enlace.href)
    },
    // Borra todos los datos del store (y por lo tanto de localStorage)
    confirmarBorrado() {
      this.$store.dispatch('borrarDatos')
      this.dialogoBorrado = false
      this.avisoBorrado = true
    }
  }
}
</script>

<style scoped>
/* Borde rojo alrededor de la tarjeta de la zona peligrosa */
.zona-peligrosa {
  border: 1px solid rgb(var(--v-theme-error));
}
</style>
