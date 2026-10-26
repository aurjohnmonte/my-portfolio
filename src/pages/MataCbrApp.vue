<template>
  <div class="project-page" :class="{ 'project-page--maximized': isMaximized }">
    <div class="project-modal" :class="{ 'project-modal--maximized': isMaximized }">
      <div class="project-header"
           @mousedown="startDrag"
           @touchstart="startDragTouch">
        <div class="project-title">MataCBR Mobile App</div>
        <div class="window-space">
          <img src="../images/maximize.png" alt="Maximize" class="title-icon-img"
            style="cursor: pointer; margin-right: 20px; width: 20px; height: 20px;"
            @click="toggleMaximize">
          <img src="../images/remove.png" alt="Close" class="title-icon-img"
            style="cursor: pointer; width: 20px; height: 20px;"
            @click="$emit('close')">
        </div>
      </div>

      <div class="project-body" :class="{ 'project-body--maximized': isMaximized }" ref="body">
        <div class="layout">

          <!-- ============ SIDE NAVIGATION ============ -->
          <nav class="side-nav" aria-label="Section navigation">
            <ul class="nav-list">
              <li v-for="section in sections" :key="section.id">
                <button
                  type="button"
                  class="nav-link"
                  :class="{ 'nav-link--active': activeSection === section.id }"
                  @click="scrollToSection(section.id)"
                >
                  <span class="nav-dot" aria-hidden="true"></span>
                  {{ section.label }}
                </button>
              </li>
            </ul>

            <div class="nav-footer">
                <button class="nav-cta nav-cta--ghost" @click="goToSource()">View source</button>
              <button class="nav-cta nav-cta--solid" @click="goToApk()">Download APK</button>
            </div>
          </nav>

          <!-- ============ MAIN CONTENT ============ -->
          <div class="content">

            <!-- OVERVIEW -->
            <section class="content-section" data-section="overview">
              <div class="hero">
                <div class="hero-icon">
                  <img src="../images/matacbr/logo.png" alt="Project icon" class="project-icon" />
                </div>
                <div class="hero-copy">
                  <h1>MataCBR</h1>
                  <div class="hero-tags">
                    <span class="pill">Mobile app</span>
                    <span class="pill">Android</span>
                    <span class="pill pill--live">
                      <span class="pill-dot"></span>
                      Offline &amp; online
                    </span>
                  </div>
                </div>
              </div>

              <!-- signature element: the app's own privacy model, made visible -->
              <div class="visibility-strip">
                <div class="visibility-steps">
                  <div class="visibility-step">
                    <i class="dot dot--private"></i>
                    <div>
                      <div class="visibility-name">Private</div>
                      <div class="visibility-desc">Every photo starts here, visible only to you.</div>
                    </div>
                  </div>
                  <div class="visibility-step">
                    <i class="dot dot--signin"></i>
                    <div>
                      <div class="visibility-name">Signed in</div>
                      <div class="visibility-desc">Choose which photos to share.</div>
                    </div>
                  </div>
                  <div class="visibility-step">
                    <i class="dot dot--community"></i>
                    <div>
                      <div class="visibility-name">Cabadbaran</div>
                      <div class="visibility-desc">Shared photos reach fellow residents only.</div>
                    </div>
                  </div>
                </div>
                <p class="visibility-caption">Capture it, map it, and decide later if the community should see it.</p>
              </div>

              <div class="section-label"><span class="label-bar"></span>Screenshots</div>
              <div class="screenshots-container">
                <DisplaySystemPictures :system_name="'matacbr'" />
              </div>
            </section>

            <!-- PROBLEM -->
            <section class="content-section" data-section="problem">
              <div class="section-label"><span class="label-bar"></span>The problem it solves</div>
              <p class="section-text">
                Issues around the city that deserve attention are easy to notice and just as easy to forget. A photo sits in a phone gallery with no location attached, and there is no simple way for other residents to see what is going on in their own community. Connectivity is not always reliable either, so any tool that depends on a constant internet connection gets left behind.
              </p>
            </section>

            <!-- SOLUTION -->
            <section class="content-section" data-section="solution">
              <div class="section-label"><span class="label-bar"></span>What the app does</div>
              <p class="section-text">
                MataCBR lets residents of Cabadbaran capture a photo with the native camera and pin it on a map. Everything is saved on the device and private by default, and it works with or without internet. When a resident signs in, they can share chosen photos and browse what other residents have shared within Cabadbaran, raising awareness of the things that need to be noticed.
              </p>
            </section>

            <!-- FEATURES -->
            <section class="content-section" data-section="features">
              <div class="section-label"><span class="label-bar"></span>Key features</div>
              <div class="feature-grid">
                <div class="feature-card">
                  <div class="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.2-1.8c.28-.42.75-.7 1.26-.7h4.08c.51 0 .98.28 1.26.7L16.5 7h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-9Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.2" stroke="currentColor" stroke-width="1.4"/></svg>
                  </div>
                  <h3>Native camera capture</h3>
                  <p>Take photos right inside the app using the phone's own camera, so capturing something worth noticing takes a few taps.</p>
                </div>

                <div class="feature-card">
                  <div class="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.1 7-11.3A7 7 0 0 0 5 9.7C5 14.9 12 21 12 21Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="12" cy="9.5" r="2.2" stroke="currentColor" stroke-width="1.4"/></svg>
                  </div>
                  <h3>Map your photos</h3>
                  <p>Each capture is placed on a Mapbox map, so you and other residents can see exactly where something was found.</p>
                </div>

                <div class="feature-card">
                  <div class="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="6" rx="7" ry="2.8" stroke="currentColor" stroke-width="1.4"/><path d="M5 6v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8V6" stroke="currentColor" stroke-width="1.4"/><path d="M5 12v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-6" stroke="currentColor" stroke-width="1.4"/></svg>
                  </div>
                  <h3>Offline-first and private</h3>
                  <p>Captures are stored locally in an SQLite database, so the app works without a connection. Nothing leaves your phone unless you decide to share it.</p>
                </div>

                <div class="feature-card">
                  <div class="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8.5" r="3" stroke="currentColor" stroke-width="1.4"/><path d="M3.5 19c0-3 2.46-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="17" cy="9.5" r="2.3" stroke="currentColor" stroke-width="1.4"/><path d="M16.5 14.2c2.4.2 4 1.9 4 4.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                  </div>
                  <h3>Share with Cabadbaran</h3>
                  <p>After signing in, share your photos and view those shared by other residents. The community feed is limited to Cabadbaran, so it stays local and relevant.</p>
                </div>
              </div>
            </section>

            <!-- STACK -->
            <section class="content-section" data-section="stack">
              <div class="section-label"><span class="label-bar"></span>Tools &amp; technology</div>
              <div class="stack-groups">
                <div class="stack-group" v-for="group in stack" :key="group.label">
                  <div class="stack-group-label">{{ group.label }}</div>
                  <div class="tag-list">
                    <span class="tag" v-for="item in group.items" :key="item">{{ item }}</span>
                  </div>
                </div>
              </div>
            </section>

            <!-- DOWNLOAD -->
            <section class="content-section" data-section="download">
              <div class="section-label"><span class="label-bar"></span>Get the app</div>
              <div class="docs-grid docs-grid--single">
                <a class="doc-card" :href="apkUrl" target="_blank" rel="noopener">
                  <div class="doc-icon doc-icon-apk">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M12 4v10.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 19h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
                  </div>
                  <div class="doc-copy">
                    <div class="doc-title">MataCBR for Android (APK)</div>
                    <p>Download the installer from Google Drive. You may need to allow installs from unknown sources on your phone.</p>
                  </div>
                  <span class="doc-action">Download</span>
                </a>
              </div>
            </section>

          </div>
        </div>

        <div class="action-row">
            <button class="secondary-button" @click="goToSource()">View source</button>
          <button class="primary-button" @click="goToApk()">Download APK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import DisplaySystemPictures from './DisplaySystemPictures.vue';

