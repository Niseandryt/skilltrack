<template>
  <v-card class="mb-6" elevation="3">
    <v-card-title class="d-flex align-center">
      <v-icon icon="mdi-plus-circle-outline" class="mr-2" color="primary"></v-icon>
      Nueva habilidad
    </v-card-title>
    <v-card-text>
      <v-form ref="formulario" validate-on="submit" @submit.prevent="enviar">
        <v-text-field
          v-model="nombre"
          label="Nombre de la habilidad"
          placeholder="Ej. Aprender Vue.js"
          prepend-inner-icon="mdi-star-outline"
          variant="outlined"
          :rules="[reglas.requerido]"
          class="mb-2"
        ></v-text-field>
        <v-textarea
          v-model="descripcion"
          label="Descripción (opcional)"
          placeholder="¿Qué quieres lograr con esta habilidad?"
          prepend-inner-icon="mdi-text"
          variant="outlined"
          rows="2"
          auto-grow
        ></v-textarea>
        <v-btn
          type="submit"
          color="primary"
          size="large"
          block
          :disabled="!nombre.trim()"
        >
          <v-icon icon="mdi-plus" start></v-icon>
          Agregar habilidad
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'SkillFormComponent',
  emits: ['agregar-habilidad'],
  data() {
    return {
      nombre: '',
      descripcion: '',
      reglas: {
        requerido: valor => !!valor || 'El nombre es obligatorio'
      }
    }
  },
  methods: {
    async enviar() {
      const { valid } = await this.$refs.formulario.validate()
      if (!valid) return
      this.$emit('agregar-habilidad', {
        nombre: this.nombre.trim(),
        descripcion: this.descripcion.trim()
      })
      this.nombre = ''
      this.descripcion = ''
      this.$refs.formulario.resetValidation()
    }
  }
}
</script>
