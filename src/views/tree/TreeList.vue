<template>
  <div class="row">
    <div
      class="cold-6"
      v-for="(tree, index) in trees"
      :key="index"
      style="
        padding: 0.1cm;
        text-align: center;
        width: 8cm;
        height: 8cm;
        border: 1px solid #000000;
        break-inside: avoid;
      "
    >
      <span style="font-size: 0.775cm; line-height: 0.9cm">
        <b>{{ tree.properties.id }}</b
        ><br />
        <b>{{ getVarietyName(tree) }}</b> </span
      ><br /><br />
      <qrcode-vue
        render-as="svg"
        :value="`https://bluehwiesenfreunde.de/#/baum/${tree.properties.id}`"
        :size="200"
      />
    </div>
  </div>
</template>

<script lang="ts">
import QrcodeVue from 'qrcode.vue';
import { defineComponent } from 'vue';

import type { Tree } from '@/models/Tree';
import { ALL_TREES } from '@/utils/trees';
import { getVarietyById } from '@/utils/varieties';

const trees = Array.from(ALL_TREES.values()).filter((tree) => {
  const species = getVarietyById(tree.properties.variety_id)?.species;
  return species !== 'dead' && species !== 'unknown';
});
const remapping = new Map<string, string>(
  Object.entries({
    'Zwetschge unbestimmt': 'Zwetschge',
    'Apfel unbestimmt': 'Apfel',
    'Birne unbestimmt': 'Birne',
    'Kirsche unbestimmt': 'Kirsche',
    'Hedelfinger Riesenkirsche': 'Hedelf. Riesenk.',
    'Fränkische Hauszwetschge': 'Fränk. Hauszwetsch.',
    'Wangenheimer Frühzwetschge': 'Wang. Frühzwetsch.',
    'Rheinischer Bohnapfel': 'Rhein. Bohnapfel',
    'Rheinischer Winterrambur': 'Rhein. Winterrambur',
    'Wettringer Taubenapfel': 'Wettr. Taubenapfel',
    'Stuttgarter Gaishirtle': 'Stuttg. Gaishirtle',
    'Geheimrat Dr. Oldenburg': 'Geheimr. Oldenburg',
    'Schöner von Herrnhut': 'Schöner v. Herrnhut',
    'Landsberger Renette': 'Landsb. Renette',
  }),
);

export default defineComponent({
  components: {
    QrcodeVue,
  },
  setup() {
    const getVarietyName = (tree: Tree): string => {
      const variety = getVarietyById(tree.properties.variety_id);
      if (variety === undefined) return 'fs';
      return remapping.has(variety.name) === true
        ? (remapping.get(variety.name) as string)
        : variety.name;
    };
    return {
      trees,
      remapping,
      getVarietyName,
    };
  },
});
</script>

<style lang="sass">
.content
  border-radius: 0 0 4px 4px
</style>
