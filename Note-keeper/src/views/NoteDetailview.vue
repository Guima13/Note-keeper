<template>
  <div v-if="store.current">

    <h1>{{ store.current.title }}</h1>

    <p>{{ store.current.content }}</p>

    <p>Categoria: {{ store.current.category }}</p>

    <p>Cor: {{ store.current.color }}</p>

    <p>Pinned: {{ store.current.pinned ? "Sim" : "Não" }}</p>

    <p>Arquivada: {{ store.current.archived ? "Sim" : "Não" }}</p>

    <button @click="togglePin">
      {{ store.current.pinned ? "Unpin" : "Pin" }}
    </button>

    <button @click="toggleArchive">
      {{ store.current.archived ? "Desarquivar" : "Arquivar" }}
    </button>

    <button @click="goEdit">Editar</button>

    <button @click="remove">Eliminar</button>

    <button @click="goBack">Voltar</button>

  </div>

  <div v-else>
    A carregar...
  </div>
</template>

<script>
import { useNotesStore } from "../stores/notes"
import { useRouter, useRoute } from "vue-router"

export default {
  setup() {
    const store = useNotesStore()
    const router = useRouter()
    const route = useRoute()

    store.loadOne(route.params.id)

    return { store, router, route }
  },

  methods: {
    goEdit() {
      this.router.push(`/new?id=${this.route.params.id}`)
    },

    async remove() {
      await this.store.remove(this.route.params.id)
      this.router.push("/")
    },

    togglePin() {
      this.store.togglePin(this.store.current)
    },

    toggleArchive() {
      this.store.toggleArchive(this.store.current)
    },

    goBack() {
      this.router.push("/")
    }
  }
}
</script>
