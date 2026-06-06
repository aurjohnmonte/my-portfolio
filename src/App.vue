<template>
  <div class="desktop" @contextmenu.prevent="showContextMenu($event, true)">

    <!-- Dialogs -->
    <NewFileDialog
      :visible="newFileDialog.visible"
      @confirm="onFileCreated"
      @cancel="newFileDialog.visible = false"
      @contextmenu.prevent.stop
    />

    <!-- New Folder Dialog (desktop-level) -->
    <transition name="context-fade">
      <div v-if="newFolderDialog.visible" class="dialog-backdrop-full" @click.self="newFolderDialog.visible = false">
        <div class="dialog-box">
          <p class="dialog-title">New Folder</p>
          <input
            ref="folderInputRef"
            v-model="newFolderDialog.name"
            class="dialog-input"
            placeholder="folder name"
            @keydown.enter="onFolderCreated"
            @keydown.esc="newFolderDialog.visible = false"
          />
          <div class="dialog-actions">
            <button class="btn-cancel" @click="newFolderDialog.visible = false">Cancel</button>
            <button class="btn-confirm" @click="onFolderCreated">Create</button>
          </div>
        </div>
      </div>
    </transition>

    <TextEditor
      v-if="openedFile"
      :file="openedFile"
      @close="openedFile = null"
      @contextmenu.prevent.stop
    />

    <AppLauncher
      :visible="appLauncherVisible"
      @close="appLauncherVisible = false"
      @contextmenu.prevent.stop
    />

    <!-- Folder windows (desktop level) -->
    <FolderWindow
      v-for="f in openFolderWindows"
      :key="f.id"
      :folder="f"
      :visible="true"
      :z-base="120 + openFolderWindows.indexOf(f) * 5"
      @close="closeFolderWindow(f.id)"
      @open-file="openFile"
    />

    <div class="content-modal">
      <router-view v-slot="{ Component }" @contextmenu.prevent.stop>
        <transition name="modal-popup" mode="out-in" appear 
                    @before-leave="onModalBeforeLeave"
                    @after-leave="onModalAfterLeave">
          <component :is="Component" @close="closeModal()" />
        </transition>
      </router-view>
    </div>

    <!-- Right-click Context Menu -->
    <transition name="context-fade">
      <div
        v-if="contextMenu.visible"
        class="context-menu"
        :style="{ top: contextMenu.y + 'px', left: contextMenu.x + 'px' }"
        @click.stop
      >
        <div class="context-menu-item" @click="handleContextAction('new-folder')" style="display: none;">
          <span class="ctx-icon">📁</span>
          <span>New Folder</span>
        </div>
        <div class="context-menu-item" @click="handleContextAction('new-text')">
          <span class="ctx-icon">📄</span>
          <span>New Text File</span>
        </div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item" @click="handleContextAction('refresh')">
          <span class="ctx-icon">🔄</span>
          <span>Refresh</span>
        </div>
        <div class="context-menu-divider"></div>
        <div
          class="context-menu-item danger"
          :class="{ 'disabled-delete': contextMenu.disabled_delete }"
          @click="handleContextAction('delete')"
        >
          <span class="ctx-icon">🗑️</span>
          <span>Delete</span>
        </div>
      </div>
    </transition>

    <div class="wallpaper"></div>
    <TopBar @toggle-activities="$emit('toggle-activities')" />

    <aside class="launcher">
      <div class="launcher-icon app-launcher" style="margin-right: 30px;" @click="appLauncherVisible = true">
        <img src="./images/grid.png" alt="AI Icon" class="launcher-icon-img">
      </div>
      <div class="launcher-icon icon-app" @click="$router.push('/file-explorer?path=home')">
        <img src="./images/folder (2).png" alt="AI Icon" class="launcher-icon-img">
      </div>
      <div class="launcher-icon icon-app">
        <img src="./images/html.png" alt="AI Icon" class="launcher-icon-img" @click="$router.push('/about')">
      </div>
      <div class="launcher-icon icon-app">
        <img src="./images/ghost.png" alt="AI Icon" class="launcher-icon-img" @click="$router.push('/about')">
      </div>
    </aside>

    <section class="desktop-icons">
      <!-- Fixed project icons -->
      <div
        class="desktop-icon project-icon"
        :class="{ 'pulse-project-icon': isProjectView, 'selected-icon': isIconSelected('ai-driven') }"
        @contextmenu.stop.prevent="showContextMenu($event, true)"
        @click="$router.push('/ai-driven-system?action=ai-driven')"
      >
        <div class="icon-circle">
          <img src="./images/csucc.png" alt="AI Icon" class="icon-img">
        </div>
        <span>AI-Driven<br> Survey System</span>
      </div>
      <div
        class="desktop-icon project-icon"
        :class="{ 'pulse-project-icon': isProjectView, 'selected-icon': isIconSelected('e-commerce') }"
        @contextmenu.stop.prevent="showContextMenu($event, true)"
        @click="$router.push('/e-commerce-system?action=e-commerce')"
      >
        <div class="icon-circle">
          <img src="./images/Logo-3.png" alt="AI Icon" class="icon-img">
        </div>
        <span>E-Commerce<br> System</span>
      </div>

      <div
        class="desktop-icon project-icon"
        :class="{ 'pulse-project-icon': isProjectView, 'selected-icon': isIconSelected('inventory') }"
        @contextmenu.stop.prevent="showContextMenu($event, true)"
        @click="$router.push('/qr-based-monitoring-system?action=inventory')"
      >
        <div class="icon-circle">
          <img src="./images/csu.png" alt="AI Icon" class="icon-img">
        </div>
        <span>QR-Based<br> Inventory <br>Monitoring</span>
      </div>
      <div
        class="desktop-icon project-icon"
        :class="{ 'pulse-project-icon': isProjectView, 'selected-icon': isIconSelected('queueing') }"
        @contextmenu.stop.prevent="showContextMenu($event, true)"
        @click="$router.push('/real-time-queueing-system?action=queueing')"
      >
        <div class="icon-circle">
          <img src="./images/line.png" alt="AI Icon" class="icon-img">
        </div>
        <span>Real-time<br> Queueing<br> System</span>
      </div>
      <div
        class="desktop-icon project-icon"
        :class="{ 'selected-icon': isIconSelected('about-me') }"
        @contextmenu.stop.prevent="showContextMenu($event, true)"
        @click="$router.push('/about?action=about-me')"
      >
        <div class="icon-circle">
          <img src="./images/html.png" alt="Projects Icon" class="icon-img">
        </div>
        <span>About Me</span>
      </div>

      <div
        class="desktop-icon project-icon"
        :class="{ 'selected-icon': isIconSelected('my-life-so-far') }"
        @contextmenu.stop.prevent="showContextMenu($event, true)"
        @click="$router.push('/file-explorer?path=my%20life%20so%20far&action=my-life-so-far')"
      >
        <div class="icon-circle">
          <img src="./images/folder.png" alt="Projects Icon" class="icon-img">
        </div>
        <span>My Life so Far</span>
      </div>

      <!-- Dynamic folder icons (desktop level) -->
      <div
        v-for="folder in desktopStore.desktopFolders"
        :key="folder.id"
        class="desktop-icon project-icon"
        @contextmenu.stop.prevent="showContextMenu($event, false, folder.id, 'folder')"
        @click="openFolderWindow(folder)"
      >
        <div class="icon-circle folder-icon-circle">
          <img src="./images/folder.png" alt="Folder Icon" class="icon-img">
        </div>
        <span>{{ folder.name }}</span>
      </div>

      <!-- Dynamic text file icons -->
      <div
        v-for="file in desktopStore.desktopFiles"
        :key="file.id"
        class="desktop-icon project-icon"
        @contextmenu.stop.prevent="showContextMenu($event, false, file.id, 'file')"
        @click="openFile(file)"
      >
        <div class="icon-circle">
          <img src="./images/txt.png" alt="Projects Icon" class="icon-img">
        </div>
        <span>{{ file.name }}</span>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import AboutMe from './pages/AboutMe.vue'
