<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">
      <v-icon icon="mdi-account-circle-outline" class="mr-2" color="primary"></v-icon>
      Mi perfil
    </h1>

    <v-row>
      <!-- Tarjeta de vista previa: muestra cómo se ve el perfil guardado -->
      <v-col cols="12" md="5">
        <v-card elevation="3" class="text-center pa-6">
          <!-- Si hay URL de avatar se muestra la imagen; si no, un icono genérico -->
          <v-avatar size="120" class="mb-4" color="primary">
            <v-img v-if="perfil.avatar" :src="perfil.avatar" :alt="perfil.nombre" cover></v-img>
            <v-icon v-else icon="mdi-account" size="64"></v-icon>
          </v-avatar>
          <h2 class="text-h5 font-weight-bold">
            {{ perfil.nombre || 'Sin nombre' }}
          </h2>
          <v-divider class="my-4"></v-divider>
          <p class="text-subtitle-1 font-weight-medium mb-1">
            <v-icon icon="mdi-target" color="accent" class="mr-1"></v-icon>
            Meta principal
          </p>
          <p class="text-body-1 text-medium-emphasis">
            {{ perfil.metaPrincipal || 'Aún no defines tu meta principal.' }}
          </p>
        </v-card>
      </v-col>

      <!-- Formulario de personalización del perfil -->
      <v-col cols="12" md="7">
        <v-card elevation="3">
          <v-card-title>Personalizar perfil</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="guardarPerfil">
              <v-text-field
                v-model="formulario.nombre"
                label="Tu nombre"
                placeholder="Ej. Ana García"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
                class="mb-2"
              ></v-text-field>
              <v-text-field
                v-model="formulario.avatar"
                label="URL de tu foto de perfil"
                placeholder="https://ejemplo.com/mi-foto.jpg"
                prepend-inner-icon="mdi-image-outline"
                variant="outlined"
                class="mb-2"
              ></v-text-field>
              <v-textarea
                v-model="formulario.metaPrincipal"
                label="Tu meta principal"
                placeholder="Ej. Conseguir mi primer trabajo como desarrolladora"
                prepend-inner-icon="mdi-target"
                variant="outlined"
                rows="3"
                auto-grow
              ></v-textarea>
              <v-btn type="submit" color="primary" size="large" block>
                <v-icon icon="mdi-content-save" start></v-icon>
                Guardar cambios
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Aviso temporal que confirma que el perfil se guardó -->
    <v-snackbar v-model="avisoGuardado" color="success" timeout="2500">
      <v-icon icon="mdi-check-circle" start></v-icon>
      Perfil guardado correctamente
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'PerfilView',
  data() {
    return {
      // Copia local del perfil que se edita en el formulario
      formulario: {
        nombre: '',
        avatar: '',
        metaPrincipal: ''
      },
      avisoGuardado: false
    }
  },
  computed: {
    // Perfil guardado en el store (el que se muestra en la vista previa)
    perfil() {
      return this.$store.getters.obtenerPerfil
    }
  },
  // Ciclo de vida: al crearse la vista, el formulario se llena con el perfil actual
  created() {
    this.formulario.nombre = this.perfil.nombre
    this.formulario.avatar = this.perfil.avatar
    this.formulario.metaPrincipal = this.perfil.metaPrincipal
  },
  methods: {
    // Guarda el formulario en el store y muestra el aviso de confirmación
    guardarPerfil() {
      this.$store.dispatch('actualizarPerfil', {
        nombre: this.formulario.nombre.trim(),
        avatar: this.formulario.avatar.trim(),
        metaPrincipal: this.formulario.metaPrincipal.trim()
      })
      this.avisoGuardado = true
    }
  }
}
</script>
