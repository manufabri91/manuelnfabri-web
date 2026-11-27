<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import LandingSection from '@/components/LandingSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ResumeSection from '@/components/ResumeSection.vue'
import ContactSection from '@/components/ContactSection.vue'

const isMenuActive = ref(false)
const menuToggle = ref<HTMLButtonElement | null>(null)

async function navigate(event: MouseEvent) {
  const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
  if (!link) return
  isMenuActive.value = false
  await nextTick()
  document.getElementById(link.hash.slice(1))?.focus({ preventScroll: true })
}

function closeMenu() {
  if (!isMenuActive.value) return
  isMenuActive.value = false
  menuToggle.value?.focus()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenu()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div class="app">
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <nav class="site-nav page-width" aria-label="Main navigation" @click="navigate">
        <a class="brand" href="#home" aria-label="Manuel Fabri home">
          <i class="fas fa-code" aria-hidden="true"></i><span>Manuel Fabri</span>
        </a>
        <button
          ref="menuToggle"
          class="menu-toggle"
          type="button"
          :aria-expanded="isMenuActive"
          aria-controls="navbarItems"
          @click="isMenuActive = !isMenuActive"
        >
          <span>{{ isMenuActive ? 'Close' : 'Menu' }}</span>
          <i :class="isMenuActive ? 'fas fa-times' : 'fas fa-bars'" aria-hidden="true"></i>
        </button>
        <div id="navbarItems" class="navigation-links" :class="{ 'is-open': isMenuActive }">
          <a href="#resume">Experience</a><a href="#skills">Skills</a><a href="#about">About</a
          ><a href="#contact">Contact</a>
        </div>
      </nav>
    </header>
    <main id="main" tabindex="-1">
      <LandingSection /><ResumeSection /><AboutSection /><ContactSection />
    </main>
    <footer class="site-footer page-width">
      <span>Manuel Fabri</span><a href="#home">Back to top</a>
    </footer>
  </div>
</template>
