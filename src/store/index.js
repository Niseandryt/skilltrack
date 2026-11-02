import { createStore } from 'vuex'

const CLAVE_STORAGE = 'skilltrack-datos'

function estadoInicial() {
  return {
    habilidades: [],
    perfil: {
      nombre: '',
      avatar: '',
      metaPrincipal: ''
    },
    tema: 'light'
  }
}

function cargarDatos() {
  try {
    const datos = localStorage.getItem(CLAVE_STORAGE)
    if (!datos) return estadoInicial()
    const guardados = JSON.parse(datos)
    return Object.assign(estadoInicial(), guardados)
  } catch (error) {
    console.error('No se pudieron cargar los datos guardados', error)
    return estadoInicial()
  }
}

function calcularProgreso(habilidad) {
  if (!habilidad.metas || habilidad.metas.length === 0) return 0
  const completadas = habilidad.metas.filter(m => m.completada).length
  return Math.round((completadas / habilidad.metas.length) * 100)
}

export default createStore({
  state: cargarDatos(),
  getters: {
    obtenerHabilidades(state) {
      return state.habilidades
    },
    obtenerPerfil(state) {
      return state.perfil
    },
    obtenerTema(state) {
      return state.tema
    },
    progresoHabilidad: () => (habilidad) => {
      return calcularProgreso(habilidad)
    },
    totalHabilidades(state) {
      return state.habilidades.length
    },
    habilidadesCompletadas(state) {
      return state.habilidades.filter(h => h.metas.length > 0 && calcularProgreso(h) === 100).length
    },
    totalMetas(state) {
      return state.habilidades.reduce((total, h) => total + h.metas.length, 0)
    },
    metasCompletadas(state) {
      return state.habilidades.reduce((total, h) => total + h.metas.filter(m => m.completada).length, 0)
    },
    progresoPromedio(state) {
      if (state.habilidades.length === 0) return 0
      const suma = state.habilidades.reduce((total, h) => total + calcularProgreso(h), 0)
      return Math.round(suma / state.habilidades.length)
    }
  },
  mutations: {
    agregarHabilidad(state, { nombre, descripcion }) {
      state.habilidades.push({
        id: Date.now(),
        nombre,
        descripcion: descripcion || '',
        metas: []
      })
    },
    editarHabilidad(state, { id, nombre, descripcion }) {
      const habilidad = state.habilidades.find(h => h.id === id)
      if (habilidad) {
        habilidad.nombre = nombre
        habilidad.descripcion = descripcion
      }
    },
    eliminarHabilidad(state, id) {
      state.habilidades = state.habilidades.filter(h => h.id !== id)
    },
    agregarMeta(state, { habilidadId, titulo }) {
      const habilidad = state.habilidades.find(h => h.id === habilidadId)
      if (habilidad) {
        habilidad.metas.push({
          id: Date.now(),
          titulo,
          completada: false
        })
      }
    },
    alternarMeta(state, { habilidadId, metaId }) {
      const habilidad = state.habilidades.find(h => h.id === habilidadId)
      if (habilidad) {
        const meta = habilidad.metas.find(m => m.id === metaId)
        if (meta) {
          meta.completada = !meta.completada
        }
      }
    },
    eliminarMeta(state, { habilidadId, metaId }) {
      const habilidad = state.habilidades.find(h => h.id === habilidadId)
      if (habilidad) {
        habilidad.metas = habilidad.metas.filter(m => m.id !== metaId)
      }
    },
    actualizarPerfil(state, perfil) {
      state.perfil = Object.assign({}, state.perfil, perfil)
    },
    establecerTema(state, tema) {
      state.tema = tema
    },
    borrarDatos(state) {
      Object.assign(state, estadoInicial())
    }
  },
  actions: {
    agregarHabilidad({ commit }, payload) {
      commit('agregarHabilidad', payload)
    },
    editarHabilidad({ commit }, payload) {
      commit('editarHabilidad', payload)
    },
    eliminarHabilidad({ commit }, id) {
      commit('eliminarHabilidad', id)
    },
    agregarMeta({ commit }, payload) {
      commit('agregarMeta', payload)
    },
    alternarMeta({ commit }, payload) {
      commit('alternarMeta', payload)
    },
    eliminarMeta({ commit }, payload) {
      commit('eliminarMeta', payload)
    },
    actualizarPerfil({ commit }, perfil) {
      commit('actualizarPerfil', perfil)
    },
    establecerTema({ commit }, tema) {
      commit('establecerTema', tema)
    },
    borrarDatos({ commit }) {
      commit('borrarDatos')
    }
  },
  plugins: [
    store => {
      store.subscribe((mutation, state) => {
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify({
          habilidades: state.habilidades,
          perfil: state.perfil,
          tema: state.tema
        }))
      })
    }
  ]
})
