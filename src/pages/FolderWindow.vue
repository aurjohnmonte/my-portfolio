<template>
  <teleport to="body">
    <transition name="folder-pop">
      <div
        v-if="visible"
        class="folder-window"
        :style="windowStyle"
        @mousedown="bringToFront"
      >
        <!-- Title bar (drag handle) -->
        <div
          class="folder-titlebar"
          @mousedown.stop="startDrag"
        >
          <div class="titlebar-left">
            <span class="folder-icon-sm"><img src="../images/folder.png" alt="Folder Icon" style="width: 20px; height: 20px;"></span>
            <span class="folder-title">{{ folder.name }}</span>
          </div>
          <div class="titlebar-controls">
            <button class="ctrl-btn ctrl-close" @click="$emit('close')" title="Close">✕</button>
          </div>
        </div>

        <!-- Toolbar -->
        <div class="folder-toolbar" @contextmenu.stop.prevent>
          <button class="toolbar-btn" @click="triggerNewFolder" title="New Folder">
            <span class="folder-icon-sm"><img src="../images/folder.png" alt="Folder Icon" style="width: 20px; height: 20px;"></span> New Folder
          </button>
          <button class="toolbar-btn" @click="triggerNewFile" title="New Text File">
            <span class="folder-icon-sm"><img src="../images/txt.png" alt="Text File Icon" style="width: 20px; height: 20px;"></span> New File
          </button>
        </div>

        <!-- Content area -->
        <div
          class="folder-content"
          @contextmenu.stop.prevent="showContentMenu($event)"
          @click="clearSelection"
        >
          <!-- Empty state -->
          <div v-if="childFolders.length === 0 && childFiles.length === 0" class="folder-empty">
            <div class="empty-icon">📂</div>
            <p>This folder is empty</p>
            <p class="empty-hint">Right-click or use toolbar to add items</p>
          </div>

          <!-- Sub-folders -->
          <div
            v-for="subfolder in childFolders"
            :key="subfolder.id"
            class="folder-item"
            :class="{ 'item-selected': selectedId === subfolder.id }"
            @click.stop="openSubFolder(subfolder)"
            @contextmenu.stop.prevent="showItemMenu($event, subfolder.id, 'folder')"
          >
            <div class="item-icon"><img src="../images/folder.png" alt="Folder Icon" style="width: 35px; height: 35px;"></div>
            <span class="item-name">{{ subfolder.name }}</span>
          </div>

          <!-- Text files -->
          <div
            v-for="file in childFiles"
            :key="file.id"
            class="folder-item"
            :class="{ 'item-selected': selectedId === file.id }"
            @click.stop="$emit('open-file', file)"
            @contextmenu.stop.prevent="showItemMenu($event, file.id, 'file')"
          >
            <div class="item-icon"><img src="../images/txt.png" alt="Text File Icon" style="width: 35px; height: 35px;"></div>
            <span class="item-name">{{ file.name }}</span>
          </div>
        </div>

        <!-- Status bar -->
        <div class="folder-statusbar">
          {{ childFolders.length + childFiles.length }} item{{ childFolders.length + childFiles.length !== 1 ? 's' : '' }}
        </div>

        <!-- Context menu inside folder -->
        <transition name="ctx-fade">
          <div
            v-if="ctxMenu.visible"
            class="ctx-menu"
            :style="{ top: ctxMenu.y + 'px', left: ctxMenu.x + 'px' }"
            @click.stop
          >
            <template v-if="ctxMenu.type === 'content'">
              <div class="ctx-item" @click="handleCtx('new-folder')">
                <span class="folder-icon-sm"><img src="../images/folder.png" alt="Folder Icon" style="width: 20px; height: 20px;"></span> New Folder
              </div>
              <div class="ctx-item" @click="handleCtx('new-file')">
                <span class="folder-icon-sm"><img src="../images/txt.png" alt="Text File Icon" style="width: 20px; height: 20px;"></span> New Text File
              </div>
            </template>
            <template v-else>
              <div class="ctx-item" @click="handleCtx('open')">
                <span class="folder-icon-sm"><img src="../images/folder.png" alt="Folder Icon" style="width: 20px; height: 20px;"></span> Open
              </div>
              <div class="ctx-divider"></div>
              <div class="ctx-item danger" @click="handleCtx('delete')">
                <span class="folder-icon-sm"><img src="../images/trash.png" alt="Delete Icon" style="width: 20px; height: 20px;"></span> Delete
              </div>
            </template>
          </div>
        </transition>

        <!-- New folder dialog inside window -->
        <transition name="dlg-fade">
          <div v-if="newFolderDlg" class="inner-dialog-backdrop" @click.self="newFolderDlg = false">
            <div class="inner-dialog">
              <p class="dlg-title">New Folder</p>
              <input
                ref="folderInput"
                v-model="newFolderName"
                class="dlg-input"
                placeholder="folder name"
                @keydown.enter="confirmNewFolder"
                @keydown.esc="newFolderDlg = false"
              />
              <div class="dlg-actions">
                <button class="dlg-cancel" @click="newFolderDlg = false">Cancel</button>
                <button class="dlg-confirm" @click="confirmNewFolder">Create</button>
              </div>
            </div>
          </div>
        </transition>

        <!-- New file dialog inside window -->
        <transition name="dlg-fade">
          <div v-if="newFileDlg" class="inner-dialog-backdrop" @click.self="newFileDlg = false">
            <div class="inner-dialog">
              <p class="dlg-title">New Text File</p>
              <input
                ref="fileInput"
                v-model="newFileName"
                class="dlg-input"
                placeholder="filename"
                @keydown.enter="confirmNewFile"
                @keydown.esc="newFileDlg = false"
              />
              <span class="dlg-ext">.txt</span>
              <div class="dlg-actions">
                <button class="dlg-cancel" @click="newFileDlg = false">Cancel</button>
                <button class="dlg-confirm" @click="confirmNewFile">Create</button>
              </div>
            </div>
          </div>
        </transition>

        <!-- Nested sub-folder windows (recursive) -->
        <FolderWindow
          v-for="sf in openSubFolders"
          :key="sf.id"
          :folder="sf"
          :visible="true"
          :zBase="zBase + 10"
          @close="closeSubFolder(sf.id)"
          @open-file="$emit('open-file', $event)"
        />

        <!-- Resize handle -->
        <div class="resize-handle" @mousedown.stop="startResize"></div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDesktopStore } from '../stores/useDesktopStore'
