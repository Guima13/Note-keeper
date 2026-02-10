<template>
  <div>

    <h1>{{ isEdit ? "Editar Nota" : "Nova Nota" }}</h1>

    <form @submit.prevent="submit">

      <input v-model="form.title" placeholder="Título" required>

      <textarea v-model="form.content" placeholder="Conteúdo" required></textarea>

      <select v-model="form.category">
        <option v-for="c in categories" :key="c" :value="c">
          {{ c }}
        </option>
      </select>

      <select v-model="form.color">
        <option v-for="c in colors" :key="c" :value="c">
          {{ c }}
        </option>
      </select>

      <button type="submit">
        {{ isEdit ? "Guardar Alterações" : "Criar Nota" }}
      </button>

      <button type="button" @click="goBack">
        Voltar
      </button>

    </form>

  </div>
</template>

<script>
import { useNotesStore } from "../stores/notes"
import { useRouter, useRoute } from "vue-router"

export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
        category: "personal",
        color: "yellow",
        pinned: false,
        archived: false,
        createdAt: new Date().toISOString()
      },
      categories: ["personal", "work", "ideas", "other"],
      colors: ["yellow", "green", "blue", "pink"],
      isEdit: false
    }
  },

  setup() {
    const store = useNotesStore()
    const router = useRouter()
    const route = useRoute()
    return { store, router, route }
  },

  async mounted() {
    if (this.route.query.id) {
      this.isEdit = true
      await this.store.loadOne(this.route.query.id)
      this.form = { ...this.store.current }
    }
  },

  methods: {
    async submit() {
      if (this.isEdit) {
        await this.store.update(this.route.query.id, this.form)
        this.router.push(`/note/${this.route.query.id}`)
      } else {
        await this.store.create(this.form)
        this.router.push("/")
      }
    },

    goBack() {
      this.router.push("/")
    }
  }
}
</script>
