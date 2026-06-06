<template>
  <transition name="launcher-fade">
    <div v-if="visible" class="app-launcher-backdrop" @click.self="$emit('close')">
      <div class="app-launcher-modal" @contextmenu.prevent.stop>

        <!-- Header -->
        <div class="launcher-header">
          <span class="launcher-title">Applications</span>
          <button class="launcher-close" @click="$emit('close')">✕</button>
        </div>

        <!-- Search -->
        <div class="launcher-search-wrap">
          <span class="search-icon">⌕</span>
          <input
            ref="searchRef"
            v-model="query"
            class="launcher-search"
            placeholder="Search apps…"
            @keydown.esc="$emit('close')"
          />
        </div>

        <!-- Grid -->
        <div class="launcher-grid">
          <div
            v-for="app in filteredApps"
            :key="app.id"
            class="launcher-app"
            @click="launch(app)"
          >
            <div class="launcher-app-icon">
              <img :src="app.icon" :alt="app.label" class="launcher-app-img" />
            </div>
            <span class="launcher-app-label">{{ app.label }}</span>
          </div>
        </div>

      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'

interface AppItem {
  id: string
  label: string
  icon: string
  action: () => void
}

export default defineComponent({
  name: 'AppLauncher',
  props: {
    visible: { type: Boolean, default: false },
  },
  emits: ['close'],

  setup(props, { emit }) {
    const router = useRouter()
    const query = ref('')
    const searchRef = ref<HTMLInputElement | null>(null)

    const apps: AppItem[] = [
      {
        id: 'ai-driven',
        label: 'AI-Driven Survey System',
        icon: new URL('../../images/csucc.png', import.meta.url).href,
        action: () => router.push('/ai-driven-system?action=ai-driven'),
      },
      {
        id: 'e-commerce',
        label: 'E-Commerce System',
        icon: new URL('../../images/Logo-3.png', import.meta.url).href,
        action: () => router.push('/e-commerce-system?action=e-commerce'),
      },
      {
        id: 'inventory',
        label: 'QR-Based Inventory Monitoring',
        icon: new URL('../../images/csu.png', import.meta.url).href,
        action: () => router.push('/qr-based-monitoring-system?action=inventory'),
      },
      {
        id: 'queueing',
        label: 'Real-time Queueing System',
        icon: new URL('../../images/line.png', import.meta.url).href,
        action: () => router.push('/real-time-queueing-system?action=queueing'),
      },
      {
        id: 'about-me',
        label: 'About Me',
        icon: new URL('../../images/html.png', import.meta.url).href,
        action: () => router.push('/about?action=about-me'),
      },
      {
        id: 'my-life-so-far',
        label: 'My Life so Far',
        icon: new URL('../../images/folder.png', import.meta.url).href,
        action: () => router.push('/file-explorer?path=my%20life%20so%20far&action=my-life-so-far'),
      },
      {
        id: 'file-explorer',
        label: 'File Explorer',
        icon: new URL('../../images/folder (2).png', import.meta.url).href,
        action: () => router.push('/file-explorer?path=home'),
      },
      {
        id: 'game-adventurer',
        label: 'Game Adventurer',
        icon: new URL('../../images/ghost.png', import.meta.url).href,
        action: () => router.push('/game-adventurer'),
      },
    ]

    const filteredApps = computed(() => {
      const q = query.value.trim().toLowerCase()
      return q ? apps.filter(a => a.label.toLowerCase().includes(q)) : apps
    })

    function launch(app: AppItem) {
      app.action()
      emit('close')
    }

    // Auto-focus search when modal opens
    watch(
      () => props.visible,
      async (val) => {
        if (val) {
          query.value = ''
          await nextTick()
          searchRef.value?.focus()
        }
      }
    )

    return { query, searchRef, filteredApps, launch }
  },
})
</script>

<style scoped>
/* ── Backdrop ── */
.app-launcher-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9990;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Modal box ── */
.app-launcher-modal {
  width: min(580px, 92vw);
  background: rgba(22, 20, 26, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 18px;
  box-shadow:
    0 32px 80px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(111, 25, 216, 0.15) inset;
  padding: 24px 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-family: 'Ubuntu', Inter, system-ui, sans-serif;
}

/* ── Header ── */
.launcher-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.launcher-title {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
}

.launcher-close {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  cursor: pointer;
  font-size: 0.75rem;
  transition: background 0.15s, color 0.15s;
  line-height: 1;
}

.launcher-close:hover {
  background: rgba(255, 80, 80, 0.18);
  color: #ff6b6b;
  border-color: rgba(255, 80, 80, 0.3);
}

/* ── Search ── */
.launcher-search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.3);
  pointer-events: none;
  line-height: 1;
}

.launcher-search {
  width: 100%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 10px 14px 10px 38px;
  color: #fff;
  font-size: 0.92rem;
  outline: none;
  box-sizing: border-box;
  font-family: inherit;
  transition: border-color 0.15s, background 0.15s;
}

.launcher-search::placeholder { color: rgba(255, 255, 255, 0.25); }
.launcher-search:focus {
  border-color: rgba(111, 25, 216, 0.65);
  background: rgba(255, 255, 255, 0.08);
}

/* ── Grid ── */
.launcher-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 10px;
}

/* ── App tile ── */
.launcher-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  padding: 16px 8px 12px;
  border-radius: 14px;
  cursor: pointer;
  transition: background 0.15s, transform 0.15s;
  border: 1px solid transparent;
}

.launcher-app:hover {
  background: rgba(111, 25, 216, 0.14);
  border-color: rgba(111, 25, 216, 0.3);
  transform: translateY(-2px);
}

.launcher-app:active { transform: scale(0.96); }

.launcher-app-icon {
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  display: grid;
  place-items: center;
  transition: background 0.15s, box-shadow 0.15s;
}

.launcher-app:hover .launcher-app-icon {
  background: rgba(111, 25, 216, 0.2);
  box-shadow: 0 8px 24px rgba(111, 25, 216, 0.35);
}

.launcher-app-img {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.launcher-app-label {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.75);
  text-align: center;
  line-height: 1.3;
  max-width: 96px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  transition: color 0.15s;
}

.launcher-app:hover .launcher-app-label { color: #fff; }

/* ── Transition ── */
.launcher-fade-enter-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.launcher-fade-leave-active {
  transition: opacity 0.13s ease, transform 0.13s ease;
}
.launcher-fade-enter-from {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}
.launcher-fade-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>