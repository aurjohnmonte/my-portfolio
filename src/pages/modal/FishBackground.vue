<template>
  <canvas ref="canvasRef" class="fish-bg"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

interface Fish {
  x: number; y: number
  baseY: number            // the depth the fish cruises at
  len: number              // body length in px
  dir: 1 | -1              // 1 = swims right, -1 = swims left
  speed: number            // px/s
  bobAmp: number; bobSpeed: number
  tailSpeed: number        // tail wag rate
  phase: number
  vy: number               // vertical push (from the cursor)
  boost: number            // temporary speed multiplier (startle)
  color: string
  alpha: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)

// ── Tweak these ──────────────────────────────
const MAX_FISH = 9
const FLEE_RADIUS = 130   // cursor distance that startles a fish
const FLEE_BOOST = 2.6    // speed burst when startled
const TOP_MARGIN = 80     // keep clear of the top bar
const BOTTOM_MARGIN = 130 // keep above the seagrass
const COLORS = ['162, 86, 255', '94, 224, 208', '255, 158, 203', '255, 196, 107']
// ─────────────────────────────────────────────

let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let last = 0
let w = 0
let h = 0
let fishes: Fish[] = []
const mouse = { x: -9999, y: -9999 }

const rand = (a: number, b: number) => a + Math.random() * (b - a)

function createFish(initial: boolean): Fish {
  const len = rand(18, 46)
  const dir: 1 | -1 = Math.random() < 0.5 ? 1 : -1
  const depth = len / 46 // 0..1: small = far away
  const baseY = rand(TOP_MARGIN, Math.max(TOP_MARGIN + 40, h - BOTTOM_MARGIN))
  return {
    // spawn off-screen on the side they swim in from (or anywhere on first load)
    x: initial ? rand(0, w) : dir === 1 ? -len * 2 : w + len * 2,
    y: baseY,
    baseY,
    len,
    dir,
    speed: rand(20, 40) + depth * 35,
    bobAmp: rand(4, 14),
    bobSpeed: rand(0.4, 1.0),
    tailSpeed: rand(5, 8),
    phase: rand(0, Math.PI * 2),
    vy: 0,
    boost: 1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: 0.45 + depth * 0.45, // far fish are fainter
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

  const count = Math.max(3, Math.min(MAX_FISH, Math.floor(w / 140)))
  fishes = Array.from({ length: count }, () => createFish(true))
}

function drawFish(f: Fish, time: number) {
  if (!ctx) return
  const L = f.len
  const wag = Math.sin(time * f.tailSpeed * f.boost + f.phase) * L * 0.16

  ctx.save()
  ctx.translate(f.x, f.y)
  ctx.scale(f.dir, 1) // flip so the nose points where it swims
  ctx.rotate(Math.sin(time * f.tailSpeed * 0.5 + f.phase) * 0.05) // body wiggle

  ctx.fillStyle = `rgba(${f.color}, ${f.alpha})`

  // tail (wags)
  ctx.beginPath()
  ctx.moveTo(-L * 0.3, 0)
  ctx.lineTo(-L * 0.62, -L * 0.22 + wag)
  ctx.lineTo(-L * 0.52, wag * 0.6)
  ctx.lineTo(-L * 0.62, L * 0.22 + wag)
  ctx.closePath()
  ctx.fill()

  // body
  ctx.beginPath()
  ctx.moveTo(L * 0.5, 0)
  ctx.bezierCurveTo(L * 0.35, -L * 0.3, -L * 0.1, -L * 0.28, -L * 0.35, -L * 0.04)
  ctx.lineTo(-L * 0.35, L * 0.04)
  ctx.bezierCurveTo(-L * 0.1, L * 0.28, L * 0.35, L * 0.3, L * 0.5, 0)
  ctx.closePath()
  ctx.fill()

  // top fin
  ctx.beginPath()
  ctx.moveTo(L * 0.12, -L * 0.2)
  ctx.lineTo(-L * 0.12, -L * 0.34 + wag * 0.15)
  ctx.lineTo(-L * 0.2, -L * 0.15)
  ctx.closePath()
  ctx.fillStyle = `rgba(${f.color}, ${f.alpha * 0.8})`
  ctx.fill()

  // eye
  ctx.beginPath()
  ctx.arc(L * 0.3, -L * 0.05, Math.max(1.2, L * 0.05), 0, Math.PI * 2)
  ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, f.alpha + 0.2)})`
  ctx.fill()

  ctx.restore()
}

function frame(now: number) {
  if (!ctx) return
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  const time = now / 1000
  ctx.clearRect(0, 0, w, h)

  for (let i = 0; i < fishes.length; i++) {
    const f = fishes[i]

    if(!f) {
        return;
    }

    // startle: dart away from the cursor
    const dx = f.x - mouse.x
    const dy = f.y - mouse.y
    const dist = Math.hypot(dx, dy)
    if (dist < FLEE_RADIUS) {
      const k = 1 - dist / FLEE_RADIUS
      f.boost = Math.max(f.boost, 1 + (FLEE_BOOST - 1) * k)
      f.vy += (dy / (dist || 1)) * k * 220 * dt
    }
    f.boost += (1 - f.boost) * (1 - Math.exp(-2 * dt)) // calm down
    f.vy *= Math.exp(-2.5 * dt)

    // pull back toward cruising depth, plus a gentle bob
    const bob = Math.sin(time * f.bobSpeed + f.phase) * f.bobAmp
    const targetY = Math.min(h - BOTTOM_MARGIN + 40, Math.max(TOP_MARGIN, f.baseY + bob))
    f.y += (targetY - f.y) * (1 - Math.exp(-3 * dt)) + f.vy * 60 * dt

    f.x += f.dir * f.speed * f.boost * dt

    // swam off the far side → respawn from the other side
    if ((f.dir === 1 && f.x > w + f.len * 2) || (f.dir === -1 && f.x < -f.len * 2)) {
      fishes[i] = createFish(false)
      continue
    }

    drawFish(f, time)
  }

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

  window.addEventListener('resize', resize)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    fishes.forEach(f => drawFish(f, 0)) // static, no loop
    return
  }

  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('touchmove', onTouch, { passive: true })
  window.addEventListener('touchend', onLeave)
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
  document.removeEventListener('mouseleave', onLeave)
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<style scoped>
.fish-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;            /* same layer as bubbles; seagrass (2) sits in front */
  pointer-events: none;  /* never blocks clicks or right-click */
}
</style>