<script setup lang="ts">
import { earlierExperience, experience, skills } from '@/content/profile'
</script>

<template>
  <section
    id="resume"
    class="section-block page-width"
    tabindex="-1"
    aria-labelledby="experience-heading"
  >
    <div class="section-heading">
      <h2 id="experience-heading">Experience</h2>
      <p>From technical refinement to production.</p>
    </div>
    <div class="experience-list">
      <article v-for="job in experience" :key="job.company" class="experience-entry">
        <div class="company-column">
          <h3>{{ job.company }}</h3>
        </div>
        <div class="experience-body">
          <div class="role-heading">
            <p class="role">{{ job.role }}</p>
            <p class="dates">{{ job.dates }}</p>
          </div>
          <p v-if="job.clients" class="client-description">{{ job.clients }}</p>
          <ul>
            <li v-for="bullet in job.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
        </div>
      </article>
    </div>
    <div class="earlier-experience">
      <h3>Earlier experience</h3>
      <article v-for="job in earlierExperience" :key="job.company" class="earlier-entry">
        <div class="role-heading">
          <h4>
            {{ job.role }} <span>at {{ job.company }}</span>
          </h4>
          <p class="dates">{{ job.dates }}</p>
        </div>
        <p>{{ job.description }}</p>
      </article>
    </div>
  </section>
  <section id="skills" class="skills-section" tabindex="-1" aria-labelledby="skills-heading">
    <div class="page-width section-block">
      <div class="section-heading">
        <h2 id="skills-heading">Technical skills</h2>
        <p>A frontend focus. Experience across the stack.</p>
      </div>
      <div class="skills-grid">
        <div v-for="group in skills" :key="group.name" class="skill-group">
          <h3>{{ group.name }}</h3>
          <ul>
            <li v-for="skill in group.items" :key="skill">{{ skill }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
