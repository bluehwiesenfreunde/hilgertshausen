<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title shrink>
          <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
          <q-btn flat dense :to="{ name: 'landing-page' }" :label="$t('page.title')" />
        </q-toolbar-title>
        <q-space />

        <q-btn
          dense
          flat
          icon="mdi-instagram"
          :label="$q.screen.gt.xs === true ? 'Instagram' : ''"
          href="https://www.instagram.com/bluehwiesenfreunde/"
        />
        <q-btn
          dense
          flat
          :label="$t('views.privacy_policy.link')"
          :to="{ name: 'privacy-policy' }"
        />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above class="drawer" elevated v-model="drawerLeft">
      <q-scroll-area class="fit">
        <q-list>
          <q-expansion-item
            group="main"
            :label="$t('terminology.orchard', 2)"
            header-class="text-primary text-weight-bold"
            icon="mdi-map"
            v-model:model-value="expansionState[0]"
            :content-inset-level="1"
          >
            <q-card>
              <q-list>
                <q-item clickable :to="{ name: 'orchard-list' }">
                  <q-item-section>
                    <q-item-label class="text-weight-bold">{{
                      $t('views.orchard.list.link')
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  :to="{ name: 'orchard-details', params: { id: id } }"
                  v-for="[id, orchard] in orchards"
                  :key="id"
                >
                  <q-item-section>
                    <q-item-label>{{ orchard.properties.name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-expansion-item>
          <q-expansion-item
            group="main"
            :label="$t('terminology.variety', 2)"
            header-class="text-primary text-weight-bold"
            icon="mdi-tree"
            v-model:model-value="expansionState[1]"
            :content-inset-level="1"
          >
            <q-expansion-item
              group="varieties"
              header-class="text-primary"
              :label="$t(`species.${species}`)"
              v-for="[species, speciesInfo] in speciesMap"
              v-model:model-value="speciesInfo.expansionState"
              :key="species"
            >
              <q-card>
                <q-list>
                  <q-item
                    v-for="variety in speciesInfo.varieties"
                    :key="variety.id"
                    :to="{ name: 'variety-details', params: { id: variety.id } }"
                  >
                    <q-item-section>
                      {{ variety.name }}
                    </q-item-section>
                    <q-item-section avatar>
                      <q-badge
                        rounded
                        :label="getTreesByVarietyId(variety.id).length"
                        color="grey"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </q-expansion-item>
          </q-expansion-item>
          <!--
          <q-expansion-item
            group="main"
            :label="$t('views.projects.link')"
            header-class="text-primary text-weight-bold"
            icon="mdi-text-box"
            :content-inset-level="1"
            :default-opened="expansionState[2]"
          >
            <q-card>
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label>Test</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>Test 2</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-expansion-item>
        -->
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <!--<q-scroll-area style="height: calc(100vh - 50px)">-->
      <q-page padding>
        <router-view />
      </q-page>
      <!--</q-scroll-area>-->
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
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
    const route = useRoute();
    const drawerLeft = ref(true);
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
          false,
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
</style>
