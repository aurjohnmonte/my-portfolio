<template>
  <div class="about-page" :class="{ 'about-page--maximized': isMaximized }">
    <div class="about-modal" :class="{ 'about-modal--maximized': isMaximized }">
      <div class="about-title-bar"
           @mousedown="startDrag"
           @touchstart="startDragTouch">
        <div class="title-left"></div>
        <div class="title-text">About Me</div>
        <div class="title-actions">
          <span class="title-icon">
          </span>
          <span class="title-icon">
            <img src="../images/maximize.png" alt="Close Icon" class="title-icon-img" style="cursor: pointer; margin-right: 20px;" @click.stop="toggleMaximize()">
            <img src="../images/remove.png" alt="Close Icon" class="title-icon-img" style="cursor: pointer;" @click.stop="$emit('close')">
          </span>
        </div>
      </div>
      <div class="about-card">
        <div class="about-header">
          <div class="profile-circle">
            <img src="../images/grad_pic.jpg" alt="Profile Image" style="width: 100px; height: 100px; border-radius: 50%;">
          </div>
          <div class="profile-copy">
            <h2>Aurjohn Cris C. Monte</h2>
            <p class="profile-subtitle">Full Stack Web Developer | Cabadbaran, PH</p>
          </div>
          <a class="cert-link" href="#" @click="$router.push('/?action=view-projects')">View My Projects</a>
        </div>

        <div class="about-body">
          <p class="about-description">
            A motivated and passionate BSIT graduate developer who loves to solve problems and build systems around them. Developed and deployed web-based systems that help users meet their needs.
          </p>

          <div class="section-divider"></div>

          <div class="section-block">
            <span class="section-label">SKILLS</span>
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
              <span class="chip">Cloud Services</span>
            </div>
          </div>

          <div class="section-divider"></div>

          <div class="section-block">
            <span class="section-label">GET IN TOUCH</span>

            <div class="contact-info">
              <div class="contact-item">
                <span class="contact-icon">
                  <img src="../images/communication.png" alt="Email Icon" style="width: 18px; height: 18px;">
                </span>
                <span class="contact-text">aurjohnmonte2003@gmail.com</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">
                  <img src="../images/mobile.png" alt="Email Icon" style="width: 18px; height: 18px;">
                </span>
                <span class="contact-text">+63 9511815496</span>
              </div>
            </div>
            <div class="button-row">
              <button class="ghost-button" @click="goNavigate('github')">GitHub</button>
              <button class="ghost-button" @click="goNavigate('linkedin')">LinkedIn</button>
              <button class="ghost-button" @click="goNavigate('upwork')">Upwork</button>
              <button class="ghost-button" @click="goNavigate('facebook')">Facebook</button>
              <button class="ghost-button" @click="goNavigate('instagram')">Instagram</button>
              <button class="ghost-button" @click="goNavigate('docker-hub')">Docker Hub</button>
            </div>
          </div>

          <div class="section-divider"></div>

          <div class="section-block">
            <span class="section-label">WORK EXPERIENCE</span>

            <div class="experience-list">

              <div class="experience-item">
                <div class="experience-header">
                  <div class="experience-title-group">
                    <span class="experience-role">Freelance Web Developer</span>
                    <span class="experience-company">Self-employed</span>
                  </div>
                  <span class="experience-period">2024 – Present</span>
                </div>
                <ul class="experience-bullets">
                  <li>Developed and deployed capstone projects including an AI-driven survey system, e-commerce platform, and QR-based inventory system, improving data accessibility and efficiency.</li>
                  <li>Built and deployed applications using PHP, Laravel, JavaScript, Vue.js, and MySQL, with Docker, Git/GitHub, and cloud platforms (Contabo VPS).</li>
                  <li>Collaborated with clients and faculty to gather requirements and deliver user-focused solutions.</li>
                </ul>
              </div>

              <div class="experience-divider"></div>

              <div class="experience-item">
                <div class="experience-header">
                  <div class="experience-title-group">
                    <span class="experience-role">Web Developer / IT Staff (Intern)</span>
                    <span class="experience-company">G-Hoven IT Solutions · Butuan City</span>
                  </div>
                  <span class="experience-period">Aug – Dec 2025</span>
                </div>
                <ul class="experience-bullets">
                  <li>Developed and deployed a visitor log system enabling real-time data access from any location.</li>
                  <li>Assisted in the installation and configuration of biometric attendance systems for government agencies.</li>
                </ul>
              </div>

              <div class="experience-divider"></div>

              <div class="experience-item">
                <div class="experience-header">
                  <div class="experience-title-group">
                    <span class="experience-role">Encoder / Image Editor (Part-time)</span>
                    <span class="experience-company">PIXEL Workshop · Cabadbaran City</span>
                  </div>
                  <span class="experience-period">2023 – 2024</span>
                </div>
                <ul class="experience-bullets">
                  <li>Encoded barangay documents, resumes, and other official papers.</li>
                  <li>Edited and produced ID photos and other image-based outputs for clients.</li>
                </ul>
              </div>

            </div>
          </div>

          <div class="section-divider"></div>

          <div class="section-block section-certificates">
            <div class="section-heading">
              <span class="section-label">CERTIFICATES</span>
              <span class="certificate-status">1 completed</span>
            </div>
            <div class="certificate-list">
              <div class="certificate-card" style="cursor: pointer;">
                <div class="certificate-card-top">
                  <span class="certificate-badge">Docker & AWS</span>
                  <span class="certificate-date">2026</span>
                </div>
                <h3>Web System Deployment</h3>
                <p>Completed online course in Udemy for containerized deployment and scalable cloud hosting.</p>
                <div class="certificate-completion">
                  <div class="certificate-bar">
                    <div class="certificate-fill"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="section-divider"></div>

          <!--RESUME SECTION-->
          <div class="section-block" id="resume-section">
            <div class="section-heading">
              <span class="section-label">Resume</span>
            </div>
            <button class="secondary-button" @click="goNavigate('resume')">Click here to view my resume</button>
          </div>

          <div class="action-row">
            <button class="secondary-button" @click="goSlide('certificates')">Certificates</button>
            <button class="primary-button" @click="goNavigate('email')">Email me</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AboutMe',
  data() {
    return {
      isDragging: false,
      hasMoved: false,
      startX: 0,       // add this
      startY: 0, 
      dragOffsetX: 0,
      dragOffsetY: 0,
      modalX: 0,
      modalY: 0,
      isDragged: false,
      isMaximized: window.innerWidth <= 768 ? true : false,
    }
  },
  methods: {
    toggleMaximize() {
      this.isMaximized = !this.isMaximized;
      this.$emit('maximize', this.isMaximized);
      this.isDragged = false;
      this.modalX = 0;
      this.modalY = 0;
      const modal = this.$el.querySelector('.about-modal') as HTMLElement;
      if (modal) {
        modal.style.transform = '';
        modal.style.left = '';
        modal.style.top = '';
      }
    },
    startDrag(e: MouseEvent) {
      if (this.isMaximized) return;
      this.isDragging = true;
      this.hasMoved = false;
      this.startX = e.clientX;
      this.startY = e.clientY;
      const modal = this.$el.querySelector('.about-modal') as HTMLElement;
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
      const modal = this.$el.querySelector('.about-modal') as HTMLElement;
      const rect = modal.getBoundingClientRect();
      this.dragOffsetX = touch.clientX - rect.left;
      this.dragOffsetY = touch.clientY - rect.top;
      document.addEventListener('touchmove', this.onDragTouch);
      document.addEventListener('touchend', this.stopDrag);
    },

    onDrag(e: MouseEvent) {
      if (!this.isDragging) return;
      const dx = e.clientX - this.startX;
      const dy = e.clientY - this.startY;
      // only start moving after 5px threshold
      if (!this.hasMoved && Math.sqrt(dx * dx + dy * dy) < 5) return;
      if (!this.hasMoved) {
        this.hasMoved = true;
        this.isDragged = true;
        const modal = this.$el.querySelector('.about-modal') as HTMLElement;
        const rect = modal.getBoundingClientRect();
        modal.style.position = 'fixed';
        modal.style.margin = '0';
        modal.style.left = rect.left + 'px';
        modal.style.top = rect.top + 'px';
      }
      const modal = this.$el.querySelector('.about-modal') as HTMLElement;
      modal.style.left = (e.clientX - this.dragOffsetX) + 'px';
      modal.style.top = (e.clientY - this.dragOffsetY) + 'px';
    },

    onDragTouch(e: TouchEvent) {
      if (!this.isDragging) return;
      const touch = e.touches[0];
      if (!touch) return;
      const dx = touch.clientX - this.startX;
      const dy = touch.clientY - this.startY;
      if (!this.hasMoved && Math.sqrt(dx * dx + dy * dy) < 5) return;
      if (!this.hasMoved) {
        this.hasMoved = true;
        this.isDragged = true;
        const modal = this.$el.querySelector('.about-modal') as HTMLElement;
        const rect = modal.getBoundingClientRect();
        modal.style.position = 'fixed';
        modal.style.margin = '0';
        modal.style.left = rect.left + 'px';
        modal.style.top = rect.top + 'px';
      }
      const modal = this.$el.querySelector('.about-modal') as HTMLElement;
      modal.style.left = (touch.clientX - this.dragOffsetX) + 'px';
      modal.style.top = (touch.clientY - this.dragOffsetY) + 'px';
    },

    stopDrag() {
      this.isDragging = false;
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('mouseup', this.stopDrag);
      document.removeEventListener('touchmove', this.onDragTouch);
      document.removeEventListener('touchend', this.stopDrag);
    },
    goSlide(section: string) {

      switch(section) {
        case 'certificates':
          const certSection = document.querySelector('.section-certificates');
          const scrollContainerCert = document.querySelector('.about-card');
          if (certSection && scrollContainerCert) {
            const containerTop = scrollContainerCert.getBoundingClientRect().top;
            const sectionTop = certSection.getBoundingClientRect().top;
            const offset = sectionTop - containerTop;
            scrollContainerCert.scrollBy({ top: offset, behavior: 'smooth' });
          }
          break;
      }
    },
    goNavigate(platform: string) {
      let url = '';
      switch (platform) {
        case 'github':
          url = 'https://github.com/aurjohnmonte';
          break;
        case 'email':
          url = 'https://mail.google.com/mail/?view=cm&fs=1&to=aurjohnmonte2003@gmail.com';
          break;
        case 'instagram':
          url = 'https://www.instagram.com/aurjohn.monte/';
          break;
        case 'facebook':
          url = 'https://www.facebook.com/aurjohn.monte.75/';
          break;
        case 'upwork':
          url = 'https://www.upwork.com/freelancers/~01b9c8e7a1c3f0d9e5';
          break;
        case 'linkedin':
          url = 'https://www.linkedin.com/in/aurjohn-cris-c-monte-694a3024a/';
          break;
        case 'resume':
          url = 'https://drive.google.com/file/d/1wIg3yMRwNLiYiRV6SYrMP9Qjl7xf6PHp/view';
          break;
        case 'docker-hub':
          url = "https://hub.docker.com/u/aurjohnmonte";
          break;
      }
      window.open(url, '_blank');
    }
  }
};
</script>