export default {
  components: { DisplaySystemPictures },
  name: 'AiDriven',
  data() {
    return {
      isDragging: false,
      hasMoved: false,
      startX: 0,
      startY: 0,
      dragOffsetX: 0,
      dragOffsetY: 0,
      modalX: 0,
      modalY: 0,
      isDragged: false,
      isMaximized: window.innerWidth <= 768 ? true : false,

      apkUrl: 'https://drive.google.com/file/d/1lNKhnKjPyj1A35_XiKuWn5iW63hbn0ZM/view',

      activeSection: 'overview',
      sections: [
        { id: 'overview', label: 'Overview' },
        { id: 'problem', label: 'Problem' },
        { id: 'solution', label: 'Solution' },
        { id: 'features', label: 'Features' },
        { id: 'stack', label: 'Tech stack' },
        { id: 'download', label: 'Download' },
      ],
      stack: [
        { label: 'Mobile app', items: ['Flutter', 'Native camera'] },
        { label: 'On-device storage', items: ['SQLite (sqflite)'] },
        { label: 'Backend', items: ['ASP.NET Core Web API'] },
        { label: 'Cloud', items: ['Supabase Database', 'Supabase Storage'] },
        { label: 'Maps', items: ['Mapbox'] },
      ],
      observer: null as IntersectionObserver | null,
    }
  },
  mounted() {
    this.$nextTick(() => this.setupObserver());
  },
  beforeUnmount() {
    this.observer?.disconnect();
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.stopDrag);
    document.removeEventListener('touchmove', this.onDragTouch);
    document.removeEventListener('touchend', this.stopDrag);
  },
  methods: {
    goToSource() {
      window.open('https://github.com/aurjohnmonte/MataCBR-Mobile-App', '_blank')
    },
    setupObserver() {
      const root = this.$refs.body as HTMLElement;
      if (!root) return;
      const targets = root.querySelectorAll('.content-section');
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection = (entry.target as HTMLElement).dataset.section || this.activeSection;
          }
        });
      }, { root, rootMargin: '-10% 0px -72% 0px', threshold: 0 });
      targets.forEach((t) => this.observer!.observe(t));
    },
    scrollToSection(id: string) {
      const root = this.$refs.body as HTMLElement;
      const el = root?.querySelector(`[data-section="${id}"]`) as HTMLElement | null;
      if (!root || !el) return;
      const offset = el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 8;
      root.scrollTo({ top: offset, behavior: 'smooth' });
      this.activeSection = id;
    },
    toggleMaximize() {
      this.isMaximized = !this.isMaximized;
      this.$emit('maximize', this.isMaximized);
      this.isDragged = false;
      this.modalX = 0;
      this.modalY = 0;
      const modal = this.$el.querySelector('.project-modal') as HTMLElement;
      if (modal) {
        modal.style.transform = '';
        modal.style.left = '';
        modal.style.top = '';
      }
    },
    startDrag(e: MouseEvent) {
      if (this.isMaximized) return;
      this.isDragging = true;
      this.hasMoved = false;
      this.startX = e.clientX;
      this.startY = e.clientY;
      const modal = this.$el.querySelector('.project-modal') as HTMLElement;
      const rect = modal.getBoundingClientRect();
      this.dragOffsetX = e.clientX - rect.left;
      this.dragOffsetY = e.clientY - rect.top;
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.stopDrag);
    },

    startDragTouch(e: TouchEvent) {
      if (this.isMaximized) return;
      const touch = e.touches[0];
      if (!touch) return;
      this.isDragging = true;
      this.hasMoved = false;
      this.startX = touch.clientX;
      this.startY = touch.clientY;
      const modal = this.$el.querySelector('.project-modal') as HTMLElement;
      const rect = modal.getBoundingClientRect();
      this.dragOffsetX = touch.clientX - rect.left;
      this.dragOffsetY = touch.clientY - rect.top;
      document.addEventListener('touchmove', this.onDragTouch);
      document.addEventListener('touchend', this.stopDrag);
    },

    onDrag(e: MouseEvent) {
      if (!this.isDragging) return;
      const dx = e.clientX - this.startX;
      const dy = e.clientY - this.startY;
      if (!this.hasMoved && Math.sqrt(dx * dx + dy * dy) < 5) return;
      if (!this.hasMoved) {
        this.hasMoved = true;
        this.isDragged = true;
        const modal = this.$el.querySelector('.project-modal') as HTMLElement;
        const rect = modal.getBoundingClientRect();
        modal.style.position = 'fixed';
        modal.style.margin = '0';
        modal.style.left = rect.left + 'px';
        modal.style.top = rect.top + 'px';
      }
      const modal = this.$el.querySelector('.project-modal') as HTMLElement;
      modal.style.left = (e.clientX - this.dragOffsetX) + 'px';
      modal.style.top = (e.clientY - this.dragOffsetY) + 'px';
    },

    onDragTouch(e: TouchEvent) {
      if (!this.isDragging) return;
      const touch = e.touches[0];
      if (!touch) return;
      const dx = touch.clientX - this.startX;
      const dy = touch.clientY - this.startY;
      if (!this.hasMoved && Math.sqrt(dx * dx + dy * dy) < 5) return;
      if (!this.hasMoved) {
        this.hasMoved = true;
        this.isDragged = true;
        const modal = this.$el.querySelector('.project-modal') as HTMLElement;
        const rect = modal.getBoundingClientRect();
        modal.style.position = 'fixed';
        modal.style.margin = '0';
        modal.style.left = rect.left + 'px';
        modal.style.top = rect.top + 'px';
      }
      const modal = this.$el.querySelector('.project-modal') as HTMLElement;
      modal.style.left = (touch.clientX - this.dragOffsetX) + 'px';
      modal.style.top = (touch.clientY - this.dragOffsetY) + 'px';
    },

    stopDrag() {
      this.isDragging = false;
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('mouseup', this.stopDrag);
      document.removeEventListener('touchmove', this.onDragTouch);
      document.removeEventListener('touchend', this.stopDrag);
    },
    goToApk() {
      window.open(this.apkUrl, '_blank', 'noopener');
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap');

.project-page {
  --ink: #0e0b1a;
  --panel: #171129;
  --panel-raised: #1e1836;
  --hairline: rgba(255, 255, 255, 0.09);
  --text: #f2eeff;
  --text-muted: rgba(242, 238, 255, 0.62);
  --text-faint: rgba(242, 238, 255, 0.4);
  --accent: #7c6fff;
  --accent-soft: rgba(124, 111, 255, 0.14);
  --positive: #46d18b;
  --neutral: #f0b94d;
  --negative: #f2657c;

  --font-display: 'Sora', 'Segoe UI', sans-serif;
  --font-body: 'Inter', 'Segoe UI', sans-serif;

  font-family: var(--font-body);
  pointer-events: none;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  z-index: 1;
  padding: 20px;
}

.nav-cta--ghost {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text);
  border: 1px solid var(--hairline);
}

