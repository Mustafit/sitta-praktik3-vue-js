<script setup>
import { computed } from 'vue'

const props = defineProps({
  qty: { type: Number, required: true },
  safety: { type: Number, required: true },
})

const status = computed(() => {
  if (props.qty === 0) {
    return {
      label: 'Kosong',
      class: 'badge-error text-white',
      icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
    }
  }
  if (props.qty < props.safety) {
    return {
      label: 'Menipis',
      class: 'badge-warning',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    }
  }
  return {
    label: 'Aman',
    class: 'badge-success text-white',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  }
})
</script>

<template>
  <div class="badge gap-2 p-3" :class="status.class">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="status.icon" />
    </svg>
    {{ status.label }}
  </div>
</template>