<style scoped>
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

.experience-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
  color: rgba(255, 255, 255, 0.5);
}

.experience-period {
  font-size: 0.82rem;
  color: rgba(163, 86, 255, 0.9);
  white-space: nowrap;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(163, 86, 255, 0.1);
  border: 1px solid rgba(163, 86, 255, 0.2);
  align-self: flex-start;
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
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.7;
}
.about-title-bar {
  cursor: grab;
}

.about-title-bar:active {
  cursor: grabbing;
}
.about-page {
  pointer-events: none; /* add this */
}

.about-modal {
  pointer-events: all; /* add this */
}

.about-page.about-page--maximized {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  align-items: flex-start;
  justify-content: flex-start;
}

.about-modal.about-modal--maximized {
  width: 100%;
  max-width: 100%;
  height: 100vh;
  max-height: 100vh;
  margin-top: 0;
  border-radius: 0;
  border: none;
  box-shadow: none;
  overflow-y: hidden;
}

/* This targets about-card when inside a maximized modal */
.about-page--maximized .about-modal .about-card {
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

/* Mobile maximized */
@media (max-width: 860px) {
  .about-page.about-page--maximized {
    padding: 0;
    margin-top: 0;
  }

  .about-page--maximized .about-modal .about-card {
    max-height: calc(100vh - 100px);
  }
}













.about-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.about-modal {
  width: min(100%, 100%);
  max-width: 780px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  overflow-y: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
  background: rgba(24, 14, 45, 0.96);
  max-height: 80vh;
  margin-top: 50px;
}

.about-title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
}

