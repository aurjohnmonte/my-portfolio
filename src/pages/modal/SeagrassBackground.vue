<template>
  <canvas ref="canvasRef" class="seagrass-bg"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

interface Blade {
  x: number
  height: number
  width: number
  phase: number
  speed: number
  amp: number
  push: number // smoothed cursor push (px at the tip)
}

interface Layer {
  blades: Blade[]
  fill: string | CanvasGradient
}

const canvasRef = ref<HTMLCanvasElement | null>(null)

// ── Tweak these ──────────────────────────────
const SEGMENTS = 8            // smoothness of each blade (higher = smoother, heavier)
const BLADE_SPACING = 11      // px between blades per layer (higher = fewer blades)
const MAX_BLADES = 180        // hard cap across all layers
const WIND = 10               // constant lean (px at tip), gives a gentle current
const PUSH_RADIUS = 110       // how close the cursor must be to bend grass
const PUSH_FORCE = 45         // how far grass bends away from the cursor
const HEIGHT_RATIO = 1        // set to 0.7 for shorter grass, 1.3 for taller
// back → front: [min height, max height, top color, bottom color]
const LAYERS: [number, number, string, string][] = [
  [90, 170, 'rgba(46, 160, 150, 0.40)', 'rgba(14, 70, 90, 0.55)'],
  [60, 140, 'rgba(70, 200, 150, 0.55)', 'rgba(18, 95, 95, 0.70)'],
  [40, 105, 'rgba(120, 235, 160, 0.70)', 'rgba(22, 120, 100, 0.85)'],
]
// ─────────────────────────────────────────────

let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let last = 0
let w = 0
let h = 0
let layers: Layer[] = []
const mouse = { x: -9999, y: -9999 }

const rand = (a: number, b: number) => a + Math.random() * (b - a)

function build() {
  if (!ctx) return
  const perLayer = Math.min(
    Math.floor(w / BLADE_SPACING),
    Math.floor(MAX_BLADES / LAYERS.length),
  )

  layers = LAYERS.map(([minH, maxH, top, bottom]) => {
    const grad = ctx!.createLinearGradient(0, h, 0, 0)
    grad.addColorStop(0, bottom)
    grad.addColorStop(1, top)

    const blades: Blade[] = Array.from({ length: perLayer }, (_, i) => ({
      // evenly spread with jitter so it looks natural, not like a comb
      x: ((i + rand(0.1, 0.9)) / perLayer) * (w + 40) - 20,
      height: rand(minH, maxH) * HEIGHT_RATIO,
      width: rand(5, 11),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.6, 1.3),
      amp: rand(6, 16),
      push: 0,
    }))
    return { blades, fill: grad }
  })
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
  build()
}

function drawLayer(layer: Layer, time: number, dt: number) {
  if (!ctx) return
  const ease = 1 - Math.exp(-6 * dt)
  ctx.beginPath()

  for (const b of layer.blades) {
    // cursor push: bend away from the pointer when it's near this blade
    const dx = b.x - mouse.x
    const inY = mouse.y > h - b.height * 1.15
    let target = 0
    if (inY && Math.abs(dx) < PUSH_RADIUS) {
      target = Math.sign(dx || 1) * (1 - Math.abs(dx) / PUSH_RADIUS) * PUSH_FORCE
    }
    b.push += (target - b.push) * ease

    const t0 = time * b.speed + b.phase
    const left: number[] = []
    const right: number[] = []

    for (let s = 0; s <= SEGMENTS; s++) {
      const t = s / SEGMENTS
      const bend = Math.pow(t, 1.7) // base stays rooted, tip moves most
      const sway = Math.sin(t0 + t * 1.6) * b.amp + WIND + b.push
      const cx = b.x + sway * bend
      const cy = h - t * b.height
      const half = (b.width / 2) * Math.pow(1 - t, 0.75) // taper to a point
      left.push(cx - half, cy)
      right.push(cx + half, cy)
    }

    ctx.moveTo(left[0]!, left[1]!)
    for (let i = 2; i < left.length; i += 2) ctx.lineTo(left[i]!, left[i + 1]!)
    for (let i = right.length - 2; i >= 0; i -= 2) ctx.lineTo(right[i]!, right[i + 1]!)
    ctx.closePath()
  }

  ctx.fillStyle = layer.fill
  ctx.fill() // one fill per layer keeps it cheap
}

function frame(now: number) {
  if (!ctx) return
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  ctx.clearRect(0, 0, w, h)
  const time = now / 1000
  for (const layer of layers) drawLayer(layer, time, dt)
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
    // static frame, no animation loop
    ctx!.clearRect(0, 0, w, h)
    for (const layer of layers) drawLayer(layer, 0, 0)
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
.seagrass-bg {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 220px;          /* only the bottom strip is drawn = cheap */
  z-index: 2;             /* above bubbles (1), below icons/launcher/topbar (10) */
  pointer-events: none;   /* never blocks clicks or right-click */
}

@media (max-width: 768px) {
  .seagrass-bg { height: 160px; }
}
</style>