.nav-cta--ghost:hover { background: rgba(255, 255, 255, 0.09); }

.project-page.project-page--maximized {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  align-items: flex-start;
  justify-content: flex-start;
  align-self: flex-start;
}

/* ============ MODAL SHELL ============ */

.project-modal {
  pointer-events: all;
  width: min(1040px, 100%);
  max-height: 82vh;
  background: var(--ink);
  border: 1px solid var(--hairline);
  border-radius: 20px;
  box-shadow: 0 42px 90px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  animation: modal-in 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modal-in {
  from { opacity: 0; transform: translateY(10px) scale(0.99); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .project-modal { animation: none; }
}

.project-modal.project-modal--maximized {
  box-sizing: border-box;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;

  margin-top: 0;
  border-radius: 0;
  border: none;
  box-shadow: none;
}

.project-header {
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 22px;
  background: var(--panel);
  border-bottom: 1px solid var(--hairline);
}

.project-header:active {
  cursor: grabbing;
}

.project-title {
  flex: 1;
  color: var(--text);
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.window-space {
  display: flex;
  align-items: center;
}

/* ============ BODY / SCROLL CONTAINER ============ */

.project-body {
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.16) transparent;
}

.project-body::-webkit-scrollbar {
  width: 9px;
}

.project-body::-webkit-scrollbar-track {
  background: transparent;
}

.project-body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.16);
  border-radius: 999px;
}