import type { DesktopFile, DesktopFolder } from '../stores/useDesktopStore'

export default defineComponent({
  name: 'FolderWindow',
  props: {
    folder: { type: Object as () => DesktopFolder, required: true },
    visible: { type: Boolean, default: true },
    zBase: { type: Number, default: 100 },
  },
  emits: ['close', 'open-file'],
  data() {
    return {
      store: useDesktopStore(),
      selectedId: null as string | null,
      // window position & size
      winX: 200,
      winY: 120,
      winW: 520,
      winH: 380,
      winZ: this.zBase,
      // drag
      dragging: false,
      dragOffX: 0,
      dragOffY: 0,
      // resize
      resizing: false,
      resizeStartX: 0,
      resizeStartY: 0,
      resizeStartW: 0,
      resizeStartH: 0,
      // context menu
      ctxMenu: { visible: false, x: 0, y: 0, type: 'content' as 'content' | 'item', targetId: null as string | null, targetType: null as 'file' | 'folder' | null },
      // dialogs
      newFolderDlg: false,
      newFolderName: 'New Folder',
      newFileDlg: false,
      newFileName: 'untitled',
      // open sub-folder windows
      openSubFolders: [] as DesktopFolder[],
    }
  },
  computed: {
    windowStyle() {
      return {
        left: this.winX + 'px',
        top: this.winY + 'px',
        width: this.winW + 'px',
        height: this.winH + 'px',
        zIndex: this.winZ,
      }
    },
    childFolders(): DesktopFolder[] {
      return this.store.foldersInFolder(this.folder.id)
    },
    childFiles(): DesktopFile[] {
      return this.store.filesInFolder(this.folder.id)
    },
  },
  methods: {
    bringToFront() {
      this.winZ = this.zBase + 50
    },

    // ── Drag ──────────────────────────────────────────
    startDrag(e: MouseEvent) {
      this.dragging = true
      this.dragOffX = e.clientX - this.winX
      this.dragOffY = e.clientY - this.winY
      this.bringToFront()
      window.addEventListener('mousemove', this.onDrag)
      window.addEventListener('mouseup', this.stopDrag)
    },
    onDrag(e: MouseEvent) {
      if (!this.dragging) return
      this.winX = Math.max(0, e.clientX - this.dragOffX)
      this.winY = Math.max(0, e.clientY - this.dragOffY)
    },
    stopDrag() {
      this.dragging = false
      window.removeEventListener('mousemove', this.onDrag)
      window.removeEventListener('mouseup', this.stopDrag)
    },

    // ── Resize ────────────────────────────────────────
    startResize(e: MouseEvent) {
      this.resizing = true
      this.resizeStartX = e.clientX
      this.resizeStartY = e.clientY
      this.resizeStartW = this.winW
      this.resizeStartH = this.winH
      window.addEventListener('mousemove', this.onResize)
      window.addEventListener('mouseup', this.stopResize)
    },
    onResize(e: MouseEvent) {
      if (!this.resizing) return
      this.winW = Math.max(320, this.resizeStartW + (e.clientX - this.resizeStartX))
      this.winH = Math.max(240, this.resizeStartH + (e.clientY - this.resizeStartY))
    },
    stopResize() {
      this.resizing = false
      window.removeEventListener('mousemove', this.onResize)
      window.removeEventListener('mouseup', this.stopResize)
    },

    // ── Selection ─────────────────────────────────────
    selectItem(id: string) {
      this.selectedId = id
    },
    clearSelection() {
      this.selectedId = null
    },

    // ── Context menus ─────────────────────────────────
    showContentMenu(e: MouseEvent) {
        console.log('hello')
      const rect = (this.$el as HTMLElement)?.getBoundingClientRect?.() ?? { left: 0, top: 0 }
      this.ctxMenu = {
        visible: true,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        type: 'content',
        targetId: null,
        targetType: null,
      }
    },
    showItemMenu(e: MouseEvent, id: string, type: 'file' | 'folder') {
      const rect = (this.$el as HTMLElement)?.getBoundingClientRect?.() ?? { left: 0, top: 0 }
      this.selectedId = id
      this.ctxMenu = {
        visible: true,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        type: 'item',
        targetId: id,
        targetType: type,
      }
    },
    hideCtx() {
      this.ctxMenu.visible = false
    },
    handleCtx(action: string) {
      this.hideCtx()
      switch (action) {
        case 'new-folder': this.triggerNewFolder(); break
        case 'new-file':   this.triggerNewFile(); break
        case 'open':
          if (this.ctxMenu.targetType === 'folder') {
            const f = this.store.folders.find(x => x.id === this.ctxMenu.targetId)
            if (f) this.openSubFolder(f)
          } else {
            const file = this.store.files.find(x => x.id === this.ctxMenu.targetId)
            if (file) this.$emit('open-file', file)
          }
          break
        case 'delete':
          if (this.ctxMenu.targetType === 'folder') {
            this.store.deleteFolder(this.ctxMenu.targetId!)
          } else {
            this.store.deleteFile(this.ctxMenu.targetId!)
          }
          break
      }
    },

    // ── New Folder ────────────────────────────────────
    triggerNewFolder() {
      this.newFolderName = 'New Folder'
      this.newFolderDlg = true
      this.$nextTick(() => {
        (this.$refs.folderInput as HTMLInputElement)?.select()
      })
    },
    confirmNewFolder() {
      if (!this.newFolderName.trim()) return
      this.store.createFolder(this.newFolderName.trim(), 0, 0, this.folder.id)
      this.newFolderDlg = false
    },

    // ── New File ──────────────────────────────────────
    triggerNewFile() {
      this.newFileName = 'untitled'
      this.newFileDlg = true
      this.$nextTick(() => {
        (this.$refs.fileInput as HTMLInputElement)?.select()
      })
    },
    confirmNewFile() {
      if (!this.newFileName.trim()) return
      this.store.createFile(this.newFileName.trim(), 0, 0, this.folder.id)
      this.newFileDlg = false
    },

    // ── Sub-folder windows ────────────────────────────
    openSubFolder(subfolder: DesktopFolder) {
      if (!this.openSubFolders.find(f => f.id === subfolder.id)) {
        this.openSubFolders.push(subfolder);
        this.selectedId = subfolder.id
      }
    },
    closeSubFolder(id: string) {
      this.openSubFolders = this.openSubFolders.filter(f => f.id !== id)
    },

    // ── Toolbar shortcuts ─────────────────────────────
  },
  mounted() {
    // Center the window on first open, slightly offset per folder
    const offset = (this.zBase % 5) * 24
    this.winX = Math.max(60, window.innerWidth / 2 - this.winW / 2 + offset)
    this.winY = Math.max(60, window.innerHeight / 2 - this.winH / 2 + offset)

    document.addEventListener('click', this.hideCtx)
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.hideCtx() })
  },
  beforeUnmount() {
    document.removeEventListener('click', this.hideCtx)
  },
})
</script>

