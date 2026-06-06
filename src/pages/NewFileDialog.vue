<template>
  <div class="new-file-dialog" v-if="visible">
    <div class="dialog-backdrop" @click="cancel" />
    <div class="dialog-box">
      <p class="dialog-title">New Text File</p>
      <input
        ref="inputRef"
        v-model="filename"
        class="dialog-input"
        placeholder="filename"
        @keydown.enter="confirm"
        @keydown.esc="cancel"
      />
      <span class="dialog-ext">.txt</span>
      <div class="dialog-actions">
        <button class="btn-cancel" @click="cancel">Cancel</button>
        <button class="btn-confirm" @click="confirm">Create</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    visible: Boolean,
    spawnX: Number,
    spawnY: Number,
  },
  emits: ['confirm', 'cancel'],
  data() {
    return { filename: 'untitled' }
  },
  watch: {
    visible(val) {
      if (val) {
        this.filename = 'untitled'
        this.$nextTick(() => {
          (this.$refs.inputRef as HTMLInputElement)?.select()
        })
      }
    },
  },
  methods: {
    confirm() {
      if (!this.filename.trim()) return
      this.$emit('confirm', this.filename.trim(), this.spawnX, this.spawnY)
    },
    cancel() {
      this.$emit('cancel')
    },
  },
}
</script>

<style scoped>
.dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9998;
}
.dialog-box {
  position: fixed;
  z-index: 9999;
  background: rgba(28, 26, 30, 0.95);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 20px;
  width: 280px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 8px 32px rgba(0,0,0,0.6);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.dialog-title {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.7);
  margin: 0;
}
.dialog-input {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 6px;
  padding: 8px 10px;
  color: #fff;
  font-size: 0.95rem;
  outline: none;
  width: 100%;
  box-sizing: border-box;
}
.dialog-input:focus {
  border-color: rgba(136, 39, 255, 0.7);
}
.dialog-ext {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.35);
  margin-top: -8px;
}
.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.btn-cancel {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 6px;
  color: rgba(255,255,255,0.6);
  padding: 6px 14px;
  cursor: pointer;
  font-size: 0.85rem;
}
.btn-confirm {
  background: rgba(111, 25, 216, 0.85);
  border: none;
  border-radius: 6px;
  color: #fff;
  padding: 6px 14px;
  cursor: pointer;
  font-size: 0.85rem;
}
.btn-confirm:hover { background: rgba(136, 39, 255, 0.95); }
</style>