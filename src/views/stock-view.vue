<script setup>
import { ref, onMounted } from 'vue'
import { DataService } from '@/services/api'
import StockTable from '@/components/stock-table.vue'

const stokData = ref([])

onMounted(async () => {
  const data = await DataService.getBahanAjarData()
  if (data) {
    stokData.value = data.stok
  }
})

const handleAddStok = (newStok) => {
  stokData.value.push(newStok)
  alert('Stok berhasil ditambahkan!')
}

const handleEditStok = (index, updatedStok) => {
  stokData.value[index] = updatedStok
  alert('Stok berhasil diupdate!')
}

const handleDeleteStok = (index) => {
  stokData.value.splice(index, 1)
  alert('Stok berhasil dihapus!')
}
</script>

<template>
  <div>
    <StockTable
      :stok-data="stokData"
      @add-stok="handleAddStok"
      @edit-stok="handleEditStok"
      @delete-stok="handleDeleteStok"
    />
  </div>
</template>