.project-body.project-body--maximized {
  max-height: calc(100vh - 57px);
}

.layout {
  display: flex;
  align-items: flex-start;
  gap: 0;
}

/* ============ SIDE NAV ============ */

.side-nav {
  flex: 0 0 208px;
  width: 208px;
  position: sticky;
  top: 0;
  align-self: flex-start;
  padding: 28px 14px 24px 26px;
  border-right: 1px solid var(--hairline);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-link {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-family: var(--font-body);
  font-size: 0.88rem;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease, color 0.15s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text);
}

.nav-link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.nav-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--text-faint);
  flex-shrink: 0;
  transition: background 0.15s ease, transform 0.15s ease;
}

.nav-link--active {
  background: var(--accent-soft);
  color: var(--text);
}

.nav-link--active .nav-dot {
  background: var(--accent);
  transform: scale(1.4);
}

.nav-footer {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 4px;
  border-top: 1px solid var(--hairline);
}

.nav-cta {
  border: none;
  border-radius: 10px;
  padding: 10px 12px;
  font-family: var(--font-body);
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;
}

.nav-cta--solid {
  background: var(--accent);
  color: #fff;
}

.nav-cta--solid:hover { transform: translateY(-1px); background: #6b5cff; }

/* ============ CONTENT ============ */

.content {
  flex: 1;
  min-width: 0;
  padding: 28px 30px 4px 30px;
}

.content-section {
  padding-bottom: 40px;
}

.content-section + .content-section {
  margin-top: 6px;
  border-top: 1px solid var(--hairline);
  padding-top: 36px;
}

/* hero */

.hero {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
  margin-bottom: 22px;
}

.hero-icon {
  width: 68px;
  height: 68px;
  border-radius: 18px;
  background: var(--panel-raised);
  border: 1px solid var(--hairline);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.project-icon {
  width: 40px;
  height: 40px;
}

.hero-copy h1 {
  margin: 0 0 10px;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.2vw, 1.9rem);
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
}

.hero-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--hairline);
}

