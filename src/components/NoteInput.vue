<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{ (e: 'add', text: string): void }>();
const text = ref('');

function submit() {
  const trimmed = text.value.trim();
  if (!trimmed) return;
  emit('add', trimmed);
  text.value = '';
}
</script>

<template>
  <div class="flex gap-2">
    <textarea
      v-model="text"
      placeholder="Write a note..."
      class="flex-1 rounded-lg border border-gray-300 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      rows="3"
      @keydown.ctrl.enter="submit"
    />
    <button
      :disabled="!text.trim()"
      class="self-end px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
      @click="submit"
    >
      Add
    </button>
  </div>
</template>
