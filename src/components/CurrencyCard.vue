<template>
  <v-card>
    <v-sheet class="v-sheet--offset mx-auto" color="green" elevation="6">
      <v-sparkline
        :labels="['0', '1', '2', '3', '4']"
        :value="[1, 2, 0, 3, 4]"
        color="white"
        line-width="2"
        padding="16"
      ></v-sparkline>
    </v-sheet>

    <v-card-title class="mb-1">
      <currency-icon :currency="currency" size="30" />
      <span class="ml-2">{{ currency }}</span>
    </v-card-title>

    <v-card-subtitle>{{ name }}</v-card-subtitle>

    <v-card-text>
      <v-skeleton-loader
        :loading="isFetching"
        transition="fade-transition"
        max-width="50%"
        type="text"
        ><span
          >1 {{ baseCurrency }} = {{ rate }} {{ currency }}.</span
        ></v-skeleton-loader
      >
    </v-card-text>
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
  @Prop()
  private readonly currency!: CurrencyType;

  get baseCurrency() {
    return CurrencyModule.baseCurrency;
  }

  get isFetching() {
    return CurrencyModule.isFetching;
  }

  get rate() {
    const r = CurrencyModule.rates[this.currency] as number;
    return r ? r.toFixed(6) : "??";
  }

  get name() {
    return CURRENCY_NAME_MAP[this.currency];
  }
}
</script>

<style lang="scss" scoped></style>
