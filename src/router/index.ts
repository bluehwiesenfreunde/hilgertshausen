import { createRouter, createWebHashHistory } from 'vue-router';

import FotoChallenge from '@/views/FotoChallenge.vue';
import LandingPage from '@/views/LandingPage.vue';
import PrivacyPolicy from '@/views/PrivacyPolicy.vue';
import OrchardDetails from '@/views/orchard/OrchardDetails.vue';
import OrchardList from '@/views/orchard/OrchardList.vue';
import TreeDetails from '@/views/tree/TreeDetails.vue';
import VarietyDetails from '@/views/variety/VarietyDetails.vue';
//import VarietyList from '@/views/species/VarietyList.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage,
    },
    {
      path: '/impressum',
      name: 'privacy-policy',
      component: PrivacyPolicy,
    },
    {
      path: '/streuobstwiesen/',
      name: 'orchard-list',
      component: OrchardList,
    },
    {
      path: '/streuobstwiesen/:id',
      name: 'orchard-details',
      component: OrchardDetails,
      props: true,
    },
    //{
    //  path: '/sorte/:name',
    //  name: 'variety-list',
    //  component: VarietyList,
    //},
    {
      path: '/sorten/:id',
      name: 'variety-details',
      component: VarietyDetails,
      props: true,
    },
    {
      path: '/baum/:id',
      name: 'tree-details',
      component: TreeDetails,
      props: true,
    },
    {
      path: '/fotowettbewerb/2025',
      name: 'projects-foto-challenge-2025',
      component: FotoChallenge,
    },
  ],
});

export { router };
