<template>
  <q-layout view="hHh LpR fFf">
    <q-page-container>
      <!--<q-scroll-area style="height: calc(100vh - 50px)">-->
      <q-page style="padding-left: 50px; padding-top: 30px">
        <router-view />
      </q-page>
      <!--</q-scroll-area>-->
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import type { Species, Variety } from '@/models/Variety';
import { getSpeciesColor } from '@/utils/colors';
import { ALL_ORCHARDS } from '@/utils/orchards';
import { getTreesByVarietyId } from '@/utils/trees';
import { VARIETIES_BY_SPECIES } from '@/utils/varieties';

interface SpeciesInfo {
  varieties: Variety[];
  expansionState: boolean;
}

export default defineComponent({
  components: {
    'router-view': RouterView,
  },
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const drawerLeft = ref($q.screen.gt.md);
    const expansionState = ref([false, false, false]);
    const speciesMap = ref<Map<Species, SpeciesInfo>>(new Map());
    VARIETIES_BY_SPECIES.forEach((varieties, species) => {
      speciesMap.value.set(species, {
        varieties: varieties.filter((variety) => {
          return getTreesByVarietyId(variety.id).length > 0;
        }),
        expansionState: false,
      });
    });

    watch(
      () => route.name,
      () => {
        expansionState.value = [
          route.name?.toString().startsWith('orchard') === true,
          route.name?.toString().startsWith('variety') === true,
          route.name?.toString().startsWith('projects') === true,
        ];
        if (route.name?.toString() !== 'variety-details') {
          for (const speciesInfo of speciesMap.value.values()) speciesInfo.expansionState = false;
        } else {
          for (const speciesInfo of speciesMap.value.values()) {
            speciesInfo.expansionState =
              speciesInfo.varieties.find((variety) => {
                return variety.id === Number.parseInt(route.params.id as string, 10);
              }) !== undefined;
          }
        }
      },
      { immediate: true },
    );

    return {
      drawerLeft,
      expansionState,
      getSpeciesColor,
      getTreesByVarietyId,
      orchards: ALL_ORCHARDS,
      speciesMap,
    };
  },
});
</script>
<style lang="sass">
@media (min-width: $breakpoint-md-min)
  .drawer
    width: 350px
@media print
  .no-print
    display: none
</style>
