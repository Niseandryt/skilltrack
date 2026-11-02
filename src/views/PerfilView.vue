<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">
      <v-icon icon="mdi-account-circle-outline" class="mr-2" color="primary"></v-icon>
      Mi perfil
    </h1>

    <v-row>
      <v-col cols="12" md="5">
        <v-card elevation="3" class="text-center pa-6">
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
      formulario: {
        nombre: '',
        avatar: '',
        metaPrincipal: ''
      },
      avisoGuardado: false
    }
  },
  computed: {
    perfil() {
      return this.$store.getters.obtenerPerfil
    }
  },
  created() {
    this.formulario.nombre = this.perfil.nombre
    this.formulario.avatar = this.perfil.avatar
    this.formulario.metaPrincipal = this.perfil.metaPrincipal
  },
  methods: {
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
