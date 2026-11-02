<template>
  <v-card elevation="3" class="mb-4">
    <v-card-item>
      <v-card-title class="d-flex align-center flex-wrap">
        <v-icon icon="mdi-star-circle-outline" color="primary" class="mr-2"></v-icon>
        {{ habilidad.nombre }}
        <v-chip
          v-if="progreso === 100"
          color="success"
          size="small"
          class="ml-2"
          prepend-icon="mdi-check-circle"
        >
          Completada
        </v-chip>
      </v-card-title>
      <v-card-subtitle v-if="habilidad.descripcion">
        {{ habilidad.descripcion }}
      </v-card-subtitle>
      <template v-slot:append>
        <v-btn icon="mdi-pencil" variant="text" size="small" @click="dialogoEdicion = true"></v-btn>
        <v-btn icon="mdi-delete" variant="text" size="small" color="error" @click="$emit('eliminar-habilidad', habilidad.id)"></v-btn>
      </template>
    </v-card-item>

    <v-card-text>
      <p class="text-body-2 mb-1">
        {{ metasCompletadas }} de {{ habilidad.metas.length }} metas completadas
      </p>
      <progress-bar-component :progreso="progreso" class="mb-4"></progress-bar-component>

      <v-list v-if="habilidad.metas.length > 0" density="compact" class="rounded border mb-4">
        <v-list-item v-for="meta in habilidad.metas" :key="meta.id">
          <template v-slot:prepend>
            <v-checkbox-btn
              :model-value="meta.completada"
              color="success"
              @update:model-value="$emit('alternar-meta', { habilidadId: habilidad.id, metaId: meta.id })"
            ></v-checkbox-btn>
          </template>
          <v-list-item-title :class="{ 'text-decoration-line-through text-medium-emphasis': meta.completada }">
            {{ meta.titulo }}
          </v-list-item-title>
          <template v-slot:append>
            <v-btn
              icon="mdi-close"
              variant="text"
              size="x-small"
              color="error"
              @click="$emit('eliminar-meta', { habilidadId: habilidad.id, metaId: meta.id })"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
      <p v-else class="text-body-2 text-medium-emphasis mb-4">
        Esta habilidad aún no tiene metas. ¡Agrega la primera!
      </p>

      <goal-form-component @agregar-meta="titulo => $emit('agregar-meta', { habilidadId: habilidad.id, titulo })"></goal-form-component>
    </v-card-text>

    <v-dialog v-model="dialogoEdicion" max-width="500">
      <v-card>
        <v-card-title>Editar habilidad</v-card-title>
        <v-card-text>
          <v-text-field v-model="edicionNombre" label="Nombre" variant="outlined" class="mb-2"></v-text-field>
          <v-textarea v-model="edicionDescripcion" label="Descripción" variant="outlined" rows="2" auto-grow></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="dialogoEdicion = false">Cancelar</v-btn>
          <v-btn color="primary" :disabled="!edicionNombre" @click="guardarEdicion">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import ProgressBarComponent from './ProgressBarComponent.vue'
import GoalFormComponent from './GoalFormComponent.vue'

export default {
  name: 'SkillCardComponent',
  components: {
    ProgressBarComponent,
    GoalFormComponent
  },
  props: {
    habilidad: {
      type: Object,
      required: true
    }
  },
  emits: ['editar-habilidad', 'eliminar-habilidad', 'agregar-meta', 'alternar-meta', 'eliminar-meta'],
  data() {
    return {
      dialogoEdicion: false,
      edicionNombre: this.habilidad.nombre,
      edicionDescripcion: this.habilidad.descripcion
    }
  },
  computed: {
    metasCompletadas() {
      return this.habilidad.metas.filter(meta => meta.completada).length
    },
    progreso() {
      if (this.habilidad.metas.length === 0) return 0
      return Math.round((this.metasCompletadas / this.habilidad.metas.length) * 100)
    }
  },
  methods: {
    guardarEdicion() {
      this.$emit('editar-habilidad', {
        id: this.habilidad.id,
        nombre: this.edicionNombre.trim(),
        descripcion: this.edicionDescripcion.trim()
      })
      this.dialogoEdicion = false
    }
  }
}
</script>
