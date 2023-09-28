<template>
  <TreeMap :trees="tree ? [tree] : []" :highlighted-tree-id="tree?.properties.id" />
  <qrcode-vue
    :value="`http://localhost:5173/#/streuobstwiesen/{{tree?.properties.id}}`"
    :size="300"
  />
</template>

<script lang="ts">
import QrcodeVue from 'qrcode.vue';
import { computed, defineComponent } from 'vue';

import TreeMap from '@/components/TreeMap.vue';
import type { Tree } from '@/models/Tree';
import { ALL_TREES } from '@/utils/trees';

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

    const trees = computed<Tree[]>(() => {
      if (tree.value === undefined) return [];
      return [tree.value];
    });

    return {
      trees,
      tree,
    };
  },
});
</script>

<style>
.q-table__container {
  border-radius: 0 0 4px 4px;
}
</style>
