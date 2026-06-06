<template>
  <transition name="viewer-fade">
    <div v-if="visible" class="text-viewer-backdrop" @click.self="close">
      <div class="text-viewer-container">

        <div class="viewer-toolbar">
          <div class="toolbar-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toolbar-file-icon">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
            <span class="toolbar-filename">{{ filename }}</span>
          </div>
          <div class="toolbar-actions">
            <button class="toolbar-btn" @click="decreaseFontSize" title="Decrease font size">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
            <span class="zoom-label">{{ fontSize }}px</span>
            <button class="toolbar-btn" @click="increaseFontSize" title="Increase font size">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
            <div class="toolbar-divider"></div>
            <button class="toolbar-btn" :class="{ active: wordWrap }" @click="wordWrap = !wordWrap" title="Toggle word wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="17 10 21 14 17 18"/><path d="M3 6h18M3 12h14a4 4 0 0 1 0 8H3"/>
              </svg>
            </button>
            <div class="toolbar-divider"></div>
            <button class="toolbar-btn close-btn" @click="close" title="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="text-stage">
          <div v-if="isLoading" class="viewer-loader">
            <div class="loader-spinner"></div>
          </div>
          <div v-else-if="loadError" class="viewer-error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>Failed to load file</span>
          </div>
          <div v-else class="text-content-wrapper">
            <div class="line-numbers">
              <span v-for="n in lineCount" :key="n">{{ n }}</span>
            </div>
            <pre
              class="text-content"
              :style="{
                fontSize: fontSize + 'px',
                whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
                wordBreak: wordWrap ? 'break-word' : 'normal',
              }"
            >{{ content }}</pre>
          </div>
        </div>

        <div class="viewer-statusbar">
          <span>{{ lineCount }} lines</span>
          <span class="statusbar-divider">·</span>
          <span>{{ charCount }} characters</span>
          <span class="statusbar-divider">·</span>
          <span>Read only</span>
        </div>

      </div>
    </div>
  </transition>
</template>

<script lang="ts">
export default {
  name: 'TextViewer',
  props: {
    filename: {
      type: String,
      default: 'file.txt',
    },
    src: {
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
      content: '',
      isLoading: false,
      loadError: false,
      fontSize: 14,
      wordWrap: true,
    }
  },
  computed: {
    lineCount(): number {
      return this.content ? this.content.split('\n').length : 0
    },
    charCount(): number {
      return this.content ? this.content.length : 0
    },
  },
  watch: {
    visible(val: boolean) {
      if (val) {
        this.loadFile()
        document.addEventListener('keydown', this.onKeydown)
      } else {
        document.removeEventListener('keydown', this.onKeydown)
      }
    },
    src() {
      if (this.visible) this.loadFile()
    },
  },
  mounted() {
    if (this.visible) {
      this.loadFile()
      document.addEventListener('keydown', this.onKeydown)
    }
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.onKeydown)
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async loadFile() {
      this.content = this.src;
    },
    increaseFontSize() {
      this.fontSize = Math.min(this.fontSize + 2, 28)
    },
    decreaseFontSize() {
      this.fontSize = Math.max(this.fontSize - 2, 10)
    },
    onKeydown(e: KeyboardEvent) {
      if (!this.visible) return
      if (e.key === 'Escape') this.close()
    },
  },
}
</script>

<style scoped>
.text-viewer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-viewer-container {
  width: min(92vw, 900px);
  height: min(88vh, 700px);
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
  background: rgba(18, 12, 36, 0.98);
}

/* Toolbar */
.viewer-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  flex-shrink: 0;
  gap: 12px;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
}

.toolbar-file-icon {
  width: 16px;
  height: 16px;
  color: rgba(255, 255, 255, 0.4);
  flex-shrink: 0;
}

.toolbar-filename {
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.65);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.toolbar-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 7px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.toolbar-btn svg {
  width: 16px;
  height: 16px;
}

.toolbar-btn:hover {
  background: rgba(255, 255, 255, 0.09);
  color: #fff;
}

.toolbar-btn.active {
  background: rgba(163, 86, 255, 0.18);
  color: #c49dff;
}

.close-btn:hover {
  background: rgba(255, 80, 80, 0.16);
  color: #ff6b6b;
}

.zoom-label {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.45);
  min-width: 36px;
  text-align: center;
  font-variant-numeric: tabular-nums;
}

.toolbar-divider {
  width: 1px;
  height: 18px;
  background: rgba(255, 255, 255, 0.09);
  margin: 0 4px;
}

/* Stage */
.text-stage {
  flex: 1;
  overflow: hidden;
  display: flex;
  position: relative;
}

.text-content-wrapper {
  display: flex;
  width: 100%;
  overflow: auto;
}

.text-content-wrapper::-webkit-scrollbar { width: 8px; height: 8px; }
.text-content-wrapper::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
.text-content-wrapper::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 999px; }

.line-numbers {
  display: flex;
  flex-direction: column;
  padding: 20px 14px 20px 16px;
  text-align: right;
  background: rgba(255, 255, 255, 0.02);
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
  user-select: none;
}

.line-numbers span {
  font-size: 13px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.2);
  font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  font-variant-numeric: tabular-nums;
}

.text-content {
  flex: 1;
  margin: 0;
  padding: 20px 24px;
  color: rgba(255, 255, 255, 0.85);
  font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  line-height: 1.7;
  background: transparent;
  overflow: visible;
  pointer-events: none;
  user-select: text;
  pointer-events: auto;
}

/* Loader */
.viewer-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.loader-spinner {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.08);
  border-top-color: rgba(163, 86, 255, 0.9);
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* Error */
.viewer-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  color: rgba(255, 255, 255, 0.35);
}

.viewer-error svg {
  width: 44px;
  height: 44px;
}

.viewer-error span {
  font-size: 0.88rem;
}

/* Status bar */
.viewer-statusbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

.statusbar-divider {
  opacity: 0.4;
}

/* Transition */
.viewer-fade-enter-active { transition: opacity 0.2s ease; }
.viewer-fade-leave-active { transition: opacity 0.15s ease; }
.viewer-fade-enter-from,
.viewer-fade-leave-to { opacity: 0; }
</style>