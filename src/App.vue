<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const isActive = (name) => {
  return route.name === name
}
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <nav class="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
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
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl"
          >
            <li>
              <RouterLink to="/" :class="{ active: isActive('home') }">
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Dashboard
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/stok" :class="{ active: isActive('stok') }">
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
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                Stok Bahan Ajar
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/tracking" :class="{ active: isActive('tracking') }">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Tracking DO
              </RouterLink>
            </li>
          </ul>
        </div>
        <RouterLink to="/" class="btn btn-ghost text-xl font-bold">
        Bahan Ajar
        </RouterLink>
      </div>

    

      <div class="navbar-end">
        <div class="badge badge-primary gap-2">
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          053295311
        </div>
      </div>
    </nav>

    <main class="container mx-auto p-4">
      <RouterView />
    </main>

    <footer class="footer footer-center p-4 bg-base-300 text-base-content mt-10">
      <aside>
        <p>© 2025 Mustafit Khusni Mubarok - Sistem Bahan Ajar Tugas 3</p>
      </aside>
    </footer>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply font-bold;
}
</style>
