<template>
  <canvas ref="canvasRef" class="bubble-bg"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

interface Bubble {
  x: number; y: number; r: number
  speed: number
  wobbleAmp: number; wobbleSpeed: number; phase: number
  px: number; py: number
  alpha: number
}

interface Pop {
  x: number; y: number; r: number
  age: number
  drops: { a: number; s: number }[]
}

const canvasRef = ref<HTMLCanvasElement | null>(null)

// ── Tweak these ──────────────────────────────
const REPEL_RADIUS = 150
const REPEL_FORCE = 2400
const DAMPING = 2.5
const MAX_BUBBLES = 45
const POP_PADDING = 30     // extra click forgiveness around a bubble (px)
const POP_DURATION = 0.35  // seconds
// ─────────────────────────────────────────────

// Only pop when the click lands on the empty desktop, not on icons/menus/modals
const POP_TARGET_CLASSES = ['desktop', 'wallpaper', 'desktop-icons', 'content-modal', 'bubble-bg']

let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let last = 0
let w = 0
let h = 0
let bubbles: Bubble[] = []
let pops: Pop[] = []
const mouse = { x: -9999, y: -9999 }
const TAU = Math.PI * 2

const rand = (a: number, b: number) => a + Math.random() * (b - a)

function createBubble(initial: boolean): Bubble {
  const r = rand(6, 26)
  return {
    x: rand(0, w),
    y: initial ? rand(0, h) : h + r + rand(0, 80),
    r,
    speed: rand(12, 35),
    wobbleAmp: rand(4, 14),
    wobbleSpeed: rand(0.5, 1.5),
    phase: rand(0, TAU),
    px: 0,
    py: 0,
    alpha: rand(0.25, 0.6),
  }
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  w = canvas.clientWidth
  h = canvas.clientHeight
  canvas.width = w * dpr
  canvas.height = h * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const count = Math.min(MAX_BUBBLES, Math.floor((w * h) / 30000))
  bubbles = Array.from({ length: count }, () => createBubble(true))
  pops = []
}

function draw(b: Bubble) {
  if (!ctx) return
  ctx.beginPath()
  ctx.arc(b.x, b.y, b.r, 0, TAU)
  ctx.fillStyle = `rgba(162, 86, 255, ${b.alpha * 0.15})`
  ctx.fill()
  ctx.strokeStyle = `rgba(200, 160, 255, ${b.alpha})`
  ctx.lineWidth = 1
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(b.x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.18, 0, TAU)
  ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.8})`
  ctx.fill()
}

// ── Pop effect ───────────────────────────────
function spawnPop(b: Bubble) {
  const count = 6
  const offset = rand(0, TAU)
  pops.push({
    x: b.x,
    y: b.y,
    r: b.r,
    age: 0,
    drops: Array.from({ length: count }, (_, i) => ({
      a: offset + (i / count) * TAU + rand(-0.25, 0.25),
      s: rand(0.8, 1.4),
    })),
  })
}

function drawPops(dt: number) {
  if (!ctx) return
  for (const p of pops) {
    p.age += dt
    const t = Math.min(p.age / POP_DURATION, 1)
    const ease = 1 - Math.pow(1 - t, 3)   // easeOutCubic
    const fade = 1 - t

    // expanding ring
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r * (1 + 0.6 * ease), 0, TAU)
    ctx.strokeStyle = `rgba(210, 170, 255, ${0.8 * fade})`
    ctx.lineWidth = 2 * fade + 0.5
    ctx.stroke()

    // flying droplets
    ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * fade})`
    for (const d of p.drops) {
      const dist = p.r * (0.8 + d.s * 1.6 * ease)
      ctx.beginPath()
      ctx.arc(
        p.x + Math.cos(d.a) * dist,
        p.y + Math.sin(d.a) * dist,
        Math.max(0.5, 2.2 * fade),
        0, TAU,
      )
      ctx.fill()
    }
  }
  pops = pops.filter(p => p.age < POP_DURATION)
}

function onClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null
  if (!target || !POP_TARGET_CLASSES.some(c => target.classList.contains(c))) return

  const rect = canvasRef.value?.getBoundingClientRect()
  if (!rect) return
  const cx = e.clientX - rect.left
  const cy = e.clientY - rect.top

  // pick the closest bubble within its (padded) radius
  let hit = -1
  let best = Infinity
  for (let i = 0; i < bubbles.length; i++) {
    const b = bubbles[i]
    const d = Math.hypot(b.x - cx, b.y - cy)
    if (d <= b.r + POP_PADDING && d < best) {
      best = d
      hit = i
    }
  }
  if (hit === -1) return

  spawnPop(bubbles[hit])
  bubbles[hit] = createBubble(false)   // respawn from the bottom
}

// ── Main loop ────────────────────────────────
function frame(now: number) {
  if (!ctx) return
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  ctx.clearRect(0, 0, w, h)

  const damp = Math.exp(-DAMPING * dt)

  for (let i = 0; i < bubbles.length; i++) {
    const b = bubbles[i]

    const dx = b.x - mouse.x
    const dy = b.y - mouse.y
    const dist = Math.hypot(dx, dy)
    const reach = REPEL_RADIUS + b.r
    if (dist < reach && dist > 0.001) {
      const f = 1 - dist / reach
      const accel = (f * f * REPEL_FORCE) / (b.r / 12)
      b.px += (dx / dist) * accel * dt
      b.py += (dy / dist) * accel * dt
    }
    b.px *= damp
    b.py *= damp

    const sway = Math.sin((now / 1000) * b.wobbleSpeed + b.phase) * b.wobbleAmp
    b.x += (sway + b.px) * dt
    b.y += (-b.speed + b.py) * dt

    if (b.y < -b.r * 2 || b.y > h + b.r * 4) bubbles[i] = createBubble(false)
    else if (b.x < -b.r * 2) b.x = w + b.r
    else if (b.x > w + b.r * 2) b.x = -b.r

    draw(bubbles[i])
  }

  drawPops(dt)

  raf = requestAnimationFrame(frame)
}

function start() {
  cancelAnimationFrame(raf)
  last = performance.now()
  raf = requestAnimationFrame(frame)
}

function onMove(e: MouseEvent) {
  const rect = canvasRef.value?.getBoundingClientRect()
  if (!rect) return
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
}
function onTouch(e: TouchEvent) {
  const rect = canvasRef.value?.getBoundingClientRect()
  const t = e.touches[0]
  if (!rect || !t) return
  mouse.x = t.clientX - rect.left
  mouse.y = t.clientY - rect.top
}
function onLeave() { mouse.x = mouse.y = -9999 }
function onVisibility() {
  document.hidden ? cancelAnimationFrame(raf) : start()
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  resize()

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bubbles.forEach(draw)
    return
  }

  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('touchmove', onTouch, { passive: true })
  window.addEventListener('touchend', onLeave)
  window.addEventListener('click', onClick)
  document.addEventListener('mouseleave', onLeave)
  document.addEventListener('visibilitychange', onVisibility)
  start()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('touchmove', onTouch)
  window.removeEventListener('touchend', onLeave)
  window.removeEventListener('click', onClick)
  document.removeEventListener('mouseleave', onLeave)
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<style scoped>
.bubble-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;            /* above wallpaper (0), below icons/topbar (10) */
  pointer-events: none;  /* never blocks clicks or right-click */
}
</style>