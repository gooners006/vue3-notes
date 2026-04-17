<script setup lang="ts">
import type { Note } from '@/stores/notes';

defineProps<{ note: Note }>();
const emit = defineEmits<{ (e: 'remove', id: string): void }>();
</script>

<template>
  <div
    class="relative rounded-lg p-4 shadow-md min-h-[150px] flex flex-col justify-between"
    :style="{ backgroundColor: note.bgColor }"
  >
    <button
      aria-label="Remove note"
      class="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/80 text-gray-700 text-sm leading-none"
      @click="emit('remove', note.id)"
    >
      &times;
    </button>
    <p class="text-gray-800 whitespace-pre-wrap break-words pr-6" style="overflow-wrap: anywhere">
      {{ note.text }}
    </p>
    <p class="text-xs text-gray-600 mt-3">
      {{
        new Date(note.createdAt).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      }}
    </p>
  </div>
</template>
