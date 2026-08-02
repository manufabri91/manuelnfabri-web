# React-to-Vue3 Portfolio Port Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the React single-page portfolio site (`main` branch) onto the Vue 3 scaffold on `feat/migrate-to-vue3`, replacing the default `create-vue` placeholders entirely.

**Architecture:** One `App.vue` renders a fixed Bulma navbar plus four section components (`LandingSection`, `AboutSection`, `ResumeSection`, `ContactSection`) stacked in a single scrolling page. Anchor links + `scroll-behavior: smooth` replace `react-scroll`. A small local util replaces `date-fns`. Font Awesome stays a CDN kit script, matching the React version exactly.

**Tech Stack:** Vue 3 (`<script setup lang="ts">`), Vite, Vitest, Bulma via CDN import (already in `src/assets/base.css`).

## Global Constraints

- No new runtime dependencies (no `date-fns`, no `@fortawesome/vue-fontawesome`, no scroll library). Per spec: [[2026-08-02-vue3-portfolio-port-design]].
- `pinia` and `vue-router` are removed from `package.json` — nothing uses them once the scaffold is stripped down to a single page.
- Do not add GA/GTM tracking scripts or `manifest.json`/PWA icons — explicitly out of scope.
- Do not add scroll-spy active-nav-item highlighting — explicitly out of scope.
- Preserve the two pre-existing uncommitted changes already on this branch: `package.json` version `2.0.0`, and the Bulma CDN `@import` at the top of `src/assets/base.css`.
- No new automated tests beyond: one unit test for the date util (real logic, worth testing) and fixing the existing Playwright smoke test so it matches the new page (it currently asserts on content we're deleting).

---

### Task 1: `getYearsSince` utility

**Files:**
- Create: `src/utils/date.ts`
- Test: `src/utils/__tests__/date.spec.ts`

**Interfaces:**
- Produces: `getYearsSince(date: Date): number` — full elapsed years between `date` and now, not counting the current year until the month/day of `date` has passed this year. Consumed by Task 2 (`LandingSection.vue`).

- [ ] **Step 1: Write the failing test**

```ts
// src/utils/__tests__/date.spec.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getYearsSince } from '../date'

describe('getYearsSince', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 7, 2)) // 2026-08-02
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the full number of elapsed years once the anniversary month has passed', () => {
    expect(getYearsSince(new Date(2014, 8, 1))).toBe(11)
    expect(getYearsSince(new Date(2018, 8, 1))).toBe(7)
  })

  it('does not count the current year until the anniversary month/day arrives', () => {
    expect(getYearsSince(new Date(2020, 8, 1))).toBe(5)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- date.spec.ts`
Expected: FAIL — `Failed to resolve import "../date"` (file doesn't exist yet).

- [ ] **Step 3: Write minimal implementation**

```ts
// src/utils/date.ts
export function getYearsSince(date: Date): number {
  const now = new Date()
  let years = now.getFullYear() - date.getFullYear()
  const monthDiff = now.getMonth() - date.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < date.getDate())) {
    years--
  }
  return years
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:unit -- date.spec.ts`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/utils/date.ts src/utils/__tests__/date.spec.ts
git commit -m "feat: add getYearsSince util to replace date-fns"
```

---

### Task 2: `LandingSection.vue`

**Files:**
- Create: `src/components/LandingSection.vue`
- Create (binary copy): `src/assets/hero-image.svg`

**Interfaces:**
- Consumes: `getYearsSince(date: Date): number` from `src/utils/date.ts` (Task 1).
- Produces: `LandingSection` component (default export via SFC), no props. Consumed by Task 6 (`App.vue`).

- [ ] **Step 1: Copy the hero background asset from `main`**

```bash
git show main:src/assets/hero-image.svg > src/assets/hero-image.svg
```

- [ ] **Step 2: Create the component**

```vue
<!-- src/components/LandingSection.vue -->
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
  color: hsl(var(--bulma-primary-h), var(--bulma-primary-s), var(--bulma-primary-dark-l));
}
.arrow:hover {
  color: white;
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
```

`.arrow`'s color uses Bulma 1.0.4's own CSS custom properties (`--bulma-primary-h/s/primary-dark-l`) to reproduce the exact shade the React version got from compiling `$primary-dark` — verified present in the CDN build at `https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css`.

- [ ] **Step 3: Verify it compiles**

Run: `npm run type-check`
Expected: no new errors (component isn't imported anywhere yet, so this just checks the file itself parses).

- [ ] **Step 4: Commit**

```bash
git add src/components/LandingSection.vue src/assets/hero-image.svg
git commit -m "feat: port Landing hero section to Vue"
```

---

### Task 3: `AboutSection.vue`

**Files:**
- Create: `src/components/AboutSection.vue`
- Create (binary copy): `src/assets/avatar.png`

**Interfaces:**
- Produces: `AboutSection` component, no props. Consumed by Task 6 (`App.vue`).

- [ ] **Step 1: Copy the avatar asset from `main`**

```bash
git show main:src/assets/avatar.png > src/assets/avatar.png
```

- [ ] **Step 2: Create the component**

```vue
<!-- src/components/AboutSection.vue -->
<script setup lang="ts">
function openCv() {
  window.open('https://1drv.ms/b/s!AvdnWuTtGeQZo6E-EBlKrm0ALhF5oA?e=GcHhNN')
}
</script>

<template>
  <section id="about" class="section is-medium has-background-dark">
    <div class="container is-flex content is-justify-content-center">
      <article class="media">
        <figure class="image is-128x128">
          <img class="is-rounded" src="@/assets/avatar.png" alt="avatar" />
        </figure>
        <div class="content has-text-grey-light">
          <h3 class="title has-text-primary-dark">About Me</h3>
          <p class="mb-1">
            I'm naturally curious, excited for challenges, with a good eye for details, and
            always working on improving my skills and learning about new technologies or tools.
          </p>
          <p class="mb-1">
            Since 2018 I enjoy being a full stack developer. Right now I'm working full-time with
            React and Python, but in the past I worked several years with Angular and .Net. Also,
            in my free time, I enjoy doing some side cross-device projects using React, Flutter
            and Spring Boot.
          </p>
          <p>
            In the beginning of my professional journey back in 2014 and until 2018, I've played
            different roles from QA automation developer to support and business analyst which I
            consider that gave me another point of view and helps me to be successful as a
            software developer.
          </p>
          <h3 class="title has-text-primary-dark">Contact Details</h3>
          <div class="columns">
            <div class="column is-one-third">
              <p class="mb-2">Manuel Fabri</p>
              <p class="mb-2">Madrid</p>
              <p class="mb-2">Madrid, Spain</p>
              <p class="mb-2">+34 608 77 05 29</p>
              <p>
                <a href="mailto:manuelnfabri@gmail.com"><strong>manuelnfabri@gmail.com</strong></a>
              </p>
            </div>
            <div class="column">
              <button class="button is-primary" @click="openCv">
                <span class="icon"><i class="fa fa-download"></i></span>
                <span>Download CV</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
article.media {
  flex-wrap: wrap;
  justify-content: center;
}
@media screen and (min-width: 768px) {
  article.media {
    justify-content: initial;
    flex-wrap: initial;
  }
}
</style>
```

(The React version had a stray empty `<div></div>` after `</article>` — dropped, it rendered nothing.)

- [ ] **Step 3: Verify it compiles**

Run: `npm run type-check`
Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/AboutSection.vue src/assets/avatar.png
git commit -m "feat: port About section to Vue"
```

---

### Task 4: `ResumeSection.vue`

**Files:**
- Create: `src/components/ResumeSection.vue`

**Interfaces:**
- Produces: `ResumeSection` component, no props. Consumed by Task 6 (`App.vue`). Static content, no other dependencies.

- [ ] **Step 1: Create the component**

```vue
<!-- src/components/ResumeSection.vue -->
<template>
  <section id="resume" class="section is-medium">
    <div class="content container block">
      <div class="columns mb-6">
        <div class="column is-one-third">
          <h3 class="title has-text-primary-dark has-text-left">SKILLS</h3>
        </div>
        <div class="column is-two-third">
          <div class="block">
            <h4>React</h4>
            <progress class="progress" value="95" max="100">95%</progress>
          </div>
          <div class="block">
            <h4>Angular</h4>
            <progress class="progress" value="90" max="100">90%</progress>
          </div>
          <div class="block">
            <h4>Spring Boot</h4>
            <progress class="progress" value="60" max="100">60%</progress>
          </div>
          <div class="block">
            <h4>Java</h4>
            <progress class="progress" value="65" max="100">65%</progress>
          </div>
          <div class="block">
            <h4>C#</h4>
            <progress class="progress" value="65" max="100">65%</progress>
          </div>
          <div class="block">
            <h4>SQL</h4>
            <progress class="progress" value="60" max="100">60%</progress>
          </div>
          <div class="block">
            <h4>JavaScript</h4>
            <progress class="progress" value="95" max="100">95%</progress>
          </div>
          <div class="block">
            <h4>TypeScript</h4>
            <progress class="progress" value="95" max="100">95%</progress>
          </div>
          <div class="block">
            <h4>GIT</h4>
            <progress class="progress" value="95" max="100">95%</progress>
          </div>
          <div class="block">
            <h4>Agile Methodologies</h4>
            <progress class="progress" value="80" max="100">80%</progress>
          </div>
        </div>
      </div>
      <div class="columns pt-6">
        <div class="column is-one-third">
          <h3 class="title has-text-primary-dark has-text-left">EXPERIENCE</h3>
        </div>
        <div class="column is-two-third">
          <div class="block">
            <h4>Fullstack Developer @ eDreams ODIGEO</h4>
            <h6>2024 - present</h6>
            <ul>
              <li>
                Developed and maintained React modules in the Prime area, using Typescript with
                styled components that meets top tier quality standards.
              </li>
              <li>
                Pushed several codebase and architecture improvements that made our team stand
                out and become recognized by other teams in the company.
              </li>
            </ul>
          </div>
          <div class="block">
            <h4>Fullstack Developer @ Talan</h4>
            <h6>2022 - 2024</h6>
            <ul>
              <li>Worked for industry leading Oil&amp;Gas and Media clients.</li>
              <li>
                Developed React and Angular components that meets accessibility and web browser
                standards.
              </li>
              <li>
                Implemented best practices cross-teams to get the codebase more maintainable.
              </li>
              <li>
                Contributed with the application architecture planning for the client.
              </li>
              <li>Contributed on the UX design of several projects.</li>
              <li>
                Councelled junior teammates on the next steps on their careers, giving continous
                feedback on them.
              </li>
            </ul>
          </div>
          <div class="block">
            <h4>Frontend Developer @ Mercado Libre</h4>
            <h6>2021 - 2022</h6>
            <ul>
              <li>
                Developed React components that meets accessibility and web browser standards.
              </li>
              <li>
                Generated several informative dashboards with metrics and logs in order to know
                how our apps were running.
              </li>
              <li>Created a React component library using Lerna and Storybook.</li>
              <li>
                Developed middleware endpoints using NodeJS in order to deliver user stories on
                time.
              </li>
              <li>
                Extensively used Git for version controlling and regularly pushed the code to
                GitHub.
              </li>
              <li>Interacted with several teams across the company ecosystem</li>
            </ul>
          </div>
          <div class="block">
            <h4>Fullstack Developer @ Grupo San Cristobal</h4>
            <h6>2020 - 2021</h6>
            <ul>
              <li>
                Designed and developed HTML5, SCSS, TypeScript, and Angular app that meets
                accessibility and web browser standards.
              </li>
              <li>
                Used Object Oriented Programming concepts to develop the UI components that could
                be reused across the Web Application.
              </li>
              <li>
                Developed several RESTful API endpoints using .NetCore in order to deliver user
                stories on time.
              </li>
              <li>
                Extensively used Git for version controlling and regularly pushed the code to
                GitHub.
              </li>
              <li>
                Interacted with Testing Team, Product Owner and Business Analysts for fixing of
                Issues.
              </li>
              <li>
                Reached and maintained around 90% code coverage on our repos to ensure code
                quality.
              </li>
              <li>
                Provided leadership and subject matter expert on Agile topics among the team and
                helped on facilitating ceremonies.
              </li>
              <li>Provided support for migration among Angular versions for teams among the company.</li>
            </ul>
          </div>
          <div class="block">
            <h4>Fullstack Developer @ Accenture</h4>
            <h6>2018 - 2020</h6>
            <ul>
              <li>
                Successfully migrated a module of a huge monolithic accountancy system into an
                Angular web app backed by Microservices architecture (with .Net Core).
              </li>
              <li>
                Designed and developed HTML5, SCSS, TypeScript, and Angular app that meets
                accessibility and web browser standards.
              </li>
              <li>
                Used Object Oriented Programming concepts to develop the UI components that could
                be reused across the Web Application.
              </li>
              <li>
                Extensively used Git for version controlling and regularly pushed the code to
                GitHub.
              </li>
              <li>
                Interacted with Testing Team, Scrum Masters and Business Analysts for fixing of
                Issues.
              </li>
              <li>
                Worked with UX team to help them do research and do the discoveries, giving them
                an early heads up on what could be feasible and what not.
              </li>
              <li>Mentored and coached new joiners on the team</li>
            </ul>
          </div>
          <div class="block">
            <h4>Business Analyst and L3 Support (for Pfizer) @ Acccenture</h4>
            <h6>2018 - 2016</h6>
            <ul>
              <li>
                Worked in Kronos implementations and configuration on several sites around the
                world.
              </li>
              <li>
                Performed the impact analysis and change management, report it to the client
                managers and implementation of changes according to the request of the Payroll
                groups.
              </li>
              <li>
                Certified as a Pharmaceutical Industry Generalist, and acquired basic skills on
                SQL, VB and C#.
              </li>
            </ul>
          </div>
          <div class="block">
            <h4>QA Automation Engineer @ Acccenture</h4>
            <h6>2014 - 2016</h6>
            <ul>
              <li>
                Developed and configured automated regression tests using HP UFT, ALM, VBS and
                Excel Macros
              </li>
              <li>Mentored and coached new joiners on the team.</li>
              <li>
                When needed, I was in charge of planning and coordination of tasks among the
                team.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run type-check`
Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ResumeSection.vue
git commit -m "feat: port Resume section to Vue"
```

---

### Task 5: `ContactSection.vue`

**Files:**
- Create: `src/components/ContactSection.vue`

**Interfaces:**
- Produces: `ContactSection` component, no props. Consumed by Task 6 (`App.vue`).

- [ ] **Step 1: Create the component**

```vue
<!-- src/components/ContactSection.vue -->
<template>
  <section id="contact" class="section is-medium has-background-black has-text-centered">
    <h1 class="title has-text-primary-dark">CONTACT</h1>
    <div class="content container has-text-grey-light">
      <div class="block">
        <p>
          Do you think I could be a great candidate for your company or we can start a project
          together? Feel free to reach me!
        </p>
      </div>
      <div class="block">
        <span class="icon"><i class="fa fa-envelope"></i></span>
        <a href="mailto:manuelnfabri@gmail.com"><strong>manuelnfabri@gmail.com</strong></a>
      </div>
      <div class="block">
        <span class="icon"><i class="fab fa-linkedin"></i></span>
        <a href="https://www.linkedin.com/in/manuelnfabri/" target="_blank" rel="noopener noreferrer">
          <strong>linkedin.com/in/manuelnfabri/</strong>
        </a>
      </div>
    </div>
  </section>
</template>
```

(Dropped the `is-linkedin` class from the original — no CSS rule anywhere in the React source ever defined it, so it had no visual effect.)

- [ ] **Step 2: Verify it compiles**

Run: `npm run type-check`
Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ContactSection.vue
git commit -m "feat: port Contact section to Vue"
```

---

### Task 6: `App.vue`, `main.ts`, and removing the scaffold

**Files:**
- Modify: `src/App.vue` (full rewrite)
- Modify: `src/main.ts`
- Modify: `package.json` (remove `pinia`, `vue-router` from `dependencies`)
- Create (binary copy): `src/assets/logo.png`
- Delete: `src/components/HelloWorld.vue`
- Delete: `src/components/TheWelcome.vue`
- Delete: `src/components/WelcomeItem.vue`
- Delete: `src/components/icons/IconCommunity.vue`
- Delete: `src/components/icons/IconDocumentation.vue`
- Delete: `src/components/icons/IconEcosystem.vue`
- Delete: `src/components/icons/IconSupport.vue`
- Delete: `src/components/icons/IconTooling.vue`
- Delete: `src/components/__tests__/HelloWorld.spec.ts`
- Delete: `src/stores/counter.ts`
- Delete: `src/views/HomeView.vue`
- Delete: `src/views/AboutView.vue`
- Delete: `src/router/index.ts`

**Interfaces:**
- Consumes: `LandingSection`, `AboutSection`, `ResumeSection`, `ContactSection` (Tasks 2–5).
- Produces: the app's root layout — nothing downstream depends on `App.vue`'s internals beyond it mounting at `#app` (already wired by `main.ts`/`index.html`, untouched here).

- [ ] **Step 1: Copy the navbar logo asset from `main`**

```bash
git show main:src/logo.png > src/assets/logo.png
```

- [ ] **Step 2: Delete the scaffold files**

```bash
git rm src/components/HelloWorld.vue
git rm src/components/TheWelcome.vue
git rm src/components/WelcomeItem.vue
git rm -r src/components/icons
git rm src/components/__tests__/HelloWorld.spec.ts
git rm -r src/stores
git rm -r src/views
git rm -r src/router
```

- [ ] **Step 3: Rewrite `App.vue`**

```vue
<!-- src/App.vue -->
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
```

- [ ] **Step 4: Rewrite `main.ts`**

```ts
// src/main.ts
import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'

createApp(App).mount('#app')
```

- [ ] **Step 5: Remove unused dependencies from `package.json`**

In the `"dependencies"` block, delete the `"pinia"` and `"vue-router"` lines, leaving:

```json
  "dependencies": {
    "vue": "^3.5.40"
  },
```

- [ ] **Step 6: Verify the app boots and type-checks**

Run: `npm run type-check`
Expected: no errors (confirms no remaining imports reference the deleted router/store/scaffold files).

Run: `npm run dev` (manually check in a browser, then stop the server)
Expected: navbar + 4 sections render, burger menu toggles `is-active` at narrow widths, hero shows computed years, LinkedIn/GitHub buttons open in new tabs, "Download CV" opens the OneDrive link, all anchor links scroll to their section.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: assemble portfolio App.vue, drop router/pinia scaffold"
```

---

### Task 7: Global styles — smooth scroll and link color

**Files:**
- Modify: `src/assets/base.css`
- Modify: `src/assets/main.css`

**Interfaces:**
- None — pure CSS, no consumers to track.

- [ ] **Step 1: Add smooth scrolling and the link-color override to `base.css`**

Add this block right after the existing `@import 'https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css';` line (keep that import as-is — it's the pre-existing uncommitted change):

```css
html {
  scroll-behavior: smooth;
}

:root {
  --bulma-link-h: var(--bulma-primary-h);
  --bulma-link-s: var(--bulma-primary-s);
  --bulma-link-l: var(--bulma-primary-l);
}
```

This reproduces the React version's `$link: $primary;` override (default Bulma links become the same turquoise as the primary color) using Bulma 1.0.4's CSS custom properties instead of a sass rebuild. (The React version also tweaked `$link-hover`; that fine-grained hover shade isn't reproduced — default Bulma hover darkening applies instead. Cosmetic only, not spec-required.)

- [ ] **Step 2: Trim `main.css` down to what a full-bleed single-page site needs**

Replace the whole file with:

```css
/* src/assets/main.css */
@import './base.css';

#app {
  min-height: 100vh;
}
```

(The scaffold's `#app { max-width: 1280px; margin: 0 auto; padding: 2rem; }`, the two-column `@media (min-width: 1024px)` grid layout, and the green `a`/`.green` link styling all assumed the default create-vue landing page layout — none of it applies to a full-width Bulma hero/section layout, so it's removed rather than fought against.)

- [ ] **Step 3: Manually verify in the browser**

Run: `npm run dev`
Expected: clicking a navbar link smooth-scrolls to the section (no instant jump); links elsewhere on the page (CV email, LinkedIn text link in Contact) render in the turquoise primary color, not Bulma's default blue.

- [ ] **Step 4: Commit**

```bash
git add src/assets/base.css src/assets/main.css
git commit -m "style: smooth scroll and primary-colored links for single-page layout"
```

---

### Task 8: `index.html` metadata and Font Awesome

**Files:**
- Modify: `index.html`

**Interfaces:**
- None.

- [ ] **Step 1: Update title, meta description, and add the Font Awesome kit script**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Manuel Fabri - Software Developer | Personal Site" />
    <title>Manuel Fabri - Software Developer</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.14.0/js/all.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Manually verify icons render**

Run: `npm run dev`
Expected: LinkedIn/GitHub icons in the hero, the down-chevron arrow, the download icon, and the envelope/LinkedIn icons in Contact all render as actual glyphs (not empty boxes/missing-icon squares).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: port page title, meta description, and Font Awesome kit to index.html"
```

---

### Task 9: Fix the Playwright smoke test and final verification

**Files:**
- Modify: `e2e/vue.spec.ts`

**Interfaces:**
- None.

- [ ] **Step 1: Update the smoke test to match the new page**

The existing test asserts on `HelloWorld`'s deleted `<h1>You did it!</h1>`. Replace it with an assertion against real, stable content from the new site:

```ts
// e2e/vue.spec.ts
import { test, expect } from '@playwright/test'

test('visits the app root url', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#home h3.title')).toHaveText('Hi, there!')
})
```

- [ ] **Step 2: Run the unit test suite**

Run: `npm run test:unit`
Expected: PASS (the `date.spec.ts` tests from Task 1; no other unit tests remain since `HelloWorld.spec.ts` was deleted in Task 6).

- [ ] **Step 3: Run type-check and lint**

Run: `npm run type-check`
Expected: no errors.

Run: `npm run lint`
Expected: no errors (auto-fixable issues get fixed in place; re-run and confirm clean).

- [ ] **Step 4: Run the Playwright e2e test**

Run: `npx playwright test`
Expected: PASS. (If Playwright browsers aren't installed yet, run `npx playwright install` first.)

- [ ] **Step 5: Run a production build**

Run: `npm run build`
Expected: succeeds, emits `dist/` with no errors.

- [ ] **Step 6: Commit**

```bash
git add e2e/vue.spec.ts
git commit -m "test: fix Playwright smoke test for the ported portfolio page"
```

---

## Self-Review Notes

- **Spec coverage:** navbar+burger (Task 6), 4 sections (Tasks 2–5), smooth scroll (Task 7), plain-JS years helper (Task 1), Font Awesome CDN (Task 8), asset copies (Tasks 2/3/6), scaffold removal + pinia/vue-router removal (Task 6), index.html title/meta (Task 8), HelloWorld.spec.ts removal (Task 6) + e2e fix (Task 9). GA/GTM, manifest/PWA icons, and scroll-spy are intentionally absent per spec's out-of-scope list.
- **Type consistency:** `getYearsSince(date: Date): number` signature is identical everywhere it's declared (Task 1) and consumed (Task 2).
- **No placeholders:** every step has literal file contents or exact commands; nothing deferred to "later."
