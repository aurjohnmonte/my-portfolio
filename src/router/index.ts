import { createRouter, createWebHistory } from 'vue-router'

import AboutMe from '../pages/AboutMe.vue'
import Ai_driven from '../pages/Ai_driven.vue'
import ECommerce from '../pages/E_CommerceSystem.vue'
import QR_based_system from '../pages/MonitoringSystem.vue'
import Queueing_system from '../pages/QueueingSystem.vue'
import File_Explorer from '@/pages/File_Explorer.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/file-explorer',
      name: "File_explorer",
      component: File_Explorer
    },
    {
      path: '/about',
      name: 'AboutMe',
      component: AboutMe
    },
    {
      path: '/ai-driven-system',
      name: 'Ai_driven',
      component: Ai_driven
    },
    {
      path: '/e-commerce-system',
      name: 'ECommerce',
      component: ECommerce
    },
    {
      path: '/qr-based-monitoring-system',
      name: 'QR_based_system',
      component: QR_based_system
    },
    {
      path: '/real-time-queueing-system',
      name: 'Queueing_system',
      component: Queueing_system
    }
  ],
})

export default router
