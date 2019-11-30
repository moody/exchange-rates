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
        <v-layout row wrap>
          <v-flex
            xs12
            md6
            lg4
            xl3
            v-for="item in rateData"
            :key="item.currency"
          >
            <v-card>
              <v-card-title class="mb-1">
                <currency-icon :currency="item.currency" size="30" />
                <span class="ml-2">{{ item.currency }}</span>
              </v-card-title>

              <v-card-subtitle>
                {{ item.name }}
              </v-card-subtitle>

              <v-card-text>
                1 {{ baseCurrency }} = {{ item.rate }} {{ item.currency }}.
              </v-card-text>
            </v-card>
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
import { CurrencyType } from "@/types";
import CurrencyIcon from "@/components/CurrencyIcon.vue";

@Component({
  name: "App",
  components: { CurrencyIcon },
  created() {
    CurrencyModule.fetch();
  }
})
export default class App extends Vue {
  get baseCurrency() {
    return CurrencyModule.baseCurrency;
  }

  get rateData() {
    return CurrencyModule.rateData;
  }
}
</script>
