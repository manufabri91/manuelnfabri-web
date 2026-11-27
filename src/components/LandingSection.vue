<script setup lang="ts">
import CvLinks from '@/components/CvLinks.vue'
</script>

<template>
  <section id="home" class="landing page-width" tabindex="-1" aria-labelledby="profile-heading">
    <div class="landing-copy">
      <p class="greeting">Hi, I'm Manuel Fabri.</p>
      <h1 id="profile-heading">
        Senior Software<br class="desktop-break" />
        Engineer
      </h1>
      <p class="intro">
        Frontend expertise in React, Vue and TypeScript, supported by full-stack experience.<span
          class="location"
          >Based in Madrid, Spain.</span
        >
      </p>
      <div class="hero-actions">
        <a class="action action-primary" href="#resume">View experience</a><CvLinks />
      </div>
      <div class="social-links">
        <a
          href="https://www.linkedin.com/in/manuelnfabri/"
          target="_blank"
          rel="noopener noreferrer"
          ><i class="fab fa-linkedin" aria-hidden="true"></i><span>LinkedIn</span></a
        >
        <a href="https://github.com/manufabri91" target="_blank" rel="noopener noreferrer"
          ><i class="fab fa-github" aria-hidden="true"></i><span>GitHub</span></a
        >
      </div>
    </div>
    <img
      class="landing-illustration"
      src="@/assets/hero-image.svg"
      alt=""
      width="600"
      height="500"
    />
  </section>
</template>
