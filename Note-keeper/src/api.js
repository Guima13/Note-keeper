const BASE = "http://localhost:3000/notes"

export async function getAllNotes() {
  return (await fetch(BASE)).json()
}

export async function getNoteById(id) {
  return (await fetch(`${BASE}/${id}`)).json()
}

export async function getNotesByCategory(category) {
  return (await fetch(`${BASE}?category=${category}`)).json()
}

export async function searchNotes(query) {
  return (await fetch(`${BASE}?q=${query}`)).json()
}

export async function createNote(noteData) {
  return (await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData)
  })).json()
}

export async function updateNote(id, noteData) {
  return (await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData)
  })).json()
}

export async function deleteNote(id) {
  await fetch(`${BASE}/${id}`, { method: "DELETE" })
}
