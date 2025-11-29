<script setup>
import { ref, computed, onMounted } from 'vue'
import { DataService } from '@/services/api'

const stokData = ref([])
const trackingData = ref({})

onMounted(async () => {
  const data = await DataService.getBahanAjarData()
  if (data) {
    stokData.value = data.stok
    trackingData.value = data.tracking
  }
})

const totalItemStok = computed(() => stokData.value.length)
const totalQtyStok = computed(() => stokData.value.reduce((sum, i) => sum + i.qty, 0))
const totalTrackingAktif = computed(() => Object.keys(trackingData.value).length)
</script>

<template>
  <div class="space-y-6">
    <div class="card bg-gradient-to-r from-amber-400 via-orange-300 to-pink-300 text-gray-900 shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-3xl font-bold">Dashboard Bahan Ajar</h2>
        <p class="opacity-90">Kelola dan pantau ketersediaan bahan pembelajaran Anda</p>
      </div>
    </div>

    <div class="stats stats-vertical lg:stats-horizontal shadow-lg w-full bg-base-100">
      <div class="card-body p-6">
        <h2 class="card-title text-3xl mb-4">
          Mustafit Khusni Mubarok
          <div class="badge badge-info badge-lg bg-cyan-200 text-cyan-800 border-none font-semibold">Mahasiswa</div>
        </h2>
        <div class="flex flex-col md:flex-row gap-6">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-full bg-teal-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase">NIM</p>
              <p class="text-xl font-bold text-gray-800 font-mono">053295311</p>
            </div>
          </div>
          <div class="hidden md:block w-px bg-gray-200 h-12 self-center"></div>
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-full bg-pink-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase">UPBJJ</p>
              <p class="text-lg font-bold text-gray-800">SEMARANG</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Card Stok -->
      <div class="card bg-gradient-to-br from-teal-400 to-teal-600 text-white shadow-2xl hover:scale-[1.02] transition">
        <div class="card-body items-center text-center">
          <div class="mb-2 p-4 bg-white/20 rounded-full backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h2 class="card-title text-3xl font-bold">Stock Bahan Ajar</h2>
          <p class="text-teal-50 opacity-90 mb-4 text-sm">Kelola dan pantau ketersediaan bahan pembelajaran</p>
          
          <div class="flex w-full bg-black/10 rounded-xl mt-2 border border-white/20">
            <div class="flex-1 p-3 border-r border-white/20 flex flex-col">
              <span class="text-xs opacity-80">Total Item</span>
              <span class="text-3xl font-bold">{{ totalItemStok }}</span>
            </div>
            <div class="flex-1 p-3 flex flex-col justify-center">
              <span class="text-sm font-bold">Total Qty: {{ totalQtyStok }}</span>
            </div>
          </div>

          <div class="card-actions mt-4">
            <router-link to="/stok" class="btn btn-white text-teal-700 gap-2 px-6">
              Lihat Stock
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Card Tracking -->
      <div class="card bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-2xl hover:scale-[1.02] transition">
        <div class="card-body items-center text-center">
          <div class="mb-2 p-4 bg-white/20 rounded-full backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 class="card-title text-3xl font-bold">Tracking Delivery</h2>
          <p class="text-blue-50 opacity-90 mb-4 text-sm">Pantau status pengiriman bahan ajar ke UPBJJ</p>
          
          <div class="flex w-full bg-black/10 rounded-xl mt-2 border border-white/20">
            <div class="flex-1 p-3 border-r border-white/20 flex flex-col">
              <span class="text-xs opacity-80">Total DO</span>
              <span class="text-3xl font-bold">{{ totalTrackingAktif }}</span>
            </div>
            <div class="flex-1 p-3 flex flex-col justify-center">
              <span class="text-sm font-bold">Ekspedisi JNE</span>
            </div>
          </div>

          <div class="card-actions mt-4">
            <router-link to="/tracking" class="btn btn-white text-blue-700 gap-2 px-6">
              Lihat Tracking
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