.pill--live {
  color: var(--positive);
  border-color: rgba(70, 209, 139, 0.3);
  background: rgba(70, 209, 139, 0.08);
}

.pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--positive);
  box-shadow: 0 0 0 3px rgba(70, 209, 139, 0.18);
}

/* visibility strip: the one bold, subject-grounded moment */

.visibility-strip {
  margin: 22px 0 30px;
  padding: 18px 20px;
  border-radius: 16px;
  background: var(--panel);
  border: 1px solid var(--hairline);
}

.visibility-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--hairline);
}

.visibility-step {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.visibility-step .dot {
  margin-top: 5px;
  flex-shrink: 0;
}

.visibility-name {
  font-family: var(--font-display);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 3px;
}

.visibility-desc {
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--text-muted);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.dot--private { background: var(--neutral); }
.dot--signin { background: var(--accent); }
.dot--community { background: var(--positive); }

.visibility-caption {
  margin: 0;
  font-size: 0.86rem;
  color: var(--text-faint);
}

/* section labels */

.section-label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  color: var(--text);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
}

.label-bar {
  width: 3px;
  height: 15px;
  border-radius: 2px;
  background: var(--accent);
  display: inline-block;
}

.section-text {
  margin: 0;
  max-width: 66ch;
  color: var(--text-muted);
  line-height: 1.75;
  font-size: 0.98rem;
}

/* screenshots */

