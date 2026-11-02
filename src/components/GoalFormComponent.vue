<template>
  <v-form ref="formulario" validate-on="submit" @submit.prevent="enviar">
    <div class="d-flex ga-2 align-start">
      <v-text-field
        v-model="titulo"
        label="Nueva meta"
        placeholder="Ej. Completar el curso de rutas"
        prepend-inner-icon="mdi-flag-outline"
        variant="outlined"
        density="compact"
        :rules="[reglas.requerido]"
        hide-details="auto"
      ></v-text-field>
      <v-btn
        type="submit"
        color="accent"
        icon="mdi-plus"
        :disabled="!titulo.trim()"
        class="mt-1"
      ></v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  name: 'GoalFormComponent',
  emits: ['agregar-meta'],
  data() {
    return {
      titulo: '',
      reglas: {
        requerido: valor => !!valor || 'La meta es obligatoria'
      }
    }
  },
  methods: {
    async enviar() {
      const { valid } = await this.$refs.formulario.validate()
      if (!valid) return
      this.$emit('agregar-meta', this.titulo.trim())
      this.titulo = ''
      this.$refs.formulario.resetValidation()
    }
  }
}
</script>
