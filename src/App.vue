<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useNotesStore } from '@/stores/notes';
import NoteInput from '@/components/NoteInput.vue';
import NoteCard from '@/components/NoteCard.vue';

const store = useNotesStore();

const searchQuery = ref('');
const sortOrder = ref<'newest' | 'oldest'>('newest');
const currentPage = ref(1);
const NOTES_PER_PAGE = 12;

watch([searchQuery, sortOrder], () => {
  currentPage.value = 1;
});

const filteredNotes = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return store.notes;
  return store.notes.filter((n) => n.text.toLowerCase().includes(q));
});

const sortedNotes = computed(() => {
  const copy = [...filteredNotes.value];
  return sortOrder.value === 'newest'
    ? copy.sort((a, b) => b.createdAt - a.createdAt)
    : copy.sort((a, b) => a.createdAt - b.createdAt);
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(sortedNotes.value.length / NOTES_PER_PAGE))
);

const paginatedNotes = computed(() => {
  const start = (currentPage.value - 1) * NOTES_PER_PAGE;
  return sortedNotes.value.slice(start, start + NOTES_PER_PAGE);
});

function handleAdd(text: string) {
  store.addNote(text);
}

function handleRemove(id: string) {
  store.removeNote(id);
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Notes</h1>

      <NoteInput class="mb-6" @add="handleAdd" />

      <button
        class="mb-6 px-4 py-2 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600"
        @click="store.seedNotes(100)"
      >
        Seed 100 test notes
      </button>

      <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search notes..."
          class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium whitespace-nowrap"
          @click="sortOrder = sortOrder === 'newest' ? 'oldest' : 'newest'"
        >
          Sort: {{ sortOrder === 'newest' ? 'Newest first' : 'Oldest first' }}
        </button>
      </div>

      <div
        v-if="paginatedNotes.length"
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <NoteCard
          v-for="note in paginatedNotes"
          :key="note.id"
          :note="note"
          @remove="handleRemove"
        />
      </div>
      <p v-else class="text-center text-gray-500 py-12">
        {{ searchQuery ? 'No notes match your search.' : 'No notes yet. Add one above!' }}
      </p>

      <div v-if="totalPages > 1" class="flex items-center justify-center gap-4 mt-6">
        <button
          :disabled="currentPage <= 1"
          class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
          @click="currentPage--"
        >
          Previous
        </button>
        <span class="text-gray-600">{{ currentPage }} / {{ totalPages }}</span>
        <button
          :disabled="currentPage >= totalPages"
          class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