.screenshots-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  background: var(--panel);
  border: 1px solid var(--hairline);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.screenshots-container :deep(.pictures-main-container) {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* keep mobile (portrait) screenshots framed in landscape: scale to fit,
   never crop or stretch — any blank space lands in the corners instead */
.screenshots-container :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

/* features */

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.feature-card {
  padding: 20px;
  border-radius: 16px;
  background: var(--panel);
  border: 1px solid var(--hairline);
}

.feature-icon {
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: var(--accent-soft);
  color: var(--accent);
  display: grid;
  place-items: center;
  margin-bottom: 14px;
}

.feature-icon svg {
  width: 20px;
  height: 20px;
}

.feature-card h3 {
  margin: 0 0 8px;
  font-family: var(--font-display);
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--text);
}

.feature-card p {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.65;
  color: var(--text-muted);
}

/* stack */

.stack-groups {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.stack-group-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-faint);
  margin-bottom: 10px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 7px 13px;
  border: 1px solid var(--hairline);
  border-radius: 8px;
  color: var(--text-muted);
  background: var(--panel);
  font-size: 0.83rem;
}

/* download */

.docs-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.docs-grid--single {
  grid-template-columns: minmax(0, 1fr);
}

.doc-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 18px;
  border-radius: 16px;
  background: var(--panel);
  border: 1px solid var(--hairline);
  transition: transform 0.15s ease, border-color 0.15s ease;
  color: var(--text);
  text-decoration: none;
}

.doc-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.18);
}

.doc-card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.doc-icon {
  width: 46px;
  height: 46px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  color: #fff;
}

.doc-icon svg { width: 22px; height: 22px; }

.doc-icon-apk { background: linear-gradient(135deg, #8773ff, #6a58ef); }

.doc-copy { flex: 1; min-width: 0; }

.doc-title {
  margin: 0 0 4px;
  font-weight: 600;
  font-size: 0.92rem;
  color: var(--text);
}

.doc-copy p {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.5;
  font-size: 0.85rem;
}

.doc-action {
  color: var(--accent);
  font-weight: 600;
  font-size: 0.85rem;
  flex-shrink: 0;
}

/* action row */

.action-row {
  position: sticky;
  bottom: 0;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  padding: 16px 30px 20px;
  background: linear-gradient(180deg, rgba(14, 11, 26, 0), rgba(14, 11, 26, 0.97) 30%);
  backdrop-filter: blur(14px);
  z-index: 2;
}

.secondary-button,
.primary-button {
  border: none;
  border-radius: 12px;
  min-width: 150px;
  padding: 12px 20px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;
  background: var(--accent);
  color: #fff;
}

.secondary-button {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text);
  border: 1px solid var(--hairline);
}

.primary-button:hover { transform: translateY(-1px); background: #6b5cff; }

.primary-button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* ============ RESPONSIVE ============ */

@media (max-width: 900px) {
  .layout {
    flex-direction: column;
  }

  .side-nav {
    position: sticky;
    top: 0;
    z-index: 3;
    width: 100%;
    flex: none;
    flex-direction: row;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    border-right: none;
    border-bottom: 1px solid var(--hairline);
    background: rgba(14, 11, 26, 0.96);
    backdrop-filter: blur(10px);
    overflow-x: auto;
  }

  .nav-list {
    flex-direction: row;
    gap: 4px;
    flex: 1;
  }

  .nav-link {
    white-space: nowrap;
    padding: 7px 12px;
  }

  .nav-footer {
    flex-direction: row;
    border-top: none;
    padding-top: 0;
    flex-shrink: 0;
  }

  .nav-cta { white-space: nowrap; }

  .content {
    padding: 22px 20px 4px;
  }

  .feature-grid,
  .docs-grid {
    grid-template-columns: 1fr;
  }

  .visibility-steps {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

@media (max-width: 720px) {
  .project-modal {
    max-height: 78vh;
    border-radius: 18px;
  }

  .project-body.project-body--maximized {
    max-height: calc(100vh - 57px);
  }

  .action-row {
    flex-direction: column;
    align-items: stretch;
    padding: 14px 20px 18px;
  }

  .primary-button {
    width: 100%;
  }

  .nav-footer {
    display: none;
  }
}
</style>