<template>
  <div
    class="about-page"
    :class="{ 'about-page--maximized': isMaximized }"
  >
    <div
      class="about-modal"
      :class="{ 'about-modal--maximized': isMaximized }"
    >
      <!-- Title Bar -->
      <div
        class="about-title-bar"
        @mousedown="startDrag"
        @touchstart="startDragTouch"
      >
        <div class="title-left"></div>

        <div class="title-text">About Me</div>

        <div class="title-actions">
          <span class="title-icon">
            <img
              src="../images/maximize.png"
              alt="Maximize"
              class="title-icon-img"
              @click.stop="toggleMaximize"
            />
          </span>

          <span class="title-icon">
            <img
              src="../images/remove.png"
              alt="Close"
              class="title-icon-img"
              @click.stop="$emit('close')"
            />
          </span>
        </div>
      </div>

      <!-- Scrollable Content -->
      <div class="about-card" @scroll="handleScroll">
        <!-- Hero -->
        <header class="about-header">
          <div class="profile-area">
            <div
              class="profile-circle"
              @click="showProfile"
            >
              <img
                src="../images/profile-pic2.jpg"
                alt="Aurjohn Cris C. Monte"
                class="profile-image"
              />
            </div>

            <div class="profile-copy">
              <div class="profile-eyebrow">ABOUT ME</div>

              <h2>Aurjohn Cris C. Monte</h2>

              <p class="profile-subtitle">
                Full Stack Developer
                <span class="profile-location">
                  • Cabadbaran, PH
                </span>
              </p>

              <p class="profile-intro">
                BSIT graduate focused on building practical,
                user-centered web applications and systems.
              </p>
            </div>
          </div>

          <!-- Main Project CTA -->
          <button
            class="projects-hero-button"
            @click="goToProjects"
          >
            <span class="projects-button-icon">↗</span>

            <span class="projects-button-content">
              <strong>View My Projects</strong>
              <small>Explore what I've built</small>
            </span>

            <span class="projects-button-arrow">→</span>
          </button>
        </header>

        <!-- Section Navigation -->
        <nav
          class="section-nav"
          aria-label="About sections"
        >
          <button
            :class="{ active: activeSection === 'about' }"
            @click="scrollToSection('about')"
          >
            About
          </button>

          <button
            :class="{ active: activeSection === 'skills' }"
            @click="scrollToSection('skills')"
          >
            Skills
          </button>

          <button
            :class="{ active: activeSection === 'experience' }"
            @click="scrollToSection('experience')"
          >
            Experience
          </button>

          <button
            :class="{ active: activeSection === 'certificates' }"
            @click="scrollToSection('certificates')"
          >
            Certificates
          </button>

          <button
            :class="{ active: activeSection === 'resume' }"
            @click="scrollToSection('resume')"
          >
            Resume
          </button>
        </nav>

        <main class="about-body">
          <!-- About -->
          <section
            id="about-section"
            class="section-block about-section"
          >
            <div class="section-heading">
              <span class="section-label">ABOUT ME</span>
            </div>

            <p class="about-description">
              A motivated and passionate BSIT graduate developer who
              loves to solve problems and build systems around them.
              Developed and deployed web-based systems that help
              users meet their needs.
            </p>
          </section>

          <div class="section-divider"></div>

          <!-- Skills -->
          <section
            id="skills-section"
            class="section-block"
          >
            <div class="section-heading">
              <span class="section-label">SKILLS</span>
            </div>

            <div class="chip-list">
              <span class="chip">Laravel</span>
              <span class="chip">Vue.js</span>
              <span class="chip">MySQL</span>
              <span class="chip">TailwindCSS</span>
              <span class="chip">Docker</span>
              <span class="chip">AWS</span>
              <span class="chip">Nginx</span>
              <span class="chip">Figma</span>
              <span class="chip">TypeScript</span>
              <span class="chip">GitLab</span>
              <span class="chip">Git</span>
              <span class="chip">CI/CD</span>
              <span class="chip">C#</span>
              <span class="chip">ASP.NET</span>
              <span class="chip">PHP</span>
              <span class="chip">JavaScript</span>
              <span class="chip">Cloud Deployment</span>
            </div>
          </section>

          <div class="section-divider"></div>

          <!-- Work Experience -->
          <section
            id="experience-section"
            class="section-block"
          >
            <div class="section-heading">
              <span class="section-label">WORK EXPERIENCE</span>
            </div>

            <div class="experience-list">
              <!-- Freelance -->
              <article class="experience-item">
                <div class="experience-header">
                  <div class="experience-title-group">
                    <span class="experience-role">
                      Freelance Web Developer
                    </span>

                    <span class="experience-company">
                      Self-employed
                    </span>
                  </div>

                  <span class="experience-period">
                    2024 – Present
                  </span>
                </div>

                <ul class="experience-bullets">
                  <li>
                    Developed and deployed capstone projects including
                    an AI-driven survey system, e-commerce platform,
                    and QR-based inventory system, improving data
                    accessibility and efficiency.
                  </li>

                  <li>
                    Built and deployed applications using PHP,
                    Laravel, JavaScript, Vue.js, and MySQL, with
                    Docker, Git/GitHub, and cloud platforms
                    (Contabo VPS).
                  </li>

                  <li>
                    Collaborated with clients and faculty to gather
                    requirements and deliver user-focused solutions.
                  </li>
                </ul>
              </article>

              <div class="experience-divider"></div>

              <!-- Document Controller -->
              <article class="experience-item">
                <div class="experience-header">
                  <div class="experience-title-group">
                    <span class="experience-role">
                      Document Controller
                    </span>

                    <span class="experience-company">
                      Manuel Jiao Santos Hospital - Butuan City
                    </span>
                  </div>

                  <span class="experience-period">
                    July - September 2026
                  </span>
                </div>

                <ul class="experience-bullets">
                  <li>
                    Managed and maintained controlled documents in
                    accordance with the organization's Quality
                    Management System (QMS), ensuring proper
                    revision, distribution, and document control.
                  </li>

                  <li>
                    Reviewed documents for completeness, accuracy,
                    and compliance with established quality procedures
                    before QA verification and approval.
                  </li>

                  <li>
                    Worked under the Quality Assurance (QA) function
                    and gained practical experience with ISO-based
                    quality management and document control procedures.
                  </li>
                </ul>
              </article>

              <div class="experience-divider"></div>

              <!-- Internship -->
              <article class="experience-item">
                <div class="experience-header">
                  <div class="experience-title-group">
                    <span class="experience-role">
                      Web Developer / IT Staff (Intern)
                    </span>

                    <span class="experience-company">
                      G-Hoven IT Solutions · Butuan City
                    </span>
                  </div>

                  <span class="experience-period">
                    Aug – Dec 2025
                  </span>
                </div>

                <ul class="experience-bullets">
                  <li>
                    Developed and deployed a visitor log system
                    enabling real-time data access from any location.
                  </li>

                  <li>
                    Assisted in the installation and configuration
                    of biometric attendance systems for government
                    agencies.
                  </li>
                </ul>
              </article>

              <div class="experience-divider"></div>

              <!-- Part-time -->
              <article class="experience-item">
                <div class="experience-header">
                  <div class="experience-title-group">
                    <span class="experience-role">
                      Encoder / Image Editor (Part-time)
                    </span>

                    <span class="experience-company">
                      PIXEL Workshop · Cabadbaran City
                    </span>
                  </div>

                  <span class="experience-period">
                    April – August 2024
                  </span>
                </div>

                <ul class="experience-bullets">
                  <li>
                    Encoded barangay documents, resumes, and other
                    official papers.
                  </li>

                  <li>
                    Edited and produced ID photos and other
                    image-based outputs for clients.
                  </li>
                </ul>
              </article>
            </div>
          </section>

          <div class="section-divider"></div>

          <!-- Certificates -->
          <section
            id="certificates-section"
            class="section-block section-certificates"
          >
            <div class="section-heading">
              <span class="section-label">CERTIFICATES</span>

              <span class="certificate-status">
                1 completed
              </span>
            </div>

            <div class="certificate-list">
              <article
                class="certificate-card"
                @click="openCertificate"
              >
                <div class="certificate-card-top">
                  <span class="certificate-badge">
                    Docker & AWS
                  </span>

                  <span class="certificate-date">
                    2026
                  </span>
                </div>

                <h3>
                  Docker, Kubernetes & AWS: Real-World Deployment
                  in 25 Days | Udemy
                </h3>

                <p class="certificate-instructors">
                  Instructors: Jannis Seemann, Andreas Kansy
                </p>

                <p>
                  Completed online course in Udemy for containerized
                  deployment and scalable cloud hosting.
                </p>

                <p>
                  Length: 32 total hours
                </p>

                <p>
                  Date of Completion: July 3, 2026
                </p>

                <div class="certificate-completion">
                  <div class="certificate-bar">
                    <div class="certificate-fill"></div>
                  </div>

                  <span class="certificate-complete-label">
                    Completed
                  </span>
                </div>
              </article>
            </div>
          </section>

          <div class="section-divider"></div>

          <!-- Resume -->
          <section
            id="resume-section"
            class="section-block resume-section"
          >
            <div class="section-heading">
              <span class="section-label">RESUME</span>
            </div>

            <div class="resume-content">
              <p>
                Want a more detailed look at my experience,
                skills, and background?
              </p>

              <button
                class="secondary-button"
                @click="goNavigate('resume')"
              >
                View My Resume →
              </button>
            </div>
          </section>

          <!-- Contact -->
          <div class="section-divider"></div>

          <section class="section-block">
            <div class="section-heading">
              <span class="section-label">GET IN TOUCH</span>
            </div>

            <div class="contact-info">
              <div class="contact-item">
                <span class="contact-icon">
                  <img
                    src="../images/communication.png"
                    alt="Email"
                  />
                </span>

                <span class="contact-text">
                  aurjohnmonte2003@gmail.com
                </span>
              </div>

              <div class="contact-item">
                <span class="contact-icon">
                  <img
                    src="../images/mobile.png"
                    alt="Phone"
                  />
                </span>

                <span class="contact-text">
                  +63 9511815496
                </span>
              </div>
            </div>

            <div class="button-row">
              <button
                class="ghost-button"
                @click="goNavigate('github')"
              >
                GitHub
              </button>

              <button
                class="ghost-button"
                @click="goNavigate('gitlab')"
              >
                GitLab
              </button>

              <button
                class="ghost-button"
                @click="goNavigate('linkedin')"
              >
                LinkedIn
              </button>

              <button
                class="ghost-button"
                @click="goNavigate('upwork')"
              >
                Upwork
              </button>

              <button
                class="ghost-button"
                @click="goNavigate('facebook')"
              >
                Facebook
              </button>

              <button
                class="ghost-button"
                @click="goNavigate('instagram')"
              >
                Instagram
              </button>

              <button
                class="ghost-button"
                @click="goNavigate('docker-hub')"
              >
                Docker Hub
              </button>
            </div>
          </section>

          <!-- Bottom Project CTA -->
          <div class="bottom-project-cta">
            <div class="bottom-project-copy">
              <strong>Want to see what I can build?</strong>

              <span>
                Explore my projects and applications.
              </span>
            </div>

            <button
              class="primary-button"
              @click="goToProjects"
            >
              View My Projects →
            </button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AboutMe',

  data() {
    return {
      showprofilepic: false,

      isDragging: false,
      hasMoved: false,

      startX: 0,
      startY: 0,

      dragOffsetX: 0,
      dragOffsetY: 0,

      modalX: 0,
      modalY: 0,

      isDragged: false,

      isMaximized: window.innerWidth <= 768,

      activeSection: 'about',
    };
  },

  mounted() {
    window.addEventListener('resize', this.handleResize);
  },

  beforeUnmount() {
    this.stopDrag();
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    showProfile() {
      this.$emit('showProfile');
    },

    handleResize() {
      if (window.innerWidth <= 768 && !this.isMaximized) {
        this.isMaximized = true;
        this.resetModalPosition();
      }
    },

    toggleMaximize() {
      this.isMaximized = !this.isMaximized;

      this.$emit('maximize', this.isMaximized);

      this.resetModalPosition();
    },

    resetModalPosition() {
      this.isDragged = false;
      this.modalX = 0;
      this.modalY = 0;

      const modal = this.$el.querySelector(
        '.about-modal'
      ) as HTMLElement;

      if (!modal) return;

      modal.style.transform = '';
      modal.style.left = '';
      modal.style.top = '';
      modal.style.position = '';
      modal.style.margin = '';
    },

    startDrag(e: MouseEvent) {
      if (this.isMaximized) return;

      this.isDragging = true;
      this.hasMoved = false;

      this.startX = e.clientX;
      this.startY = e.clientY;

      const modal = this.$el.querySelector(
        '.about-modal'
      ) as HTMLElement;

      if (!modal) return;

      const rect = modal.getBoundingClientRect();

      this.dragOffsetX = e.clientX - rect.left;
      this.dragOffsetY = e.clientY - rect.top;

      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.stopDrag);
    },

    startDragTouch(e: TouchEvent) {
      if (this.isMaximized) return;

      const touch = e.touches[0];

      if (!touch) return;

      this.isDragging = true;
      this.hasMoved = false;

      this.startX = touch.clientX;
      this.startY = touch.clientY;

      const modal = this.$el.querySelector(
        '.about-modal'
      ) as HTMLElement;

      if (!modal) return;

      const rect = modal.getBoundingClientRect();

      this.dragOffsetX = touch.clientX - rect.left;
      this.dragOffsetY = touch.clientY - rect.top;

      document.addEventListener(
        'touchmove',
        this.onDragTouch,
        { passive: false }
      );

      document.addEventListener(
        'touchend',
        this.stopDrag
      );
    },

    onDrag(e: MouseEvent) {
      if (!this.isDragging) return;

      const dx = e.clientX - this.startX;
      const dy = e.clientY - this.startY;

      if (
        !this.hasMoved &&
        Math.sqrt(dx * dx + dy * dy) < 5
      ) {
        return;
      }

      const modal = this.$el.querySelector(
        '.about-modal'
      ) as HTMLElement;

      if (!modal) return;

      if (!this.hasMoved) {
        this.hasMoved = true;
        this.isDragged = true;

        const rect = modal.getBoundingClientRect();

        modal.style.position = 'fixed';
        modal.style.margin = '0';
        modal.style.left = `${rect.left}px`;
        modal.style.top = `${rect.top}px`;
      }

      modal.style.left =
        `${e.clientX - this.dragOffsetX}px`;

      modal.style.top =
        `${e.clientY - this.dragOffsetY}px`;
    },

    onDragTouch(e: TouchEvent) {
      if (!this.isDragging) return;

      const touch = e.touches[0];

      if (!touch) return;

      e.preventDefault();

      const dx = touch.clientX - this.startX;
      const dy = touch.clientY - this.startY;

      if (
        !this.hasMoved &&
        Math.sqrt(dx * dx + dy * dy) < 5
      ) {
        return;
      }

      const modal = this.$el.querySelector(
        '.about-modal'
      ) as HTMLElement;

      if (!modal) return;

      if (!this.hasMoved) {
        this.hasMoved = true;
        this.isDragged = true;

        const rect = modal.getBoundingClientRect();

        modal.style.position = 'fixed';
        modal.style.margin = '0';
        modal.style.left = `${rect.left}px`;
        modal.style.top = `${rect.top}px`;
      }

      modal.style.left =
        `${touch.clientX - this.dragOffsetX}px`;

      modal.style.top =
        `${touch.clientY - this.dragOffsetY}px`;
    },

    stopDrag() {
      this.isDragging = false;

      document.removeEventListener(
        'mousemove',
        this.onDrag
      );

      document.removeEventListener(
        'mouseup',
        this.stopDrag
      );

      document.removeEventListener(
        'touchmove',
        this.onDragTouch
      );

      document.removeEventListener(
        'touchend',
        this.stopDrag
      );
    },

    scrollToSection(section: string) {
      const container = this.$el.querySelector(
        '.about-card'
      ) as HTMLElement;

      const nav = this.$el.querySelector(
        '.section-nav'
      ) as HTMLElement;

      const sectionMap: Record<string, string> = {
        about: '#about-section',
        skills: '#skills-section',
        experience: '#experience-section',
        certificates: '#certificates-section',
        resume: '#resume-section',
      };

      const selector = sectionMap[section];

      if (!container || !selector) return;

      const target = this.$el.querySelector(
        selector
      ) as HTMLElement;

      if (!target) return;

      const containerRect =
        container.getBoundingClientRect();

      const targetRect =
        target.getBoundingClientRect();

      // Clear space for the sticky nav (its own height) plus
      // a small breathing-room gap, instead of a fixed guess.
      const navClearance =
        (nav ? nav.getBoundingClientRect().height : 60) + 16;

      const offset =
        targetRect.top -
        containerRect.top +
        container.scrollTop -
        navClearance;

      container.scrollTo({
        top: Math.max(0, offset),
        behavior: 'smooth',
      });

      this.activeSection = section;
    },

    handleScroll() {
      const container = this.$el.querySelector(
        '.about-card'
      ) as HTMLElement;

      if (!container) return;

      const sections = [
        {
          name: 'about',
          selector: '#about-section',
        },
        {
          name: 'skills',
          selector: '#skills-section',
        },
        {
          name: 'experience',
          selector: '#experience-section',
        },
        {
          name: 'certificates',
          selector: '#certificates-section',
        },
        {
          name: 'resume',
          selector: '#resume-section',
        },
      ];

      const containerTop =
        container.getBoundingClientRect().top;

      let currentSection = 'about';

      sections.forEach((section) => {
        const element = this.$el.querySelector(
          section.selector
        ) as HTMLElement;

        if (!element) return;

        const distance =
          element.getBoundingClientRect().top -
          containerTop;

        if (distance <= 140) {
          currentSection = section.name;
        }
      });

      this.activeSection = currentSection;
    },

    goToProjects() {
      this.$router.push('/?action=view-projects');
    },

    openCertificate() {
      // Add certificate viewer behavior here when needed.
    },

    goNavigate(platform: string) {
      let url = '';

      switch (platform) {
        case 'gitlab':
          url =
            'https://gitlab.com/aurjohnmonte2003';
          break;

        case 'github':
          url =
            'https://github.com/aurjohnmonte';
          break;

        case 'email':
          url =
            'https://mail.google.com/mail/?view=cm&fs=1&to=aurjohnmonte2003@gmail.com';
          break;

        case 'instagram':
          url =
            'https://www.instagram.com/aurjohn.monte/';
          break;

        case 'facebook':
          url =
            'https://www.facebook.com/aurjohn.monte.75/';
          break;

        case 'upwork':
          url =
            'https://www.upwork.com/freelancers/~01b9c8e7a1c3f0d9e5';
          break;

        case 'linkedin':
          url =
            'https://www.linkedin.com/in/aurjohn-cris-c-monte-694a3024a/';
          break;

        case 'resume':
          url =
            'https://drive.google.com/file/d/1rG7m38nlhvralMQB1yVowLM9M6WgrKWE/view';
          break;

        case 'docker-hub':
          url =
            'https://hub.docker.com/u/aurjohnmonte';
          break;
      }

      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    },
  },
};
</script>

