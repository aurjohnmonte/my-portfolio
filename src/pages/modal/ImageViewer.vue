<template>
  <transition name="viewer-fade">
    <div v-if="true" class="image-viewer-backdrop" @click.self="close" @keydown.esc="close">
      <div class="image-viewer-container">

        <div class="viewer-toolbar">
          <div class="toolbar-actions">
            <button class="toolbar-btn" @click="zoomOut" title="Zoom out">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
            </button>
            <span class="zoom-label">{{ Math.round(scale * 100) }}%</span>
            <button class="toolbar-btn" @click="zoomIn" title="Zoom in">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
            </button>
            <div class="toolbar-divider"></div>
            <button class="toolbar-btn" @click="rotate" title="Rotate">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
            </button>
            <button class="toolbar-btn" @click="reset" title="Reset">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><polyline points="3 3 3 8 8 8"/>
              </svg>
            </button>
            <div class="toolbar-divider"></div>
            <a class="toolbar-btn" :href="image_src" :download="filename" title="Download">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </a>
          </div>
          <button class="toolbar-btn close-btn" @click="close" title="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div
          class="image-stage"
          ref="stageRef"
          @mousedown="startPan"
          @mousemove="onPan"
          @mouseup="stopPan"
          @mouseleave="stopPan"
          @touchstart="startPanTouch"
          @touchmove="onPanTouch"
          @touchend="stopPan"
          @wheel.prevent="onWheel"
        >
          <img
            v-if="!loadError"
            :src="image_src"
            class="viewer-image"
            :class="{ 'is-dragging': isPanning, 'is-loading': isLoading }"
            :style="imageStyle"
            @load="onLoad"
            @error="onError"
            draggable="false"
          />
          <div v-if="isLoading && !loadError" class="viewer-loader">
            <div class="loader-spinner"></div>
          </div>
          <div v-if="loadError" class="viewer-error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>Failed to load image</span>
            <span>{{ image_src }}</span>
          </div>
        </div>

        <div class="viewer-filename">{{ filename }}</div>

      </div>
    </div>
  </transition>
</template>

<script lang="ts">
export default {
  name: 'ImageViewer',
  props: {
    image_src: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['close'],
  data() {
    return {
      scale: 1,
      rotation: 0,
      translateX: 0,
      translateY: 0,
      isPanning: false,
      panStartX: 0,
      panStartY: 0,
      panOriginX: 0,
      panOriginY: 0,
      isLoading: true,
      loadError: false,
    }
  },
  computed: {
    filename(): string {
      return this.image_src?.split('/').pop() ?? 'image'
    },
    imageStyle() {
      return {
        transform: `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale}) rotate(${this.rotation}deg)`,
        cursor: this.isPanning ? 'grabbing' : 'grab',
        opacity: this.isLoading ? 0 : 1,
      }
    },
  },
  watch: {
    visible(val: boolean) {
      if (val) {
        this.reset()
        this.isLoading = true
        this.loadError = false
        document.addEventListener('keydown', this.onKeydown)
      } else {
        document.removeEventListener('keydown', this.onKeydown)
      }
    },
    image_src() {
      this.isLoading = true
      this.loadError = false
      this.reset()
    },
  },
  mounted() {
    if (this.visible) document.addEventListener('keydown', this.onKeydown)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.onKeydown)
  },
  methods: {
    close() {
      this.$emit('close')
    },
    onLoad() {
      this.isLoading = false
    },
    onError() {
      this.isLoading = false
      this.loadError = true
    },
    zoomIn() {
      this.scale = Math.min(this.scale + 0.25, 5)
    },
    zoomOut() {
      this.scale = Math.max(this.scale - 0.25, 0.25)
    },
    rotate() {
      this.rotation = (this.rotation + 90) % 360
    },
    reset() {
      this.scale = 1
      this.rotation = 0
      this.translateX = 0
      this.translateY = 0
    },
    onWheel(e: WheelEvent) {
      const delta = e.deltaY > 0 ? -0.15 : 0.15
      this.scale = Math.min(Math.max(this.scale + delta, 0.25), 5)
    },
    // Mouse pan
    startPan(e: MouseEvent) {
      this.isPanning = true
      this.panStartX = e.clientX
      this.panStartY = e.clientY
      this.panOriginX = this.translateX
      this.panOriginY = this.translateY
    },
    onPan(e: MouseEvent) {
      if (!this.isPanning) return
      this.translateX = this.panOriginX + (e.clientX - this.panStartX)
      this.translateY = this.panOriginY + (e.clientY - this.panStartY)
    },
    stopPan() {
      this.isPanning = false
    },
    // Touch pan
    startPanTouch(e: TouchEvent) {
      const t = e.touches[0]
      if (!t) return
      this.isPanning = true
      this.panStartX = t.clientX
      this.panStartY = t.clientY
      this.panOriginX = this.translateX
      this.panOriginY = this.translateY
    },
    onPanTouch(e: TouchEvent) {
      if (!this.isPanning) return
      const t = e.touches[0]
      if (!t) return
      this.translateX = this.panOriginX + (t.clientX - this.panStartX)
      this.translateY = this.panOriginY + (t.clientY - this.panStartY)
    },
    // Keyboard
    onKeydown(e: KeyboardEvent) {
      if (!this.visible) return
      switch (e.key) {
        case 'Escape': this.close(); break
        case '+': case '=': this.zoomIn(); break
        case '-': this.zoomOut(); break
        case 'r': case 'R': this.rotate(); break
        case '0': this.reset(); break
      }
    },
  },
}
</script>

<style scoped>
.image-viewer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 99999999;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-viewer-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Toolbar */
.viewer-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: rgba(20, 14, 36, 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(8px);
  z-index: 2;
  flex-shrink: 0;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toolbar-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  text-decoration: none;
}

.toolbar-btn svg {
  width: 18px;
  height: 18px;
}

.toolbar-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.close-btn:hover {
  background: rgba(255, 80, 80, 0.18);
  color: #ff6b6b;
}

.zoom-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  min-width: 42px;
  text-align: center;
  font-variant-numeric: tabular-nums;
}

.toolbar-divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 6px;
}

/* Stage */
.image-stage {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.viewer-image {
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
  transition: transform 0.12s ease, opacity 0.2s ease;
  user-select: none;
  -webkit-user-drag: none;
}

.viewer-image.is-dragging {
  transition: opacity 0.2s ease;
}

/* Loader */
.viewer-loader {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-spinner {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: rgba(163, 86, 255, 0.9);
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Error */
.viewer-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.4);
}

.viewer-error svg {
  width: 48px;
  height: 48px;
}

.viewer-error span {
  font-size: 0.9rem;
}

/* Filename bar */
.viewer-filename {
  text-align: center;
  padding: 10px 16px;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.35);
  background: rgba(20, 14, 36, 0.85);
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  letter-spacing: 0.04em;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Transition */
.viewer-fade-enter-active { transition: opacity 0.2s ease; }
.viewer-fade-leave-active { transition: opacity 0.15s ease; }
.viewer-fade-enter-from,
.viewer-fade-leave-to { opacity: 0; }
</style>