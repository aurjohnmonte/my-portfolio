<template>
  <div class="project-page" :class="{ 'project-page--maximized': isMaximized }">
    <div class="project-modal" :class="{ 'project-modal--maximized': isMaximized }">
      <div class="project-header"
           @mousedown="startDrag"
           @touchstart="startDragTouch">
        <div class="project-title">School Real-time Queueing System</div>
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
              <button class="nav-cta nav-cta--solid" @click="goToLive()">Open live system</button>
            </div>
          </nav>

          <!-- ============ MAIN CONTENT ============ -->
          <div class="content">

            <!-- OVERVIEW -->
            <section class="content-section" data-section="overview">
              <div class="hero">
                <div class="hero-icon">
                  <img src="../images/line.png" alt="Project icon" class="project-icon" />
                </div>
                <div class="hero-copy">
                  <h1>School Real-time Queueing System</h1>
                  <div class="hero-tags">
                    <span class="pill">Web application</span>
                    <span class="pill">Cloud deployed</span>
                    <span class="pill pill--live">
                      <span class="pill-dot"></span>
                      Live
                    </span>
                  </div>
                </div>
              </div>

              <!-- signature element: the live number display this system replaces -->
              <div class="ticket-panel">
                <div class="ticket-cell ticket-cell--serving">
                  <span class="ticket-label">Now serving</span>
                  <span class="ticket-number">042</span>
                </div>
                <div class="ticket-divider"></div>
                <div class="ticket-cell ticket-cell--next">
                  <span class="ticket-label">Up next</span>
                  <span class="ticket-number ticket-number--next">043</span>
                </div>
                <div class="ticket-live">
                  <span class="ticket-live-dot"></span>
                  Broadcast live
                </div>
              </div>
              <p class="ticket-caption">Every call updates every screen instantly, over Laravel Reverb and Echo — no refresh needed.</p>
            </section>

            <!-- PROBLEM -->
            <section class="content-section" data-section="problem">
              <div class="section-label"><span class="label-bar"></span>The problem it solves</div>
              <p class="section-text">
                Students in school offices like the IT/Engineering department and Registrar office often deal with disorganized and chaotic lines: people cutting in, no clear order of service, and long unpredictable waits. There was no fair, transparent way to manage who gets served next, leading to frustration and wasted time for both students and staff.
              </p>
            </section>

            <!-- SOLUTION -->
            <section class="content-section" data-section="solution">
              <div class="section-label"><span class="label-bar"></span>What the system does</div>
              <p class="section-text">
                The system gives each student a queue number on arrival, so they can wait without physically standing in line. A real-time display automatically updates the current number being served, so students always know exactly where they are in the queue. Cashiers and accounting staff call the next number from their dashboard, and the display updates instantly for everyone. An admin manages the overall queuing flow and monitors the system, eliminating line cutting and making the wait fair and transparent for all students.
              </p>
            </section>

            <!-- FEATURES -->
            <section class="content-section" data-section="features">
              <div class="section-label"><span class="label-bar"></span>Key features</div>
              <div class="feature-grid">

                <div class="feature-card">
                  <div class="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M5 5.5h9.5l4.5 4v9H5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M14.5 5.5V9.5H19" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M8.5 14h6M8.5 17h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                  </div>
                  <h3>Digital queue management</h3>
                  <p>Students receive a unique queue number on arrival, so there's no need to physically stand in line.</p>
                </div>

                <div class="feature-card">
                  <div class="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 5.5a9.2 9.2 0 0 0 0 13M18.5 5.5a9.2 9.2 0 0 1 0 13" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                  </div>
                  <h3>Real-time updates</h3>
                  <p>A live display, powered by Laravel Reverb and Echo, shows the current number being served the instant it changes.</p>
                </div>

                <div class="feature-card">
                  <div class="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M8 10h8M8 13.5h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                  </div>
                  <h3>Efficient service</h3>
                  <p>Cashiers and accounting staff call the next number straight from their dashboard, keeping service smooth and organized.</p>
                </div>

                <div class="feature-card">
                  <div class="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5 19 6.5v5c0 5-3 8.4-7 10-4-1.6-7-5-7-10v-5L12 3.5Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M9.3 12 11.2 14l3.5-4.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                  <h3>Admin oversight</h3>
                  <p>An admin panel monitors and manages the overall queuing flow, keeping the process fair and transparent.</p>
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

            <!-- DOCS -->
            <section class="content-section" data-section="docs">
              <div class="section-label"><span class="label-bar"></span>Documentation</div>
              <div class="docs-grid">
                <a class="doc-card" href="https://drive.google.com/file/d/1FJZnP7fwTJnjt75C8wcAGsNo11eFyWs_/view?usp=sharing/preview" target="_blank" style="display: none;">
                  <div class="doc-icon doc-icon-paper">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M7 3.5h7l4 4V19a1.2 1.2 0 0 1-1.2 1.2H7A1.2 1.2 0 0 1 5.8 19V4.7A1.2 1.2 0 0 1 7 3.5Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M14 3.5V8h4" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M8.5 12.5h7M8.5 15.5h7M8.5 18h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                  </div>
                  <div class="doc-copy">
                    <div class="doc-title">System paper documentation</div>
                    <p>The complete architecture, functional specs, and deployment notes.</p>
                  </div>
                  <span class="doc-action">Open</span>
                </a>

                <div class="doc-card doc-card-video" style="cursor: pointer;">
                  <div class="doc-icon doc-icon-video">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M8 6.5v11l9-5.5-9-5.5Z" fill="currentColor"/></svg>
                  </div>
                  <div class="doc-copy">
                    <div class="doc-title">System video documentation</div>
                    <p>A walkthrough of the live queueing system with feature highlights.</p>
                  </div>
                  <span class="doc-action">Watch</span>
                </div>
              </div>
            </section>

          </div>
        </div>

        <div class="action-row">
          <button class="secondary-button" @click="goToSource()">View source</button>
          <button class="primary-button" @click="goToLive()">Open live system</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'QueueingSystem',
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

      activeSection: 'overview',
      sections: [
        { id: 'overview', label: 'Overview' },
        { id: 'problem', label: 'Problem' },
        { id: 'solution', label: 'Solution' },
        { id: 'features', label: 'Features' },
        { id: 'stack', label: 'Tech stack' },
        { id: 'docs', label: 'Docs' },
      ],
      stack: [
        { label: 'Backend', items: ['PHP', 'Laravel', 'MySQL'] },
        { label: 'Real-time', items: ['Laravel Reverb', 'Laravel Echo'] },
        { label: 'Frontend', items: ['JavaScript', 'Vue.js'] },
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
    goToSource() {
      window.open('https://github.com/aurjohnmonte/queuing_system', '_blank')
    },
    goToLive() {
      window.open("https://survey-net.online", "_blank");
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
  --live: #46d18b;

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
  width: 100%;
  max-width: 100%;
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

.nav-cta--ghost {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text);
  border: 1px solid var(--hairline);
}

.nav-cta--ghost:hover { background: rgba(255, 255, 255, 0.09); }

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
  font-size: clamp(1.4rem, 2.1vw, 1.75rem);
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
  max-width: 40ch;
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
  color: var(--live);
  border-color: rgba(70, 209, 139, 0.3);
  background: rgba(70, 209, 139, 0.08);
}

.pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--live);
  box-shadow: 0 0 0 3px rgba(70, 209, 139, 0.18);
}

/* ticket panel — the one bold, subject-grounded moment */

.ticket-panel {
  margin: 22px 0 10px;
  padding: 22px 26px;
  border-radius: 18px;
  background: var(--panel);
  border: 1px solid var(--hairline);
  display: flex;
  align-items: center;
  gap: 22px;
  flex-wrap: wrap;
  position: relative;
}

.ticket-cell {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ticket-label {
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--text-faint);
}

.ticket-number {
  font-family: var(--font-display);
  font-variant-numeric: tabular-nums;
  font-size: 2.6rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: 0.02em;
  line-height: 1;
}

.ticket-number--next {
  font-size: 1.8rem;
  color: var(--text-muted);
}

.ticket-divider {
  width: 1px;
  align-self: stretch;
  background: var(--hairline);
}

.ticket-live {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-left: auto;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--live);
}

.ticket-live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--live);
  box-shadow: 0 0 0 3px rgba(70, 209, 139, 0.18);
  animation: ticket-pulse 1.8s ease-in-out infinite;
}

@keyframes ticket-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

@media (prefers-reduced-motion: reduce) {
  .ticket-live-dot { animation: none; }
}

.ticket-caption {
  margin: 12px 0 30px;
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

/* docs */

.docs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
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

.doc-icon-paper { background: linear-gradient(135deg, #8773ff, #6a58ef); }
.doc-icon-video { background: linear-gradient(135deg, #4f9dff, #3c6bff); }

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
}

.secondary-button {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text);
  border: 1px solid var(--hairline);
}

.secondary-button:hover { background: rgba(255, 255, 255, 0.1); }

.primary-button {
  background: var(--accent);
  color: #fff;
}

.primary-button:hover { transform: translateY(-1px); background: #6b5cff; }

.secondary-button:focus-visible,
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

  .feature-grid {
    grid-template-columns: 1fr;
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

  .ticket-panel {
    padding: 18px;
  }

  .ticket-live {
    margin-left: 0;
    width: 100%;
  }

  .action-row {
    flex-direction: column;
    align-items: stretch;
    padding: 14px 20px 18px;
  }

  .secondary-button,
  .primary-button {
    width: 100%;
  }

  .nav-footer {
    display: none;
  }
}
</style>