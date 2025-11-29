<script setup>
import { ref, computed } from 'vue'
import StatusBadge from './status-badge.vue'

const props = defineProps({
  stokData: { type: Array, required: true }
})

const emit = defineEmits(['add-stok', 'edit-stok', 'delete-stok'])

const filterUpbjj = ref('')
const filterKategori = ref('')
const filterReorder = ref(false)
const sortBy = ref('judul')

const showModal = ref(false)
const formMode = ref('add') 
const editIndex = ref(-1)

const formData = ref({
  kode: '',
  judul: '',
  kategori: 'MK Wajib',
  upbjj: 'Jakarta',
  lokasiRak: '',
  harga: 0,
  qty: 0,
  safety: 10,
  catatanHTML: ''
})

const filteredStok = computed(() => {
  let result = props.stokData

  if (filterUpbjj.value) {
    result = result.filter((i) => i.upbjj === filterUpbjj.value)
  }
  if (filterKategori.value && filterUpbjj.value) {
    result = result.filter((i) => i.kategori === filterKategori.value)
  }
  if (filterReorder.value) {
    result = result.filter((i) => i.qty < i.safety || i.qty === 0)
  }

  return result.sort((a, b) => {
    if (sortBy.value === 'qty') return a.qty - b.qty
    if (sortBy.value === 'harga') return a.harga - b.harga
    return a.judul.localeCompare(b.judul)
  })
})

const resetFilter = () => {
  filterUpbjj.value = ''
  filterKategori.value = ''
  filterReorder.value = false
  sortBy.value = 'judul'
}

const openAddModal = () => {
  formMode.value = 'add'
  formData.value = {
    kode: '',
    judul: '',
    kategori: 'MK Wajib',
    upbjj: 'Jakarta',
    lokasiRak: '',
    harga: 0,
    qty: 0,
    safety: 10,
    catatanHTML: ''
  }
  showModal.value = true
}

