<template>
  <TreeMap :trees="tree ? [tree] : []" :highlighted-tree-id="tree?.properties.id" />
  <div class="shadow-2 content q-pa-md">
    <h6>
      # {{ tree?.properties.id }}
      {{ getVarietyById(tree?.properties.variety_id)?.name }}
      ({{ $t(`species.${getVarietyById(tree?.properties.variety_id)?.species}`) }})
    </h6>
    <qrcode-vue
      :value="`http://localhost:5173/#/streuobstwiesen/{{tree?.properties.id}}`"
      :size="300"
    />
    <div class="row">
      <div class="col-md-7 col-12">
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section>
              {{ $t('tree.tree_id') }}
            </q-item-section>

            <q-item-section>
              {{ tree?.properties.id }}
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            :to="{ name: 'orchard-details', params: { id: tree?.properties.orchard_id } }"
          >
            <q-item-section>
              {{ $t('terminology.orchard') }}
            </q-item-section>

            <q-item-section>
              {{ getOrchardById(tree?.properties.orchard_id)?.properties.name }}
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              {{ $t('terminology.species') }}
            </q-item-section>

            <q-item-section>
              {{ $t(`species.${getVarietyById(tree?.properties.variety_id)?.species}`) }}
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            :to="{ name: 'variety-details', params: { id: tree?.properties.variety_id } }"
          >
            <q-item-section>
              {{ $t('terminology.variety') }}
            </q-item-section>

            <q-item-section>
              {{ getVarietyById(tree?.properties.variety_id)?.name }}
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              {{ $t('tree.ready_to_pick') }}
            </q-item-section>

            <q-item-section>
              {{ getVarietyById(tree?.properties.variety_id)?.ready_to_pick }}
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              {{ $t('tree.ready_to_eat') }}
            </q-item-section>

            <q-item-section>
              {{ getVarietyById(tree?.properties.variety_id)?.ready_to_eat }}
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              {{ $t('tree.state') }}
            </q-item-section>

            <q-item-section>
              {{
                tree?.properties.state === undefined ? $t('tree.no_data') : tree?.properties.state
              }}
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              {{ $t('tree.last_cut') }}
            </q-item-section>

            <q-item-section>
              {{
                tree?.properties.last_cut === undefined
                  ? $t('tree.no_data')
                  : $d(tree?.properties.last_cut, 'short')
              }}
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              {{ $t('tree.last_fertilization') }}
            </q-item-section>

            <q-item-section>
              {{
                tree?.properties.last_fertilization === undefined
                  ? $t('tree.no_data')
                  : $d(tree?.properties.last_fertilization, 'short')
              }}
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div v-if="images.length === 0" class="col-md-5 col-12">
        <q-img src="noexistent" style="border-radius: 4px">
          <template v-slot:error>
            <div class="absolute-full flex flex-center">
              <h6>{{ $t('tree.no_image') }}</h6>
            </div>
          </template>
        </q-img>
      </div>
      <div v-else class="col-md-5 col-12">
        <q-carousel
          style="border-radius: 4px"
          animated
          height="800px"
          v-model="slide"
          :arrows="images.length > 1"
          :navigation="images.length > 1"
          infinite
          :autoplay="autoplay"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
        >
          <q-carousel-slide
            v-for="(image, index) in images"
            :key="index"
            :img-src="image"
            :name="index"
          />
        </q-carousel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import QrcodeVue from 'qrcode.vue';
import { computed, defineComponent, ref } from 'vue';

import TreeMap from '@/components/TreeMap.vue';
import type { Tree } from '@/models/Tree';
import { getSpeciesColorByTreeId } from '@/utils/colors';
import { getOrchardById } from '@/utils/orchards';
import { ALL_TREES, getTreeImages } from '@/utils/trees';
import { getVarietyById } from '@/utils/varieties';

export default defineComponent({
  props: {
    id: String,
  },
  components: {
    TreeMap,
    QrcodeVue,
  },
  setup(props) {
    const tree = computed<Tree | undefined>(() => {
      if (props.id === undefined) return undefined;
      return ALL_TREES.get(Number.parseInt(props.id, 10));
    });
    const images = computed<string[]>(() => {
      return getTreeImages(props.id);
    });

    const trees = computed<Tree[]>(() => {
      if (tree.value === undefined) return [];
      return [tree.value];
    });
    const slide = ref(0);
    const autoplay = ref(true);

    return {
      trees,
      tree,
      slide,
      autoplay,
      images,
      getVarietyById,
      getSpeciesColorByTreeId,
      getOrchardById,
    };
  },
});
</script>

<style lang="sass">
.content
  border-radius: 0 0 4px 4px
</style>