<style scoped>
/* =========================================================
   RESET
   ========================================================= */

.about-page,
.about-page *,
.about-page *::before,
.about-page *::after {
  box-sizing: border-box;
}

/* =========================================================
   PAGE / MODAL
   ========================================================= */

.about-page {
  min-height: 100vh;

  display: flex;
  justify-content: center;

  margin-top: 50px;

  pointer-events: none;
}

.about-modal {
  width: min(100%, 780px);
  max-width: 780px;

  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;

  overflow: hidden;

  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.35);

  background: rgba(24, 14, 45, 0.96);

  max-height: 80vh;

  margin-top: 50px;

  pointer-events: all;
}

/* =========================================================
   TITLE BAR
   ========================================================= */

.about-title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 16px;

  padding: 14px 18px;

  border-bottom:
    1px solid rgba(255, 255, 255, 0.08);

  background:
    rgba(255, 255, 255, 0.03);

  cursor: grab;

  user-select: none;
}

.about-title-bar:active {
  cursor: grabbing;
}

.title-left {
  width: 48px;
  min-width: 48px;
}

.title-text {
  flex: 1;

  text-align: center;

  font-size: 0.95rem;

  color:
    rgba(255, 255, 255, 0.7);

  letter-spacing: 0.16em;

  text-transform: uppercase;
}

