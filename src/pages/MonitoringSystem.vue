<template>
  <div class="project-page" :class="{ 'project-page--maximized': isMaximized }">
    <div class="project-modal" :class="{ 'project-modal--maximized': isMaximized }">
      <div class="project-header"
           @mousedown="startDrag"
           @touchstart="startDragTouch">
        <div class="project-title">Inventory Monitoring System</div>
        <div class="window-space">
          <img src="../images/maximize.png" alt="Close Icon" class="title-icon-img"
            style="cursor: pointer; margin-right: 20px; width: 20px; height: 20px;"
            @click="toggleMaximize">
          <img src="../images/remove.png" alt="Close Icon" class="title-icon-img"
            style="cursor: pointer; width: 20px; height: 20px;"
            @click="$emit('close')">
        </div>
      </div>
      <div class="project-body" :class="{ 'project-body--maximized': isMaximized }">
        <div class="project-card">
          <div class="project-icon-card">
            <img src="../images/csu.png" alt="Project icon" class="project-icon" />
          </div>
          <div>
            <h2>Inventory Monitoring System with QR-CODE Scan</h2>
            <p class="project-subtitle">Web Application · Cloud Deployed</p>
          </div>
        </div>

        <div class="status-row">
          <span class="status-dot"></span>
          <span class="status-text">Live</span>
        </div>

        <div class="section-block">
          <div class="section-label">PROBLEM IT SOLVES</div>
          <p class="section-text">
            CSU Main manages a large number of materials and equipment spread across multiple departments. Without a centralized system, tracking where each item is, who borrowed it, and whether it has been returned becomes difficult and unreliable. Items get lost, borrowing goes unrecorded, and staff have no clear visibility on the current status and location of university assets leading to mismanagement and accountability issues.
          </p>
        </div>

        <div class="section-block">
          <div class="section-label">WHAT IT DOES</div>
          <p class="section-text">
            The system assigns a unique QR code to every inventory item across all university departments. Scanning the QR code instantly shows the item's current location, status, and borrowing history. Borrowers can request materials and return them through the system, creating a clear and traceable record for every transaction. Department admins manage and monitor their own inventory, while the super admin has full visibility over all departments university-wide making it easy to see where every asset is, who has it, and its current condition at any given time.
          </p>
        </div>

                <div class="section-block">
          <div class="section-label">SYSTEM FEATURES</div>
          <p class="section-text">
            1. QR Code Tracking: Each inventory item is tagged with a unique QR code, allowing for instant access to its current location, status, and borrowing history through scanning.<br><br>
            2. Borrowing Management: Users can request to borrow materials and return them through the system, creating a clear and traceable record for every transaction.<br>
          </p>
        </div>

        <div class="section-block">
          <div class="section-label">TOOLS & TECHNOLOGIES</div>
          <div class="tag-list">
            <span class="tag">PHP</span>
            <span class="tag">Laravel</span>
            <span class="tag">JavaScript</span>
            <span class="tag">Vue.js</span>
            <span class="tag">MySQL</span>
          </div>
        </div>

        <div class="section-block">
          <div class="section-label">System Documentation</div>
          <div class="docs-grid">
            <a class="doc-card" href="https://drive.google.com/file/d/1FJZnP7fwTJnjt75C8wcAGsNo11eFyWs_/view?usp=sharing/preview" target="_blank"  style="display: none;">
              <div class="doc-icon doc-icon-paper">
                <span>PDF</span>
              </div>
              <div class="doc-copy">
                <div class="doc-title">System Paper Documentation</div>
                <p>Download the complete architecture, functional specs, and deployment notes.</p>
              </div>
              <span class="doc-action">Open</span>
            </a>

            <div class="doc-card doc-card-video" style="cursor: pointer;">
              <div class="doc-icon doc-icon-video">
                <span>▶</span>
              </div>
              <div class="doc-copy">
                <div class="doc-title">System Video Documentation</div>
                <p>Watch a walkthrough of the live e-commerce system with feature highlights.</p>
              </div>
              <span class="doc-action">Watch</span>
            </div>
          </div>
        </div>

        <div class="action-row">
          <button class="secondary-button" @click="goToSource()">View source</button>
          <button class="primary-button" @click="goToLive()">Open live system ↗</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ECommerce',
  data() {
    return {
      isDragging: false,
      hasMoved: false,
      startX: 0,       // add this
      startY: 0, 
      dragOffsetX: 0,
      dragOffsetY: 0,
      modalX: 0,
      modalY: 0,
      isDragged: false,
      isMaximized: window.innerWidth <= 768 ? true : false,
    }
  },
  methods: {
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
      // only start moving after 5px threshold
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
      window.open('https://github.com/aurjohnmonte/Inventory_Monitoring_QRCODE', '_blank')
    },
    goToLive() {
      window.open("http://188.245.55.188:8000", "_blank");
    }
  }
};
</script>

<style scoped>
.project-header {
  cursor: grab;
}

