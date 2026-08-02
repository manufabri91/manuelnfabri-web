<script setup lang="ts">
import { getYearsSince } from '@/utils/date'

const yearsOnIT = getYearsSince(new Date(2014, 8, 1))
const yearsAsDev = getYearsSince(new Date(2018, 8, 1))

function openLink(url: string) {
  window.open(url)
}
</script>

<template>
  <section id="home" class="hero is-dark is-fullheight">
    <img
      alt="background illustration"
      class="hero-background is-dark"
      src="@/assets/hero-image.svg"
    />
    <div class="hero-body">
      <div class="container">
        <div class="box mt-3 has-background-black" style="opacity: 0.9">
          <h3 class="title is-3 has-text-centered">Hi, there!</h3>
          <h4 class="title is-4 has-text-centered">
            I'm <strong>Manuel Fabri</strong>
            <span role="img" aria-label="smile">😀</span>
          </h4>
          <p class="has-text-white">
            I'm a <strong>software developer</strong> currently based in Madrid (Spain).
          </p>
          <p class="has-text-white">
            I have <strong>over {{ yearsOnIT }} years of IT experience</strong> which includes
            more than {{ yearsAsDev }} years of experience building beautiful web apps, following
            best practices and always looking for improvements. I have passion for helping
            others, high attention to details and a very proactive attitude.
          </p>
          <div class="buttons has-text-centered is-flex is-justify-content-center">
            <button
              class="button is-dark"
              @click="openLink('https://www.linkedin.com/in/manuelnfabri/')"
            >
              <span class="icon is-large"><i class="fab fa-linkedin fa-2x"></i></span>
            </button>
            <button class="button is-dark" @click="openLink('https://github.com/manufabri91')">
              <span class="icon is-large"><i class="fab fa-github fa-2x"></i></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-footer">
      <div class="container has-text-centered">
        <a href="#about">
          <i class="fas fa-chevron-circle-down arrow" style="font-size: 3rem; margin-bottom: 3rem"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.arrow {
  color: var(--accent-dark);
}
.arrow:hover {
  color: white;
}
/* Bulma 1.0.4's .buttons gap is 0.75rem; 0.9.4 spaced buttons with 0.5rem margins */
.buttons {
  gap: 0.5rem;
}
.hero.has-background {
  position: relative;
  overflow: hidden;
}
.hero-background {
  position: absolute;
  object-fit: cover;
  object-position: center center;
  width: 100%;
  height: 100%;
}
.hero-background.is-transparent {
  opacity: 0.7;
}
@media screen and (min-width: 768px) {
  .hero-background {
    object-fit: contain;
  }
}
</style>