const openEditModal = (item, index) => {
  formMode.value = 'edit'
  editIndex.value = index
  formData.value = { ...item }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveStok = () => {
  if (!formData.value.kode || !formData.value.judul) {
    alert('Kode dan Judul wajib diisi!')
    return
  }

  if (formMode.value === 'add') {
    emit('add-stok', { ...formData.value })
  } else {
    emit('edit-stok', editIndex.value, { ...formData.value })
  }

  closeModal()
}

const deleteStok = (item, index) => {
  if (confirm(`Hapus stok ${item.kode} - ${item.judul}?`)) {
    emit('delete-stok', index)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header & Filter -->
    <div class="card bg-gradient-to-br from-teal-50 to-blue-50 shadow-xl border-t-4 border-teal-500">
      <div class="card-body">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Daftar Stok Bahan Ajar</h2>
            <p class="text-sm text-gray-600 mt-1">
              Kelola dan pantau ketersediaan bahan pembelajaran
            </p>
          </div>
          <button @click="openAddModal" class="btn btn-primary gap-2 shadow-lg mt-3 md:mt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
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
            Tambah Baru
          </button>
        </div>

        <!-- Filter Area -->
        <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="form-control">
              <label class="label pb-2">
                <span class="label-text font-semibold text-gray-700">UT-Daerah</span>
              </label>
              <select v-model="filterUpbjj" class="select select-bordered w-full">
                <option value="">Semua Daerah</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Surabaya">Surabaya</option>
                <option value="Semarang">Semarang</option>
                <option value="Makassar">Makassar</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label pb-2">
                <span class="label-text font-semibold text-gray-700">Kategori MK</span>
              </label>
              <select
                v-model="filterKategori"
                :disabled="!filterUpbjj"
                class="select select-bordered w-full"
                :class="{ 'bg-gray-100 cursor-not-allowed': !filterUpbjj }"
              >
                <option value="">Semua Kategori</option>
                <option value="MK Wajib">MK Wajib</option>
                <option value="MK Pilihan">MK Pilihan</option>
                <option value="Praktikum">Praktikum</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label pb-2">
                <span class="label-text font-semibold text-gray-700">Urutkan</span>
              </label>
              <select v-model="sortBy" class="select select-bordered w-full">
                <option value="judul">Nama MK (A-Z)</option>
                <option value="qty">Stok Tersedikit</option>
                <option value="harga">Harga Termurah</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label pb-2">
                <span class="label-text font-semibold text-gray-700 opacity-0">.</span>
              </label>
              <button @click="resetFilter" class="btn btn-outline w-full">Reset Filter</button>
            </div>
          </div>

          <div class="mt-5 pt-5 border-t border-gray-200">
            <label class="label cursor-pointer justify-start gap-3 py-2">
              <input v-model="filterReorder" type="checkbox" class="checkbox checkbox-error" />
              <span class="label-text font-bold text-red-600">
                Tampilkan yang perlu RE-ORDER (Stok &lt; Safety)
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto shadow-lg rounded-xl bg-base-100">
      <table class="table table-zebra w-full">
        <thead class="bg-base-200 text-base-content">
          <tr>
            <th>Kode / Nama MK</th>
            <th>Kategori</th>
            <th>Lokasi</th>
            <th class="text-center">Stok / Safety</th>
            <th>Harga</th>
            <th>Status</th>
            <th>Catatan</th>
            <th class="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredStok" :key="item.kode">
            <td>
              <div class="font-bold text-primary">{{ item.kode }}</div>
              <div class="text-sm opacity-70">{{ item.judul }}</div>
              <div class="badge badge-ghost badge-xs mt-1">{{ item.upbjj }}</div>
            </td>
            <td>{{ item.kategori }}</td>
            <td>
              <span class="font-mono font-bold bg-gray-100 px-2 py-1 rounded">{{
                item.lokasiRak
              }}</span>
            </td>
            <td class="text-center">
              <div class="font-bold text-lg">{{ item.qty }}</div>
              <div class="text-xs text-gray-500">Safety: {{ item.safety }}</div>
            </td>
            <td>Rp {{ item.harga.toLocaleString('id-ID') }}</td>
            <td>
              <StatusBadge :qty="item.qty" :safety="item.safety" />
            </td>
            <td>
              <span class="text-xs italic" v-html="item.catatanHTML"></span>
            </td>
            <td>
              <div class="flex gap-2 justify-center">
                <button
                  @click="openEditModal(item, index)"
                  class="btn btn-sm btn-square btn-outline btn-info"
                  title="Edit"
                >
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button
                  @click="deleteStok(item, index)"
                  class="btn btn-sm btn-square btn-outline btn-error"
                  title="Hapus"
                >
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Add/Edit -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="closeModal">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Header -->
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
            {{ formMode === 'add' ? 'Tambah Stok Baru' : 'Edit Stok' }}
          </h3>
          <button @click="closeModal" class="btn btn-sm btn-circle btn-ghost">✕</button>
        </div>

        <!-- Body -->
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Kolom Kiri -->
            <div class="space-y-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Kode MK</span>
                  <span class="label-text-alt text-error">*</span>
                </label>
                <input
                  v-model="formData.kode"
                  type="text"
                  placeholder="Contoh: EKMA4116"
                  class="input input-bordered"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Nama Mata Kuliah</span>
                  <span class="label-text-alt text-error">*</span>
                </label>
                <input
                  v-model="formData.judul"
                  type="text"
                  placeholder="Contoh: Pengantar Manajemen"
                  class="input input-bordered"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Kategori</span>
                </label>
                <select v-model="formData.kategori" class="select select-bordered">
                  <option value="MK Wajib">MK Wajib</option>
                  <option value="MK Pilihan">MK Pilihan</option>
                  <option value="Praktikum">Praktikum</option>
                  <option value="Problem-Based">Problem-Based</option>
                </select>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">UT-Daerah</span>
                </label>
                <select v-model="formData.upbjj" class="select select-bordered">
                  <option value="Jakarta">Jakarta</option>
                  <option value="Surabaya">Surabaya</option>
                  <option value="Semarang">Semarang</option>
                  <option value="Makassar">Makassar</option>
                  <option value="Padang">Padang</option>
                  <option value="Denpasar">Denpasar</option>
                </select>
              </div>
            </div>

            <!-- Kolom Kanan -->
            <div class="space-y-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Lokasi Rak</span>
                </label>
                <input
                  v-model="formData.lokasiRak"
                  type="text"
                  placeholder="Contoh: R1-A3"
                  class="input input-bordered"
                />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Qty Stok</span>
                  </label>
                  <input
                    v-model.number="formData.qty"
                    type="number"
                    min="0"
                    class="input input-bordered"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Safety Stock</span>
                  </label>
                  <input
                    v-model.number="formData.safety"
                    type="number"
                    min="0"
                    class="input input-bordered"
                  />
                </div>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Harga (Rp)</span>
                </label>
                <input
                  v-model.number="formData.harga"
                  type="number"
                  min="0"
                  placeholder="0"
                  class="input input-bordered"
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Catatan (HTML)</span>
                </label>
                <textarea
                  v-model="formData.catatanHTML"
                  class="textarea textarea-bordered"
                  rows="3"
                  placeholder="Contoh: <em>Edisi 2024</em>"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="sticky bottom-0 bg-white border-t p-5 flex justify-end gap-3">
          <button class="btn" @click="closeModal">Batal</button>
          <button class="btn btn-primary px-6" @click="saveStok">
            {{ formMode === 'add' ? 'Tambah' : 'Simpan' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
