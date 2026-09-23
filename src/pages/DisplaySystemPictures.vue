```vue
<template>
  <div class="pictures-main-container">
    <div class="carousel">

      <!-- Image viewport -->
      <div class="image-viewport">

        <!-- Images -->
        <div
          class="image-track"
          :style="{
            transform: `translateX(-${currentIndex * 100}%)`
          }"
        >
          <div
            v-for="(image, index) in images"
            :key="index"
            class="image-slide"
          >
            <img
              :src="image"
              :alt="`System Screenshot ${index + 1}`"
              class="system-image"
              draggable="false"
            />
          </div>
        </div>

        <!-- Previous Button -->
        <button
          v-if="images.length > 1"
          class="carousel-button previous"
          @click="previousImage"
          :disabled="currentIndex === 0"
          aria-label="Previous screenshot"
        >
          <span>‹</span>
        </button>

        <!-- Next Button -->
        <button
          v-if="images.length > 1"
          class="carousel-button next"
          @click="nextImage"
          :disabled="currentIndex === images.length - 1"
          aria-label="Next screenshot"
        >
          <span>›</span>
        </button>

        <!-- Counter -->
        <div
          v-if="images.length > 0"
          class="image-counter"
        >
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>

        <!-- No Images -->
        <div
          v-if="images.length === 0"
          class="no-images"
        >
          No screenshots available.
        </div>

      </div>

      <!-- Dots -->
      <div
        v-if="images.length > 1"
        class="carousel-dots"
      >
        <button
          v-for="(image, index) in images"
          :key="index"
          class="dot"
          :class="{ active: currentIndex === index }"
          @click="goToImage(index)"
          :aria-label="`Go to screenshot ${index + 1}`"
        ></button>
      </div>

    </div>
  </div>
</template>


<script>
export default {

  props: {
    system_name: {
      type: String,
      required: true
    }
  },

  name: "DisplaySystemPictures",

  data() {
    return {
      screenshotModules: {},
      currentIndex: 0,
      images: []
    };
  },

  methods: {

    nextImage() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
      }
    },

    previousImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },

    goToImage(index) {
      this.currentIndex = index;
    },

    loadScreenshots() {

      switch (this.system_name) {

        case "ai-driven":

          this.screenshotModules = import.meta.glob(
            "../images/ai-driven/*.png",
            {
              eager: true,
              import: "default"
            }
          );

          break;
        
        case "inventory-qr":
            this.screenshotModules = import.meta.glob(
                                        "../images/transaction/*.png",
                                        {
                                        eager: true,
                                        import: "default"
                                        }
                                    );
          break;
        
        case "craftify":
            this.screenshotModules = import.meta.glob(
                                        "../images/craftify/*.png",
                                        {
                                        eager: true,
                                        import: "default"
                                        }
                                    );
            break;

        default:

          this.screenshotModules = {};

          break;
      }

      /*
       * Convert the object returned by import.meta.glob()
       * into an array of image URLs.
       */
      this.images = Object.values(this.screenshotModules);

      /*
       * Make sure the carousel always starts
       * at the first image.
       */
      this.currentIndex = 0;

      console.log("System:", this.system_name);
      console.log("Screenshots:", this.images);
      console.log("Number of screenshots:", this.images.length);
    }
  },

  mounted() {
    this.loadScreenshots();
  },

  watch: {

    /*
     * If the parent changes system_name,
     * load the new screenshots.
     */
    system_name() {
      this.loadScreenshots();
    }

  }

};
</script>


<style scoped>

.pictures-main-container {
  width: 100%;
  height: 100%;
  min-height: 400px;

  background: rgb(68, 68, 68);

  border-radius: 10px;

  overflow: hidden;

  position: relative;
}


/* =========================
   CAROUSEL
========================= */

.carousel {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  position: relative;
}


/* =========================
   IMAGE VIEWPORT
========================= */

.image-viewport {
  width: 100%;
  height: 100%;

  flex: 1;
  min-height: 0;

  overflow: hidden;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #f7f7f7;
}


/* =========================
   IMAGE TRACK
========================= */

.image-track {
  width: 100%;
  height: 100%;

  display: flex;

  transition:
    transform 0.55s cubic-bezier(0.65, 0, 0.35, 1);

  will-change: transform;
}


/* =========================
   INDIVIDUAL SLIDE
========================= */

.image-slide {
  min-width: 100%;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  box-sizing: border-box;
}


/* =========================
   SCREENSHOT
========================= */

.system-image {
  display: block;

  width: 100%;
  height: 100%;

  /*
   * IMPORTANT:
   *
   * contain makes sure the COMPLETE
   * screenshot is visible.
   *
   * Nothing gets cropped.
   */
  object-fit: contain;

  user-select: none;

  -webkit-user-drag: none;

  border-radius: 6px;

  filter:
    drop-shadow(
      0 5px 12px rgba(0, 0, 0, 0.12)
    );
}


/* =========================
   NAVIGATION BUTTONS
========================= */

.carousel-button {
  position: absolute;

  top: 50%;

  transform: translateY(-50%);

  width: 46px;
  height: 46px;

  border: none;

  border-radius: 50%;

  background: rgba(20, 20, 20, 0.55);

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  z-index: 5;

  backdrop-filter: blur(6px);

  transition:
    background 0.2s ease,
    transform 0.2s ease,
    opacity 0.2s ease;
}


.carousel-button span {
  font-size: 36px;

  font-weight: 300;

  line-height: 1;

  margin-top: -4px;
}


.carousel-button:hover:not(:disabled) {
  background: rgba(20, 20, 20, 0.8);

  transform:
    translateY(-50%)
    scale(1.08);
}


.carousel-button:active:not(:disabled) {
  transform:
    translateY(-50%)
    scale(0.95);
}


.carousel-button:disabled {
  opacity: 0.25;

  cursor: default;
}


.previous {
  left: 18px;
}


.next {
  right: 18px;
}


/* =========================
   DOTS
========================= */

.carousel-dots {
  position: absolute;

  bottom: 16px;

  left: 50%;

  transform: translateX(-50%);

  display: flex;

  align-items: center;

  gap: 8px;

  padding: 7px 11px;

  border-radius: 999px;

  background: rgba(0, 0, 0, 0.45);

  backdrop-filter: blur(8px);

  z-index: 6;

  /*
   * Prevent 17 dots from becoming
   * too wide on small screens.
   */
  max-width: calc(100% - 100px);

  overflow-x: auto;

  scrollbar-width: none;
}


.carousel-dots::-webkit-scrollbar {
  display: none;
}


.dot {
  flex-shrink: 0;

  width: 8px;
  height: 8px;

  padding: 0;

  border: none;

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.45);

  cursor: pointer;

  transition:
    width 0.25s ease,
    background 0.25s ease,
    transform 0.25s ease;
}


.dot:hover {
  transform: scale(1.2);
}


.dot.active {
  width: 22px;

  border-radius: 999px;

  background: white;
}


/* =========================
   COUNTER
========================= */

.image-counter {
  position: absolute;

  top: 14px;

  left: 50%;

  transform: translateX(-50%);

  padding: 5px 10px;

  border-radius: 999px;

  background: rgba(0, 0, 0, 0.45);

  color: white;

  font-size: 0.75rem;

  font-weight: 600;

  backdrop-filter: blur(6px);

  z-index: 6;
}


/* =========================
   NO IMAGES
========================= */

.no-images {
  position: absolute;

  inset: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  color: rgba(0, 0, 0, 0.5);

  font-size: 0.95rem;
}


/* =========================
   MOBILE
========================= */

@media (max-width: 720px) {

  .pictures-main-container {
    min-height: 300px;

    border-radius: 8px;
  }


  .image-slide {
    padding: 12px;
  }


  .carousel-button {
    width: 38px;
    height: 38px;
  }


  .carousel-button span {
    font-size: 30px;
  }


  .previous {
    left: 10px;
  }


  .next {
    right: 10px;
  }


  .carousel-dots {
    bottom: 10px;
  }

}

</style>
