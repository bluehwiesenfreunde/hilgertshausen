<template>
  <div style="text-align: center">
    <q-img src="images/logo.png" style="max-width: 600px" />
  </div>

  <div class="q-pa-md">
    <div class="row items-start">
      <div class="col-12 col-md-4 q-py-md">
        <q-card flat bordered>
          <q-card-section><div class="text-h6">Über uns</div></q-card-section>
          <q-separator inset />
          <q-card-section>
            Wir sind eine lose Gruppe von Naturschutzinteressierten in Hilgertshausen, die sich
            ehrenamtlich um die gemeindlichen Streuobstwiesen und Bäume kümmert. Da wir kein Verein
            sind, haben wir eine Zusammenarbeit mit dem
            <a href="https://www.gartenbauverein-hilgertshausen.de">
              Gartenbauverein Hilgertshausen
            </a>
            vereinbart.<br />
            Folge uns auf Instagram um mehr über unsere Aktionen und Veranstaltungen zu erfahren.
            <br /><br />
            <q-btn
              color="primary"
              icon="mdi-instagram"
              href="https://www.instagram.com/bluehwiesenfreunde/"
              label="Instagram"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4 q-py-md q-pa-md-md">
        <q-card flat bordered>
          <q-card-section><div class="text-h6">Auf dieser Seite</div></q-card-section>
          <q-separator inset />
          <q-card-section>
            Auf dieser Seite findest Du alle Informationen zu den Streuobstwiesen in Hilgertshausen.
            <ul>
              <li>die Position der Wiesen im Gemeindegebiet</li>
              <li>eine Auflistung aller Bäume auf den jeweiligen Wiesen</li>
              <li>Informationen zu den Frucht-Sorten</li>
              <li>Bilder einzelner Bäume und deren Früchte</li>
            </ul>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4 q-py-md">
        <q-card flat bordered>
          <q-card-section :horizontal="$q.screen.gt.md">
            <q-img class="col-6" src="images/foto-challenge-2025.jpeg" />
            <q-card-section>
              <div class="text-h6">Mitmachen und gewinnen</div>
              <q-separator />
              <div class="q-pt-md">
                Gemeinsam erstellen wir bis Ende 2024 einen Kalender mit Bildern unserer
                Streuobstwiesen.
                <br />
                <br />
                <q-btn
                  :to="{ name: 'projects-foto-challenge-2025' }"
                  color="primary"
                  label="Hier erfährst du mehr"
                ></q-btn>
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="sass">
a
  color: $primary
</style>
