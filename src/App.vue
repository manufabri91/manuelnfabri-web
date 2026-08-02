<script setup lang="ts">
import { ref } from 'vue'
import LandingSection from '@/components/LandingSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ResumeSection from '@/components/ResumeSection.vue'
import ContactSection from '@/components/ContactSection.vue'

const isMenuActive = ref(false)
</script>

<template>
  <div class="app">
    <nav class="navbar is-light is-fixed-top">
      <div class="navbar-brand">
        <a class="navbar-item" href="#home">
          <img src="@/assets/logo.png" alt="Manuel Fabri - Developer" />
        </a>
        <div
          role="button"
          class="navbar-burger burger"
          :class="{ 'is-active': isMenuActive }"
          aria-label="menu"
          aria-expanded="false"
          @click="isMenuActive = !isMenuActive"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>

      <div id="navbarItems" class="navbar-menu" :class="{ 'is-active': isMenuActive }">
        <div class="navbar-start">
          <a class="navbar-item" href="#about">ABOUT ME</a>
          <a class="navbar-item" href="#resume">RESUME</a>
          <a class="navbar-item" href="#contact">CONTACT</a>
        </div>
      </div>
    </nav>
    <LandingSection />
    <AboutSection />
    <ResumeSection />
    <ContactSection />
  </div>
</template>
