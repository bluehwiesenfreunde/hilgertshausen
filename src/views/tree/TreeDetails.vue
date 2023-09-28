<template>
  <TreeMap :trees="tree ? [tree] : []" :highlighted-tree-id="tree?.properties.id" />
  <q-chip icon="tag" :label="tree?.properties.id" />
  <q-chip
    icon="mdi-tree"
    :label="$t(`species.${getVarietyById(tree?.properties.variety_id)?.species}`)"
    :color="getSpeciesColorByTreeId(tree?.properties.id as any)"
  />
  <q-chip
    icon="mdi-information-outline"
    :label="getVarietyById(tree?.properties.variety_id)?.name"
    :color="getSpeciesColorByTreeId(tree?.properties.id as any)"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import TreeMap from '@/components/TreeMap.vue';
import type { Tree } from '@/models/Tree';
import { getSpeciesColorByTreeId } from '@/utils/colors';
import { ALL_TREES } from '@/utils/trees';
import { getVarietyById } from '@/utils/varieties';

export default defineComponent({
  props: {
    id: String,
  },
  components: {
    TreeMap,
  },
  setup(props) {
    const tree = computed<Tree | undefined>(() => {
      if (props.id === undefined) return undefined;
      return ALL_TREES.get(Number.parseInt(props.id, 10));
    });

    const trees = computed<Tree[]>(() => {
      if (tree.value === undefined) return [];
      return [tree.value];
    });

    return {
      trees,
      tree,
      getVarietyById,
      getSpeciesColorByTreeId,
    };
  },
});
</script>

<style>
.q-table__container {
  border-radius: 0 0 4px 4px;
}
</style>