import { useDesktopStore } from './stores/useDesktopStore'
import type { DesktopFile, DesktopFolder } from './stores/useDesktopStore'
import TextEditor from './pages/TextEditor.vue'
import NewFileDialog from './pages/NewFileDialog.vue'
import FolderWindow from './pages/FolderWindow.vue'
import TopBar from './pages/modal/TopBar.vue'
import AppLauncher from './pages/modal/AppLauncher.vue'

export default {
  name: 'App',
  components: {
    AboutMe,
    NewFileDialog,
    TextEditor,
    FolderWindow,
    TopBar,
    AppLauncher
  },
  data() {
    return {
      appLauncherVisible: false,
      selectedIconId: null as string | null,
      // context menu state
      contextMenu: {
        disabled_delete: false,
        visible: false,
        x: 0,
        y: 0,
        targetId: null as string | null,
        targetType: null as 'file' | 'folder' | null,
      },
      // dialogs
      newFileDialog: { visible: false },
      newFolderDialog: { visible: false, name: 'New Folder' },
      // open editors / windows
      openedFile: null as DesktopFile | null,
      openFolderWindows: [] as DesktopFolder[],
      // store
      desktopStore: useDesktopStore(),
    }
  },
  computed: {
    isProjectView(): boolean {
      return this.$route.query.action === 'view-projects'
    },
  },
  methods: {
    onModalBeforeLeave(el: HTMLElement) {
      const modal = el.querySelector('.about-modal') as HTMLElement
      if (!modal) return

      const rect = modal.getBoundingClientRect()

      // Lock position at current location
      modal.style.position = 'fixed'
      modal.style.margin = '0'
      modal.style.left = rect.left + 'px'
      modal.style.top = rect.top + 'px'
      modal.style.width = rect.width + 'px'

      // ✅ Set transform-origin to the modal's own center
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      modal.style.transformOrigin = `${centerX}px ${centerY}px`
    },

    onModalAfterLeave(el: HTMLElement) {
      const modal = el.querySelector('.about-modal') as HTMLElement
      if (!modal) return
      // Clean up so if it re-enters it starts fresh
      modal.style.position = ''
      modal.style.left = ''
      modal.style.top = ''
      modal.style.width = ''
    },
    isIconSelected(action: string): boolean {
      return this.$route.query.action === action
    },
    selectIcon(id: string) {
      this.selectedIconId = id
    },
    navigateToAbout() {
      this.$router.push('/about?action=about-me')
    },
    closeModal() {
      this.$router.push('/')
    },
    removeLoading() {
      const loader = document.getElementById('loading-container')
      if (loader) loader.classList.add('hide-loader')
    },

    // ── File actions ──────────────────────────────────
    onFileCreated(name: string) {
      this.desktopStore.createFile(name, 100, 100, null)
      this.newFileDialog.visible = false
    },
    openFile(file: DesktopFile) {
      this.openedFile = file
      this.selectedIconId = file.id
    },

    // ── Folder actions ────────────────────────────────
    onFolderCreated() {
      if (!this.newFolderDialog.name.trim()) return
      this.desktopStore.createFolder(this.newFolderDialog.name.trim(), 100, 100, null)
      this.newFolderDialog.visible = false
    },
    openFolderWindow(folder: DesktopFolder) {
      if (!this.openFolderWindows.find(f => f.id === folder.id)) {
        this.openFolderWindows.push(folder)
        this.selectedIconId = folder.id
      }
    },
    closeFolderWindow(id: string) {
      this.openFolderWindows = this.openFolderWindows.filter(f => f.id !== id)
    },

    // ── Context menu ──────────────────────────────────
    showContextMenu(
      event: MouseEvent,
      is_disabled: boolean = false,
      item_id: string | null = null,
      item_type: 'file' | 'folder' | null = null,
    ) {
      this.contextMenu.targetId = item_id
      this.contextMenu.targetType = item_type

      const menuWidth = 200
      const menuHeight = 180
      const x = Math.min(event.clientX, window.innerWidth - menuWidth - 8)
      const y = Math.min(event.clientY, window.innerHeight - menuHeight - 8)

      this.contextMenu.x = x
      this.contextMenu.y = y
      this.contextMenu.visible = true
      this.contextMenu.disabled_delete = is_disabled
    },
    hideContextMenu() {
      this.contextMenu.visible = false
    },
    handleContextAction(action: string) {
      this.hideContextMenu()
      switch (action) {
        case 'new-folder':
          this.newFolderDialog.name = 'New Folder'
          this.newFolderDialog.visible = true
          this.$nextTick(() => {
            (this.$refs.folderInputRef as HTMLInputElement)?.select()
          })
          break
        case 'new-text':
          this.newFileDialog.visible = true
          break
        case 'refresh':
          window.location.reload()
          break
        case 'delete':
          if (this.contextMenu.targetType === 'folder' && this.contextMenu.targetId) {
            this.closeFolderWindow(this.contextMenu.targetId)
            this.desktopStore.deleteFolder(this.contextMenu.targetId)
          } else if (this.contextMenu.targetType === 'file' && this.contextMenu.targetId) {
            this.desktopStore.deleteFile(this.contextMenu.targetId)
          }
          break
      }
    },
  },
  mounted() {
    this.navigateToAbout()
    this.removeLoading()

    document.addEventListener('contextmenu', (e) => e.preventDefault())
    document.addEventListener('click', this.hideContextMenu)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.hideContextMenu()
    })
  },
  beforeUnmount() {
    document.removeEventListener('click', this.hideContextMenu)
  },
}
</script>

