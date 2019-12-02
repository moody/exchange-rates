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

    <v-content>
      <v-container grid-list-xl wrap>
        <base-currency-select />

        <v-layout row wrap>
          <v-flex
            xs12
            md6
            lg4
            xl3
            v-for="currency in currenciesToDisplay"
            :key="currency"
          >
            <currency-card :currency="currency" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CurrencyModule } from "@/store/modules/currency";
import BaseCurrencySelect from "@/components/BaseCurrencySelect.vue";
import CurrencyCard from "@/components/CurrencyCard.vue";

@Component({
  name: "App",
  components: { BaseCurrencySelect, CurrencyCard },
  created() {
    CurrencyModule.fetch();
  }
})
export default class App extends Vue {
  get currenciesToDisplay() {
    return CurrencyModule.currenciesToDisplay;
  }
}
</script>
