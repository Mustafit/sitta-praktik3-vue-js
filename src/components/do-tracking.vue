<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  trackingData: { type: Object, required: true },
})

const emit = defineEmits(['add-do'])

const searchQuery = ref('')
const showModal = ref(false)

const form = ref({
  nim: '',
  nama: '',
  ekspedisi: '',
  paketKode: '',
  tanggalKirim: new Date().toISOString().slice(0, 10),
})

const selectedPaket = ref(null)

const paketList = ref([
  {
    kode: 'PAKET-UT-001',
    nama: 'PAKET IPS Dasar',
    isi: ['EKMA4116 - Pengantar Manajemen', 'EKMA4115 - Pengantar Akuntansi'],
    harga: 120000,
  },
  {
    kode: 'PAKET-UT-002',
    nama: 'PAKET IPA Dasar',
    isi: ['BIOL4201 - Biologi Umum', 'FISIP4001 - Dasar-Dasar Sosiologi'],
    harga: 140000,
  },
])

const pengirimanList = ref([
  { kode: 'REG', nama: 'JNE Regular (3-5 hari)' },
  { kode: 'EXP', nama: 'JNE Express (1-2 hari)' },
])

const generatedNoDO = computed(() => {
  const year = new Date().getFullYear()
  const count = Object.keys(props.trackingData).length + 1
  return `DO${year}-${count.toString().padStart(3, '0')}`
})

const isFormValid = computed(() => {
  return form.value.nim && form.value.nama && form.value.ekspedisi && form.value.paketKode
})

const filteredTracking = computed(() => {
  const entries = Object.entries(props.trackingData || {})
  if (!searchQuery.value) return entries
  const q = searchQuery.value.toLowerCase()
  return entries.filter(
    ([k, v]) =>
      k.toLowerCase().includes(q) || v.nama.toLowerCase().includes(q) || v.nim.includes(q),
  )
})

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const resetForm = () => {
  form.value = {
    nim: '',
    nama: '',
    ekspedisi: '',
    paketKode: '',
    tanggalKirim: new Date().toISOString().slice(0, 10),
  }
  selectedPaket.value = null
}

const updateDetailPaket = () => {
  selectedPaket.value = paketList.value.find((p) => p.kode === form.value.paketKode) || null
}