.title-left {
  width: 24px;
  min-width: 24px;
}

.title-text {
  flex: 1;
  text-align: center;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.title-actions {
  display: flex;
  gap: 10px;
  margin-right: 10px;
}

.title-icon img {
  width: 17px;
  height: 17px;
  border-radius: 4px;
}

.about-card {
  max-height: 70vh;
  overflow-y: auto;
  padding: 32px 28px 48px;
  padding-bottom: 0;
}

.about-card::-webkit-scrollbar {
  width: 10px;
}

.about-card::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 999px;
}

.about-card::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.about-card {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.16) rgba(255, 255, 255, 0.04);
}

.about-header {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.profile-circle {
  flex: 0 0 96px;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: #d9d9d9;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.08);
}

.profile-copy {
  flex: 1 1 360px;
  min-width: 280px;
}

.profile-copy h2 {
  margin: 0;
  font-size: clamp(1.65rem, 2vw, 2.4rem);
  letter-spacing: -0.03em;
  color: #f4f0ff;
}

.profile-subtitle {
  margin: 10px 0 0;
  color: rgba(255, 255, 255, 0.66);
  font-size: 0.95rem;
}

.cert-link {
  align-self: flex-start;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #a07bfd;
  text-decoration: none;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  animation: pulseLink 2.6s ease-in-out infinite;
}

.about-body {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.cert-link:hover {
  background: rgba(160, 123, 253, 0.12);
  transform: translateY(-1px);
}

.about-body {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.about-description {
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.9;
  max-width: 900px;
}

.section-divider {
  height: 1px;
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
}

.section-block {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.section-label {
  font-size: 0.82rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.48);
}

.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 12px;
}

.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #ece9ff;
  background: rgba(255, 255, 255, 0.03);
  font-size: 0.88rem;
}

.button-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.action-row {
  position: sticky;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  padding: 16px 0 8px;
  margin-top: 12px;
  background: linear-gradient(180deg, rgba(24, 14, 45, 0.02), rgba(24, 14, 45, 0.96));
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.95rem;
}

.contact-icon {
  width: 18px;
  height: 18px;
  min-width: 18px;
  border-radius: 4px;
}

.ghost-button,
.primary-button,
.secondary-button {
  border: none;
  border-radius: 12px;
  min-width: 170px;
  padding: 12px 18px;
  font-size: 0.94rem;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.ghost-button {
  background: rgba(255, 255, 255, 0.05);
  color: #f4f0ff;
  border: 1px solid rgba(255, 255, 255, 0.09);
}

.ghost-button:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.1);
}