<style scoped>
/* ── Window shell ──────────────────────────────────── */
.folder-window {
  position: fixed;
  display: flex;
  flex-direction: column;
  background: rgba(22, 20, 26, 0.96);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 12px;
  box-shadow:
    0 32px 80px rgba(0, 0, 0, 0.70),
    0 0 0 0.5px rgba(255,255,255,0.06) inset;
  overflow: hidden;
  user-select: none;
  min-width: 320px;
  min-height: 240px;
}

/* ── Title bar ──────────────────────────────────────── */
.folder-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  height: 40px;
  background: rgba(30, 27, 36, 0.85);
  border-bottom: 1px solid rgba(255,255,255,0.07);
  cursor: grab;
  flex-shrink: 0;
}

.folder-titlebar:active { cursor: grabbing; }

.titlebar-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.folder-icon-sm { font-size: 1rem; }

.folder-title {
  font-size: 0.88rem;
  font-family: 'Ubuntu', Inter, system-ui, sans-serif;
  color: rgba(255,255,255,0.85);
  font-weight: 500;
  letter-spacing: 0.02em;
}

.titlebar-controls { display: flex; gap: 6px; }

.ctrl-btn {
  width: 24px; height: 24px;
  border: none; border-radius: 50%;
  font-size: 0.7rem;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
}

