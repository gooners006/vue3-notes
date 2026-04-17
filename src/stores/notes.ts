import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export interface Note {
  id: string;
  text: string;
  createdAt: number;
  bgColor: string;
}

function randomPastelRgb(): string {
  const r = Math.floor(Math.random() * 80 + 160);
  const g = Math.floor(Math.random() * 80 + 160);
  const b = Math.floor(Math.random() * 80 + 160);
  return `rgb(${r}, ${g}, ${b})`;
}

function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem('notes');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>(loadNotes());

  watch(notes, (val) => localStorage.setItem('notes', JSON.stringify(val)), { deep: true });

  function addNote(text: string) {
    notes.value.push({
      id: crypto.randomUUID(),
      text,
      createdAt: Date.now(),
      bgColor: randomPastelRgb(),
    });
  }

  function removeNote(id: string) {
    notes.value = notes.value.filter((n) => n.id !== id);
  }

  const sampleTexts = [
    'Buy groceries for the week',
    'Review pull request #42',
    'Schedule dentist appointment',
    'Read chapter 5 of Design Patterns',
    'Fix login page bug',
    'Plan weekend hiking trip',
    'Update project dependencies',
    'Write unit tests for auth module',
    'Call mom for her birthday',
    'Refactor database queries',
  ];

  function seedNotes(count: number) {
    const now = Date.now();
    for (let i = 0; i < count; i++) {
      notes.value.push({
        id: crypto.randomUUID(),
        text: `${sampleTexts[i % sampleTexts.length]} (#${i + 1})`,
        createdAt: now - i * 3600000,
        bgColor: randomPastelRgb(),
      });
    }
  }

  return { notes, addNote, removeNote, seedNotes };
});