.primary-button {
  background: #a356ff;
  color: #fff;
  box-shadow: 0 12px 28px rgba(163, 86, 255, 0.24);
}

.primary-button:hover {
  transform: translateY(-1px);
  background: #8f49f0;
}

.secondary-button {
  background: rgba(255, 255, 255, 0.07);
  color: #f4f0ff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  align-self: flex-start;
}

.secondary-button:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.11);
}

@keyframes pulseLink {
  0%, 100% {
    transform: translateY(0) scale(1);
    box-shadow: 0 0 0 0 rgba(160, 123, 253, 0.12);
  }
  50% {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 18px 40px rgba(160, 123, 253, 0.18);
  }
}

.section-actions {
  display: flex;
  justify-content: flex-end;
}

.section-certificates {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.certificate-status {
  color: rgba(255, 255, 255, 0.58);
  font-size: 0.9rem;
}

.certificate-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.certificate-card {
  padding: 20px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.12);
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
  background: rgba(163, 86, 255, 0.18);
  color: #d8c9ff;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.certificate-date {
  color: rgba(255, 255, 255, 0.58);
  font-size: 0.85rem;
}

.certificate-card h3 {
  margin: 18px 0 8px;
  color: #f4f0ff;
  font-size: 1rem;
}

.certificate-card p {
  margin: 0;
  color: rgba(255, 255, 255, 0.68);
  line-height: 1.75;
  font-size: 0.93rem;
}

.certificate-completion {
  margin-top: 16px;
}

.section-certificates .certificate-bar {
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.certificate-fill {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #a356ff 0%, #7f50e8 100%);
}

.certificate-fill-alt {
  background: linear-gradient(90deg, #6ab7ff 0%, #4e8dff 100%);
}

@media (max-width: 860px) {
  .action-row {
    position: sticky;
    bottom: 6vh;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    padding: 16px 0 8px;
    margin-top: 12px;
    background: linear-gradient(180deg, rgba(24, 14, 45, 0.02), rgba(24, 14, 45, 0.96));
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  .about-page {
    padding: 16px;
    padding-top: 0px;
    align-items: start;
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
    padding: 24px 18px 24px;
    padding-bottom: 0;
    max-height: 60vh;
  }

  .about-header {
    justify-content: center;
    text-align: center;
    gap: 18px;
  }

  .profile-circle {
    margin: 0 auto;
  }

  .profile-copy {
    min-width: unset;
    width: 100%;
  }

  .profile-copy h2 {
    font-size: 1.8rem;
  }

  .cert-link {
    width: 100%;
    text-align: center;
    align-self: center;
  }

  .about-description {
    margin: 0 auto;
    max-width: 100%;
  }

  .chip-list {
    justify-content: center;
  }

  .button-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ghost-button,
  .primary-button,
  .secondary-button {
    width: 100%;
    min-width: 0;
  }

  .section-actions {
    justify-content: center;
  }

  .section-actions .secondary-button {
    width: 100%;
  }
}
</style>