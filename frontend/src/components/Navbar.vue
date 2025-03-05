<template>
  <nav class="bg-white dark:bg-gray-800 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-xl font-bold text-primary-600 dark:text-primary-400">
              ChartCraft
            </router-link>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link to="/" class="nav-link" :class="{ 'active-nav-link': $route.path === '/' }">
              创建图表
            </router-link>
            <router-link to="/history" class="nav-link" :class="{ 'active-nav-link': $route.path === '/history' }">
              历史记录
            </router-link>
          </div>
        </div>
        <div class="flex items-center">
          <button @click="toggleDarkMode" class="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <svg v-if="darkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- 移动端菜单 -->
    <div class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link to="/" class="mobile-nav-link" :class="{ 'active-mobile-nav-link': $route.path === '/' }">
          创建图表
        </router-link>
        <router-link to="/history" class="mobile-nav-link" :class="{ 'active-mobile-nav-link': $route.path === '/history' }">
          历史记录
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useChartStore } from '@/stores/index'

const store = useChartStore()
const darkMode = computed(() => store.darkMode)

function toggleDarkMode() {
  store.toggleDarkMode()
}
</script>


<style scoped>
.nav-link {
  @apply inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200;
}

.active-nav-link {
  @apply border-primary-500 text-gray-900 dark:text-white;
}

.mobile-nav-link {
  @apply block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700;
}

.active-mobile-nav-link {
  @apply bg-primary-50 dark:bg-primary-900 border-primary-500 text-primary-700 dark:text-primary-300;
}
</style>