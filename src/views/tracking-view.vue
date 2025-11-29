<script setup>
import { ref, onMounted } from 'vue'
import { DataService } from '@/services/api'
import DoTracking from '@/components/do-tracking.vue'

const trackingData = ref({})

onMounted(async () => {
  const data = await DataService.getBahanAjarData()
  if (data) {
    trackingData.value = data.tracking 
  }
})

const handleAddDO = (noDO, newDO) => {
  trackingData.value[noDO] = newDO
}
</script>

<template>
  <div>
    <DoTracking :tracking-data="trackingData" @add-do="handleAddDO" />
  </div>
</template>
