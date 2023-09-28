<template>
  <TreeMap :trees="trees" :highlighted-tree-id="hoveredTreeId" />
  <TreeTable
    :trees="trees"
    :optional-columns="['orchard', 'variety', 'state', 'last_cut', 'last_fertilization']"
    @tree-hovered="onTreeHovered"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import TreeMap from '@/components/TreeMap.vue';
import TreeTable from '@/components/TreeTable.vue';
import type { Tree } from '@/models/Tree';
import { ALL_TREES } from '@/utils/trees';
import { toSpecies, VARIETIES_BY_SPECIES } from '@/utils/varieties';

export default defineComponent({
  props: {
    name: String,
  },
  components: {
    TreeTable,
    TreeMap,
  },
  setup(props) {
    const species = toSpecies(props.name === undefined ? '' : props.name);
    const trees = computed<Tree[]>(() => {
      if (species === 'dead' || species === 'unknown') return [];
      const varieties = VARIETIES_BY_SPECIES.get(species);
      if (varieties === undefined) return [];
      const varietyIds = varieties.map((variety) => variety.id);
      ALL_TREES.entries();
      return [];
    });
    const hoveredTreeId = ref<number | undefined>(undefined);
    const onTreeHovered = (treeId: number | undefined): void => {
      hoveredTreeId.value = treeId;
    };

    return {
      trees,
      hoveredTreeId,
      onTreeHovered,
    };
  },
});
</script>
