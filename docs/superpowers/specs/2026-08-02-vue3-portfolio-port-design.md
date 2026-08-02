# Port React portfolio site to Vue 3

## Context

`main` has the original React single-page portfolio (create-react-app + Bulma
via sass + react-scroll + date-fns + Font Awesome CDN kit). The
`feat/migrate-to-vue3` branch has a fresh, untouched `create-vue` scaffold
(Vue 3 + TS + Vue Router + Pinia + Vitest + Playwright), with Bulma already
wired in via CDN import in `src/assets/base.css` (uncommitted change already
present on the branch, along with a `package.json` version bump to `2.0.0`).

Goal: port the four-section one-page site (Landing → About → Resume →
Contact with a fixed navbar) onto the Vue 3 scaffold, replacing the scaffold
placeholders entirely.

## Scope

**In scope**
- Fixed navbar with logo, mobile burger toggle, and 3 anchor links
  (About / Resume / Contact) using native smooth scrolling.
- 4 section components: Landing (hero), About, Resume (skills + experience),
  Contact — content ported verbatim from the React version.
- Plain-JS "years since" helper replacing `date-fns`' `differenceInYears`.
- Font Awesome CDN kit script in `index.html` (same icon classes as React:
  `fa fa-linkedin`, `fa fa-github`, `fa fa-download`, `fa fa-envelope`,
  `fa fa-chevron-circle-down`).
- Asset copy: `avatar.png`, `hero-image.svg`, navbar `logo.png`.
- `index.html` `<title>` and meta description ported.
- Removal of scaffold leftovers: `HelloWorld.vue`, `TheWelcome.vue`,
  `components/icons/*`, `stores/counter.ts`, `views/HomeView.vue`,
  `views/AboutView.vue`, the `/about` route, and their test
  (`HelloWorld.spec.ts`).
- `pinia` and `vue-router` removed from `package.json` and `main.ts` since
  nothing uses them once the scaffold is stripped down to a single
  anchor-scrolling page.

**Out of scope (explicitly deferred, not silently dropped)**
- Google Analytics / Google Tag Manager scripts.
- `manifest.json` + `logo192.png`/`logo512.png` PWA icons.
- Scroll-spy active-nav-item highlighting (react-scroll's `spy` behavior).
- Any new automated tests beyond removing the now-irrelevant
  `HelloWorld.spec.ts`.

These can be revisited later as separate follow-ups if wanted.

## Component structure

```
src/
  App.vue                        -- navbar + renders the 4 sections
  components/
    LandingSection.vue           -- hero (id="home")
    AboutSection.vue             -- id="about"
    ResumeSection.vue            -- id="resume"
    ContactSection.vue           -- id="contact"
  utils/
    date.ts                      -- getYearsSince(date: Date): number
  assets/
    avatar.png
    hero-image.svg
    logo.png
    base.css                     -- unchanged (Bulma CDN import already present)
    main.css                     -- trimmed of scaffold-specific rules no longer relevant
```

Each section component owns its own scoped `<style>` block, translated from
the corresponding `.scss` partial (`Landing.scss` → styles in
`LandingSection.vue`, `About.scss` → styles in `AboutSection.vue`). No sass
dependency is added — Bulma is CDN-based on this branch, so there's no
`bulma/sass/...` variable overrides (`$primary`, `$link`, etc.) available;
colors that depended on those Bulma sass variables in the original
(`$primary-dark`, `$primary-light`) will be replaced with the closest Bulma
CSS custom property or a literal color match, since compiling Bulma from
source isn't part of this port.

## Behavior differences from React version (by design, per user decision)

- **Nav links** are plain `<a href="#about">` anchors; smooth scrolling comes
  from `scroll-behavior: smooth` on `html` in `base.css`, not a JS library.
  No active-link highlighting on scroll.
- **Mobile burger toggle**: a single `ref<boolean>` in `App.vue` toggles
  `is-active` on `.navbar-burger` and `.navbar-menu`, replacing React's
  `useState`.
- **Years-of-experience** text in the hero uses a local `getYearsSince`
  helper (handles month rollover the same way `differenceInYears` does)
  instead of a `date-fns` dependency.
- **Icons** stay as Font Awesome CDN classes (`<i class="fab fa-linkedin">`)
  via a kit `<script>` tag in `index.html`, matching the React version
  exactly — no `@fortawesome/vue-fontawesome` package added.

## Testing

- Remove `HelloWorld.spec.ts` (tests a component being deleted).
- No new automated tests added as part of this port — it's a like-for-like
  visual port of static/mostly-static content. Manual verification via
  `npm run dev` covers this (nav scroll, burger toggle on narrow viewport,
  hero year text, all 4 sections render).

## Risks / things to double check during implementation

- Bulma-via-CDN (no sass) means some color tokens the React version got from
  custom sass variables (`$primary-dark`, `$primary-light`) won't exist;
  need to pick concrete replacement values that look right against Bulma's
  default palette.
- The branch currently has two pre-existing uncommitted changes (bumping
  `package.json` version to `2.0.0`, adding the Bulma CDN import to
  `base.css`) — preserve both when editing those files rather than
  reverting them.