.ctrl-close {
  background: rgba(255, 80, 80, 0.20);
  color: rgba(255,100,100,0.8);
}

.ctrl-close:hover {
  background: rgba(255, 80, 80, 0.70);
  color: #fff;
}

/* ── Toolbar ────────────────────────────────────────── */
.folder-toolbar {
  display: flex;
  gap: 4px;
  padding: 6px 10px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(28, 26, 32, 0.60);
  flex-shrink: 0;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 6px;
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.72);
  font-size: 0.78rem;
  font-family: 'Ubuntu', Inter, system-ui, sans-serif;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.toolbar-btn:hover {
  background: rgba(111, 25, 216, 0.25);
  border-color: rgba(136, 39, 255, 0.45);
  color: #fff;
}

/* ── Content area ───────────────────────────────────── */
.folder-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 8px;
}

.folder-content::-webkit-scrollbar { width: 5px; }
.folder-content::-webkit-scrollbar-track { background: transparent; }
.folder-content::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }

/* ── Items (folders & files) ────────────────────────── */
.folder-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  padding: 8px 4px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.14s;
  text-align: center;
  border: 1.5px solid transparent;
}

.folder-item:hover {
  background: rgba(255,255,255,0.07);
}

.item-selected {
  background: rgba(111, 25, 216, 0.22) !important;
  border-color: rgba(136, 39, 255, 0.45) !important;
}

.item-icon { font-size: 2rem; margin-bottom: 4px; line-height: 1; }

.item-name {
  font-size: 0.72rem;
  font-family: 'Ubuntu', Inter, system-ui, sans-serif;
  color: rgba(255,255,255,0.80);
  word-break: break-word;
  line-height: 1.3;
  max-width: 72px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* ── Empty state ────────────────────────────────────── */
.folder-empty {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 180px;
}

.empty-icon { font-size: 3rem; opacity: 0.3; }

.folder-empty p {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.35);
  font-family: 'Ubuntu', Inter, system-ui, sans-serif;
}

