<template>
  <div>
    <hero-component></hero-component>

    <skill-form-component @agregar-habilidad="agregarHabilidad"></skill-form-component>

    <h2 class="text-h5 font-weight-bold mb-4">
      <v-icon icon="mdi-format-list-bulleted" class="mr-2" color="primary"></v-icon>
      Mis habilidades
    </h2>

    <v-alert
      v-if="habilidades.length === 0"
      type="info"
      variant="tonal"
      icon="mdi-information-outline"
    >
      Aún no tienes habilidades registradas. ¡Usa el formulario de arriba para agregar la primera!
    </v-alert>

    <skill-card-component
      v-for="habilidad in habilidades"
      :key="habilidad.id"
      :habilidad="habilidad"
      @editar-habilidad="editarHabilidad"
      @eliminar-habilidad="eliminarHabilidad"
      @agregar-meta="agregarMeta"
      @alternar-meta="alternarMeta"
      @eliminar-meta="eliminarMeta"
    ></skill-card-component>
  </div>
</template>

<script>
import HeroComponent from '../components/HeroComponent.vue'
import SkillFormComponent from '../components/SkillFormComponent.vue'
import SkillCardComponent from '../components/SkillCardComponent.vue'

export default {
  name: 'HomeView',
  components: {
    HeroComponent,
    SkillFormComponent,
    SkillCardComponent
  },
  computed: {
    habilidades() {
      return this.$store.getters.obtenerHabilidades
    }
  },
  methods: {
    agregarHabilidad(datos) {
      this.$store.dispatch('agregarHabilidad', datos)
    },
    editarHabilidad(datos) {
      this.$store.dispatch('editarHabilidad', datos)
    },
    eliminarHabilidad(id) {
      this.$store.dispatch('eliminarHabilidad', id)
    },
    agregarMeta(datos) {
      this.$store.dispatch('agregarMeta', datos)
    },
    alternarMeta(datos) {
      this.$store.dispatch('alternarMeta', datos)
    },
    eliminarMeta(datos) {
      this.$store.dispatch('eliminarMeta', datos)
    }
  }
}
</script>