.title-actions {
  display: flex;

  align-items: center;

  gap: 10px;

  width: 48px;

  justify-content: flex-end;
}

.title-icon {
  display: flex;

  align-items: center;
  justify-content: center;
}

.title-icon-img {
  width: 17px;
  height: 17px;

  border-radius: 4px;

  cursor: pointer;

  opacity: 0.8;

  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.title-icon-img:hover {
  opacity: 1;

  transform: scale(1.08);
}

/* =========================================================
   SCROLL CONTAINER
   ========================================================= */

.about-card {
  height: auto;

  max-height: calc(80vh - 58px);

  overflow-y: auto;
  overflow-x: hidden;

  padding: 0 30px 28px;

  scrollbar-width: thin;

  scrollbar-color:
    rgba(255, 255, 255, 0.16)
    rgba(255, 255, 255, 0.04);
}

.about-card::-webkit-scrollbar {
  width: 10px;
}

.about-card::-webkit-scrollbar-track {
  background:
    rgba(255, 255, 255, 0.04);

  border-radius: 999px;
}

.about-card::-webkit-scrollbar-thumb {
  background:
    rgba(255, 255, 255, 0.16);

  border-radius: 999px;

  border: 2px solid transparent;

  background-clip: padding-box;
}

/* =========================================================
   HERO
   ========================================================= */

.about-header {
  display: flex;
  align-items: center;

  justify-content: space-between;

  gap: 24px;

  margin-top: 34px;
  margin-bottom: 28px;
}

.profile-area {
  display: flex;

  align-items: center;

  gap: 24px;

  flex: 1;

  min-width: 0;
}

.profile-circle {
  flex: 0 0 96px;

  width: 96px;
  height: 96px;

  border-radius: 50%;

  overflow: hidden;

  box-shadow:
    inset 0 0 0 2px
    rgba(255, 255, 255, 0.08);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.profile-circle:hover {
  transform: scale(1.03);

  box-shadow:
    0 0 0 3px
    rgba(163, 86, 255, 0.2);
}

.profile-image {
  width: 100%;
  height: 100%;

  object-fit: cover;

  border-radius: 50%;
}

.profile-copy {
  flex: 1;

  min-width: 0;
}

.profile-eyebrow {
  margin-bottom: 8px;

  color:
    rgba(163, 86, 255, 0.9);

  font-size: 0.72rem;

  font-weight: 700;

  letter-spacing: 0.18em;
}

.profile-copy h2 {
  margin: 0;

  font-size: clamp(1.5rem, 2vw, 2rem);

  letter-spacing: -0.03em;

  color: #f4f0ff;
}

.profile-subtitle {
  margin: 9px 0 0;

  color:
    rgba(255, 255, 255, 0.66);

  font-size: 0.95rem;
}

.profile-location {
  color:
    rgba(255, 255, 255, 0.4);
}

.profile-intro {
  max-width: 460px;

  margin: 12px 0 0;

  color:
    rgba(255, 255, 255, 0.58);

  font-size: 0.9rem;

  line-height: 1.7;
}

/* =========================================================
   PROJECT CTA
   ========================================================= */

.projects-hero-button {
  display: flex;

  align-items: center;

  gap: 14px;

  width: 240px;

  flex-shrink: 0;

  align-self: center;

  padding: 15px 18px;

  border:
    1px solid rgba(163, 86, 255, 0.45);

  border-radius: 16px;

  background:
    linear-gradient(
      135deg,
      rgba(163, 86, 255, 0.22),
      rgba(127, 80, 232, 0.12)
    );

  color: #fff;

  cursor: pointer;

  text-align: left;

  box-shadow:
    0 12px 30px
    rgba(163, 86, 255, 0.18);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.projects-hero-button:hover {
  transform: translateY(-3px);

  border-color:
    rgba(163, 86, 255, 0.8);

  box-shadow:
    0 18px 40px
    rgba(163, 86, 255, 0.28);
}

.projects-button-icon {
  width: 36px;
  height: 36px;

  display: flex;

  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 10px;

  background:
    rgba(163, 86, 255, 0.25);

  font-size: 1.1rem;
}

.projects-button-content {
  min-width: 0;
}

.projects-hero-button strong {
  display: block;

  font-size: 0.9rem;

  font-weight: 700;

  white-space: nowrap;
}

.projects-hero-button small {
  display: block;

  margin-top: 3px;

  color:
    rgba(255, 255, 255, 0.55);

  font-size: 0.72rem;

  white-space: nowrap;
}

.projects-button-arrow {
  margin-left: auto;

  font-size: 1.1rem;

  transition:
    transform 0.2s ease;
}

.projects-hero-button:hover
.projects-button-arrow {
  transform: translateX(4px);
}

/* =========================================================
   SECTION NAVIGATION
   ========================================================= */

.section-nav {
  position: sticky;

  top: 0;

  z-index: 20;

  display: flex;

  align-items: stretch;

  gap: 6px;

  width: 100%;

  margin-bottom: 30px;

  padding: 7px;

  border:
    1px solid rgba(255, 255, 255, 0.08);

  border-radius: 14px;

  background:
    rgba(24, 14, 45, 0.98);

  backdrop-filter: blur(16px);

  overflow-x: auto;

  scrollbar-width: none;
}

.section-nav::-webkit-scrollbar {
  display: none;
}

.section-nav button {
  flex: 1 1 0;

  min-width: 0;

  white-space: nowrap;

  text-align: center;

  padding: 10px 15px;

  border: none;

  border-radius: 9px;

  background: transparent;

  color:
    rgba(255, 255, 255, 0.5);

  font-size: 0.8rem;

  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.section-nav button:hover {
  color: #fff;

  background:
    rgba(255, 255, 255, 0.06);
}

.section-nav button.active {
  color: #fff;

  background:
    rgba(163, 86, 255, 0.2);

  box-shadow:
    inset 0 0 0 1px
    rgba(163, 86, 255, 0.25);
}

/* =========================================================
   BODY / SECTIONS
   ========================================================= */

.about-body {
  display: flex;

  flex-direction: column;

  gap: 26px;
}

.section-block {
  display: flex;

  flex-direction: column;

  gap: 18px;

  scroll-margin-top: 90px;
}

.section-heading {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 12px;
}

.section-label {
  font-size: 0.82rem;

  letter-spacing: 0.2em;

  text-transform: uppercase;

  color:
    rgba(255, 255, 255, 0.48);
}

.about-description {
  margin: 0;

  max-width: 640px;

  color:
    rgba(255, 255, 255, 0.72);

  line-height: 1.9;

  font-size: 0.95rem;
}

.section-divider {
  height: 1px;

  width: 100%;

  background:
    rgba(255, 255, 255, 0.08);
}

/* =========================================================
   SKILLS
   ========================================================= */

.chip-list {
  display: flex;

  flex-wrap: wrap;

  gap: 12px;
}

.chip {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  padding: 10px 16px;

  border:
    1px solid rgba(255, 255, 255, 0.12);

  border-radius: 999px;

  color: #ece9ff;

  background:
    rgba(255, 255, 255, 0.03);

  font-size: 0.88rem;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.chip:hover {
  transform: translateY(-2px);

  background:
    rgba(163, 86, 255, 0.1);

  border-color:
    rgba(163, 86, 255, 0.3);
}

/* =========================================================
   EXPERIENCE
   ========================================================= */

.experience-list {
  display: flex;

  flex-direction: column;

  gap: 0;
}

.experience-item {
  display: flex;

  flex-direction: column;

  gap: 12px;

  padding: 18px 0;
}

.experience-item:first-child {
  padding-top: 0;
}

.experience-divider {
  height: 1px;

  background:
    rgba(255, 255, 255, 0.06);
}

.experience-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 12px;

  flex-wrap: wrap;
}

.experience-title-group {
  display: flex;

  flex-direction: column;

  gap: 4px;
}

.experience-role {
  font-size: 0.95rem;

  font-weight: 600;

  color: #f4f0ff;
}

.experience-company {
  font-size: 0.85rem;

  color:
    rgba(255, 255, 255, 0.5);
}

.experience-period {
  font-size: 0.82rem;

  color:
    rgba(163, 86, 255, 0.9);

  white-space: nowrap;

  padding: 3px 10px;

  border-radius: 999px;

  background:
    rgba(163, 86, 255, 0.1);

  border:
    1px solid rgba(163, 86, 255, 0.2);

  flex-shrink: 0;
}

.experience-bullets {
  margin: 0;

  padding-left: 18px;

  display: flex;

  flex-direction: column;

  gap: 7px;
}

.experience-bullets li {
  font-size: 0.9rem;

  color:
    rgba(255, 255, 255, 0.65);

  line-height: 1.7;
}

/* =========================================================
   CERTIFICATES
   ========================================================= */

.certificate-status {
  color:
    rgba(255, 255, 255, 0.58);

  font-size: 0.9rem;
}

.certificate-list {
  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(260px, 1fr));

  gap: 14px;
}

.certificate-card {
  padding: 20px;

  border-radius: 22px;

  background:
    rgba(255, 255, 255, 0.04);

  border:
    1px solid rgba(255, 255, 255, 0.08);

  box-shadow:
    0 18px 35px
    rgba(0, 0, 0, 0.12);

  cursor: pointer;

  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.certificate-card:hover {
  transform: translateY(-3px);

  background:
    rgba(255, 255, 255, 0.06);

  border-color:
    rgba(163, 86, 255, 0.25);
}

.certificate-card-top {
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 12px;
}

.certificate-badge {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  padding: 6px 12px;

  border-radius: 999px;

  background:
    rgba(163, 86, 255, 0.18);

  color: #d8c9ff;

  font-size: 0.78rem;

  font-weight: 600;

  letter-spacing: 0.04em;

  text-transform: uppercase;
}

.certificate-date {
  color:
    rgba(255, 255, 255, 0.58);

  font-size: 0.85rem;
}

.certificate-card h3 {
  margin: 18px 0 8px;

  color: #f4f0ff;

  font-size: 1rem;

  line-height: 1.5;
}

.certificate-card p {
  margin: 8px 0 0;

  color:
    rgba(255, 255, 255, 0.68);

  line-height: 1.75;

  font-size: 0.93rem;
}

.certificate-instructors {
  font-weight: 600;
}

.certificate-completion {
  margin-top: 16px;
}

.certificate-bar {
  width: 100%;

  height: 10px;

  border-radius: 999px;

  background:
    rgba(255, 255, 255, 0.08);

  overflow: hidden;
}

.certificate-fill {
  width: 100%;

  height: 100%;

  background:
    linear-gradient(
      90deg,
      #a356ff 0%,
      #7f50e8 100%
    );
}

.certificate-complete-label {
  display: block;

  margin-top: 7px;

  color:
    rgba(163, 86, 255, 0.9);

  font-size: 0.78rem;

  font-weight: 600;
}

/* =========================================================
   RESUME
   ========================================================= */

.resume-content {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  padding: 20px;

  border-radius: 16px;

  background:
    rgba(255, 255, 255, 0.03);

  border:
    1px solid rgba(255, 255, 255, 0.07);
}

.resume-content p {
  margin: 0;

  max-width: 380px;

  color:
    rgba(255, 255, 255, 0.65);

  line-height: 1.6;
}

.resume-content .secondary-button {
  flex-shrink: 0;

  white-space: nowrap;
}

/* =========================================================
   CONTACT
   ========================================================= */

.contact-info {
  display: flex;

  flex-direction: column;

  gap: 10px;
}

.contact-item {
  display: flex;

  align-items: center;

  gap: 12px;

  color:
    rgba(255, 255, 255, 0.78);

  font-size: 0.95rem;
}

.contact-icon {
  width: 18px;
  height: 18px;

  min-width: 18px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 4px;
}

.contact-icon img {
  width: 18px;
  height: 18px;

  object-fit: contain;
}

.contact-text {
  word-break: break-word;
}

.button-row {
  display: flex;

  flex-wrap: wrap;

  gap: 12px;
}

.button-row .ghost-button {
  flex: 1 1 calc(25% - 9px);

  min-width: 130px;

  text-align: center;
}

/* =========================================================
   BUTTONS
   ========================================================= */

.ghost-button,
.primary-button,
.secondary-button {
  border-radius: 12px;

  padding: 12px 18px;

  font-size: 0.94rem;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.ghost-button {
  min-width: 0;

  background:
    rgba(255, 255, 255, 0.05);

  color: #f4f0ff;

  border:
    1px solid rgba(255, 255, 255, 0.09);
}

.ghost-button:hover {
  transform: translateY(-1px);

  background:
    rgba(255, 255, 255, 0.1);
}

.primary-button {
  border: none;

  background: #a356ff;

  color: #fff;

  box-shadow:
    0 12px 28px
    rgba(163, 86, 255, 0.24);
}

.primary-button:hover {
  transform: translateY(-2px);

  background: #8f49f0;

  box-shadow:
    0 16px 34px
    rgba(163, 86, 255, 0.3);
}

.secondary-button {
  background:
    rgba(255, 255, 255, 0.07);

  color: #f4f0ff;

  border:
    1px solid rgba(255, 255, 255, 0.1);
}

.secondary-button:hover {
  transform: translateY(-1px);

  background:
    rgba(255, 255, 255, 0.11);
}

/* =========================================================
   BOTTOM PROJECT CTA
   ========================================================= */

.bottom-project-cta {
  position: sticky;

  bottom: 16px;

  z-index: 30;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  margin-top: 20px;

  padding: 16px 20px;

  border:
    1px solid rgba(163, 86, 255, 0.22);

  border-radius: 16px;

  background:
    rgba(24, 14, 45, 0.9);

  backdrop-filter: blur(18px);

  box-shadow:
    0 -10px 35px
    rgba(0, 0, 0, 0.12);
}

.bottom-project-copy {
  min-width: 0;
}

.bottom-project-copy strong {
  display: block;

  color: #fff;

  font-size: 0.9rem;
}

.bottom-project-copy span {
  display: block;

  margin-top: 3px;

  color:
    rgba(255, 255, 255, 0.48);

  font-size: 0.75rem;
}

.bottom-project-cta .primary-button {
  flex-shrink: 0;

  min-width: 190px;

  text-align: center;
}

/* =========================================================
   MAXIMIZED
   ========================================================= */

.about-page.about-page--maximized {
  width: 100%;

  height: 100vh;

  min-height: 100vh;

  margin: 0;

  padding: 0;

  align-items: flex-start;

  justify-content: flex-start;
}

.about-modal.about-modal--maximized {
  width: 100%;

  max-width: none;

  height: 100vh;

  max-height: none;

  margin: 0;

  border-radius: 0;

  border: none;

  box-shadow: none;

  overflow: hidden;
}

.about-page--maximized .about-card {
  width: min(1000px, calc(100% - 80px));

  max-width: 1000px;

  height: calc(100vh - 58px);

  max-height: none;

  margin: 0 auto;

  padding: 0 48px 28px;

  overflow-y: auto;
}

.about-page--maximized .about-header {
  padding: 0 0 38px;

  margin-top: 72px;
  margin-bottom: 10px;
}

.about-page--maximized .profile-circle {
  flex: 0 0 130px;

  width: 130px;
  height: 130px;
}

.about-page--maximized .profile-copy h2 {
  font-size: clamp(2rem, 3vw, 2.75rem);
}

.about-page--maximized .profile-subtitle {
  font-size: 1.15rem;
}

.about-page--maximized .profile-intro {
  max-width: 520px;

  font-size: 1.05rem;

  line-height: 1.8;
}

.about-page--maximized .projects-hero-button {
  width: 270px;

  padding: 18px 20px;
}

.about-page--maximized .projects-button-icon {
  width: 42px;
  height: 42px;
}

.about-page--maximized
.projects-hero-button strong {
  font-size: 1rem;
}

.about-page--maximized
.projects-hero-button small {
  font-size: 0.8rem;
}

.about-page--maximized .about-description {
  max-width: 720px;

  font-size: 1.08rem;

  line-height: 2;
}

.about-page--maximized .section-label {
  font-size: 0.9rem;
}

.about-page--maximized .chip {
  padding: 12px 18px;

  font-size: 0.95rem;
}

.about-page--maximized .experience-role {
  font-size: 1.15rem;
}

.about-page--maximized .experience-company {
  font-size: 0.95rem;
}

.about-page--maximized
.experience-bullets li {
  font-size: 1rem;

  line-height: 1.8;
}

.about-page--maximized .certificate-card {
  padding: 28px;
}

.about-page--maximized
.certificate-card h3 {
  font-size: 1.2rem;
}

.about-page--maximized
.certificate-card p {
  font-size: 1rem;
}

/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1000px) {
  .about-page--maximized .about-card {
    width: min(100%, calc(100% - 40px));

    padding-left: 30px;
    padding-right: 30px;
  }
}

@media (max-width: 860px) {
  .about-page {
    padding: 16px;

    padding-top: 0;

    align-items: flex-start;

    margin-top: 40px;
  }

  .about-modal {
    max-width: 100%;

    border-radius: 22px;
  }

  .about-title-bar {
    padding: 14px 16px;
  }

  .about-card {
    padding: 0 18px 24px;

    max-height: 60vh;
  }

  .about-header {
    flex-direction: column;

    justify-content: center;

    text-align: center;

    gap: 22px;

    margin-top: 24px;
  }

  .about-page--maximized .about-header {
    margin-top: 30px;
  }

  .profile-area {
    flex-direction: column;

    justify-content: center;

    text-align: center;

    width: 100%;
  }

  .profile-circle {
    margin: 0 auto;
  }

  .profile-copy {
    width: 100%;

    min-width: 0;
  }

  .profile-copy h2 {
    font-size: 1.8rem;
  }

  .profile-intro {
    margin-left: auto;
    margin-right: auto;

    max-width: 100%;
  }

  .projects-hero-button {
    width: 100%;

    max-width: none;
  }

  .section-nav {
    margin-left: -4px;
    margin-right: -4px;
  }

  .section-nav button {
    flex: 0 0 auto;
  }

  .button-row .ghost-button {
    flex: 1 1 calc(50% - 6px);
  }

  .certificate-list {
    grid-template-columns: 1fr;
  }

  .resume-content {
    flex-direction: column;

    align-items: stretch;
  }

  .resume-content p {
    max-width: none;
  }

  .resume-content .secondary-button {
    width: 100%;
  }

  .bottom-project-cta {
    flex-direction: column;

    align-items: stretch;

    text-align: center;
  }

  .bottom-project-cta .primary-button {
    width: 100%;
  }

  /* Mobile maximized */
  .about-page.about-page--maximized {
    padding: 0;

    margin: 0;
  }

  .about-page--maximized
  .about-modal {
    border-radius: 0;
  }

  .about-page--maximized .about-card {
    width: 100%;

    height: calc(100vh - 58px);

    padding:
      0
      18px
      24px;
  }

  .about-page--maximized
  .profile-circle {
    width: 100px;
    height: 100px;

    flex-basis: 100px;
  }

  .about-page--maximized
  .profile-copy h2 {
    font-size: 2rem;
  }

  .about-page--maximized
  .profile-subtitle {
    font-size: 0.95rem;
  }

  .about-page--maximized
  .profile-intro {
    max-width: 100%;

    font-size: 0.9rem;

    line-height: 1.7;
  }

  .about-page--maximized
  .projects-hero-button {
    width: 100%;

    max-width: none;
  }
}

@media (max-width: 500px) {
  .about-card {
    padding-left: 15px;
    padding-right: 15px;
  }

  .title-text {
    font-size: 0.8rem;
  }

  .profile-copy h2 {
    font-size: 1.55rem;
  }

  .profile-subtitle {
    font-size: 0.85rem;
  }

  .profile-intro {
    font-size: 0.85rem;
  }

  .section-nav {
    border-radius: 12px;
  }

  .section-nav button {
    padding: 9px 12px;

    font-size: 0.75rem;
  }

  .chip-list {
    gap: 8px;
  }

  .chip {
    padding: 8px 12px;

    font-size: 0.8rem;
  }

  .experience-header {
    flex-direction: column;

    align-items: flex-start;
  }

  .experience-period {
    font-size: 0.75rem;
  }

  .button-row .ghost-button {
    flex: 1 1 100%;
  }

  .bottom-project-cta {
    padding: 14px;
  }
}
</style>