.empty-hint { font-size: 0.75rem !important; opacity: 0.6; }

/* ── Status bar ─────────────────────────────────────── */
.folder-statusbar {
  height: 26px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  font-size: 0.74rem;
  color: rgba(255,255,255,0.30);
  font-family: 'Ubuntu', Inter, system-ui, sans-serif;
  border-top: 1px solid rgba(255,255,255,0.06);
  background: rgba(22, 20, 26, 0.70);
  flex-shrink: 0;
}

/* ── Resize handle ──────────────────────────────────── */
.resize-handle {
  position: absolute;
  bottom: 0; right: 0;
  width: 18px; height: 18px;
  cursor: nwse-resize;
  opacity: 0.3;
  background:
    linear-gradient(135deg,
      transparent 40%,
      rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.5) 50%,
      transparent 50%, transparent 65%,
      rgba(255,255,255,0.5) 65%, rgba(255,255,255,0.5) 75%,
      transparent 75%
    );
}

.resize-handle:hover { opacity: 0.7; }

/* ── In-window context menu ─────────────────────────── */
.ctx-menu {
  position: absolute;
  z-index: 9999;
  min-width: 180px;
  background: rgba(28, 26, 30, 0.97);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 9px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.55);
  padding: 5px;
}

.ctx-item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 13px;
  border-radius: 6px;
  font-size: 0.84rem;
  font-family: 'Ubuntu', Inter, system-ui, sans-serif;
  color: rgba(255,255,255,0.85);
  cursor: pointer;
  transition: background 0.12s;
}

.ctx-item:hover { background: rgba(255,255,255,0.10); }
.ctx-item.danger { color: #ff6b6b; }
.ctx-item.danger:hover { background: rgba(255,80,80,0.14); }
.ctx-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 4px 0; }

/* ── Inner dialogs ──────────────────────────────────── */
.inner-dialog-backdrop {
  position: absolute;
  inset: 0;
  z-index: 9000;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.inner-dialog {
  background: rgba(28, 26, 30, 0.98);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  padding: 20px;
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.6);
}

.dlg-title {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.65);
  font-family: 'Ubuntu', Inter, system-ui, sans-serif;
  margin: 0;
}

.dlg-input {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 6px;
  padding: 7px 10px;
  color: #fff;
  font-size: 0.92rem;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Ubuntu', Inter, system-ui, sans-serif;
}

.dlg-input:focus { border-color: rgba(136, 39, 255, 0.7); }

.dlg-ext {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.30);
  margin-top: -6px;
}

.dlg-actions {
  display: flex;
  justify-content: flex-end;
  gap: 7px;
}

.dlg-cancel {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 6px;
  color: rgba(255,255,255,0.55);
  padding: 5px 13px;
  cursor: pointer;
  font-size: 0.82rem;
  font-family: 'Ubuntu', Inter, system-ui, sans-serif;
}

.dlg-confirm {
  background: rgba(111, 25, 216, 0.85);
  border: none;
  border-radius: 6px;
  color: #fff;
  padding: 5px 13px;
  cursor: pointer;
  font-size: 0.82rem;
  font-family: 'Ubuntu', Inter, system-ui, sans-serif;
}

.dlg-confirm:hover { background: rgba(136, 39, 255, 0.95); }

/* ── Transitions ────────────────────────────────────── */
.folder-pop-enter-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.folder-pop-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.folder-pop-enter-from  { opacity: 0; transform: scale(0.92) translateY(8px); }
.folder-pop-leave-to    { opacity: 0; transform: scale(0.92) translateY(8px); }

.ctx-fade-enter-active { transition: opacity 0.1s ease, transform 0.1s ease; }
.ctx-fade-leave-active { transition: opacity 0.08s ease; }
.ctx-fade-enter-from   { opacity: 0; transform: scale(0.95) translateY(-3px); }
.ctx-fade-leave-to     { opacity: 0; }

.dlg-fade-enter-active { transition: opacity 0.15s ease; }
.dlg-fade-leave-active { transition: opacity 0.12s ease; }
.dlg-fade-enter-from, .dlg-fade-leave-to { opacity: 0; }
</style>