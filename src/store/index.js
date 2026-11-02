import { createStore } from 'vuex'

// Clave con la que se guardan y leen los datos en localStorage
const CLAVE_STORAGE = 'skilltrack-datos'

// Devuelve el estado inicial de la app: sin habilidades, perfil vacío y tema claro
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

// Carga los datos guardados en localStorage (guardados como JSON).
// Si no hay datos o el JSON está corrupto, regresa el estado inicial.
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

// Calcula el progreso (0 a 100) de una habilidad según cuántas de sus metas están completadas
function calcularProgreso(habilidad) {
  if (!habilidad.metas || habilidad.metas.length === 0) return 0
  const completadas = habilidad.metas.filter(m => m.completada).length
  return Math.round((completadas / habilidad.metas.length) * 100)
}

export default createStore({
  // El estado se inicializa con lo que haya guardado en localStorage
  state: cargarDatos(),
  getters: {
    // Lista completa de habilidades registradas
    obtenerHabilidades(state) {
      return state.habilidades
    },
    // Datos del perfil del usuario (nombre, avatar y meta principal)
    obtenerPerfil(state) {
      return state.perfil
    },
    // Tema actual de la aplicación: 'light' o 'dark'
    obtenerTema(state) {
      return state.tema
    },
    // Getter con parámetro: devuelve una función que calcula el progreso de una habilidad
    progresoHabilidad: () => (habilidad) => {
      return calcularProgreso(habilidad)
    },
    // --- Estadísticas que se muestran en el panel (dashboard) ---
    totalHabilidades(state) {
      return state.habilidades.length
    },
    // Una habilidad se considera completada cuando tiene metas y su progreso llega a 100%
    habilidadesCompletadas(state) {
      return state.habilidades.filter(h => h.metas.length > 0 && calcularProgreso(h) === 100).length
    },
    // Suma de todas las metas de todas las habilidades
    totalMetas(state) {
      return state.habilidades.reduce((total, h) => total + h.metas.length, 0)
    },
    // Suma de todas las metas marcadas como completadas
    metasCompletadas(state) {
      return state.habilidades.reduce((total, h) => total + h.metas.filter(m => m.completada).length, 0)
    },
    // Promedio del progreso de todas las habilidades (0 si no hay ninguna)
    progresoPromedio(state) {
      if (state.habilidades.length === 0) return 0
      const suma = state.habilidades.reduce((total, h) => total + calcularProgreso(h), 0)
      return Math.round(suma / state.habilidades.length)
    }
  },
  mutations: {
    // Crea una habilidad nueva; el id se genera con la fecha actual (Date.now)
    agregarHabilidad(state, { nombre, descripcion }) {
      state.habilidades.push({
        id: Date.now(),
        nombre,
        descripcion: descripcion || '',
        metas: []
      })
    },
    // Actualiza el nombre y la descripción de una habilidad existente
    editarHabilidad(state, { id, nombre, descripcion }) {
      const habilidad = state.habilidades.find(h => h.id === id)
      if (habilidad) {
        habilidad.nombre = nombre
        habilidad.descripcion = descripcion
      }
    },
    // Elimina una habilidad junto con todas sus metas
    eliminarHabilidad(state, id) {
      state.habilidades = state.habilidades.filter(h => h.id !== id)
    },
    // Agrega una meta (subtarea) a la habilidad indicada
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
    // Marca o desmarca una meta como completada (interruptor)
    alternarMeta(state, { habilidadId, metaId }) {
      const habilidad = state.habilidades.find(h => h.id === habilidadId)
      if (habilidad) {
        const meta = habilidad.metas.find(m => m.id === metaId)
        if (meta) {
          meta.completada = !meta.completada
        }
      }
    },
    // Elimina una meta de la habilidad indicada
    eliminarMeta(state, { habilidadId, metaId }) {
      const habilidad = state.habilidades.find(h => h.id === habilidadId)
      if (habilidad) {
        habilidad.metas = habilidad.metas.filter(m => m.id !== metaId)
      }
    },
    // Fusiona los datos nuevos del perfil con los que ya existían
    actualizarPerfil(state, perfil) {
      state.perfil = Object.assign({}, state.perfil, perfil)
    },
    // Cambia el tema de la aplicación ('light' o 'dark')
    establecerTema(state, tema) {
      state.tema = tema
    },
    // Restablece todo el estado a sus valores iniciales (zona peligrosa)
    borrarDatos(state) {
      Object.assign(state, estadoInicial())
    }
  },
  actions: {
    // Las acciones simplemente confirman (commit) la mutación correspondiente;
    // así los componentes no modifican el estado directamente
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
    // Plugin de persistencia: después de CADA mutación guarda el estado
    // completo como JSON en localStorage, para que los datos sobrevivan
    // aunque se recargue o se cierre la página
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
