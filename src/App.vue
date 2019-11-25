<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Exchange Rates</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/moody/exchange-rates"
        target="_blank"
        text
      >
        <span class="mr-2">View on GitHub</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>TODO...</v-content>

    <v-footer>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({ name: "App", components: {} })
export default class App extends Vue {}
</script>
