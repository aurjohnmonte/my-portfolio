<template>
  <div class="editor-backdrop" @click.self="close">
    <div class="editor-box">
      <div class="editor-header">
        <span>{{ file.name }}</span>
        <button class="close-btn" @click="close">✕</button>
      </div>
      <textarea
        v-model="localContent"
        class="editor-area"
        placeholder="Start typing..."
      />
      <div class="editor-footer">
        <button class="btn-save" @click="save">Save</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useDesktopStore } from '../stores/useDesktopStore'
import type { DesktopFile } from '../stores/useDesktopStore'

export default {
  props: {
    file: { type: Object as () => DesktopFile, required: true },
  },
  emits: ['close'],
  data() {
    return { localContent: this.file.content }
  },
  methods: {
    save() {
      useDesktopStore().updateFileContent(this.file.id, this.localContent)
      this.$emit('close')
    },
    close() { this.$emit('close') },
  },
}
</script>

<style scoped>
.editor-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}
.editor-box {
  background: rgba(22, 20, 24, 0.97);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  width: 560px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 40px rgba(0,0,0,0.7);
  overflow: hidden;
}
.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  font-size: 0.9rem;
  color: rgba(255,255,255,0.7);
}
.close-btn {
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  font-size: 1rem;
}
.close-btn:hover { color: #fff; }
.editor-area {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 0.9rem;
  font-family: 'JetBrains Mono', monospace;
  padding: 16px;
  min-height: 300px;
  resize: none;
  line-height: 1.6;
}
.editor-footer {
  padding: 10px 16px;
  border-top: 1px solid rgba(255,255,255,0.08);
  display: flex;
  justify-content: flex-end;
}
.btn-save {
  background: rgba(111, 25, 216, 0.85);
  border: none;
  border-radius: 6px;
  color: #fff;
  padding: 6px 18px;
  cursor: pointer;
  font-size: 0.85rem;
}
.btn-save:hover { background: rgba(136, 39, 255, 0.95); }
</style>