.project-header:active {
  cursor: grabbing;
}
/* Maximize states */
.project-page.project-page--maximized {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  align-items: flex-start;
  justify-content: flex-start;
  align-self: flex-start;
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

.project-body.project-body--maximized {
  max-height: calc(100vh - 57px);
  overflow-y: auto;
}

@media (max-width: 720px) {
  .project-page.project-page--maximized {
    padding: 0;
    margin-top: 0;
  }
  .project-body.project-body--maximized {
    max-height: calc(100vh - 57px);
  }
}

/* Pointer events fix */
.project-page {
  pointer-events: none;
}

.project-modal {
  pointer-events: all;
}

.project-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 24px;
  margin-top: 40px;
}

.project-modal {
  width: min(960px, 100%);
  max-height: 80vh;
  background: rgba(20, 14, 38, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  box-shadow: 0 42px 90px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.window-controls {
  display: flex;
  gap: 10px;
}

.window-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.window-dot.red { background: #ff6b6b; }
.window-dot.yellow { background: #f6c94d; }
.window-dot.green { background: #4cd97b; }

.project-title {
  flex: 1;
  text-align: center;
  color: #d9d2ff;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.window-space {
  width: 40px;
  display: flex;
  margin-right: 40px;
}

.project-body {
  overflow-y: auto;
  padding: 26px 28px 24px;
  padding-bottom: 0;
}

.project-body::-webkit-scrollbar {
  width: 10px;
}

.project-body::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 999px;
}

.project-body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.project-body {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.14) rgba(255, 255, 255, 0.04);
}

.project-card {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.project-icon-card {
  width: 72px;
  height: 72px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.08);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.project-icon {
  width: 44px;
  height: 44px;
}

.project-card h1 {
  margin: 0;
  font-size: clamp(1.6rem, 2.4vw, 2rem);
  color: #f6f1ff;
}

.project-subtitle {
  margin: 6px 0 0;
  color: rgba(255, 255, 255, 0.64);
  font-size: 0.95rem;
}

.status-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #3edc5f;
  box-shadow: 0 0 0 4px rgba(62, 220, 95, 0.12);
}

.status-text {
  color: #77f28e;
  font-weight: 600;
}

.section-block {
  margin-bottom: 26px;
}

.section-label {
  display: block;
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.44);
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.docs-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.doc-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  color: #f5f2ff;
  text-decoration: none;
}

.doc-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.14);
}

.doc-icon {
  width: 54px;
  height: 54px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
}

.doc-icon-paper {
  background: linear-gradient(135deg, rgba(135, 115, 255, 0.95), rgba(103, 80, 255, 0.8));
}

.doc-icon-video {
  background: linear-gradient(135deg, rgba(68, 156, 255, 0.95), rgba(67, 104, 255, 0.8));
}

.doc-copy {
  flex: 1;
}

.doc-title {
  margin: 0 0 6px;
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
}

.doc-copy p {
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.6;
  font-size: 0.92rem;
}

.doc-action {
  color: rgba(135, 115, 255, 0.95);
  font-weight: 700;
  font-size: 0.9rem;
}

.doc-card-video {
  background: rgba(255, 255, 255, 0.03);
}

.section-text {
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.9;
  font-size: 0.98rem;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 10px;
}

.tag {
  padding: 10px 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  color: #ece9ff;
  background: rgba(255, 255, 255, 0.04);
  font-size: 0.86rem;
}

.action-row {
  position: sticky;
  bottom: 0;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 20px;
  background: linear-gradient(180deg, rgba(20, 14, 38, 0.0), rgba(20, 14, 38, 0.98));
  backdrop-filter: blur(16px);
  z-index: 2;
}

.secondary-button,
.primary-button {
  border: none;
  border-radius: 14px;
  min-width: 160px;
  padding: 14px 22px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.secondary-button {
  background: rgba(255, 255, 255, 0.06);
  color: #f6f1ff;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.secondary-button:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.1);
}

.primary-button {
  background: #8773ff;
  color: #ffffff;
  box-shadow: 0 14px 28px rgba(135, 115, 255, 0.22);
}

.primary-button:hover {
  transform: translateY(-1px);
  background: #6f5eff;
}

@media (max-width: 720px) {
  .project-modal {
    max-height: 70vh;
    border-radius: 22px;
  }

  .project-body {
    padding: 20px 18px 20px;
    padding-bottom: 0;
  }

  .project-card {
    gap: 14px;
  }

  .project-icon-card {
    width: 64px;
    height: 64px;
  }

  .project-card h1 {
    font-size: 1.5rem;
  }

  .section-text {
    font-size: 0.95rem;
  }

  .action-row {
    flex-direction: column;
    align-items: stretch;
    bottom: 6vh;
  }

  .secondary-button,
  .primary-button {
    width: 100%;
  }

  .docs-grid {
    grid-template-columns: 1fr;
  }
}
</style>