const submitDO = () => {
  if (!isFormValid.value) {
    alert('Mohon lengkapi semua data!')
    return
  }

  const newDO = {
    nim: form.value.nim,
    nama: form.value.nama,
    ekspedisi: form.value.ekspedisi,
    paket: form.value.paketKode,
    tanggalKirim: form.value.tanggalKirim,
    status: 'Pemesanan diProses',
    total: selectedPaket.value ? selectedPaket.value.harga : 0,
  }

  emit('add-do', generatedNoDO.value, newDO)
  alert(`DO Berhasil Disimpan!\nNomor: ${generatedNoDO.value}`)
  closeModal()
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="card bg-base-100 shadow-sm border border-gray-200">
      <div class="card-body p-4">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 class="card-title text-xl font-bold text-gray-800">Monitoring Pengiriman DO</h2>
            <p class="text-xs text-gray-500">Pantau status dan input data pengiriman</p>
          </div>

          <div class="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <div class="form-control w-full md:w-72">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari No DO / Nama / NIM..."
                  class="input input-bordered w-full pl-10 input-sm"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    class="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <button @click="openModal" class="btn btn-primary btn-sm gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Input DO Baru
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-xl border border-gray-200">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead class="bg-gray-50 text-gray-600 text-xs uppercase font-bold">
            <tr>
              <th class="p-4">Nomor DO</th>
              <th class="p-4">Mahasiswa</th>
              <th class="p-4">Paket / Ekspedisi</th>
              <th class="p-4">Tgl Kirim</th>
              <th class="p-4 text-right">Biaya</th>
              <th class="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr
              v-for="[noDO, data] in filteredTracking"
              :key="noDO"
              class="hover border-b border-gray-100"
            >
              <td class="p-4">
                <span
                  class="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs"
                  >{{ noDO }}</span
                >
              </td>
              <td class="p-4">
                <div class="font-bold text-gray-800">{{ data.nama }}</div>
                <div class="text-xs text-gray-500">{{ data.nim }}</div>
              </td>
              <td class="p-4">
                <div class="badge badge-outline badge-sm mb-1 text-gray-600">
                  {{ data.paket }}
                </div>
                <div class="text-xs font-semibold text-blue-600">{{ data.ekspedisi }}</div>
              </td>
              <td class="p-4 text-gray-600">{{ data.tanggalKirim }}</td>
              <td class="p-4 font-bold text-gray-700 text-right">
                Rp {{ data.total ? data.total.toLocaleString('id-ID') : 0 }}
              </td>
              <td class="p-4 text-center">
                <span class="badge badge-success text-white text-xs">{{ data.status }}</span>
              </td>
            </tr>
            <tr v-if="filteredTracking.length === 0">
              <td colspan="6" class="text-center py-10 text-gray-400 italic">
                Data tidak ditemukan.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="closeModal"
    >
      <div
        class="bg-white rounded-xl shadow-2xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div class="sticky top-0 bg-white z-10 border-b p-5 flex justify-between items-center">
          <h3 class="font-bold text-lg flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Input Delivery Order Baru
          </h3>
          <button @click="closeModal" class="btn btn-sm btn-circle btn-ghost">✕</button>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="form-control">
                <label class="label"
                  ><span class="label-text font-semibold">Nomor DO (Otomatis)</span></label
                >
                <input
                  type="text"
                  :value="generatedNoDO"
                  disabled
                  class="input input-bordered bg-gray-100 font-mono font-bold text-gray-600"
                />
              </div>
              <div class="form-control">
                <label class="label"><span class="label-text font-semibold">NIM</span></label>
                <input
                  v-model="form.nim"
                  type="text"
                  class="input input-bordered"
                  placeholder="NIM"
                />
              </div>
              <div class="form-control">
                <label class="label"
                  ><span class="label-text font-semibold">Nama Lengkap</span></label
                >
                <input
                  v-model="form.nama"
                  type="text"
                  class="input input-bordered"
                  placeholder="Nama Mahasiswa"
                />
              </div>
              <div class="form-control">
                <label class="label"
                  ><span class="label-text font-semibold">Tanggal Kirim</span></label
                >
                <input v-model="form.tanggalKirim" type="date" class="input input-bordered" />
              </div>
            </div>

            <div class="space-y-4 bg-blue-50 p-5 rounded-lg border border-blue-100">
              <div class="form-control">
                <label class="label"
                  ><span class="label-text font-semibold text-blue-900">Jasa Ekspedisi</span></label
                >
                <select v-model="form.ekspedisi" class="select select-bordered w-full">
                  <option disabled value="">-- Pilih Ekspedisi --</option>
                  <option v-for="exp in pengirimanList" :key="exp.kode" :value="exp.nama">
                    {{ exp.nama }}
                  </option>
                </select>
              </div>
              <div class="form-control">
                <label class="label"
                  ><span class="label-text font-semibold text-blue-900">Pilih Paket</span></label
                >
                <select
                  v-model="form.paketKode"
                  @change="updateDetailPaket"
                  class="select select-bordered w-full"
                >
                  <option disabled value="">-- Pilih Paket --</option>
                  <option v-for="p in paketList" :key="p.kode" :value="p.kode">
                    {{ p.kode }} - {{ p.nama }}
                  </option>
                </select>
              </div>

              <div v-if="selectedPaket" class="mt-3 pt-3 border-t border-blue-200">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-xs font-bold text-gray-500 uppercase">Total Biaya</span>
                  <span class="text-xl font-bold text-blue-700"
                    >Rp {{ selectedPaket.harga.toLocaleString('id-ID') }}</span
                  >
                </div>
                <div class="bg-white p-3 rounded text-xs text-gray-600 shadow-sm">
                  <span class="font-semibold mb-1 block">Isi Paket:</span>
                  <ul class="list-disc list-inside">
                    <li v-for="isi in selectedPaket.isi" :key="isi">{{ isi }}</li>
                  </ul>
                </div>
              </div>
              <div v-else class="mt-4 text-center text-sm text-gray-400 italic">
                Pilih paket untuk melihat rincian harga.
              </div>
            </div>
          </div>
        </div>

        <div class="sticky bottom-0 bg-white border-t p-5 flex justify-end gap-3">
          <button class="btn" @click="closeModal">Batal</button>
          <button class="btn btn-primary px-6" @click="submitDO" :disabled="!isFormValid">
            Simpan Data
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
