<script setup>
import { computed, onMounted } from 'vue'
import { useChartStore } from '@/stores/index'
import Navbar from '@/components/Navbar.vue'

const store = useChartStore()
const darkMode = computed(() => store.darkMode)

onMounted(() => {
  store.initDarkMode()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Navbar />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>