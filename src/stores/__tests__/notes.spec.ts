import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useNotesStore } from '../notes';

describe('useNotesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('adds a note with correct fields', () => {
    const store = useNotesStore();
    store.addNote('Hello world');

    expect(store.notes).toHaveLength(1);
    const note = store.notes[0];
    expect(note.text).toBe('Hello world');
    expect(note.id).toBeTruthy();
    expect(note.createdAt).toBeGreaterThan(0);
  });

  it('removes a note by id', () => {
    const store = useNotesStore();
    store.addNote('Note 1');
    store.addNote('Note 2');

    const idToRemove = store.notes[0].id;
    store.removeNote(idToRemove);

    expect(store.notes).toHaveLength(1);
    expect(store.notes[0].text).toBe('Note 2');
  });

  it('generates unique colors for different notes', () => {
    const store = useNotesStore();
    for (let i = 0; i < 10; i++) {
      store.addNote(`Note ${i}`);
    }
    const colors = new Set(store.notes.map((n) => n.bgColor));
    expect(colors.size).toBeGreaterThan(1);
  });
});
