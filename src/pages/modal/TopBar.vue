<template>
  <div class="topbar">
    <!-- Left: Activities -->
    <div class="topbar-left">
      <button class="topbar-activities" @click="$emit('toggle-activities')">
        <span class="activities-dot" />
        <span class="activities-dot" />
        <span class="activities-dot" />
        <span class="topbar-label">Activities</span>
      </button>
    </div>

    <!-- Center: App title (optional slot) -->
    <div class="topbar-center">
      <slot name="app-title" />
    </div>

    <!-- Right: Date + Time -->
    <div class="topbar-right">
      <div class="topbar-datetime">
        <span class="topbar-date">{{ formattedDate }}</span>
        <span class="topbar-time">{{ formattedTime }}</span>
      </div>

      <!-- System tray icons -->
      <div class="topbar-tray">
        <button class="tray-icon" title="Network">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
            <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
            <circle cx="12" cy="20" r="1" fill="currentColor"/>
          </svg>
        </button>
        <!-- <button class="tray-icon" title="Power">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
            <line x1="12" y1="2" x2="12" y2="12"/>
          </svg>
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  emits: ['toggle-activities'],

  data() {
    return {
      now: new Date(),
      ticker: null,
    }
  },

  computed: {
    formattedTime() {
      return this.now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    },
    formattedDate() {
      return this.now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
    },
  },

  mounted() {
    // Sync to the next full minute, then tick every 60s
    const msUntilNextMinute = (60 - this.now.getSeconds()) * 1000 - this.now.getMilliseconds()
    this.syncTimeout = setTimeout(() => {
      this.now = new Date()
      this.ticker = setInterval(() => { this.now = new Date() }, 60_000)
    }, msUntilNextMinute)
  },

  beforeUnmount() {
    clearTimeout(this.syncTimeout)
    clearInterval(this.ticker)
  },
}
</script>

<style scoped>
.topbar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px 0 4px;
  background: rgba(18, 17, 17, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 10;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.88);
  font-family: 'Ubuntu', 'Cantarell', sans-serif;
  user-select: none;
}

/* ── Left ── */
.topbar-left { display: flex; align-items: center; }

.topbar-activities {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  border-radius: 6px;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  transition: background 0.15s;
}
.topbar-activities:hover { background: rgba(255, 255, 255, 0.1); }
.topbar-activities:active { background: rgba(255, 255, 255, 0.15); }

.activities-dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  display: block;
}
.topbar-activities:hover .activities-dot { background: #fff; }

/* ── Center ── */
.topbar-center {
  position: absolute;
  left: 50%; transform: translateX(-50%);
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.75;
  pointer-events: none;
}

/* ── Right ── */
.topbar-right {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.topbar-datetime {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: default;
  transition: background 0.15s;
}
.topbar-datetime:hover { background: rgba(255, 255, 255, 0.1); }

.topbar-date {
  font-size: 0.85rem;
  opacity: 0.7;
  letter-spacing: 0.02em;
}
.topbar-time {
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  font-variant-numeric: tabular-nums;
}

/* ── Tray ── */
.topbar-tray {
  display: flex;
  align-items: center;
}

.tray-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px; height: 32px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.15s, color 0.15s;
}
.tray-icon:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
</style>