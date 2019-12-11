<template>
  <v-card class="CurrencyCard">
    <v-card-title>
      <currency-icon :currency="currency" size="50" />
      <v-card-subtitle class="ml-3 pa-0">{{ currency }}</v-card-subtitle>
      <v-spacer />
      <span>{{ name }}</span>
    </v-card-title>

    <v-divider />

    <v-sheet class="v-sheet--offset mx-auto" color="grey darken-4" tile>
      <v-sparkline
        :labels="labels"
        :value="rates"
        :gradient="gradient"
        line-width="2"
        smooth="20"
        padding="16"
        auto-draw
      ></v-sparkline>
    </v-sheet>

    <v-divider />

    <v-card-text class="text-center"
      >1 {{ baseCurrency }} = {{ rate }} {{ currency }}</v-card-text
    >
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CurrencyType } from "@/types";
import { CurrencyModule } from "@/store/modules/currency";
import { CURRENCY_NAME_MAP } from "@/consts";
import CurrencyIcon from "@/components/CurrencyIcon.vue";

@Component({
  name: "CurrencyCard",
  components: { CurrencyIcon }
})
export default class CurrencyCard extends Vue {
  private readonly gradient = [
    "#2ECC40", // green
    "#FFDC00", // yellow
    "#FF4136" // red
  ];

  @Prop()
  private readonly currency!: CurrencyType;

  get baseCurrency() {
    return CurrencyModule.baseCurrency;
  }

  get labels() {
    return CurrencyModule.labels;
  }

  get rates() {
    return CurrencyModule.rates[this.currency] || [];
  }

  get rate() {
    const rates = CurrencyModule.rates[this.currency];
    return rates ? rates[rates.length - 1].toFixed(6) : "??";
  }

  get name() {
    return CURRENCY_NAME_MAP[this.currency];
  }
}
</script>

<style lang="scss" scoped>
.CurrencyCard {
  animation: scale-up 800ms forwards ease-out;
  transform: scale(0.6);
}

@keyframes scale-up {
  100% {
    transform: none;
  }
}
</style>
