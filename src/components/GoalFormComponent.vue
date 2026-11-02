<template>
  <!-- Formulario en línea para agregar una meta (subtarea) a una habilidad -->
  <v-form ref="formulario" validate-on="submit" @submit.prevent="enviar">
    <div class="d-flex ga-2 align-start">
      <!-- v-model enlaza el campo con "titulo"; la regla lo hace obligatorio -->
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
      <!-- Botón de envío; se deshabilita mientras el campo esté vacío -->
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
  // Evento personalizado que escucha SkillCardComponent para crear la meta
  emits: ['agregar-meta'],
  data() {
    return {
      titulo: '',
      // Regla de validación: el título de la meta no puede estar vacío
      reglas: {
        requerido: valor => !!valor || 'La meta es obligatoria'
      }
    }
  },
  methods: {
    // Valida el formulario y, si es válido, emite el evento con el título
    async enviar() {
      const { valid } = await this.$refs.formulario.validate()
      if (!valid) return
      this.$emit('agregar-meta', this.titulo.trim())
      // Limpia el campo y la validación para poder agregar otra meta
      this.titulo = ''
      this.$refs.formulario.resetValidation()
    }
  }
}
</script>
