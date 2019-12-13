<template>
  <v-app>
    <base-currency-nav />

    <v-app-bar app color="green" dark>
      <v-app-bar-nav-icon @click.stop="toggleNavigation" />
      <v-toolbar-title>Exchange Rates</v-toolbar-title>

      <v-spacer />

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
      <v-container v-if="isFetching || fetchFailed" fill-height>
        <v-layout align-center justify-center>
          <v-progress-circular v-if="isFetching" indeterminate />
          <v-btn v-else @click.stop="fetch"
            >Error fetching data. Try again?</v-btn
          >
        </v-layout>
      </v-container>

      <v-container v-else grid-list-xl fluid>
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
import { NavigationModule } from "@/store/modules/navigation";
import BaseCurrencyNav from "@/components/BaseCurrencyNav.vue";
import CurrencyCard from "@/components/CurrencyCard.vue";

@Component({
  name: "App",
  components: { BaseCurrencyNav, CurrencyCard },
  created() {
    CurrencyModule.fetch();
  }
})
export default class App extends Vue {
  public toggleNavigation() {
    NavigationModule.toggle();
  }

  public fetch() {
    CurrencyModule.fetch();
  }

  get currenciesToDisplay() {
    return CurrencyModule.currenciesToDisplay;
  }

  get fetchFailed() {
    return CurrencyModule.fetchFailed;
  }

  get isFetching() {
    return CurrencyModule.isFetching;
  }
}
</script>
