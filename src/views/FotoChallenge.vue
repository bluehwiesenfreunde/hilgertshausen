<template>
  <div class="q-pa-md">
    <q-img src="images/foto-challenge-2025.jpeg" />
    <h6>Teilnahmebedingungen</h6>
    <h6>Teilnehmen</h6>
    <q-form class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="Vorname Nachname *"
        hint="Vor- und Nachname"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Bitte geben Sie Ihren Namen ein']"
      />

      <q-toggle v-model="acceptConditions" label="Ich stimme den Teilnahmebedingungen zu" />
      <q-toggle v-model="acceptDataProtection" label="Ich stimme den Datenschutzbestimmungen zu" />

      <div>
        <q-btn
          label="Weiter"
          type="submit"
          target="new"
          :href="mailLink"
          color="primary"
          :disable="
            acceptConditions === false || acceptDataProtection === false || name.length === 0
          "
        />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const name = ref('');
    const mailLink = computed<string>(() => {
      if (
        acceptConditions.value === false ||
        acceptDataProtection.value === false ||
        name.value.length === 0
      )
        return '';
      return `mailto:kalender@bluehwiesenfreunde.de?subject=Teilnahme Fotowettbewerb 2025 - ${name.value}&body=Hallo liebe Blühwiesenfreunde!%0D%0A%0D%0AHiermit nehme ich am Blühwiesenfreunde Fotowettbewerb für den Kalender 2025 teil.%0D%0AIch habe die Teilnahmebedingungen und die Datenschutzbestimmungen gelesen und stimme beiden zu.%0D%0A Anbei findet ihr meine Bilder für den Wettbewerb.%0D%0A%0D%0A--- Bitte die Bilder noch einfügen, Danke!`;
    });
    const acceptConditions = ref(false);
    const acceptDataProtection = ref(false);

    return {
      name,
      acceptConditions,
      acceptDataProtection,
      mailLink,
    };
  },
});
</script>