<style scoped>
/* ── new: full-screen backdrop for folder dialog ── */
.dialog-backdrop-full {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: rgba(0,0,0,0.30);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-box {
  position: relative;
  z-index: 9999;
  background: rgba(28, 26, 30, 0.95);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 20px;
  width: 280px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.6);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dialog-title {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.7);
  margin: 0;
  font-family: 'Ubuntu', Inter, system-ui, sans-serif;
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
  font-family: 'Ubuntu', Inter, system-ui, sans-serif;
}

.dialog-input:focus { border-color: rgba(136, 39, 255, 0.7); }

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
  font-family: 'Ubuntu', Inter, system-ui, sans-serif;
}

.btn-confirm {
  background: rgba(111, 25, 216, 0.85);
  border: none;
  border-radius: 6px;
  color: #fff;
  padding: 6px 14px;
  cursor: pointer;
  font-size: 0.85rem;
  font-family: 'Ubuntu', Inter, system-ui, sans-serif;
}

.btn-confirm:hover { background: rgba(136, 39, 255, 0.95); }

/* ── folder icon circle tint ── */
.folder-icon-circle {
  background: rgba(111, 25, 216, 0.08);
}

/* ── Everything below is UNCHANGED from original ── */
.disabled-delete {
  opacity: 0.35;
  cursor: not-allowed;
  pointer-events: none;
}

