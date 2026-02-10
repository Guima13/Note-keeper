import { defineStore } from "pinia"
import { getAllNotes, getNoteById, getNotesByCategory, searchNotes, createNote, updateNote, deleteNote } from "../api"

export const useNotesStore = defineStore("notes", {
  state: () => ({
    list: [],
    current: null,
    activeCategory: null,
    query: "",
    loading: false,
    error: null
  }),

  getters: {
    sortedNotes(state) {
      const pinned = state.list.filter(n => n.pinned && !n.archived)
      const normal = state.list.filter(n => !n.pinned && !n.archived)
      const archived = state.list.filter(n => n.archived)

      pinned.sort((a,b) => b.createdAt.localeCompare(a.createdAt))
      normal.sort((a,b) => b.createdAt.localeCompare(a.createdAt))
      archived.sort((a,b) => b.createdAt.localeCompare(a.createdAt))

      return [...pinned, ...normal, ...archived]
    },

    notesByCategory(state) {
      if (!state.activeCategory) return state.list
      return state.list.filter(n => n.category === state.activeCategory)
    },

    pinnedCount(state) {
      return state.list.filter(n => n.pinned).length
    },

    archivedCount(state) {
      return state.list.filter(n => n.archived).length
    },

    hasNotes(state) {
      return state.list.length > 0
    }
  },

  actions: {
    async loadAll() {
      this.loading = true
      this.list = await getAllNotes()
      this.loading = false
    },

    async loadByCategory(cat) {
      this.activeCategory = cat
      this.loading = true
      this.list = await getNotesByCategory(cat)
      this.loading = false
    },

    async loadOne(id) {
      this.loading = true
      this.current = await getNoteById(id)
      this.loading = false
    },

    async search(q) {
      this.query = q
      this.loading = true
      this.list = await searchNotes(q)
      this.loading = false
    },

    async create(data) {
      const r = await createNote(data)
      this.list.push(r)
    },

    async update(id, data) {
      const r = await updateNote(id, data)
      this.current = r
    },

    async remove(id) {
      await deleteNote(id)
      this.list = this.list.filter(n => n.id !== id)
    },

    async togglePin(note) {
      const updated = await updateNote(note.id, { ...note, pinned: !note.pinned })
      const i = this.list.findIndex(n => n.id === note.id)
      this.list[i] = updated
    },

    async toggleArchive(note) {
      const updated = await updateNote(note.id, { ...note, archived: !note.archived, pinned: false })
      const i = this.list.findIndex(n => n.id === note.id)
      this.list[i] = updated
    }
  }
})
