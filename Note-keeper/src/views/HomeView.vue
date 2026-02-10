<template>
  <div>

    <button @click="goNew">Nova Nota</button>

    <div class="toolbar">
      <input v-model="store.query" @keyup.enter="store.search(store.query)" placeholder="Pesquisar...">
      <button @click="store.search(store.query)">Pesquisar</button>
      <button @click="clearSearch">Limpar</button>
    </div>

    <div class="categories">
      <button @click="store.loadAll()">Todas</button>
      <button v-for="c in categories" :key="c" @click="filter(c)">
        {{ c }}
      </button>
    </div>

    <div v-if="store.loading">A carregar...</div>

    <div v-else>

      <div v-if="pinnedNotes.length > 0">
        <h2>Pinned</h2>
        <div class="grid">
          <div
            v-for="n in pinnedNotes"
            :key="n.id"
            class="card"
            :style="{ background: n.color }"
            @click="goDetail(n.id)"
          >
            <h3>{{ n.title }}</h3>
            <p>{{ short(n.content) }}</p>

            <button @click.stop="togglePin(n)">Unpin</button>
            <button @click.stop="remove(n.id)">Eliminar</button>
          </div>
        </div>
      </div>

      <div v-if="normalNotes.length > 0">
        <h2>Outras Notas</h2>
        <div class="grid">
          <div
            v-for="n in normalNotes"
            :key="n.id"
            class="card"
            :style="{ background: n.color }"
            @click="goDetail(n.id)"
          >
            <h3>{{ n.title }}</h3>
            <p>{{ short(n.content) }}</p>

            <button @click.stop="togglePin(n)">Pin</button>
            <button @click.stop="remove(n.id)">Eliminar</button>
          </div>
        </div>
      </div>

      <div v-if="archivedNotes.length > 0">
        <h2>Arquivadas</h2>
        <div class="grid">
          <div
            v-for="n in archivedNotes"
            :key="n.id"
            class="card archived"
            :style="{ background: n.color }"
            @click="goDetail(n.id)"
          >
            <h3>{{ n.title }}</h3>
            <p>{{ short(n.content) }}</p>

            <button @click.stop="toggleArchive(n)">Desarquivar</button>
            <button @click.stop="remove(n.id)">Eliminar</button>
          </div>
        </div>
      </div>

      <div v-if="store.sortedNotes.length === 0">
        <p>Sem notas</p>
      </div>

    </div>

  </div>
</template>

<script>
import { useNotesStore } from "../stores/notes"
import { useRouter } from "vue-router"

export default {
  data() {
    return {
      categories: ["personal", "work", "ideas", "other"]
    }
  },

  setup() {
    const store = useNotesStore()
    const router = useRouter()
    store.loadAll()
    return { store, router }
  },

  computed: {
    pinnedNotes() {
      return this.store.list.filter(n => n.pinned && !n.archived)
    },
    normalNotes() {
      return this.store.list.filter(n => !n.pinned && !n.archived)
    },
    archivedNotes() {
      return this.store.list.filter(n => n.archived)
    }
  },

  methods: {
    goNew() {
      this.router.push("/new")
    },
    goDetail(id) {
      this.router.push(`/note/${id}`)
    },
    filter(c) {
      this.store.loadByCategory(c)
    },
    clearSearch() {
      this.store.query = ""
      this.store.loadAll()
    },
    short(t) {
      return t.length > 100 ? t.slice(0, 100) + "..." : t
    },
    togglePin(note) {
      this.store.togglePin(note)
    },
    toggleArchive(note) {
      this.store.toggleArchive(note)
    },
    remove(id) {
      this.store.remove(id)
    }
  }
}
</script>

<style>
.toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.categories {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.card {
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
}

.archived {
  opacity: 0.6;
}
</style>