.context-menu {
  position: fixed;
  z-index: 9999;
  min-width: 200px;
  background: rgba(28, 26, 30, 0.92);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 10px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.55),
    0 1px 0 rgba(255,255,255,0.06) inset;
  padding: 5px;
  user-select: none;
  overflow: hidden;
}

.context-menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 14px;
  border-radius: 6px;
  font-size: 0.88rem;
  font-family: 'Ubuntu', Inter, system-ui, sans-serif;
  color: rgba(255, 255, 255, 0.88);
  cursor: pointer;
  transition: background 0.12s ease;
  letter-spacing: 0.01em;
}

.context-menu-item:hover { background: rgba(255, 255, 255, 0.10); }
.context-menu-item.danger { color: #ff6b6b; }
.context-menu-item.danger:hover { background: rgba(255, 80, 80, 0.14); }

.ctx-icon { font-size: 1rem; width: 20px; text-align: center; flex-shrink: 0; }

.context-menu-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 4px 0;
}

.context-fade-enter-active { transition: opacity 0.12s ease, transform 0.12s ease; }
.context-fade-leave-active { transition: opacity 0.08s ease, transform 0.08s ease; }
.context-fade-enter-from   { opacity: 0; transform: scale(0.95) translateY(-4px); }
.context-fade-leave-to     { opacity: 0; transform: scale(0.95); }

.selected-icon .icon-circle {
  border: 2px solid rgba(111, 25, 216, 0.9);
  box-shadow: 0 20px 0 10px rgba(136, 39, 255, 0.644);
  animation: selectedPulse 2.8s ease-in-out infinite;
}

.selected-icon span { color: #ffffff; font-weight: 700; }

@keyframes selectedPulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 4px rgba(163, 86, 255, 0.08); }
  50%       { transform: scale(1.02); box-shadow: 0 0 0 9px rgba(163, 86, 255, 0.08); }
}

.content-modal {
  position: absolute;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.icon-img           { width: 40px; height: 40px; }
.launcher-icon-img  { width: 40px; height: 40px; }

.desktop {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  font-family: Inter, system-ui, sans-serif;
  color: #ffffff;
}

.wallpaper {
  position: absolute;
  inset: 0;
  background-image: url('./images/wallpaper.jpeg');
  background-size: cover;
  background-position: center;
  filter: brightness(0.45);
  z-index: 0;
}

.topbar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: rgba(22, 20, 20, 0.845);
  backdrop-filter: blur(8px);
  z-index: 10;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.topbar-label,
.topbar-clock { font-size: 0.95rem; letter-spacing: 0.04em; margin-left: 20px; }

.launcher {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  padding: 15px;
  display: flex;
  flex-direction: row;
  gap: 25px;
  background: rgba(17, 14, 14, 0.55);
  border-radius: 15px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
  z-index: 10;
}

.launcher-icon {
  border-radius: 14px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.launcher-icon:hover {
  transform: scale(1.08);
  box-shadow: 0 14px 28px rgba(255, 255, 255, 0.14);
}

.desktop-icons {
  position: absolute;
  left: 0;
  top: 80px;
  display: grid;
  grid-template-columns: repeat(2, 160px);
  gap: 50px 15px;
  z-index: 10;
}

@media (max-width: 768px) {
  .desktop-icons {
    grid-template-columns: repeat(2, 160px);
    left: 12px;
    top: 80px;
  }
  .launcher {
    bottom: 10vh;
  }
}

.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 160px;
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.35;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.desktop-icon:hover { transform: scale(1.05); }
.desktop-icon:hover .icon-circle { box-shadow: 0 18px 40px rgba(255, 255, 255, 0.12); }

.pulse-project-icon .icon-circle { animation: pulseIcon 2s ease-in-out infinite; }

@keyframes pulseIcon {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(162, 86, 255, 0.887); }
  50%       { transform: scale(1.5); box-shadow: 0 18px 40px rgba(162, 86, 255, 0.637); }
}

.modal-popup-enter-active,
.modal-popup-leave-active { transition: opacity 0.25s ease; }

.modal-popup-enter-from,
.modal-popup-leave-to { opacity: 0; }

.modal-popup-enter-to,
.modal-popup-leave-from { opacity: 1; }
</style>