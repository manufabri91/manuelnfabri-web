<script setup lang="ts">
import CvLinks from '@/components/CvLinks.vue'
</script>

<template>
  <section id="contact" class="contact-section" tabindex="-1" aria-labelledby="contact-heading">
    <div class="page-width contact-layout">
      <div>
        <h2 id="contact-heading">Let's talk.</h2>
        <p>Get in touch to discuss software engineering opportunities.</p>
        <a class="contact-email" href="mailto:manuelnfabri@gmail.com">manuelnfabri@gmail.com</a>
        <a
          class="contact-link"
          href="https://www.linkedin.com/in/manuelnfabri/"
          target="_blank"
          rel="noopener noreferrer"
          ><i class="fab fa-linkedin" aria-hidden="true"></i>Connect on LinkedIn</a
        >
      </div>
      <div class="contact-cv">
        <h3>Take a copy with you.</h3>
        <p>My CV in English or Spanish.</p>
        <CvLinks />
      </div>
    </div>
  </section>
</template>
